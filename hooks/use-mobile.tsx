import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Use a deterministic initial value to match SSR output (false).
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    // set initial value on mount
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange)
      return () => mql.removeEventListener("change", onChange)
    } else if (typeof (mql as any).addListener === "function") {
      ;(mql as any).addListener(onChange)
      return () => (mql as any).removeListener(onChange)
    }
  }, [])

  return isMobile
}
