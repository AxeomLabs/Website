import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import useReducedMotion from './hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

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
  return <span ref={ref}>{decimals > 0 ? value.toFixed(decimals) : value}{suffix}</span>;
}

const divisions = [
  {
    num: '01', code: 'DIV.01 // ENGINEERING', title: 'ENGINEERING',
    desc: 'Full-stack product development from concept to production, spanning hardware, software, and everything in between.',
    path: '/division-1',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    alt: 'Engineering workspace',
  },
  {
    num: '02', code: 'DIV.02 // DESIGN', title: 'DESIGN',
    desc: 'Human-centred design systems, spatial interfaces, and brand identity built for clarity and impact.',
    path: '/division-2',
    img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
    alt: 'Design studio',
  },
  {
    num: '03', code: 'DIV.03 // RESEARCH', title: 'RESEARCH',
    desc: 'Applied research translating scientific breakthroughs into practical, deployable technology.',
    path: '/division-3',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80',
    alt: 'Research laboratory',
  },
];

const pillars = [
  { num: '01', title: 'PRODUCT DEVELOPMENT', desc: 'End-to-end product engineering from prototype to scale, covering hardware, firmware, and cloud infrastructure.' },
  { num: '02', title: 'INTERFACE DESIGN', desc: 'User-centred interfaces for web, mobile, and spatial computing platforms with design system architecture.' },
  { num: '03', title: 'EMBEDDED SYSTEMS', desc: 'Real-time operating systems, bare-metal firmware, and hardware abstraction layers for deterministic performance.' },
  { num: '04', title: 'DATA PLATFORMS', desc: 'Scalable data pipelines, analytics infrastructure, and ML model deployment for production workloads.' },
  { num: '05', title: 'CLOUD ARCHITECTURE', desc: 'Infrastructure design, CI/CD pipelines, and multi-cloud deployment strategies for resilient systems.' },
  { num: '06', title: 'APPLIED RESEARCH', desc: 'Translating scientific breakthroughs into practical systems — from algorithms to deployable products.' },
];

