// support.js — Support / Donate section
import { t } from './i18n.js'

const WALLET = 'TFgGqieX6gn28GUy273p4AgdZ7Qh3X8Zhk'
const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(WALLET)}`

// ── Character SVG (person on sofa holding coffee) ─────────────────────────
const CHARACTER_SVG = `
<svg class="character-svg" viewBox="0 0 200 230" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <!-- ═══ Sofa ═══ -->
  <!-- Back cushion -->
  <rect x="18" y="140" width="164" height="72" rx="14" fill="#0f0f0f" stroke="var(--color-text)" stroke-width="1.8"/>
  <!-- Seat cushion left -->
  <rect x="26" y="182" width="68" height="26" rx="8" fill="#161616" stroke="var(--color-border)" stroke-width="1.2"/>
  <!-- Seat cushion right -->
  <rect x="102" y="182" width="68" height="26" rx="8" fill="#161616" stroke="var(--color-border)" stroke-width="1.2"/>
  <!-- Left arm rest -->
  <rect x="14" y="162" width="22" height="42" rx="9" fill="#0f0f0f" stroke="var(--color-text)" stroke-width="1.8"/>
  <!-- Right arm rest -->
  <rect x="164" y="162" width="22" height="42" rx="9" fill="#0f0f0f" stroke="var(--color-text)" stroke-width="1.8"/>
  <!-- Sofa legs -->
  <line x1="36"  y1="212" x2="34"  y2="226" stroke="var(--color-border)" stroke-width="2" stroke-linecap="round"/>
  <line x1="164" y1="212" x2="166" y2="226" stroke="var(--color-border)" stroke-width="2" stroke-linecap="round"/>
  <!-- Cushion seam -->
  <line x1="100" y1="182" x2="100" y2="207" stroke="var(--color-border)" stroke-width="1" opacity="0.6"/>

  <!-- ═══ Shy symbols (hidden, shown on .character-shy) ═══ -->
  <g class="char-shy-symbols">
    <text x="52"  y="36" font-size="14" fill="var(--color-text)" text-anchor="middle" font-family="serif">✦</text>
    <text x="100" y="22" font-size="11" fill="var(--color-text)" text-anchor="middle" font-family="serif">♥</text>
    <text x="148" y="36" font-size="14" fill="var(--color-text)" text-anchor="middle" font-family="serif">✦</text>
  </g>

  <!-- ═══ Head group (rotates on .character-shy) ═══ -->
  <g class="char-head-group">
    <!-- Head -->
    <circle cx="100" cy="70" r="30" fill="#0a0a0a" stroke="var(--color-text)" stroke-width="2"/>
    <!-- Hair — simple arcs on top -->
    <path d="M 74 62 Q 78 48 100 44 Q 122 48 126 62" fill="#1a1a1a" stroke="var(--color-text)" stroke-width="1.5"/>
    <!-- Eyes -->
    <circle class="char-eye char-eye-l" cx="88"  cy="68" r="3.8" fill="var(--color-text)"/>
    <circle class="char-eye char-eye-r" cx="112" cy="68" r="3.8" fill="var(--color-text)"/>
    <!-- Mouth (relaxed smile) -->
    <path d="M 91 82 Q 100 89 109 82" fill="none" stroke="var(--color-text)" stroke-width="1.6" stroke-linecap="round"/>
    <!-- Blush (shown on .character-shy) -->
    <ellipse class="char-blush" cx="80"  cy="77" rx="9" ry="5" fill="rgba(220,160,140,0.45)" opacity="0"/>
    <ellipse class="char-blush" cx="120" cy="77" rx="9" ry="5" fill="rgba(220,160,140,0.45)" opacity="0"/>
  </g>

  <!-- ═══ Body ═══ -->
  <rect x="76" y="102" width="48" height="80" rx="8" fill="#0a0a0a" stroke="var(--color-text)" stroke-width="2"/>
  <!-- Shirt collar hint -->
  <path d="M 92 102 L 100 112 L 108 102" fill="none" stroke="var(--color-border)" stroke-width="1.2"/>

  <!-- ═══ Left arm (resting on left sofa arm) ═══ -->
  <path d="M 78 120 Q 52 138 34 168" stroke="var(--color-text)" stroke-width="2" stroke-linecap="round" fill="none"/>

  <!-- ═══ Right arm + coffee cup (animates up occasionally) ═══ -->
  <g class="char-cup-arm">
    <!-- Upper arm -->
    <path d="M 122 120 Q 152 140 158 164" stroke="var(--color-text)" stroke-width="2" stroke-linecap="round" fill="none"/>
    <!-- Cup body -->
    <rect x="150" y="157" width="20" height="17" rx="4" fill="#111" stroke="var(--color-text)" stroke-width="1.6"/>
    <!-- Cup handle -->
    <path d="M 170 161 Q 178 161 178 166 Q 178 172 170 172" fill="none" stroke="var(--color-text)" stroke-width="1.6"/>
    <!-- Liquid surface line -->
    <line x1="152" y1="162" x2="168" y2="162" stroke="var(--color-text)" stroke-width="1" opacity="0.4"/>
    <!-- Steam wisps -->
    <path class="char-steam"   d="M 155 157 Q 157 150 155 143" fill="none" stroke="rgba(240,240,240,0.55)" stroke-width="1.5" stroke-linecap="round"/>
    <path class="char-steam char-steam-2" d="M 162 157 Q 164 149 162 142" fill="none" stroke="rgba(240,240,240,0.55)" stroke-width="1.5" stroke-linecap="round"/>
  </g>

  <!-- ═══ Legs (bent, feet forward over sofa edge) ═══ -->
  <path d="M 88  182 Q 82  200 72  215" stroke="var(--color-text)" stroke-width="2" stroke-linecap="round" fill="none"/>
  <path d="M 112 182 Q 118 200 128 215" stroke="var(--color-text)" stroke-width="2" stroke-linecap="round" fill="none"/>
  <!-- Shoes -->
  <path d="M 72  215 Q 63 219 57 216" stroke="var(--color-text)" stroke-width="1.8" stroke-linecap="round" fill="none"/>
  <path d="M 128 215 Q 137 219 143 216" stroke="var(--color-text)" stroke-width="1.8" stroke-linecap="round" fill="none"/>
