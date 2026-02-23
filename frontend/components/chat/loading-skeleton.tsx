"use client"

import { ShieldCheck } from "lucide-react"

export function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-3 w-full animate-in fade-in duration-500">
      <div className="flex flex-col gap-1.5 items-start">
        <div className="rounded-[1.2rem] rounded-tl-none px-5 py-4 bg-white border border-slate-100 shadow-md shadow-navy/5 w-full max-w-[85%] md:max-w-[70%]">
          
          {/* Header shimmer */}
          <div className="flex items-center gap-1.5 mb-4 border-b border-slate-50 pb-2">
            <ShieldCheck className="size-3 text-slate-200" />
            <div className="h-2 w-24 bg-slate-100 rounded-full animate-pulse" />
          </div>

          {/* Body shimmers */}
          <div className="space-y-3">
            <div className="h-3 w-[90%] bg-slate-100 rounded-full animate-pulse" />
            <div className="h-3 w-[95%] bg-slate-100 rounded-full animate-pulse [animation-delay:200ms]" />
            <div className="h-3 w-[70%] bg-slate-100 rounded-full animate-pulse [animation-delay:400ms]" />
            
            <div className="pt-2 flex gap-2">
              <div className="h-6 w-16 bg-slate-50 border border-slate-100 rounded-md animate-pulse" />
              <div className="h-6 w-16 bg-slate-50 border border-slate-100 rounded-md animate-pulse [animation-delay:150ms]" />
            </div>
          </div>
        </div>
        
        {/* Timestamp shimmer */}
        <div className="h-2 w-10 bg-slate-100 rounded-full ml-2" />
      </div>
    </div>
  )
}