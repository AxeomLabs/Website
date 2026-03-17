# AxeomLabs — Interactive Storytelling Website

> *"We don't build apps. We build control."*

---

## What This Is

This is the public-facing website for **AxeomLabs** — a stealth R&D lab building a vertically integrated intelligent computing ecosystem across AI agents, operating systems, secure tools, and automation infrastructure.

This is not a landing page. It is a **scroll-driven cinematic narrative** — a story told through motion, typography, and atmosphere. Every section is a chapter. Every scroll is a beat. The visitor finishes with one feeling: *this is inevitable.*

---

## Why It Exists

AxeomLabs is stepping out of stealth. The world needs a front door — but not a typical one. The website must communicate:

- The **scale** of the vision (vertical integration, not just apps)
- The **philosophy** (control, ownership, anti-dependency)
- The **products** (P1, ObscuraOS, Obscura Engine, ZeroVault)
- The **inevitability** of what's being built

A standard SaaS landing page would betray the mission. This site is built as a statement of existence.

---

## Emotional Arc

The scroll journey is engineered to move the visitor through five emotional states:

| Stage | Emotion | Section |
|---|---|---|
| 1 | Awe | Hero — full-screen cinematic entry |
| 2 | Curiosity | The Problem — world as it is |
| 3 | Recognition | The Vision — layered architecture reveal |
| 4 | Belief | Products + Philosophy — the arsenal and the code |
| 5 | Action | CTA — the door opens |

---

## Products Featured

| Product | Description |
|---|---|
| **P1** | Autonomous AI programmer agent — writes, runs, tests, and fixes code |
| **ObscuraOS** | Custom operating system built for privacy and deep system control |
| **Obscura Engine** | Multi-source AI research and intelligence layer |
| **ZeroVault** | Encrypted notes and secrets system |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 (semantic) |
| Styling | CSS3 with custom properties |
| Interaction | Vanilla JavaScript (ES6+) |
| Animation | GSAP + ScrollTrigger (or IntersectionObserver fallback) |
| Smooth Scroll | Lenis |
| Fonts | Google Fonts CDN |
| Background FX | CSS noise/grain + optional Three.js particles |

No build pipeline. No framework. No backend. Opens in a browser from the file system.

---

## How to Run

### Option 1 — Direct Open
```bash
open index.html
```
Or drag `index.html` into any modern browser.

### Option 2 — Local Dev Server (recommended for smooth scroll)
```bash
# Using Python
python3 -m http.server 3000

# Using Node (npx)
npx serve .

# Using VS Code
# Install Live Server extension → right-click index.html → Open with Live Server
```
Then visit `http://localhost:3000`

---

## File Structure

```
axeomlabs-website/
├── index.html          # Main entry point — full site
├── style.css           # All styles, CSS variables, animations
├── main.js             # Scroll logic, GSAP triggers, cursor, interactions
├── assets/
│   └── fonts/          # Local font fallbacks if needed
├── README.md           # This file
├── ARCHITECTURE.md     # System design and component map
├── DEVELOPMENT.md      # How to modify and extend safely
└── AI_CONTEXT.md       # Agent guidance for AI-assisted development
```

---

## Browser Support

| Browser | Support |
|---|---|
| Chrome 100+ | ✅ Full |
| Firefox 100+ | ✅ Full |
| Safari 15+ | ✅ Full |
| Edge 100+ | ✅ Full |
| Mobile Chrome/Safari | ✅ Simplified animations |

---

## Accessibility

- Semantic HTML structure with proper heading hierarchy
- All animations respect `prefers-reduced-motion`
- WCAG AA color contrast on all text elements
- Keyboard navigable interactive elements

---

## Performance Targets

- Lighthouse Performance (Desktop): **85+**
- Largest Contentful Paint: **< 2.5s**
- Cumulative Layout Shift: **< 0.1**
- All animations GPU-composited via `transform` and `opacity` only

---

## License

Private. All rights reserved. AxeomLabs internal use only.
