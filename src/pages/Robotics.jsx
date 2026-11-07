import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import useSEO from '../hooks/useSEO';
import useReducedMotion from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const roboticsSystems = [
  { icon: '✦', label: 'AUTONOMOUS CONSTRUCTION', desc: 'Robotic systems that can build the structures required for future exploration.' },
  { icon: '≋', label: 'REMOTE OPERATIONS', desc: 'Near-term applications in hazardous and remote industrial environments on Earth.' },
  { icon: '◎', label: 'SPACE DEPLOYMENT', desc: 'A long-term direction toward preparing and maintaining lunar and Martian outposts.' },
];

function Robotics() {
  const container = useRef(null);

  useSEO(
    'Space Robotics | AxeomLabs',
    'AxeomLabs develops task-capable robotic systems for infrastructure maintenance, material handling, and autonomous construction in extreme environments.',
    'https://www.axeomlabs.in/robotics'
  );

  const prefersReducedMotion = useReducedMotion();

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
      {/* STRUCTURED DATA */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.axeomlabs.in/' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Robotics', 'item': 'https://www.axeomlabs.in/robotics' },
        ],
      }) }} />

      {/* HERO */}
      <section className="page-hero" aria-label="Robotics Division">
        <div className="page-hero-bg" aria-hidden="true" />
        <div className="container page-hero-container">
          {/* BREADCRUMB */}
          <nav aria-label="Breadcrumb" className="page-breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">›</span>
            <span className="current">Robotics</span>
          </nav>

          <div className="page-hero-layout">
            <div className="page-hero-left">
              <div className="page-hero-status">[ DIVISION: SPACE ROBOTICS ]</div>
              <h1>ROBOTICS FOR<br />EXTREME PLACES.</h1>
              <p className="page-hero-desc">
                We develop dependable, task-capable systems for operation in harsh and remote environments.
                Near-term work begins on Earth, with a long-term focus on lunar and Martian outposts.
              </p>
              <Link to="/contact" className="btn-primary page-hero-cta">GET IN TOUCH <span aria-hidden="true">→</span></Link>
            </div>
            <div className="page-hero-right">
              <div className="page-hero-img-wrap">
                <img
                  src="/assets/space/planetary-rover-test.jpg"
                  alt="Mars rover test vehicle at an Earth-based outdoor test facility."
                  className="page-hero-image"
                  width="900"
                  height="600"
                />
                <div className="page-hero-meta">
                  <span>ROADMAP: IN DEVELOPMENT</span>
                  <span>MISSION: EXTREME ENVIRONMENTS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPLIED ROBOTICS */}
      <section className="page-section" aria-label="Applied Robotics">
        <div className="container">
          <div className="section-header-row reveal">
            <div>
              <div className="section-label">01 // KINETIC SYSTEMS</div>
              <h2>APPLIED ROBOTICS</h2>
            </div>
              <span className="section-counter">CORE APPLICATIONS</span>
          </div>

          <div className="applied-grid">
            {/* Infrastructure maintenance */}
            <div className="robo-card robo-card-featured reveal">
              <div className="robo-card-inner">
                <div className="robo-card-content">
                  <h3>INFRASTRUCTURE</h3>
                  <p>Robotic systems for inspecting and repairing essential infrastructure in harsh and remote environments.</p>
                  <Link to="/contact" className="link-mono">ENQUIRE <span aria-hidden="true">↗</span></Link>
                </div>
                <div className="robo-card-visual" style={{ height: '280px' }}>
                  <img
                    src="/assets/space/industrial-robot-arm.jpg"
                    alt="Industrial robotic arm on a manufacturing line, illustrating infrastructure maintenance systems."
                    loading="lazy" width="600" height="400"
                  />
                </div>
              </div>
            </div>

            {/* Material handling */}
            <div className="robo-card robo-card-featured reveal">
              <div className="robo-card-badge">[ REMOTE OPERATIONS ]</div>
              <div className="robo-card-inner">
                <div className="robo-card-content">
                  <h3>MATERIAL HANDLING</h3>
                  <p>Robotic systems for transporting and positioning heavy resources safely in hazardous and remote settings.</p>
                  <span className="link-mono" style={{ color: 'var(--on-bg-muted)', cursor: 'default' }}>EARTH TO OFF-WORLD</span>
                </div>
                <div className="robo-card-visual" style={{ height: '280px' }}>
                  <img
                    src="/assets/space/robotic-arm-lab.jpg"
                    alt="Robotic arm in an engineering laboratory, illustrating material-handling systems."
                    loading="lazy" width="600" height="400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Specialist systems row */}
          <div className="systems-row">
            {roboticsSystems.map((s, i) => (
              <div key={i} className="system-card reveal">
                <div className="system-card-icon" aria-hidden="true">{s.icon}</div>
                <h4>{s.label}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Robotics;
