"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, ArrowUp, Sparkles, Loader2 } from "lucide-react"

const quickActionsEn = [
  { label: "PM-Kisan Status", query: "How can I check my PM-Kisan beneficiary status?" },
  { label: "Sukanya Samriddhi", query: "Am I eligible for the Sukanya Samriddhi Yojana? What are the requirements?" },
  { label: "New Ration Card", query: "How do I apply for a new ration card online?" },
]

const quickActionsHi = [
  { label: "PM-Kisan स्थिति", query: "मैं अपनी PM-Kisan लाभार्थी स्थिति कैसे देख सकता हूँ?" },
  { label: "सुकन्या समृद्धि", query: "क्या मैं सुकन्या समृद्धि योजना के लिए पात्र हूँ? क्या आवश्यकताएँ हैं?" },
  { label: "नया राशन कार्ड", query: "मैं ऑनलाइन नए राशन कार्ड के लिए कैसे आवेदन करूँ?" },
]

export function ChatInput({
  onSend,
  disabled,
  language,
  showQuickActions = true, // New prop to control visibility
}: {
  onSend: (message: string) => void
  disabled?: boolean
  language: "en" | "hi"
  showQuickActions?: boolean
}) {
  const [input, setInput] = useState("")
  const [isListening, setIsListening] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const quickActions = language === "hi" ? quickActionsHi : quickActionsEn
  const placeholder = language === "hi" ? "सरकारी योजना के बारे में पूछें..." : "Ask about any government scheme..."

  // Auto-focus input on mount
  useEffect(() => {
    if (!disabled) {
      textareaRef.current?.focus()
    }
  }, [disabled])

  function handleSend() {
    const trimmed = input.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setInput("")
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  function toggleMic() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.")
      return
    }

    if (isListening) {
      setIsListening(false)
      return
    }

    setIsListening(true)
    const recognition = new SpeechRecognition()
    recognition.lang = language === "hi" ? "hi-IN" : "en-IN"
    recognition.continuous = false
    recognition.interimResults = false
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setInput((prev) => prev + (prev ? " " : "") + transcript)
      setIsListening(false)
    }
    
    recognition.onerror = () => setIsListening(false)
    recognition.onend = () => setIsListening(false)
    
    try {
      recognition.start()
    } catch (e) {
      setIsListening(false)
    }
  }

  return (
    <div className="w-full bg-transparent">
      <div className="mx-auto max-w-4xl px-4">
        
        {/* 1. Quick Action Pills - Only shown at the start or when requested */}
        {showQuickActions && (
          <div className="flex flex-wrap justify-center gap-2 mb-5 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {quickActions.map((action) => (
              <button
                key={action.label}
                disabled={disabled}
                onClick={() => onSend(action.query)}
                className="px-4 py-1.5 rounded-full border border-slate-200 bg-white/80 text-[10px] font-black uppercase tracking-widest text-[#0A192F] hover:bg-[#FF9933]/10 hover:border-[#FF9933]/40 transition-all shadow-sm disabled:opacity-50"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}

        {/* 2. Floating Input Capsule */}
        <div className="relative group">
          {/* Tricolor Glow Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF9933]/20 via-slate-100 to-[#138808]/20 rounded-[2rem] blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
          
          <div className="relative flex items-end gap-2 rounded-[2rem] border border-slate-200 bg-white/95 backdrop-blur-xl p-2 md:p-2.5 shadow-xl transition-all focus-within:border-[#0A192F]/20 focus-within:shadow-2xl">
            
            {/* Voice Input Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={disabled}
              className={`flex-shrink-0 rounded-full h-10 w-10 md:h-11 md:w-11 transition-all ${
                isListening
                  ? "bg-red-50 text-red-600 animate-pulse shadow-inner"
                  : "text-slate-400 hover:text-[#FF9933] hover:bg-[#FF9933]/5"
              }`}
              onClick={toggleMic}
            >
              {isListening ? <MicOff className="size-5" /> : <Mic className="size-5" />}
            </Button>

            {/* Main Textarea */}
            <div className="relative flex-1 flex flex-col">
              {isListening && (
                <span className="absolute -top-6 left-2 text-[10px] font-bold text-red-500 uppercase tracking-tighter animate-pulse">
                  {language === "hi" ? "सुन रहा हूँ..." : "Listening..."}
                </span>
              )}
              <textarea
                ref={textareaRef}
                value={input}
                rows={1}
                onChange={(e) => {
                  setInput(e.target.value)
                  e.target.style.height = "auto"
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`
                }}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={disabled}
                className="w-full max-h-[150px] min-h-[44px] resize-none bg-transparent px-2 py-3 text-[15px] font-medium text-[#0A192F] placeholder:text-slate-400 focus:outline-none disabled:opacity-50"
              />
            </div>

            {/* Send Button */}
            <Button
              onClick={handleSend}
              disabled={!input.trim() || disabled}
              className={`flex-shrink-0 h-10 w-10 md:h-11 md:w-11 rounded-full transition-all duration-500 ${
                input.trim() 
                ? "bg-[#0A192F] text-white shadow-lg shadow-[#0A192F]/20 scale-100 hover:bg-[#0A192F]/90" 
                : "bg-slate-50 text-slate-300 scale-90"
              }`}
            >
              {disabled && input.trim() ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <ArrowUp className="size-5 stroke-[2.5px]" />
              )}
            </Button>
          </div>
        </div>

        {/* 3. Official Status Badge */}
        <div className="flex items-center justify-center gap-3 mt-5 opacity-80">
          <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-slate-200" />
          <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-[0.25em]">
            <Sparkles className="size-3 text-[#FF9933]" />
            <span>{language === "hi" ? "एआई नीति मार्गदर्शक" : "AI Policy Guide"}</span>
            <Sparkles className="size-3 text-[#138808]" />
          </div>
          <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-slate-200" />
        </div>
      </div>
    </div>
  )
}