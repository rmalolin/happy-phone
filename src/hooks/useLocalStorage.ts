import { useSyncExternalStore, useCallback, useRef } from 'react'

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const cachedRef = useRef<T | undefined>(undefined)
  const stableInitialRef = useRef(initialValue)

  const getSnapshot = useCallback(() => {
    if (typeof window === 'undefined') return stableInitialRef.current

    if (cachedRef.current === undefined) {
      try {
        const item = localStorage.getItem(key)
        cachedRef.current = item ? JSON.parse(item) : stableInitialRef.current
      } catch {
        cachedRef.current = stableInitialRef.current
      }
    }
    return cachedRef.current as T
  }, [key])

  const getServerSnapshot = useCallback(() => stableInitialRef.current, [])

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const setValue = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      const prev = cachedRef.current ?? stableInitialRef.current
      const next = newValue instanceof Function ? newValue(prev) : newValue
      cachedRef.current = next
      localStorage.setItem(key, JSON.stringify(next))
      window.dispatchEvent(new Event('storage'))
    },
    [key]
  )

  return [value, setValue]
}
