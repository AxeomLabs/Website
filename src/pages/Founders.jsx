import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import useReducedMotion from '../hooks/useReducedMotion';

function Founders() {
  const container = useRef(null);

  useSEO(
    'Our Founders | AxeomLabs',
    'Harinandan J V and Abhishek A S started AxeomLabs to build machines that actually work in the real world. Drones, robots, hardware, software, all of it.',
    'https://www.axeomlabs.in/founders'
  );

  const prefersReducedMotion = useReducedMotion();

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
      {/* STRUCTURED DATA */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.axeomlabs.in/' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Founders', 'item': 'https://www.axeomlabs.in/founders' },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          '@context': 'https://schema.org',
          '@type': 'Person',
          '@id': 'https://www.axeomlabs.in/founders#harinandan',
          'name': 'Harinandan J V',
          'jobTitle': 'Co-Founder',
          'worksFor': { '@id': 'https://www.axeomlabs.in/#organization' },
          'url': 'https://www.linkedin.com/in/harinandanjv',
          'sameAs': ['https://www.linkedin.com/in/harinandanjv'],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'Person',
          '@id': 'https://www.axeomlabs.in/founders#abhishek',
          'name': 'Abhishek A S',
          'jobTitle': 'Co-Founder',
          'worksFor': { '@id': 'https://www.axeomlabs.in/#organization' },
          'url': 'https://www.linkedin.com/in/abhishek-a-s',
          'sameAs': ['https://www.linkedin.com/in/abhishek-a-s'],
        },
      ]) }} />

      {/* HERO */}
      <section className="page-hero" aria-label="Founders">
        <div className="page-hero-bg" aria-hidden="true" />
        <div className="container page-hero-container">
          {/* BREADCRUMB */}
          <nav aria-label="Breadcrumb" className="page-breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">›</span>
            <span className="current">Founders</span>
          </nav>

          <div className="page-hero-layout">
            <div className="page-hero-left">
              <div className="page-hero-status">[ ABOUT THE FOUNDERS ]</div>
              <h1>THE PEOPLE<br />BEHIND IT.</h1>
              <p className="page-hero-desc">
                AxeomLabs was founded by two builders who refused to separate
                hardware from software, or theory from practice.
              </p>
            </div>
            <div className="page-hero-right">
              <div className="page-hero-img-wrap" style={{ padding: '24px', background: 'var(--bg-card)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', color: 'var(--accent)' }}>AXL // LEADERSHIP DOSSIER</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--on-bg-muted)' }}>EST. 2024</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--on-bg-muted)', marginBottom: '4px' }}>OPERATIONS</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--on-bg)' }}>R&D / PRODUCTION</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--on-bg-muted)', marginBottom: '4px' }}>LOCATION</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--on-bg)' }}>INDIA</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--on-bg-muted)', marginBottom: '4px' }}>FOUNDING PHILOSOPHY</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--on-bg)' }}>PHYSICAL-FIRST COGNITION</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--on-bg-muted)', marginBottom: '4px' }}>FIELD STATUS</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#4ade80' }}>ACTIVE DEPLOYMENTS</div>
                    </div>
                  </div>
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--on-bg-dim)', lineHeight: 1.6 }}>
                    "We build systems that operate in the physical world where failure is real and edge cases cannot be simulated away."
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                  Harinandan co-founded AxeomLabs and leads the overall architecture of our systems. He works across hardware design, software, and research, and is the one who usually figures out what the project actually needs to be.
                </p>
                <div className="founder-links">
                  <a href="https://www.linkedin.com/in/harinandanjv" target="_blank" rel="noopener noreferrer" className="founder-link" aria-label="Harinandan J V LinkedIn profile">LinkedIn</a>
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
                  Abhishek co-founded AxeomLabs and focuses on the hardware side of things. PCB design, electronics, power systems, and making sure the physical parts of a system don't let the software down.
                </p>
                <div className="founder-links">
                  <a href="https://www.linkedin.com/in/abhishek-a-s" target="_blank" rel="noopener noreferrer" className="founder-link" aria-label="Abhishek A S LinkedIn profile">LinkedIn</a>
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
                AxeomLabs started because we kept running into the same problem: software people don't
                understand hardware, and hardware people don't understand software. We wanted to build a company
                where those two things were never separate to begin with.
              </p>
              <p>
                We build drones that think, robots that move through real terrain, and the software that ties
                it all together. Everything we ship gets tested in the field, not just on a bench.
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
