// about.js — skill bars (IntersectionObserver) + bio terminal + timeline

import { t } from './i18n.js'

const SKILLS = [
  { key: 'skill.python',  pct: 90 },
  { key: 'skill.csharp',  pct: 70 },
  { key: 'skill.cpp',     pct: 90 },
  { key: 'skill.re',      pct: 90 },
  { key: 'skill.go',      pct: 40 },
  { key: 'skill.web',     pct: 80 },
  { key: 'skill.asm',     pct: 75 },
  { key: 'skill.malware', pct: 85 },
  { key: 'skill.network', pct: 80 },
  { key: 'skill.api',     pct: 70 },
]

const BIO_KEYS = [
  'bio.line1', 'bio.line2', 'bio.line3',
  'bio.line4', 'bio.line5', 'bio.line6',
]

const TIMELINE = [
  { year: '2013', key: 'timeline.2013' },
  { year: '2016', key: 'timeline.2016' },
  { year: '2019', key: 'timeline.2019' },
  { year: '2021', key: 'timeline.2021' },
  { year: '2024', key: 'timeline.2024' },
]

export function init() {
  renderSkills()
  renderBio()
  renderTimeline()
  initTitleGlitch()

  // Re-render bio when language switches so highlighted text stays current
  document.addEventListener('langchange', () => {
    const wasVisible = !!document.querySelector('.bio-terminal--visible')
    renderBio()
    if (wasVisible) {
      document.querySelector('.bio-terminal')?.classList.add('bio-terminal--visible')
    }
  })
}

// ── Skills ────────────────────────────────────────────────────────────────────
function renderSkills() {
  const container = document.querySelector('.skills-container')
  if (!container) return

  container.innerHTML = `
    <h3 class="about-sub-title" data-i18n="about.skills_title">${t('about.skills_title')}</h3>
    ${SKILLS.map(s => `
      <div class="skill-bar-wrapper">
        <div class="skill-header">
          <span data-i18n="${s.key}">${t(s.key)}</span>
          <span class="skill-pct">${s.pct}%</span>
        </div>
        <div class="skill-track"
             role="progressbar"
             aria-valuenow="${s.pct}"
             aria-valuemin="0"
             aria-valuemax="100"
             aria-label="${t(s.key)} ${s.pct}%">
          <div class="skill-fill" data-pct="${s.pct}"></div>
        </div>
      </div>
    `).join('')}
  `

  // Fill bars when the container scrolls into view (staggered by 60ms each)
  const observer = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return
    container.querySelectorAll('.skill-fill').forEach((fill, i) => {
      setTimeout(() => { fill.style.width = fill.dataset.pct + '%' }, i * 60)
    })
    observer.unobserve(container)
  }, { threshold: 0.25 })

  observer.observe(container)
}

// ── Bio terminal ──────────────────────────────────────────────────────────────
function renderBio() {
  const container = document.querySelector('.bio-container')
  if (!container) return

  container.innerHTML = `
    <h3 class="about-sub-title" data-i18n="about.bio_title">${t('about.bio_title')}</h3>
    <div class="bio-terminal">
      ${BIO_KEYS.map((key, i) => `
        <div class="bio-line">
          <span class="bio-line-num">${i + 1}</span>
          <span class="bio-text">${highlightLine(t(key))}</span>
        </div>
      `).join('')}
    </div>
  `

  // Fade-in the terminal block on scroll
  const terminal = container.querySelector('.bio-terminal')
  const observer = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return
    terminal.classList.add('bio-terminal--visible')
    observer.unobserve(terminal)
  }, { threshold: 0.2 })

  observer.observe(terminal)
}

// ── Timeline ──────────────────────────────────────────────────────────────────
function renderTimeline() {
  const container = document.querySelector('.timeline-container')
  if (!container) return

  container.innerHTML = `
    <div class="timeline">
      ${TIMELINE.map(item => `
        <div class="timeline-item">
          <p class="timeline-year">${item.year}</p>
          <p class="timeline-desc" data-i18n="${item.key}">${t(item.key)}</p>
        </div>
      `).join('')}
    </div>
  `

  // Reveal each item individually on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.3 })

  container.querySelectorAll('.timeline-item').forEach(item => observer.observe(item))
}

// ── Title glitch ──────────────────────────────────────────────────────────────
function initTitleGlitch() {
  const title = document.querySelector('#about .section-title')
  if (!title) return

  const trigger = () => {
    title.classList.add('animate-glitch')
    setTimeout(() => title.classList.remove('animate-glitch'), 420)
    setTimeout(trigger, 9000 + Math.random() * 7000)
  }
  setTimeout(trigger, 6000)
}

// ── Syntax highlight ──────────────────────────────────────────────────────────
// Simple monochrome token highlight for the bio terminal lines.
function highlightLine(text) {
  const safe = esc(text)

  // Comment lines — render in muted style
  if (safe.startsWith('//')) {
    return `<span class="bio-comment">${safe}</span>`
  }

  // Code lines — highlight keyword and string literals
  return safe
    .replace(/\b(const|let|var)\b/g, '<span class="bio-keyword">$1</span>')
    .replace(/'([^']*)'/g, "'<span class=\"bio-string\">$1</span>'")
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
