import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import useSEO from '../hooks/useSEO';
import useReducedMotion from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const techResearch = [
  {
    num: '01',
    label: 'CORE DEVELOPMENT',
    title: 'Task-Capable Robotics',
    desc: 'Developing robotic platforms and autonomous capabilities for precise work in hazardous and remote environments.',
    stat: 'PHASE 02',
  },
  {
    num: '02',
    label: 'PROTOTYPE & INTEGRATION',
    title: 'Integrated Systems',
    desc: 'Bringing robotic platforms and autonomous capabilities together as dependable, task-ready systems.',
    stat: 'PHASE 03',
  },
  {
    num: '03',
    label: 'TESTING & VALIDATION',
    title: 'Extreme Environment Readiness',
    desc: 'Validating system performance in simulated extreme environments before pursuing flight qualification and mission partnerships.',
    stat: 'PHASE 04',
  },
  {
    num: '04',
    label: 'SPACE DEPLOYMENT',
    title: 'Outpost Preparation',
    desc: 'Long-term, robotic systems could help prepare and maintain the infrastructure needed for lunar and Martian exploration.',
    stat: 'PHASE 05',
  },
];

const scienceResearch = [
  { num: '01', label: 'INFRASTRUCTURE MAINTENANCE', desc: 'Inspecting and repairing essential systems in harsh and remote environments.' },
  { num: '02', label: 'MATERIAL HANDLING', desc: 'Transporting and positioning heavy resources safely where human access is limited.' },
  { num: '03', label: 'AUTONOMOUS CONSTRUCTION', desc: 'Building physical structures without requiring people to be present at the worksite.' },
  { num: '04', label: 'REMOTE INDUSTRIAL OPERATIONS', desc: 'Near-term applications for robotic systems in hazardous and remote operations on Earth.' },
  { num: '05', label: 'EXTREME ENVIRONMENTS', desc: 'Engineering robotic systems for precision, performance, and dependable operation in demanding conditions.' },
  { num: '06', label: 'RESEARCH & DEVELOPMENT', desc: 'Establishing the technical foundation and system architecture for future robotic platforms.' },
  { num: '07', label: 'CORE DEVELOPMENT', desc: 'Developing the robotic platforms and autonomous capabilities required for the mission.' },
  { num: '08', label: 'PROTOTYPE INTEGRATION', desc: 'Building and demonstrating integrated robotic systems.' },
  { num: '09', label: 'TESTING & VALIDATION', desc: 'Evaluating performance in simulated extreme environments.' },
  { num: '10', label: 'LUNAR & MARTIAN OUTPOSTS', desc: 'Long-term preparation and maintenance of infrastructure for lunar and Martian exploration.' },
];

