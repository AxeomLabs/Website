import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import useSEO from '../hooks/useSEO';
import useReducedMotion from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const domains = [
  { icon: '□', label: 'Robotics Control', desc: 'Control and embedded software for dependable, task-capable robotic platforms.', code: 'FIRMWARE / RTOS' },
  { icon: '□', label: 'Systems Integration', desc: 'Bringing robotic platforms, sensing, and autonomous capabilities into one system.', code: 'HARDWARE / SOFTWARE' },
  { icon: '□', label: 'Remote Operations', desc: 'Operational interfaces and telemetry for work at hazardous and remote sites.', code: 'FIELD OPS / TELEMETRY' },
  { icon: '□', label: 'Testing & Validation', desc: 'Validating integrated system performance in simulated extreme environments.', code: 'PROTOTYPE / TEST' },
];

const osTable = [
  { env: 'Core Development', primary: 'Robotic platforms and autonomy', chars: 'Develop the technical foundation and capabilities' },
  { env: 'Prototype Integration', primary: 'Robotics and system integration', chars: 'Bring platforms and autonomous systems together' },
  { env: 'Testing & Validation', primary: 'Simulated extreme environments', chars: 'Validate system performance before deployment' },
  { env: 'Space Deployment', primary: 'Flight qualification and partnerships', chars: 'Long-term mission direction' },
];

