"use client"

import React, { useState } from "react"
import DatePicker, { Calendar } from "react-multi-date-picker"

interface DatePickerModalProps {
  isOpen: boolean
  onClose: () => void
  dateRange: any[]
  onDateChange: (dateRange: any[]) => void
}

export function DatePickerModal({ isOpen, onClose, dateRange, onDateChange }: DatePickerModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-auto">
        {/* Header */}
        <div className="p-3 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">Select Dates</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-lg p-1"
          >
            ×
          </button>
        </div>

        {/* Mobile-Optimized Calendar - Single Month */}
        <div className="p-3">
          <Calendar
            value={dateRange}
            onChange={onDateChange}
            range
            numberOfMonths={1}
            minDate={new Date()}
            className="rmdp-mobile"
            mapDays={({ date, today }) => {
              if (today) return { style: { color: "#FDBE00", fontWeight: "bold" } }
            }}
          />
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-200 flex flex-col gap-3">
          <div className="text-sm text-gray-600 text-center">
            {dateRange?.length === 2 && dateRange[0] && dateRange[1] ? (
              <span>
                {dateRange[0].format("MMM DD")} - {dateRange[1].format("MMM DD, YYYY")}
              </span>
            ) : (
              <span>Select check-in and check-out dates</span>
            )}
          </div>
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => onDateChange([])}
              className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={!dateRange || dateRange.length < 2}
              className="px-4 py-2 bg-[#FDBE00] text-black text-sm font-medium rounded-md hover:bg-[#FDBE00]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}