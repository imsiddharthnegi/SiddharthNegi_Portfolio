"use client"

import { useEffect, useRef, useState } from "react"

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement | null>(null)
  const arrowRef = useRef<HTMLDivElement | null>(null)
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

    const ring = ringRef.current
    if (!ring) return

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
        ring.style.opacity = "0.65"
      }
      // Arrow tracks exactly at mouse position (no lag)
      const arrow = arrowRef.current
      if (arrow) {
        arrow.style.transform = `translate3d(${mouseX - 8}px, ${mouseY - 8}px, 0)`
      }
    }

    const onLeave = () => {
      visible = false
      ring.style.opacity = "0"
    }

    const onEnter = () => {
      visible = true
      ring.style.opacity = "0.65"
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
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border"
        style={{
          width: hovering ? "48px" : "32px",
          height: hovering ? "48px" : "32px",
          marginLeft: hovering ? "-8px" : "0",
          marginTop: hovering ? "-8px" : "0",
          borderColor: hovering ? "rgba(0, 229, 255, 0.75)" : "rgba(0, 229, 255, 0.65)",
          backgroundColor: "transparent",
          opacity: 0,
          transition:
            "opacity 200ms ease, width 220ms cubic-bezier(0.2, 0.7, 0.2, 1), height 220ms cubic-bezier(0.2, 0.7, 0.2, 1), border-color 220ms ease, margin 220ms ease",
          willChange: "transform",
        }}
      />
      <div
        ref={arrowRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[101]"
        style={{
          width: "16px",
          height: "16px",
          willChange: "transform",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="white"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))",
          }}
        >
          {/* Standard arrow cursor pointing up-left */}
          <path d="M3 3l18 18m0-18l-6 14h-6l2-6h-6l9-8z" fill="white" />
        </svg>
      </div>
    </>
  )
}
