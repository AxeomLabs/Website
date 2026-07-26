import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Animated number counter
function Counter({ target, suffix = '', decimals = 0 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const start = Date.now();
        const duration = 1800;
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setValue(+(target * ease).toFixed(decimals));
          if (progress < 1) requestAnimationFrame(tick);
          else setValue(target);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [target, decimals]);

  return (
    <span ref={ref}>
      {decimals > 0 ? value.toFixed(decimals) : value}{suffix}
    </span>
  );
}

const divisions = [
  {
    num: '01',
    code: 'DIV.01 // AERIAL',
    title: 'DRONES',
    desc: 'Fixed-wing and multi-rotor UAV platforms engineered for surveillance, mapping, delivery, and autonomous inspection missions.',
    path: '/robotics',
    img: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80',
    alt: 'Drone in flight',
  },
  {
    num: '02',
    code: 'DIV.02 // KINETICS',
    title: 'ROBOTICS',
    desc: 'Ground and underwater robotics platforms with tactile sensing, real-time navigation, and edge AI for complex unstructured environments.',
    path: '/robotics',
    img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
    alt: 'Autonomous robot platform',
  },
  {
    num: '03',
    code: 'DIV.03 // CORE',
    title: 'SOFTWARE',
    desc: 'Full-stack software and embedded firmware for autonomous systems, real-time OS development, and human-machine interfaces.',
    path: '/systems',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    alt: 'Software systems architecture',
  },
  {
    num: '04',
    code: 'DIV.04 // SILICON',
    title: 'HARDWARE',
    desc: 'Custom PCB design, embedded electronics, sensor fusion arrays, and power electronics for autonomous and robotic applications.',
    path: '/systems',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    alt: 'Hardware electronics and PCB',
  },
  {
    num: '05',
    code: 'DIV.05 // DISCOVERY',
    title: 'RESEARCH',
    desc: 'Applied and fundamental research across robotics, materials science, computer vision, and autonomous navigation systems.',
    path: '/research',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80',
    alt: 'Research and advanced sciences',
  },
];

const pillars = [
  { num: '01', title: 'AUTONOMOUS UAV SYSTEMS', desc: 'Fixed-wing and multirotor drones with onboard edge AI for real-time path planning, object avoidance, and mission execution.' },
  { num: '02', title: 'ROBOTICS PLATFORMS', desc: 'Ground, aerial, and aquatic robots designed for inspection, agriculture, construction, and defence applications.' },
  { num: '03', title: 'EMBEDDED SOFTWARE', desc: 'Real-time operating systems, bare-metal firmware, and hardware abstraction layers optimised for deterministic performance.' },
  { num: '04', title: 'HARDWARE DESIGN', desc: 'Custom electronics from schematic to PCB layout and manufacturing, including power management and high-speed signal design.' },
  { num: '05', title: 'COMPUTER VISION', desc: 'Perception pipelines, SLAM, and sensor fusion for depth estimation, object detection, and environment mapping.' },
  { num: '06', title: 'APPLIED RESEARCH', desc: 'Translating scientific breakthroughs into practical systems: from materials to algorithms to deployable products.' },
];

