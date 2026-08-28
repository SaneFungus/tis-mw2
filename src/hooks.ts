// ─── Haki pomocnicze ──────────────────────────────────────────────
//
// Trzy rzeczy, których aplikacja potrzebuje na scenie, a nie w kodzie widoku:
// pamięć między odświeżeniami, ekran, który nie gaśnie, i pełny ekran.

import { useCallback, useEffect, useRef, useState } from "react"
import type { Dispatch, SetStateAction } from "react"

// ─── Pamięć między odświeżeniami ──────────────────────────────────
//
// Zachowuje się jak useState, ale przeżywa przeładowanie strony.
// Wszystkie awarie (tryb prywatny, brak miejsca, zepsuty wpis) kończą się
// wartością początkową — pamięć jest wygodą, nie warunkiem działania.

export function usePersistentState<T>(
  key: string,
  initial: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key)
      return raw === null ? initial : (JSON.parse(raw) as T)
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Zapis jest opcjonalny — brak pamięci nie może zatrzymać wykonania.
    }
  }, [key, value])

  return [value, setValue]
}

// ─── Ekran, który nie gaśnie ──────────────────────────────────────
//
// Screen Wake Lock. Przeglądarka zwalnia blokadę, gdy karta schodzi w tło,
// więc przy powrocie prosimy o nią jeszcze raz. Gdy API nie ma (Safari
// starszy niż 16.4) albo przeglądarka odmówi — po prostu nic się nie dzieje.

type WakeSentinel = { release: () => Promise<void> }
type NavigatorWithWakeLock = Navigator & {
  wakeLock?: { request: (type: "screen") => Promise<WakeSentinel> }
}

export function useWakeLock(active: boolean) {
  useEffect(() => {
    if (!active) return
    const nav = navigator as NavigatorWithWakeLock
    if (!nav.wakeLock) return

    let cancelled = false
    let sentinel: WakeSentinel | null = null

    const acquire = async () => {
      if (document.visibilityState !== "visible") return
      try {
        const next = await nav.wakeLock!.request("screen")
        if (cancelled) {
          void next.release()
          return
        }
        if (sentinel) void sentinel.release()
        sentinel = next
      } catch {
        // Odmowa przeglądarki nie jest błędem aplikacji.
      }
    }

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") void acquire()
    }

    void acquire()
    document.addEventListener("visibilitychange", onVisibilityChange)

    return () => {
      cancelled = true
      document.removeEventListener("visibilitychange", onVisibilityChange)
      if (sentinel) void sentinel.release()
    }
  }, [active])
}

// ─── Pełny ekran ──────────────────────────────────────────────────

export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const rootRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    rootRef.current = document.documentElement
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement))
    onChange()
    document.addEventListener("fullscreenchange", onChange)
    return () => document.removeEventListener("fullscreenchange", onChange)
  }, [])

  const toggle = useCallback(() => {
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => undefined)
      return
    }
    const root = rootRef.current
    if (root && typeof root.requestFullscreen === "function") {
      void root.requestFullscreen().catch(() => undefined)
    }
  }, [])

  const supported =
    typeof document !== "undefined" &&
    typeof document.documentElement.requestFullscreen === "function"

  return { isFullscreen, toggle, supported }
}
