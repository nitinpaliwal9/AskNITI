"use client"

import { ShieldCheck, Sparkles, BookOpen, Globe } from "lucide-react"
import Image from "next/image"

export function WelcomeScreen({ language }: { language: "en" | "hi" }) {
  const isHindi = language === "hi"

  const features = isHindi
    ? [
        { label: "सरकारी डेटा", icon: <ShieldCheck className="size-3" />, color: "bg-green-100 text-green-700" },
        { label: "800+ योजनाएं", icon: <BookOpen className="size-3" />, color: "bg-blue-100 text-blue-700" },
        { label: "अपनी भाषा में", icon: <Globe className="size-3" />, color: "bg-orange-100 text-orange-700" },
      ]
    : [
        { label: "Verified Data", icon: <ShieldCheck className="size-3" />, color: "bg-green-100 text-green-700" },
        { label: "800+ Schemes", icon: <BookOpen className="size-3" />, color: "bg-blue-100 text-blue-700" },
        { label: "12+ Languages", icon: <Globe className="size-3" />, color: "bg-orange-100 text-orange-700" },
      ]

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-in fade-in zoom-in-95 duration-700">
      
      {/* Brand Icon - Updated to Square Container for full Jan.png coverage */}
      <div className="relative mb-10">
        <div className="absolute inset-0 bg-[#FF9933]/20 rounded-full blur-3xl animate-pulse" />
        <div className="relative flex h-28 w-28 items-center justify-center bg-white shadow-2xl shadow-[#0A192F]/10 border border-slate-100 p-0 overflow-hidden transition-transform hover:scale-105">
          <Image 
            src="/askniti-logo.png" 
            alt="AskNITI Logo" 
            width={112} 
            height={112} 
            className="object-cover w-full h-full"
            priority
          />
        </div>
        <div className="absolute -bottom-3 -right-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#0A192F] shadow-lg border-2 border-white">
          <Sparkles className="size-5 text-[#FF9933]" />
        </div>
      </div>

      {/* Main Heading */}
      <h2 className="text-4xl font-black text-[#0A192F] mb-4 tracking-tight">
        {isHindi ? (
          <>Ask<span className="text-[#FF9933]">NITI</span> में आपका स्वागत है</>
        ) : (
          <>Welcome to Ask<span className="text-[#FF9933]">NITI</span></>
        )}
      </h2>

      {/* Description */}
      <p className="text-lg text-slate-500 max-w-lg leading-relaxed mb-12 font-medium">
        {isHindi
          ? "सरकारी योजनाओं को समझना अब हुआ आसान। अपनी भाषा में सवाल पूछें और सटीक जानकारी प्राप्त करें।"
          : "Understanding government schemes is now easier than ever. Ask in your own language and get precise, verified answers."}
      </p>

      {/* Feature Badges Grid */}
      <div className="flex flex-wrap justify-center gap-4">
        {features.map((f, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 px-5 py-3 rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md hover:border-[#0A192F]/20`}
          >
            <div className={`p-1.5 rounded-lg ${f.color.split(' ')[0]}`}>
              {f.icon}
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-[#0A192F]">
              {f.label}
            </span>
          </div>
        ))}
      </div>

      {/* Footer hint */}
      <div className="mt-16 flex items-center gap-4 text-slate-400">
        <div className="h-[1px] w-12 bg-slate-200" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">
          Bharat Ka Apna AI Policy Dost
        </span>
        <div className="h-[1px] w-12 bg-slate-200" />
      </div>
    </div>
  )
}