function App() {
  const container = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '', botcheck: false });
  const [formState, setFormState] = useState('idle');

  useGSAP(() => {
    // Hero entrance
    const tl = gsap.timeline({ delay: 0.15 });
    tl.from('.hero-eyebrow', { opacity: 0, y: 12, duration: 0.6, ease: 'expo.out' })
      .from('#hero h1 .word-line', { opacity: 0, y: 60, duration: 1.0, ease: 'expo.out', stagger: 0.12 }, '-=0.3')
      .from('.hero-desc', { opacity: 0, y: 16, duration: 0.7, ease: 'expo.out' }, '-=0.4')
      .from('.hero-cta-row', { opacity: 0, y: 12, duration: 0.5, ease: 'expo.out' }, '-=0.4')
      .from('.hero-hud', { opacity: 0, x: 20, duration: 0.7, ease: 'expo.out' }, '-=0.6');

    // Scroll progress bar
    gsap.to('.indicator-bar', {
      width: '100%', ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.2 },
    });

    // Philosophy clip reveal on scroll
    document.querySelectorAll('.philosophy-stmt').forEach((stmt) => {
      ScrollTrigger.create({
        trigger: stmt,
        start: 'top 88%',
        onEnter: () => stmt.classList.add('visible'),
      });
    });

    // General reveal observer
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.06 });
    document.querySelectorAll('.reveal, .reveal-left').forEach(el => obs.observe(el));

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
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: '8d069e2b-4ec5-4e29-94c2-0d8429647ba6',
          subject: 'AxeomLabs - New Contact Enquiry',
          from_name: 'AxeomLabs Website',
          replyto: formData.email,
          to: 'founder@axeomlabs.in',
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      if (response.ok) {
        setFormState('confirmed');
        setFormData({ name: '', email: '', message: '', botcheck: false });
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  return (
    <div ref={container}>
      {/* HERO */}
      <section id="hero" aria-label="AxeomLabs">
        <div className="hero-bg-grid" aria-hidden="true" />

        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-eyebrow">[ AXEOMLABS // BUILDING INTELLIGENT SYSTEMS ]</div>

            <h1>
              <span className="word-line" style={{ display: 'block' }}>BUILD.</span>
              <span className="word-line" style={{ display: 'block', color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>FLY. THINK.</span>
            </h1>

            <p className="hero-desc">
              We design and build drones, autonomous robots, custom hardware, and the software that runs them.
              From flying systems to ground robots to the code that makes them intelligent.
            </p>

            <div className="hero-cta-row">
              <button
                className="btn-primary"
                onClick={() => document.getElementById('divisions').scrollIntoView({ behavior: 'smooth' })}
              >
                EXPLORE OUR WORK <span aria-hidden="true">→</span>
              </button>
              <Link to="/#cta" className="btn-ghost">GET IN TOUCH</Link>
            </div>
          </div>

          {/* Stats HUD */}
          <div className="hero-hud" role="status" aria-label="Company stats">
            <div className="hud-header">
              ACTIVE PROJECTS
              <span className="hud-live">
                <span className="hud-live-dot" aria-hidden="true" />
                LIVE
              </span>
            </div>
            <div className="hud-row">
              <span className="hud-label">DRONES BUILT</span>
              <span className="hud-value accent"><Counter target={12} /></span>
            </div>
            <div className="hud-row">
              <span className="hud-label">ROBOTS ACTIVE</span>
              <span className="hud-value accent"><Counter target={5} /></span>
            </div>
            <div className="hud-row">
              <span className="hud-label">PROJECTS SHIPPED</span>
              <span className="hud-value"><Counter target={27} /></span>
            </div>
            <div className="hud-row">
              <span className="hud-label">RESEARCH PAPERS</span>
              <span className="hud-value"><Counter target={3} /></span>
            </div>
            <div className="hud-row">
              <span className="hud-label">SYS.STATUS</span>
              <span className="hud-value accent">NOMINAL</span>
            </div>
          </div>
        </div>

        <div className="hero-scroll-prompt" aria-hidden="true">
          <span>SCROLL</span>
          <div className="hero-scroll-line" />
        </div>
      </section>

      {/* DIVISIONS */}
      <section id="divisions" aria-label="What we do">
        <div className="container" style={{ padding: '0 var(--margin)' }}>
          <div className="section-header reveal">
            <div>
              <div className="section-label">01 // WHAT WE DO</div>
              <h2 style={{ color: 'var(--on-bg)', marginTop: 8 }}>OUR DIVISIONS</h2>
            </div>
            <span className="section-counter">FIVE ACTIVE DIVISIONS</span>
          </div>

          <div className="divisions-grid">
            {/* Drones */}
            <Link to="/robotics" className="division-card reveal">
              <img src={divisions[0].img} alt={divisions[0].alt} className="division-card-img" />
              <div className="division-card-body">
                <div className="division-card-info">
                  <div className="division-card-code">{divisions[0].code}</div>
                  <h3>{divisions[0].title}</h3>
                  <p>{divisions[0].desc}</p>
                </div>
                <span className="division-card-arrow">EXPLORE <span aria-hidden="true">↗</span></span>
              </div>
            </Link>

            {/* Robotics */}
            <Link to="/robotics" className="division-card reveal">
              <img src={divisions[1].img} alt={divisions[1].alt} className="division-card-img" />
              <div className="division-card-body">
                <div className="division-card-info">
                  <div className="division-card-code">{divisions[1].code}</div>
                  <h3>{divisions[1].title}</h3>
                  <p>{divisions[1].desc}</p>
                </div>
                <span className="division-card-arrow">EXPLORE <span aria-hidden="true">↗</span></span>
              </div>
            </Link>

            {/* Research - full width */}
            <Link to="/research" className="division-card division-card-full reveal">
              <img src={divisions[4].img} alt={divisions[4].alt} className="division-card-img" />
              <div className="division-card-body">
                <div className="division-card-info">
                  <div className="division-card-code">{divisions[4].code}</div>
                  <h3>{divisions[4].title}</h3>
                  <p>{divisions[4].desc}</p>
                </div>
                <span className="division-card-arrow">EXPLORE <span aria-hidden="true">↗</span></span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section id="philosophy" aria-label="Our principles">
        <div className="container">
          <div className="philosophy-label">02 // PRINCIPLES</div>
          <div className="philosophy-statements">
            {[
              'WE BUILD WHAT MOST CONSIDER IMPOSSIBLE.',
              'EVERY GREAT SYSTEM STARTS WITH THE RIGHT HARDWARE.',
              'SOFTWARE WITHOUT SILICON IS JUST THEORY.',
              'REAL INTELLIGENCE MOVES IN THE PHYSICAL WORLD.',
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

      {/* CAPABILITIES */}
      <section id="directives" aria-label="Core capabilities">
        <div className="container" style={{ padding: '0 var(--margin)' }}>
          <div className="section-header reveal">
            <div>
              <div className="section-label">03 // CAPABILITIES</div>
              <h2 style={{ color: 'var(--on-bg)', marginTop: 8 }}>WHAT WE BUILD</h2>
            </div>
            <span className="section-counter">SIX CORE AREAS</span>
          </div>

          <div className="directives-grid">
            {pillars.map((d) => (
              <div key={d.num} className="directive-card reveal">
                <div className="directive-num">{d.num}</div>
                <h3>{d.title}</h3>
                <p>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="cta" aria-label="Contact us">
        <div className="container" style={{ padding: '0 var(--margin)' }}>
          <div className="cta-layout">
            <div className="cta-left reveal-left">
              <div className="cta-label">04 // CONTACT</div>
              <h2>GET IN<br />TOUCH.</h2>
              <p>
                Whether you have a project in mind, want to collaborate, or just want to say hello,
                we would love to hear from you. We respond within 24 to 48 hours.
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
                  {/* Honeypot */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    style={{ display: 'none' }}
                    checked={formData.botcheck}
                    onChange={(e) => setFormData({ ...formData, botcheck: e.target.checked })}
                  />
                  <div className="t-field">
                    <label className="t-label" htmlFor="contact-name">YOUR NAME</label>
                    <input
                      id="contact-name"
                      type="text"
                      className="t-input"
                      required
                      placeholder="Jane Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="t-field">
                    <label className="t-label" htmlFor="contact-email">EMAIL ADDRESS</label>
                    <input
                      id="contact-email"
                      type="email"
                      className="t-input"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="t-field">
                    <label className="t-label" htmlFor="contact-message">MESSAGE</label>
                    <textarea
                      id="contact-message"
                      className="t-input"
                      required
                      placeholder="Tell us about your project or enquiry..."
                      rows="4"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
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
