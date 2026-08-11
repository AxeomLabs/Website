# Dark Premium Website Template

A high-end, dark-themed React website template with GSAP animations, smooth scrolling, and a premium design system.

## Features

- **Dark mode design system** with CSS custom properties
- **GSAP + ScrollTrigger** scroll-driven animations
- **Lenis** smooth scrolling (respects `prefers-reduced-motion`)
- **Film grain overlay** + cursor glow (GPU-composited)
- **Scramble logo** on hover
- **Telemetry ticker** in the navbar
- **Terminal-style contact form** (Web3Forms)
- **Animated counters** in the hero HUD
- **Scroll reveal** via IntersectionObserver
- **Responsive** mobile nav with drawer
- **SEO hook** for per-page meta tags

## Getting Started

```bash
npm install
npm run dev
```

## Customisation

### 1. Replace "Acme Labs" branding
Search for `Acme Labs`, `ACME LABS`, and `acme` across these files:
- `index.html` — page title, OG tags
- `src/Layout.jsx` — nav logo, footer, ticker
- `src/App.jsx` — hero eyebrow, terminal prompt
- `src/hooks/useSEO.js` — default title/description

### 2. Set up the contact form
Replace `YOUR_WEB3FORMS_KEY` with your [Web3Forms](https://web3forms.com) access key in:
- `src/App.jsx`
- `src/pages/Contact.jsx`

### 3. Replace placeholder content
- Update division pages in `src/pages/Division1.jsx`, `Division2.jsx`, `Division3.jsx`
- Update team members in `src/pages/Team.jsx`
- Update legal pages in `src/pages/PrivacyPolicy.jsx`, `TermsOfService.jsx`
- Replace placeholder images with your own

### 4. Update colors
Edit CSS custom properties in `src/index.css`:
```css
:root {
  --accent: #7d9db5;        /* your brand color */
  --accent-dim: rgba(125, 157, 181, 0.11);
  --accent-glow: rgba(125, 157, 181, 0.20);
}
```

## Tech Stack

- [React](https://react.dev) + [React Router](https://reactrouter.com)
- [Vite](https://vite.dev)
- [GSAP](https://gsap.com) + ScrollTrigger
- [Lenis](https://lenis.darkroom.engineering) smooth scroll
- Vanilla CSS (no framework)

## Structure

```
src/
├── App.jsx              # Homepage
├── Layout.jsx           # Nav, footer, grain, cursor glow
├── main.jsx             # Router setup
├── index.css            # Full design system
├── hooks/
│   ├── useReducedMotion.js
│   └── useSEO.js
└── pages/
    ├── Division1.jsx    # Template division page
    ├── Division2.jsx
    ├── Division3.jsx
    ├── Team.jsx         # Team/founders page
    ├── Contact.jsx      # Standalone contact page
    ├── PrivacyPolicy.jsx
    ├── TermsOfService.jsx
    └── NotFound.jsx     # 404 page
```

## License

MIT — use it however you want.
