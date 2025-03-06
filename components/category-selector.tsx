import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft } from "lucide-react"

interface CategorySelectorProps {
  categories: Array<{ id: string; arabicName: string }>
  selectedCategory: string
  onSelectCategory: (categoryId: string) => void
}

export function CategorySelector({ categories, selectedCategory, onSelectCategory }: CategorySelectorProps) {
  const currentIndex = categories.findIndex((c) => c.id === selectedCategory)

  return (
    <div className="flex items-center justify-between gap-2 mb-3">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          if (currentIndex > 0) {
            onSelectCategory(categories[currentIndex - 1].id)
          }
        }}
        className="h-8 w-8 shrink-0 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
        disabled={currentIndex === 0}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <div className="flex-1 text-center">
        <Button
          variant="ghost"
          onClick={() => onSelectCategory(selectedCategory)}
          className="w-full max-w-xs bg-emerald-50/50 dark:bg-emerald-900/20 hover:bg-emerald-100/50 dark:hover:bg-emerald-900/40 rounded-full border border-emerald-200/50 dark:border-emerald-800/50"
        >
          <span className="font-arabic text-base">{categories.find((c) => c.id === selectedCategory)?.arabicName}</span>
        </Button>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          if (currentIndex < categories.length - 1) {
            onSelectCategory(categories[currentIndex + 1].id)
          }
        }}
        className="h-8 w-8 shrink-0 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
        disabled={currentIndex === categories.length - 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
    </div>
  )
}

