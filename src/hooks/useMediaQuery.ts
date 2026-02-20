import { useEffect, useState } from 'react'

const isBrowser = typeof window !== 'undefined'

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => {
    if (!isBrowser) {
      return false
    }
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    if (!isBrowser) {
      return undefined
    }
    const mediaQuery = window.matchMedia(query)
    const handler = () => setMatches(mediaQuery.matches)
    handler()
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return matches
}
