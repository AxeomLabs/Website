import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import useSEO from '../hooks/useSEO';

gsap.registerPlugin(ScrollTrigger);

const roboticsSystems = [
  { icon: '✦', label: 'AERIAL SYSTEMS', desc: 'UAVs utilizing turbulent airflow adaptation and LiDAR mapping for extreme environments.' },
  { icon: '≋', label: 'UNDERWATER', desc: 'Submersibles engineered for deep-sea pressure resistance and acoustic sonar navigation.' },
  { icon: '◎', label: 'ARCHAEOLOGICAL', desc: 'Micro-tread systems with delicate excavation appendages and ground-penetrating radar.' },
];

function Robotics() {
  const container = useRef(null);

  useSEO(
    'Robotics Platforms | AxeomLabs — Ground, Aerial & Aquatic Robots',
    'AxeomLabs builds ground, aerial, and aquatic robotics platforms with tactile sensing, real-time navigation, and edge AI for complex unstructured environments.',
    'https://www.axeomlabs.in/robotics'
  );

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.1 });
    tl.from('.page-hero-status', { opacity: 0, y: 10, duration: 0.5, ease: 'expo.out' })
      .from('.page-hero h1', { opacity: 0, y: 50, duration: 1, ease: 'expo.out' }, '-=0.2')
      .from('.page-hero-desc', { opacity: 0, y: 16, duration: 0.7, ease: 'expo.out' }, '-=0.5')
      .from('.page-hero-cta', { opacity: 0, y: 10, duration: 0.5, ease: 'expo.out' }, '-=0.3');

    gsap.from('.page-hero-image', { opacity: 0, scale: 1.04, duration: 1.4, ease: 'power2.out', delay: 0.2 });

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
      <section className="page-hero" aria-label="Robotics Division">
        <div className="page-hero-bg" aria-hidden="true" />
        <div className="page-hero-layout">
          <div className="page-hero-left">
            <div className="page-hero-status">[ DIVISION: ROBOTICS + AI ]</div>
            <h1>INTELLIGENCE<br />EMBODIED.</h1>
            <p className="page-hero-desc">
              Bridging the gap between raw algorithmic cognition and physical articulation.
              AxeomLabs pioneers next-generation autonomous systems and proto-AGI architectures.
            </p>
            <button className="btn-primary page-hero-cta">INITIATE SEQUENCE <span aria-hidden="true">→</span></button>
          </div>
          <div className="page-hero-right">
            <img
              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&q=85"
              alt="Humanoid Robot"
              className="page-hero-image"
            />
            <div className="page-hero-meta">
              <span>[ STATUS: ACTIVE ]</span>
              <span>MODEL: AXL-7 PROTOTYPE</span>
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
            <span className="section-counter">TWO FLAGSHIP PLATFORMS</span>
          </div>

          <div className="applied-grid">
            {/* Humanoid */}
            <div className="robo-card robo-card-featured reveal">
              <div className="robo-card-inner">
                <div className="robo-card-content">
                  <h3>HUMANOID</h3>
                  <p>Biomimetic articulation designed for complex human environments. Features tactile feedback sensors and real-time gait adaptation.</p>
                  <a href="#" className="link-mono">VIEW SPECS <span aria-hidden="true">↗</span></a>
                </div>
                <div className="robo-card-visual" style={{ height: '280px' }}>
                  <img src="https://images.unsplash.com/photo-1546776310-eef45dd6d63c?w=600&q=80" alt="Humanoid robot platform" />
                </div>
              </div>
            </div>

            {/* Military */}
            <div className="robo-card robo-card-featured reveal">
              <div className="robo-card-badge">[ RESTRICTED ]</div>
              <div className="robo-card-inner">
                <div className="robo-card-content">
                  <h3>MILITARY</h3>
                  <p>Ruggedized autonomous defense units. High-payload capacity with encrypted swarm communication protocols.</p>
                  <span className="link-mono" style={{ color: 'var(--on-bg-muted)', cursor: 'default' }}>CLEARANCE REQUIRED</span>
                </div>
                <div className="robo-card-visual" style={{ height: '280px' }}>
                  <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80" alt="Military robotics platform" />
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
