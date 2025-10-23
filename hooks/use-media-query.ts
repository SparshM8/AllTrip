"use client"

import { useEffect, useState } from "react"

export function useMediaQuery(query: string): boolean {
  // Initialize based on current window if available to minimize hydration mismatch
  const getInitial = () => {
    if (typeof window === "undefined" || typeof window.matchMedia === "undefined") {
      return false
    }
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(getInitial)

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia === "undefined") {
      return
    }

    const media = window.matchMedia(query)
    const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
      // e can be MediaQueryList for old listeners
      const next = "matches" in e ? e.matches : media.matches
      setMatches(next)
    }

    // Set once on mount in case it changed between SSR and mount
    onChange(media)

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", onChange as (e: Event) => void)
      return () => media.removeEventListener("change", onChange as (e: Event) => void)
    } else if (typeof (media as any).addListener === "function") {
      ;(media as any).addListener(onChange)
      return () => (media as any).removeListener(onChange)
    }
  }, [query])

  return matches
}
