"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

// Inject CSS mapping for progress indicator transforms (0-100)
if (typeof document !== 'undefined' && !(globalThis as any).__PROGRESS_INDICATOR_STYLES__) {
  const s = document.createElement('style')
  s.id = 'progress-indicator-styles'
  s.textContent = `
    .progress-indicator{transform:translateX(-100%);} 
    ${Array.from({ length: 101 }, (_, i) => `.progress-indicator[data-value='${i}']{transform:translateX(-${100 - i}%);}`).join('\n')}
  `
  document.head.appendChild(s)
  ;(globalThis as any).__PROGRESS_INDICATOR_STYLES__ = true
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 progress-indicator transition-all"
      data-value={value ?? 0}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
