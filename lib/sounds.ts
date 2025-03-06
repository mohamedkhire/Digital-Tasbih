export const soundOptions = [
  {
    id: "gentle-tap",
    name: "Gentle Tap",
    arabicName: "نقرة خفيفة",
    url: "/sounds/gentle-tap.mp3",
    category: "soft",
  },
  {
    id: "wooden-click",
    name: "Wooden Click",
    arabicName: "نقرة خشبية",
    url: "/sounds/wooden-click.mp3",
    category: "soft",
  },
  {
    id: "digital-beep",
    name: "Digital Beep",
    arabicName: "نقرة رقمية",
    url: "/sounds/digital-beep.mp3",
    category: "digital",
  },
  {
    id: "soft-chime",
    name: "Soft Chime",
    arabicName: "رنين ناعم",
    url: "/sounds/soft-chime.mp3",
    category: "soft",
  },
]

class SoundManager {
  private static instance: SoundManager
  private audio: HTMLAudioElement | null = null
  private enabled = true

  private constructor() {
    if (typeof window !== "undefined") {
      this.audio = new Audio()
      this.audio.volume = 0.3
      // Set default sound
      const defaultSound = soundOptions.find((s) => s.id === "gentle-tap")
      if (defaultSound) {
        this.audio.src = defaultSound.url
      }
    }
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager()
    }
    return SoundManager.instance
  }

  public setEnabled(enabled: boolean) {
    this.enabled = enabled
  }

  public isEnabled(): boolean {
    return this.enabled
  }

  public setSound(soundId: string) {
    const sound = soundOptions.find((s) => s.id === soundId)
    if (sound && this.audio) {
      this.audio.src = sound.url
    }
  }

  public async playSound() {
    if (!this.enabled || !this.audio) return

    try {
      this.audio.currentTime = 0
      await this.audio.play()
    } catch (error) {
      console.error("Error playing sound:", error)
    }
  }
}

export const soundManager = SoundManager.getInstance()

