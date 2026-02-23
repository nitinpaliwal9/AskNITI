"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShieldCheck, Info, Loader2 } from "lucide-react"
import { ChatInput } from "@/components/chat/chat-input"
import {
  MessageBubble,
  TypingIndicator,
  type Message,
} from "@/components/chat/message-bubble"
import { LoadingSkeleton } from "@/components/chat/loading-skeleton"
import { SourceModal } from "@/components/chat/source-modal"
import { WelcomeScreen } from "@/components/chat/welcome-screen"

type Language = "en" | "hi"

export default function AskNitiChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [progress, setProgress] = useState(0) 
  const [language, setLanguage] = useState<Language>("en")
  const [sourceModalOpen, setSourceModalOpen] = useState(false)
  const [selectedSource, setSelectedSource] = useState<any>(null)
  
  const chatEndRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLElement>(null)
  const isAtBottom = useRef(true)

  // Detect if user has scrolled away from bottom
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current
    if (container) {
      const threshold = 100 
      const distanceToBottom = container.scrollHeight - container.scrollTop - container.clientHeight
      isAtBottom.current = distanceToBottom <= threshold
    }
  }, [])

  const scrollToBottom = useCallback((force = false) => {
    if (force || isAtBottom.current) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // Progress Bar Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTyping) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 90) return prev + 2; // Slower, more realistic progress
          return prev;
        });
      }, 150);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isTyping]);

  async function handleSend(content: string) {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)
    setProgress(10)
    
    // Force scroll to bottom immediately after user sends
    setTimeout(() => scrollToBottom(true), 100)

    const aiMessageId = `ai-${Date.now()}`
    let accumulatedContent = ""
    
    try {
      // Points to your Localtunnel or Render backend
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
      
      const response = await fetch(`${backendUrl}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
      })

      if (!response.ok) throw new Error("Backend connection failed")

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) return

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split("\n\n")

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue
          
          try {
            const data = JSON.parse(line.replace("data: ", ""))

            // Update UI state based on stream type
            if (data.type === "sources") {
              setMessages((prev) => {
                const existing = prev.find(m => m.id === aiMessageId);
                if (!existing) {
                  return [...prev, { id: aiMessageId, role: "assistant", content: "", timestamp: new Date(), sources: data.content }];
                }
                return prev.map((msg) => msg.id === aiMessageId ? { ...msg, sources: data.content } : msg);
              });
            } 
            else if (data.type === "text") {
              // Once text starts flowing, hide the "thinking" skeletons
              if (isTyping) {
                setIsTyping(false); 
                setProgress(100);
              }

              accumulatedContent += data.content;

              setMessages((prev) => {
                const existing = prev.find(m => m.id === aiMessageId);
                if (!existing) {
                  return [...prev, { id: aiMessageId, role: "assistant", content: accumulatedContent, timestamp: new Date() }];
                }
                return prev.map((msg) => 
                  msg.id === aiMessageId ? { ...msg, content: accumulatedContent } : msg
                );
              });
            }
          } catch (e) {
            console.error("Error parsing stream chunk", e)
          }
        }
      }
    } catch (error) {
      console.error("Chat Error:", error)
      const errorMessage: Message = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: "I'm having trouble connecting to the NITI servers. Please check if the backend is running.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
      setProgress(0)
    }
  }

  function handleViewSource(source: any) {
    if (!source) return
    setSelectedSource(source)
    setSourceModalOpen(true)
  }

  return (
    <div className="flex h-dvh flex-col bg-[#fcfcfc] overflow-hidden">
      
      {/* 1. Tricolor Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-[100] flex">
        {isTyping || progress > 0 ? (
            <div 
              className="h-full bg-gradient-to-r from-[#FF9933] via-[#0A192F] to-[#138808] transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
        ) : (
            <>
                <div className="h-full flex-1 bg-[#FF9933]" />
                <div className="h-full flex-1 bg-white" />
                <div className="h-full flex-1 bg-[#138808]" />
            </>
        )}
      </div>

      {/* 2. Chat Header */}
      <header className="px-6 py-3 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <div className="relative h-10 w-10 overflow-hidden rounded-lg shadow-sm border border-slate-100 bg-white">
                <Image src="/askniti-logo.png" alt="AskNITI Logo" fill priority className="object-cover" />
            </div>
          </Link>
          <div className="flex flex-col">
            <h1 className="text-lg font-black text-[#0A192F] leading-none tracking-tight">
              Ask<span className="text-[#FF9933]">NITI</span> AI
            </h1>
            <div className="flex items-center gap-1 mt-0.5">
              <ShieldCheck className="size-3 text-[#138808]" />
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">
                Policy Document Intelligence
              </span>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          {isTyping && (
             <div className="flex items-center gap-2 animate-pulse">
                <Loader2 className="size-3 animate-spin text-[#FF9933]" />
                <span className="text-[10px] font-black text-[#0A192F]/40 uppercase tracking-widest">
                  {progress < 50 ? "Searching Archives" : "Analyzing Data"}
                </span>
             </div>
          )}
          <div className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[9px] font-bold text-slate-600 uppercase tracking-widest">
            v1.0-2026
          </div>
        </div>
      </header>

      {/* 3. Messages Container */}
      <main 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto bg-white/50"
      >
        <div className="mx-auto max-w-4xl px-4 py-8">
          {messages.length === 0 ? (
            <WelcomeScreen language={language} />
          ) : (
            <div className="flex flex-col gap-8 pb-32">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  onViewSource={handleViewSource}
                />
              ))}

              {isTyping && (
                <div className="flex flex-col gap-6">
                  {progress < 40 ? (
                    <div className="flex justify-start">
                      <TypingIndicator />
                    </div>
                  ) : (
                    <div className="flex justify-start w-full">
                      <LoadingSkeleton />
                    </div>
                  )}
                </div>
              )}
              
              <div ref={chatEndRef} className="h-4" />
            </div>
          )}
        </div>
      </main>

      {/* 4. Input Area */}
      <footer className="shrink-0 w-full bg-gradient-to-t from-white via-white to-transparent pt-10 pb-6 relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          <ChatInput onSend={handleSend} disabled={isTyping} language={language} />
          <div className="flex items-center justify-center gap-2 mt-4 opacity-60 text-slate-400">
            <Info className="size-3" />
            <p className="text-[9px] font-medium uppercase tracking-widest">
              Independent AI Research Tool • Check official sources for verification
            </p>
          </div>
        </div>
      </footer>

      <SourceModal
        open={sourceModalOpen}
        onOpenChange={setSourceModalOpen}
        source={selectedSource}
      />
    </div>
  )
}