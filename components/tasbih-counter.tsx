// app/page.tsx
/*
 * Project: Digital Tasbih
 * Author: Mohamed Khire
 * Date: March 2025
 * Description: A digital tasbih app built with React and Next.js.
 * GitHub: https://github.com/mohamedkhire
 */

"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Heart, ChevronRight, ChevronLeft, Info, X, Gem, Star, Calendar, Award, Sparkles } from "lucide-react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { SoundSelector, type SoundOption } from "./sound-selector"
import { BorderPattern, GeometricPattern } from "./islamic-patterns"
import { ControlButtons } from "./control-buttons"
import { ThemeSwitcher } from "./theme-switcher"

const dhikrCategories = [
  {
    id: "tasbih",
    name: "Tasbih",
    arabicName: "التسبيح",
    description: "تسبيح وتحميد وتكبير",
    icon: Star,
  },
  {
    id: "morning-evening",
    name: "Morning & Evening",
    arabicName: "أذكار الصباح والمساء",
    description: "أذكار وأدعية الصباح والمساء المأثورة",
    icon: Calendar,
  },
  {
    id: "after-prayer",
    name: "After Prayer",
    arabicName: "أذكار بعد الصلاة",
    description: "الأذكار المسنونة بعد الصلوات المفروضة",
    icon: Award,
  },
  {
    id: "quran",
    name: "Quranic",
    arabicName: "أذكار قرآنية",
    description: "أذكار وأدعية من القرآن الكريم",
    icon: Sparkles,
  },
  {
    id: "istighfar",
    name: "Istighfar",
    arabicName: "الاستغفار",
    description: "صيغ الاستغفار المأثورة",
    icon: Heart,
  },
  {
    id: "prophetic-dua",
    name: "Prophetic Duas",
    arabicName: "الأدعية النبوية",
    description: "أدعية مأثورة عن النبي ﷺ",
    icon: Star,
  },
  {
    id: "special",
    name: "Special Occasions",
    arabicName: "مناسبات خاصة",
    description: "أذكار المناسبات والأوقات الخاصة",
    icon: Calendar,
  },
  {
    id: "protection",
    name: "Protection",
    arabicName: "الحماية",
    description: "أذكار للحماية من الشر",
    icon: Award,
  },
  {
    id: "daily-life",
    name: "Daily Life",
    arabicName: "الحياة اليومية",
    description: "أذكار للحياة اليومية",
    icon: Calendar,
  },
]

