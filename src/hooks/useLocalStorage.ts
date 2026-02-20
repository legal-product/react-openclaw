import { useCallback, useEffect, useRef, useState } from 'react'

const isBrowser = typeof window !== 'undefined'

type Deserializer<T> = (value: string) => T

type Serializer<T> = (value: T) => string

export function useLocalStorageState<T>(
  key: string,
  defaultValue: T,
  options?: { serializer?: Serializer<T>; deserializer?: Deserializer<T> },
) {
  const serializer = options?.serializer ?? JSON.stringify
  const deserializer = options?.deserializer ?? JSON.parse
  const [state, setState] = useState<T>(() => {
    if (!isBrowser) {
      return defaultValue
    }
    const stored = window.localStorage.getItem(key)
    if (stored !== null) {
      try {
        return deserializer(stored) as T
      } catch (error) {
        console.warn('Failed to parse localStorage value for', key, error)
      }
    }
    return defaultValue
  })

  const latestState = useRef(state)
  useEffect(() => {
    latestState.current = state
  }, [state])

  useEffect(() => {
    if (!isBrowser) {
      return
    }
    try {
      window.localStorage.setItem(key, serializer(state))
    } catch (error) {
      console.warn('Failed to write localStorage value for', key, error)
    }
  }, [key, serializer, state])

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setState((prev) => (typeof value === 'function' ? (value as (arg: T) => T)(prev) : value))
    },
    [],
  )

  return [state, setValue] as const
}
