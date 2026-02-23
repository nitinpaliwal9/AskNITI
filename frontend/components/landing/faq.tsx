"use client"

import { HelpCircle, ChevronRight } from "lucide-react"

export function FAQ() {
  const faqs = [
    { 
      q: "Yeh jankari kahan se aati hai? (Where is the info from?)", 
      a: "AskNITI calculates answers using official data. Hum directly Government of India Gazettes, department circulars, aur official notifications se information fetch karte hain." 
    },
    { 
      q: "Kya main apni bhasha mein baat kar sakta hoon?", 
      a: "Bilkul! Bhashini integration ki wajah se aap English, Hindi, Marathi, aur 10+ regional languages mein text ya voice ke zariye sawal puch sakte hain." 
    },
    { 
      q: "How can I be sure the AI is telling the truth?", 
      a: "Transparency is key. Har answer ke saath hum ek 'Source Citation' dete hain. Aap uspar click karke wahi official PDF page dekh sakte hain jahan se AI ne answer dhoonda hai." 
    },
    { 
      q: "Is AskNITI free to use?", 
      a: "Yes, AskNITI is a free public research tool. Hamara goal Bharat ke citizens ko unke rights aur schemes ki sahi jankari dena hai bina kisi fees ke." 
    }
  ]

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="flex items-center justify-center gap-2 mb-4">
          <HelpCircle className="text-[#FF9933] size-6" />
          <span className="text-xs font-bold text-[#FF9933] uppercase tracking-[0.2em]">Sawal Jawab</span>
        </div>
        <h2 className="text-4xl font-black text-[#0A192F] text-center mb-12 tracking-tight">
          Common Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="group p-8 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <ChevronRight className="size-5 text-[#FF9933] group-hover:translate-x-1 transition-transform" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0A192F] mb-3 text-lg leading-tight">{f.q}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    {f.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Updated Support Email for askniti.in */}
        <div className="mt-12 text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Still have doubts? Reach out at <span className="text-[#0A192F]">support@askniti.in</span>
          </p>
        </div>
      </div>
    </section>
  )
}