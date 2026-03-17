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
    tagline: 'Autonomous AI programmer agent — writes, runs, tests, and fixes code. In-situ.',
    label: 'INTELLIGENCE'
  },
  {
    id: 'obscura-os',
    name: 'ObscuraOS',
    tagline: 'A lightweight, hardened operating system built for privacy and zero-trust environments.',
    label: 'OPERATING SYSTEM'
  },
  {
    id: 'obscura-engine',
    name: 'Obscura Engine',
    tagline: 'Multi-source intelligence layer. The bridge between raw data and executable insight.',
    label: 'RESEARCH'
  },
  {
    id: 'zerovault',
    name: 'ZeroVault',
    tagline: 'Post-quantum encrypted secrets management. Your data, truly yours.',
    label: 'SECURITY'
  }
];

function App() {
  const container = useRef(null);
  const [email, setEmail] = useState('');
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

    // 4. Architecture Layer Reveal (GSAP ScrollTrigger)
    const layers = gsap.utils.toArray('.arch-layer');
    if (layers.length) {
      gsap.from(layers, {
        scrollTrigger: {
          trigger: '.arch-stack',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        x: -40,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out'
      });
    }

    // 5. Philosophy Slam
    const slams = gsap.utils.toArray('.philosophy-statement');
    slams.forEach(slam => {
      gsap.to(slam, {
        scrollTrigger: {
          trigger: slam,
          start: 'top 80%',
          end: 'top 20%',
          scrub: true,
          onEnter: () => slam.classList.add('slam'),
          onLeaveBack: () => slam.classList.remove('slam')
        },
        opacity: 1,
        scale: 1,
        duration: 1
      });
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
    if (!email) return;

    setFormState('loading');
    
    // Simulate real submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setFormState('confirmed');
    setEmail('');
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
              <h1>AxeomLabs</h1>
              <p className="tagline">CONTROL IS THE ONLY SCALE.</p>
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
                Modern computing is a house built on borrowed sand. You don't own your OS. You don't own your models. You don't own your tools. Every layer is a dependency, and every dependency is a failure point waiting to happen.
              </p>
            </div>
          </div>
        </section>

        {/* VISION */}
        <section id="vision" aria-label="The Vision">
          <div className="container">
            <div className="vision-grid">
              <div className="vision-text reveal">
                <h2 className="section-label">02 / ARCHITECTURE</h2>
                <h3>Vertical Integration.</h3>
                <p>We are rebuilding the stack from the hardware up. A unified system where intelligence is not an app, but the engine that powers every layer.</p>
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

        {/* PRODUCTS */}
        <section id="products" aria-label="The Products">
          <div className="container">
            <div className="section-header reveal">
              <h2 className="section-label">03 / THE ARSENAL</h2>
              <h3>Purpose-built tools for the inevitable.</h3>
            </div>
            
            <div id="products-grid" className="cards-grid" role="list">
              {products.map((product, index) => (
                <article 
                  key={product.id} 
                  className="product-card reveal" 
                  role="listitem" 
                  style={{ '--stagger-index': index }}
                >
                  <span className="card-label">{product.label}</span>
                  <h3 className="card-title">{product.name}</h3>
                  <p className="card-tagline">{product.tagline}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PHILOSOPHY */}
        <section id="philosophy" aria-label="The Philosophy">
          <div className="container">
            <div className="philosophy-content">
              <div className="philosophy-statement" data-slam="true">WE BUILD SYSTEMS, NOT FEATURES.</div>
              <div className="philosophy-statement" data-slam="true">OWNERSHIP IS NON-NEGOTIABLE.</div>
              <div className="philosophy-statement" data-slam="true">THE FUTURE IS VERTICAL.</div>
            </div>
          </div>
        </section>

        {/* FOUNDER */}
        <section id="founder" aria-label="The Founder">
          <div className="container">
            <div className="founder-card reveal">
              <div className="founder-meta">
                <span className="label">LEAD ARCHITECT</span>
                <h3 className="name">Harinandan J V</h3>
              </div>
              <p className="founder-text">
                "The world doesn't need more apps. It needs more control over the ones it already has — and a new foundation for the ones it doesn't."
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
                <div className="input-wrapper">
                  <input 
                    type="email" 
                    id="email" 
                    required 
                    placeholder="Enter terminal address..." 
                    aria-label="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="submit" id="submit-btn" className="btn-primary">
                    <span className="btn-text">REQUEST ACCESS</span>
                    <span className="btn-loading">LINKING...</span>
                    <span className="btn-success">CONFIRMED.</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer id="main-footer">
        <div className="container split">
          <span className="copyright">&copy; AXEOMLABS R&D 2026</span>
          <span className="location">BANGALORE / SECURE_ZONE</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