function App() {
  const container = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '', botcheck: false });
  const [formState, setFormState] = useState('idle');
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!prefersReducedMotion) {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.from('.hero-eyebrow', { opacity: 0, y: 12, duration: 0.6, ease: 'expo.out' })
        .from('#hero h1 .word-line', { opacity: 0, y: 60, duration: 1.0, ease: 'expo.out', stagger: 0.12 }, '-=0.3')
        .from('.hero-desc', { opacity: 0, y: 16, duration: 0.7, ease: 'expo.out' }, '-=0.4')
        .from('.hero-cta-row', { opacity: 0, y: 12, duration: 0.5, ease: 'expo.out' }, '-=0.4')
        .from('.hero-hud', { opacity: 0, x: 20, duration: 0.7, ease: 'expo.out' }, '-=0.6');
    }

    gsap.to('.indicator-bar', {
      width: '100%', ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.2 },
    });

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.01, rootMargin: '50px 0px' });
    document.querySelectorAll('.reveal, .reveal-left, .philosophy-stmt').forEach(el => obs.observe(el));

    return () => obs.disconnect();
  }, { scope: container });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    if (formData.botcheck) { setFormState('confirmed'); return; }
    setFormState('loading');
    try {
      // TODO: Replace with your form backend (Web3Forms, Formspree, etc.)
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_KEY',
          subject: 'New Contact Enquiry',
          from_name: formData.name,
          replyto: formData.email,
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
      <section id="hero" aria-label="Homepage hero">
        <div className="hero-bg-grid" aria-hidden="true" />
        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-eyebrow">[ ACME LABS // BUILDING THE FUTURE ]</div>
            <h1>
              <span className="word-line" style={{ display: 'block' }}>BUILD.</span>
              <span className="word-line" style={{ display: 'block', color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>SHIP. SCALE.</span>
            </h1>
            <p className="hero-desc">
              We design and build products that push the boundary of what's possible.
              From concept to production — engineering, design, and research under one roof.
            </p>
            <div className="hero-cta-row">
              <button className="btn-primary" onClick={() => document.getElementById('divisions').scrollIntoView({ behavior: 'smooth' })}>
                EXPLORE OUR WORK <span aria-hidden="true">→</span>
              </button>
              <Link to="/#cta" className="btn-ghost">GET IN TOUCH</Link>
            </div>
          </div>
          <div className="hero-hud" role="status" aria-label="Stats">
            <div className="hud-header">
              ACTIVE PROJECTS
              <span className="hud-live"><span className="hud-live-dot" aria-hidden="true" />LIVE</span>
            </div>
            <div className="hud-row"><span className="hud-label">PRODUCTS SHIPPED</span><span className="hud-value accent"><Counter target={24} /></span></div>
            <div className="hud-row"><span className="hud-label">CLIENTS SERVED</span><span className="hud-value accent"><Counter target={18} /></span></div>
            <div className="hud-row"><span className="hud-label">TEAM MEMBERS</span><span className="hud-value"><Counter target={12} /></span></div>
            <div className="hud-row"><span className="hud-label">UPTIME</span><span className="hud-value"><Counter target={99.9} decimals={1} suffix="%" /></span></div>
            <div className="hud-row"><span className="hud-label">SYS.STATUS</span><span className="hud-value accent">NOMINAL</span></div>
          </div>
        </div>
        <div className="hero-scroll-prompt" aria-hidden="true">
          <span>SCROLL</span><div className="hero-scroll-line" />
        </div>
      </section>

      <section id="divisions" aria-label="What we do">
        <div className="container" style={{ padding: '0 var(--margin)' }}>
          <div className="section-header reveal">
            <div>
              <div className="section-label">01 // WHAT WE DO</div>
              <h2 style={{ color: 'var(--on-bg)', marginTop: 8 }}>OUR DIVISIONS</h2>
            </div>
            <span className="section-counter">THREE ACTIVE DIVISIONS</span>
          </div>
          <div className="divisions-grid">
            {divisions.slice(0, 2).map((div) => (
              <Link key={div.num} to={div.path} className="division-card reveal">
                <img src={div.img} alt={div.alt} className="division-card-img" loading="lazy" width="800" height="533" />
                <div className="division-card-body">
                  <div className="division-card-info">
                    <div className="division-card-code">{div.code}</div>
                    <h3>{div.title}</h3>
                    <p>{div.desc}</p>
                  </div>
                  <span className="division-card-arrow">EXPLORE <span aria-hidden="true">↗</span></span>
                </div>
              </Link>
            ))}
            <Link to={divisions[2].path} className="division-card division-card-full reveal">
              <img src={divisions[2].img} alt={divisions[2].alt} className="division-card-img" loading="lazy" width="1400" height="933" />
              <div className="division-card-body">
                <div className="division-card-info">
                  <div className="division-card-code">{divisions[2].code}</div>
                  <h3>{divisions[2].title}</h3>
                  <p>{divisions[2].desc}</p>
                </div>
                <span className="division-card-arrow">EXPLORE <span aria-hidden="true">↗</span></span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section id="philosophy" aria-label="Our principles">
        <div className="container">
          <div className="philosophy-label">02 // PRINCIPLES</div>
          <div className="philosophy-statements">
            {[
              'WE BUILD WHAT OTHERS THINK IS IMPOSSIBLE.',
              'GREAT PRODUCTS START WITH GREAT ENGINEERING.',
              'DESIGN WITHOUT FUNCTION IS DECORATION.',
              'SHIP FAST. ITERATE FASTER.',
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

      <section id="cta" aria-label="Contact us">
        <div className="container" style={{ padding: '0 var(--margin)' }}>
          <div className="cta-layout">
            <div className="cta-left reveal-left">
              <div className="cta-label">04 // CONTACT</div>
              <h2>GET IN<br />TOUCH.</h2>
              <p>
                Whether you have a project in mind, want to collaborate, or just want to say hello,
                we'd love to hear from you. We respond within 24–48 hours.
              </p>
              <div className="cta-manifest">
                <div className="manifest-item">QUICK RESPONSE TIME</div>
                <div className="manifest-item">OPEN TO COLLABORATION</div>
                <div className="manifest-item">CUSTOM PROJECT ENQUIRIES</div>
                <div className="manifest-item">PARTNERSHIP OPPORTUNITIES</div>
              </div>
              <a href="mailto:hello@example.com" className="btn-ghost" style={{ marginTop: 24, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                hello@example.com <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="terminal-form reveal">
              <div className="terminal-header" aria-hidden="true">
                <div className="terminal-dot red" /><div className="terminal-dot amber" /><div className="terminal-dot green" />
                <span className="terminal-title">acme // contact</span>
              </div>
              <div className="terminal-body">
                <div className="terminal-prompt"><span>acme@labs:~$</span> send_message --secure</div>
                {formState === 'error' && (
                  <p className="error-msg">[ SEND FAILED / please try again or email us directly ]</p>
                )}
                <form id="contact-form" className={`cta-form ${formState}`} onSubmit={handleFormSubmit} aria-label="Contact form">
                  <input type="checkbox" name="botcheck" style={{ display: 'none' }} checked={formData.botcheck} onChange={(e) => setFormData({ ...formData, botcheck: e.target.checked })} />
                  <div className="t-field">
                    <label className="t-label" htmlFor="contact-name">YOUR NAME</label>
                    <input id="contact-name" type="text" className="t-input" required placeholder="Jane Smith" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div className="t-field">
                    <label className="t-label" htmlFor="contact-email">EMAIL ADDRESS</label>
                    <input id="contact-email" type="email" className="t-input" required placeholder="you@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                  <div className="t-field">
                    <label className="t-label" htmlFor="contact-message">MESSAGE</label>
                    <textarea id="contact-message" className="t-input" required placeholder="Tell us about your project…" rows="4" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
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
