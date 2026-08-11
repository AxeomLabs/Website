import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import useSEO from '../hooks/useSEO';
import useReducedMotion from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: '✦', label: 'FEATURE ONE', desc: 'Description of your first key feature or capability in this division.' },
  { icon: '≋', label: 'FEATURE TWO', desc: 'Description of your second key feature or capability in this division.' },
  { icon: '◎', label: 'FEATURE THREE', desc: 'Description of your third key feature or capability in this division.' },
];

function Division2() {
  const container = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useSEO('Division Two | Acme Labs', 'Learn about our design division.', 'https://example.com/division-2');

  useGSAP(() => {
    if (!prefersReducedMotion) {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.from('.page-hero-status', { opacity: 0, y: 10, duration: 0.5, ease: 'expo.out' })
        .from('.page-hero h1', { opacity: 0, y: 50, duration: 1, ease: 'expo.out' }, '-=0.2')
        .from('.page-hero-desc', { opacity: 0, y: 16, duration: 0.7, ease: 'expo.out' }, '-=0.5')
        .from('.page-hero-cta', { opacity: 0, y: 10, duration: 0.5, ease: 'expo.out' }, '-=0.3');
      gsap.from('.page-hero-image', { opacity: 0, scale: 1.04, duration: 1.4, ease: 'power2.out', delay: 0.2 });
    }
    gsap.to('.indicator-bar', {
      width: '100%', ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.2 },
    });
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.01, rootMargin: '50px 0px' });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, { scope: container });

  return (
    <div ref={container}>
      <section className="page-hero" aria-label="Division Two">
        <div className="page-hero-bg" aria-hidden="true" />
        <div className="page-hero-layout">
          <div className="page-hero-left">
            <div className="page-hero-status">[ DIVISION: DESIGN ]</div>
            <h1 style={{ marginTop: 16 }}>DESIGN<br />DIVISION.</h1>
            <p className="page-hero-desc" style={{ maxWidth: '48ch' }}>
              Creating human-centred design systems, brand identities,
              and spatial interfaces that connect with people.
            </p>
            <div className="page-hero-cta">
              <Link to="/contact" className="btn-primary">START A PROJECT <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <div className="page-hero-right">
            <img
              className="page-hero-image"
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80"
              alt="Design workspace"
              loading="lazy" width="800" height="533"
            />
          </div>
        </div>
      </section>

      <section className="page-section" aria-label="Features">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <div className="section-label">01 // KEY FEATURES</div>
              <h2 style={{ marginTop: 8, color: 'var(--on-bg)' }}>WHAT WE OFFER</h2>
            </div>
          </div>
          <div className="page-features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32, marginTop: 48 }}>
            {features.map((f, i) => (
              <div key={i} className="directive-card reveal">
                <div className="directive-num">{f.icon}</div>
                <h3>{f.label}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section" aria-label="Call to action">
        <div className="container" style={{ textAlign: 'center', paddingTop: 80, paddingBottom: 80 }}>
          <h2 className="reveal">READY TO BUILD?</h2>
          <p className="reveal" style={{ color: 'var(--on-bg-dim)', maxWidth: '42ch', margin: '16px auto 32px' }}>
            Let's discuss your project and see how we can help bring it to life.
          </p>
          <Link to="/contact" className="btn-primary reveal">GET IN TOUCH <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </div>
  );
}

export default Division2;
