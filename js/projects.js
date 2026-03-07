// projects.js — GitHub API integration + project cards

const API_URL   = 'https://api.github.com/users/McDaived/repos?sort=updated&per_page=30'
const CACHE_KEY = 'daived-github-repos'

export async function init() {
  const grid = document.getElementById('projects-grid')
  if (!grid) return

  initTitleGlitch()
  renderSkeletons(grid)

  try {
    const repos = await fetchRepos()
    renderCards(grid, repos)
  } catch {
    renderError(grid)
  }
}

// ── Periodic glitch on the section title ─────────────────────────────────────
function initTitleGlitch() {
  const title = document.querySelector('#projects .section-title')
  if (!title) return

  const trigger = () => {
    title.classList.add('animate-glitch')
    setTimeout(() => title.classList.remove('animate-glitch'), 420)
    setTimeout(trigger, 7000 + Math.random() * 5000)
  }
  setTimeout(trigger, 4000)
}

// ── Data fetching with sessionStorage cache ───────────────────────────────────
async function fetchRepos() {
  const cached = sessionStorage.getItem(CACHE_KEY)
  if (cached) return JSON.parse(cached)

  const res = await fetch(API_URL)
  if (!res.ok) throw new Error(`GitHub API ${res.status}`)

  const all = await res.json()

  // Keep repos that have a description; sort by stars desc
  const repos = all
    .filter(r => !r.fork && r.description)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)

  sessionStorage.setItem(CACHE_KEY, JSON.stringify(repos))
  return repos
}

// ── Skeleton loading state ────────────────────────────────────────────────────
function renderSkeletons(grid) {
  grid.innerHTML = Array.from({ length: 6 }).map(() => `
    <div class="project-card project-card--skeleton" aria-hidden="true">
      <div class="skeleton skeleton--name"></div>
      <div class="skeleton skeleton--desc"></div>
      <div class="skeleton skeleton--desc short"></div>
      <div class="skeleton skeleton--meta"></div>
    </div>
  `).join('')
}

// ── Card rendering ────────────────────────────────────────────────────────────
function renderCards(grid, repos) {
  if (!repos.length) {
    grid.innerHTML = '<p class="projects-empty">No public repositories found.</p>'
    return
  }

  grid.innerHTML = repos.map(cardHTML).join('')

  // Staggered reveal via IntersectionObserver
  const cards = grid.querySelectorAll('.project-card:not(.project-card--skeleton)')
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })

  cards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 55}ms`
    observer.observe(card)
  })

  // Click-to-expand
  cards.forEach(card => card.addEventListener('click', onCardClick))
}

// ── Card click handler ────────────────────────────────────────────────────────
function onCardClick(e) {
  // Don't toggle if clicking the GitHub link
  if (e.target.closest('.card-github-btn')) return

  const card     = e.currentTarget
  const expanded = card.querySelector('.card-expanded')
  const isOpen   = card.classList.contains('expanded')

  // Collapse all other open cards
  document.querySelectorAll('.project-card.expanded').forEach(c => {
    if (c !== card) c.classList.remove('expanded')
  })

  card.classList.toggle('expanded', !isOpen)

  // Scroll card into view if it gets pushed down when another collapses
  if (!isOpen) {
    setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 420)
  }
}

// ── Card HTML template ────────────────────────────────────────────────────────
function cardHTML(repo) {
  const topics  = (repo.topics || []).slice(0, 5)
  const size    = formatSize(repo.size)

  return `
    <article class="project-card" data-url="${repo.html_url}" aria-label="Repository: ${esc(repo.name)}">
      <div class="card-main">
        <div class="card-header">
          <svg class="repo-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z"/>
          </svg>
          <h3 class="card-name">${esc(repo.name)}</h3>
        </div>

        <p class="card-desc">${esc(repo.description || '')}</p>

        <div class="card-meta">
          ${repo.language ? `
            <span class="card-lang">
              <span class="lang-dot" aria-hidden="true"></span>
              ${esc(repo.language)}
            </span>` : ''}
          ${repo.stargazers_count > 0 ? `<span class="card-stat">★ ${repo.stargazers_count}</span>` : ''}
          ${repo.forks_count > 0     ? `<span class="card-stat">⑂ ${repo.forks_count}</span>`     : ''}
          <span class="card-updated">${timeAgo(repo.updated_at)}</span>
        </div>
      </div>

      <div class="card-expanded">
        ${topics.length ? `
          <div class="card-topics">
            ${topics.map(t => `<span class="topic-tag">${esc(t)}</span>`).join('')}
          </div>` : ''}
        ${size ? `<p class="card-size">Size: ${size}</p>` : ''}
        <a class="card-github-btn"
           href="${repo.html_url}"
           target="_blank"
           rel="noopener noreferrer">
          Open on GitHub
          <svg viewBox="0 0 16 16" fill="currentColor" width="13" height="13" aria-hidden="true">
            <path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z"/>
          </svg>
        </a>
      </div>
    </article>
  `
}

function renderError(grid) {
  grid.innerHTML = `
    <div class="projects-error">
      <p>Failed to load projects. Check back later.</p>
      <a class="card-github-btn"
         href="https://github.com/McDaived"
         target="_blank"
         rel="noopener noreferrer">
        View GitHub Profile
      </a>
    </div>
  `
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function timeAgo(dateStr) {
  const diff   = Date.now() - new Date(dateStr).getTime()
  const mins   = Math.floor(diff / 60_000)
  const hours  = Math.floor(diff / 3_600_000)
  const days   = Math.floor(diff / 86_400_000)
  const months = Math.floor(diff / 2_592_000_000)

  if (mins  < 60)  return `${mins}m ago`
  if (hours < 24)  return `${hours}h ago`
  if (days  < 30)  return `${days}d ago`
  if (months < 12) return `${months}mo ago`
  return `${Math.floor(months / 12)}y ago`
}

function formatSize(kb) {
  if (!kb) return ''
  if (kb < 1024) return `${kb} KB`
  return `${(kb / 1024).toFixed(1)} MB`
}

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
