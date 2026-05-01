"use client"

import { useEffect } from "react"
import Lenis from "lenis"

export function SmoothScroll() {
  useEffect(() => {
    // Respect reduced motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    })

    let rafId = 0
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Anchor link smooth scroll
    const handleAnchor = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      const link = target.closest("a") as HTMLAnchorElement | null
      if (!link) return
      const href = link.getAttribute("href")
      if (!href || !href.startsWith("#") || href === "#") return
      const el = document.querySelector(href)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.4 })
    }
    document.addEventListener("click", handleAnchor)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener("click", handleAnchor)
      lenis.destroy()
    }
  }, [])

  return null
}
