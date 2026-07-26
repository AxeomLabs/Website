import { useRef, useEffect, useState, useCallback } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------
   Grain canvas — keeps the site feeling tactile
------------------------------------------------ */
function GrainOverlay() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
      const img = ctx.createImageData(w, h);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        d[i] = d[i + 1] = d[i + 2] = v;
        d[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      rafRef.current = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} id="grain-canvas" aria-hidden="true" />;
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
   Scramble logo — text shuffles through random
   chars before resolving on mouseenter
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
   Telemetry ticker data
------------------------------------------------ */
const TICKER_ITEMS = [
  { key: 'SYS.STATUS', val: 'NOMINAL' },
  { key: 'UPTIME', val: '99.999%' },
  { key: 'NODES', val: '247 ACTIVE' },
  { key: 'LATENCY', val: '<0.5MS' },
  { key: 'INFERENCE/SEC', val: '14,380' },
  { key: 'KERNEL', val: 'AXEOM-RT v0.2.5' },
  { key: 'SECTOR', val: 'CLASSIFIED' },
  { key: 'THREAT LEVEL', val: 'CONTAINED' },
  { key: 'BUILD', val: 'STABLE' },
  { key: 'ARCH', val: 'ARM64 / x86_64' },
];

function Ticker() {
  // Duplicate items for seamless infinite scroll
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
  { label: 'ROBOTICS', path: '/robotics', num: '01' },
  { label: 'AI', path: '/#directives', num: '02' },
  { label: 'SYSTEMS', path: '/systems', num: '03' },
  { label: 'RESEARCH', path: '/research', num: '04' },
];

function Layout() {
  const location = useLocation();
  const lenisRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  /* Smooth scroll */
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.9, touchMultiplier: 1.8 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    lenisRef.current = lenis;
    return () => lenis.destroy();
  }, []);

  /* Reset scroll on route change */
  useEffect(() => {
    window.scrollTo(0, 0);
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    ScrollTrigger.getAll().forEach(t => t.kill());
    ScrollTrigger.refresh();
  }, [location.pathname]);

  /* Scrolled state for nav border */
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
        {/* Main bar */}
        <div className="container nav-container">
          <Link to="/" className="nav-logo" aria-label="AxeomLabs home">
            <span className="nav-logo-dot" aria-hidden="true" />
            <ScrambleLogo text="AXEOMLABS" />
          </Link>

          <nav className="nav-links" aria-label="Primary navigation">
            {NAV_LINKS.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={isActive(link.path) ? 'nav-active' : ''}
              >
                <span className="nav-link-num" aria-hidden="true">{link.num}/</span>
                {link.label}
              </Link>
            ))}
            <Link to="/#cta" className="nav-portal">ACCESS</Link>
          </nav>
        </div>

        {/* Live telemetry strip */}
        <Ticker />
      </header>

      <main id="main-content">
        <Outlet />
      </main>

      <footer id="main-footer">
        <div className="container footer-content">
          <div className="footer-left">
            <span className="footer-brand">AXEOMLABS</span>
            <div className="footer-sep" aria-hidden="true" />
            <span className="footer-meta">PROTOCOLS ACTIVE</span>
            <div className="footer-sep" aria-hidden="true" />
            <span className="footer-meta">STATUS: NOMINAL</span>
          </div>
          <div className="footer-right">
            &copy; {new Date().getFullYear()} AXEOMLABS. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
