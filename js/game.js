// game.js — Tower Bloxx canvas game + leaderboard

import { navigate } from './router.js'

const LEADERBOARD_KEY = 'daived-leaderboard'
const BLOCK_H         = 24
const BASE_SPEED      = 2.8
const MAX_SPEED       = 9
const PARTICLE_COUNT  = 10

let canvas, ctx
let playerName     = ''
let score          = 0
let blocks         = []   // { x, width, color }
let swinger        = null // { x, width, vx, color }
let particles      = []
let cameraY        = 0    // current smoothed camera offset (px, positive = world shifted down)
let targetCamY     = 0    // camera target
let baseline       = 0    // world-Y of tower floor (bottom block's bottom edge)
let rafId          = null
let gameState      = 'idle'  // 'idle' | 'playing' | 'over'
let isNewHighScore = false
let stars          = null
let sectionObs     = null

// ── Init ──────────────────────────────────────────────────────────────────────
export function init() {
  canvas = document.getElementById('game-canvas')
  if (!canvas) return

  ctx = canvas.getContext('2d')
  setupCanvas()
  window.addEventListener('resize', onResize)

  initTitleGlitch()
  renderLeaderboard()
  drawIdleScreen()

  setupModal()
  setupInputHandlers()
  setupVisibilityPause()
  setupSectionPause()
}

function setupCanvas() {
  canvas.width  = Math.max(280, Math.min(360, window.innerWidth - 48))
  canvas.height = Math.max(300, Math.min(480, window.innerHeight - 240))
  baseline      = canvas.height - 20
}

function onResize() {
  setupCanvas()
  stars = null
  if (gameState === 'idle') drawIdleScreen()
}

// ── Modal ─────────────────────────────────────────────────────────────────────
function setupModal() {
  const modal     = document.getElementById('game-modal')
  const nameInput = document.getElementById('player-name')
  const startBtn  = document.getElementById('start-game-btn')
  if (!modal || !startBtn || !nameInput) return

  startBtn.addEventListener('click', () => {
    const name = nameInput.value.trim()
    if (!name) { nameInput.focus(); return }
    playerName = name
    modal.hidden = true
    startGame()
  })

  nameInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') startBtn.click()
  })
}

// ── Input handlers ────────────────────────────────────────────────────────────
function setupInputHandlers() {
  canvas.addEventListener('click', onCanvasClick)
  canvas.addEventListener('touchend', e => {
    e.preventDefault()
    onCanvasClick()
  }, { passive: false })
}

function onCanvasClick() {
  if (gameState === 'idle') {
    const modal     = document.getElementById('game-modal')
    const nameInput = document.getElementById('player-name')
    if (modal) {
      modal.hidden = false
      nameInput?.focus()
    }
  } else if (gameState === 'playing') {
    dropBlock()
  }
}

// ── Visibility / section pause ────────────────────────────────────────────────
function setupVisibilityPause() {
  document.addEventListener('visibilitychange', () => {
    if (gameState !== 'playing') return
    if (document.hidden) {
      cancelAnimationFrame(rafId)
    } else {
      rafId = requestAnimationFrame(gameLoop)
    }
  })
}

function setupSectionPause() {
  const section = document.getElementById('game')
  if (!section) return

  sectionObs = new IntersectionObserver(entries => {
    if (gameState !== 'playing') return
    if (entries[0].isIntersecting) {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(gameLoop)
    } else {
      cancelAnimationFrame(rafId)
    }
  }, { threshold: 0.1 })

  sectionObs.observe(section)
}

