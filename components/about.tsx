"use client"

import { useEffect, useRef, useState } from "react"

const STATS: { label: string; value: string }[] = [
  { label: "Based In", value: "Dehradun, India" },
  { label: "Focus", value: "Full-Stack SaaS" },
  { label: "Certs", value: "AWS · GCP" },
  { label: "Projects", value: "6 Live Products" },
]

export function About() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.15 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-label="About the engineer"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#020408", minHeight: "100dvh" }}
    >
      <div
        className="relative grid h-full min-h-[100dvh] grid-cols-1 lg:grid-cols-2"
        style={{
          paddingLeft: "clamp(24px, 8vw, 120px)",
          paddingRight: "clamp(24px, 8vw, 120px)",
          paddingTop: "clamp(96px, 14vh, 160px)",
          paddingBottom: "clamp(96px, 14vh, 160px)",
        }}
      >
        {/* LEFT: SN Card + Stats */}
        <div className="relative flex flex-col items-center justify-center lg:items-start lg:justify-start w-full max-w-[360px] mx-auto lg:mx-0">
          
          {/* Portrait placeholder wrapper */}
          <div
            className="relative flex flex-col items-center w-full"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 900ms ease-out 200ms, transform 900ms cubic-bezier(0.2, 0.7, 0.2, 1) 200ms",
            }}
          >
            <div
              className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border w-full aspect-square"
              style={{
                backgroundColor: "#06080d",
                borderColor: "rgba(0, 210, 255, 0.15)",
                boxShadow:
                  "0 0 0 1px rgba(0, 210, 255, 0.05), 0 0 40px rgba(0, 210, 255, 0.08), inset 0 0 80px rgba(0, 210, 255, 0.03)",
              }}
            >
              {/* Subtle animated inner gradient */}
              <div 
                className="pointer-events-none absolute -inset-[100%] animate-[spin_8s_linear_infinite]"
                style={{
                  background: "radial-gradient(circle at 30% 30%, rgba(0, 210, 255, 0.12) 0%, transparent 60%)",
                }}
              />
              {/* Corner ticks */}
              <span aria-hidden className="absolute left-3 top-3 h-3 w-3 border-l border-t border-cyan-400/40" />
              <span aria-hidden className="absolute right-3 top-3 h-3 w-3 border-r border-t border-cyan-400/40" />
              <span aria-hidden className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-cyan-400/40" />
              <span aria-hidden className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-cyan-400/40" />

              {/* Central Content */}
              <div className="relative flex flex-col items-center gap-1 z-10">
                <span
                  className="font-light tracking-[-0.04em] text-white leading-none"
                  style={{
                    fontSize: "clamp(64px, 8vw, 96px)",
                    fontFamily: "var(--font-sans), Geist, sans-serif",
                    textShadow: "0 0 30px rgba(0, 210, 255, 0.2)",
                  }}
                >
                  SN
                </span>
                <span className="text-white/40 text-[13px] tracking-wide font-light mt-1">
                  Siddharth Negi
                </span>
                
                <div 
                  className="mt-3 flex items-center gap-2 rounded-full px-3 py-1.5"
                  style={{
                    backgroundColor: "rgba(0, 210, 255, 0.06)",
                    border: "1px solid rgba(0, 210, 255, 0.15)"
                  }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-cyan-300/80">
                    Available for work
                  </span>
                </div>
              </div>

              {/* Bottom hairline meta */}
              <span
                aria-hidden
                className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10"
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/35">
                  Engineer / 2026
                </span>
                <span className="block h-1 w-1 rounded-full bg-cyan-400" />
              </span>
            </div>
            
            {/* 2x2 Stats Grid below card */}
            <div 
              className="mt-2 w-full grid grid-cols-2 rounded-xl overflow-hidden"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)"
              }}
            >
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className="flex flex-col gap-1.5 p-5 relative"
                  style={{
                    borderRight: i % 2 === 0 ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
                    borderBottom: i < 2 ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
                  }}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-cyan-400/70">
                    {s.label}
                  </span>
                  <span
                    className="font-bold tracking-tight text-white leading-tight"
                    style={{ fontSize: "clamp(14px, 1.3vw, 16px)" }}
                  >
                    {s.value}
                  </span>
                </div>
              ))}
              {/* Education — full-width 5th row */}
              <div
                className="col-span-2 flex flex-col gap-1.5 p-5"
                style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-cyan-400/70">
                  Education
                </span>
                <span
                  className="font-bold tracking-tight text-white leading-tight"
                  style={{ fontSize: "clamp(14px, 1.3vw, 16px)" }}
                >
                  B.Tech, Computer Science · 2026
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: copy */}
        <div className="relative mt-16 flex flex-col lg:mt-0 lg:pl-12">
          {/* Label */}
          <div
            className="flex items-center gap-3"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 700ms ease-out 100ms, transform 700ms ease-out 100ms",
            }}
          >
            <span className="block h-1.5 w-1.5 rounded-full bg-cyan-400/80" />
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-300/80">
              About the Engineer
            </span>
          </div>

          {/* Headline split across lines */}
          <h2
            className="mt-8 text-pretty leading-[0.95] tracking-[-0.04em] text-white"
            style={{
              fontFamily: "var(--font-sans), Geist, sans-serif",
            }}
          >
            <span
              className="block font-light"
              style={{
                fontSize: "clamp(52px, 7vw, 104px)",
                fontWeight: 300,
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 800ms ease-out 250ms, transform 800ms ease-out 250ms",
              }}
            >
              Engineer.
            </span>
            <span
              className="block italic"
              style={{
                fontSize: "clamp(52px, 7vw, 104px)",
                fontWeight: 700,
                backgroundImage:
                  "linear-gradient(90deg, #ffffff 0%, #ffffff 35%, #00e5ff 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 800ms ease-out 400ms, transform 800ms ease-out 400ms",
              }}
            >
              Builder.
            </span>
            <span
              className="block"
              style={{
                fontSize: "clamp(52px, 7vw, 104px)",
                fontWeight: 900,
                color: "#ffffff",
                textShadow:
                  "0 0 22px rgba(0, 229, 255, 0.18), 0 0 60px rgba(0, 229, 255, 0.08)",
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 800ms ease-out 550ms, transform 800ms ease-out 550ms",
              }}
            >
              Operator<span className="text-cyan-400/80">.</span>
            </span>
          </h2>

          {/* Paragraphs */}
          <div className="mt-12 grid max-w-xl gap-6">
            {[
              "Six shipped products, four internships, bias toward building things people actually use. I own features end-to-end — from first commit to production — across SaaS, e-commerce, and AI tooling.",
              "Full-stack by discipline, AI-native by choice. Next.js, React, Node.js, MongoDB on the core. Gemini and Claude APIs where intelligence actually earns its place. AWS & GCP certified.",
              "Craft is non-negotiable. Pixel-precise UI, sub-100ms perceived performance, accessible by default. I sweat the spacing, the easing curves, and the empty states — because the gap between good and great is felt, not always seen.",
            ].map((text, i) => (
              <p
                key={i}
                className={`text-pretty leading-relaxed ${i === 0 ? "text-[16px] md:text-[18px] text-white/80" : "text-[15px] md:text-[16px] text-white/55"}`}
                style={{
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? "translateY(0)" : "translateY(12px)",
                  transition: `opacity 700ms ease-out ${700 + i * 120}ms, transform 700ms ease-out ${700 + i * 120}ms`,
                }}
              >
                {text}
              </p>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
