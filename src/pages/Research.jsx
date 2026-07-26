import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import useSEO from '../hooks/useSEO';

gsap.registerPlugin(ScrollTrigger);

function Research() {
  const container = useRef(null);

  useSEO(
    'Applied Research | AxeomLabs — Robotics, Vision & Autonomous Systems',
    'AxeomLabs conducts applied research in robotics, computer vision, materials science, and autonomous navigation. Translating scientific breakthroughs into deployable products.',
    'https://www.axeomlabs.in/research'
  );

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.1 });
    tl.from('.page-hero-status', { opacity: 0, y: 10, duration: 0.5, ease: 'expo.out' })
      .from('.page-hero h1', { opacity: 0, y: 50, duration: 1, ease: 'expo.out' }, '-=0.2')
      .from('.page-hero-desc', { opacity: 0, y: 16, duration: 0.7, ease: 'expo.out' }, '-=0.5');

    gsap.from('.page-hero-image', { opacity: 0, scale: 1.03, duration: 1.4, ease: 'power2.out', delay: 0.2 });

    gsap.to('.indicator-bar', {
      width: '100%', ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.2 },
    });

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

    return () => obs.disconnect();
  }, { scope: container });

  return (
    <div ref={container}>
      {/* HERO */}
      <section className="page-hero" aria-label="Research Division">
        <div className="page-hero-bg" aria-hidden="true" />
        <div className="page-hero-layout">
          <div className="page-hero-left">
            <div className="page-hero-status">[ DEPT 04 : ADVANCED DISCOVERIES ]</div>
            <h1>GLOBAL<br />IMPACT.</h1>
            <p className="page-hero-desc">
              Exploring the physical limits of our universe, the molecular foundations of matter,
              and the cultural resonance of human endeavor.
            </p>
          </div>
          <div className="page-hero-right">
            <img
              src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=900&q=85"
              alt="Earth from Space"
              className="page-hero-image"
            />
            <div className="page-hero-meta">
              <span>LAT: 34.0522 N | LON: 118.2437 W</span>
              <span>SYS STATE: STABLE</span>
            </div>
          </div>
        </div>
      </section>

      {/* APPLIED SCIENCES */}
      <section className="page-section" aria-label="Applied Sciences">
        <div className="container">
          <div className="research-header reveal">
            <div className="section-label">01 // APPLIED SCIENCES</div>
          </div>

          <div className="research-grid">
            {/* Astrophysics text */}
            <div className="research-card research-card-half reveal">
              <span className="section-counter">01 // ASTROPHYSICS</span>
              <h3 style={{ marginTop: 12 }}>Deep Space Telemetry</h3>
              <p>Analyzing signal propagation across vast interstellar distances to optimize communication arrays for autonomous probes.</p>
            </div>

            {/* Astrophysics image */}
            <div className="research-card research-card-half research-card-img reveal">
              <img src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80" alt="Nebula" />
            </div>

            {/* Chemistry image */}
            <div className="research-card research-card-half research-card-img reveal">
              <img
                src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80"
                alt="Molecular structures"
                style={{ objectPosition: 'center' }}
              />
            </div>

            {/* Chemistry text */}
            <div className="research-card research-card-half reveal">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className="section-counter">02 // CHEMISTRY</span>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--on-bg-muted)', textAlign: 'right', lineHeight: 1.6 }}>
                  COMPOUND #22<br />MOL.WEIGHT: 194.19 g/mol
                </div>
              </div>
              <h3 style={{ marginTop: 12 }}>Molecular Synthetics</h3>
              <p style={{ marginTop: 8 }}>Engineering novel compound structures for targeted biological and materials applications at nanoscale precision.</p>
            </div>

            {/* Oceanography */}
            <div className="research-card research-card-third reveal">
              <span className="section-counter">03 // OCEANOGRAPHY</span>
              <div className="research-card-img-inline">
                <img src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&q=80" alt="Ocean depth" />
              </div>
              <h4 style={{ marginTop: 12 }}>19,000m</h4>
              <p>Mariana Trench acoustic mapping completed. Data integrity: 96.8%.</p>
            </div>

            {/* Bioscience */}
            <div className="research-card research-card-third reveal">
              <span className="section-counter">04 // BIOSCIENCE</span>
              <h3 style={{ marginTop: 12 }}>Cellular Adaptation</h3>
              <p style={{ marginTop: 8 }}>Observing micro-evolutionary traits in extreme high-pressure environments.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 16 }}>
                <div className="sample-box">
                  <span className="sample-label">SAMPLE A</span>
                  <span className="sample-val">ACTIVE</span>
                </div>
                <div className="sample-box">
                  <span className="sample-label">SAMPLE B</span>
                  <span className="sample-val">DORMANT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CULTURE */}
      <section className="page-section" id="culture" aria-label="Human Experiences and Culture">
        <div className="container">
          <div className="culture-layout">
            <div className="culture-left reveal-left">
              <div className="section-label">02 // HUMAN EXPERIENCES + CULTURE</div>
              <h2 style={{ marginTop: 16, color: 'var(--on-bg)' }}>The Synthesis of Logic and Emotion.</h2>
              <p>
                Culture is the qualitative output of human civilization. We index artistic movements,
                sociological shifts, and philosophical frameworks with the same rigor applied to thermodynamics.
              </p>
              <button className="btn-primary" style={{ marginTop: 32 }}>
                VIEW ARCHIVES <span aria-hidden="true">→</span>
              </button>
            </div>
            <div className="reveal">
              <img
                src="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&q=80"
                alt="Abstract Art"
                className="culture-img"
              />
              <div className="culture-meta">[ AESTHETIC FRAMEWORK : ACTIVE ]</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Research;
