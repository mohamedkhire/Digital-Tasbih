"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Star } from "lucide-react"

type DhikrItem = {
  id: string
  text: string
  arabicText: string
  target: number
  category: string
  reward?: string
}

type DhikrCategoriesProps = {
  dhikrList: DhikrItem[]
  selectedDhikr: string
  favorites: string[]
  onSelectDhikr: (id: string) => void
}

export function DhikrCategories({ dhikrList, selectedDhikr, favorites, onSelectDhikr }: DhikrCategoriesProps) {
  const [activeTab, setActiveTab] = useState<string>("all")

  // Group dhikr by categories
  const categories = dhikrList.reduce(
    (acc, dhikr) => {
      if (!acc[dhikr.category]) {
        acc[dhikr.category] = []
      }
      acc[dhikr.category].push(dhikr)
      return acc
    },
    {} as Record<string, DhikrItem[]>,
  )

  // Add "all" and "favorites" categories
  const allCategories = {
    all: dhikrList,
    المفضلة: dhikrList.filter((dhikr) => favorites.includes(dhikr.id)),
    ...categories,
  }

  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <ScrollArea className="w-full max-w-[calc(100vw-3rem)]">
        <TabsList className="flex w-full h-auto p-1 bg-emerald-50/50 dark:bg-emerald-900/20 backdrop-blur-sm border border-emerald-500/20 rounded-lg mb-2">
          <TabsTrigger
            value="all"
            className="flex-1 data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-700 dark:data-[state=active]:text-emerald-300 rounded-md"
          >
            الكل
          </TabsTrigger>
          <TabsTrigger
            value="المفضلة"
            className="flex-1 data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-700 dark:data-[state=active]:text-emerald-300 rounded-md"
          >
            المفضلة
          </TabsTrigger>
          {Object.keys(categories).map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="flex-1 data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-700 dark:data-[state=active]:text-emerald-300 rounded-md whitespace-nowrap"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </ScrollArea>

      {Object.entries(allCategories).map(([category, items]) => (
        <TabsContent key={category} value={category} className="mt-0">
          <ScrollArea className="h-48 rounded-md border border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-900/20 backdrop-blur-sm p-2">
            <div className="grid gap-1">
              {items.map((dhikr) => (
                <Button
                  key={dhikr.id}
                  variant="ghost"
                  className={`w-full justify-between text-right h-auto py-3 px-4 ${
                    selectedDhikr === dhikr.id
                      ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
                      : ""
                  } hover:bg-emerald-500/10`}
                  onClick={() => onSelectDhikr(dhikr.id)}
                >
                  <div className="flex flex-col items-start gap-1">
                    <span className="font-arabic text-base">{dhikr.arabicText}</span>
                    <span className="text-xs text-emerald-600/70 dark:text-emerald-400/70">الهدف: {dhikr.target}</span>
                  </div>
                  {favorites.includes(dhikr.id) && (
                    <Star className="w-4 h-4 text-emerald-500 fill-emerald-500 ml-2 shrink-0" />
                  )}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      ))}
    </Tabs>
  )
}