function Research() {
  const container = useRef(null);

  useSEO(
    'Space Robotics Research | AxeomLabs',
    'AxeomLabs develops task-capable robotic systems for infrastructure maintenance, material handling, and autonomous construction in extreme environments, with a long-term focus on lunar and Martian outposts.',
    'https://www.axeomlabs.in/research'
  );

  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!prefersReducedMotion) {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.from('.page-hero-status', { opacity: 0, y: 10, duration: 0.5, ease: 'expo.out' })
        .from('.page-hero h1', { opacity: 0, y: 50, duration: 1, ease: 'expo.out' }, '-=0.2')
        .from('.page-hero-desc', { opacity: 0, y: 16, duration: 0.7, ease: 'expo.out' }, '-=0.5');

      gsap.from('.page-hero-image', { opacity: 0, scale: 1.03, duration: 1.4, ease: 'power2.out', delay: 0.2 });
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
          { '@type': 'ListItem', 'position': 2, 'name': 'Research', 'item': 'https://www.axeomlabs.in/research' },
        ],
      }) }} />

      {/* HERO */}
      <section className="page-hero" aria-label="Research Division">
        <div className="page-hero-bg" aria-hidden="true" />
        <div className="container page-hero-container">
          {/* BREADCRUMB */}
          <nav aria-label="Breadcrumb" className="page-breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">›</span>
            <span className="current">Research</span>
          </nav>

          <div className="page-hero-layout">
            <div className="page-hero-left">
              <div className="page-hero-status">[ RESEARCH: MISSION SYSTEMS ]</div>
              <h1>BUILDING FOR<br />THE FRONTIER.</h1>
              <p className="page-hero-desc">
                Applied engineering for robotic work in harsh and remote environments. Our roadmap
                moves from Earth operations toward systems for future lunar and Martian outposts.
              </p>
            </div>
            <div className="page-hero-right">
              <div className="page-hero-img-wrap">
                <img
                  src="/assets/space/moon-surface.jpg"
                  alt="Craters along the Moon's shadowed surface, representing the lunar horizon of the roadmap."
                  className="page-hero-image"
                  width="1200"
                  height="800"
                />
                <div className="page-hero-meta">
                  <span>FOCUS: EXTREME ENVIRONMENTS</span>
                  <span>HORIZON: EARTH / LUNAR / MARTIAN</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPLIED TECHNOLOGY RESEARCH */}
      <section className="page-section" aria-label="Core Technology Research">
        <div className="container">
          <div className="research-header reveal">
            <div className="section-label">01 // APPLIED TECHNOLOGY RESEARCH</div>
            <p style={{ marginTop: 12, color: 'var(--on-bg-dim)', fontSize: 14, maxWidth: '60ch' }}>
              Research and engineering that move toward dependable, task-capable robotic systems
              for infrastructure, material handling, and autonomous construction.
            </p>
          </div>

          <div className="research-grid" style={{ marginTop: 40 }}>
            {techResearch.map((area, i) => (
              <div key={i} className="research-card research-card-half reveal">
                <span className="section-counter">{area.num} // {area.label}</span>
                <h3 style={{ marginTop: 12 }}>{area.title}</h3>
                <p style={{ marginTop: 8 }}>{area.desc}</p>
                <div style={{
                  marginTop: 16, fontFamily: 'var(--font-mono)',
                  fontSize: 10, color: 'var(--accent)', letterSpacing: '0.08em',
                }}>
                  ◎ {area.stat}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATIONS AND DEVELOPMENT ROADMAP */}
      <section className="page-section" style={{ background: 'var(--bg-secondary)' }} aria-label="Applications and development roadmap">
        <div className="container">
          <div className="research-header reveal">
            <div className="section-label">02 // APPLICATIONS & DEVELOPMENT ROADMAP</div>
            <p style={{ marginTop: 12, color: 'var(--on-bg-dim)', fontSize: 14, maxWidth: '60ch' }}>
              Our near-term focus is remote and hazardous work on Earth. The long-term direction is
              robotic preparation and maintenance of lunar and Martian outposts.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1px',
            background: 'var(--border)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--rounded-md)',
            overflow: 'hidden',
            marginTop: 40,
          }}>
            {scienceResearch.map((area, i) => (
              <div key={i} className="reveal" style={{
                background: 'var(--bg-card)',
                padding: 'calc(var(--unit) * 4)',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 9,
                  letterSpacing: '0.12em', color: 'var(--accent)',
                  textTransform: 'uppercase',
                }}>
                  {area.num} // {area.label}
                </span>
                <p style={{
                  marginTop: 12, fontSize: 13,
                  color: 'var(--on-bg-dim)', lineHeight: 1.7,
                }}>
                  {area.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="page-section" aria-label="Research approach">
        <div className="container">
          <div className="culture-layout">
            <div className="culture-left reveal-left">
              <div className="section-label">03 // OUR APPROACH</div>
              <h2 style={{ marginTop: 16, color: 'var(--on-bg)' }}>Integrated. Built for Extremes.</h2>
              <p>
                We are working toward robotic systems that can perform practical tasks in environments
                where access is difficult or hazardous, starting with infrastructure and material handling.
              </p>
              <p style={{ marginTop: 16 }}>
                The roadmap includes prototype integration and validation in simulated extreme environments,
                followed by flight qualification and mission partnerships.
              </p>
              <Link to="/research" className="btn-primary" style={{ marginTop: 32 }}>
                EXPLORE MISSION SYSTEMS <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="reveal">
              <div className="research-img-stack">
                <img
                  src="/assets/space/industrial-robot-arm.jpg"
                  alt="Industrial robotic arm on a manufacturing line."
                  className="research-stack-img research-stack-top"
                  loading="lazy"
                  width="700"
                  height="467"
                />
                <img
                  src="/assets/space/robot-control-board.jpg"
                  alt="Microchip and components on a control board."
                  className="research-stack-img research-stack-bot"
                  loading="lazy"
                  width="700"
                  height="467"
                />
              </div>
              <div className="culture-meta">[ TESTING &amp; VALIDATION : ROADMAP ]</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Research;
