"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, Check, Volume2 } from "lucide-react"
import { cn } from "@/lib/utils"

export type SoundOption = {
  id: string
  name: string
  arabicName: string
  url: string
  category: "soft" | "digital"
}

const soundOptions: SoundOption[] = [
  {
    id: "gentle-tap",
    name: "Gentle Tap",
    arabicName: "نقرة خفيفة",
    url: "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3",
    category: "soft",
  },
  {
    id: "light-click",
    name: "Light Click",
    arabicName: "نقرة لطيفة",
    url: "https://assets.mixkit.co/active_storage/sfx/2569/2569-preview.mp3",
    category: "soft",
  },
  {
    id: "digital-click",
    name: "Digital Click",
    arabicName: "نقرة رقمية",
    url: "https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3",
    category: "digital",
  },
  {
    id: "digital-tap",
    name: "Digital Tap",
    arabicName: "نقرة رقمية خفيفة",
    url: "https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3",
    category: "digital",
  },
]

interface SoundSelectorProps {
  selectedSound: string
  onSelectSound: (sound: SoundOption) => void
}

export function SoundSelector({ selectedSound, onSelectSound }: SoundSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [previewAudio, setPreviewAudio] = useState<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState<string | null>(null)

  useEffect(() => {
    return () => {
      if (previewAudio) {
        previewAudio.pause()
        previewAudio.remove()
      }
    }
  }, [previewAudio])

  const playPreview = async (sound: SoundOption) => {
    try {
      if (previewAudio) {
        previewAudio.pause()
        previewAudio.remove()
        setPreviewAudio(null)
      }

      const audio = new Audio(sound.url)
      audio.volume = 0.3

      // Wait for audio to be loaded before playing
      await new Promise((resolve, reject) => {
        audio.addEventListener("canplaythrough", resolve)
        audio.addEventListener("error", reject)
        audio.load()
      })

      setPreviewAudio(audio)
      setIsPlaying(sound.id)

      await audio.play()
      audio.onended = () => {
        setIsPlaying(null)
        audio.remove()
        setPreviewAudio(null)
      }
    } catch (error) {
      console.error("Error playing sound:", error)
      setIsPlaying(null)
      if (previewAudio) {
        previewAudio.remove()
        setPreviewAudio(null)
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-xs bg-background/50 border-primary/20 hover:bg-primary/5 flex items-center gap-2"
        >
          <Volume2 className="h-3.5 w-3.5 text-primary" />
          {soundOptions.find((s) => s.id === selectedSound)?.arabicName || "اختر الصوت"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center mb-4 text-xl">اختر صوت النقر</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <h3 className="font-semibold text-sm text-primary">أصوات ناعمة</h3>
            <div className="grid gap-2">
              {soundOptions
                .filter((sound) => sound.category === "soft")
                .map((sound) => (
                  <Card
                    key={sound.id}
                    className={cn(
                      "p-3 flex items-center justify-between transition-all cursor-pointer hover:bg-primary/5",
                      selectedSound === sound.id ? "border-primary/50 bg-primary/10" : "border-primary/20",
                    )}
                    onClick={() => onSelectSound(sound)}
                  >
                    <span className="text-sm">{sound.arabicName}</span>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation()
                          playPreview(sound)
                        }}
                      >
                        <Play className={`h-4 w-4 ${isPlaying === sound.id ? "text-primary" : ""}`} />
                      </Button>
                      {selectedSound === sound.id && <Check className="h-4 w-4 text-primary" />}
                    </div>
                  </Card>
                ))}
            </div>
          </div>

          <div className="grid gap-2">
            <h3 className="font-semibold text-sm text-primary">أصوات رقمية</h3>
            <div className="grid gap-2">
              {soundOptions
                .filter((sound) => sound.category === "digital")
                .map((sound) => (
                  <Card
                    key={sound.id}
                    className={cn(
                      "p-3 flex items-center justify-between transition-all cursor-pointer hover:bg-primary/5",
                      selectedSound === sound.id ? "border-primary/50 bg-primary/10" : "border-primary/20",
                    )}
                    onClick={() => onSelectSound(sound)}
                  >
                    <span className="text-sm">{sound.arabicName}</span>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation()
                          playPreview(sound)
                        }}
                      >
                        <Play className={`h-4 w-4 ${isPlaying === sound.id ? "text-primary" : ""}`} />
                      </Button>
                      {selectedSound === sound.id && <Check className="h-4 w-4 text-primary" />}
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

