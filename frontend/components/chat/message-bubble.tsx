"use client"

import { useEffect, useState } from "react"
import { ShieldCheck, Search, Database, FileSearch, PenTool, Sparkles, FileText, ChevronRight } from "lucide-react"
import Image from "next/image"
import ReactMarkdown from "react-markdown"

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  sources?: {
    id: number
    title: string
    page: number
    content: string
  }[]
}

function formatTime(date: Date) {
  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
}

const loadingStatuses = [
  { icon: <Search className="size-3" />, text: "Analyzing query parameters..." },
  { icon: <Database className="size-3" />, text: "Searching Government archives..." },
  { icon: <FileSearch className="size-3" />, text: "Scanning official gazettes..." },
  { icon: <ShieldCheck className="size-3" />, text: "Verifying eligibility criteria..." },
  { icon: <PenTool className="size-3" />, text: "Drafting verified response..." },
]

const govFacts = [
  "PM-Kisan provides ₹6,000 yearly to over 11 crore farmers.",
  "Ayushman Bharat is the world's largest health insurance scheme.",
  "Digital India has helped over 40 crore people join the banking system.",
  "The PM Awas Yojana has sanctioned over 1.2 crore houses for the poor.",
]

export function MessageBubble({
  message,
  onViewSource,
}: {
  message: Message
  onViewSource?: (source: any) => void
}) {
  const isUser = message.role === "user"
  const citationRegex = /\[(\d+)\]/g

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      <div className={`flex max-w-[95%] md:max-w-[85%] gap-2 md:gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        
        {/* Avatar */}
        <div className="flex-shrink-0 mt-1">
          <div className={`relative flex h-8 w-8 md:h-10 md:w-10 items-center justify-center border shadow-sm overflow-hidden rounded-lg ${
            isUser ? "bg-white border-slate-200" : "bg-white border-[#FF9933]/30"
          }`}>
            {isUser ? (
              <span className="text-[10px] font-black text-[#0A192F]">YOU</span>
            ) : (
              <Image src="/askniti-logo.png" alt="AskNITI" fill className="object-cover" priority />
            )}
          </div>
        </div>

        {/* Message Content */}
        <div className={`flex flex-col gap-1.5 ${isUser ? "items-end" : "items-start"} overflow-hidden`}>
          <div className={`rounded-2xl px-4 py-3 md:px-5 md:py-4 shadow-sm transition-all ${
            isUser 
              ? "bg-[#0A192F] text-white rounded-tr-none" 
              : "bg-white border border-slate-100 text-slate-800 rounded-tl-none relative shadow-md shadow-navy/5"
          }`}>
            {!isUser && (
              <div className="flex items-center gap-1.5 mb-3 border-b border-slate-50 pb-2">
                <ShieldCheck className="size-3 text-[#138808]" />
                <span className="text-[9px] font-black text-[#138808]/70 uppercase tracking-[0.15em]">
                  Verified Policy Intelligence
                </span>
              </div>
            )}

            {isUser ? (
              <p className="whitespace-pre-wrap text-[14px] md:text-sm font-medium leading-relaxed">{message.content}</p>
            ) : (
              <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-p:text-[#0A192F]/90 prose-strong:text-[#0A192F] prose-strong:font-bold">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => {
                      if (typeof children === 'string' || (Array.isArray(children) && children.every(c => typeof c === 'string'))) {
                        const content = Array.isArray(children) ? children.join('') : children as string;
                        const parts = content.split(citationRegex);
                        if (parts.length > 1) {
                          return (
                            <p className="mb-3 last:mb-0">
                              {parts.map((part, i) => {
                                if (i % 2 === 1) {
                                  const sourceId = parseInt(part);
                                  const source = message.sources?.find((s) => s.id === sourceId);
                                  return (
                                    <button
                                      key={i}
                                      onClick={(e) => { e.preventDefault(); if (source) onViewSource?.(source); }}
                                      className="mx-0.5 inline-flex h-4 w-4 items-center justify-center rounded bg-[#FF9933]/10 text-[9px] font-black text-[#FF9933] border border-[#FF9933]/20 hover:bg-[#FF9933] hover:text-white transition-all shadow-sm align-top mt-0.5"
                                    >
                                      {part}
                                    </button>
                                  );
                                }
                                return part;
                              })}
                            </p>
                          );
                        }
                      }
                      return <p className="mb-3 last:mb-0">{children}</p>;
                    },
                  }}
                >
                  {message.content}
                </ReactMarkdown>

                {/* Sources Section below content */}
                {!isUser && message.sources && message.sources.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 mb-3">
                      <FileText className="size-3 text-slate-400" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Document Sources</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {message.sources.map((source) => (
                        <button
                          key={source.id}
                          onClick={() => onViewSource?.(source)}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-[#FF9933]/30 hover:bg-white transition-all group"
                        >
                          <div className="flex h-4 w-4 items-center justify-center rounded bg-slate-200 text-[8px] font-black group-hover:bg-[#FF9933] group-hover:text-white transition-colors">
                            {source.id}
                          </div>
                          <span className="text-[10px] font-bold text-slate-600 truncate max-w-[120px]">
                            {source.title}
                          </span>
                          <ChevronRight className="size-2.5 text-slate-300 group-hover:text-[#FF9933]" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <span className="text-[9px] font-bold text-slate-400 px-2 uppercase tracking-tighter">
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    </div>
  )
}

export function TypingIndicator() {
  const [statusIdx, setStatusIdx] = useState(0)
  const [factIdx, setFactIdx] = useState(0)

  useEffect(() => {
    const statusTimer = setInterval(() => {
      setStatusIdx((prev) => (prev + 1) % loadingStatuses.length)
    }, 4000)
    
    const factTimer = setInterval(() => {
      setFactIdx((prev) => (prev + 1) % govFacts.length)
    }, 7000)

    return () => {
      clearInterval(statusTimer)
      clearInterval(factTimer)
    }
  }, [])

  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-500">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          <div className="relative h-9 w-9 border border-[#FF9933]/30 bg-white overflow-hidden rounded-lg shadow-sm">
             <Image src="/askniti-logo.png" alt="AskNITI" fill className="object-cover" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none px-5 py-4 shadow-md shadow-navy/5 min-w-[240px]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-[#FF9933] animate-bounce [animation-delay:-0.3s]" />
                <div className="h-1.5 w-1.5 rounded-full bg-[#0A192F] animate-bounce [animation-delay:-0.15s]" />
                <div className="h-1.5 w-1.5 rounded-full bg-[#138808] animate-bounce" />
              </div>
              
              <div className="flex items-center gap-2 overflow-hidden border-l border-slate-100 pl-4">
                <span className="text-[#138808]">
                  {loadingStatuses[statusIdx].icon}
                </span>
                <span className="text-[11px] font-black text-[#0A192F]/60 uppercase tracking-tight">
                  {loadingStatuses[statusIdx].text}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#FF9933]/5 border border-[#FF9933]/10 rounded-xl max-w-sm animate-in zoom-in-95 duration-700">
            <Sparkles className="size-3 text-[#FF9933] flex-shrink-0" />
            <div className="flex flex-col">
              <span className="font-black text-[#0A192F]/40 uppercase text-[8px] tracking-[0.1em]">Policy Insight</span>
              <p className="text-[10px] font-bold text-slate-600 leading-snug">
                {govFacts[factIdx]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}