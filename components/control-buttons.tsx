import type React from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw, Volume2, VolumeX } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface ControlButtonsProps {
  isSoundEnabled: boolean
  toggleSound: (e: React.MouseEvent) => void
  handleReset: (e: React.MouseEvent) => void
}

export function ControlButtons({ isSoundEnabled, toggleSound, handleReset }: ControlButtonsProps) {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={handleReset}
              className="border-primary/20 hover:bg-primary/5 rounded-2xl z-10 h-12 w-12"
            >
              <RotateCcw className="h-5 w-5 text-primary" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>إعادة العداد إلى الصفر</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleSound}
              className={cn(
                "border-primary/20",
                "hover:bg-primary/5",
                "rounded-2xl z-10 h-12 w-12",
                isSoundEnabled && "bg-primary/10",
              )}
            >
              {isSoundEnabled ? (
                <Volume2 className="h-5 w-5 text-primary" />
              ) : (
                <VolumeX className="h-5 w-5 text-primary" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isSoundEnabled ? "كتم" : "تشغيل"} الصوت</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}

