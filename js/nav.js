// nav.js — navbar scroll effect, active-link tracking, hamburger, scroll arrow

let sectionObserver = null

export function init() {
  initScrollEffect()
  initActiveLinks()
  initHamburger()
  initScrollArrow()
}

// ── Frosted-glass effect on scroll ──────────────────────────────────────────
function initScrollEffect() {
  const navbar = document.getElementById('navbar')
  if (!navbar) return

  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 20)
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
}

// ── Active nav link via IntersectionObserver ─────────────────────────────────
function initActiveLinks() {
  const sections = document.querySelectorAll('.section')
  const navLinks = document.querySelectorAll('.nav-links a[data-section]')
  if (!sections.length || !navLinks.length) return

  sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link =>
            link.classList.toggle('active', link.dataset.section === entry.target.id)
          )
        }
      })
    },
    { threshold: 0.45 }
  )

  sections.forEach(s => sectionObserver.observe(s))
}

// ── Hamburger (mobile menu) ──────────────────────────────────────────────────
function initHamburger() {
  const hamburger = document.querySelector('.nav-hamburger')
  const navLinks  = document.querySelector('.nav-links')
  if (!hamburger || !navLinks) return

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open')
    hamburger.setAttribute('aria-expanded', String(isOpen))
    // Animate the three bars into an X
    hamburger.classList.toggle('open', isOpen)
  })

  // Close when a nav link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open')
      hamburger.classList.remove('open')
      hamburger.setAttribute('aria-expanded', 'false')
    })
  })
}

// ── Bounce arrow — show only while hero is visible ───────────────────────────
function initScrollArrow() {
  const arrow = document.getElementById('scroll-arrow')
  const hero  = document.getElementById('hero')
  if (!arrow || !hero) return

  const obs = new IntersectionObserver(
    ([entry]) => arrow.classList.toggle('hidden', !entry.isIntersecting),
    { threshold: 0.1 }
  )
  obs.observe(hero)

  arrow.addEventListener('click', () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  })
}

export function destroy() {
  if (sectionObserver) sectionObserver.disconnect()
}
