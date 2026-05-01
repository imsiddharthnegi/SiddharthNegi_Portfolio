"use client"

import { useEffect, useState } from "react"

function useCountUp(target: number, durationMs = 1600, delayMs = 0) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let raf = 0
    let startTs = 0
    const timeout = setTimeout(() => {
      const step = (ts: number) => {
        if (!startTs) startTs = ts
        const elapsed = ts - startTs
        const progress = Math.min(elapsed / durationMs, 1)
        // easeOutCubic
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(eased * target))
        if (progress < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }, delayMs)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(raf)
    }
  }, [target, durationMs, delayMs])

  return value
}

function StatCounter({
  target,
  label,
  delay,
  index,
}: {
  target: number
  label: string
  delay: number
  index: number
}) {
  const value = useCountUp(target, 1800, delay)
  return (
    <div
      className="flex items-baseline gap-3 opacity-0"
      style={{
        animation: `fade-in-up 900ms cubic-bezier(0.2, 0.65, 0.2, 1) forwards`,
        animationDelay: `${1200 + index * 180}ms`,
      }}
    >
      <span className="font-mono text-[11px] tabular-nums text-white/30">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="flex flex-col">
        <span className="font-mono text-2xl font-light tabular-nums text-white/90">
          {value.toString().padStart(2, "0")}
        </span>
        <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
          {label}
        </span>
      </div>
    </div>
  )
}

