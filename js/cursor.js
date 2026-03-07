const SYMBOLS = ['{', '}', '<', '>', '/', ';', '=>', '()', '[]', '::', '#', '&&', '||']
const CYCLE_MS = 200
const LERP = 0.12
const SIZE = 38
const HALF = SIZE / 2

let el = null
let symbolEl = null
let targetX = 0, targetY = 0
let curX = 0, curY = 0
let rafId = null
let intervalId = null

export function init() {
  // Disable on touch-primary devices
  if (window.matchMedia('(hover: none)').matches) return

  el = document.getElementById('cursor')
  if (!el) return

  // Build inner element
  symbolEl = document.createElement('span')
  symbolEl.className = 'cursor-symbol'
  symbolEl.textContent = '{'
  el.appendChild(symbolEl)
  el.style.display = 'block'

  // Hide system cursor
  document.documentElement.classList.add('custom-cursor')

  // Cycle symbols
  let idx = 0
  intervalId = setInterval(() => {
    idx = (idx + 1) % SYMBOLS.length
    symbolEl.textContent = SYMBOLS[idx]
  }, CYCLE_MS)

  // Track mouse — offset so symbol is centred on pointer
  window.addEventListener('mousemove', onMouseMove)

  // Click feedback
  window.addEventListener('mousedown', onMouseDown)
  window.addEventListener('mouseup', onMouseUp)

  // Hover state on interactive elements
  document.addEventListener('mouseover', onMouseOver)

  // Hide when pointer leaves the window
  document.addEventListener('mouseleave', () => { el.style.opacity = '0' })
  document.addEventListener('mouseenter', () => { el.style.opacity = '1' })

  // Start lerp loop
  rafId = requestAnimationFrame(loop)
}

function onMouseMove(e) {
  targetX = e.clientX - HALF
  targetY = e.clientY - HALF
}

function onMouseDown() {
  el.classList.add('cursor-click')
  el.classList.remove('cursor-hover')
}

function onMouseUp() {
  el.classList.remove('cursor-click')
}

function onMouseOver(e) {
  if (el.classList.contains('cursor-click')) return
  const interactive = e.target.closest('a, button, input, textarea, select, [role="button"], [tabindex]')
  el.classList.toggle('cursor-hover', !!interactive)
}

function loop() {
  // Smooth lerp towards target
  curX += (targetX - curX) * LERP
  curY += (targetY - curY) * LERP
  el.style.transform = `translate(${curX}px, ${curY}px)`
  rafId = requestAnimationFrame(loop)
}

export function destroy() {
  if (rafId) cancelAnimationFrame(rafId)
  if (intervalId) clearInterval(intervalId)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mousedown', onMouseDown)
  window.removeEventListener('mouseup', onMouseUp)
  document.removeEventListener('mouseover', onMouseOver)
  document.documentElement.classList.remove('custom-cursor')
}
