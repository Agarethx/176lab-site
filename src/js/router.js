import { gsap, ScrollTrigger } from './animations/gsap-setup.js'
import { initHeroAnimation } from './animations/hero-animation.js'
import { initScrollTriggers } from './animations/scroll-triggers.js'

const ROUTES = {
  '/': '/pages/home.html',
  '/projects': '/pages/projects.html',
  '/about': '/pages/about.html',
  '/contact': '/pages/contact.html',
}

const PAGE_TITLES = {
  '/': '176lab — Sitios animados para marcas',
  '/projects': 'Proyectos — 176lab',
  '/about': 'Nosotros — 176lab',
  '/contact': 'Contacto — 176lab',
}

let app

async function loadPage(path) {
  const file = ROUTES[path] ?? '/pages/404.html'

  // Kill stale ScrollTrigger instances before replacing DOM
  ScrollTrigger.getAll().forEach(st => st.kill())

  // Fade out current content
  gsap.to(app, { autoAlpha: 0, duration: 0.2, ease: 'power2.in', overwrite: true })
  await new Promise(r => setTimeout(r, 250))

  // Fetch and inject page partial
  try {
    const res = await fetch(file)
    if (!res.ok) throw new Error(String(res.status))
    app.innerHTML = await res.text()
  } catch {
    try {
      app.innerHTML = await (await fetch('/pages/404.html')).text()
    } catch {
      app.innerHTML = `
        <section class="min-h-screen flex items-center justify-center bg-gray-950 pt-16">
          <p class="text-white/40 text-sm">Página no encontrada.</p>
        </section>`
    }
  }

  window.scrollTo(0, 0)
  document.title = PAGE_TITLES[path] ?? '176lab'
  updateNav(path)
  closeMobileMenu()

  // Fade in new content
  gsap.to(app, { autoAlpha: 1, duration: 0.4, ease: 'power2.out' })

  // Reinit animations on new DOM
  initHeroAnimation()
  initScrollTriggers()
  requestAnimationFrame(() => ScrollTrigger.refresh())
}

function updateNav(path) {
  document.querySelectorAll('[data-nav-link]').forEach(link => {
    const href = link.getAttribute('href')
    const isActive = href === '/' ? path === '/' : path.startsWith(href)
    link.setAttribute('aria-current', isActive ? 'page' : 'false')
    link.style.color = isActive ? 'white' : ''
    link.style.opacity = isActive ? '1' : ''
  })
}

function closeMobileMenu() {
  const menu = document.getElementById('nav-menu')
  if (menu) menu.classList.remove('active')
}

function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn')
  const menu = document.getElementById('nav-menu')
  if (!btn || !menu) return

  btn.addEventListener('click', () => menu.classList.toggle('active'))
}

function navigate(path) {
  if (path === window.location.pathname) return
  history.pushState(null, '', path)
  loadPage(path)
}

export function initRouter() {
  app = document.getElementById('app')

  initMobileMenu()

  // Header scroll effect
  const header = document.getElementById('site-header')
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 100)
    }, { passive: true })
  }

  // Intercept all internal link clicks globally
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]')
    if (!a) return

    const href = a.getAttribute('href')
    if (!href || !href.startsWith('/') || href.startsWith('//')) return

    e.preventDefault()
    navigate(href)
  })

  // Browser back / forward
  window.addEventListener('popstate', () => {
    loadPage(window.location.pathname)
  })

  // Load current path on boot
  loadPage(window.location.pathname)
}
