import type React from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface DailyStatsProps {
  dailyTotal: number
  onReset: (e: React.MouseEvent) => void
}

export function DailyStats({ dailyTotal, onReset }: DailyStatsProps) {
  return (
    <div className="flex items-center justify-center gap-3 p-4 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-200/50 dark:border-emerald-800/50">
      <div className="text-center">
        <span className="block text-sm text-emerald-600/90 dark:text-emerald-400/90">إجمالي اليوم</span>
        <span className="block text-2xl font-bold text-emerald-600 dark:text-emerald-400">{dailyTotal}</span>
      </div>
      <Separator orientation="vertical" className="h-8 bg-emerald-200/50 dark:bg-emerald-800/50" />
      <Button
        variant="ghost"
        size="sm"
        onClick={onReset}
        className="h-8 px-3 text-xs hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl"
      >
        إعادة تعيين
      </Button>
    </div>
  )
}

