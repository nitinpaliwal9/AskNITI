"use client"

import { useEffect } from "react"
import { Hero } from "@/components/landing/hero"
import { Stats } from "@/components/landing/stats"
import { Steps } from "@/components/landing/steps"
import { SchemeSpotlight } from "@/components/landing/schemes"
import { Features } from "@/components/landing/features"
import { FAQ } from "@/components/landing/faq"
import { Footer } from "@/components/landing/footer"
import { FadeIn } from "@/components/landing/fade-in"

export default function LandingPage() {
  
  // --- WAKE-UP LOGIC ---
  useEffect(() => {
    const wakeupBackend = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "https://askniti-1wcq.onrender.com";
        
        // We use the /docs or a simple GET if available, or just an OPTIONS call
        // This triggers Render to spin up the instance immediately
        await fetch(`${backendUrl}/chat`, { 
          method: "OPTIONS",
          mode: 'cors' 
        });
        
        console.log("🚀 AskNITI Brain: Wake-up signal sent to Render.");
      } catch (err) {
        console.log("Wake-up ping failed, but that's okay:", err);
      }
    };

    wakeupBackend();
  }, []);
  // ---------------------

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main>
        <Hero />
        <FadeIn><Stats /></FadeIn>
        <FadeIn><Steps /></FadeIn>
        <FadeIn><SchemeSpotlight /></FadeIn>
        <FadeIn><Features /></FadeIn>
        <FadeIn><FAQ /></FadeIn>
      </main>
      <Footer />
    </div>
  )
}