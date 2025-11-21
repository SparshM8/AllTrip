"use client"

import { useEffect, useState } from "react"

export function useMediaQuery(query: string): boolean {
  // Start with a deterministic server-friendly value (false).
  // We intentionally avoid reading `window` during render to keep SSR output stable.
  const [matches, setMatches] = useState<boolean>(false)

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
    setMatches(media.matches)

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
