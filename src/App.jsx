import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Live counter that animates to a target value
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

const directives = [
  { num: '01', title: 'AUTONOMOUS INTELLIGENCE', desc: 'Self-modifying agent architectures operating at the boundary of instruction and inference.' },
  { num: '02', title: 'SUBSTRATE ENGINEERING', desc: 'Custom silicon and firmware stacks optimized for deterministic real-time computation.' },
  { num: '03', title: 'KINEMATIC SYSTEMS', desc: 'Robotics platforms bridging algorithmic cognition with precise physical articulation.' },
  { num: '04', title: 'SECURITY PROTOCOLS', desc: 'Zero-trust architectures and adversarial resilience for autonomous infrastructure.' },
  { num: '05', title: 'VERTICAL INTEGRATION', desc: 'From electron to interface — controlling the full stack eliminates emergent failure modes.' },
  { num: '06', title: 'INEVITABLE SYSTEMS', desc: 'Technology that becomes infrastructure. The kind of progress that cannot be undone.' },
];

function App() {
  const container = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '', botcheck: false });
  const [formState, setFormState] = useState('idle');

  useGSAP(() => {
    // Hero entrance
    const tl = gsap.timeline({ delay: 0.1 });
    tl.from('.hero-eyebrow', { opacity: 0, y: 12, duration: 0.6, ease: 'expo.out' })
      .from('#hero h1 .word-line', { opacity: 0, y: 60, duration: 1.0, ease: 'expo.out', stagger: 0.12 }, '-=0.3')
      .from('.hero-desc', { opacity: 0, y: 16, duration: 0.7, ease: 'expo.out' }, '-=0.4')
      .from('.hero-cta-row', { opacity: 0, y: 12, duration: 0.5, ease: 'expo.out' }, '-=0.4')
      .from('.hero-hud', { opacity: 0, x: 20, duration: 0.7, ease: 'expo.out' }, '-=0.6');

    // Scroll indicator bar
    gsap.to('.indicator-bar', {
      width: '100%', ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.2 }
    });

    // Philosophy statements — clip reveal on scroll
    document.querySelectorAll('.philosophy-stmt').forEach((stmt) => {
      ScrollTrigger.create({
        trigger: stmt,
        start: 'top 85%',
        onEnter: () => stmt.classList.add('visible'),
      });
    });

    // Intersection observer for .reveal elements
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
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
          subject: 'AxeomLabs — New Access Request',
          name: formData.name, email: formData.email, message: formData.message,
        }),
      });
      if (response.ok) { setFormState('confirmed'); setFormData({ name: '', email: '', message: '' }); }
      else { setFormState('error'); }
    } catch { setFormState('error'); }
  };

  return (
    <div ref={container}>
      {/* ── HERO ── */}
      <section id="hero" aria-label="Hero">
        <div className="hero-bg-grid" aria-hidden="true" />

        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-eyebrow">[ AXEOM PROTOCOL : STABLE ]</div>

            <h1>
              <span className="word-line" style={{ display: 'block' }}>INTELLIGENCE</span>
              <span className="word-line" style={{ display: 'block', color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>INFRASTRUCTURE.</span>
            </h1>

            <p className="hero-desc">
              Engineering the substrate for autonomous systems, generative models, and the next generation
              of computational environments. We build the foundations others will build upon.
            </p>

            <div className="hero-cta-row">
              <button
                className="btn-primary"
                onClick={() => document.getElementById('divisions').scrollIntoView({ behavior: 'smooth' })}
              >
                ENTER LABORATORY <span aria-hidden="true">→</span>
              </button>
              <Link to="/#cta" className="btn-ghost">REQUEST ACCESS</Link>
            </div>
          </div>

          {/* Live telemetry HUD */}
          <div className="hero-hud" role="status" aria-label="System telemetry">
            <div className="hud-header">
              SYS.TELEMETRY
              <span className="hud-live">
                <span className="hud-live-dot" aria-hidden="true" />
                LIVE
              </span>
            </div>
            <div className="hud-row">
              <span className="hud-label">UPTIME</span>
              <span className="hud-value accent">99.999%</span>
            </div>
            <div className="hud-row">
              <span className="hud-label">LATENCY</span>
              <span className="hud-value accent">&lt;0.5ms</span>
            </div>
            <div className="hud-row">
              <span className="hud-label">NODES ACTIVE</span>
              <span className="hud-value"><Counter target={247} /></span>
            </div>
            <div className="hud-row">
              <span className="hud-label">INFERENCE/SEC</span>
              <span className="hud-value"><Counter target={14380} /></span>
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

      {/* ── DIVISIONS ── */}
      <section id="divisions" aria-label="Laboratory Divisions">
        <div className="container" style={{ padding: 'calc(var(--unit) * 16) var(--margin)' }}>
          <div className="section-header reveal">
            <div>
              <div className="section-label">01 // OPERATIONS</div>
              <h2 style={{ color: 'var(--on-bg)', marginTop: 8 }}>LABORATORY DIVISIONS</h2>
            </div>
            <span className="section-counter">THREE ACTIVE DIVISIONS</span>
          </div>

          <div className="divisions-grid">
            {/* Robotics */}
            <Link to="/robotics" className="division-card reveal">
              <img
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80"
                alt="Robotics & AI division"
                className="division-card-img"
              />
              <div className="division-card-body">
                <div className="division-card-info">
                  <div className="division-card-code">DIV.01 // KINETICS</div>
                  <h3>ROBOTICS & AI</h3>
                  <p>Kinematic autonomy and physical world translation layers. Bridging algorithmic cognition with physical articulation.</p>
                </div>
                <span className="division-card-arrow">ENTER <span aria-hidden="true">↗</span></span>
              </div>
            </Link>

            {/* Systems */}
            <Link to="/systems" className="division-card reveal">
              <img
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80"
                alt="Software & Systems division"
                className="division-card-img"
              />
              <div className="division-card-body">
                <div className="division-card-info">
                  <div className="division-card-code">DIV.02 // CORE</div>
                  <h3>SOFTWARE & SYSTEMS</h3>
                  <p>Deterministic logic protocols governing decentralized agent infrastructure. Extremely low-latency environments.</p>
                </div>
                <span className="division-card-arrow">ENTER <span aria-hidden="true">↗</span></span>
              </div>
            </Link>

            {/* Research — full width */}
            <Link to="/research" className="division-card division-card-full reveal">
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80"
                alt="Advanced Research division"
                className="division-card-img"
              />
              <div className="division-card-body">
                <div className="division-card-info">
                  <div className="division-card-code">DIV.03 // DISCOVERY</div>
                  <h3>ADVANCED RESEARCH</h3>
                  <p>Theoretical boundaries and fundamental physics simulations. Exploring the molecular and cosmic limits of matter, alongside the cultural and aesthetic resonance of human endeavor.</p>
                </div>
                <span className="division-card-arrow">ENTER <span aria-hidden="true">↗</span></span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section id="philosophy" aria-label="Core Directives">
        <div className="container">
          <div className="philosophy-label">02 // DOCTRINE</div>
          <div className="philosophy-statements">
            {[
              'WE BUILD WHAT OTHERS CONSIDER IMPOSSIBLE.',
              'INTELLIGENCE IS THE ONLY MOAT WORTH BUILDING.',
              'VERTICAL INTEGRATION IS NOT A STRATEGY — IT IS A NECESSITY.',
              'THE FUTURE IS ALREADY WRITTEN IN PHYSICS.',
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

      {/* ── CORE DIRECTIVES ── */}
      <section id="directives" aria-label="Core Directives">
        <div className="container" style={{ padding: 'calc(var(--unit) * 16) var(--margin)' }}>
          <div className="section-header reveal">
            <div>
              <div className="section-label">03 // ARCHITECTURE</div>
              <h2 style={{ color: 'var(--on-bg)', marginTop: 8 }}>CORE DIRECTIVES</h2>
            </div>
            <span className="section-counter">SIX PILLARS</span>
          </div>

          <div className="directives-grid">
            {directives.map((d) => (
              <div key={d.num} className="directive-card reveal">
                <div className="directive-num">{d.num}</div>
                <h3>{d.title}</h3>
                <p>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="cta" aria-label="Access Portal">
        <div className="container" style={{ padding: 'calc(var(--unit) * 16) var(--margin)' }}>
          <div className="cta-layout">
            <div className="cta-left reveal-left">
              <div className="cta-label">04 // ACCESS PORTAL</div>
              <h2>REQUEST<br />ACCESS.</h2>
              <p>Submit your credentials for private beta evaluation. We assess operational objectives, not résumés.</p>
              <div className="cta-manifest">
                <div className="manifest-item">ENCRYPTED TRANSMISSION</div>
                <div className="manifest-item">72HR RESPONSE SLA</div>
                <div className="manifest-item">PRIVATE BETA EVALUATION</div>
                <div className="manifest-item">NDA ON ACCEPTANCE</div>
              </div>
            </div>

            <div className="terminal-form reveal">
              <div className="terminal-header" aria-hidden="true">
                <div className="terminal-dot red" />
                <div className="terminal-dot amber" />
                <div className="terminal-dot green" />
                <span className="terminal-title">axeom-access — secure-terminal</span>
              </div>
              <div className="terminal-body">
                <div className="terminal-prompt">
                  <span>axeom@secure:~$</span> initiate_contact --encrypted
                </div>
                {formState === 'error' && (
                  <p className="error-msg">[ TRANSMISSION FAILED — VERIFY NETWORK ]</p>
                )}
                <form
                  id="waitlist-form"
                  className={`cta-form ${formState}`}
                  onSubmit={handleFormSubmit}
                  aria-label="Access request form"
                >
                  <input
                    type="checkbox"
                    name="botcheck"
                    style={{ display: 'none' }}
                    checked={formData.botcheck}
                    onChange={(e) => setFormData({ ...formData, botcheck: e.target.checked })}
                  />
                  <div className="t-field">
                    <div className="t-label">DESIGNATION / NAME</div>
                    <input
                      type="text"
                      className="t-input"
                      required
                      placeholder="John Axeom"
                      aria-label="Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="t-field">
                    <div className="t-label">SECURE TERMINAL (EMAIL)</div>
                    <input
                      type="email"
                      className="t-input"
                      required
                      placeholder="operator@domain.io"
                      aria-label="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="t-field">
                    <div className="t-label">OPERATIONAL OBJECTIVE</div>
                    <textarea
                      className="t-input"
                      required
                      placeholder="State your mission parameters..."
                      aria-label="Message"
                      rows="4"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <div className="terminal-actions">
                    <button type="submit" id="submit-btn" className="btn-primary">
                      <span className="btn-text">INITIATE CONTACT <span aria-hidden="true">→</span></span>
                      <span className="btn-loading">TRANSMITTING...</span>
                      <span className="btn-success">[ CONFIRMED ]</span>
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