function Systems() {
  const container = useRef(null);

  useSEO(
    'Autonomous Systems Engineering | AxeomLabs',
    'AxeomLabs develops and integrates robotic platforms and autonomous capabilities for remote and extreme environments, with a long-term focus on space deployment.',
    'https://www.axeomlabs.in/systems'
  );

  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!prefersReducedMotion) {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.from('.page-hero-status', { opacity: 0, y: 10, duration: 0.5, ease: 'expo.out' })
        .from('.page-hero h1', { opacity: 0, y: 50, duration: 1, ease: 'expo.out' }, '-=0.2')
        .from('.page-hero-desc', { opacity: 0, y: 16, duration: 0.7, ease: 'expo.out' }, '-=0.5');

      gsap.from('.sys-metrics .metric', {
        opacity: 0, x: 16, duration: 0.4, stagger: 0.08, ease: 'power3.out', delay: 0.5,
      });
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
          { '@type': 'ListItem', 'position': 2, 'name': 'Systems', 'item': 'https://www.axeomlabs.in/systems' },
        ],
      }) }} />

      {/* HERO */}
      <section className="page-hero" aria-label="Systems Division">
        <div className="page-hero-bg" aria-hidden="true" />
        <div className="container page-hero-container">
          {/* BREADCRUMB */}
          <nav aria-label="Breadcrumb" className="page-breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">›</span>
            <span className="current">Systems</span>
          </nav>

          <div className="page-hero-layout">
            <div className="page-hero-left">
              <div className="page-hero-status">[ DIVISION: SYSTEMS ENGINEERING ]</div>
              <h1>ROBOTIC<br />SYSTEMS</h1>
              <p className="page-hero-desc">
                Dependable robotics for extreme environments requires integrated platforms, control, and autonomous capabilities.
                Our roadmap advances from core development through validation toward future space deployment.
              </p>
            </div>
            <div className="page-hero-right">
              <div className="page-hero-img-wrap">
                <img
                  src="/assets/space/robotic-arm-lab.jpg"
                  alt="Industrial robotic arm in a laboratory setting, illustrating integrated robotics systems."
                  className="page-hero-image"
                  width="900"
                  height="600"
                />
                <div className="page-hero-meta">
                  <span>DIVISION: ENGINEERING</span>
                  <span>ROADMAP: DEVELOPMENT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROBOTICS CONTROL SYSTEMS */}
      <section className="page-section" aria-label="Robotics control systems">
        <div className="container">
          <div className="section-header-row reveal">
            <div>
              <div className="section-label">01 // CORE PLATFORM</div>
            </div>
          </div>

          <div className="os-card reveal">
            <div className="os-card-layout">
              <div className="os-card-left">
                <div className="os-badge">[ SYSTEMS ENGINEERING ]</div>
                <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', marginTop: 16, color: 'var(--on-bg)' }}>
                  Robotics Control Systems
                </h2>
                <p style={{ marginTop: 16, color: 'var(--on-bg-dim)', lineHeight: 1.6, fontSize: 14 }}>
                  Dependable robotic systems combine physical platforms, sensing, control, and embedded computing.
                  We are developing and integrating these layers for precision tasks in remote and extreme environments.
                </p>
                <Link to="/contact" className="btn-primary" style={{ marginTop: 24 }}>
                  GET IN TOUCH <span aria-hidden="true">→</span>
                </Link>
                <div style={{ marginTop: 24, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--on-bg-muted)', lineHeight: 1.8 }}>
                  FOCUS: CONTROL / INTEGRATION<br />APPLICATION: REMOTE ROBOTICS
                </div>
              </div>
              <div className="os-card-right">
                <div className="os-spec-table">
                  <div className="os-spec-header">SYSTEM DESIGN <span aria-hidden="true">+</span></div>
                  <div className="os-spec-row"><span>Objective</span><span>Task-capable</span></div>
                  <div className="os-spec-row"><span>Setting</span><span>Remote / hazardous</span></div>
                  <div className="os-spec-row"><span>Approach</span><span>Integrated systems</span></div>
                </div>
                <div className="os-spec-table" style={{ marginTop: 16 }}>
                  <div className="os-spec-header">MISSION HORIZON <span aria-hidden="true">+</span></div>
                  <div className="os-spec-row"><span>Near term</span><span>Earth operations</span></div>
                  <div className="os-spec-row"><span>Long term</span><span>Lunar outposts</span></div>
                  <div className="os-spec-row"><span>Long term</span><span>Martian outposts</span></div>
                </div>
              </div>
            </div>
            <div className="os-card-img-strip">
              <img
                src="/assets/space/robot-control-board.jpg"
                alt="Microchip and components on a control board for embedded robotic systems."
                loading="lazy"
                width="1400"
                height="400"
              />
              <div className="os-card-img-overlay" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* ENGINEERING DOMAINS */}
      <section className="page-section" style={{ background: 'var(--bg-secondary)' }} aria-label="Engineering Domains">
        <div className="container">
          <div className="section-header-row reveal">
            <div>
              <div className="section-label">02 // SYSTEMS DEVELOPMENT</div>
              <h3 style={{ marginTop: 8, fontWeight: 500, maxWidth: '24ch', color: 'var(--on-bg)' }}>
                Integrated robotic systems for demanding environments.
              </h3>
            </div>
            <Link to="/contact" className="btn-secondary">ENQUIRE <span aria-hidden="true">→</span></Link>
          </div>

          <div className="domains-grid">
            {domains.map((d, i) => (
              <div key={i} className="domain-card reveal">
                <div className="domain-icon" aria-hidden="true">{d.icon}</div>
                <h4>{d.label}</h4>
                <p>{d.desc}</p>
                <span className="domain-code">{d.code}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OS CLASSIFICATION TABLE */}
      <section className="page-section" aria-label="Robotic systems roadmap">
        <div className="container">
          <div className="section-label reveal">ROBOTIC SYSTEMS ROADMAP</div>
          <div className="os-table reveal" style={{ marginTop: 24 }}>
            <div className="os-table-header">
                <span>PHASE</span>
                <span>FOCUS</span>
                <span>OBJECTIVE</span>
                <span>HORIZON</span>
            </div>
            {osTable.map((row, i) => (
              <div key={i} className="os-table-row">
                <span>{row.env}</span>
                <span>{row.primary}</span>
                <span>{row.chars}</span>
                <span>ROADMAP</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Systems;
