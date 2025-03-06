import type { DhikrItem, UserStats, AppSettings } from "./types"

const STORAGE_KEYS = {
  STATS: "tasbih_stats",
  SETTINGS: "tasbih_settings",
  CUSTOM_DHIKRS: "tasbih_custom_dhikrs",
  BACKUP: "tasbih_backup",
} as const

export class StorageManager {
  private static instance: StorageManager
  private backupInterval: NodeJS.Timeout | null = null

  private constructor() {
    this.initializeBackup()
  }

  public static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager()
    }
    return StorageManager.instance
  }

  private initializeBackup() {
    const settings = this.getSettings()
    if (settings.autoBackup) {
      this.startAutoBackup(settings.backupFrequency)
    }
  }

  public startAutoBackup(frequency: number) {
    if (this.backupInterval) {
      clearInterval(this.backupInterval)
    }

    this.backupInterval = setInterval(
      () => {
        this.createBackup()
      },
      frequency * 60 * 1000,
    ) // Convert minutes to milliseconds
  }

  public stopAutoBackup() {
    if (this.backupInterval) {
      clearInterval(this.backupInterval)
      this.backupInterval = null
    }
  }

  public getStats(): UserStats {
    try {
      const stats = localStorage.getItem(STORAGE_KEYS.STATS)
      return stats
        ? JSON.parse(stats)
        : {
            totalDhikr: 0,
            dailyStreak: 0,
            lastCompletedDate: new Date().toISOString(),
            achievements: [],
            favorites: [],
            customDhikrs: [],
          }
    } catch (error) {
      console.error("Error getting stats:", error)
      return {
        totalDhikr: 0,
        dailyStreak: 0,
        lastCompletedDate: new Date().toISOString(),
        achievements: [],
        favorites: [],
        customDhikrs: [],
      }
    }
  }

  public saveStats(stats: UserStats) {
    try {
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats))
    } catch (error) {
      console.error("Error saving stats:", error)
    }
  }

  public getSettings(): AppSettings {
    try {
      const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS)
      return settings
        ? JSON.parse(settings)
        : {
            theme: "system",
            sound: true,
            soundType: "gentle-tap",
            hapticFeedback: true,
            autoBackup: true,
            backupFrequency: 30, // minutes
            notifications: true,
          }
    } catch (error) {
      console.error("Error getting settings:", error)
      return {
        theme: "system",
        sound: true,
        soundType: "gentle-tap",
        hapticFeedback: true,
        autoBackup: true,
        backupFrequency: 30,
        notifications: true,
      }
    }
  }

  public saveSettings(settings: AppSettings) {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings))
      if (settings.autoBackup) {
        this.startAutoBackup(settings.backupFrequency)
      } else {
        this.stopAutoBackup()
      }
    } catch (error) {
      console.error("Error saving settings:", error)
    }
  }

  public getCustomDhikrs(): DhikrItem[] {
    try {
      const customDhikrs = localStorage.getItem(STORAGE_KEYS.CUSTOM_DHIKRS)
      return customDhikrs ? JSON.parse(customDhikrs) : []
    } catch (error) {
      console.error("Error getting custom dhikrs:", error)
      return []
    }
  }

  public saveCustomDhikr(dhikr: DhikrItem) {
    try {
      const customDhikrs = this.getCustomDhikrs()
      customDhikrs.push(dhikr)
      localStorage.setItem(STORAGE_KEYS.CUSTOM_DHIKRS, JSON.stringify(customDhikrs))
    } catch (error) {
      console.error("Error saving custom dhikr:", error)
    }
  }

  public createBackup() {
    try {
      const backup = {
        stats: this.getStats(),
        settings: this.getSettings(),
        customDhikrs: this.getCustomDhikrs(),
        timestamp: new Date().toISOString(),
      }
      localStorage.setItem(STORAGE_KEYS.BACKUP, JSON.stringify(backup))
    } catch (error) {
      console.error("Error creating backup:", error)
    }
  }

  public restoreFromBackup() {
    try {
      const backup = localStorage.getItem(STORAGE_KEYS.BACKUP)
      if (backup) {
        const { stats, settings, customDhikrs } = JSON.parse(backup)
        this.saveStats(stats)
        this.saveSettings(settings)
        localStorage.setItem(STORAGE_KEYS.CUSTOM_DHIKRS, JSON.stringify(customDhikrs))
        return true
      }
      return false
    } catch (error) {
      console.error("Error restoring from backup:", error)
      return false
    }
  }

  public exportData(): string {
    try {
      const data = {
        stats: this.getStats(),
        settings: this.getSettings(),
        customDhikrs: this.getCustomDhikrs(),
        exportDate: new Date().toISOString(),
      }
      return JSON.stringify(data)
    } catch (error) {
      console.error("Error exporting data:", error)
      throw new Error("Failed to export data")
    }
  }

  public importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData)
      if (data.stats && data.settings && data.customDhikrs) {
        this.saveStats(data.stats)
        this.saveSettings(data.settings)
        localStorage.setItem(STORAGE_KEYS.CUSTOM_DHIKRS, JSON.stringify(data.customDhikrs))
        return true
      }
      return false
    } catch (error) {
      console.error("Error importing data:", error)
      return false
    }
  }
}

export const storageManager = StorageManager.getInstance()

