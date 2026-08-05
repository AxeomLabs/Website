# AxeomLabs -- Source Code Audit (v3)

**Audit date:** 5 August 2026
**Based on:** your actual source -- `App.jsx`, `Layout.jsx`, `main.jsx`, all page components, `index.css`, `useSEO.js`, `robots.txt`, `sitemap.xml`
**Supersedes:** v2 audit. Every issue below has been re-verified against the live codebase as of today.

The short version: **the design system (typography, materials, motion craft) is genuinely strong** -- better than most sites I audit. Since v2 several good things have been added (dedicated Contact page, mobile hamburger nav, OG image for social previews, per-page SEO via `useSEO` hook on all routes). But **every one of the 12 original issues remains unfixed.** The problems are still plumbing: three compounding routing/SEO bugs telling Google to ignore your real pages, dead-end buttons, and the divisions data bug.

---

## What's been added since v2 (working correctly)

| Addition | Status |
|---|---|
| Dedicated `/contact` page with Web3Forms integration | Working |
| Mobile responsive hamburger nav (slide-in drawer) | Working |
| `useSEO` hook injected into all 8 page components | Working |
| Open Graph / Twitter Card image (`og-image.png`) | Working (once deployed) |
| Body scroll lock when mobile menu is open | Working |

---

## Priority fix list

| # | Issue | Where | Priority | Status |
|---|---|---|---|---|
| 1 | No 404 / catch-all route -- unmatched URLs render **completely blank** | `main.jsx` | P0 | NOT FIXED |
| 2 | `sitemap.xml` submits 3 URLs that don't exist; the real pages' canonical tags point to those same wrong URLs | `sitemap.xml`, `PrivacyPolicy.jsx`, `TermsOfService.jsx`, `CookiePolicy.jsx` | P0 | NOT FIXED |
| 3 | `/contact` is missing from the sitemap entirely | `sitemap.xml` | P1 | NOT FIXED |
| 4 | 6 dead-end CTAs/links across 4 pages (`href="#"` or no `onClick`) | `Founders.jsx`, `Robotics.jsx`, `Systems.jsx`, `Research.jsx` | P1 | NOT FIXED |
| 5 | Homepage claims "FIVE ACTIVE DIVISIONS" but only renders 3 | `App.jsx:248` | P1 | NOT FIXED |
| 6 | `prefers-reduced-motion` only covers CSS; every GSAP timeline and Lenis smooth-scroll ignores it | `index.css`, all page `useGSAP` blocks, `Layout.jsx` | P1 | NOT FIXED |
| 7 | Two separate, inconsistent contact-form implementations | `App.jsx` vs `Contact.jsx` | P2 | NOT FIXED |
| 8 | Google Fonts loaded via CSS `@import` -- render-blocking | `index.css:4` | P2 | NOT FIXED |
| 9 | Nav: DRONES and ROBOTICS both link to the same page | `Layout.jsx`, `Robotics.jsx` | P2 | NOT FIXED |
| 10 | Motion system is 100% duration-based GSAP eases -- zero springs anywhere | all page files | P2 | NOT FIXED |
| 11 | 13 hotlinked Unsplash images, no `loading="lazy"`, no width/height, no responsive sizing | `App.jsx`, `Research.jsx`, `Robotics.jsx` | P2 | NOT FIXED |
| 12 | Research page content (space telemetry, Mariana Trench) doesn't match your actual business | `Research.jsx` | P2 | NOT FIXED |

---

## 1. P0: Routing and SEO -- three bugs that reinforce each other

**The core problem:** your app defines real routes as `/privacy-policy`, `/terms-of-service`, `/cookie-policy` (`main.jsx:26-28`). But your SEO layer -- both the canonical tags *and* the sitemap -- reference the short forms `/privacy`, `/terms`, `/cookies`, which **do not exist as routes anywhere**.

```
CookiePolicy.jsx:32   canonical -> https://www.axeomlabs.in/cookies    (real route: /cookie-policy)
PrivacyPolicy.jsx:35  canonical -> https://www.axeomlabs.in/privacy    (real route: /privacy-policy)
TermsOfService.jsx:34 canonical -> https://www.axeomlabs.in/terms      (real route: /terms-of-service)
```

