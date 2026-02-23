"use client"

export function Stats() {
  return (
    <section className="py-20 bg-[#0A192F] relative overflow-hidden">
      {/* Subtle Grid Pattern for Tech Feel */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
          
          {/* Language Support - Highlighting Inclusivity */}
          <div className="text-center group">
            <div className="text-6xl font-black text-[#FF9933] mb-3 transition-transform group-hover:scale-110">12+</div>
            <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.25em]">
              Bhashayein (Languages) Supported
            </p>
            <p className="text-[9px] text-slate-500 mt-2 font-medium">Powered by Bhashini</p>
          </div>
          
          {/* Document Count - Highlighting Data Authority */}
          <div className="text-center md:border-x border-white/10 group">
            <div className="text-6xl font-black text-white mb-3 transition-transform group-hover:scale-110">250+</div>
            <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.25em]">
              Sarkari Docs Indexed
            </p>
            <p className="text-[9px] text-slate-500 mt-2 font-medium">Verified Gazette & Policy PDFs</p>
          </div>
          
          {/* Tech Performance - Highlighting Speed */}
          <div className="text-center group">
            <div className="text-6xl font-black text-[#138808] mb-3 transition-transform group-hover:scale-110">&lt; 2s</div>
            <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.25em]">
              Super-Fast Response Time
            </p>
            <p className="text-[9px] text-slate-500 mt-2 font-medium">RAG Optimization Active</p>
          </div>

        </div>
      </div>
    </section>
  )
}