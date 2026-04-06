# 176lab Animated — Project Context

## Stack

| Tool | Version | Role |
|------|---------|------|
| Vite | ^8 | Dev server & bundler (root: `src/`) |
| GSAP | ^3.14 | Animations & ScrollTrigger |
| Three.js | ^0.183 | WebGL / 3D scenes |
| Lenis (`@studio-freight/lenis`) | ^1.0 | Smooth scroll synced with GSAP |
| Tailwind CSS v4 | ^4.2 | Utility-first styles via Vite plugin |

No framework (React/Vue/etc.) — vanilla JS with ES modules.

## Project structure

```
src/
  index.html              # Shell: persistent header + <main id="app"> + footer
  main.js                 # DOMContentLoaded: initSmoothScroll + initRouter
  css/
    global.css            # Tailwind v4 imports + base styles
  js/
    router.js             # SPA router — fetch pages, GSAP fade transitions, nav state
    animations/
      gsap-setup.js       # Registers ScrollTrigger, re-exports gsap + ScrollTrigger
      hero-animation.js   # GSAP timeline for hero (data-hero-label/title/subtitle/cta)
      scroll-triggers.js  # ScrollTrigger rules for data-animate, data-parallax, data-hover
    utils/
      animations.js       # Reusable helpers: fadeInUp, staggerFadeIn, scaleIn
      smooth-scroll.js    # Lenis init + RAF loop synced to ScrollTrigger
    three/
      scene-setup.js      # Three.js Scene class (opt-in: needs [data-three-canvas])
public/
  pages/
    home.html             # / — Hero, services, projects preview, CTA
    projects.html         # /projects — full project grid
    about.html            # /about — bio, skills, process
    contact.html          # /contact — form + contact info
    404.html              # fallback 404
  favicon.svg
dist/                     # Build output
```

## HTML data-attribute API

| Attribute | Effect |
|-----------|--------|
| `data-hero-label` | GSAP hero timeline — first step, fade+slide from y:16 |
| `data-hero-title` | GSAP hero timeline — fade+slide from y:60 |
| `data-hero-subtitle` | GSAP hero timeline — fade+slide from y:40, overlap |
| `data-hero-cta` | GSAP hero timeline — fade+slide from y:20, overlap |
| `data-animate` | Fade+slide up on scroll enter (ScrollTrigger, start: "top 88%") |
| `data-animate-delay="0.15"` | Optional delay (seconds) on data-animate |
| `data-parallax="0.08"` | Vertical parallax (scrub, speed multiplier) |
| `data-hover` | Magnetic-style scale on mouseenter/leave |
| `data-nav-link` | Persistent nav links — router updates `aria-current` + active color |
| `data-three-canvas` | Mounts Three.js Scene (uncomment in router.js after loadPage) |

## Routing

SPA router in `src/js/router.js`. Route map: `'/' → /pages/home.html`, etc.

- Page partials live in `public/pages/` (served and copied to `dist/` automatically by Vite)
- Partials are HTML fragments — **no `<html>/<head>/<body>` tags**
- After each navigation: kills all ScrollTriggers, fades `#app`, injects HTML, reinits GSAP
- `document.title` updates per route
- Browser back/forward (`popstate`) supported

Elements controlled by GSAP must start with `class="invisible"` so they're hidden before JS runs.

## Key conventions

- **Import GSAP from the setup file**, never directly from the package:
  ```js
  import { gsap, ScrollTrigger } from '../animations/gsap-setup.js'
  ```
- **Three.js Scene is opt-in**: uncomment `import { Scene }` and `new Scene()` in `main.js`, then add `<canvas data-three-canvas>` in HTML.
- **Smooth scroll**: Lenis RAF loop runs independently; ScrollTrigger.update is called on every Lenis scroll event.
- **Tailwind v4**: No `tailwind.config.js` — configured via CSS `@theme` and the Vite plugin.
- **Build**: `npm run build` outputs to `dist/` (Vite `outDir: '../dist'`).

## Dev commands

```bash
npm run dev      # Vite dev server (auto-opens browser)
npm run build    # Production build → dist/
npm run preview  # Preview production build
```

## Extending the project

- **New scroll animation**: add your element with `data-animate` (or `data-animate-delay`) and it will animate automatically via `scroll-triggers.js`.
- **New GSAP animation util**: add to `src/js/utils/animations.js` and import where needed.
- **New Three.js scene or object**: extend `Scene` in `scene-setup.js` or create a sibling file in `src/js/three/`.
- **New section**: follow the existing HTML pattern — Tailwind classes for layout, data-attributes for animation hooks.
