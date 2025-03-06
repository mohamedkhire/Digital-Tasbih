export interface DhikrItem {
  id: string
  text: string
  arabicText: string
  target: number
  category: string
  time?: "morning" | "evening" | "after-prayer" | "anytime"
  source?: string
  virtues?: string[]
  reward?: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  requirement: number
  icon: string
  color: string
}

export interface UserStats {
  totalDhikr: number
  dailyStreak: number
  lastCompletedDate: string
  achievements: string[]
  favorites: string[]
  customDhikrs: DhikrItem[]
}

export interface AppSettings {
  theme: "light" | "dark" | "system"
  sound: boolean
  soundType: string
  hapticFeedback: boolean
  autoBackup: boolean
  backupFrequency: number
  notifications: boolean
}

