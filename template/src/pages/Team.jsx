import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import useSEO from '../hooks/useSEO';
import useReducedMotion from '../hooks/useReducedMotion';

function Team() {
  const container = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useSEO('Our Team | Acme Labs', 'Meet the people behind Acme Labs.', 'https://example.com/team');

  useGSAP(() => {
    if (!prefersReducedMotion) {
      gsap.from('.page-hero h1', { opacity: 0, y: 50, duration: 1, ease: 'expo.out', delay: 0.1 });
      gsap.from('.page-hero-desc', { opacity: 0, y: 16, duration: 0.7, ease: 'expo.out', delay: 0.4 });
      gsap.from('.page-hero-status', { opacity: 0, y: 10, duration: 0.5, ease: 'expo.out', delay: 0.1 });
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.01, rootMargin: '50px 0px' });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, { scope: container });

  return (
    <div ref={container}>
      <section className="page-hero" aria-label="Team">
        <div className="page-hero-bg" aria-hidden="true" />
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'calc(80px + var(--margin)) var(--margin) var(--margin)', width: '100%' }}>
          <div className="page-hero-status">[ ABOUT THE TEAM ]</div>
          <h1 style={{ marginTop: 24 }}>THE PEOPLE<br />BEHIND IT.</h1>
          <p className="page-hero-desc" style={{ maxWidth: '52ch' }}>
            A team of builders who refuse to separate
            engineering from design, or theory from practice.
          </p>
        </div>
      </section>

      <section className="page-section" aria-label="Team members">
        <div className="container">
          <div className="founders-grid">
            <div className="founder-card reveal">
              <div className="founder-info">
                <h2>Jane Smith</h2>
                <div className="founder-role">CO-FOUNDER & CEO</div>
                <p>Product leader and engineer. Passionate about building technology that solves real problems.</p>
                <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer" className="founder-link">LinkedIn ↗</a>
              </div>
            </div>
            <div className="founder-card reveal">
              <div className="founder-info">
                <h2>John Doe</h2>
                <div className="founder-role">CO-FOUNDER & CTO</div>
                <p>Systems architect and designer. Obsessed with elegant solutions to complex challenges.</p>
                <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer" className="founder-link">LinkedIn ↗</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section" aria-label="Our story">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <div className="section-label">OUR STORY</div>
              <h2 style={{ color: 'var(--on-bg)', marginTop: 8 }}>WHY WE EXIST</h2>
            </div>
          </div>
          <div className="reveal" style={{ maxWidth: '72ch', marginTop: 32, lineHeight: 1.8, color: 'var(--on-bg-dim)' }}>
            <p>
              We started this company because we believed there was a better way to build technology.
              A way that combines deep engineering with thoughtful design, rigorous research with practical execution.
            </p>
            <p style={{ marginTop: 16 }}>
              Every product we build reflects that belief. We don't cut corners, we don't ship half-baked solutions,
              and we never stop iterating until the work speaks for itself.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Team;
