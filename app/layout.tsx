import type React from "react"
import { Providers } from "./providers"
import { Amiri, Scheherazade_New } from "next/font/google"
import "./globals.css"

import { TooltipProvider } from "@/components/ui/tooltip"

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-amiri",
})

const scheherazade = Scheherazade_New({
  weight: ["400", "700"],
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-scheherazade",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning className={`${amiri.variable} ${scheherazade.variable}`}>
      <head>
        <title>المسبحة الإسلامية الرقمية</title>
        <meta name="description" content="تطبيق المسبحة الرقمية للتسبيح والذكر - سبح بسهولة وحافظ على أذكارك اليومية" />
        <meta name="theme-color" content="#4CAF50" />
        <link rel="icon" href="/tasbih.png" />
      </head>
      <body>
        <Providers>
          <TooltipProvider>{children}</TooltipProvider>
        </Providers>
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