`sitemap.xml` submits the exact same wrong URLs (lines 40, 47, 54) -- so you are actively telling Google to crawl and index pages that don't exist, while the `<link rel="canonical">` tag *on the real, correct pages* tells Google "ignore this page, the real one is at a URL that doesn't exist." That combination can suppress indexing of your actual policy pages.

**And here's why it's worse than a typical 404:** `main.jsx` has no catch-all route (no `<Route path="*" ...>`). Your `Layout` is a pathless parent route -- it only renders when one of its children matches. If someone (or Googlebot) hits `/cookies`, `/privacy`, `/terms`, or literally any undefined path, **React Router renders nothing at all** -- no nav, no footer, just a blank `#0a0a0a` screen. Not even a "page not found" message.

**Fix, in order:**
1. Add a catch-all route in `main.jsx`: `<Route path="*" element={<NotFound />} />` inside the `Layout` route, with a simple 404 page that keeps the nav/footer and links back home.
2. Fix the three canonical URLs to match the real routes (`/cookie-policy`, `/privacy-policy`, `/terms-of-service`).
3. Fix the same three URLs in `sitemap.xml`.
4. Add `/contact` to `sitemap.xml` -- it's a real, working route with its own correct canonical (`Contact.jsx:37`) but it's absent from the sitemap entirely.

---

## 2. P1: Six dead-end CTAs

Found by searching for `href="#"` and buttons with no click handler:

| Element | File:Line | Behavior |
|---|---|---|
| "LinkedIn" (both founder cards) | `Founders.jsx:62`, `Founders.jsx:82` | `href="#"` -- goes nowhere |
| "VIEW SPECS" | `Robotics.jsx:93` | `href="#"` -- goes nowhere |
| "INITIATE SEQUENCE" (hero CTA) | `Robotics.jsx:59` | `<button>` with no `onClick` |
| "ACCESS KERNEL DOCS" | `Systems.jsx:117` | `<button>` with no `onClick` |
| "VIEW REPOSITORIES" | `Systems.jsx:152` | `<button>` with no `onClick` |
| "VIEW ARCHIVES" | `Research.jsx:150` | `<button>` with no `onClick` |

None of these are catastrophic on their own, but they quietly erode trust -- a visitor who clicks "INITIATE SEQUENCE" on your robotics hero and gets nothing will notice. Either wire them to real destinations (LinkedIn profiles, a docs page, a repo, an anchor to the contact section) or remove them until the destination exists -- a missing feature reads better than a broken one.

---

## 3. P1: "FIVE ACTIVE DIVISIONS" only shows three

`App.jsx` defines a `divisions` array with 5 entries: Drones, Robotics, Software, Hardware, Research (lines 43-89). The "OUR DIVISIONS" section explicitly labels itself **"FIVE ACTIVE DIVISIONS"** (`App.jsx:248`) -- but the grid underneath only ever renders `divisions[0]` (Drones), `divisions[1]` (Robotics), and `divisions[4]` (Research). `divisions[2]` (Software) and `divisions[3]` (Hardware) are fully written -- title, description, image, path -- and never rendered anywhere.

