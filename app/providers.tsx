"use client"

import type React from "react"
import { ThemeProvider } from "next-themes"
import { createContext, useState, useContext, useEffect } from "react"

type ColorTheme = "default" | "gold" | "violet" | "ocean"

type ColorThemeContextType = {
  colorTheme: ColorTheme
  setColorTheme: (theme: ColorTheme) => void
}

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(undefined)

export function useColorTheme() {
  const context = useContext(ColorThemeContext)
  if (context === undefined) {
    throw new Error("useColorTheme must be used within a ColorThemeProvider")
  }
  return context
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [colorTheme, setColorTheme] = useState<ColorTheme>("default")

  const handleSetColorTheme = (theme: ColorTheme) => {
    // Remove previous theme classes
    document.documentElement.classList.remove("theme-default", "theme-gold", "theme-violet", "theme-ocean")

    // Add new theme class
    if (theme !== "default") {
      document.documentElement.classList.add(`theme-${theme}`)
    }

    // Save preference
    localStorage.setItem("color-theme", theme)
    setColorTheme(theme)
  }

  // Load saved color theme on mount
  useEffect(() => {
    const savedColorTheme = localStorage.getItem("color-theme") as ColorTheme | null
    if (savedColorTheme) {
      handleSetColorTheme(savedColorTheme)
    }
  }, []) // Empty dependency array is correct here, because we only want to run this effect once on mount.  Adding handleSetColorTheme would cause an infinite loop.

  return (
    <ColorThemeContext.Provider value={{ colorTheme, setColorTheme: handleSetColorTheme }}>
      <ThemeProvider attribute="class" defaultTheme="light">
        {children}
      </ThemeProvider>
    </ColorThemeContext.Provider>
  )
}

