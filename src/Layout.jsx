import { useRef, useEffect, useState, useCallback } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import CookieBanner from './components/CookieBanner.jsx';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------
   Grain overlay (Lightweight GPU-composited tile)
------------------------------------------------ */
function GrainOverlay() {
  const [dataUrl, setDataUrl] = useState('');

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    const img = ctx.createImageData(128, 128);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      d[i] = d[i + 1] = d[i + 2] = v;
      d[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    setDataUrl(canvas.toDataURL());
  }, []);

  if (!dataUrl) return null;

  return (
    <div
      id="grain-canvas"
      aria-hidden="true"
      style={{
        backgroundImage: `url(${dataUrl})`,
        backgroundRepeat: 'repeat',
      }}
    />
  );
}

/* ------------------------------------------------
   Cursor glow
------------------------------------------------ */
function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e) => gsap.to(el, { x: e.clientX, y: e.clientY, duration: 0.8, ease: 'power2.out' });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return <div ref={ref} id="cursor-glow" aria-hidden="true" />;
}

/* ------------------------------------------------
   Scramble logo
------------------------------------------------ */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!';

function ScrambleLogo({ text }) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef(null);

  const scramble = useCallback(() => {
    let iterations = 0;
    cancelAnimationFrame(rafRef.current);

    const tick = () => {
      setDisplay(
        text.split('').map((char, i) => {
          if (char === ' ') return ' ';
          if (i < iterations) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('')
      );
      iterations += 0.55;
      if (iterations < text.length + 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };
    tick();
  }, [text]);

  return (
    <span className="nav-logo-text" onMouseEnter={scramble} aria-label={text}>
      {display}
    </span>
  );
}

/* ------------------------------------------------
   Telemetry ticker
------------------------------------------------ */
const TICKER_ITEMS = [
  { key: 'SYS.STATUS', val: 'NOMINAL' },
  { key: 'UPTIME', val: '99.9%' },
  { key: 'DRONES', val: '12 BUILT' },
  { key: 'ROBOTS', val: '5 ACTIVE' },
  { key: 'DIVISION', val: 'R+D / HARDWARE / SOFTWARE' },
  { key: 'BASE', val: 'INDIA' },
  { key: 'BUILD', val: 'STABLE' },
  { key: 'PROJECTS', val: '27 SHIPPED' },
];

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="nav-ticker" aria-hidden="true">
      <div className="nav-ticker-track">
        {items.map((item, i) => (
          <span key={i} className="nav-ticker-item">
            <span className="t-key">{item.key}:</span>
            <span className="t-val">{item.val}</span>
            <span className="nav-ticker-sep">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------
   Nav link definitions
------------------------------------------------ */
const NAV_LINKS = [
  { label: 'DRONES', path: '/robotics', num: '01' },
  { label: 'ROBOTICS', path: '/robotics', num: '02' },
  { label: 'SYSTEMS', path: '/systems', num: '03' },
  { label: 'RESEARCH', path: '/research', num: '04' },
  { label: 'FOUNDERS', path: '/founders', num: '05' },
];

function Layout() {
  const location = useLocation();
  const lenisRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.9, touchMultiplier: 1.8 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    lenisRef.current = lenis;
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    ScrollTrigger.getAll().forEach(t => t.kill());
    ScrollTrigger.refresh();
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path) => {
    if (path.startsWith('/#')) return location.pathname === '/';
    return location.pathname === path.split('#')[0];
  };

  return (
    <div>
      <GrainOverlay />
      <CursorGlow />
      <div id="scroll-indicator"><div className="indicator-bar" /></div>

      {/* NAV */}
      <header id="global-nav" className={scrolled ? 'scrolled' : ''}>
        <div className="container nav-container">
          <Link to="/" className="nav-logo" aria-label="AxeomLabs home">
            <span className="nav-logo-dot" aria-hidden="true" />
            <ScrambleLogo text="AXEOMLABS" />
          </Link>

          <nav className="nav-links" aria-label="Primary navigation">
            {NAV_LINKS.map(link => (
              <Link
                key={link.path + link.label}
                to={link.path}
                className={isActive(link.path) ? 'nav-active' : ''}
              >
                <span className="nav-link-num" aria-hidden="true">{link.num}/</span>
                {link.label}
              </Link>
            ))}
            <Link to="/#cta" className="nav-portal">CONTACT</Link>
          </nav>
        </div>

        <Ticker />
      </header>

      <main id="main-content">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer id="main-footer">
        <div className="container footer-top">
          <div className="footer-brand-col">
            <span className="footer-brand">AXEOMLABS</span>
            <p className="footer-tagline">
              Building intelligent systems across drones, robotics, software, and hardware.
            </p>
            <a href="mailto:founder@axeomlabs.in" className="footer-email">
              founder@axeomlabs.in
            </a>
          </div>

          <nav className="footer-nav-col" aria-label="Products">
            <div className="footer-nav-title">PRODUCTS</div>
            <Link to="/robotics" className="footer-nav-link">Drones</Link>
            <Link to="/robotics" className="footer-nav-link">Robotics</Link>
            <Link to="/systems" className="footer-nav-link">Software</Link>
            <Link to="/systems" className="footer-nav-link">Hardware</Link>
          </nav>

          <nav className="footer-nav-col" aria-label="Company">
            <div className="footer-nav-title">COMPANY</div>
            <Link to="/research" className="footer-nav-link">Research</Link>
            <Link to="/founders" className="footer-nav-link">Founders</Link>
            <Link to="/#cta" className="footer-nav-link">Contact</Link>
          </nav>

          <nav className="footer-nav-col" aria-label="Legal">
            <div className="footer-nav-title">LEGAL</div>
            <Link to="/privacy-policy" className="footer-nav-link">Privacy Policy</Link>
            <Link to="/terms-of-service" className="footer-nav-link">Terms of Service</Link>
            <Link to="/cookie-policy" className="footer-nav-link">Cookie Policy</Link>
          </nav>
        </div>

        <div className="footer-bottom">
          <div className="container footer-bottom-inner">
            <span>&copy; {new Date().getFullYear()} AxeomLabs. All rights reserved.</span>
            <button
              className="footer-cookie-btn"
              onClick={() => {
                try { localStorage.removeItem('axeom_cookie_consent'); } catch {}
                window.location.reload();
              }}
            >
              Cookie settings
            </button>
          </div>
        </div>
      </footer>

      {/* Cookie consent banner */}
      <CookieBanner />
    </div>
  );
}

export default Layout;
