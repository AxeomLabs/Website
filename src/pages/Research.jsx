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
    label: 'AUTONOMOUS NAVIGATION',
    title: 'SLAM & Sensor Fusion',
    desc: 'We fuse LiDAR, IMU, and stereo cameras to build maps and locate robots within them at the same time. The goal is reliable navigation in places where GPS is unavailable or untrustworthy.',
    stat: 'Sub-10cm positional accuracy',
  },
  {
    num: '02',
    label: 'COMPUTER VISION',
    title: 'Edge Perception Systems',
    desc: 'Object detection, depth estimation, and scene understanding that runs directly on embedded processors. No cloud, no latency dependency. The camera sees, the chip decides.',
    stat: '<15ms inference on ARM Cortex-A',
  },
  {
    num: '03',
    label: 'MATERIALS SCIENCE',
    title: 'Structural Hardware Research',
    desc: 'We work with carbon fibre composites, lattice-infill printed structures, and geometry borrowed from nature to make airframes and chassis that are lighter without being weaker.',
    stat: '40% weight reduction vs. aluminium baseline',
  },
  {
    num: '04',
    label: 'EMBEDDED AI',
    title: 'On-Device Intelligence',
    desc: 'Getting large models to run on tiny chips. Quantization, pruning, knowledge distillation. We want AI that fits inside a microcontroller with under 512KB of RAM.',
    stat: 'INT8 inference on Cortex-M7',
  },
];

const scienceResearch = [
  { num: '01', label: 'ASTROPHYSICS & ASTRONOMY', desc: 'How things move and radiate at scales humans will never directly touch. We study signal propagation, cosmic phenomena, and deep-space mechanics because space is where some of our hardware is headed.' },
  { num: '02', label: 'PHYSICS', desc: 'The foundation. Mechanics, electrodynamics, quantum systems. We go back to physics when an engineering problem stops making sense, because the answer is almost always in there.' },
  { num: '03', label: 'CHEMISTRY', desc: 'New compounds, better batteries, smarter material coatings. The physical world is made of chemistry and our hardware lives in it.' },
  { num: '04', label: 'OCEANOGRAPHY', desc: 'Pressure at depth, sonar through seawater, marine ecosystems. Understanding the ocean is necessary if you are building robots that go into it.' },
  { num: '05', label: 'EARTH & ENVIRONMENTAL', desc: 'Atmospheric data, geological sensing, environmental monitoring. Our autonomous systems operate in the real world and need to understand it.' },
  { num: '06', label: 'BIOLOGICAL RESEARCH', desc: 'Animals have solved locomotion problems we are still working on. We study how they move, adapt, and sense so we can borrow those solutions for robotics.' },
  { num: '07', label: 'ROCKETS & SPACE PRODUCTION', desc: 'Propulsion, launch vehicle design, orbital payload integration. This is a long-term direction and we are building toward it deliberately.' },
  { num: '08', label: 'POWER & ENERGY', desc: 'Dense storage, efficient generation, smart power management. Autonomous systems run out of energy at the worst times. We are trying to fix that.' },
  { num: '09', label: 'INTERDISCIPLINARY PRODUCTION', desc: 'Most interesting problems sit between fields. This is where we put work that does not fit neatly into one category but still ends up as something real.' },
  { num: '10', label: 'CREATIVE PRODUCTION', desc: 'Science without communication is just notes. We put effort into how we present our work, through film, interactive media, and design.' },
];

function Research() {
  const container = useRef(null);

  useSEO(
    'Applied Research | AxeomLabs',
    'AxeomLabs conducts applied research spanning astrophysics, oceanography, chemistry, biology, autonomous navigation, computer vision, embedded AI, and materials science.',
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

      {/* BREADCRUMB */}
      <nav aria-label="Breadcrumb" style={{
        position: 'absolute', top: 88, left: 'var(--margin)',
        fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em',
        color: 'var(--on-bg-muted)', zIndex: 10, display: 'flex', gap: 8, alignItems: 'center',
      }}>
        <Link to="/" style={{ color: 'var(--on-bg-muted)', textTransform: 'uppercase' }}>Home</Link>
        <span aria-hidden="true">›</span>
        <span style={{ color: 'var(--accent)', textTransform: 'uppercase' }}>Research</span>
      </nav>

      {/* HERO */}
      <section className="page-hero" aria-label="Research Division">
        <div className="page-hero-bg" aria-hidden="true" />
        <div className="page-hero-layout">
          <div className="page-hero-left">
            <div className="page-hero-status">[ DEPT 04 : RESEARCH ]</div>
            <h1>GLOBAL<br />IMPACT.</h1>
            <p className="page-hero-desc">
              We work across astrophysics, chemistry, oceanography, and biology alongside
              robotics and AI. The science informs the hardware. The hardware tests the science.
            </p>
          </div>
          <div className="page-hero-right">
            <img
              src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=1200&q=85"
              alt="Earth from orbit, representing AxeomLabs global research in astrophysics and space"
              className="page-hero-image"
              width="1200"
              height="800"
            />
            <div className="page-hero-meta">
              <span>[ DOMAINS: 10 ACTIVE ]</span>
              <span>SYS STATE: STABLE</span>
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
              This is research that goes straight into hardware. Algorithms, materials, and control
              systems that end up in our drones, robots, and embedded products.
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

      {/* SCIENTIFIC RESEARCH DOMAINS */}
      <section className="page-section" style={{ background: 'var(--bg-secondary)' }} aria-label="Scientific Research Domains">
        <div className="container">
          <div className="research-header reveal">
            <div className="section-label">02 // SCIENTIFIC RESEARCH DOMAINS</div>
            <p style={{ marginTop: 12, color: 'var(--on-bg-dim)', fontSize: 14, maxWidth: '60ch' }}>
              We are genuinely curious about the world. Physics, chemistry, biology, the cosmos.
              We study these things because breakthroughs in science eventually become possible in engineering,
              and we want to be ready when they do.
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
              <h2 style={{ marginTop: 16, color: 'var(--on-bg)' }}>Hardware-First. Field-Validated.</h2>
              <p>
                Every research area we work in has a path to something real. Sometimes that is a
                product. Sometimes it is a fundamental capability that makes a future product possible.
                Either way, we don't do research for its own sake.
              </p>
              <p style={{ marginTop: 16 }}>
                We test in the field. Open terrain, ocean conditions, actual airspace.
                If it only works in a controlled environment, it doesn't count.
              </p>
              <Link to="/research" className="btn-primary" style={{ marginTop: 32 }}>
                EXPLORE AI RESEARCH <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="reveal">
              <div className="research-img-stack">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=700&q=85"
                  alt="Engineer working on robotics hardware in a lab environment"
                  className="research-stack-img research-stack-top"
                  loading="lazy"
                  width="700"
                  height="467"
                />
                <img
                  src="https://images.unsplash.com/photo-1606206591513-adbfbdd8e5e0?w=700&q=85"
                  alt="Close up of a circuit board and electronic components"
                  className="research-stack-img research-stack-bot"
                  loading="lazy"
                  width="700"
                  height="467"
                />
              </div>
              <div className="culture-meta">[ FIELD TESTING : ACTIVE ]</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Research;
