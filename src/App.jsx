import { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import useReducedMotion from './hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

// ─── Animated system graph canvas in hero background ─────────────────────────
function SystemCanvas() {
  const canvasRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let t = 0;

    const nodes = [
      { x: 0.5,  y: 0.38, label: 'AXEOM' },
      { x: 0.2,  y: 0.62, label: 'AI' },
      { x: 0.38, y: 0.68, label: 'ROBOTICS' },
      { x: 0.62, y: 0.68, label: 'SYSTEMS' },
      { x: 0.8,  y: 0.62, label: 'RESEARCH' },
      { x: 0.14, y: 0.44, label: 'VISION' },
      { x: 0.86, y: 0.44, label: 'HARDWARE' },
    ];

    const edges = [
      [0, 1], [0, 2], [0, 3], [0, 4],
      [1, 5], [4, 6], [1, 2], [3, 4],
    ];

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);
      t += prefersReducedMotion ? 0 : 0.004;

      // edges
      edges.forEach(([a, b]) => {
        const na = nodes[a], nb = nodes[b];
        const ax = na.x * W, ay = na.y * H;
        const bx = nb.x * W, by = nb.y * H;
        const pulse = 0.5 + 0.5 * Math.sin(t * 2 + a + b);
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = `rgba(100,120,160,${0.12 + 0.06 * pulse})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // nodes
      nodes.forEach((n, i) => {
        const x = n.x * W, y = n.y * H;
        const pulse = 0.5 + 0.5 * Math.sin(t * 1.5 + i);
        const r = i === 0 ? 3.5 : 2;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = i === 0
          ? `rgba(160,180,220,${0.6 + 0.3 * pulse})`
          : `rgba(100,120,160,${0.35 + 0.2 * pulse})`;
        ctx.fill();

        if (i === 0 || W > 600) {
          ctx.font = `${i === 0 ? 9 : 8}px "JetBrains Mono", monospace`;
          ctx.fillStyle = `rgba(120,140,180,${0.5 + 0.2 * pulse})`;
          ctx.letterSpacing = '0.08em';
          ctx.fillText(n.label, x + (i === 0 ? -18 : 6), y - 6);
        }
      });

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="hero-canvas"
      aria-hidden="true"
    />
  );
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ target, suffix = '', decimals = 0 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const start = Date.now(), duration = 1800;
        const tick = () => {
          const p = Math.min((Date.now() - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setValue(+(target * ease).toFixed(decimals));
          if (p < 1) requestAnimationFrame(tick);
          else setValue(target);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [target, decimals]);
  return <span ref={ref}>{decimals > 0 ? value.toFixed(decimals) : value}{suffix}</span>;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const FEATURED_WORK = [
  {
    id: '001',
    code: 'AERIAL PLATFORM',
    name: 'UAV NAVIGATION STACK',
    desc: 'Onboard autonomous navigation system for fixed-wing and multirotor platforms. SLAM-based, GPS-independent, sub-10cm accuracy in unstructured environments.',
    tags: ['SLAM', 'SENSOR FUSION', 'EDGE AI'],
    status: 'ACTIVE',
    year: '2024',
    path: '/robotics',
    img: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&q=85',
    alt: 'Drone in flight over open terrain',
  },
  {
    id: '002',
    code: 'GROUND SYSTEMS',
    name: 'ADAPTIVE ROBOTICS',
    desc: 'Ground and underwater robotics with real-time terrain adaptation and tactile sensing. Designed to operate where GPS fails and environments are unpredictable.',
    tags: ['LOCOMOTION', 'TACTILE SENSING', 'EDGE COMPUTE'],
    status: 'ACTIVE',
    year: '2024',
    path: '/robotics',
    img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=85',
    alt: 'Autonomous robot platform in field environment',
  },
  {
    id: '003',
    code: 'EMBEDDED INTELLIGENCE',
    name: 'ON-DEVICE AI',
    desc: 'Neural network inference on microcontrollers with under 512KB RAM. Quantization, pruning, and distillation pipelines that make large models fit in small chips.',
    tags: ['QUANTIZATION', 'CORTEX-M7', 'INT8'],
    status: 'R&D',
    year: '2025',
    path: '/systems',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=85',
    alt: 'Embedded electronics and custom PCB',
  },
];

const CAPABILITIES = [
  {
    num: '01',
    title: 'ARTIFICIAL INTELLIGENCE',
    short: 'AI',
    desc: 'Intelligent systems that reason, navigate, and act. We work on edge inference, computer vision, autonomous agents, and the longer arc toward general AI.',
    tags: ['Edge AI', 'Computer Vision', 'SLAM', 'Autonomous Agents', 'AI Research'],
    path: '/research',
  },
  {
    num: '02',
    title: 'ROBOTICS',
    short: 'ROBOTICS',
    desc: 'Machines that work in the real world. Humanoid, ground, aerial, and underwater robots. Built to handle terrain, weather, and conditions that most hardware avoids.',
    tags: ['UAV Systems', 'Ground Robots', 'Underwater', 'Humanoid', 'Tactile Sensing'],
    path: '/robotics',
  },
  {
    num: '03',
    title: 'EMBEDDED SYSTEMS',
    short: 'SYSTEMS',
    desc: 'Firmware and hardware that actually ships. Real-time OS, bare-metal firmware, PCB design, power electronics. From schematic to deployed hardware.',
    tags: ['RTOS', 'Bare-Metal', 'PCB Design', 'Power Systems', 'Sensor Fusion'],
    path: '/systems',
  },
  {
    num: '04',
    title: 'RESEARCH',
    short: 'RESEARCH',
    desc: 'We study astrophysics, chemistry, biology, and oceanography not for papers but because the science feeds into what we build next. Long horizon, real outputs.',
    tags: ['Materials Science', 'Physics', 'Astrophysics', 'Oceanography', 'Biology'],
    path: '/research',
  },
];

const LAB_STATUS = [
  { num: '01', title: 'Autonomous Navigation', desc: 'GPS-independent SLAM stack for aerial and ground platforms. Sub-10cm accuracy target.', status: 'ACTIVE', updated: 'AUG 2026' },
  { num: '02', title: 'On-Device AI', desc: 'Neural inference on Cortex-M7 with under 512KB RAM. INT8 quantization pipeline.', status: 'R&D', updated: 'AUG 2026' },
  { num: '03', title: 'Underwater Robotics', desc: 'Pressure-rated chassis and acoustic comms for sub-100m marine deployment.', status: 'DESIGN', updated: 'JUL 2026' },
  { num: '04', title: 'Structural Materials', desc: 'Carbon-fibre lattice geometries for 40%+ weight reduction vs aluminium baselines.', status: 'ACTIVE', updated: 'AUG 2026' },
  { num: '05', title: 'General AI Research', desc: 'Long-horizon theoretical work on reasoning, theory of mind, and self-aware systems.', status: 'RESEARCH', updated: 'AUG 2026' },
  { num: '06', title: 'Game Engine Architecture', desc: 'High-performance engine work. Physics simulation and spatial intelligence.', status: 'EARLY', updated: 'AUG 2026' },
];

const STATS = [
  { value: 12, suffix: '', label: 'DRONES BUILT' },
  { value: 5,  suffix: '', label: 'ROBOTS ACTIVE' },
  { value: 27, suffix: '+', label: 'PROJECTS SHIPPED' },
  { value: 10, suffix: '', label: 'RESEARCH DOMAINS' },
];

const STATUS_COLOR = { ACTIVE: '#4ade80', 'R&D': '#60a5fa', DESIGN: '#a78bfa', RESEARCH: '#f59e0b', EARLY: '#94a3b8' };

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  const container = useRef(null);
  const [activeCapability, setActiveCapability] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '', botcheck: false });
  const [formState, setFormState] = useState('idle');
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!prefersReducedMotion) {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.from('.hero-status-bar', { opacity: 0, y: -10, duration: 0.5, ease: 'expo.out' })
        .from('.hero-headline', { opacity: 0, y: 40, duration: 0.9, ease: 'expo.out' }, '-=0.2')
        .from('.hero-sub', { opacity: 0, y: 16, duration: 0.6, ease: 'expo.out' }, '-=0.4')
        .from('.hero-pills', { opacity: 0, y: 10, duration: 0.5, ease: 'expo.out' }, '-=0.3')
        .from('.hero-actions', { opacity: 0, y: 10, duration: 0.5, ease: 'expo.out' }, '-=0.3')
        .from('.hero-canvas', { opacity: 0, duration: 1.2, ease: 'power2.out' }, '-=0.6');
    }

    gsap.to('.indicator-bar', {
      width: '100%', ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.2 },
    });

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.01, rootMargin: '40px 0px' });
    document.querySelectorAll('.reveal, .reveal-left, .philosophy-stmt').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, { scope: container });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    if (formData.botcheck) { setFormState('confirmed'); return; }
    setFormState('loading');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '8d069e2b-4ec5-4e29-94c2-0d8429647ba6',
          subject: 'AxeomLabs - New Contact Enquiry',
          from_name: formData.name, replyto: formData.email,
          to: 'founder@axeomlabs.in',
          name: formData.name, email: formData.email, message: formData.message,
        }),
      });
      if (response.ok) { setFormState('confirmed'); setFormData({ name: '', email: '', message: '', botcheck: false }); }
      else setFormState('error');
    } catch { setFormState('error'); }
  };

  return (
    <div ref={container}>

      {/* ── 01 HERO ─────────────────────────────────────────────────────────── */}
      <section id="hero" aria-label="AxeomLabs">
        <div className="hero-bg-grid" aria-hidden="true" />
        <SystemCanvas />

        <div className="hero-inner">
          <div className="hero-status-bar">
            <span className="hero-status-dot" aria-hidden="true" />
            <span>SYSTEMS ONLINE</span>
            <span className="hero-status-sep" aria-hidden="true">|</span>
            <span>INDIA</span>
            <span className="hero-status-sep" aria-hidden="true">|</span>
            <span>EST. 2024</span>
          </div>

          <h1 className="hero-headline">
            Engineering intelligence<br />
            <span className="hero-headline-dim">for the physical world.</span>
          </h1>

          <p className="hero-sub">
            We design and build autonomous drones, robotics platforms, embedded AI,
            and custom hardware. Everything we ship gets tested in the field.
          </p>

          <div className="hero-pills" aria-label="Disciplines">
            {['AI', 'ROBOTICS', 'AUTONOMOUS SYSTEMS', 'EMBEDDED HARDWARE', 'RESEARCH'].map(p => (
              <span key={p} className="hero-pill">{p}</span>
            ))}
          </div>

          <div className="hero-actions">
            <button
              className="btn-primary"
              onClick={() => document.getElementById('selected-work').scrollIntoView({ behavior: 'smooth' })}
            >
              EXPLORE THE LAB <span aria-hidden="true">→</span>
            </button>
            <Link to="/contact" className="btn-ghost">BUILD WITH US</Link>
          </div>
        </div>

        <div className="hero-scroll-prompt" aria-hidden="true">
          <span>SCROLL</span>
          <div className="hero-scroll-line" />
        </div>
      </section>

      {/* ── 02 WHAT IS AXEOMLABS ────────────────────────────────────────────── */}
      <section id="about-brief" aria-label="About AxeomLabs">
        <div className="container">
          <div className="about-brief-layout reveal">
            <div className="about-brief-label">
              <div className="section-label">THE LAB</div>
            </div>
            <div className="about-brief-content">
              <p className="about-brief-statement">
                We build experimental systems across intelligence, computation, and robotics.
                Not demos. Actual hardware that flies, drives, and navigates the real world.
              </p>
              <div className="about-brief-meta">
                <div className="about-meta-item">
                  <span className="about-meta-key">FOUNDED</span>
                  <span className="about-meta-val">2024</span>
                </div>
                <div className="about-meta-item">
                  <span className="about-meta-key">BASE</span>
                  <span className="about-meta-val">INDIA</span>
                </div>
                <div className="about-meta-item">
                  <span className="about-meta-key">STATUS</span>
                  <span className="about-meta-val accent">ACTIVE</span>
                </div>
                <div className="about-meta-item">
                  <span className="about-meta-key">FOCUS</span>
                  <span className="about-meta-val">DEEP TECH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 SELECTED WORK ────────────────────────────────────────────────── */}
      <section id="selected-work" aria-label="Selected work">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <div className="section-label">SELECTED WORK</div>
              <h2 style={{ marginTop: 8 }}>What we build.</h2>
            </div>
            <span className="section-counter">{FEATURED_WORK.length} SYSTEMS</span>
          </div>

          <div className="work-grid">
            {/* Featured large card */}
            <Link to={FEATURED_WORK[0].path} className="work-card work-card-featured reveal">
              <div className="work-card-img-wrap">
                <img src={FEATURED_WORK[0].img} alt={FEATURED_WORK[0].alt} loading="eager" width="1200" height="680" />
                <div className="work-card-overlay" aria-hidden="true" />
              </div>
              <div className="work-card-body">
                <div className="work-card-meta">
                  <span className="work-card-id">PROJECT {FEATURED_WORK[0].id}</span>
                  <span className="work-card-code">{FEATURED_WORK[0].code}</span>
                </div>
                <h3 className="work-card-name">{FEATURED_WORK[0].name}</h3>
                <p className="work-card-desc">{FEATURED_WORK[0].desc}</p>
                <div className="work-card-footer">
                  <div className="work-card-tags">
                    {FEATURED_WORK[0].tags.map(t => <span key={t} className="work-tag">{t}</span>)}
                  </div>
                  <div className="work-card-right">
                    <span className="work-status" style={{ '--status-color': STATUS_COLOR[FEATURED_WORK[0].status] }}>
                      <span className="work-status-dot" aria-hidden="true" />
                      {FEATURED_WORK[0].status}
                    </span>
                    <span className="work-card-arrow">EXPLORE <span aria-hidden="true">↗</span></span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Two smaller cards */}
            {FEATURED_WORK.slice(1).map((w) => (
              <Link key={w.id} to={w.path} className="work-card work-card-half reveal">
                <div className="work-card-img-wrap">
                  <img src={w.img} alt={w.alt} loading="lazy" width="800" height="533" />
                  <div className="work-card-overlay" aria-hidden="true" />
                </div>
                <div className="work-card-body">
                  <div className="work-card-meta">
                    <span className="work-card-id">PROJECT {w.id}</span>
                    <span className="work-card-code">{w.code}</span>
                  </div>
                  <h3 className="work-card-name">{w.name}</h3>
                  <p className="work-card-desc">{w.desc}</p>
                  <div className="work-card-footer">
                    <div className="work-card-tags">
                      {w.tags.slice(0, 2).map(t => <span key={t} className="work-tag">{t}</span>)}
                    </div>
                    <div className="work-card-right">
                      <span className="work-status" style={{ '--status-color': STATUS_COLOR[w.status] }}>
                        <span className="work-status-dot" aria-hidden="true" />
                        {w.status}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 CAPABILITIES ─────────────────────────────────────────────────── */}
      <section id="capabilities" aria-label="Core capabilities">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <div className="section-label">CAPABILITIES</div>
              <h2 style={{ marginTop: 8 }}>What we're good at.</h2>
            </div>
          </div>

          <div className="caps-layout reveal">
            <nav className="caps-nav" aria-label="Capabilities navigation">
              {CAPABILITIES.map((c, i) => (
                <button
                  key={c.num}
                  className={`caps-nav-item${activeCapability === i ? ' active' : ''}`}
                  onClick={() => setActiveCapability(i)}
                >
                  <span className="caps-nav-num">{c.num}</span>
                  <span className="caps-nav-title">{c.title}</span>
                  <span className="caps-nav-arrow" aria-hidden="true">→</span>
                </button>
              ))}
            </nav>

            <div className="caps-detail">
              {CAPABILITIES.map((c, i) => (
                <div
                  key={c.num}
                  className={`caps-panel${activeCapability === i ? ' active' : ''}`}
                  aria-hidden={activeCapability !== i}
                >
                  <div className="caps-panel-num">{c.num}</div>
                  <h3 className="caps-panel-title">{c.title}</h3>
                  <p className="caps-panel-desc">{c.desc}</p>
                  <div className="caps-panel-tags">
                    {c.tags.map(t => <span key={t} className="caps-tag">{t}</span>)}
                  </div>
                  <Link to={c.path} className="caps-explore">
                    EXPLORE CAPABILITY <span aria-hidden="true">→</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 05 CURRENTLY IN THE LAB ─────────────────────────────────────────── */}
      <section id="lab-status" aria-label="Currently in the lab" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header reveal">
            <div>
              <div className="section-label">CURRENTLY IN THE LAB</div>
              <h2 style={{ marginTop: 8 }}>Active systems.</h2>
            </div>
            <span className="section-counter" style={{ alignSelf: 'flex-end', paddingBottom: 4 }}>
              Last updated · Aug 2026
            </span>
          </div>

          <div className="lab-grid">
            {LAB_STATUS.map((item) => (
              <div key={item.num} className="lab-item reveal">
                <div className="lab-item-header">
                  <span className="lab-item-num">{item.num}</span>
                  <span
                    className="lab-item-status"
                    style={{ color: STATUS_COLOR[item.status] || '#94a3b8' }}
                  >
                    <span className="lab-item-dot" style={{ background: STATUS_COLOR[item.status] }} aria-hidden="true" />
                    {item.status}
                  </span>
                </div>
                <h3 className="lab-item-title">{item.title}</h3>
                <p className="lab-item-desc">{item.desc}</p>
                <span className="lab-item-updated">{item.updated}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 06 NUMBERS ──────────────────────────────────────────────────────── */}
      <section id="numbers" aria-label="Company statistics">
        <div className="container">
          <div className="stats-grid">
            {STATS.map((s, i) => (
              <div key={i} className="stat-item reveal">
                <div className="stat-value">
                  <Counter target={s.value} suffix={s.suffix} />
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 07 PHILOSOPHY ───────────────────────────────────────────────────── */}
      <section id="philosophy" aria-label="Our principles" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="philosophy-statements">
            {[
              'WE BUILD WHAT MOST CONSIDER IMPOSSIBLE.',
              'SOFTWARE WITHOUT SILICON IS JUST THEORY.',
              'REAL INTELLIGENCE MOVES IN THE PHYSICAL WORLD.',
              'IF IT ONLY WORKS IN A LAB, IT DOESN\'T COUNT.',
            ].map((stmt, i) => (
              <div key={i} className="philosophy-stmt">
                <span className="stmt-inner">
                  <span className="stmt-num" aria-hidden="true">0{i + 1}</span>
                  {stmt}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 08 CTA ──────────────────────────────────────────────────────────── */}
      <section id="cta" aria-label="Contact us">
        <div className="container" style={{ padding: '0 var(--margin)' }}>
          <div className="cta-layout">
            <div className="cta-left reveal-left">
              <div className="cta-label">BUILD WITH US</div>
              <h2>LET'S BUILD<br />SOMETHING.</h2>
              <p>
                Have a project in mind, want to collaborate, or want to say hello?
                We respond within 24 to 48 hours.
              </p>
              <div className="cta-manifest">
                <div className="manifest-item">QUICK RESPONSE TIME</div>
                <div className="manifest-item">OPEN TO COLLABORATION</div>
                <div className="manifest-item">CUSTOM PROJECT ENQUIRIES</div>
                <div className="manifest-item">RESEARCH PARTNERSHIPS</div>
              </div>
              <a href="mailto:founder@axeomlabs.in" className="btn-ghost" style={{ marginTop: 24, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                founder@axeomlabs.in <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="terminal-form reveal">
              <div className="terminal-header" aria-hidden="true">
                <div className="terminal-dot red" />
                <div className="terminal-dot amber" />
                <div className="terminal-dot green" />
                <span className="terminal-title">axeomlabs // contact</span>
              </div>
              <div className="terminal-body">
                <div className="terminal-prompt">
                  <span>axeom@labs:~$</span> send_message --secure
                </div>
                {formState === 'error' && (
                  <p className="error-msg">[ SEND FAILED / please try again or email us directly ]</p>
                )}
                <form
                  id="contact-form"
                  className={`cta-form ${formState}`}
                  onSubmit={handleFormSubmit}
                  aria-label="Contact form"
                >
                  <input type="checkbox" name="botcheck" style={{ display: 'none' }} checked={formData.botcheck}
                    onChange={(e) => setFormData({ ...formData, botcheck: e.target.checked })} />
                  <div className="t-field">
                    <label className="t-label" htmlFor="contact-name">YOUR NAME</label>
                    <input id="contact-name" type="text" className="t-input" required placeholder="Jane Smith"
                      value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div className="t-field">
                    <label className="t-label" htmlFor="contact-email">EMAIL ADDRESS</label>
                    <input id="contact-email" type="email" className="t-input" required placeholder="you@example.com"
                      value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                  <div className="t-field">
                    <label className="t-label" htmlFor="contact-message">MESSAGE</label>
                    <textarea id="contact-message" className="t-input" required
                      placeholder="Tell us about your project or enquiry..." rows="4"
                      value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                  </div>
                  <div className="terminal-actions">
                    <button type="submit" id="submit-btn" className="btn-primary">
                      <span className="btn-text">SEND MESSAGE <span aria-hidden="true">→</span></span>
                      <span className="btn-loading">SENDING...</span>
                      <span className="btn-success">MESSAGE SENT</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
