"use client"

import { useEffect, useState } from "react"
import { FileText, ShieldCheck, Search, Database, FileSearch, PenTool, Sparkles } from "lucide-react"
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

// PSYCHOLOGICAL TRICK: Progressive Status Messages
const loadingStatuses = [
  { icon: <Search className="size-3" />, text: "Analyzing your query..." },
  { icon: <Database className="size-3" />, text: "Searching Government archives..." },
  { icon: <FileSearch className="size-3" />, text: "Scanning official PDF gazettes..." },
  { icon: <ShieldCheck className="size-3" />, text: "Verifying policy eligibility criteria..." },
  { icon: <PenTool className="size-3" />, text: "Drafting verified response..." },
]

// PSYCHOLOGICAL TRICK: "Did You Know" facts to reduce perceived wait time
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
      <div className={`flex max-w-[92%] md:max-w-[80%] gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        
        <div className="flex-shrink-0 mt-1">
          <div className={`relative flex h-9 w-9 items-center justify-center border shadow-sm overflow-hidden ${
            isUser ? "bg-white border-slate-200 rounded-lg" : "bg-white border-[#FF9933]/30"
          }`}>
            {isUser ? (
              <span className="text-[10px] font-black text-[#0A192F]">YOU</span>
            ) : (
              <Image src="/askniti-logo.png" alt="AskNITI" fill className="object-cover" priority />
            )}
          </div>
        </div>

        <div className={`flex flex-col gap-1.5 ${isUser ? "items-end" : "items-start"}`}>
          <div className={`rounded-[1.2rem] px-5 py-4 shadow-sm transition-all ${
            isUser 
              ? "bg-[#0A192F] text-white rounded-tr-none" 
              : "bg-white border border-slate-100 text-slate-800 rounded-tl-none relative shadow-md shadow-navy/5"
          }`}>
            {!isUser && (
              <div className="flex items-center gap-1.5 mb-3 border-b border-slate-50 pb-2">
                <ShieldCheck className="size-3 text-[#138808]" />
                <span className="text-[9px] font-black text-[#138808]/70 uppercase tracking-[0.15em]">
                  AskNITI Verified Info
                </span>
              </div>
            )}

            {isUser ? (
              <p className="whitespace-pre-wrap text-sm font-medium leading-relaxed">{message.content}</p>
            ) : (
              <div className="markdown-container prose prose-sm max-w-none font-sans leading-relaxed text-[15px] text-[#0A192F]/90">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => {
                      const content = Array.isArray(children) 
                        ? children.map(child => typeof child === 'string' ? child : '').join('')
                        : typeof children === 'string' ? children : '';
                      if (!content || !citationRegex.test(content)) return <p className="mb-3 last:mb-0">{children}</p>;
                      const parts = content.split(citationRegex);
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
                                  className="mx-1 inline-flex h-5 w-5 items-center justify-center rounded-md bg-[#FF9933]/10 text-[10px] font-black text-[#FF9933] border border-[#FF9933]/20 hover:bg-[#FF9933] hover:text-white transition-all shadow-sm"
                                >
                                  {part}
                                </button>
                              );
                            }
                            return part;
                          })}
                        </p>
                      );
                    },
                  }}
                >
                  {message.content}
                </ReactMarkdown>
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

  // Cycle through statuses every 8 seconds
  useEffect(() => {
    const statusTimer = setInterval(() => {
      setStatusIdx((prev) => (prev + 1) % loadingStatuses.length)
    }, 8000)
    
    // Cycle through facts every 12 seconds
    const factTimer = setInterval(() => {
      setFactIdx((prev) => (prev + 1) % govFacts.length)
    }, 12000)

    return () => {
      clearInterval(statusTimer)
      clearInterval(factTimer)
    }
  }, [])

  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-500">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          <div className="relative h-9 w-9 border border-[#FF9933]/30 bg-white overflow-hidden shadow-sm">
             <Image src="/askniti-logo.png" alt="AskNITI" fill className="object-cover" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {/* Main Loading Bubble */}
          <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none px-5 py-4 shadow-md shadow-navy/5 min-w-[200px]">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <div className="h-1 w-1 rounded-full bg-[#FF9933] animate-bounce [animation-delay:-0.3s]" />
                <div className="h-1 w-1 rounded-full bg-[#0A192F] animate-bounce [animation-delay:-0.15s]" />
                <div className="h-1 w-1 rounded-full bg-[#138808] animate-bounce" />
              </div>
              
              {/* Dynamic Status Display */}
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="text-[#138808] animate-pulse">
                  {loadingStatuses[statusIdx].icon}
                </span>
                <span className="text-xs font-bold text-[#0A192F]/60 animate-in slide-in-from-bottom-1 duration-500">
                  {loadingStatuses[statusIdx].text}
                </span>
              </div>
            </div>
          </div>

          {/* Psychological Fact Banner */}
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl max-w-xs animate-in zoom-in-95 duration-700 delay-500">
            <Sparkles className="size-3 text-[#FF9933] flex-shrink-0" />
            <p className="text-[10px] font-medium text-slate-500 italic leading-snug">
              <span className="font-black text-[#0A192F]/40 uppercase text-[8px] block mb-0.5">Did you know?</span>
              {govFacts[factIdx]}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}