// Expanded Dhikr Categories
const dhikrList = [
  // Existing Tasbih
  {
    id: "tasbih-1",
    text: "سبحان الله وبحمده",
    arabicText: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    target: 100,
    category: "tasbih",
    time: "anytime",
    source: "صحيح البخاري",
    virtues: ["أحب الكلام إلى الله", "تحط الخطايا"],
  },
  {
    id: "tasbih-2",
    text: "سبحان الله العظيم",
    arabicText: "سُبْحَانَ اللَّهِ الْعَظِيمِ",
    target: 33,
    category: "tasbih",
    time: "anytime",
    source: "صحيح مسلم",
    virtues: ["ثقيلتان في الميزان", "حبيبتان إلى الرحمن"],
  },
  {
    id: "subhanallah",
    text: "سبحان الله",
    arabicText: "سُبْحَانَ اللَّهِ",
    target: 33,
    category: "tasbih",
    time: "anytime",
    source: "صحيح البخاري",
    virtues: ["تُغرَس له نخلة في الجنة"],
  },
  {
    id: "alhamdulillah",
    text: "الحمد لله",
    arabicText: "الْحَمْدُ لِلَّهِ",
    target: 33,
    category: "tasbih",
    time: "anytime",
    source: "صحيح البخاري",
    virtues: ["تملأ ميزان العبد بالحسنات"],
  },
  {
    id: "allahuakbar",
    text: "الله أكبر",
    arabicText: "اللَّهُ أَكْبَرُ",
    target: 34,
    category: "tasbih",
    time: "anytime",
    source: "صحيح البخاري",
    virtues: ["لا يتركن معهن شيء في الميزان"],
  },

  // Additional Tasbih Entries
  {
    id: "tasbih-3",
    text: "سبحان الله وبحمده، سبحان الله العظيم",
    arabicText: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ",
    target: 100,
    category: "tasbih",
    time: "anytime",
    source: "صحيح البخاري",
    virtues: ["ثقيل في الميزان", "محبوب عند الله"],
  },
  {
    id: "tasbih-4",
    text: "لا إله إلا الله وحده لا شريك له",
    arabicText: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
    target: 10,
    category: "tasbih",
    time: "anytime",
    source: "صحيح مسلم",
    virtues: ["توحيد الله", "عظيم الأجر"],
  },
  {
    id: "tasbih-5",
    text: "سبحانك اللهم وبحمدك",
    arabicText: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ",
    target: 33,
    category: "tasbih",
    time: "anytime",
    source: "سنن الترمذي",
    virtues: ["تنزيه الله", "محو الخطايا"],
  },

  // Existing Morning & Evening (unchanged, kept for context)
  {
    id: "morning-1",
    text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ",
    arabicText: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ",
    target: 1,
    category: "morning-evening",
    time: "morning",
    source: "صحيح مسلم",
    virtues: ["يبدأ يومك بذكر الله", "من أذكار النبي ﷺ الصباحية"],
  },
  {
    id: "morning-2",
    text: "اللَّهُمَّ بِكَ أَصْبَحْنَا",
    arabicText: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ",
    target: 1,
    category: "morning-evening",
    time: "morning",
    source: "الترمذي",
    virtues: ["تفويض الأمر لله", "طلب الحفظ والرعاية"],
  },
  {
    id: "evening-1",
    text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ",
    arabicText: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ",
    target: 1,
    category: "morning-evening",
    time: "evening",
    source: "صحيح مسلم",
    virtues: ["ختام يومك بذكر الله", "من أذكار النبي ﷺ المسائية"],
  },

  // Existing After Prayer (unchanged, kept for context)
  {
    id: "after-prayer-1",
    text: "أستغفر الله",
    arabicText: "أَسْتَغْفِرُ اللَّهَ (ثَلاثًا)",
    target: 3,
    category: "after-prayer",
    time: "after-prayer",
    source: "صحيح مسلم",
    virtues: ["تكفير الذنوب", "من سنن النبي ﷺ بعد الصلاة"],
  },
  {
    id: "after-prayer-2",
    text: "آية الكرسي",
    arabicText: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
    target: 1,
    category: "after-prayer",
    time: "after-prayer",
    source: "القرآن الكريم",
    virtues: ["حماية من الشيطان", "دخول الجنة"],
  },

  // Existing Quranic (unchanged, kept for context)
  {
    id: "quran-1",
    text: "حسبي الله لا إله إلا هو",
    arabicText: "حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ ۖ عَلَيْهِ تَوَكَّلْتُ ۖ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
    target: 7,
    category: "quran",
    time: "anytime",
    source: "سورة التوبة",
    virtues: ["كفاية الهموم", "تفريج الكرب"],
  },
  {
    id: "quran-2",
    text: "لا إله إلا أنت سبحانك",
    arabicText: "لَا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ",
    target: 3,
    category: "quran",
    time: "anytime",
    source: "سورة الأنبياء",
    virtues: ["دعاء الكرب", "إجابة الدعاء"],
  },
  {
    id: "lailahaillallah",
    text: "لا إله إلا الله",
    arabicText: "لَا إِلَٰهَ إِلَّا اللَّهُ",
    target: 100,
    category: "quran",
    time: "anytime",
    source: "صحيح البخاري",
    virtues: ["أفضل ما قلته أنا والنبيون من قبلي"],
  },

  // Existing Istighfar (unchanged, kept for context)
  {
    id: "istighfar-1",
    text: "أستغفر الله العظيم",
    arabicText: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ",
    target: 100,
    category: "istighfar",
    time: "anytime",
    source: "سنن الترمذي",
    virtues: ["محو الذنوب", "تفريج الهموم"],
  },
  {
    id: "istighfar-2",
    text: "سيد الاستغفار",
    arabicText: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ",
    target: 1,
    category: "istighfar",
    time: "anytime",
    source: "صحيح البخاري",
    virtues: ["سيد الاستغفار", "من قالها موقناً بها فمات دخل الجنة"],
  },
  {
    id: "astaghfirullah",
    text: "أستغفر الله",
    arabicText: "أَسْتَغْفِرُ اللَّهَ",
    target: 100,
    category: "istighfar",
    time: "anytime",
    source: "سنن الترمذي",
    virtues: ["من لزم الاستغفار جعل الله له من كل هم فرجا"],
  },

  // Existing Prophetic Duas (unchanged, kept for context)
  {
    id: "dua-1",
    text: "اللهم إني أسألك العفو والعافية",
    arabicText: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ",
    target: 3,
    category: "prophetic-dua",
    time: "anytime",
    source: "سنن ابن ماجه",
    virtues: ["طلب العافية", "من جوامع الدعاء"],
  },
  {
    id: "dua-2",
    text: "اللهم أعني على ذكرك",
    arabicText: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
    target: 3,
    category: "prophetic-dua",
    time: "anytime",
    source: "سنن أبي داود",
    virtues: ["معونة على الذكر", "معونة على العبادة"],
  },
  {
    id: "salawat",
    text: "اللهم صل على محمد",
    arabicText: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ",
    target: 100,
    category: "prophetic-dua",
    time: "anytime",
    source: "صحيح مسلم",
    virtues: ["من صلى علي واحدة صلى الله عليه بها عشرا"],
  },
  {
    id: "hawqala",
    text: "لا حول ولا قوة إلا بالله",
    arabicText: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    target: 100,
    category: "prophetic-dua",
    time: "anytime",
    source: "صحيح البخاري",
    virtues: ["كنز من كنوز الجنة"],
  },

  // Existing Special Occasions (unchanged, kept for context)
  {
    id: "special-1",
    text: "دعاء دخول رمضان",
    arabicText: "اللَّهُمَّ بَارِكْ لَنَا فِي رَجَبَ وَشَعْبَانَ وَبَلِّغْنَا رَمَضَانَ",
    target: 3,
    category: "special",
    time: "anytime",
    source: "المعجم الأوسط للطبراني",
    virtues: ["استقبال رمضان", "طلب البركة"],
  },
  {
    id: "special-2",
    text: "دعاء ليلة القدر",
    arabicText: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
    target: 3,
    category: "special",
    time: "anytime",
    source: "سنن الترمذي",
    virtues: ["دعاء ليلة القدر", "طلب العفو"],
  },

  // New Category: Protection
  {
    id: "protection-1",
    text: "أعوذ بكلمات الله التامات",
    arabicText: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    target: 3,
    category: "protection",
    time: "anytime",
    source: "صحيح مسلم",
    virtues: ["حماية من الشر", "وقاية من الحسد"],
  },
  {
    id: "protection-2",
    text: "بسم الله الذي لا يضر مع اسمه شيء",
    arabicText: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ",
    target: 3,
    category: "protection",
    time: "morning-evening",
    source: "سنن أبي داود",
    virtues: ["حفظ من الضرر", "ذكر يومي للحماية"],
  },
  {
    id: "protection-3",
    text: "المعوذتين",
    arabicText: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ وقُلْ أَعُوذُ بِرَبِّ النَّاسِ",
    target: 3,
    category: "protection",
    time: "anytime",
    source: "القرآن الكريم",
    virtues: ["حماية من السحر والعين", "سنة النبي ﷺ"],
  },

  // New Category: Daily Life
  {
    id: "daily-1",
    text: "دعاء دخول المنزل",
    arabicText: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلَجِ وَخَيْرَ الْمَخْرَجِ",
    target: 1,
    category: "daily-life",
    time: "entering-home",
    source: "سنن أبي داود",
    virtues: ["بركة الدخول", "طلب الخير"],
  },
  {
    id: "daily-2",
    text: "دعاء الخروج من المنزل",
    arabicText: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    target: 1,
    category: "daily-life",
    time: "leaving-home",
    source: "سنن الترمذي",
    virtues: ["حماية في الخروج", "كفاية الشر"],
  },
  {
    id: "daily-3",
    text: "دعاء الأكل",
    arabicText: "بِسْمِ اللَّهِ (وَإِنْ نَسِيتَ فَقُلْ: بِسْمِ اللَّهِ فِي أَوَّلِهِ وَآخِرِهِ)",
    target: 1,
    category: "daily-life",
    time: "before-eating",
    source: "سنن أبي داود",
    virtues: ["بركة الطعام", "شكر النعمة"],
  },
]

