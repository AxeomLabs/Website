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
  { num: '01', label: 'RESEARCH & DEVELOPMENT', desc: 'Establish the technical foundation and system architecture.' },
  { num: '02', label: 'CORE DEVELOPMENT', desc: 'Develop robotic platforms and autonomous capabilities.' },
  { num: '03', label: 'HARDWARE', desc: 'Integrate mechanisms, power systems, sensors, and controls.' },
  { num: '04', label: 'PROTOTYPE & INTEGRATION', desc: 'Bring robotic platforms and autonomous systems together.' },
  { num: '05', label: 'TESTING & VALIDATION', desc: 'Validate performance in simulated extreme environments.' },
  { num: '06', label: 'SPACE DEPLOYMENT', desc: 'Pursue flight qualification and mission partnerships.' },
];

/* ─── Featured work ─────────────────────────────────────────────────────────── */
const FEATURED_WORK = [
  {
    id: '001',
    code: 'INFRASTRUCTURE MAINTENANCE',
    name: 'Robotics for Remote Infrastructure',
    desc: 'Robotic systems for inspecting and repairing essential infrastructure in harsh and remote environments, reducing the need to place people in hazardous operating conditions.',
    tags: ['INSPECTION', 'MAINTENANCE', 'REMOTE OPS'],
    status: 'R&D',
    path: '/robotics',
    img: '/assets/space/industrial-robot-arm.jpg',
    alt: 'Industrial robotic arm on a manufacturing line, illustrating infrastructure maintenance systems.',
  },
  {
    id: '002',
    code: 'MATERIAL HANDLING',
    name: 'Remote Resource Handling',
    desc: 'Robotic systems designed to transport and position heavy resources safely at remote worksites and future off-world outposts.',
    tags: ['TRANSPORT', 'POSITIONING', 'REMOTE OPS'],
    status: 'R&D',
    path: '/robotics',
    img: '/assets/space/robotic-arm-lab.jpg',
    alt: 'Robotic arm in an engineering laboratory, illustrating material-handling systems.',
  },
  {
    id: '003',
    code: 'AUTONOMOUS CONSTRUCTION',
    name: 'Robotic Construction Systems',
    desc: 'Long-term development of autonomous systems that can build and maintain the physical infrastructure required for lunar and Martian exploration.',
    tags: ['AUTONOMY', 'INTEGRATION', 'SPACE SYSTEMS'],
    status: 'R&D',
    path: '/systems',
    img: '/assets/space/outpost-analog.jpg',
    alt: 'Mars-analog research habitat in a desert, illustrating future outpost development.',
  },
];

/* ─── Capabilities ──────────────────────────────────────────────────────────── */
const CAPABILITIES = [
  {
    num: '01',
    title: 'AUTONOMY',
    desc: 'Sensing, perception, and control for robots working in remote environments with limited human access.',
    tags: ['PERCEPTION', 'NAVIGATION', 'CONTROL', 'REMOTE OPS'],
    path: '/research',
  },
  {
    num: '02',
    title: 'ROBOTICS',
    desc: 'Task-capable robotic platforms for infrastructure maintenance, material handling, and autonomous construction.',
    tags: ['MAINTENANCE', 'HANDLING', 'CONSTRUCTION'],
    path: '/robotics',
  },
  {
    num: '03',
    title: 'EXTREME ENVIRONMENTS',
    desc: 'Engineering systems for dependable operation in harsh, hazardous, and remote environments.',
    tags: ['DURABILITY', 'VALIDATION', 'FIELD OPS'],
    path: '/research',
  },
  {
    num: '04',
    title: 'SYSTEMS ENGINEERING',
    desc: 'Robotic platforms bring hardware, controls, sensing, and software together as one dependable system.',
    tags: ['HARDWARE', 'CONTROL', 'INTEGRATION'],
    path: '/systems',
  },
  {
    num: '05',
    title: 'MISSION OPERATIONS',
    desc: 'Developing robotic systems for remote industrial work on Earth and future lunar and Martian operations.',
    tags: ['REMOTE WORK', 'LUNAR', 'MARTIAN'],
    path: '/systems',
  },
  {
    num: '06',
    title: 'SPACE SYSTEMS',
    desc: 'A long-term roadmap toward robots that prepare and maintain outposts for lunar and Martian exploration.',
    tags: ['OUTPOSTS', 'SPACE ROBOTICS', 'ROADMAP'],
    path: '/research',
  },
];