Either add the two missing cards to the grid (they're already fully authored, this is a ~10-line fix) or change the label to "THREE ACTIVE DIVISIONS." Right now the page's own copy contradicts what's on screen.

---

## 4. P1: Reduced motion -- real, but only half-wired

You *do* have a `prefers-reduced-motion` block (`index.css:1606-1614`) -- that's more than most sites bother with, genuinely good instinct. But it only affects things driven by **CSS** `transition`/`animation`. It has **zero effect** on anything driven by GSAP, because GSAP tweens set inline styles directly via `requestAnimationFrame`, bypassing CSS transitions entirely. That's:

- Every hero entrance timeline (`App.jsx`, and the near-identical pattern in `Contact.jsx`, `Founders.jsx`, `Research.jsx`, `Robotics.jsx`, `Systems.jsx`)
- The scroll-linked progress bar (`gsap.to('.indicator-bar', ...)`)
- `CursorGlow` in `Layout.jsx` -- continuously tracks the mouse via `gsap.to`
- `ScrambleLogo`'s character-scramble effect (raw `requestAnimationFrame`, not CSS)
- Lenis smooth-scroll itself (`lerp: 0.09`) -- the eased-momentum scrolling a vestibular-sensitive user would specifically want turned off

I searched the whole codebase for `matchMedia`/`reducedMotion` and found **zero references** outside CSS. A user with reduced-motion enabled at the OS level still gets the full GSAP show.

**Fix:** at the top of each `useGSAP` block (and in `Layout.jsx`'s Lenis/CursorGlow setup), check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` and either skip the tween (`gsap.set` the end state immediately instead of `gsap.from`) or construct Lenis with `lerp: 1` / skip it.

---

## 5. Your framework, checked against your actual code

### Typography -- this is done well
75 uses of `letter-spacing` across `index.css`, and the pattern is exactly right: large display text runs negative (`-0.03em` to `-0.04em` on headlines), small mono/label text runs positive (`0.1em`-`0.14em` on eyebrows, badges, nav labels). Good craft, worth leaving alone.

### Materials -- this is done well
`#global-nav` uses `backdrop-filter: blur(20px) saturate(180%)` (`index.css:174`) with the `-webkit-` prefix included. The mobile nav backdrop and footer elements also use `backdrop-filter` at smaller blur radii appropriate to their size.

### Spatial consistency -- mobile nav gets this right
The drawer enters via `translateX(100%)` -> `translateX(0)` and, because it's a single CSS `transition` toggled by a class, closing naturally reverses along the identical path -- correct per your framework.

### Behavior over animation / springs -- the one structural gap
Every `ease:` value across every `.jsx` file: `expo.out`, `power2.out`, `power3.out`, and `none` (for scroll-scrub), with zero instances of elastic, bounce, or spring-based easing anywhere. For one-shot entrance animations this mostly doesn't matter in practice. It would start to matter if you ever add anything users grab and reverse mid-motion.

### Response -- fine, with the reduced-motion caveat above
No obvious artificial delays; buttons use normal click handlers. Main latency question is Google Fonts loading (next section) delaying first paint.

---

## 6. Performance

**Google Fonts via `@import`:** `index.css:4` loads three font families through a CSS `@import`. This is render-blocking -- the browser has to download and start parsing your main stylesheet, discover the `@import`, then fetch the Google Fonts CSS, then fetch the font files, all serially. Move this to two `<link>` tags in `index.html` (`rel="preconnect"` to `fonts.googleapis.com`/`fonts.gstatic.com`, then `rel="stylesheet"`).

**13 hotlinked Unsplash images, no lazy-loading, no dimensions:** every `<img>` across `App.jsx` (5 images), `Research.jsx` (5 images), and `Robotics.jsx` (3 images) pulls directly from `images.unsplash.com` with no `loading="lazy"` attribute and no explicit `width`/`height`. Below-the-fold images should get `loading="lazy"`, and explicit dimensions prevent layout shift while they load.

**Cursor glow runs unconditionally:** `CursorGlow` (`Layout.jsx`) attaches a `mousemove` listener and animates a fixed element on every page load, on every device -- there's no `(hover: hover) and (pointer: fine)` gate anywhere (zero matches found). Impact is low but it's an unnecessary listener + paint layer on touch devices.

---

## 7. Two contact forms, two different behaviors

`App.jsx` (homepage `#cta` section) and `Contact.jsx` (`/contact` page) both post to Web3Forms with the same access key, but with different field mappings:

- **Homepage form** (`App.jsx:152`): sends `from_name: 'AxeomLabs Website'` (hardcoded). The visitor's actual name is collected but never sent as `from_name`.
- **Contact page form** (`Contact.jsx`): correctly sends `from_name: form.name` (the visitor's real name).

Practical effect: enquiries submitted from the homepage form arrive with "AxeomLabs Website" as the sender name instead of the actual visitor's name. Worth consolidating into one shared `<ContactForm>` component so this can't drift further.

---

## 8. Nav structure: DRONES and ROBOTICS go to the same place

`Layout.jsx`'s `NAV_LINKS` array has both `{ label: 'DRONES', path: '/robotics' }` and `{ label: 'ROBOTICS', path: '/robotics' }` -- two adjacent top-nav items pointing at the identical URL. The footer's "PRODUCTS" column repeats the same pattern for Software/Hardware -> `/systems`.

Two reasonable fixes: either give drones their own page/section anchor so the nav items actually differ, or merge them into a single "ROBOTICS" nav item.

---

## 9. Content credibility: Research page doesn't match its own premise

`Research.jsx`'s meta description promises "robotics, computer vision, materials science, and autonomous navigation" -- accurate to your business. But the actual page content is about deep-space telemetry for "autonomous probes," molecular synthesis, Mariana Trench acoustic mapping, and cellular adaptation under pressure. None of it connects back to drones, ground robots, or embedded systems.

Similarly, `Systems.jsx` displays very specific, hard numbers -- 99.999% uptime, <0.5ms latency, +/-0.001ms accuracy -- and `Robotics.jsx` has a "MILITARY / CLEARANCE REQUIRED" product card. If these are real, they're a strong sell. If they're placeholder/aspirational, they're worth softening before a technical buyer or investor asks "measured how, by whom, over what period."

---

## 10. What's genuinely well-built -- don't touch these

- **Typography tracking system** -- consistent, size-aware, matches the framework closely.
- **`backdrop-filter` materials** on nav/mobile drawer -- correct blur+saturate approach, cross-browser prefixed.
- **Mobile nav drawer** -- correct enter/exit path, properly interruptible via CSS transition, body scroll lock.
- **Cookie consent** -- defaults to opt-out, offers "Reject non-essential" as an equally prominent first-layer button. Solid, privacy-forward default.
- **`robots.txt` + Google Search Console verification file** already in place.
- **Alt text** is present on every image checked across `Research.jsx` and `Robotics.jsx`.
- **CSS design tokens** for spacing/duration (`--duration-fast/mid/slow`, `--unit`, `--margin`).
- **`useSEO` hook** on all 8 page routes -- dynamic title/meta/OG/Twitter cards per page, restores defaults on unmount.
- **Dedicated Contact page** (`/contact`) with proper form validation, honeypot, loading/success/error states.
- **OG image** (`public/og-image.png`) wired into `index.html` for social link previews.

---

## Quick-fix checklist

- [x] Add `<Route path="*" element={<NotFound />} />` in `main.jsx`
- [x] Fix 3 canonical URLs: `/cookies`->`/cookie-policy`, `/privacy`->`/privacy-policy`, `/terms`->`/terms-of-service`
- [x] Fix the same 3 URLs in `sitemap.xml`, and add the missing `/contact` entry
- [x] Wire or remove the 6 dead CTAs (Founders LinkedIn x2, Robotics VIEW SPECS + INITIATE SEQUENCE, Systems ACCESS KERNEL DOCS + VIEW REPOSITORIES, Research VIEW ARCHIVES)
- [x] Change "FIVE ACTIVE DIVISIONS" to "THREE ACTIVE DIVISIONS" to match what's rendered
- [x] Gate GSAP timelines and Lenis behind `window.matchMedia('(prefers-reduced-motion: reduce)')` — created `useReducedMotion` hook, applied to all 6 pages
- [ ] Consolidate the two contact forms into one component (low priority — `from_name` mapping fixed)
- [x] Fix `from_name` on the homepage version — now uses `formData.name`
- [x] Move Google Fonts from CSS `@import` to preconnect + `<link>` in `index.html`
- [x] Add `loading="lazy"` + explicit `width`/`height` to all Unsplash images
- [x] Merge DRONES with ROBOTICS in the nav (removed duplicate nav item, renumbered)
- [ ] Revisit Research page copy so it reflects actual R&D areas rather than generic science-template content
- [x] Gate `CursorGlow` behind `(hover: hover) and (pointer: fine)` media query + reduced-motion
- [x] Add 404 page CSS styling
- [x] Add CSS `prefers-reduced-motion` fallback for all CSS transitions/animations
- [x] Apply Apple design principles: `font-optical-sizing: auto`, size-specific letter-spacing
