export type ThemeChoice = 'light' | 'dark'

const SETTINGS_KEY = 'alexai:settings'
const FALLBACK: ThemeChoice = 'light'
const isBrowser = typeof window !== 'undefined'

export function readThemePreference(): ThemeChoice {
  if (!isBrowser) return FALLBACK
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY)
    if (!raw) return FALLBACK
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed.theme === 'string') {
      return parsed.theme === 'dark' ? 'dark' : 'light'
    }
    return FALLBACK
  } catch (error) {
    console.warn('Unable to read stored theme', error)
    return FALLBACK
  }
}

export function applyDocumentTheme(theme: ThemeChoice) {
  if (!isBrowser) return
  document.documentElement.dataset.theme = theme
}

export function persistTheme(theme: ThemeChoice) {
  if (!isBrowser) return
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY)
    const stored = raw ? JSON.parse(raw) : {}
    const next = { ...stored, theme }
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(next))
  } catch (error) {
    console.warn('Unable to persist theme', error)
  }
}

export const SETTINGS_STORAGE_KEY = SETTINGS_KEY
