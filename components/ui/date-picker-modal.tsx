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
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-fit mx-4">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Select Dates</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ×
          </button>
        </div>

        {/* Compact Calendar */}
        <div className="p-4">
          <Calendar
            value={dateRange}
            onChange={onDateChange}
            range
            numberOfMonths={2}
            minDate={new Date()}
            className="rmdp-mobile"
            mapDays={({ date, today }) => {
              if (today) return { style: { color: "#FDBE00", fontWeight: "bold" } }
            }}
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {dateRange?.length === 2 && dateRange[0] && dateRange[1] ? (
              <span>
                {dateRange[0].format("MMM DD")} - {dateRange[1].format("MMM DD, YYYY")}
              </span>
            ) : (
              <span>Select check-in and check-out dates</span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onDateChange([])}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
            >
              Clear
            </button>
            <button
              onClick={onClose}
              disabled={!dateRange || dateRange.length < 2}
              className="px-4 py-1 bg-[#FDBE00] text-black text-sm font-medium rounded-md hover:bg-[#FDBE00]/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}