"use client"

import type React from "react"
import { createContext, useState, useCallback } from "react"

export type ColorMode = "modern" | "ocean" | "violet" | "gold"

type ColorModeContextType = {
  colorMode: ColorMode
  setColorMode: (mode: ColorMode) => void
}

export const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined)

export function ColorModeProvider({ children }: { children: React.ReactNode }) {
  const [colorMode, setColorMode] = useState<ColorMode>("modern")

  const handleSetColorMode = useCallback((mode: ColorMode) => {
    setColorMode(mode)
    // You can add logic here to update CSS variables or classes
  }, [])

  return (
    <ColorModeContext.Provider value={{ colorMode, setColorMode: handleSetColorMode }}>
      {children}
    </ColorModeContext.Provider>
  )
}

