import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';

import './index.css';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 'p1',
    name: 'P1',
    label: 'INTELLIGENCE',
    story: 'P1 is not just an agent; it\'s a cognitive force that inhabits the codebase to self-correct and evolve. Intelligence at the threshold.',
    img: '/assets/p1.png'
  },
  {
    id: 'obscura-os',
    name: 'ObscuraOS',
    label: 'OPERATING SYSTEM',
    story: 'The system of absolute silence. A monolithic, zero-trust substrate engineered for the most critical sovereignty. Inhabit the fortress.',
    img: '/assets/os.png'
  },
  {
    id: 'obscura-engine',
    name: 'Obscura Engine',
    label: 'RESEARCH',
    story: 'Connecting the hidden dots. An intelligence layer that synthesizes global telemetry into actionable doctrine. The bridge from noise to clarity.',
    img: '/assets/engine.png'
  },
  {
    id: 'zerovault',
    name: 'ZeroVault',
    label: 'SECURITY',
    story: 'Securing the post-quantum horizon. When traditional cryptography becomes paper-thin, ZeroVault remains the only unbreakable line of defense.',
    img: '/assets/vault.png'
  }
];

function App() {
  const container = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '', botcheck: false });
  const [formState, setFormState] = useState('idle');

  // GSAP Animations
  useGSAP(() => {
    // 1. Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // 2. Initial Page Load Animation
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.classList.remove('loading');
      }
    });

    tl.from('#hero h1', {
      opacity: 0,
      y: 60,
      duration: 2,
      ease: 'expo.out'
    })
    .from('.tagline', {
      opacity: 0,
      y: 20,
      duration: 1.5,
      ease: 'power2.out'
    }, '-=1.2')
    .from('.scroll-prompt', {
      opacity: 0,
      y: 20,
      duration: 1.5,
      ease: 'power2.out'
    }, '-=1');

    // 3. Scroll Reveals (using vanilla IntersectionObserver within React)
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 4. Horizontal Arsenal Scroll (GSAP ScrollTrigger)
    const arsenalWrapper = document.querySelector('.horizontal-wrapper');
    const sections = gsap.utils.toArray('.horizontal-slide');
    
    if (arsenalWrapper && sections.length) {
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: "#products",
          pin: true,
          scrub: 0.5,
          snap: 1 / (sections.length - 1),
          end: () => `+=${arsenalWrapper.offsetWidth}`,
        }
      });

      // Parallax effect for slide images
      sections.forEach(slide => {
        const img = slide.querySelector('.slide-img');
        gsap.fromTo(img, 
          { x: '10%' },
          {
            x: '-10%',
            scrollTrigger: {
              trigger: slide,
              containerAnimation: gsap.getById('horizontalScroll'), // This is tricky in useGSAP without id, let's use the tween itself or just rely on the main scrub
              scrub: true,
            }
          }
        );
      });
    }

    // 5. Philosophy Slam
    const slams = gsap.utils.toArray('.philosophy-statement');
    slams.forEach(slam => {
      gsap.fromTo(slam,
        {
          opacity: 0.1,
          scale: 0.95,
          y: 30,
          filter: 'blur(8px)',
        },
        {
          scrollTrigger: {
            trigger: slam,
            start: 'top 75%',
            end: 'bottom 25%',
            toggleActions: 'play reverse play reverse',
          },
          opacity: 1,
          scale: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.4,
          ease: 'back.out(2)',
        }
      );
    });

    // 6. Scroll Indicator
    gsap.to('.indicator-bar', {
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
      },
      width: '100%'
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      revealObserver.disconnect();
    };
  }, { scope: container });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Honeypot check for bots
    if (formData.botcheck) {
      setFormState('confirmed'); // Fake success
      return;
    }

    setFormState('loading');
    
    try {
      // Free Web3Forms Endpoint - Posts an email directly to your inbox without a backend
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '8d069e2b-4ec5-4e29-94c2-0d8429647ba6', // You will replace this!
          subject: 'AxeomLabs - New Intel/Access Request',
          name: formData.name,
          email: formData.email,
          message: formData.message,
        })
      });
      
      if (response.ok) {
        setFormState('confirmed');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormState('error');
      }
    } catch (error) {
      setFormState('error');
    }
  };

  return (
    <div ref={container}>
      <div id="grain" aria-hidden="true"></div>
      
      <div id="scroll-indicator">
        <div className="indicator-bar"></div>
      </div>

      <main id="main-content">
        
        {/* HERO */}
        <section id="hero" aria-label="Hero">
          <div className="container">
            <div className="hero-content">
              <h1>AXEOMLABS</h1>
              <p className="tagline">INTELLIGENCE INFRASTRUCTURE FOR THE UNPREDICTABLE.</p>
              <div className="hero-cta reveal stagger-child">
                <span className="scroll-prompt">SCROLL TO BEGIN</span>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section id="problem" aria-label="The Problem">
          <div className="container">
            <div className="reveal">
              <h2 className="section-label">01 / CONTEXT</h2>
              <p className="editorial-text">
                High-stakes environments demand absolute clarity. When data is fragmented and systems are opaque, critical vulnerabilities emerge. We build the connective tissue between raw information and decisive action for institutions that cannot afford to fail.
              </p>
            </div>
          </div>
        </section>

        {/* VISION */}
        <section id="vision" aria-label="The Vision">
          <div className="container">
            <div className="vision-grid">
              <div className="vision-text reveal">
                <h2 className="section-label">02 / DOCTRINE</h2>
                <h3>Centralized Intelligence.</h3>
                <p>We deploy secure ecosystems. From bare metal to the execution layer, we engineer AI-driven analytical systems that unify disparate datasets, illuminate blind spots, and grant ultimate operational awareness.</p>
              </div>
              
              <div className="arch-stack">
                <div className="arch-layer" data-layer="4">
                  <span className="layer-label">Interface</span>
                  <span className="layer-desc">Horizontal apps & tools</span>
                </div>
                <div className="arch-layer" data-layer="3">
                  <span className="layer-label">Intelligence</span>
                  <span className="layer-desc">P1 + Obscura Engine</span>
                </div>
                <div className="arch-layer" data-layer="2">
                  <span className="layer-label">ObscuraOS</span>
                  <span className="layer-desc">System ownership</span>
                </div>
                <div className="arch-layer" data-layer="1">
                  <span className="layer-label">Substrate</span>
                  <span className="layer-desc">Physical control layer</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCTS / ARSENAL */}
        <section id="products" className="horizontal-section" aria-label="The Arsenal">
          <div className="horizontal-sticky">
            <div className="horizontal-header container">
              <h2 className="section-label">03 / THE ARSENAL</h2>
              <h3>Forging the narrative of control.</h3>
            </div>
            
            <div className="horizontal-wrapper">
              {products.map((product) => (
                <div key={product.id} className="horizontal-slide">
                  <div className="slide-content container">
                    <div className="slide-text">
                      <span className="card-label">{product.label}</span>
                      <h3 className="slide-title">{product.name}</h3>
                      <p className="slide-story">{product.story}</p>
                    </div>
                    <div className="slide-visual">
                      <div className="slide-img-container">
                        <img src={product.img} alt={product.name} className="slide-img" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PHILOSOPHY */}
        <section id="philosophy" aria-label="The Philosophy">
          <div className="container">
            <div className="philosophy-content">
              <div className="philosophy-statement" data-slam="true">WE SECURE THE FUTURE.</div>
              <div className="philosophy-statement" data-slam="true">CLARITY IS SECURITY.</div>
              <div className="philosophy-statement" data-slam="true">EMPOWER THE ANALYSTS.</div>
            </div>
          </div>
        </section>

        {/* FOUNDERS */}
        <section id="founders" aria-label="The Founders">
          <div className="container">
            <div className="founder-card reveal">
              <div className="founders-group" style={{ display: 'flex', gap: 'var(--gap-lg)', flexWrap: 'wrap', marginBottom: 'var(--gap-md)' }}>
                <div className="founder-meta" style={{ marginBottom: 0 }}>
                  <span className="label">CO-FOUNDER</span>
                  <h3 className="name">Harinandan J V</h3>
                </div>
                <div className="founder-meta" style={{ marginBottom: 0 }}>
                  <span className="label">CO-FOUNDER</span>
                  <h3 className="name">Abhishek A S</h3>
                </div>
              </div>
              <p className="founder-text">
                "The world is becoming more complex, not less. To navigate escalating risks, governments and institutions need systems that don't just store data, but understand it. Security must be architectural."
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="cta" aria-label="The Door">
          <div className="container">
            <div className="cta-content reveal">
              <h2 className="section-label">04 / ACCESS</h2>
              <h3>Request an invite to the private beta.</h3>
              
              <form id="waitlist-form" className={`cta-form ${formState}`} onSubmit={handleFormSubmit}>
                {formState === 'error' && <p className="error-msg">TRANSMISSION FAILED. VERIFY NETWORK AND KEY.</p>}
                
                <div className="form-grid">
                  {/* Invisible Honeypot to trap automated bots */}
                  <input 
                    type="checkbox" 
                    name="botcheck" 
                    style={{ display: 'none' }} 
                    checked={formData.botcheck}
                    onChange={(e) => setFormData({...formData, botcheck: e.target.checked})}
                  />
                  
                  <div className="input-group">
                    <input 
                      type="text" 
                      required 
                      placeholder="Designation / Name" 
                      aria-label="Name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="input-group">
                    <input 
                      type="email" 
                      required 
                      placeholder="Secure Terminal (Email)" 
                      aria-label="Email address"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div className="input-group full-width">
                    <textarea 
                      required 
                      placeholder="State your operational objective..." 
                      aria-label="Message"
                      rows="4"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>

                  <div className="form-actions full-width">
                    <button type="submit" id="submit-btn" className="btn-primary">
                      <span className="btn-text">INITIATE CONTACT</span>
                      <span className="btn-loading">TRANSMITTING...</span>
                      <span className="btn-success">CONFIRMED.</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer id="main-footer">
        <div className="container split">
          <span className="copyright">&copy; AXEOMLABS 2026 </span>
          <span className="location">SECURE_ZONE</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
