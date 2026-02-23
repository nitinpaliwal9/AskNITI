"use client"

import Link from "next/link"
import { Cpu, Mail, Github, Globe, Twitter, ExternalLink, Info, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#0A192F] text-slate-300 pt-16 pb-8 border-t-4 border-[#FF9933]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Mission */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Cpu className="text-[#FF9933] size-8" />
              <span className="text-2xl font-black text-white tracking-tight">
                Ask<span className="text-[#FF9933]">NITI</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6 font-medium text-slate-400">
              Bharat ka apna AI policy assistant. Helping citizens understand 
              complex government documents in simple language using advanced technology.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-2 bg-white/5 rounded-lg hover:bg-[#FF9933]/20 transition-colors"><Twitter size={18}/></Link>
              <Link href="#" className="p-2 bg-white/5 rounded-lg hover:bg-[#FF9933]/20 transition-colors"><Github size={18}/></Link>
              <Link href="#" className="p-2 bg-white/5 rounded-lg hover:bg-[#FF9933]/20 transition-colors"><Globe size={18}/></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Menu</h4>
            <ul className="space-y-4 text-sm font-semibold">
              <li><Link href="/chat" className="hover:text-[#FF9933] transition-colors">Puchiye AI Se</Link></li>
              <li><Link href="#features" className="hover:text-[#FF9933] transition-colors">Features</Link></li>
              <li><Link href="#faq" className="hover:text-[#FF9933] transition-colors">Common Questions</Link></li>
              <li><Link href="#" className="hover:text-[#FF9933] transition-colors opacity-50 cursor-not-allowed">Partner with us (Soon)</Link></li>
            </ul>
          </div>

          {/* External Official Resources */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Sarkari Links</h4>
            <ul className="space-y-4 text-sm font-semibold">
              <li>
                <Link href="https://www.india.gov.in" target="_blank" className="flex items-center gap-2 hover:text-[#FF9933] transition-colors">
                  National Portal of India <ExternalLink size={12}/>
                </Link>
              </li>
              <li>
                <Link href="https://egazette.gov.in" target="_blank" className="flex items-center gap-2 hover:text-[#FF9933] transition-colors">
                  e-Gazette Archives <ExternalLink size={12}/>
                </Link>
              </li>
              <li>
                <Link href="https://www.myscheme.gov.in" target="_blank" className="flex items-center gap-2 hover:text-[#FF9933] transition-colors">
                  myScheme Portal <ExternalLink size={12}/>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Disclaimer */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Connect</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 group">
                <Mail size={18} className="text-[#FF9933] shrink-0" />
                <span className="group-hover:text-white transition-colors cursor-pointer">support@askniti.in</span>
              </li>
              <li className="bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="flex items-center gap-2 text-[#FF9933] mb-2">
                  <Info size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-tighter">Information Disclaimer</span>
                </div>
                <p className="text-[10px] leading-normal text-slate-500 italic">
                  AskNITI is an independent citizen research tool. Not affiliated with the Govt. of India. 
                  Always check official sources for final verification.
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-4 items-center opacity-40 grayscale hover:grayscale-0 transition-all">
              <span className="text-[10px] font-bold tracking-widest uppercase">Bhashini Integrated</span>
              <span className="text-white/20">|</span>
              <span className="text-[10px] font-bold tracking-widest uppercase">Verified RAG Data</span>
          </div>
          <div className="text-center md:text-right">
            <p className="text-[11px] font-bold tracking-widest text-slate-500 uppercase flex items-center gap-1 justify-center md:justify-end">
              © {new Date().getFullYear()} AskNITI Project • Built with <Heart size={10} className="text-red-500 fill-red-500"/> for Bharat
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}