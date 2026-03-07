// router.js — section transitions with teleport/dissolve effect

const TRANSITION_MS = 450   // half of the 0.9s total (out + in)

let currentSection = 'hero'
let transitioning  = false

export function init() {
  // Resolve initial section from URL hash
  const hash = location.hash.slice(1)
  if (hash && document.getElementById(hash)) currentSection = hash

  // Intercept all hash-anchor clicks
  document.addEventListener('click', onLinkClick, true) // capture phase → fires first
}

function onLinkClick(e) {
  const anchor = e.target.closest('a[href^="#"]')
  if (!anchor) return

  const targetId = anchor.getAttribute('href').slice(1)
  const targetEl = document.getElementById(targetId)
  if (!targetEl) return               // not a section link — let it through

  e.preventDefault()
  e.stopPropagation()

  if (targetId === currentSection || transitioning) return

  navigate(targetId)
}

async function navigate(targetId) {
  transitioning = true

  const fromEl = document.getElementById(currentSection)
  const toEl   = document.getElementById(targetId)

  // ── 1. Teleport-out the current section's inner content ──
  const fromInner = fromEl?.querySelector('.section-inner, .hero-content')
  if (fromInner) {
    fromInner.style.animation = `teleportOut ${TRANSITION_MS}ms ease forwards`
    await delay(TRANSITION_MS)
    fromInner.style.animation = ''
  }

  // ── 2. Jump to the target section (instant, no scroll jank) ──
  toEl.scrollIntoView({ behavior: 'instant' })
  history.replaceState(null, '', `#${targetId}`)
  currentSection = targetId

  // ── 3. Teleport-in the new section's inner content ──
  const toInner = toEl?.querySelector('.section-inner, .hero-content')
  if (toInner) {
    toInner.style.animation = `teleportIn ${TRANSITION_MS}ms ease both`
    await delay(TRANSITION_MS)
    toInner.style.animation = ''
  }

  transitioning = false
}

// Also expose navigate() so other modules can trigger transitions
export { navigate }

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
