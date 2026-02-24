"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, Globe, ChevronDown, Rocket, BookOpen, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
// Import Sheet components for the mobile menu functionality
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet"

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // CRITICAL FIX: Prevent Navbar doubling by hiding the global navbar on the chat page
  if (pathname === "/chat") return null;

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-[100] w-full">
      {/* 1. Tricolor Ribbon - Cultural Identity */}
      <div className="flex h-1.5 w-full">
        <div className="h-full flex-1 bg-[#FF9933]" /> {/* Saffron */}
        <div className="h-full flex-1 bg-white" />
        <div className="h-full flex-1 bg-[#138808]" /> {/* India Green */}
      </div>

      <div className="border-b border-slate-200 bg-white/80 backdrop-blur-md px-6 py-3">
        <div className="container mx-auto flex items-center justify-between">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl shadow-lg shadow-navy/20 transition-transform group-hover:scale-105 border border-slate-100 bg-white">
              <Image 
                src="/askniti-logo.png" 
                alt="AskNITI Logo" 
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-[#0A192F] leading-none tracking-tight">
                Ask<span className="text-[#FF9933]">NITI</span>
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                Aapka AI Policy Dost
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              <Link 
                href="/library" 
                className={`text-sm font-bold transition-colors relative group ${
                  isActive('/library') ? 'text-[#FF9933]' : 'text-slate-600 hover:text-[#0A192F]'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <BookOpen size={16} />
                  Library
                </div>
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#FF9933] transition-all ${isActive('/library') ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>

              {["Features", "About", "FAQ"].map((item) => (
                <Link 
                  key={item} 
                  href={`/#${item.toLowerCase()}`} 
                  className="text-sm font-bold text-slate-600 hover:text-[#0A192F] transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF9933] transition-all group-hover:w-full" />
                </Link>
              ))}
            </div>

            <div className="h-6 w-[1px] bg-slate-200 mx-2" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 font-bold text-[#0A192F] h-9 hover:bg-slate-100">
                  <Globe className="size-4" />
                  Language
                  <ChevronDown className="size-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 rounded-xl p-2 bg-white shadow-xl border-slate-100">
                <DropdownMenuItem className="font-bold cursor-pointer focus:bg-slate-50">English</DropdownMenuItem>
                <DropdownMenuItem className="font-medium cursor-pointer focus:bg-slate-50">Hindi (हिंदी)</DropdownMenuItem>
                <DropdownMenuItem className="font-medium cursor-pointer focus:bg-slate-50">Marathi (मराठी)</DropdownMenuItem>
                <DropdownMenuItem className="font-medium cursor-pointer focus:bg-slate-50">Bangla (বাংলা)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button asChild className="bg-[#0A192F] hover:bg-[#112240] text-white rounded-xl px-8 font-bold shadow-lg shadow-blue-900/10 border-b-4 border-black active:border-b-0 active:translate-y-[2px] transition-all">
              <Link href="/chat">
                <Rocket className="mr-2 size-4 text-[#FF9933]" />
                Puchiye AI Se
              </Link>
            </Button>
          </div>

          {/* MOBILE NAVIGATION - FIXED HAMBURGER */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-[#0A192F]">
                  <Menu className="size-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-white border-l border-slate-200 p-0">
                <SheetHeader className="p-6 border-b border-slate-100 bg-slate-50/50">
                  <SheetTitle className="flex items-center gap-3">
                    <div className="relative h-8 w-8 overflow-hidden rounded-lg">
                       <Image src="/askniti-logo.png" alt="Logo" fill className="object-cover" />
                    </div>
                    <span className="text-xl font-black text-[#0A192F]">
                      Ask<span className="text-[#FF9933]">NITI</span>
                    </span>
                  </SheetTitle>
                </SheetHeader>
                
                <div className="flex flex-col gap-2 p-6">
                  <Link 
                    href="/library" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-lg font-bold py-3 text-slate-600 border-b border-slate-50"
                  >
                    <BookOpen size={20} /> Library
                  </Link>
                  {["Features", "About", "FAQ"].map((item) => (
                    <Link
                      key={item}
                      href={`/#${item.toLowerCase()}`}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-bold py-3 text-slate-600 border-b border-slate-50"
                    >
                      {item}
                    </Link>
                  ))}
                  
                  <div className="mt-6">
                    <Button asChild className="w-full bg-[#0A192F] text-white rounded-xl font-bold py-6 shadow-lg">
                      <Link href="/chat" onClick={() => setIsOpen(false)}>
                        <Rocket className="mr-2 size-5 text-[#FF9933]" />
                        Puchiye AI Se
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}