// Inline SVG noise so we don't depend on external assets
const NOISE_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
      <filter id='n'>
        <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
        <feColorMatrix type='saturate' values='0'/>
      </filter>
      <rect width='100%' height='100%' filter='url(#n)' opacity='1'/>
    </svg>`,
  )

export function Hero() {
  return (
    <section
      className="relative h-[100dvh] w-full overflow-hidden"
      style={{ backgroundColor: "#020408" }}
      aria-label="Hero"
    >
      {/* Drifting violet radial blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[42%] top-[48%] z-0 h-[1100px] w-[1100px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(79, 10, 235, 0.55) 0%, rgba(79, 10, 235, 0.18) 35%, rgba(79, 10, 235, 0) 70%)",
          opacity: 0.08 * 1.0, // visual target ~8% peak
          filter: "blur(60px)",
          willChange: "transform",
          animation: "blob-drift 22s ease-in-out infinite",
        }}
      />

      {/* Subtle horizon glow (very faint, helps editorial feel without violating color rule) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[40%]"
        style={{
          background:
            "linear-gradient(to top, rgba(0, 229, 255, 0.04) 0%, rgba(0, 229, 255, 0) 100%)",
        }}
      />

      {/* Animated grain/noise overlay at 3% opacity */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-30"
        style={{
          backgroundImage: `url("${NOISE_SVG}")`,
          backgroundSize: "200px 200px",
          opacity: 0.03,
          mixBlendMode: "overlay",
        }}
      />

      {/* Faint top hairline + corner ticks for editorial framing */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-12 top-12 z-20 h-px bg-white/5 opacity-0"
        style={{ animation: "fade-in 1200ms ease-out 200ms forwards" }}
      />

      {/* Top-left meta tag */}
      <div
        className="absolute left-12 top-12 z-20 flex items-center gap-3 opacity-0"
        style={{ animation: "fade-in-up 900ms ease-out 400ms forwards" }}
      >
        <span className="block h-1.5 w-1.5 rounded-full bg-cyan-400/80" />
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
          Portfolio / 2026 — Index 01
        </span>
      </div>

      {/* Top-right meta */}
      <div
        className="absolute right-12 top-12 z-20 hidden items-center gap-6 opacity-0 md:flex"
        style={{ animation: "fade-in-up 900ms ease-out 500ms forwards" }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
          Dehradun, IN
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
          {"["}Available Q3{"]"}
        </span>
      </div>

      {/* Main typography block */}
      <div
        className="relative z-20 flex h-full flex-col justify-center"
        style={{ paddingLeft: "clamp(24px, 8vw, 120px)" }}
      >
        <h1
          className="text-pretty leading-[0.92] tracking-[-0.04em]"
          style={{ fontFamily: "var(--font-sans), Geist, sans-serif" }}
        >
          {/* Word 1: Building — slides from left */}
          <span
            className="block font-light text-white opacity-0"
            style={{
              fontWeight: 300,
              fontSize: "clamp(80px, 12vw, 160px)",
              animation:
                "slide-from-left 1100ms cubic-bezier(0.2, 0.7, 0.2, 1) 200ms forwards",
            }}
          >
            Building
          </span>

          {/* Word 2: Digital — italic 800, gradient text, clip-path reveal up */}
          <span
            className="block italic opacity-0"
            style={{
              fontWeight: 800,
              fontSize: "clamp(80px, 12vw, 160px)",
              backgroundImage:
                "linear-gradient(90deg, #ffffff 0%, #ffffff 35%, #00e5ff 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
              clipPath: "inset(100% 0 0 0)",
              animation:
                "clip-reveal-up 1100ms cubic-bezier(0.65, 0, 0.2, 1) 600ms forwards, fade-in 600ms ease-out 600ms forwards",
              willChange: "clip-path, transform",
            }}
          >
            Digital
          </span>

          {/* Word 3: Products — fades + slight scale, cyan glow */}
          <span
            className="block opacity-0"
            style={{
              fontWeight: 900,
              fontSize: "clamp(80px, 12vw, 160px)",
              color: "#ffffff",
              textShadow:
                "0 0 22px rgba(0, 229, 255, 0.18), 0 0 60px rgba(0, 229, 255, 0.08)",
              animation:
                "fade-scale-in 1200ms cubic-bezier(0.2, 0.7, 0.2, 1) 1100ms forwards",
            }}
          >
            Products<span className="text-cyan-400/80">.</span>
          </span>
        </h1>
      </div>

      {/* Right-side stat counters */}
      <div className="absolute right-12 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-10 md:flex">
        <div
          className="mb-2 h-px w-12 bg-white/15 opacity-0"
          style={{ animation: "fade-in 900ms ease-out 1000ms forwards" }}
          aria-hidden
        />
        <StatCounter target={4} label="Internships" delay={1200} index={0} />
        <StatCounter target={5} label="Live Products" delay={1400} index={1} />
        <StatCounter target={2} label="Cloud Certs" delay={1600} index={2} />
        <div
          className="mt-2 h-px w-12 bg-white/15 opacity-0"
          style={{ animation: "fade-in 900ms ease-out 1900ms forwards" }}
          aria-hidden
        />
      </div>

      {/* Bottom-left: name + role */}
      <div
        className="absolute bottom-12 left-12 z-20 flex flex-col gap-1 opacity-0 md:left-[clamp(24px,8vw,120px)]"
        style={{ animation: "fade-in-up 900ms ease-out 1500ms forwards" }}
      >
        <div className="flex items-center gap-3">
          <span className="block h-px w-6 bg-white/30" />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/80">
            Siddharth Negi
          </span>
        </div>
        <span className="pl-9 font-mono text-[10px] tracking-[0.16em] text-white/35">
          Full-Stack Engineer &amp; SaaS Builder
        </span>
      </div>

      {/* Bottom-right: scroll indicator */}
      <div
        className="absolute bottom-12 right-12 z-20 flex items-end gap-4 opacity-0"
        style={{ animation: "fade-in 1000ms ease-out 1700ms forwards" }}
        aria-hidden
      >
        <span
          className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/40"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          Scroll
        </span>
        <div className="relative h-16 w-px overflow-hidden bg-white/10">
          <span
            className="absolute left-1/2 top-0 block h-2 w-px -translate-x-1/2 bg-cyan-400"
            style={{
              animation: "travel-dot 2200ms cubic-bezier(0.65, 0, 0.35, 1) infinite",
              animationDelay: "1900ms",
            }}
          />
        </div>
      </div>
    </section>
  )
}
