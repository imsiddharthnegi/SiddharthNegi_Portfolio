"use client"

import { useEffect, useState } from "react"

/* ─── Count-up hook ──────────────────────────────────────────────── */
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
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(eased * target))
        if (progress < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }, delayMs)
    return () => { clearTimeout(timeout); cancelAnimationFrame(raf) }
  }, [target, durationMs, delayMs])
  return value
}

/* ─── Stat card ──────────────────────────────────────────────────── */
function StatCard({
  target,
  suffix = "",
  label,
  icon,
  delay,
  animDelay,
}: {
  target: number
  suffix?: string
  label: string
  icon: string
  delay: number
  animDelay: number
}) {
  const value = useCountUp(target, 1800, delay)
  return (
    <div
      className="relative flex flex-col items-center justify-center rounded-xl border border-white/[0.10] px-5 py-4 opacity-0 text-center min-w-[100px]"
      style={{
        background: "rgba(255,255,255,0.035)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0 1px 0 0 rgba(255,255,255,0.06) inset, 0 8px 32px rgba(0,0,0,0.35)",
        animation: `fade-in-up 800ms cubic-bezier(0.2,0.65,0.2,1) ${animDelay}ms forwards`,
      }}
      aria-label={`${target}${suffix} ${label}`}
    >
      {/* subtle glow on top edge */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-full"
        style={{ background: "linear-gradient(90deg,transparent,rgba(0,229,255,0.25),transparent)" }}
      />
      <span className="mb-1 text-lg leading-none" aria-hidden>{icon}</span>
      <span
        className="font-mono tabular-nums font-semibold text-white leading-none"
        style={{ fontSize: "clamp(26px, 3.5vw, 32px)" }}
      >
        {value}{suffix}
      </span>
      <span className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40 leading-tight">
        {label}
      </span>
    </div>
  )
}

/* ─── Inline noise SVG ───────────────────────────────────────────── */
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

/* ─── Hero ───────────────────────────────────────────────────────── */
export function Hero() {
  return (
    <section
      className="relative h-[100dvh] w-full overflow-hidden"
      style={{ backgroundColor: "#020408" }}
      aria-label="Hero"
      id="top"
    >
      {/* ── Drifting violet radial blob ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[42%] top-[48%] z-0 h-[1100px] w-[1100px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(79,10,235,0.55) 0%, rgba(79,10,235,0.18) 35%, rgba(79,10,235,0) 70%)",
          opacity: 0.08,
          filter: "blur(60px)",
          willChange: "transform",
          animation: "blob-drift 22s ease-in-out infinite",
        }}
      />

      {/* ── Horizon glow ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[40%]"
        style={{
          background: "linear-gradient(to top, rgba(0,229,255,0.04) 0%, rgba(0,229,255,0) 100%)",
        }}
      />

      {/* ── Grain/noise overlay ── */}
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

      {/* ── Top hairline ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-12 top-12 z-20 h-px bg-white/5 opacity-0"
        style={{ animation: "fade-in 1200ms ease-out 200ms forwards" }}
      />



      {/* ══════════════════════════════════════════════════════════════
          TOP-RIGHT: location
      ══════════════════════════════════════════════════════════════ */}
      <div
        className="absolute right-5 top-[72px] z-20 hidden items-center gap-4 opacity-0 md:flex md:right-12"
        style={{ animation: "fade-in-up 900ms ease-out 500ms forwards" }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
          Dehradun, IN
        </span>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          MAIN TYPOGRAPHY BLOCK
      ══════════════════════════════════════════════════════════════ */}
      <div
        className="relative z-20 flex h-full flex-col justify-center"
        style={{ paddingLeft: "clamp(20px, 8vw, 120px)" }}
      >
        <h1
          className="text-pretty leading-[0.92] tracking-[-0.04em]"
          style={{ fontFamily: "var(--font-sans), Geist, sans-serif" }}
        >
          {/* Word 1: Code */}
          <span
            className="block font-light text-white opacity-0"
            style={{
              fontWeight: 300,
              fontSize: "clamp(56px, 10vw, 160px)",
              animation:
                "slide-from-left 1100ms cubic-bezier(0.2,0.7,0.2,1) 200ms forwards",
            }}
          >
            Code
          </span>

          {/* Word 2: Ship */}
          <span
            className="block italic opacity-0"
            style={{
              fontWeight: 800,
              fontSize: "clamp(56px, 10vw, 160px)",
              backgroundImage:
                "linear-gradient(90deg, #ffffff 0%, #ffffff 35%, #00e5ff 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
              clipPath: "inset(100% 0 0 0)",
              animation:
                "clip-reveal-up 1100ms cubic-bezier(0.65,0,0.2,1) 600ms forwards, fade-in 600ms ease-out 600ms forwards",
              willChange: "clip-path, transform",
            }}
          >
            Ship
          </span>

          {/* Word 3: Repeat */}
          <span
            className="block opacity-0"
            style={{
              fontWeight: 900,
              fontSize: "clamp(56px, 10vw, 160px)",
              color: "#ffffff",
              textShadow:
                "0 0 22px rgba(0,229,255,0.18), 0 0 60px rgba(0,229,255,0.08)",
              animation:
                "fade-scale-in 1200ms cubic-bezier(0.2,0.7,0.2,1) 1100ms forwards",
            }}
          >
            Repeat<span className="text-cyan-400/80">.</span>
          </span>
        </h1>

        {/* ── MOBILE availability badge (below headline) ── */}
        <div
          className="mt-6 flex flex-col gap-3 opacity-0 md:hidden"
          style={{ animation: "fade-in-up 800ms ease-out 1300ms forwards" }}
        >
          <span
            className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5"
            style={{
              background: "rgba(34,197,94,0.18)",
              border: "1px solid rgba(34,197,94,0.45)",
              boxShadow: "0 0 16px rgba(34,197,94,0.18)",
            }}
            aria-label="Open to opportunities"
          >
            <span className="relative flex h-2 w-2 items-center justify-center" aria-hidden>
              <span
                className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
                style={{ animation: "ping 1.8s cubic-bezier(0,0,0.2,1) infinite" }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            <span
              className="font-mono font-semibold uppercase tracking-[0.16em] text-green-300"
              style={{ fontSize: "11px" }}
            >
              Open to opportunities
            </span>
          </span>
        </div>

        {/* ── MOBILE STAT CARDS (below headline, visible on small screens) ── */}
        <div
          className="mt-6 flex gap-3 opacity-0 md:hidden"
          style={{ animation: "fade-in-up 800ms ease-out 1450ms forwards" }}
        >
          <StatCard target={4} label="Internships" icon="🏢" delay={1450} animDelay={0} />
          <StatCard target={6} label="Projects" icon="🚀" delay={1600} animDelay={60} />
          <StatCard target={4} label="Certs" icon="🏅" delay={1750} animDelay={120} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          RIGHT COLUMN — stat cards + open-for-work badge (desktop)
      ══════════════════════════════════════════════════════════════ */}
      <div className="absolute right-12 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-4 md:flex">
        {/* Top divider */}
        <div
          className="mb-1 h-px w-full bg-white/10 opacity-0"
          style={{ animation: "fade-in 900ms ease-out 1000ms forwards" }}
          aria-hidden
        />

        {/* Stat cards column */}
        <StatCard target={4} label="Internships" icon="🏢" delay={1200} animDelay={1200} />
        <StatCard target={6} label="Projects" icon="🚀" delay={1400} animDelay={1380} />
        <StatCard target={4} label="Certifications" icon="🏅" delay={1600} animDelay={1560} />

        {/* Bottom divider */}
        <div
          className="mt-3 h-px w-full bg-white/10 opacity-0"
          style={{ animation: "fade-in 900ms ease-out 1900ms forwards" }}
          aria-hidden
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          BOTTOM-LEFT — name + role
      ══════════════════════════════════════════════════════════════ */}
      <div
        className="absolute bottom-12 left-5 z-20 flex flex-col gap-1 opacity-0 md:left-[clamp(24px,8vw,120px)]"
        style={{ animation: "fade-in-up 900ms ease-out 1500ms forwards" }}
      >
        <div className="flex items-center gap-3">
          <span className="block h-px w-6 bg-white/30" aria-hidden />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/80">
            Siddharth Negi
          </span>
        </div>
        <span className="pl-9 font-mono text-[10px] tracking-[0.16em] text-white/35">
          Full-Stack Developer · AI-Native SaaS Builder
        </span>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          BOTTOM-RIGHT — scroll indicator (desktop)
      ══════════════════════════════════════════════════════════════ */}
      <div
        className="absolute bottom-12 right-12 z-20 hidden items-end gap-4 opacity-0 md:flex"
        style={{ animation: "fade-in 1000ms ease-out 1700ms forwards" }}
        aria-hidden
      >
        <span
          className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/40"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Scroll
        </span>
        <div className="relative h-16 w-px overflow-hidden bg-white/10">
          <span
            className="absolute left-1/2 top-0 block h-2 w-px -translate-x-1/2 bg-cyan-400"
            style={{
              animation: "travel-dot 2200ms cubic-bezier(0.65,0,0.35,1) infinite",
              animationDelay: "1900ms",
            }}
          />
        </div>
      </div>
    </section>
  )
}
