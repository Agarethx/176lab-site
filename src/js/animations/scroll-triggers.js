import { gsap, ScrollTrigger } from './gsap-setup.js'

export function initScrollTriggers() {
  // ── data-animate: fade + slide up on enter ──────────────────────
  const animatables = document.querySelectorAll('[data-animate]')
  animatables.forEach((el) => {
    const delay = parseFloat(el.dataset.animateDelay) || 0

    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 50 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    )
  })

  // ── data-parallax: subtle vertical parallax ─────────────────────
  const parallaxEls = document.querySelectorAll('[data-parallax]')
  parallaxEls.forEach((el) => {
    const speed = parseFloat(el.dataset.parallax) || 0.15

    gsap.to(el, {
      yPercent: speed * -100,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  })

  // ── data-hover: magnetic-style hover on cards/buttons ───────────
  const hoverEls = document.querySelectorAll('[data-hover]')
  hoverEls.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      gsap.to(el, { scale: 1.04, duration: 0.3, ease: 'power2.out' })
    })
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { scale: 1, duration: 0.35, ease: 'power2.inOut' })
    })
  })
}