/* ─── Lab status ────────────────────────────────────────────────────────────── */
const LAB_STATUS_GROUPS = [
  {
    group: 'APPLICATIONS',
    color: '#4ade80',
    items: ['Infrastructure maintenance', 'Remote material handling', 'Autonomous construction'],
  },
  {
    group: 'ROADMAP',
    color: '#60a5fa',
    items: ['Core development', 'Prototype integration', 'Testing and validation'],
  },
  {
    group: 'OPERATING HORIZON',
    color: '#f59e0b',
    items: ['Near term: remote operations on Earth', 'Long term: lunar outpost preparation', 'Long term: Martian outpost preparation'],
  },
];

const FOUNDERS = [
  {
    initials: 'HJV',
    name: 'Harinandan J V',
    role: 'Co-Founder & CEO',
    desc: 'Drives company strategy, product development, and the long-term vision for AxeomLabs.',
    linkedin: 'https://www.linkedin.com/in/harinandanjv',
  },
  {
    initials: 'AAS',
    name: 'Abhishek A S',
    role: 'Co-Founder & CTO',
    desc: 'Leads technical strategy and engineering development across the company’s robotic systems.',
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
          01 HERO - Split layout: text left, machine right
          ═══════════════════════════════════════════════════════════════ */}
      <section id="hero" aria-label="AxeomLabs: Robotics for extreme environments">
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
                Robotics for the<br />
                next frontier.
              </h1>

              <p className="hero-sub">
                We develop task-capable robotic systems for hazardous and remote work on Earth,
                building toward the machines that prepare future lunar and Martian outposts.
              </p>

              <div className="hero-disciplines" aria-label="Disciplines">
                <span className="hero-disc-item">SPACE ROBOTICS</span>
                <span className="hero-disc-sep">·</span>
                <span className="hero-disc-item">AUTONOMY</span>
                <span className="hero-disc-sep">·</span>
                <span className="hero-disc-item">EXTREME ENVIRONMENTS</span>
                <span className="hero-disc-sep">·</span>
                <span className="hero-disc-item">SPACE SYSTEMS</span>
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
                    <span>SYS // FIELD ROBOTICS</span>
                  </div>
                  <div className="hero-media-telemetry">
                    <span>MISSION: ROBOTICS</span>
                  </div>
                </div>
                <div className="hero-media-img-box">
                  <img
                    src="/assets/space/planetary-rover-test.jpg"
                    alt="Mars rover test vehicle at an Earth-based outdoor test facility."
                    className="hero-machine-img"
                    width="1200"
                    height="800"
                    fetchPriority="high"
                  />
                  <div className="hero-img-overlay" />
                  <div className="hero-crosshair top-left">+</div>
                  <div className="hero-crosshair top-right">+</div>
                  <div className="hero-crosshair bottom-left">+</div>
                  <div className="hero-crosshair bottom-right">+</div>
                </div>
                <div className="hero-media-footer">
                  <span>ROADMAP: EARTH / LUNAR / MARTIAN</span>
                  <span className="hero-img-badge">
                    <span className="hero-status-dot sm" />
                    IN DEVELOPMENT
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
                <span className="meta-key">FOCUS</span><span className="meta-val">SPACE ROBOTICS</span>
              </div>
            </div>
            <div>
              <p className="lab-intro-statement">
                We are building robots to prepare the places people may one day live, work, and do research.
                Our first applications are remote and hazardous operations on Earth.
              </p>
              <p className="lab-intro-sub">
                Our roadmap moves from research and core development through prototype integration
                and validation, toward robots that can help prepare lunar and Martian outposts.
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
          04 THE STACK - how we build
          ═══════════════════════════════════════════════════════════════ */}
      <section id="the-stack" aria-label="How we build" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header reveal">
            <div>
              <div className="section-label">THE STACK</div>
              <h2 style={{ marginTop: 8 }}>How we build.</h2>
            </div>
            <p className="stack-intro-right reveal" style={{ maxWidth: '40ch', color: 'var(--on-bg-dim)', fontSize: 14, lineHeight: 1.7 }}>
              The roadmap moves from research and core development through prototype integration
              and validation, with each phase preparing the systems for more demanding environments.
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
          05 CAPABILITIES - interactive
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
              ROADMAP: EARTH / LUNAR / MARTIAN
            </span>
          </div>

          <div className="lab-status-grid">
            {LAB_STATUS_GROUPS.map((group) => (
              <div key={group.group} className="lab-group reveal">
                <div className="lab-group-header">
                  <span className="lab-group-dot" style={{ background: group.color }} aria-hidden="true" />
                  <span className="lab-group-label" style={{ color: group.color }}>{group.group}</span>
                  <span className="lab-group-count">{group.items.length} focus areas</span>
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
              <h2 style={{ marginTop: 8 }}>Built for work<br />beyond the frontier.</h2>
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
          08 CTA - Have a hard problem?
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
