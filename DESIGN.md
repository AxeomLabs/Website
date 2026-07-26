---
name: Axeom Protocol
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#444748'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2e2e2'
  on-secondary-container: '#646464'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a1c1c'
  on-tertiary-container: '#838484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c6'
  on-secondary-fixed: '#1b1b1b'
  on-secondary-fixed-variant: '#474747'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-xl:
    fontFamily: Space Grotesk
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  data-mono:
    fontFamily: IBM Plex Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin: 64px
  container-max: 1440px
---

## Brand & Style

The visual identity is rooted in the concept of "The Digital Laboratory"—a space where raw engineering meets refined research. This design system moves away from the typical "dark mode" tech aesthetic in favor of a high-exposure, "Cleanroom" environment. It evokes feelings of precision, transparency, and intellectual rigor.

The style is **Technical Minimalism**. It utilizes heavy white space to allow complex ideas room to breathe, punctuated by sharp, high-contrast structural elements. By blending the geometric utilitarianism of modernist architecture with the systematic clarity of scientific journals, the interface feels both advanced and authoritative. Visual interest is generated through structural "blueprints"—visible grid lines, hairline borders, and monospaced data callouts—rather than decorative flourishes.

## Colors

The palette is strictly monochromatic to emphasize form and content over decorative color. The "Primary" is a deep onyx (#1A1A1A) used for core text and structural foundations, providing a softer, more premium contrast than pure black. Pure black (#000000) is reserved for high-impact accents, heavy strokes, and active states.

The background uses a tiered white system: pure #FFFFFF for the base "paper," with #F4F4F4 utilized for subtle container differentiation and "lab-bench" surfaces. This high-key approach ensures the UI feels clinical and spacious.

## Typography

Typography functions as the primary visual engine of this design system. We use a three-tier font hierarchy:

1.  **Space Grotesk (Headlines):** Its geometric DNA and quirky technical apertures provide the "high-tech" character. It should be typeset with tight tracking for a modern, engineered look.
2.  **Inter (Body):** Selected for its exceptional legibility and neutral, systematic tone. It provides the "accessible" balance to the more aggressive headlines.
3.  **IBM Plex Mono (Technical/Labels):** Used for metadata, small captions, and data-viz elements. It reinforces the "scientific research" aesthetic, making every piece of information feel like a calculated data point.

## Layout & Spacing

The layout follows a **Fixed 12-Column Grid** system that is explicitly referenced in the UI. We use hairline grid lines (0.5px) to define sections, mimicking technical drafting paper.

Spacing is governed by a strict 8px linear scale. We prioritize "Ample White Space," meaning vertical sections are often separated by 128px or 160px gaps to signify a transition in research focus. Elements should feel "anchored" to the grid—text blocks should align perfectly with the vertical lines of the column system, creating a sense of mathematical order.

## Elevation & Depth

This design system rejects traditional shadows in favor of **Tonal Layers and Low-Contrast Outlines**.

Hierarchy is established through stacking order rather than light source simulation. Surfaces are defined by 1px solid borders in #E5E5E5 (light gray). When an element needs to be "elevated" (such as a modal or a floating menu), we use a sharp 1px black border with a subtle, non-blurred offset stroke (2px x 2px) to create a "technical paper" stack effect. This maintains the flat, "engineered" look while providing clear functional affordances.

## Shapes

The shape language is primarily **Rectilinear**. 

While the "Soft" (4px) setting is used for interactive components to ensure the system remains "accessible" and touch-friendly, large containers and layout sections should maintain sharp (0px) corners. This contrast between the sharp structural grid and slightly softened interactive elements helps the user immediately distinguish between "content" and "action."

## Components

### Buttons
Primary buttons are solid #1A1A1A with #FFFFFF text, using the `label-caps` typography. They should have a 1px solid black border. Secondary buttons are transparent with a 1px border and an arrow icon (→) to signify momentum.

### Input Fields
Inputs should feel like data entry fields in a lab report. They use a bottom-border-only style or a very light gray (#F4F4F4) fill with no side borders. Labels must always use the `label-caps` style in IBM Plex Mono.

### Cards & Containers
Cards should not use shadows. They are defined by 1px borders (#E5E5E5). For "Engineering Highlights," cards may feature a watermark-style grid pattern in the background to emphasize the technical theme.

### Data Visualization
Charts should be strictly monochromatic. Use different stroke weights and patterns (dashed, dotted) instead of colors to differentiate data sets. 

### Status Indicators
Use small, square "LED" indicators. Instead of traditional green/red, use high-contrast black for "Active" and light gray for "Inactive," or use semantic monospaced text labels like `[ STATUS: STABLE ]`.