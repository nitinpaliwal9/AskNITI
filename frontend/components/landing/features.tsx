"use client"
import { Zap, ShieldCheck, Globe, Lock, Search, FileSearch } from "lucide-react"

const features = [
  {
    title: "Sarkari Proof ke Saath", // Hinglish flavor
    description: "Every answer is cross-checked with the latest Gazette of India and official policy PDFs. We provide direct citations so you can trust the facts.",
    icon: <FileSearch className="text-[#FF9933] size-6" />,
    className: "md:col-span-2 bg-[#0A192F] text-white",
    pattern: "opacity-10"
  },
  {
    title: "Super-Fast Logic",
    description: "Complex rules? No problem. AskNITI scans thousands of pages instantly to tell you exactly if you are eligible for a scheme.",
    icon: <Zap className="text-[#0A192F] size-6" />,
    className: "bg-[#FF9933]/10 border-[#FF9933]/20",
    pattern: "opacity-5"
  },
  {
    title: "Bhashini Integrated",
    description: "Language is no longer a barrier. Talk to AskNITI in Hindi, English, or 10+ regional languages. Hum aapki bhasha samajhte hain.",
    icon: <Globe className="text-[#0A192F] size-6" />,
    className: "bg-white border-slate-200",
    pattern: "opacity-5"
  },
  {
    title: "Aapki Privacy, Hamari Zimmedari", // Hinglish for trust
    description: "Your data is encrypted and safe. We prioritize your privacy so you can ask about schemes and eligibility without any worry.",
    icon: <Lock className="text-[#0A192F] size-6" />,
    className: "md:col-span-2 bg-slate-50 border-slate-200",
    pattern: "opacity-5"
  }
]

export function Features() {
  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-16">
          <div className="h-1.5 w-16 bg-[#FF9933] mb-6 rounded-full" />
          <h2 className="text-4xl md:text-5xl font-black text-[#0A192F] text-center mb-4 tracking-tight">
            Policies Made Simple
          </h2>
          <p className="text-slate-500 text-center max-w-2xl font-medium text-lg">
            AskNITI uses smart AI to translate complex government files into 
            simple answers that every citizen can understand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div 
              key={i} 
              className={`relative overflow-hidden p-8 rounded-[2.5rem] border transition-all duration-300 hover:shadow-2xl group ${f.className}`}
            >
              {/* Mandala Pattern - Gives that premium Indian feel */}
              <div className={`absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/mandala.png')] pointer-events-none ${f.pattern}`} />
              
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-sm bg-white`}>
                  {f.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{f.title}</h3>
                <p className={`text-base leading-relaxed ${f.className.includes('bg-[#0A192F]') ? 'text-slate-300' : 'text-slate-600'}`}>
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}