"use client"

import { useEffect, useRef, useState } from "react"

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    // Disable on touch devices and when reduced motion is preferred
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (isTouch || reduced) return
    setEnabled(true)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let visible = false

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!visible) {
        visible = true
        dot.style.opacity = "1"
        ring.style.opacity = "1"
      }
      // Dot follows instantly
      dot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`
    }

    const onLeave = () => {
      visible = false
      dot.style.opacity = "0"
      ring.style.opacity = "0"
    }

    const onEnter = () => {
      visible = true
      dot.style.opacity = "1"
      ring.style.opacity = "1"
    }

    // Lag behind animation for the ring (~120ms feel via lerp)
    let raf = 0
    const animate = () => {
      // ~0.18 lerp produces a perceived ~120ms catch-up
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      ring.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0)`
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    // Detect hover over interactive elements
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      const interactive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]')
      setHovering(!!interactive)
    }

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseover", onOver)
    document.addEventListener("mouseleave", onLeave)
    document.addEventListener("mouseenter", onEnter)

    // Hide native cursor
    document.documentElement.style.cursor = "none"
    document.body.style.cursor = "none"

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseover", onOver)
      document.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mouseenter", onEnter)
      document.documentElement.style.cursor = ""
      document.body.style.cursor = ""
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full"
        style={{
          backgroundColor: "#00e5ff",
          opacity: 0,
          transition: "opacity 200ms ease, width 200ms ease, height 200ms ease",
          willChange: "transform",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border"
        style={{
          width: hovering ? "48px" : "32px",
          height: hovering ? "48px" : "32px",
          marginLeft: hovering ? "-8px" : "0",
          marginTop: hovering ? "-8px" : "0",
          borderColor: hovering ? "rgba(0, 229, 255, 0.85)" : "rgba(0, 229, 255, 0.45)",
          backgroundColor: hovering ? "rgba(0, 229, 255, 0.06)" : "transparent",
          opacity: 0,
          transition:
            "opacity 200ms ease, width 220ms cubic-bezier(0.2, 0.7, 0.2, 1), height 220ms cubic-bezier(0.2, 0.7, 0.2, 1), border-color 220ms ease, background-color 220ms ease, margin 220ms ease",
          willChange: "transform",
        }}
      />
    </>
  )
}
