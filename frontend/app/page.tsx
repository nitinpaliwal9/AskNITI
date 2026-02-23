import { Hero } from "@/components/landing/hero"
import { Stats } from "@/components/landing/stats"
import { Steps } from "@/components/landing/steps"
import { SchemeSpotlight } from "@/components/landing/schemes"
import { Features } from "@/components/landing/features"
import { FAQ } from "@/components/landing/faq"
import { Footer } from "@/components/landing/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { FadeIn } from "@/components/landing/fade-in"

export default function LandingPage() {
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