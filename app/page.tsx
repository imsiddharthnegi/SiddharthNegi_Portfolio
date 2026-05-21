'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { About } from "@/components/about"
import { Arsenal } from "@/components/arsenal"
import { Certifications } from "@/components/certifications"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { Journey } from "@/components/journey"
import { Navbar } from "@/components/navbar"
import { Projects } from "@/components/projects"

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    // Easter Egg 1: Console message
    console.log(
      '%c🟢 Omnitrix detected.',
      'color: #00ff00; font-size: 16px; font-weight: bold;'
    )
    console.log(
      '%c Navigate to /omnitrix to transform.',
      'color: #00ffcc; font-size: 13px;'
    )
    console.log(
      '%c Built by Siddharth Negi — siddharthnegi.vercel.app',
      'color: #666; font-size: 11px;'
    )

    // Easter Egg 2: Konami code detection
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
    let konamiIndex = 0

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.code === 'KeyB' || e.code === 'KeyA' ? e.key.toLowerCase() : e.code

      if (key === konamiSequence[konamiIndex]) {
        konamiIndex++
        if (konamiIndex === konamiSequence.length) {
          router.push('/omnitrix')
          konamiIndex = 0
        }
      } else {
        konamiIndex = 0
        // Check if the current key matches the first in the sequence
        if (key === konamiSequence[0]) {
          konamiIndex = 1
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [router])

  return (
    <main className="min-h-[100dvh]" style={{ backgroundColor: "#020408" }}>
      <Navbar />
      <Hero />
      <Projects />
      <Arsenal />
      <Journey />
      <About />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  )
}
