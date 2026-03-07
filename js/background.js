const SYMBOLS = ['0', '1', '{', '}', '<', '>', '/', ';', '#', '(', ')']
const COUNT = 90
const CONNECT_DIST = 110
const REPEL_DIST = 130
const REPEL_STRENGTH = 2.5

let canvas = null
let ctx = null
let particles = []
let mouse = { x: -9999, y: -9999 }
let rafId = null
let w = 0, h = 0

class Particle {
  constructor(randomY = false) {
    this.init(randomY)
  }

  init(randomY = false) {
    this.x  = Math.random() * w
    this.y  = randomY ? Math.random() * h : h + 20
    this.vx = (Math.random() - 0.5) * 0.12
    this.vy = -(0.18 + Math.random() * 0.35)   // upward drift
    this.symbol  = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
    this.opacity = 0.07 + Math.random() * 0.16
    this.size    = 11 + Math.random() * 6
  }

  update() {
    // Mouse repulsion
    const dx = this.x - mouse.x
    const dy = this.y - mouse.y
    const dist2 = dx * dx + dy * dy
    if (dist2 < REPEL_DIST * REPEL_DIST && dist2 > 0) {
      const dist = Math.sqrt(dist2)
      const force = (REPEL_DIST - dist) / REPEL_DIST
      this.x += (dx / dist) * force * REPEL_STRENGTH
      this.y += (dy / dist) * force * REPEL_STRENGTH
    }

    this.x += this.vx
    this.y += this.vy

    // Wrap
    if (this.y < -24)      this.init(false)
    if (this.x < -24)      this.x = w + 20
    if (this.x > w + 24)   this.x = -20
  }

  draw() {
    ctx.globalAlpha = this.opacity
    ctx.font = `${this.size}px JetBrains Mono, monospace`
    ctx.fillStyle = '#f0f0f0'
    ctx.fillText(this.symbol, this.x, this.y)
  }
}

function drawConnections() {
  ctx.strokeStyle = '#f0f0f0'
  ctx.lineWidth = 0.5
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const dist2 = dx * dx + dy * dy
      if (dist2 < CONNECT_DIST * CONNECT_DIST) {
        const alpha = (1 - Math.sqrt(dist2) / CONNECT_DIST) * 0.055
        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.stroke()
      }
    }
  }
}

function resize() {
  w = canvas.width  = window.innerWidth
  h = canvas.height = window.innerHeight
}

function loop() {
  ctx.clearRect(0, 0, w, h)
  drawConnections()
  for (const p of particles) {
    p.update()
    p.draw()
  }
  ctx.globalAlpha = 1
  rafId = requestAnimationFrame(loop)
}

export function init() {
  canvas = document.getElementById('bg-canvas')
  if (!canvas) return
  ctx = canvas.getContext('2d')

  resize()
  window.addEventListener('resize', resize, { passive: true })
  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  }, { passive: true })

  // Spawn particles spread across the canvas
  particles = Array.from({ length: COUNT }, () => new Particle(true))

  // Pause when tab is hidden (save CPU)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId)
      rafId = null
    } else if (!rafId) {
      rafId = requestAnimationFrame(loop)
    }
  })

  rafId = requestAnimationFrame(loop)
}

export function destroy() {
  if (rafId) cancelAnimationFrame(rafId)
  window.removeEventListener('resize', resize)
}
