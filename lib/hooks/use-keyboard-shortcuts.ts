"use client"

import { useEffect, useCallback } from "react"

type ShortcutHandler = (event: KeyboardEvent) => void

export function useKeyboardShortcuts(shortcuts: Record<string, ShortcutHandler>) {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return
      }

      const key = event.key.toLowerCase()
      if (shortcuts[key]) {
        event.preventDefault()
        shortcuts[key](event)
      }
    },
    [shortcuts],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)
    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [handleKeyPress])
}

