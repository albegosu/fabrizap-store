export const THEME_STORAGE_KEY = 'fz_theme'

export function readStoredThemeIsDark() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === 'dark'
  } catch {
    return false
  }
}

export function applyDocumentTheme(isDark) {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', isDark)
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) {
    meta.setAttribute('content', isDark ? '#121418' : '#FAF8F5')
  }
}

export function applyStoredThemeToDocument() {
  applyDocumentTheme(readStoredThemeIsDark())
}
