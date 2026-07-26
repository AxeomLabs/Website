import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import useSEO from '../hooks/useSEO';

function Founders() {
  const container = useRef(null);

  useSEO(
    'Our Founders | AxeomLabs — Harinandan J V & Abhishek A S',
    'Meet Harinandan J V and Abhishek A S, the co-founders of AxeomLabs — the team building autonomous drones, robotics platforms, and intelligent hardware from India.',
    'https://www.axeomlabs.in/founders'
  );

  useGSAP(() => {
    gsap.from('.page-hero h1', { opacity: 0, y: 50, duration: 1, ease: 'expo.out', delay: 0.1 });
    gsap.from('.page-hero-desc', { opacity: 0, y: 16, duration: 0.7, ease: 'expo.out', delay: 0.4 });
    gsap.from('.page-hero-status', { opacity: 0, y: 10, duration: 0.5, ease: 'expo.out', delay: 0.1 });

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.06 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, { scope: container });

  return (
    <div ref={container}>
      {/* HERO */}
      <section className="page-hero" aria-label="Founders">
        <div className="page-hero-bg" aria-hidden="true" />
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'calc(80px + var(--margin)) var(--margin) var(--margin)', width: '100%' }}>
          <div className="page-hero-status">[ ABOUT THE FOUNDERS ]</div>
          <h1 style={{ marginTop: 24 }}>THE PEOPLE<br />BEHIND IT.</h1>
          <p className="page-hero-desc" style={{ maxWidth: '52ch' }}>
            AxeomLabs was founded by two builders who refused to separate
            hardware from software, or theory from practice.
          </p>
        </div>
      </section>

      {/* FOUNDERS GRID */}
      <section className="page-section" aria-label="Our founders">
        <div className="container">
          <div className="founders-grid">

            {/* Founder 1 */}
            <article className="founder-card reveal">
              <div className="founder-img-wrap">
                <div className="founder-img-placeholder" aria-hidden="true">
                  <span>HJV</span>
                </div>
              </div>
              <div className="founder-info">
                <div className="founder-code">CO-FOUNDER</div>
                <h2 className="founder-name">Harinandan J V</h2>
                <p className="founder-role">Co-Founder</p>
                <p className="founder-bio">
                  Co-Founder of AxeomLabs, leading architecture and engineering across vertically integrated systems, autonomous platforms, and advanced research.
                </p>
                <div className="founder-links">
                  <a href="#" className="founder-link" aria-label="LinkedIn profile">LinkedIn</a>
                </div>
              </div>
            </article>

            {/* Founder 2 */}
            <article className="founder-card reveal">
              <div className="founder-img-wrap">
                <div className="founder-img-placeholder" aria-hidden="true">
                  <span>AAS</span>
                </div>
              </div>
              <div className="founder-info">
                <div className="founder-code">CO-FOUNDER</div>
                <h2 className="founder-name">Abhishek A S</h2>
                <p className="founder-role">Co-Founder</p>
                <p className="founder-bio">
                  Co-Founder of AxeomLabs, driving hardware innovation, intelligence protocols, and full-stack integration for high-performance physical computation.
                </p>
                <div className="founder-links">
                  <a href="#" className="founder-link" aria-label="LinkedIn profile">LinkedIn</a>
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="page-section" style={{ background: 'var(--bg-secondary)' }} aria-label="Our story">
        <div className="container">
          <div className="story-layout reveal">
            <div className="story-label-col">
              <div className="section-label">OUR STORY</div>
            </div>
            <div className="story-text-col">
              <p>
                AxeomLabs started with a simple observation: the gap between software intelligence
                and real-world physical systems is enormous. Bridging it requires people who can
                think across the full stack, from electron to algorithm.
              </p>
              <p>
                We build drones that think, robots that adapt, and software that makes hardware
                come alive. Every system we ship is vertically integrated, tested in the field,
                and built to last.
              </p>
              <a href="/#cta" className="btn-primary" style={{ marginTop: 32, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                WORK WITH US <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Founders;
