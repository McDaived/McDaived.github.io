import { init as initI18n, setLanguage, getLang, t } from './i18n.js'
import { init as initCursor }     from './cursor.js'
import { init as initBackground } from './background.js'
import { init as initNav }        from './nav.js'
import { init as initRouter }     from './router.js'
import { init as initHero }       from './hero.js'
import { init as initProjects }   from './projects.js'
import { init as initGame }       from './game.js'
import { init as initAbout }      from './about.js'
import { init as initSupport }    from './support.js'

function initApp() {
  // ── Core systems ──────────────────────────────────────
  initI18n()
  initCursor()
  initBackground()
  initNav()
  initRouter()
  initHero()
  initProjects()  // async — fires and forgets, updates grid when ready
  initGame()
  initAbout()
  initSupport()

  // ── Language toggle ───────────────────────────────────
  const langBtn = document.getElementById('lang-toggle')
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      langBtn.classList.add('flipping')
      const next = getLang() === 'en' ? 'ar' : 'en'
      setTimeout(() => {
        setLanguage(next)
        langBtn.classList.remove('flipping')
      }, 200)
    })
  }

  // ── Typing effect (hero subtitle) ─────────────────────
  const typingEl = document.getElementById('typing-text')
  if (typingEl) {
    const getPhrases = () => [
      t('hero.phrase1'),
      t('hero.phrase2'),
      t('hero.phrase3'),
      t('hero.phrase4'),
    ]

    let phraseIdx   = 0
    let charIdx     = 0
    let deleting    = false
    let typingTimer = null

    function type() {
      const phrases = getPhrases()
      const phrase  = phrases[phraseIdx]
      typingEl.textContent = deleting
        ? phrase.slice(0, --charIdx)
        : phrase.slice(0, ++charIdx)

      let ms = deleting ? 40 : 80
      if (!deleting && charIdx === phrase.length)  { ms = 2000; deleting = true }
      else if (deleting && charIdx === 0) {
        deleting  = false
        phraseIdx = (phraseIdx + 1) % phrases.length
        ms = 400
      }
      typingTimer = setTimeout(type, ms)
    }

    typingTimer = setTimeout(type, 800)

    // Restart typing on language switch so phrases refresh immediately
    document.addEventListener('langchange', () => {
      clearTimeout(typingTimer)
      typingEl.textContent = ''
      phraseIdx = 0
      charIdx   = 0
      deleting  = false
      typingTimer = setTimeout(type, 400)
    })
  }
}

document.addEventListener('DOMContentLoaded', initApp)
