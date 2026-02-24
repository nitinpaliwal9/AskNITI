import type { Metadata, Viewport } from 'next'
import { DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navbar } from '@/components/navbar' // Path remains correct
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'AskNITI - Official Government Scheme AI Assistant',
  description:
    'AskNITI helps Indian citizens discover, understand, and apply for central and state government schemes. Get verified, RAG-driven information on PM-Kisan, Ladli Behna, Ration Cards, and more.',
  keywords: ['Government Schemes', 'Indian Policy AI', 'PM-Kisan', 'Sarkari Yojana', 'AskNITI'],
  authors: [{ name: 'AskNITI Team' }],
  icons: {
    icon: [
      {
        url: '/askniti-logo.png',
        type: 'image/png',
      },
    ],
    apple: '/askniti-logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0A192F',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Prevents accidental zooming on mobile inputs
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${dmSans.variable} font-sans antialiased bg-[#fcfcfc]`}>
        {/* The Navbar component now contains logic to hide itself 
            automatically when on the /chat route, preventing 
            the "doubling" issue while remaining global for all other pages.
        */}
        <Navbar />
        
        {/* Page Content */}
        <main>
          {children}
        </main>

        <Analytics />
      </body>
    </html>
  )
}