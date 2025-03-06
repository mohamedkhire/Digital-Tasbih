"use client"

import { useCallback } from "react"

export function useHapticFeedback() {
  const isHapticAvailable = typeof window !== "undefined" && "vibrate" in navigator

  const trigger = useCallback(
    (pattern: number | number[] = 20) => {
      if (isHapticAvailable) {
        try {
          navigator.vibrate(pattern)
        } catch (error) {
          console.error("Error triggering haptic feedback:", error)
        }
      }
    },
    [isHapticAvailable],
  )

  return {
    isAvailable: isHapticAvailable,
    trigger,
  }
}