// ── Idle screen ───────────────────────────────────────────────────────────────
function drawIdleScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#0a0a0a'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  if (!stars) generateStars()
  drawStars()

  // Demo tower (faded blocks)
  const iw = Math.round(canvas.width * 0.55)
  const ix = (canvas.width - iw) / 2
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = `rgba(240,240,240,${0.12 + i * 0.07})`
    ctx.fillRect(ix, baseline - (i + 1) * BLOCK_H, iw, BLOCK_H - 2)
  }

  ctx.textAlign = 'center'
  ctx.fillStyle = 'rgba(240,240,240,0.75)'
  ctx.font = '700 18px "JetBrains Mono", monospace'
  ctx.fillText('CLICK TO PLAY', canvas.width / 2, canvas.height / 2)

  ctx.fillStyle = 'rgba(240,240,240,0.3)'
  ctx.font = '11px "JetBrains Mono", monospace'
  ctx.fillText('Stack blocks — build the tallest tower', canvas.width / 2, canvas.height / 2 + 26)
}

// ── Start game ────────────────────────────────────────────────────────────────
function startGame() {
  score          = 0
  blocks         = []
  particles      = []
  cameraY        = 0
  targetCamY     = 0
  gameState      = 'playing'
  isNewHighScore = false
  stars          = null

  const iw = Math.round(canvas.width * 0.55)
  blocks.push({ x: (canvas.width - iw) / 2, width: iw, color: blockColor(0) })

  spawnSwinger()
  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(gameLoop)

  const overlay = document.getElementById('game-over-overlay')
  if (overlay) overlay.hidden = true
}

// ── Swinger ───────────────────────────────────────────────────────────────────
function spawnSwinger() {
  const top   = blocks[blocks.length - 1]
  const speed = Math.min(BASE_SPEED + score * 0.12, MAX_SPEED)
  swinger = {
    x:     0,
    width: top.width,
    vx:    speed,
    color: blockColor(blocks.length),
  }
}

// ── Drop block ────────────────────────────────────────────────────────────────
function dropBlock() {
  if (!swinger) return

  const prev    = blocks[blocks.length - 1]
  const oLeft   = Math.max(swinger.x, prev.x)
  const oRight  = Math.min(swinger.x + swinger.width, prev.x + prev.width)
  const overlap = oRight - oLeft

  if (overlap <= 1) { endGame(); return }

  // Particles from trimmed-off edges
  if (swinger.x < oLeft) {
    spawnParticles(swinger.x, oLeft - swinger.x, blocks.length)
  }
  if (swinger.x + swinger.width > oRight) {
    spawnParticles(oRight, swinger.x + swinger.width - oRight, blocks.length)
  }

  blocks.push({ x: oLeft, width: overlap, color: swinger.color })
  score++

  // Placement celebration particles
  spawnParticles(oLeft, overlap, blocks.length)

  // Perfect placement bonus burst
  if (Math.abs(overlap - prev.width) < 3) {
    spawnParticles(oLeft, overlap, blocks.length)
  }

  // Advance camera to keep action zone at ~45% from canvas top
  targetCamY = Math.max(0, blocks.length * BLOCK_H - canvas.height * 0.55 + 20)

  if (overlap < 6) { endGame(); return }

  spawnSwinger()
}

// ── End game ──────────────────────────────────────────────────────────────────
function endGame() {
  gameState = 'over'
  cancelAnimationFrame(rafId)

  const lb = getLeaderboard()
  isNewHighScore = score > 0 &&
    (lb.length < 10 || score > (lb[lb.length - 1]?.score ?? 0))

  saveToLeaderboard(playerName, score)
  renderLeaderboard()

  drawFrame()
  showGameOverOverlay()
}

// ── Game loop ─────────────────────────────────────────────────────────────────
function gameLoop() {
  update()
  drawFrame()
  if (gameState === 'playing') {
    rafId = requestAnimationFrame(gameLoop)
  }
}

function update() {
  // Swinger oscillation
  if (swinger) {
    swinger.x += swinger.vx
    const maxX = canvas.width - swinger.width
    if (swinger.x >= maxX) { swinger.x = maxX; swinger.vx = -Math.abs(swinger.vx) }
    if (swinger.x <= 0)    { swinger.x = 0;    swinger.vx =  Math.abs(swinger.vx) }
  }

  // Smooth camera
  cameraY += (targetCamY - cameraY) * 0.07

  // Particles
  particles = particles.filter(p => p.life > 0)
  particles.forEach(p => {
    p.x    += p.vx
    p.y    += p.vy
    p.vy   += 0.2    // gravity
    p.life -= 1
  })
}

