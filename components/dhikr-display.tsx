import type React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Heart } from "lucide-react"

interface DhikrDisplayProps {
  currentDhikr: {
    arabicText: string
    source?: string
    virtues?: string[]
    target: number
  }
  count: number
  isFavorite: boolean
  onToggleFavorite: (e: React.MouseEvent) => void
}

export function DhikrDisplay({ currentDhikr, count, isFavorite, onToggleFavorite }: DhikrDisplayProps) {
  return (
    <div className="text-center space-y-4">
      <div className="space-y-2">
        <h2 className="text-3xl font-arabic text-emerald-600 dark:text-emerald-400">{currentDhikr.arabicText}</h2>
        {currentDhikr.source && (
          <p className="text-sm text-emerald-600/70 dark:text-emerald-400/70">المصدر: {currentDhikr.source}</p>
        )}
      </div>

      {currentDhikr.virtues && currentDhikr.virtues.length > 0 && (
        <div className="space-y-2">
          <Separator className="bg-emerald-200/50 dark:bg-emerald-800/50" />
          <div className="flex flex-wrap gap-2 justify-center">
            {currentDhikr.virtues.map((virtue, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-emerald-50/50 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border-emerald-200/50 dark:border-emerald-800/50"
              >
                {virtue}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center items-center gap-4">
        <span className="text-sm text-emerald-600/90 dark:text-emerald-400/90">
          {count} / {currentDhikr.target}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleFavorite}
          className="h-8 w-8 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-full z-10"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-emerald-500 text-emerald-500" : "text-emerald-400/70"}`} />
        </Button>
      </div>
    </div>
  )
}

