"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FileText, ExternalLink, ShieldCheck } from "lucide-react"

interface SourceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  source: {
    title: string
    page: number
    content: string
    url?: string 
  } | null
}

export function SourceModal({ open, onOpenChange, source }: SourceModalProps) {
  if (!source) return null

  const handleVerifyClick = () => {
    if (source.url) {
      window.open(source.url, "_blank", "noopener,noreferrer")
    } else {
      window.open("https://egazette.gov.in/", "_blank", "noopener,noreferrer")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white border-none rounded-[2rem] p-0 overflow-hidden shadow-2xl">
        {/* Header with Navy Branding */}
        <div className="bg-[#0A192F] px-6 py-5">
          <DialogHeader className="text-left">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="size-4 text-[#FF9933]" />
              <span className="text-[10px] font-black text-[#FF9933] uppercase tracking-[0.2em]">
                Verified Source | Page {source.page}
              </span>
            </div>
            <DialogTitle className="text-white text-lg font-bold leading-tight tracking-tight">
              {source.title}
            </DialogTitle>
            <DialogDescription className="sr-only">Official government document preview</DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 py-6 bg-slate-50/50">
          <div className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-inner">
            {/* The "Extract" Label */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
               <FileText className="size-4 text-[#138808]" />
               <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Document Extract</span>
            </div>

            {/* The Actual Content with a Saffron border accent */}
            <div className="relative">
              <p className="text-sm font-medium leading-relaxed text-[#0A192F] pl-4 border-l-4 border-[#FF9933] py-1 italic">
                "{source.content}"
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <Button 
              onClick={handleVerifyClick}
              className="w-full gap-2 rounded-xl bg-[#0A192F] text-white hover:bg-[#0A192F]/90 text-xs font-bold h-12 shadow-lg shadow-navy/20 transition-all active:scale-95"
            >
              <ExternalLink className="size-4" />
              Open Original Gazette PDF
            </Button>
            
            <div className="flex items-center justify-center gap-2">
                <span className="h-[1px] w-4 bg-slate-200"></span>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter text-center">
                    Cross-referenced via AskNITI Sovereign RAG
                </p>
                <span className="h-[1px] w-4 bg-slate-200"></span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}