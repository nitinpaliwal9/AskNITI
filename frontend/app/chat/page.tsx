"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Info, Loader2 } from "lucide-react"
import { ChatInput } from "@/components/chat/chat-input"
import { ChatHeader } from "@/components/chat/chat-header"
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
          if (prev < 90) return prev + 2; 
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
    
    // Immediate scroll on send
    setTimeout(() => scrollToBottom(true), 100)

    const aiMessageId = `ai-${Date.now()}`
    let accumulatedContent = ""
    
    try {
      const backendUrl = "https://askniti-1wcq.onrender.com"
      
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
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const parts = chunk.split("data: ");

        for (const part of parts) {
          const trimmedPart = part.trim();
          if (!trimmedPart) continue;

          try {
            const data = JSON.parse(trimmedPart);

            if (data.type === "sources") {
              setMessages((prev) => 
                prev.map((msg) => msg.id === aiMessageId ? { ...msg, sources: data.content } : msg)
              );
            } 
            else if (data.type === "text") {
              setIsTyping(false); 
              setProgress(100);
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
              // Keep scrolling as text streams in
              scrollToBottom();
            }
          } catch (e) {
            // Silence partial JSON errors during streaming
          }
        }
      }
      
    } catch (error) {
      console.error("Chat Error:", error)
      const errorMessage: Message = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: language === "hi" 
          ? "क्षमा करें, सर्वर से जुड़ने में समस्या हो रही है। कृपया पुनः प्रयास करें।" 
          : "I'm having trouble connecting to the NITI servers. Please check your connection and try again.",
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
      <div className="fixed top-0 left-0 w-full h-1 z-[110] flex">
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

      {/* 2. Unified Chat Header */}
      <ChatHeader language={language} onLanguageChange={setLanguage} />

      {/* 3. Messages Container */}
      <main 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto bg-white/50 scroll-smooth pb-10"
      >
        <div className="mx-auto max-w-4xl px-4 py-6 md:py-10">
          {messages.length === 0 ? (
            <WelcomeScreen language={language} />
          ) : (
            <div className="flex flex-col gap-8">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  onViewSource={handleViewSource}
                />
              ))}

              {isTyping && (
                <div className="flex flex-col gap-6">
                   <div className="flex items-center gap-2 px-4 mb-2 animate-pulse">
                      <Loader2 className="size-3 animate-spin text-[#FF9933]" />
                      <span className="text-[10px] font-black text-[#0A192F]/40 uppercase tracking-widest">
                        {progress < 50 
                          ? (language === "hi" ? "आर्काइव्स खोज रहे हैं" : "Searching Archives") 
                          : (language === "hi" ? "डेटा विश्लेषण" : "Analyzing Data")}
                      </span>
                   </div>
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
              
              <div ref={chatEndRef} className="h-20 md:h-24" />
            </div>
          )}
        </div>
      </main>

      {/* 4. Input Area */}
      <footer className="shrink-0 w-full bg-gradient-to-t from-white via-white/95 to-transparent pt-8 pb-6 relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          <ChatInput 
            onSend={handleSend} 
            disabled={isTyping} 
            language={language} 
            showQuickActions={messages.length === 0} 
          />
          <div className="flex items-center justify-center gap-2 mt-5 opacity-60 text-slate-400">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-100 bg-white/50 shadow-sm">
              <Info className="size-3 text-[#FF9933]" />
              <p className="text-[9px] font-black uppercase tracking-widest text-center">
                Independent AI Research Tool • v1.0.2
              </p>
            </div>
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