// hero.js — hero section behaviours:
//   • Profile image load / error handling
//   • Social link click ripple
//   • Re-trigger entry animations when router navigates back to hero

export function init() {
  initAvatar()
  initSocialRipple()
}

// ── Avatar ────────────────────────────────────────────────────────────────────
function initAvatar() {
  const img         = document.querySelector('.profile-img')
  const placeholder = document.querySelector('.profile-placeholder')
  if (!img || !placeholder) return

  // If the image is already broken (cached 404) show placeholder immediately
  if (img.complete && !img.naturalWidth) {
    showPlaceholder(img, placeholder)
    return
  }

  img.addEventListener('error', () => showPlaceholder(img, placeholder))
  img.addEventListener('load',  () => hidePlaceholder(img, placeholder))
}

function showPlaceholder(img, placeholder) {
  img.style.display = 'none'
  placeholder.style.display = 'flex'
}

function hidePlaceholder(img, placeholder) {
  placeholder.style.display = 'none'
  img.style.display = 'block'
}

// ── Social link click ripple ───────────────────────────────────────────────────
function initSocialRipple() {
  document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', e => {
      // Don't block navigation
      const ripple = document.createElement('span')
      ripple.className = 'social-ripple'
      link.appendChild(ripple)
      ripple.addEventListener('animationend', () => ripple.remove())
    })
  })
}
