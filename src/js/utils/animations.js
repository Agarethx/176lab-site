import { gsap } from 'gsap'

/**
 * Fade + slide up a single element
 */
export function fadeInUp(el, delay = 0, duration = 0.8) {
  return gsap.fromTo(
    el,
    { autoAlpha: 0, y: 40 },
    { autoAlpha: 1, y: 0, duration, delay, ease: 'power3.out' }
  )
}

/**
 * Stagger fade-in for a list of elements
 */
export function staggerFadeIn(els, stagger = 0.12, delay = 0) {
  return gsap.fromTo(
    els,
    { autoAlpha: 0, y: 30 },
    { autoAlpha: 1, y: 0, duration: 0.7, stagger, delay, ease: 'power3.out' }
  )
}

/**
 * Scale + fade in (for cards, images)
 */
export function scaleIn(el, delay = 0) {
  return gsap.fromTo(
    el,
    { autoAlpha: 0, scale: 0.92 },
    { autoAlpha: 1, scale: 1, duration: 0.7, delay, ease: 'power2.out' }
  )
}
