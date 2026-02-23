"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ShieldCheck, ChevronDown, Languages } from "lucide-react"

const translations = {
  en: { verified: "Government Verified Data", lang: "EN" },
  hi: { verified: "सरकारी सत्यापित डेटा", lang: "HI" },
}

type Language = "en" | "hi"

export function ChatHeader({
  language,
  onLanguageChange,
}: {
  language: Language
  onLanguageChange: (lang: Language) => void
}) {
  const [langOpen, setLangOpen] = useState(false)
  const t = translations[language]

  return (
    <header className="relative z-20 flex-shrink-0">
      {/* 1. Tricolor Accent Bar */}
      <div className="flex h-1 w-full shrink-0">
        <div className="h-full flex-1 bg-[#FF9933]" />
        <div className="h-full flex-1 bg-white" />
        <div className="h-full flex-1 bg-[#138808]" />
      </div>

      <div className="bg-card/95 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          
          {/* 2. Logo + Name (AskNITI) */}
          <div className="flex items-center gap-3">
            {/* Square Container: No rounded corners to ensure png full coverage */}
            <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden border border-border bg-white shadow-sm">
              <Image 
                src="/askniti-logo.png" 
                alt="AskNITI" 
                fill 
                className="object-cover"
                priority
              />
            </div>
            <div>
              <h1 className="text-lg font-black leading-none text-[#0A192F] tracking-tight">
                Ask<span className="text-[#FF9933]">NITI</span>
              </h1>
              <Badge
                variant="secondary"
                className="mt-1 gap-1 bg-green-50 text-[#138808] border-[#138808]/20 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0"
              >
                <ShieldCheck className="size-3" />
                {t.verified}
              </Badge>
            </div>
          </div>

          {/* 3. Language Switcher */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 rounded-xl border-border bg-card text-foreground hover:bg-secondary text-xs font-bold h-9 px-3 shadow-sm transition-all active:scale-95"
              onClick={() => setLangOpen(!langOpen)}
            >
              <Languages className="size-4 text-[#FF9933]" />
              {t.lang}
              <ChevronDown className={`size-3 opacity-60 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
            </Button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-32 rounded-xl border border-border bg-card shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100">
                <button
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-xs font-bold transition-colors ${
                    language === "en"
                      ? "bg-secondary text-[#0A192F]"
                      : "text-muted-foreground hover:bg-secondary/50"
                  }`}
                  onClick={() => {
                    onLanguageChange("en")
                    setLangOpen(false)
                  }}
                >
                  English
                  <span className="text-[10px] opacity-40">EN</span>
                </button>
                <button
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-xs font-bold transition-colors ${
                    language === "hi"
                      ? "bg-secondary text-[#0A192F]"
                      : "text-muted-foreground hover:bg-secondary/50"
                  }`}
                  onClick={() => {
                    onLanguageChange("hi")
                    setLangOpen(false)
                  }}
                >
                  हिन्दी
                  <span className="text-[10px] opacity-40">HI</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}