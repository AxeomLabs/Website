import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import useReducedMotion from './hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/* ─── Animated counter ─────────────────────────────────────────────────────── */
function Counter({ target, suffix = '' }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const start = Date.now(), dur = 1600;
        const tick = () => {
          const p = Math.min((Date.now() - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setValue(Math.round(target * ease));
          if (p < 1) requestAnimationFrame(tick);
          else setValue(target);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{value}{suffix}</span>;
}

/* ─── Stack step ────────────────────────────────────────────────────────────── */
const STACK_STEPS = [
  { num: '01', label: 'RESEARCH', desc: 'Physics, materials, biology, applied science.' },
  { num: '02', label: 'SYSTEM DESIGN', desc: 'Architecture, constraints, hardware-software split.' },
  { num: '03', label: 'HARDWARE', desc: 'PCB design, power systems, chassis, sensors.' },
  { num: '04', label: 'FIRMWARE', desc: 'Bare-metal code, RTOS, sensor drivers, comms.' },
  { num: '05', label: 'INTELLIGENCE', desc: 'AI, autonomy, perception, real-time control.' },
  { num: '06', label: 'FIELD TESTING', desc: 'Open terrain, actual airspace, uncontrolled conditions.' },
];

/* ─── Featured work ─────────────────────────────────────────────────────────── */
const FEATURED_WORK = [
  {
    id: '001',
    code: 'AERIAL SYSTEMS',
    name: 'Autonomous UAV Platform',
    desc: 'Fixed-wing and multirotor platforms that navigate GPS-denied environments. LiDAR-based SLAM, onboard edge AI, real-time obstacle avoidance. Designed for surveillance, mapping, and payload operations.',
    tags: ['SLAM', 'SENSOR FUSION', 'EDGE AI', 'LIDAR'],
    status: 'ACTIVE',
    path: '/robotics',
    img: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=1400&q=85',
    alt: 'Professional drone hovering over open terrain at dusk',
  },
  {
    id: '002',
    code: 'GROUND SYSTEMS',
    name: 'Adaptive Ground Robotics',
    desc: 'Ground and underwater platforms built to handle terrain and conditions that most hardware avoids. Tactile sensing, adaptive gait, real-time terrain mapping.',
    tags: ['LOCOMOTION', 'TERRAIN MAPPING', 'TACTILE'],
    status: 'ACTIVE',
    path: '/robotics',
    img: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=1000&q=85',
    alt: 'Armored ground robotics platform in field test conditions',
  },
  {
    id: '003',
    code: 'EMBEDDED INTELLIGENCE',
    name: 'On-Device AI Inference',
    desc: 'Neural network inference on microcontrollers with under 512KB RAM. Quantization, pruning, and distillation pipelines that make large models fit in small chips.',
    tags: ['QUANTIZATION', 'CORTEX-M7', 'INT8'],
    status: 'R&D',
    path: '/systems',
    img: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=1000&q=85',
    alt: 'Microprocessor and integrated circuit die under macro lens',
  },
];

/* ─── Capabilities ──────────────────────────────────────────────────────────── */
const CAPABILITIES = [
  {
    num: '01',
    title: 'AUTONOMY',
    desc: 'SLAM, sensor fusion, path planning, obstacle avoidance. Systems that navigate the world without a pilot.',
    tags: ['SLAM', 'Sensor Fusion', 'Path Planning', 'Edge AI'],
    path: '/research',
  },
  {
    num: '02',
    title: 'ROBOTICS',
    desc: 'Humanoid, ground, aerial, underwater. Robots designed for real, uncontrolled environments, not controlled labs.',
    tags: ['UAV', 'Ground Robots', 'Underwater', 'Humanoid'],
    path: '/robotics',
  },
  {
    num: '03',
    title: 'INTELLIGENCE',
    desc: 'Computer vision, embedded AI, autonomous agents. Intelligence that runs on the hardware, not in the cloud.',
    tags: ['Computer Vision', 'Embedded AI', 'Agents', 'Research'],
    path: '/research',
  },
  {
    num: '04',
    title: 'HARDWARE',
    desc: 'PCB design, power electronics, sensor arrays, structural hardware. We design and build custom boards from schematic to production.',
    tags: ['PCB Design', 'Power Systems', 'Sensors', 'Firmware'],
    path: '/systems',
  },
  {
    num: '05',
    title: 'SOFTWARE',
    desc: 'Bare-metal firmware, RTOS, full-stack applications, embedded systems. Software that ships with the hardware, not after.',
    tags: ['RTOS', 'Bare-Metal', 'Full-Stack', 'Embedded'],
    path: '/systems',
  },
  {
    num: '06',
    title: 'RESEARCH',
    desc: 'Physics, chemistry, materials, astrophysics, oceanography. We study the science because breakthroughs in science become possible in engineering.',
    tags: ['Materials', 'Physics', 'Astrophysics', 'Oceanography'],
    path: '/research',
  },
];

/* ─── Lab status ────────────────────────────────────────────────────────────── */
const LAB_STATUS_GROUPS = [
  {
    group: 'ACTIVE',
    color: '#4ade80',
    items: ['Autonomous UAV Navigation Stack', 'SLAM Sensor Fusion Pipeline', 'Carbon Fibre Structural Materials'],
  },
  {
    group: 'IN DEVELOPMENT',
    color: '#60a5fa',
    items: ['On-Device AI Inference (Cortex-M7)', 'Underwater Robotics Chassis', 'Adaptive Ground Locomotion'],
  },
  {
    group: 'RESEARCH',
    color: '#f59e0b',
    items: [
      'Astrophysics & Orbital Mechanics', 'Ocean Environment Mapping', 'General AI Theory',
      'Power & Energy Systems', 'Biomimetic Structures', 'Game Engine Architecture',
    ],
  },
];

const FOUNDERS = [
  {
    initials: 'HJV',
    name: 'Harinandan J V',
    role: 'Co-Founder',
    desc: 'Leads overall system architecture. Works across hardware, software, AI, and research. Usually the one who figures out what the project actually needs to be.',
    linkedin: 'https://www.linkedin.com/in/harinandanjv',
  },
  {
    initials: 'AAS',
    name: 'Abhishek A S',
    role: 'Co-Founder',
    desc: 'Focuses on hardware. PCB design, power electronics, sensors, physical systems. Makes things that exist in the real world rather than just on a screen.',
    linkedin: 'https://www.linkedin.com/in/abhishek-a-s',
  },
];

const STATUS_COLOR = {
  ACTIVE: '#4ade80',
  'R&D': '#60a5fa',
  DESIGN: '#a78bfa',
  RESEARCH: '#f59e0b',
};

/* ─── App ────────────────────────────────────────────────────────────────────── */
export default function App() {
  const container = useRef(null);
  const [activeCapability, setActiveCapability] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', project: '', botcheck: false });
  const [formState, setFormState] = useState('idle');
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!prefersReducedMotion) {
      gsap.timeline({ delay: 0.1 })
        .from('.hero-eyebrow', { opacity: 0, y: -12, duration: 0.5, ease: 'expo.out' })
        .from('.hero-headline', { opacity: 0, y: 50, duration: 1, ease: 'expo.out' }, '-=0.2')
        .from('.hero-sub', { opacity: 0, y: 18, duration: 0.7, ease: 'expo.out' }, '-=0.4')
        .from('.hero-disciplines', { opacity: 0, y: 10, duration: 0.5, ease: 'expo.out' }, '-=0.3')
        .from('.hero-ctas', { opacity: 0, y: 10, duration: 0.5, ease: 'expo.out' }, '-=0.3')
        .from('.hero-img-panel', { opacity: 0, x: 30, duration: 1.2, ease: 'power2.out' }, '-=0.9');
    }

    gsap.to('.indicator-bar', {
      width: '100%', ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.2 },
    });


  }, { scope: container });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.botcheck) { setFormState('confirmed'); return; }
    setFormState('loading');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '8d069e2b-4ec5-4e29-94c2-0d8429647ba6',
          subject: 'AxeomLabs - Project Enquiry',
          from_name: formData.name, replyto: formData.email,
          to: 'founder@axeomlabs.in',
          name: formData.name, email: formData.email,
          message: formData.project,
        }),
      });
      if (res.ok) { setFormState('confirmed'); setFormData({ name: '', email: '', project: '', botcheck: false }); }
      else setFormState('error');
    } catch { setFormState('error'); }
  };

  return (
    <div ref={container}>

      {/* ═══════════════════════════════════════════════════════════════
          01 HERO — Split layout: text left, machine right
          ═══════════════════════════════════════════════════════════════ */}
      <section id="hero" aria-label="AxeomLabs: Intelligence built for the physical world">
        <div className="hero-bg-grid" aria-hidden="true" />
        <div className="container hero-container">
          <div className="hero-grid">

            {/* Left: content */}
            <div className="hero-content">
              <div className="hero-eyebrow">
                <span className="hero-status-dot" aria-hidden="true" />
                <span>AXEOMLABS</span>
                <span className="hero-sep" aria-hidden="true">·</span>
                <span>INDIA</span>
                <span className="hero-sep" aria-hidden="true">·</span>
                <span>EST. 2024</span>
              </div>

              <h1 className="hero-headline">
                Intelligence,<br />
                built for the<br />
                physical world.
              </h1>

              <p className="hero-sub">
                We design and build autonomous drones, robotics platforms, embedded AI,
                and custom hardware. Everything we ship gets tested in the field.
              </p>

              <div className="hero-disciplines" aria-label="Disciplines">
                <span className="hero-disc-item">AI</span>
                <span className="hero-disc-sep">·</span>
                <span className="hero-disc-item">ROBOTICS</span>
                <span className="hero-disc-sep">·</span>
                <span className="hero-disc-item">AUTONOMOUS SYSTEMS</span>
                <span className="hero-disc-sep">·</span>
                <span className="hero-disc-item">HARDWARE</span>
              </div>

              <div className="hero-ctas">
                <button
                  className="btn-primary"
                  onClick={() => document.getElementById('selected-work')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  EXPLORE THE LAB <span aria-hidden="true">→</span>
                </button>
                <Link to="/contact" className="btn-ghost">BUILD WITH US</Link>
              </div>
            </div>

            {/* Right: real machine image panel */}
            <div className="hero-img-panel" aria-hidden="true">
              <div className="hero-media-card">
                <div className="hero-media-header">
                  <div className="hero-media-title">
                    <span className="hero-status-dot sm" />
                    <span>SYS // AXL-DRONE-V4</span>
                  </div>
                  <div className="hero-media-telemetry">
                    <span>GPS: LOCK</span>
                  </div>
                </div>
                <div className="hero-media-img-box">
                  <img
                    src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&q=85"
                    alt="Professional drone in flight at golden hour, representing AxeomLabs autonomous aerial systems"
                    className="hero-machine-img"
                    width="1200"
                    height="800"
                    fetchpriority="high"
                  />
                  <div className="hero-img-overlay" />
                  <div className="hero-crosshair top-left">+</div>
                  <div className="hero-crosshair top-right">+</div>
                  <div className="hero-crosshair bottom-left">+</div>
                  <div className="hero-crosshair bottom-right">+</div>
                </div>
                <div className="hero-media-footer">
                  <span>FIELD TEST: SVALBARD / GOA</span>
                  <span className="hero-img-badge">
                    <span className="hero-status-dot sm" />
                    ONLINE
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll prompt */}
        <div className="hero-scroll-prompt" aria-hidden="true">
          <div className="hero-scroll-line" />
          <span>SCROLL</span>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          02 THE LAB
          ═══════════════════════════════════════════════════════════════ */}
      <section id="the-lab" aria-label="About AxeomLabs">
        <div className="container">
          <div className="lab-intro-grid reveal">
            <div className="lab-intro-label">
              <div className="section-label">THE LAB</div>
              <div className="lab-intro-meta">
                <span className="meta-key">FOUNDED</span><span className="meta-val">2024</span>
                <span className="meta-key">BASE</span><span className="meta-val">INDIA</span>
                <span className="meta-key">FOCUS</span><span className="meta-val">DEEP TECH</span>
              </div>
            </div>
            <div>
              <p className="lab-intro-statement">
                We build systems that move, perceive, and act. Not demos. Actual hardware
                that flies, drives, and navigates uncontrolled environments.
              </p>
              <p className="lab-intro-sub">
                AxeomLabs works end-to-end: from the physics research that informs the
                design, to the firmware that runs on the chip, to the field test that tells
                us whether it actually works.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          03 SELECTED WORK
          ═══════════════════════════════════════════════════════════════ */}
      <section id="selected-work" aria-label="Selected work">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <div className="section-label">SELECTED WORK</div>
              <h2 style={{ marginTop: 8 }}>What we build.</h2>
            </div>
          </div>
        </div>

        {/* Featured large project */}
        <Link to={FEATURED_WORK[0].path} className="work-feature reveal">
          <div className="work-feature-img-wrap">
            <img
              src={FEATURED_WORK[0].img}
              alt={FEATURED_WORK[0].alt}
              className="work-feature-img"
              loading="eager"
              width="1400"
              height="800"
            />
            <div className="work-feature-img-overlay" aria-hidden="true" />
          </div>
          <div className="work-feature-body container">
            <div className="work-feature-left">
              <div className="work-meta-row">
                <span className="work-id">PROJECT {FEATURED_WORK[0].id}</span>
                <span className="work-code">{FEATURED_WORK[0].code}</span>
                <span className="work-status-pill" style={{ '--sc': STATUS_COLOR[FEATURED_WORK[0].status] }}>
                  <span className="work-dot" />
                  {FEATURED_WORK[0].status}
                </span>
              </div>
              <h3 className="work-feature-name">{FEATURED_WORK[0].name}</h3>
            </div>
            <div className="work-feature-right">
              <p className="work-feature-desc">{FEATURED_WORK[0].desc}</p>
              <div className="work-feature-tags">
                {FEATURED_WORK[0].tags.map(t => <span key={t} className="work-tag">{t}</span>)}
              </div>
              <span className="work-explore-link">EXPLORE PROJECT <span aria-hidden="true">↗</span></span>
            </div>
          </div>
        </Link>

        {/* Two smaller projects */}
        <div className="work-pair container">
          {FEATURED_WORK.slice(1).map((w) => (
            <Link key={w.id} to={w.path} className="work-card-sm reveal">
              <div className="work-card-sm-img-wrap">
                <img src={w.img} alt={w.alt} loading="lazy" width="800" height="533" />
                <div className="work-card-sm-overlay" aria-hidden="true" />
              </div>
              <div className="work-card-sm-body">
                <div className="work-meta-row">
                  <span className="work-id">PROJECT {w.id}</span>
                  <span className="work-code">{w.code}</span>
                  <span className="work-status-pill" style={{ '--sc': STATUS_COLOR[w.status] }}>
                    <span className="work-dot" />
                    {w.status}
                  </span>
                </div>
                <h3 className="work-card-sm-name">{w.name}</h3>
                <p className="work-card-sm-desc">{w.desc}</p>
                <div className="work-card-sm-footer">
                  {w.tags.slice(0, 2).map(t => <span key={t} className="work-tag">{t}</span>)}
                  <span className="work-explore-link" style={{ marginLeft: 'auto' }}>
                    EXPLORE <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          04 THE STACK — how we build
          ═══════════════════════════════════════════════════════════════ */}
      <section id="the-stack" aria-label="How we build" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header reveal">
            <div>
              <div className="section-label">THE STACK</div>
              <h2 style={{ marginTop: 8 }}>How we build.</h2>
            </div>
            <p className="stack-intro-right reveal" style={{ maxWidth: '40ch', color: 'var(--on-bg-dim)', fontSize: 14, lineHeight: 1.7 }}>
              We work end-to-end. From the first physics calculation to the last field test.
              Every stage feeds the next. Nothing gets handed off to a different team.
            </p>
          </div>

          <div className="stack-flow" role="list">
            {STACK_STEPS.map((step, i) => (
              <div key={step.num} className="stack-step" role="listitem">
                <div className="stack-step-inner">
                  <div className="stack-step-num">{step.num}</div>
                  <div className="stack-step-label">{step.label}</div>
                  <div className="stack-step-desc">{step.desc}</div>
                </div>
                {i < STACK_STEPS.length - 1 && (
                  <div className="stack-arrow" aria-hidden="true">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          05 CAPABILITIES — interactive
          ═══════════════════════════════════════════════════════════════ */}
      <section id="capabilities" aria-label="Core capabilities">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <div className="section-label">CAPABILITIES</div>
              <h2 style={{ marginTop: 8 }}>What we're good at.</h2>
            </div>
          </div>

          <div className="caps-layout reveal">
            <nav className="caps-nav" aria-label="Capability areas">
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
                <div key={c.num} className={`caps-panel${activeCapability === i ? ' active' : ''}`} aria-hidden={activeCapability !== i}>
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

      {/* ═══════════════════════════════════════════════════════════════
          06 LAB STATUS
          ═══════════════════════════════════════════════════════════════ */}
      <section id="lab-status" aria-label="Lab status" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header reveal">
            <div>
              <div className="section-label">LAB STATUS</div>
              <h2 style={{ marginTop: 8 }}>What's in the lab.</h2>
            </div>
            <span className="section-counter reveal" style={{ alignSelf: 'flex-end', paddingBottom: 4 }}>
              Last updated · Aug 2026
            </span>
          </div>

          <div className="lab-status-grid">
            {LAB_STATUS_GROUPS.map((group) => (
              <div key={group.group} className="lab-group reveal">
                <div className="lab-group-header">
                  <span className="lab-group-dot" style={{ background: group.color }} aria-hidden="true" />
                  <span className="lab-group-label" style={{ color: group.color }}>{group.group}</span>
                  <span className="lab-group-count">{group.items.length} systems</span>
                </div>
                <ul className="lab-group-items">
                  {group.items.map(item => (
                    <li key={item} className="lab-group-item">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          07 FOUNDERS
          ═══════════════════════════════════════════════════════════════ */}
      <section id="founders-brief" aria-label="Founders">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <div className="section-label">FOUNDERS</div>
              <h2 style={{ marginTop: 8 }}>Built by people<br />who like building things.</h2>
            </div>
          </div>

          <div className="founders-brief-grid">
            {FOUNDERS.map((f) => (
              <div key={f.name} className="founder-brief-card reveal">
                <div className="founder-brief-avatar" aria-hidden="true">
                  {f.initials}
                </div>
                <div className="founder-brief-body">
                  <div className="founder-brief-name">{f.name}</div>
                  <div className="founder-brief-role">{f.role}</div>
                  <p className="founder-brief-desc">{f.desc}</p>
                  <a
                    href={f.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="founder-brief-link"
                  >
                    LinkedIn <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ marginTop: 40 }}>
            <Link to="/founders" className="btn-ghost">
              MEET THE FOUNDERS <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          08 CTA — Have a hard problem?
          ═══════════════════════════════════════════════════════════════ */}
      <section id="cta" aria-label="Start a project" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="cta-hard-layout">
            <div className="cta-hard-left reveal-left">
              <div className="section-label">BUILD WITH US</div>
              <h2 className="cta-hard-headline">
                Have a hard<br />problem?
              </h2>
              <p className="cta-hard-sub">
                Tell us what you're trying to build. We respond within 24 to 48 hours.
              </p>
              <a href="mailto:founder@axeomlabs.in" className="cta-hard-email">
                founder@axeomlabs.in <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="cta-hard-form reveal">
              {formState === 'confirmed' ? (
                <div className="form-confirmed">
                  <div className="form-confirmed-icon" aria-hidden="true">✓</div>
                  <div className="form-confirmed-title">Message received.</div>
                  <p className="form-confirmed-sub">We'll be in touch within 24-48 hours.</p>
                </div>
              ) : (
                <form id="contact-form" onSubmit={handleSubmit} aria-label="Project enquiry form">
                  <input
                    type="checkbox"
                    name="botcheck"
                    style={{ display: 'none' }}
                    checked={formData.botcheck}
                    onChange={(e) => setFormData({ ...formData, botcheck: e.target.checked })}
                  />
                  {formState === 'error' && (
                    <p className="form-error-msg">Something went wrong. Email us directly at founder@axeomlabs.in</p>
                  )}
                  <div className="hard-field">
                    <label htmlFor="cta-name" className="hard-label">Your name</label>
                    <input
                      id="cta-name" type="text" className="hard-input" required
                      placeholder="Jane Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="hard-field">
                    <label htmlFor="cta-email" className="hard-label">Email</label>
                    <input
                      id="cta-email" type="email" className="hard-input" required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="hard-field">
                    <label htmlFor="cta-project" className="hard-label">What are you trying to build?</label>
                    <textarea
                      id="cta-project" className="hard-input" required rows="4"
                      placeholder="Describe the problem, project, or idea..."
                      value={formData.project}
                      onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                    disabled={formState === 'loading'}
                  >
                    {formState === 'loading' ? 'SENDING...' : <>START A CONVERSATION <span aria-hidden="true">→</span></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
