"use client"

import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  ShieldCheck, 
  ChevronDown, 
  Languages, 
  ArrowLeft 
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const translations = {
  en: { verified: "Government Verified Data", lang: "English", code: "EN" },
  hi: { verified: "सरकारी सत्यापित डेटा", lang: "हिन्दी", code: "HI" },
}

type Language = "en" | "hi"

export function ChatHeader({
  language,
  onLanguageChange,
}: {
  language: Language
  onLanguageChange: (lang: Language) => void
}) {
  const t = translations[language]

  return (
    <header className="relative z-50 flex-shrink-0 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        
        {/* Left Section: Back + Logo + Identity */}
        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon" asChild className="md:hidden -ml-2 rounded-full">
            <Link href="/">
              <ArrowLeft className="size-5 text-slate-600" />
            </Link>
          </Button>

          <Link href="/" className="hidden md:block transition-transform hover:scale-105">
            <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-slate-100 bg-white shadow-sm">
              <Image 
                src="/askniti-logo.png" 
                alt="AskNITI" 
                fill 
                className="object-cover"
                priority
              />
            </div>
          </Link>

          <div className="flex flex-col">
            <h1 className="text-lg font-black leading-none text-[#0A192F] tracking-tight">
              Ask<span className="text-[#FF9933]">NITI</span>
            </h1>
            <Badge
              variant="secondary"
              className="mt-1 gap-1 bg-green-50 text-[#138808] border-green-100 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0"
            >
              <ShieldCheck className="size-3" />
              {t.verified}
            </Badge>
          </div>
        </div>

        {/* Right Section: Language Switcher */}
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 rounded-xl border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-bold h-9 px-3 shadow-sm transition-all active:scale-95"
              >
                <Languages className="size-4 text-[#FF9933]" />
                <span className="hidden sm:inline">{t.lang}</span>
                <span className="sm:hidden">{t.code}</span>
                <ChevronDown className="size-3 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32 rounded-xl border-slate-200 p-1 shadow-xl">
              <DropdownMenuItem 
                onClick={() => onLanguageChange("en")}
                className={`flex justify-between font-bold cursor-pointer rounded-lg ${language === 'en' ? 'bg-slate-100 text-[#0A192F]' : ''}`}
              >
                English <span className="text-[10px] opacity-40">EN</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onLanguageChange("hi")}
                className={`flex justify-between font-bold cursor-pointer rounded-lg ${language === 'hi' ? 'bg-slate-100 text-[#0A192F]' : ''}`}
              >
                हिन्दी <span className="text-[10px] opacity-40">HI</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Desktop Version Badge */}
          <div className="hidden lg:block px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
            v1.0-2026
          </div>
        </div>
      </div>
    </header>
  )
}