const soundOptions = [
  { id: "wooden-click", name: "Wooden Click", url: "/sounds/wooden-click.mp3" },
  { id: "soft-click", name: "Soft Click", url: "/sounds/soft-click.mp3" },
  { id: "ting", name: "Ting", url: "/sounds/ting.mp3" },
  { id: "bubble", name: "Bubble", url: "/sounds/bubble.mp3" },
  {
    id: "gentle-tap",
    name: "Gentle Tap",
    arabicName: "نقرة خفيفة",
    url: "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3",
    category: "soft",
  },
]

export default function TasbihCounter() {
  const [selectedCategory, setSelectedCategory] = useState<string>("tasbih")
  const [selectedDhikr, setSelectedDhikr] = useState<string>(dhikrList.find((d) => d.category === "tasbih")?.id || "")
  const [count, setCount] = useState<number>(0)
  const [dailyTotal, setDailyTotal] = useState<number>(0)
  const [totalDhikr, setTotalDhikr] = useState<number>(0)
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true)
  const [favorites, setFavorites] = useState<string[]>([])
  const [showReward, setShowReward] = useState<boolean>(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showCategoryItems, setShowCategoryItems] = useState(false)
  const [aboutDialogOpen, setAboutDialogOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [selectedSound, setSelectedSound] = useState<string>("gentle-tap")
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Sound handling
  const audioContextRef = useRef<AudioContext | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  // Initialize audio context
  useEffect(() => {
    try {
      const initAudio = () => {
        if (!audioContextRef.current) {
          audioContextRef.current = new AudioContext()
          gainNodeRef.current = audioContextRef.current.createGain()
          gainNodeRef.current.connect(audioContextRef.current.destination)
          gainNodeRef.current.gain.value = 0.2 // Lower volume for better experience
        }
      }

      // Initialize immediately
      initAudio()

      // Set default sound to نقرة خفيفة
      const defaultSound = {
        id: "gentle-tap",
        name: "Gentle Tap",
        arabicName: "نقرة خفيفة",
        url: "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3",
        category: "soft",
      }

      if (audioRef.current) {
        audioRef.current.src = defaultSound.url
        audioRef.current.volume = 0.3
      } else {
        audioRef.current = new Audio(defaultSound.url)
        audioRef.current.volume = 0.3
      }

      setSelectedSound(defaultSound.id)
      setIsSoundEnabled(true)
    } catch (error) {
      console.log("Audio not supported:", error)
    }
  }, [])

  // Create a more pleasant click sound
  const playClick = useCallback(() => {
    if (!isSoundEnabled || !audioContextRef.current || !gainNodeRef.current) return

    try {
      const time = audioContextRef.current.currentTime

      // Create oscillator for the main tone
      const osc = audioContextRef.current.createOscillator()
      osc.frequency.setValueAtTime(600, time)
      osc.frequency.exponentialRampToValueAtTime(400, time + 0.1)

      // Create gain node for envelope
      const gainNode = audioContextRef.current.createGain()
      gainNode.gain.setValueAtTime(0, time)
      gainNode.gain.linearRampToValueAtTime(0.3, time + 0.02)
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.1)

      // Connect nodes
      osc.connect(gainNode)
      gainNode.connect(gainNodeRef.current)

      // Start and stop
      osc.start(time)
      osc.stop(time + 0.1)
    } catch (error) {
      console.log("Error playing click:", error)
    }
  }, [isSoundEnabled])

  // Initialize audio with selected sound
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("tasbihData")
      if (savedData) {
        const data = JSON.parse(savedData)
        setSelectedSound(data.selectedSound || "gentle-tap")
      }

      // Initialize audio with selected sound
      const sound = soundOptions.find((s) => s.id === selectedSound)
      if (sound) {
        audioRef.current = new Audio(sound.url)
        audioRef.current.volume = 0.3
      }
    } catch (error) {
      console.error("Error initializing audio:", error)
    }
  }, [selectedSound])

  // Update sound when selection changes
  const handleSoundChange = useCallback((sound: SoundOption) => {
    setSelectedSound(sound.id)
    try {
      if (audioRef.current) {
        audioRef.current.src = sound.url
      } else {
        audioRef.current = new Audio(sound.url)
        audioRef.current.volume = 0.3
      }

      // Save sound preference
      const savedData = localStorage.getItem("tasbihData")
      const data = savedData ? JSON.parse(savedData) : {}
      data.selectedSound = sound.id
      localStorage.setItem("tasbihData", JSON.stringify(data))
    } catch (error) {
      console.error("Error changing sound:", error)
    }
  }, [])

  // Play sound effect
  const playSound = useCallback(() => {
    if (!isSoundEnabled || !audioRef.current) return

    try {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(console.error)
    } catch (error) {
      console.error("Error playing sound:", error)
    }
  }, [isSoundEnabled])

  // Load saved data
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("tasbihData")
      if (savedData) {
        const data = JSON.parse(savedData)
        setSelectedCategory(data.selectedCategory || "tasbih")

        // Make sure we have a valid dhikr ID
        const dhikrId = data.selectedDhikr || dhikrList.find((d) => d.category === "tasbih")?.id || ""
        setSelectedDhikr(dhikrId)

        // Set count from saved data or default to 0
        setCount(data.counts?.[dhikrId] || 0)
        setTotalDhikr(data.totalDhikr || 0)
        setFavorites(data.favorites || [])

        // Check if we need to reset daily total
        const lastSaved = new Date(data.lastSaved || 0)
        const today = new Date()
        if (lastSaved.toDateString() !== today.toDateString()) {
          setDailyTotal(0)
        } else {
          setDailyTotal(data.dailyTotal || 0)
        }
      }
    } catch (e) {
      console.log("Error loading saved data:", e)
    }
  }, [])

  // Save data
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("tasbihData")
      if (savedData) {
        const data = JSON.parse(savedData)
        setSelectedSound(data.selectedSound || "gentle-tap")
      }
    } catch (error) {
      console.error("Error initializing audio:", error)
    }
  }, [selectedSound])

  useEffect(() => {
    try {
      const savedData = localStorage.getItem("tasbihData")
      const existingData = savedData ? JSON.parse(savedData) : { counts: {} }

      const data = {
        ...existingData,
        selectedCategory,
        selectedDhikr,
        counts: {
          ...existingData.counts,
          [selectedDhikr]: count,
        },
        dailyTotal,
        totalDhikr,
        lastSaved: new Date().toISOString(),
        isSoundEnabled,
        favorites,
        selectedSound,
      }

      localStorage.setItem("tasbihData", JSON.stringify(data))
    } catch (e) {
      console.log("Error saving data:", e)
    }
  }, [selectedCategory, selectedDhikr, count, dailyTotal, totalDhikr, isSoundEnabled, favorites, selectedSound])

  const currentDhikr = dhikrList.find((d) => d.id === selectedDhikr) || dhikrList[0]
  const progress = Math.min((count / currentDhikr.target) * 100, 100)

  // Update handleIncrement to use new sound system
  const handleIncrement = useCallback(() => {
    if (isAnimating) return

    setCount((prev) => prev + 1)
    setDailyTotal((prev) => prev + 1)
    setTotalDhikr((prev) => prev + 1)
    setIsAnimating(true)

    playSound()

    setTimeout(() => setIsAnimating(false), 150)

    if (count + 1 === currentDhikr.target) {
      setShowReward(true)
      setTimeout(() => setShowReward(false), 3000)
    }
  }, [count, currentDhikr.target, isAnimating, playSound])

  const handleReset = useCallback(
    (e: React.MouseEvent) => {
      // Stop event propagation to prevent it from triggering parent elements
      e.stopPropagation()

      setCount(0)

      try {
        const savedData = localStorage.getItem("tasbihData")
        const data = savedData ? JSON.parse(savedData) : { counts: {} }
        data.counts = { ...data.counts, [selectedDhikr]: 0 }
        localStorage.setItem("tasbihData", JSON.stringify(data))
      } catch (e) {
        console.log("Error resetting count:", e)
      }
    },
    [selectedDhikr],
  )

  const handleDhikrChange = useCallback(
    (dhikrId: string) => {
      try {
        const savedData = localStorage.getItem("tasbihData")
        const data = savedData ? JSON.parse(savedData) : { counts: {} }

        // Save current count before changing
        data.counts = { ...data.counts, [selectedDhikr]: count }
        localStorage.setItem("tasbihData", JSON.stringify(data))

        // Update selected dhikr and load its count
        setSelectedDhikr(dhikrId)
        setCount(data.counts?.[dhikrId] || 0)
        setShowCategoryItems(false)
      } catch (e) {
        console.log("Error changing dhikr:", e)
        setSelectedDhikr(dhikrId)
        setCount(0)
      }
    },
    [selectedDhikr, count],
  )

  const toggleFavorite = useCallback(
    (e: React.MouseEvent) => {
      // Stop event propagation to prevent it from triggering parent elements
      e.stopPropagation()

      const newFavorites = favorites.includes(selectedDhikr)
        ? favorites.filter((id) => id !== selectedDhikr)
        : [...favorites, selectedDhikr]

      setFavorites(newFavorites)

      try {
        const savedData = localStorage.getItem("tasbihData")
        const data = savedData ? JSON.parse(savedData) : {}
        data.favorites = newFavorites
        localStorage.setItem("tasbihData", JSON.stringify(data))
      } catch (e) {
        console.log("Error saving favorites:", e)
      }
    },
    [favorites, selectedDhikr],
  )

  const toggleSound = useCallback((e: React.MouseEvent) => {
    // Stop event propagation
    e.stopPropagation()
    setIsSoundEnabled((prev) => !prev)
  }, [])

  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId)
    setShowCategoryItems(true)
  }, [])

  const resetDailyTotal = useCallback((e: React.MouseEvent) => {
    // Stop event propagation
    e.stopPropagation()

    setDailyTotal(0)
    try {
      const savedData = localStorage.getItem("tasbihData")
      const data = savedData ? JSON.parse(savedData) : {}
      data.dailyTotal = 0
      localStorage.setItem("tasbihData", JSON.stringify(data))
    } catch (e) {
      console.log("Error resetting daily total:", e)
    }
  }, [])

  return (
    <div className="max-w-md mx-auto px-4 w-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-primary font-arabic">المسبحة الإسلامية</h1>
          <p className="text-sm text-primary/70">ذكر الله يطمئن القلوب</p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={aboutDialogOpen} onOpenChange={setAboutDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 rounded-xl h-10 w-10">
                <Info className="h-5 w-5 text-primary" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle className="text-center mb-4 text-xl">عن التطبيق</DialogTitle>
                <div className="space-y-4 text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center">
                    <Gem className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-xl text-primary">المسبحة الإسلامية الرقمية</h3>
                  <p className="text-sm">تطبيق يساعدك على المداومة على ذكر الله وتسبيحه في كل وقت</p>
                  <div className="text-xs text-muted-foreground space-y-2">
                    <p>يحتوي على العديد من الأذكار والتسابيح المأثورة</p>
                    <p>
                      Made with 💚 by{" "}
                      <a
                        href="https://mohamedkhire.vercel.app/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary hover:underline"
                      >
                        Mohamed khire
                      </a>
                    </p>
                  </div>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <ThemeSwitcher />
        </div>
      </div>

      <Card className="relative shadow-2xl border-secondary/50 dark:border-secondary/50 overflow-hidden bg-gradient-to-br from-white via-emerald-50/30 to-white dark:from-gray-900/80 dark:via-emerald-900/20 dark:to-gray-900/80 backdrop-blur-sm rounded-3xl">
        <GeometricPattern />
        <BorderPattern />

        <CardContent className="p-6 space-y-6 relative z-10">
          {/* Category Selection */}
          <div className="relative">
            <div className="flex items-center justify-between gap-2 mb-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  const currentIndex = dhikrCategories.findIndex((c) => c.id === selectedCategory)
                  if (currentIndex > 0) {
                    setSelectedCategory(dhikrCategories[currentIndex - 1].id)
                    setShowCategoryItems(true)
                  }
                }}
                className="h-8 w-8 shrink-0 rounded-full hover:bg-secondary dark:hover:bg-emerald-900/20"
                disabled={dhikrCategories.findIndex((c) => c.id === selectedCategory) === 0}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              <div className="flex-1 text-center">
                <Button
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowCategoryItems(!showCategoryItems)
                  }}
                  className="w-full max-w-xs bg-secondary/50 dark:bg-emerald-900/20 hover:bg-secondary/50 dark:hover:bg-emerald-900/40 rounded-full border border-secondary/50 dark:border-emerald-800/50"
                >
                  <span className="font-arabic text-base">
                    {dhikrCategories.find((c) => c.id === selectedCategory)?.arabicName}
                  </span>
                </Button>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  const currentIndex = dhikrCategories.findIndex((c) => c.id === selectedCategory)
                  if (currentIndex < dhikrCategories.length - 1) {
                    setSelectedCategory(dhikrCategories[currentIndex + 1].id)
                    setShowCategoryItems(true)
                  }
                }}
                className="h-8 w-8 shrink-0 rounded-full hover:bg-secondary dark:hover:bg-emerald-900/20"
                disabled={dhikrCategories.findIndex((c) => c.id === selectedCategory) === dhikrCategories.length - 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>

            {/* Dhikr Items for Selected Category */}
            {showCategoryItems && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
                <div className="relative w-full max-w-lg bg-white/95 dark:bg-gray-900/95 border border-secondary/50 dark:border-secondary/50 rounded-2xl shadow-xl backdrop-blur-sm">
                  <div className="sticky top-0 z-20 flex items-center justify-between p-4 border-b border-secondary/50 dark:border-secondary/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-t-2xl">
                    <h2 className="text-lg font-bold text-primary">
                      {selectedCategory === "favorites"
                        ? "المفضلة"
                        : dhikrCategories.find((c) => c.id === selectedCategory)?.arabicName}
                    </h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowCategoryItems(false)}
                      className="rounded-full hover:bg-secondary dark:hover:bg-emerald-900/20"
                    >
                      <X className="h-4 w-4 text-primary" />
                    </Button>
                  </div>
                  <ScrollArea className="h-[60vh] p-4">
                    <div className="grid gap-2">
                      {dhikrList
                        .filter((dhikr) =>
                          selectedCategory === "favorites"
                            ? favorites.includes(dhikr.id)
                            : dhikr.category === selectedCategory,
                        )
                        .map((dhikr) => (
                          <Button
                            key={dhikr.id}
                            variant="ghost"
                            className={cn(
                              "w-full justify-between text-right h-auto py-4 px-4 transition-colors rounded-xl",
                              selectedDhikr === dhikr.id
                                ? "bg-primary/20 text-primary dark:text-primary hover:bg-primary/30"
                                : "hover:bg-primary/10",
                            )}
                            onClick={() => {
                              handleDhikrChange(dhikr.id)
                              setShowCategoryItems(false)
                            }}
                          >
                            <div className="flex flex-col items-start gap-2">
                              <span className="font-arabic text-lg">{dhikr.arabicText}</span>
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="text-xs bg-secondary/50 dark:bg-emerald-900/50">
                                  الهدف: {dhikr.target}
                                </Badge>
                                {dhikr.time && (
                                  <Badge
                                    variant="outline"
                                    className={cn(
                                      "text-xs",
                                      dhikr.time === "morning" && "bg-amber-500/10 text-amber-700 dark:text-amber-300",
                                      dhikr.time === "evening" &&
                                        "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
                                      dhikr.time === "after-prayer" && "bg-primary/10 text-primary dark:text-primary",
                                    )}
                                  >
                                    {dhikr.time === "morning" && "الصباح"}
                                    {dhikr.time === "evening" && "المساء"}
                                    {dhikr.time === "after-prayer" && "بعد الصلاة"}
                                    {dhikr.time === "anytime" && "أي وقت"}
                                  </Badge>
                                )}
                              </div>
                              {dhikr.source && (
                                <span className="text-xs text-primary/70 dark:text-primary/70">
                                  المصدر: {dhikr.source}
                                </span>
                              )}
                            </div>
                            {favorites.includes(dhikr.id) && (
                              <Heart className="w-4 h-4 text-primary fill-primary ml-2 shrink-0" />
                            )}
                          </Button>
                        ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            )}
          </div>

          {/* Current Dhikr Display */}
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-arabic text-primary">{currentDhikr.arabicText}</h2>
              {currentDhikr.source && (
                <p className="text-sm text-primary/70 dark:text-primary/70">المصدر: {currentDhikr.source}</p>
              )}
            </div>

            {currentDhikr.virtues && currentDhikr.virtues.length > 0 && (
              <div className="space-y-2">
                <Separator className="bg-secondary/50 dark:bg-secondary/50" />
                <div className="flex flex-wrap gap-2 justify-center">
                  {currentDhikr.virtues.map((virtue, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-secondary/50 dark:bg-emerald-900/50 text-primary border-secondary/50 dark:border-secondary/50"
                    >
                      {virtue}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-center items-center gap-4">
              <span className="text-sm text-primary/90 dark:text-primary/90">
                {count} / {currentDhikr.target}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFavorite}
                className="h-8 w-8 hover:bg-secondary dark:hover:bg-emerald-900/20 rounded-full z-10"
              >
                <Heart
                  className={`w-4 h-4 ${
                    favorites.includes(selectedDhikr) ? "fill-primary text-primary" : "text-primary/70"
                  }`}
                />
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full">
            <Progress
              value={progress}
              className="w-full h-3 bg-primary/30 dark:bg-primary/30 rounded-full overflow-hidden border border-secondary/20 dark:border-secondary/20"
            />
            <div className="mt-2 text-sm text-center text-primary/90 dark:text-primary/90">
              {Math.round(progress)}% مكتمل
            </div>
          </div>

          {/* Counter Button */}
          <div className="flex justify-center">
            <button
              onClick={handleIncrement}
              className={cn(
                "relative w-44 h-44 rounded-full",
                "bg-gradient-to-br from-primary via-primary to-primary",
                "text-white flex items-center justify-center",
                "shadow-[0_0_40px_rgba(16,185,129,0.2)] dark:shadow-[0_0_40px_rgba(16,185,129,0.1)]",
                "transition-all duration-150",
                "focus:outline-none focus:ring-4 focus:ring-primary/30",
                isAnimating ? "scale-95" : "hover:scale-105",
                "dark:from-primary dark:via-primary dark:to-primary",
                "z-10",
              )}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
              <div className="relative flex flex-col items-center gap-1">
                <span className="text-5xl font-bold">{count}</span>
                <span className="text-sm opacity-80">/ {currentDhikr.target}</span>
              </div>
              {isAnimating && <span className="absolute inset-0 rounded-full bg-white/30 animate-ping" />}
            </button>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center gap-6">
            <ControlButtons isSoundEnabled={isSoundEnabled} toggleSound={toggleSound} handleReset={handleReset} />

            {/* Sound Selector */}
            {isSoundEnabled && <SoundSelector selectedSound={selectedSound} onSelectSound={handleSoundChange} />}
          </div>

          {/* Daily Total */}
          <div className="flex items-center justify-center gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/20">
            <div className="text-center">
              <span className="block text-sm text-primary/90">إجمالي اليوم</span>
              <span className="block text-2xl font-bold text-primary">{dailyTotal}</span>
            </div>
            <Separator orientation="vertical" className="h-8 bg-primary/20" />
            <Button
              variant="ghost"
              size="sm"
              onClick={resetDailyTotal}
              className="h-8 px-3 text-xs hover:bg-primary/10 text-primary rounded-xl"
            >
              إعادة تعيين
            </Button>
          </div>

          {/* Reward Notification */}
          {showReward && currentDhikr.virtues && (
            <div className="fixed bottom-4 right-4 left-4 p-6 bg-primary/95 dark:bg-primary/95 border border-secondary/50 dark:border-secondary/50 rounded-2xl shadow-2xl animate-slide-up backdrop-blur-sm z-50 max-w-md mx-auto">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary">أكملت {currentDhikr.target} مرة!</h3>
                  <p className="text-sm text-primary/90 dark:text-primary/90">{currentDhikr.virtues[0]}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

