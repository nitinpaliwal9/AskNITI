"use client"
import { GraduationCap, Sprout, HeartPulse, Coins, BookOpenText } from "lucide-react"

const categories = [
  { name: "Shiksha (Education)", icon: <GraduationCap />, color: "bg-blue-600", count: "120+ Policy Docs" },
  { name: "Kheti (Agriculture)", icon: <Sprout />, color: "bg-green-600", count: "85+ Gazettes" },
  { name: "Swasthya (Health)", icon: <HeartPulse />, color: "bg-red-600", count: "60+ Notifications" },
  { name: "Vitta (Finance)", icon: <Coins />, color: "bg-amber-600", count: "150+ Circulars" },
]

export function SchemeSpotlight() {
  return (
    <section id="schemes" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BookOpenText className="size-6 text-[#FF9933]" />
              <h2 className="text-4xl font-black text-[#0A192F] tracking-tight">Policies & Schemes</h2>
            </div>
            <p className="text-slate-500 font-medium">AskNITI in sabhi fields ki sarkari jankari scan kar sakta hai</p>
          </div>
          <button className="text-[#FF9933] font-bold text-sm hover:underline flex items-center gap-1 transition-all">
            See All Indexed Data →
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <div key={i} className="group p-8 rounded-[2rem] border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-2xl transition-all cursor-pointer">
              <div className={`${cat.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-8 shadow-md transition-transform group-hover:rotate-6 group-hover:scale-110`}>
                {cat.icon}
              </div>
              <h3 className="font-bold text-[#0A192F] text-xl leading-tight mb-2">{cat.name}</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
                {cat.count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}