import { useRef, useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Animated noise grain overlay
function GrainOverlay() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

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

    function drawGrain() {
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        data[i] = data[i + 1] = data[i + 2] = v;
        data[i + 3] = 255;
      }
      ctx.putImageData(imageData, 0, 0);
      animRef.current = requestAnimationFrame(drawGrain);
    }
    drawGrain();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} id="grain-canvas" aria-hidden="true" />;
}

// Cursor glow
function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    const onMove = (e) => {
      gsap.to(glow, { x: e.clientX, y: e.clientY, duration: 0.8, ease: 'power2.out' });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return <div ref={glowRef} id="cursor-glow" aria-hidden="true" />;
}

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
    return () => { lenis.destroy(); };
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

  const navLinks = [
    { label: 'ROBOTICS', path: '/robotics' },
    { label: 'AI', path: '/#directives' },
    { label: 'SYSTEMS', path: '/systems' },
    { label: 'RESEARCH', path: '/research' },
  ];

  const isActive = (path) => {
    if (path.startsWith('/#')) return location.pathname === '/';
    return location.pathname === path.split('#')[0];
  };

  return (
    <div>
      <GrainOverlay />
      <CursorGlow />

      <div id="scroll-indicator"><div className="indicator-bar" /></div>

      <header id="global-nav" className={scrolled ? 'scrolled' : ''}>
        <div className="container nav-container">
          <Link to="/" className="nav-logo">
            <span className="nav-logo-dot" aria-hidden="true" />
            AXEOMLABS
          </Link>
          <nav className="nav-links" aria-label="Primary navigation">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={isActive(link.path) ? 'nav-active' : ''}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/#cta" className="nav-portal">ACCESS</Link>
          </nav>
        </div>
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
            © {new Date().getFullYear()} AXEOMLABS — ALL RIGHTS RESERVED
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
