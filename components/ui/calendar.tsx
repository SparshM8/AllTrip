"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { useState, useEffect } from "react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  numberOfMonths?: number
  showNavigation?: boolean
  compact?: boolean
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  numberOfMonths,
  showNavigation = true,
  compact = false,
  ...props
}: CalendarProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // For compact mode, always use 2 months unless mobile
  const monthsToShow = numberOfMonths || (compact ? (isMobile ? 1 : 2) : (isMobile ? 1 : 2))

  return (
    <DayPicker
      numberOfMonths={monthsToShow}
      showOutsideDays={showOutsideDays}
      className={cn(
        compact 
          ? "p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg" 
          : "p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg",
        className
      )}
      classNames={{
        months: cn(
          "flex",
          isMobile ? "flex-col space-y-3" : `flex-row ${compact ? "gap-4" : "gap-8"}`,
          monthsToShow > 2 ? "flex-wrap justify-center" : ""
        ),
        month: compact ? "space-y-2 w-full max-w-[280px]" : "space-y-4 min-w-[280px]",
        caption: compact ? "flex justify-center items-center relative px-1 py-1 mb-1" : "flex justify-center items-center relative px-2 py-2 mb-2",
        caption_label: compact ? "text-sm font-semibold text-gray-900 dark:text-white" : "text-lg font-semibold text-gray-900 dark:text-white",
        nav: showNavigation ? "flex items-center" : "hidden",
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          compact 
            ? "h-7 w-7 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-200" 
            : "h-9 w-9 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-200 hover:scale-105"
        ),
        nav_button_previous: "absolute left-0",
        nav_button_next: "absolute right-0",
        table: "w-full border-collapse",
        head_row: compact ? "flex w-full mb-1" : "flex w-full mb-3",
        head_cell: compact
          ? "flex-1 text-center text-xs font-medium text-gray-500 dark:text-gray-400 h-7 flex items-center justify-center"
          : "flex-1 text-center text-sm font-semibold text-gray-600 dark:text-gray-300 h-10 flex items-center justify-center uppercase tracking-wider",
        row: compact ? "flex w-full mb-1" : "flex w-full mb-1",
        cell: compact ? "flex-1 text-center h-7 flex items-center justify-center" : "flex-1 text-center h-10 flex items-center justify-center relative",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          compact
            ? "h-7 w-7 p-0 font-normal text-xs hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors mx-auto"
            : "h-10 w-10 p-0 font-medium text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-105 relative mx-auto"
        ),
        day_range_end: "day-range-end rounded-r-md bg-[#FDBE00] text-black",
        day_selected: "bg-[#FDBE00] text-black hover:bg-[#FDBE00] hover:text-black focus:bg-[#FDBE00] focus:text-black rounded-md font-semibold",
        day_today: compact 
          ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold border border-[#FDBE00] rounded-md" 
          : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-bold border-2 border-[#FDBE00] rounded-lg",
        day_outside: "text-gray-400 dark:text-gray-600 opacity-40",
        day_disabled: "text-gray-300 dark:text-gray-700 cursor-not-allowed opacity-30",
        day_range_middle: "bg-[#FDBE00]/20 text-gray-900 dark:text-white rounded-none",
        day_hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