// ── Draw ──────────────────────────────────────────────────────────────────────
function drawFrame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#0a0a0a'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  if (!stars) generateStars()
  drawStars()

  ctx.save()
  // Camera: positive cameraY shifts world DOWN (older blocks scroll off bottom,
  // newer blocks stay in the upper action zone)
  ctx.translate(0, Math.round(cameraY))

  // Placed blocks (block i: top = baseline - (i+1)*BLOCK_H)
  blocks.forEach((b, i) => {
    drawBlock(b.x, baseline - (i + 1) * BLOCK_H, b.width, BLOCK_H, b.color, false)
  })

  // Swinger (one block above top of tower)
  if (swinger) {
    const sTopY   = baseline - blocks.length * BLOCK_H - BLOCK_H
    const prevTopY = baseline - blocks.length * BLOCK_H

    // Drop-zone preview: shows predicted overlap on top of tower
    const prev  = blocks[blocks.length - 1]
    const oL    = Math.max(swinger.x, prev.x)
    const oR    = Math.min(swinger.x + swinger.width, prev.x + prev.width)
    if (oR > oL) {
      ctx.fillStyle = 'rgba(240,240,240,0.18)'
      ctx.fillRect(oL, prevTopY - 2, oR - oL, 2)
    }

    drawBlock(swinger.x, sTopY, swinger.width, BLOCK_H, swinger.color, true)
  }

  // Particles
  particles.forEach(p => {
    const a = Math.max(0, p.life / p.maxLife) * 0.8
    ctx.fillStyle = `rgba(240,240,240,${a.toFixed(2)})`
    ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size)
  })

  ctx.restore()

  // HUD (screen-space, not affected by camera)
  if (gameState === 'playing') {
    ctx.textAlign = 'center'
    ctx.fillStyle = 'rgba(240,240,240,0.9)'
    ctx.font = '700 30px "JetBrains Mono", monospace'
    ctx.fillText(score, canvas.width / 2, 46)
    ctx.fillStyle = 'rgba(240,240,240,0.3)'
    ctx.font = '10px "JetBrains Mono", monospace'
    ctx.fillText('SCORE', canvas.width / 2, 62)
  }
}

function drawBlock(x, y, w, h, color, isSwinger) {
  ctx.fillStyle = color
  ctx.fillRect(x, y, w, h - 1)

  // Top highlight
  ctx.fillStyle = 'rgba(255,255,255,0.22)'
  ctx.fillRect(x, y, w, 2)

  // Bottom shadow
  ctx.fillStyle = 'rgba(0,0,0,0.28)'
  ctx.fillRect(x, y + h - 3, w, 2)

  if (isSwinger) {
    ctx.shadowColor = 'rgba(240,240,240,0.3)'
    ctx.shadowBlur  = 10
    ctx.fillStyle   = 'rgba(255,255,255,0.04)'
    ctx.fillRect(x, y, w, h - 1)
    ctx.shadowBlur  = 0
  }
}

function generateStars() {
  stars = Array.from({ length: 30 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.0 + 0.3,
    a: Math.random() * 0.3 + 0.08,
  }))
}

function drawStars() {
  stars.forEach(s => {
    ctx.fillStyle = `rgba(240,240,240,${s.a})`
    ctx.beginPath()
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
    ctx.fill()
  })
}

