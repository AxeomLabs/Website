import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import useSEO from '../hooks/useSEO';
import useReducedMotion from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const researchAreas = [
  {
    num: '01',
    label: 'AUTONOMOUS NAVIGATION',
    title: 'SLAM & Sensor Fusion',
    desc: 'Simultaneous Localization and Mapping (SLAM) algorithms combined with multi-modal sensor fusion — LiDAR, IMU, stereo camera — for robust navigation in GPS-denied and unstructured environments.',
    stat: 'Sub-10cm positional accuracy',
  },
  {
    num: '02',
    label: 'COMPUTER VISION',
    title: 'Edge Perception Systems',
    desc: 'Real-time object detection, depth estimation, and scene understanding optimised for embedded processors. Models trained and deployed on-device — no cloud dependency, deterministic latency.',
    stat: '<15ms inference on ARM Cortex-A',
  },
  {
    num: '03',
    label: 'MATERIALS SCIENCE',
    title: 'Structural Hardware Research',
    desc: 'Exploring carbon fibre composites, lattice-infill 3D printing, and bio-inspired structural geometries to build airframes and chassis that are simultaneously lighter and stronger.',
    stat: '40% weight reduction vs. aluminium baseline',
  },
  {
    num: '04',
    label: 'EMBEDDED AI',
    title: 'On-Device Intelligence',
    desc: 'Porting large-model architectures to constrained microcontrollers via quantization, pruning, and knowledge distillation. Bringing intelligence to systems with <512KB RAM.',
    stat: 'INT8 inference on Cortex-M7',
  },
];

function Research() {
  const container = useRef(null);

  useSEO(
    'Applied Research | AxeomLabs — Robotics, Vision & Autonomous Systems',
    'AxeomLabs conducts applied research in autonomous navigation (SLAM), computer vision, materials science, and embedded AI — translating breakthroughs into deployable hardware products.',
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
      {/* HERO */}
      <section className="page-hero" aria-label="Research Division">
        <div className="page-hero-bg" aria-hidden="true" />
        <div className="page-hero-layout">
          <div className="page-hero-left">
            <div className="page-hero-status">[ DEPT 04 : APPLIED RESEARCH ]</div>
            <h1>RESEARCH<br />APPLIED.</h1>
            <p className="page-hero-desc">
              From sensor fusion algorithms to structural materials, AxeomLabs bridges the gap
              between lab discovery and field-deployable hardware.
            </p>
          </div>
          <div className="page-hero-right">
            <img
              src="https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=900&q=85"
              alt="Circuit board close-up representing embedded hardware research at AxeomLabs"
              className="page-hero-image"
              width="900"
              height="600"
            />
            <div className="page-hero-meta">
              <span>[ STATUS: ACTIVE ]</span>
              <span>AREAS: 4 ACTIVE</span>
            </div>
          </div>
        </div>
      </section>

      {/* RESEARCH AREAS */}
      <section className="page-section" aria-label="Research Areas">
        <div className="container">
          <div className="research-header reveal">
            <div className="section-label">01 // RESEARCH AREAS</div>
          </div>

          <div className="research-grid">
            {researchAreas.map((area, i) => (
              <div key={i} className="research-card research-card-half reveal">
                <span className="section-counter">{area.num} // {area.label}</span>
                <h3 style={{ marginTop: 12 }}>{area.title}</h3>
                <p style={{ marginTop: 8 }}>{area.desc}</p>
                <div style={{
                  marginTop: 16,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  color: 'var(--accent)',
                  letterSpacing: '0.08em',
                }}>
                  ◎ {area.stat}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="page-section" style={{ background: 'var(--bg-secondary)' }} aria-label="Research Approach">
        <div className="container">
          <div className="culture-layout">
            <div className="culture-left reveal-left">
              <div className="section-label">02 // OUR APPROACH</div>
              <h2 style={{ marginTop: 16, color: 'var(--on-bg)' }}>Hardware-First. Field-Validated.</h2>
              <p>
                Every research direction we pursue has a clear path to a physical product. We don't
                publish papers — we build systems. Findings are validated in real environments:
                dusty warehouses, open fields, and uncontrolled airspace.
              </p>
              <p style={{ marginTop: 16 }}>
                This means our research timelines are tied to hardware iterations, not academic
                cycles. Speed and robustness are non-negotiable constraints.
              </p>
              <Link to="/robotics" className="btn-primary" style={{ marginTop: 32 }}>
                SEE ROBOTICS <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="reveal">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
                alt="Engineer working on robotics hardware in a lab environment"
                className="culture-img"
                loading="lazy"
                width="800"
                height="1067"
              />
              <div className="culture-meta">[ LAB: FIELD VALIDATION ACTIVE ]</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Research;
