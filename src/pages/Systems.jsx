import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import useSEO from '../hooks/useSEO';
import useReducedMotion from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const domains = [
  { icon: '□', label: 'Web Systems', desc: 'High-throughput distributed interfaces, teleoperation dashboards, and real-time 3D visualization layers.', code: 'REACT / METAL / ROS' },
  { icon: '□', label: 'Native Desktop', desc: 'High-performance calibration tools, local diagnostics, and heavy-compute simulation environments.', code: 'RUST / C++ / QT' },
  { icon: '□', label: 'Mobile Field Ops', desc: 'Ruggedized tablet applications for on-site deployment, pairing, and immediate manual override control.', code: 'SWIFT / KOTLIN' },
  { icon: '□', label: 'Enterprise Cloud', desc: 'Secure data ingestion pipelines, global fleet telemetry and automated machine learning training clusters.', code: 'GO / K8S / AWS' },
];

const osTable = [
  { env: 'RTOS (Axeom RT)', primary: 'Motor Control, Safety', chars: 'Strict determinism, hard real-time guarantees' },
  { env: 'Embedded Linux', primary: 'Vision Processing, Comms', chars: 'Preempt-RT patched, init-time ecosystem' },
  { env: 'Single User (Bare Metal)', primary: 'Sensors, Microcontrollers', chars: 'No context switching, absolute minimal overhead' },
  { env: 'Desktop/Server OS', primary: 'Fleet Management, ML', chars: 'High throughput, scalable compute, containerized' },
];

function Systems() {
  const container = useRef(null);

  useSEO(
    'Systems and Software | AxeomLabs',
    'AxeomLabs engineers embedded software, real-time operating systems, bare-metal firmware, and full-stack software platforms optimised for deterministic performance.',
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

      {/* BREADCRUMB */}
      <nav aria-label="Breadcrumb" style={{
        position: 'absolute',
        top: 88,
        left: 'var(--margin)',
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '0.1em',
        color: 'var(--on-bg-muted)',
        zIndex: 10,
        display: 'flex',
        gap: 8,
        alignItems: 'center',
      }}>
        <Link to="/" style={{ color: 'var(--on-bg-muted)', textTransform: 'uppercase' }}>Home</Link>
        <span aria-hidden="true">›</span>
        <span style={{ color: 'var(--accent)', textTransform: 'uppercase' }}>Systems</span>
      </nav>
      {/* HERO */}
      <section className="page-hero" aria-label="Systems Division" style={{ minHeight: 'auto' }}>
        <div className="page-hero-bg" aria-hidden="true" />
        <div className="page-hero-layout">
          <div className="page-hero-left">
            <div className="page-hero-status">[ DIVISION: OS + SYSTEMS ]</div>
            <h1 style={{ color: 'var(--on-bg)', textTransform: 'uppercase', marginBottom: 24 }}>
              SOFTWARE +<br />SYSTEMS
            </h1>
            <p className="page-hero-desc">
              Architecting the deterministic logic layers for autonomous operations. We build fault-tolerant
              environments ranging from ultra-low-latency embedded RTOS to global-scale enterprise data pipelines.
            </p>
          </div>
          <div className="page-hero-right">
            <img
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=85"
              alt="Server rack and data centre infrastructure representing AxeomLabs systems engineering"
              className="page-hero-image"
              width="900"
              height="600"
            />
            <div className="page-hero-meta">
              <span>[ DIVISION: SYSTEMS ]</span>
              <span>STATUS: ACTIVE</span>
            </div>
          </div>
        </div>
      </section>

      {/* AXEOM OS */}
      <section className="page-section" aria-label="Axeom OS">
        <div className="container">
          <div className="section-header-row reveal">
            <div>
              <div className="section-label">01 // CORE PLATFORM</div>
            </div>
          </div>

          <div className="os-card reveal">
            <div className="os-card-layout">
              <div className="os-card-left">
                <div className="os-badge">[ PROPRIETARY KERNEL ]</div>
                <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', marginTop: 16, color: 'var(--on-bg)' }}>
                  Axeom OS
                </h2>
                <p style={{ marginTop: 16, color: 'var(--on-bg-dim)', lineHeight: 1.6, fontSize: 14 }}>
                  A specialized real-time operating system engineered for absolute determinism.
                  Built from bare metal to guarantee execution timing for critical industrial
                  robotics and sensory fusion arrays.
                </p>
                <Link to="/contact" className="btn-primary" style={{ marginTop: 24 }}>
                  GET IN TOUCH <span aria-hidden="true">→</span>
                </Link>
                <div style={{ marginTop: 24, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--on-bg-muted)', lineHeight: 1.8 }}>
                  BUILD: v0.2.5 stable<br />ARCH: ARM64 / x86_64
                </div>
              </div>
              <div className="os-card-right">
                <div className="os-spec-table">
                  <div className="os-spec-header">SCHEDULING CFG <span aria-hidden="true">+</span></div>
                  <div className="os-spec-row"><span>Type</span><span>Preemptive</span></div>
                  <div className="os-spec-row"><span>Jitter</span><span>&lt; 1us</span></div>
                  <div className="os-spec-row"><span>Certified</span><span>Under review</span></div>
                </div>
                <div className="os-spec-table" style={{ marginTop: 16 }}>
                  <div className="os-spec-header">MEMORY MANAGEMENT <span aria-hidden="true">+</span></div>
                  <div className="os-spec-row"><span>Protection</span><span>Hardware MPU</span></div>
                  <div className="os-spec-row"><span>Allocation</span><span>Static/Pool</span></div>
                  <div className="os-spec-row"><span>Footprint</span><span>&lt;64KB Base</span></div>
                </div>
              </div>
            </div>
            <div className="os-card-img-strip">
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80"
                alt="Printed circuit board and embedded microcontroller, representing Axeom OS hardware target"
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
              <div className="section-label">02 // ENGINEERING DOMAINS</div>
              <h3 style={{ marginTop: 8, fontWeight: 500, maxWidth: '24ch', color: 'var(--on-bg)' }}>
                Full-stack hardware integration and interface layers.
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
      <section className="page-section" aria-label="OS Classification">
        <div className="container">
          <div className="section-label reveal">OPERATING SYSTEM CLASSIFICATION</div>
          <div className="os-table reveal" style={{ marginTop: 24 }}>
            <div className="os-table-header">
              <span>ENVIRONMENT</span>
              <span>PRIMARY USE CASE</span>
              <span>KEY CHARACTERISTICS</span>
              <span>STATUS</span>
            </div>
            {osTable.map((row, i) => (
              <div key={i} className="os-table-row">
                <span>{row.env}</span>
                <span>{row.primary}</span>
                <span>{row.chars}</span>
                <span>ACTIVE</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Systems;