// ── Game Over Overlay ─────────────────────────────────────────────────────────
function showGameOverOverlay() {
  let overlay = document.getElementById('game-over-overlay')
  if (!overlay) {
    overlay = document.createElement('div')
    overlay.id = 'game-over-overlay'
    document.body.appendChild(overlay)
  }

  // Position over the canvas (fixed, viewport-relative)
  const rect = canvas.getBoundingClientRect()
  Object.assign(overlay.style, {
    top:    rect.top  + 'px',
    left:   rect.left + 'px',
    width:  rect.width  + 'px',
    height: rect.height + 'px',
  })

  overlay.innerHTML = `
    <p class="go-title">GAME OVER</p>
    ${isNewHighScore ? '<p class="go-badge">&#10022; NEW HIGH SCORE &#10022;</p>' : ''}
    <p class="go-score">${score}</p>
    <p class="go-label">blocks stacked</p>
    <div class="go-btns">
      <button class="go-btn go-btn--primary" id="go-play-again">Play Again</button>
      <button class="go-btn" id="go-home">Back to Home</button>
    </div>
  `
  overlay.hidden = false

  document.getElementById('go-play-again').addEventListener('click', () => {
    overlay.hidden = true
    gameState = 'idle'
    stars = null
    drawIdleScreen()

    const modal     = document.getElementById('game-modal')
    const nameInput = document.getElementById('player-name')
    if (modal && nameInput) {
      nameInput.value = playerName
      modal.hidden = false
      nameInput.select()
      nameInput.focus()
    }
  })

  document.getElementById('go-home').addEventListener('click', () => {
    overlay.hidden = true
    gameState = 'idle'
    navigate('hero')
  })
}

// ── Particles ─────────────────────────────────────────────────────────────────
function spawnParticles(blockX, blockW, stackLen) {
  // stackLen = blocks.length BEFORE this block was pushed (for excess particles)
  // or blocks.length AFTER push (for placement particles)
  // We use it for the Y position in world space
  const topY = baseline - stackLen * BLOCK_H
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x:       blockX + Math.random() * blockW,
      y:       topY,
      vx:      (Math.random() - 0.5) * 3.5,
      vy:      Math.random() * -3.5 - 0.5,
      size:    Math.random() * 3 + 1,
      life:    40 + Math.random() * 20,
      maxLife: 60,
    })
  }
}

// ── Leaderboard ───────────────────────────────────────────────────────────────
function getLeaderboard() {
  try { return JSON.parse(localStorage.getItem(LEADERBOARD_KEY)) || [] } catch { return [] }
}

function saveToLeaderboard(name, sc) {
  if (!name || sc === 0) return
  const lb = getLeaderboard()
  lb.push({ name, score: sc })
  lb.sort((a, b) => b.score - a.score)
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(lb.slice(0, 10)))
}

function renderLeaderboard() {
  const el = document.getElementById('leaderboard')
  if (!el) return

  const lb = getLeaderboard()
  el.innerHTML = `
    <h3 class="lb-title">Leaderboard</h3>
    ${lb.length === 0
      ? '<p class="lb-empty">No scores yet. Be the first!</p>'
      : `<ol class="lb-list">
          ${lb.map((e, i) => `
            <li class="lb-entry${i === 0 ? ' lb-first' : ''}">
              <span class="lb-rank">${i + 1}</span>
              <span class="lb-name">${esc(e.name)}</span>
              <span class="lb-score">${e.score}</span>
            </li>
          `).join('')}
        </ol>`
    }
  `
}

// ── Title glitch ──────────────────────────────────────────────────────────────
function initTitleGlitch() {
  const title = document.querySelector('#game .section-title')
  if (!title) return

  const trigger = () => {
    title.classList.add('animate-glitch')
    setTimeout(() => title.classList.remove('animate-glitch'), 420)
    setTimeout(trigger, 8000 + Math.random() * 6000)
  }
  setTimeout(trigger, 5000)
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function blockColor(index) {
  const t = Math.min(index / 25, 1)
  const l = Math.round(48 + t * 42)  // lightness 48% → 90%
  return `hsl(0, 0%, ${l}%)`
}

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export function destroy() {
  cancelAnimationFrame(rafId)
  window.removeEventListener('resize', onResize)
  if (sectionObs) sectionObs.disconnect()
}
