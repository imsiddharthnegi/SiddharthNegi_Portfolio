"use client"

import { useEffect, useState } from "react"

export function MobileOverlay() {
  const [dismissed, setDismissed] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if dismissed in localStorage
    const isDismissed = localStorage.getItem("mobile-overlay-dismissed")
    setDismissed(isDismissed === "true")

    // Check if mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleDismiss = () => {
    setDismissed(true)
    localStorage.setItem("mobile-overlay-dismissed", "true")
  }

  // Only show if on mobile and not dismissed
  if (dismissed || !isMobile) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6"
      style={{ backgroundColor: "#020408" }}
    >
      {/* SN Logo */}
      <div className="mb-12 flex h-12 w-12 items-center justify-center rounded-md border border-cyan-400/40 bg-white/[0.03] backdrop-blur-md">
        <span className="font-mono text-sm font-medium tracking-[0.08em] text-white/90">
          SN
        </span>
      </div>

      {/* Content */}
      <div className="text-center">
        <h1 className="mb-4 font-light tracking-tight text-white" style={{ fontSize: "clamp(32px, 8vw, 48px)" }}>
          Crafted for Desktop
        </h1>

        <p className="mb-8 max-w-sm font-light leading-relaxed text-white/60" style={{ fontSize: "clamp(14px, 3.5vw, 16px)" }}>
          This portfolio is designed for a full desktop experience. For the best view, open on a larger screen.
        </p>
      </div>

      {/* Button */}
      <button
        onClick={handleDismiss}
        className="group relative mt-12 inline-flex items-center gap-2 rounded-lg px-6 py-3 font-light tracking-tight text-white transition-all hover:scale-105 active:scale-95"
        style={{
          background: "rgba(0, 229, 255, 0.12)",
          border: "1px solid rgba(0, 229, 255, 0.30)",
          boxShadow: "0 0 20px rgba(0, 229, 255, 0.15)",
        }}
        aria-label="Dismiss overlay and continue"
      >
        <span>Continue anyway</span>
        <span aria-hidden className="text-cyan-400">
          →
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            boxShadow: "0 0 24px rgba(0, 229, 255, 0.25)",
          }}
        />
      </button>
    </div>
  )
}
