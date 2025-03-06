"use client"

import { Moon, Sun, Palette } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useColorTheme } from "@/app/providers"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const { colorTheme, setColorTheme } = useColorTheme()

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-primary/10">
            <Palette className="h-5 w-5 text-primary" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setColorTheme("default")}>
            <span className="w-4 h-4 rounded-full bg-emerald-500 mr-2"></span>
            الافتراضي
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setColorTheme("gold")}>
            <span className="w-4 h-4 rounded-full bg-amber-500 mr-2"></span>
            ذهبي
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setColorTheme("violet")}>
            <span className="w-4 h-4 rounded-full bg-violet-500 mr-2"></span>
            بنفسجي
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setColorTheme("ocean")}>
            <span className="w-4 h-4 rounded-full bg-blue-500 mr-2"></span>
            محيطي
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="hover:bg-primary/10"
      >
        {theme === "light" ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
      </Button>
    </div>
  )
}

