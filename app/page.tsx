import TasbihCounter from "@/components/tasbih-counter"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-secondary/50 to-background bg-gradient-animate">
      <div className="max-w-md w-full">
        <TasbihCounter />
      </div>
    </main>
  )
}

