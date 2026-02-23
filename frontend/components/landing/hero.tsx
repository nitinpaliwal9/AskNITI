"use client"
import Link from "next/link"
import { ShieldCheck, ArrowRight, BookOpen, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]">
      {/* 1. Tricolor Accent Bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 flex">
        <div className="h-full flex-1 bg-[#FF9933]" /> {/* Saffron */}
        <div className="h-full flex-1 bg-white" />
        <div className="h-full flex-1 bg-[#138808]" /> {/* India Green */}
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Compliance Tag: Clear and Simple */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-300 text-slate-700 text-[11px] font-bold mb-4 tracking-widest uppercase">
          <ShieldCheck className="size-3.5 text-navy" />
          Independent Citizen AI • Bhashini Integrated
        </div>
        
        {/* Simple Disclaimer in easy language */}
        <div className="flex justify-center items-center gap-2 text-[11px] text-slate-500 mb-8 font-medium">
          <Info className="size-3.5 text-navy/50" />
          <span><strong>AskNITI</strong> is a private tool. Not a government app, but built for the public.</span>
        </div>
        
        {/* Main Branding */}
        <h1 className="text-6xl md:text-9xl font-black text-navy leading-[1.1] mb-4">
          Ask<span className="text-saffron">NITI</span>
        </h1>
        
        <h2 className="text-xl md:text-2xl font-bold text-slate-700 mb-8 italic">
          "Sarkari Policy ab samajhna hua simple"
        </h2>

        {/* Easy to understand value prop */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-12 leading-relaxed">
          Sarkari Gazettes aur schemes ki jankari, ab seedhe AI se puchiye. 
          Get instant answers from <strong>Official Policy Docs</strong> in your own language. 
          No confusing jargon, just clear facts.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button asChild size="lg" className="h-16 px-10 text-lg rounded-xl bg-[#0A192F] hover:bg-navy/90 shadow-2xl shadow-navy/30 transition-all border-b-4 border-black active:border-b-0">
            <Link href="/chat" className="flex items-center gap-2">
              Start Asking Now <ArrowRight className="size-5" />
            </Link>
          </Button>
          
          <div className="flex flex-col items-start sm:items-center">
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
               Apni Bhasha Mein • PDF Verified • askniti.in
             </p>
          </div>
        </div>
      </div>

      {/* Background Icon - Switched to BookOpen to represent 'Policy/Vidhan' */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none">
        <BookOpen size={600} />
      </div>
    </section>
  )
}