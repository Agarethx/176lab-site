import { gsap } from './gsap-setup.js'

export function initHeroAnimation() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  const heroLabel    = document.querySelector('[data-hero-label]')
  const heroTitle    = document.querySelector('[data-hero-title]')
  const heroSubtitle = document.querySelector('[data-hero-subtitle]')
  const heroCta      = document.querySelector('[data-hero-cta]')
  const scrollHint   = document.querySelector('.scroll-indicator')

  if (heroLabel) {
    tl.fromTo(heroLabel,
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: 0.6 }
    )
  }

  if (heroTitle) {
    tl.fromTo(heroTitle,
      { autoAlpha: 0, y: 60 },
      { autoAlpha: 1, y: 0, duration: 1 },
      heroLabel ? '-=0.3' : 0
    )
  }
  if (heroSubtitle) {
    tl.fromTo(heroSubtitle,
      { autoAlpha: 0, y: 40 },
      { autoAlpha: 1, y: 0, duration: 0.9 },
      '-=0.5'
    )
  }
  if (heroCta) {
    tl.fromTo(heroCta,
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.7 },
      '-=0.4'
    )
  }

  // Scroll indicator disappears after 120px
  if (scrollHint) {
    window.addEventListener('scroll', () => {
      scrollHint.classList.toggle('hidden', window.scrollY > 120)
    }, { passive: true })
  }
}