</svg>`

// ── Digital scene (code-stream + geometric shapes) ────────────────────────
const CODE_LINES = [
  '0x4A3F', 'push rbp', 'const x', '0xDEAD',
  'jmp 0x80', 'import *', 'MOV AX', 'return;',
  '0xFF00', 'sub esp', 'fn() {}', 'let y=0',
]

function buildDigitalScene() {
  const doubled = [...CODE_LINES, ...CODE_LINES]
  return `
    <div class="digital-scene" aria-hidden="true">
      <div class="digital-geo">
        <svg viewBox="0 0 80 200" width="80" height="200" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="30"  r="22" fill="none" stroke="var(--color-border)" stroke-width="1"/>
          <circle cx="40" cy="30"  r="12" fill="none" stroke="var(--color-border)" stroke-width="0.6" stroke-dasharray="3 4"/>
          <rect   x="18" y="80"  width="44" height="44" rx="4" fill="none" stroke="var(--color-border)" stroke-width="1" transform="rotate(15 40 102)"/>
          <line   x1="40" y1="60"  x2="40"  y2="78"   stroke="var(--color-border)" stroke-width="0.8"/>
          <circle cx="40" cy="165" r="16" fill="none" stroke="var(--color-border)" stroke-width="1"/>
          <line   x1="24" y1="165" x2="56" y2="165"   stroke="var(--color-border)" stroke-width="0.6" opacity="0.5"/>
          <line   x1="40" y1="149" x2="40" y2="181"   stroke="var(--color-border)" stroke-width="0.6" opacity="0.5"/>
        </svg>
      </div>
      <div class="code-stream-wrap">
        <div class="code-stream">
          ${doubled.map(l => `<span class="code-stream-line">${l}</span>`).join('')}
        </div>
      </div>
    </div>
  `
}

// ── Render ─────────────────────────────────────────────────────────────────
export function init() {
  renderSupport()
  initTitleGlitch()
}

function renderSupport() {
  const container = document.querySelector('.support-container')
  if (!container) return

  container.innerHTML = `
    <div class="support-left">
      <div class="support-character" aria-hidden="true">
        ${CHARACTER_SVG}
      </div>
      ${buildDigitalScene()}
    </div>

    <div class="support-content">
      <p class="support-message" data-i18n="support.message">${t('support.message')}</p>

      <button class="support-btn" id="support-btn" aria-label="${t('support.button')}">
        <span data-i18n="support.button">${t('support.button')}</span> ☕
      </button>

      <div class="wallet-panel" id="wallet-panel">
        <div class="wallet-info">
          <p class="wallet-label" data-i18n="support.wallet_label">${t('support.wallet_label')}</p>
          <p class="wallet-network" data-i18n="support.network">${t('support.network')}</p>
        </div>
        <div class="qr-wrapper">
          <img
            src="${QR_URL}"
            class="qr-img"
            alt="USDT wallet QR code"
            width="160"
            height="160"
            loading="lazy"
          />
        </div>
        <div class="wallet-address-row">
          <code class="wallet-address" id="wallet-address">${WALLET}</code>
          <button class="copy-btn" id="copy-btn" data-i18n="support.copy">${t('support.copy')}</button>
        </div>
      </div>
    </div>
  `

  setupButton()
}

// ── Interactions ───────────────────────────────────────────────────────────
function setupButton() {
  const btn       = document.getElementById('support-btn')
  const panel     = document.getElementById('wallet-panel')
  const copyBtn   = document.getElementById('copy-btn')
  const character = document.querySelector('.character-svg')

  btn?.addEventListener('click', () => {
    spawnRipple(btn)
    panel?.classList.add('wallet-panel--open')
    triggerShy(character)
  })

  copyBtn?.addEventListener('click', () => {
    navigator.clipboard.writeText(WALLET).then(() => {
      copyBtn.textContent = t('support.copied')
      copyBtn.classList.add('copy-btn--copied')
      setTimeout(() => {
        copyBtn.textContent = t('support.copy')
        copyBtn.classList.remove('copy-btn--copied')
      }, 2000)
    }).catch(() => {
      const range = document.createRange()
      const addrEl = document.getElementById('wallet-address')
      if (addrEl) {
        range.selectNode(addrEl)
        window.getSelection().removeAllRanges()
        window.getSelection().addRange(range)
      }
    })
  })
}

function spawnRipple(btn) {
  const r = document.createElement('span')
  r.className = 'support-ripple'
  r.setAttribute('aria-hidden', 'true')
  btn.appendChild(r)
  r.addEventListener('animationend', () => r.remove(), { once: true })
}

function triggerShy(svg) {
  if (!svg || svg.classList.contains('character-shy')) return
  svg.classList.add('character-shy')
  setTimeout(() => svg.classList.remove('character-shy'), 2800)
}

// ── Title glitch ───────────────────────────────────────────────────────────
function initTitleGlitch() {
  const title = document.querySelector('#support .section-title')
  if (!title) return

  const fire = () => {
    title.classList.add('animate-glitch')
    setTimeout(() => title.classList.remove('animate-glitch'), 420)
    setTimeout(fire, 9000 + Math.random() * 9000)
  }
  setTimeout(fire, 7000)
}
