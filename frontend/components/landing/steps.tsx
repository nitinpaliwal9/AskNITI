"use client"
import { MessageSquareText, Search, CircleCheckBig } from "lucide-react"

export function Steps() {
  const steps = [
    { 
      icon: <MessageSquareText className="size-7" />, 
      label: "Sawal Puchiye", // Ask Questions
      desc: "Apni bhasha mein sawal puchiye—chahe voice ho ya text." 
    },
    { 
      icon: <Search className="size-7" />, 
      label: "AI Smart Search", 
      desc: "AskNITI scans thousands of official gazettes and policy docs instantly." 
    },
    { 
      icon: <CircleCheckBig className="size-7" />, 
      label: "Sahi Jawab", // Correct Answer
      desc: "Get precise answers with direct links to official PDF sources." 
    }
  ]

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center max-w-xs mx-auto group relative z-10">
              
              {/* Step Number Badge */}
              <div className="absolute -top-4 -left-2 w-8 h-8 rounded-full bg-[#FF9933] text-white text-xs font-black flex items-center justify-center shadow-lg z-20">
                0{i + 1}
              </div>

              {/* Icon Container */}
              <div className="w-20 h-20 rounded-[1.5rem] bg-white shadow-xl shadow-navy/5 flex items-center justify-center text-[#0A192F] mb-6 group-hover:scale-110 group-hover:bg-[#0A192F] group-hover:text-white transition-all duration-500 border border-slate-100">
                {s.icon}
              </div>
              
              {/* Text Content */}
              <h4 className="text-2xl font-black text-[#0A192F] mb-3 tracking-tight">{s.label}</h4>
              <p className="text-sm text-slate-500 font-bold leading-relaxed px-4">{s.desc}</p>
              
              {/* Connector Line for Desktop - Optimized with Saffron gradient */}
              {i < 2 && (
                <div className="hidden md:block absolute top-10 left-[70%] w-full h-[3px] bg-gradient-to-r from-[#FF9933]/30 via-[#FF9933]/10 to-transparent -z-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}