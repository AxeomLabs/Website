/* ================================================
   1. INIT — SETUP LIBRARIES AND PLUGINS
   ================================================ */
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    initLenis();
    renderProducts();
    initScrollAnimations();
    initCtaForm();
    initPageLoad();
});

/* ================================================
   2. SMOOTH SCROLL — LENIS
   ================================================ */
let lenis;
function initLenis() {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
}

/* ================================================
   3. PRODUCT DATA & RENDERING
   ================================================ */
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

function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    grid.innerHTML = products.map((product, index) => `
        <article class="product-card reveal" role="listitem" style="--stagger-index: ${index}">
            <span class="card-label">${product.label}</span>
            <h3 class="card-title">${product.name}</h3>
            <p class="card-tagline">${product.tagline}</p>
        </article>
    `).join('');
}

/* ================================================
   4. PAGE LOAD ANIMATION
   ================================================ */
function initPageLoad() {
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
}

/* ================================================
   5. SCROLL ANIMATIONS (IntersectionObserver + ScrollTrigger)
   ================================================ */
function initScrollAnimations() {
    // 6a. IntersectionObserver for basic reveals
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve if we only want it to fire once
                // revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 6b. Architecture Layer Reveal (GSAP ScrollTrigger)
    const layers = document.querySelectorAll('.arch-layer');
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

    // 6c. Philosophy Slam (GSAP ScrollTrigger)
    const slams = document.querySelectorAll('.philosophy-statement');
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

    // 6d. Scroll Progress Bar
    gsap.to('.indicator-bar', {
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3
        },
        width: '100%'
    });
}

/* ================================================
   6. CTA FORM LOGIC
   ================================================ */
function initCtaForm() {
    const form = document.getElementById('waitlist-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const input = form.querySelector('input');
        if (!input.value) return;

        form.classList.add('loading');
        
        // Simulate real submisson
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        form.classList.remove('loading');
        form.classList.add('confirmed');
        input.value = '';
    });
}
