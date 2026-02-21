import { useEffect } from 'react'
import { applyDocumentTheme, readThemePreference, SETTINGS_STORAGE_KEY } from '../lib/theme'

export function useThemeSync() {
  useEffect(() => {
    const apply = () => {
      const theme = readThemePreference()
      applyDocumentTheme(theme)
    }

    apply()

    const handleStorage = (event: StorageEvent) => {
      if (event.key === SETTINGS_STORAGE_KEY) {
        apply()
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])
}
