"use client"

import { ShieldCheck, Sparkles, BookOpen, Globe } from "lucide-react"
import Image from "next/image"

export function WelcomeScreen({ language }: { language: "en" | "hi" }) {
  const isHindi = language === "hi"

  const features = isHindi
    ? [
        { label: "सत्यापित डेटा", icon: <ShieldCheck className="size-4" />, color: "text-[#138808] bg-green-50" },
        { label: "800+ योजनाएं", icon: <BookOpen className="size-4" />, color: "text-[#0A192F] bg-slate-100" },
        { label: "अपनी भाषा में", icon: <Globe className="size-4" />, color: "text-[#FF9933] bg-orange-50" },
      ]
    : [
        { label: "Verified Data", icon: <ShieldCheck className="size-4" />, color: "text-[#138808] bg-green-50" },
        { label: "800+ Schemes", icon: <BookOpen className="size-4" />, color: "text-[#0A192F] bg-slate-100" },
        { label: "Local Support", icon: <Globe className="size-4" />, color: "text-[#FF9933] bg-orange-50" },
      ]

  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-20 px-6 text-center animate-in fade-in zoom-in-95 duration-1000">
      
      {/* Brand Icon - Enhanced with Glow */}
      <div className="relative mb-8 md:mb-12">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF9933]/20 via-white to-[#138808]/20 rounded-full blur-3xl animate-pulse" />
        <div className="relative flex h-24 w-24 md:h-28 md:w-28 items-center justify-center bg-white shadow-2xl shadow-navy/10 border border-slate-100 rounded-2xl p-0 overflow-hidden transition-all hover:scale-105 active:scale-95 duration-500">
          <Image 
            src="/askniti-logo.png" 
            alt="AskNITI Logo" 
            width={112} 
            height={112} 
            className="object-cover w-full h-full"
            priority
          />
        </div>
        <div className="absolute -bottom-3 -right-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#0A192F] shadow-lg border-2 border-white animate-bounce [animation-iteration-count:2]">
          <Sparkles className="size-5 text-[#FF9933]" />
        </div>
      </div>

      {/* Main Heading */}
      <h2 className="text-3xl md:text-5xl font-black text-[#0A192F] mb-4 tracking-tighter">
        {isHindi ? (
          <>Ask<span className="text-[#FF9933]">NITI</span> में आपका स्वागत है</>
        ) : (
          <>Welcome to Ask<span className="text-[#FF9933]">NITI</span></>
        )}
      </h2>

      {/* Description */}
      <p className="text-base md:text-lg text-slate-500 max-w-lg leading-relaxed mb-10 md:mb-14 font-semibold px-2">
        {isHindi
          ? "सरकारी नीतियों और योजनाओं को समझना अब हुआ आसान। अपनी भाषा में सवाल पूछें और सटीक, आधिकारिक उत्तर प्राप्त करें।"
          : "Demystifying government policies and schemes. Ask in your preferred language and get precise, verified answers from official archives."}
      </p>

      {/* Feature Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 w-full max-w-2xl">
        {features.map((f, i) => (
          <div
            key={i}
            className="flex items-center sm:flex-col sm:justify-center gap-3 px-5 py-4 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm transition-all hover:shadow-md hover:border-[#FF9933]/30 group"
          >
            <div className={`p-2.5 rounded-xl ${f.color} transition-transform group-hover:scale-110 duration-300`}>
              {f.icon}
            </div>
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] text-[#0A192F]">
              {f.label}
            </span>
          </div>
        ))}
      </div>

      {/* Footer hint */}
      <div className="mt-16 md:mt-24 flex items-center gap-4 text-slate-300">
        <div className="h-[1px] w-8 md:w-12 bg-slate-200" />
        <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
          {isHindi ? "भारत का अपना एआई नीति मार्गदर्शक" : "Bharat's Sovereign Policy AI"}
        </span>
        <div className="h-[1px] w-8 md:w-12 bg-slate-200" />
      </div>
    </div>
  )
}