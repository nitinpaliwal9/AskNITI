"use client"

import { ShieldCheck } from "lucide-react"

export function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-3 w-full animate-in fade-in duration-700">
      <div className="flex flex-col gap-2 items-start">
        
        {/* The Main Response Bubble Skeleton */}
        <div className="relative overflow-hidden rounded-[1.2rem] rounded-tl-none px-5 py-5 bg-white border border-slate-100 shadow-sm w-full max-w-[85%] md:max-w-[75%]">
          
          {/* Header Shimmer: Identity */}
          <div className="flex items-center gap-2 mb-5 opacity-40">
            <ShieldCheck className="size-3.5 text-slate-300" />
            <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden relative">
               <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
          </div>

          {/* Body Shimmer: Text Lines */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="h-3 w-full bg-slate-100 rounded-full relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-slate-50/50 to-transparent" />
              </div>
              <div className="h-3 w-[92%] bg-slate-100 rounded-full relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-slate-50/50 to-transparent" />
              </div>
              <div className="h-3 w-[40%] bg-slate-100 rounded-full relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-slate-50/50 to-transparent" />
              </div>
            </div>
            
            {/* Source Cards Shimmer */}
            <div className="pt-4 flex flex-wrap gap-2 border-t border-slate-50">
              {[1, 2].map((i) => (
                <div 
                  key={i} 
                  className="h-8 w-24 bg-slate-50 border border-slate-100 rounded-lg relative overflow-hidden"
                >
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Small Timestamp Placeholder */}
        <div className="h-2 w-12 bg-slate-100 rounded-full ml-1 opacity-50" />
      </div>

      {/* Tailwind Custom Shimmer Animation (Added to globals.css or via style tag) */}
      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  )
}