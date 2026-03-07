import en from '../lang/en.json'
import ar from '../lang/ar.json'

const STORAGE_KEY = 'daived-lang'
const langMap = { en, ar }

let currentLang = localStorage.getItem(STORAGE_KEY) || 'en'
let translations = langMap[currentLang] || langMap.en

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n
    if (translations[key] !== undefined) el.textContent = translations[key]
  })

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder
    if (translations[key] !== undefined) el.placeholder = translations[key]
  })

  const isRtl = currentLang === 'ar'
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr'
  document.documentElement.lang = currentLang

  const langBtn = document.getElementById('lang-toggle')
  if (langBtn) {
    langBtn.querySelector('.lang-current').textContent = currentLang.toUpperCase()
    langBtn.setAttribute('aria-label', `Switch to ${isRtl ? 'English' : 'Arabic'}`)
  }
}

export function setLanguage(lang) {
  currentLang = lang
  translations = langMap[lang] || langMap.en
  localStorage.setItem(STORAGE_KEY, lang)

  document.body.classList.add('lang-transition')
  applyTranslations()
  document.dispatchEvent(new CustomEvent('langchange'))
  setTimeout(() => document.body.classList.remove('lang-transition'), 300)
}

export function t(key) {
  return translations[key] ?? key
}

export function getLang() {
  return currentLang
}

export function init() {
  applyTranslations()
}
