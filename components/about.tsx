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
        {/* LEFT: Big "01" + portrait placeholder */}
        <div className="relative flex items-center justify-center lg:justify-start">
          {/* Massive 01 number behind */}
          <span
            aria-hidden
            className="pointer-events-none absolute select-none font-light leading-none text-white"
            style={{
              fontSize: "clamp(280px, 38vw, 560px)",
              opacity: 0.08,
              letterSpacing: "-0.06em",
              left: "-2vw",
              top: "50%",
              transform: revealed ? "translateY(-50%)" : "translateY(-46%)",
              transition: "transform 1400ms cubic-bezier(0.2, 0.7, 0.2, 1)",
              fontFamily: "var(--font-sans), Geist, sans-serif",
              fontWeight: 200,
            }}
          >
            01
          </span>

          {/* Portrait placeholder */}
          <div
            className="relative"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 900ms ease-out 200ms, transform 900ms cubic-bezier(0.2, 0.7, 0.2, 1) 200ms",
            }}
          >
            <div
              className="relative grid place-items-center overflow-hidden rounded-2xl border"
              style={{
                width: "clamp(240px, 28vw, 360px)",
                height: "clamp(240px, 28vw, 360px)",
                backgroundColor: "#06080d",
                borderColor: "rgba(0, 229, 255, 0.18)",
                boxShadow:
                  "0 0 0 1px rgba(0, 229, 255, 0.08), 0 0 60px rgba(0, 229, 255, 0.10), inset 0 0 80px rgba(0, 229, 255, 0.04)",
              }}
            >
              {/* Subtle inner gradient */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 30% 20%, rgba(0, 229, 255, 0.08) 0%, rgba(0, 229, 255, 0) 60%)",
                }}
              />
              {/* Corner ticks */}
              <span aria-hidden className="absolute left-3 top-3 h-3 w-3 border-l border-t border-cyan-400/40" />
              <span aria-hidden className="absolute right-3 top-3 h-3 w-3 border-r border-t border-cyan-400/40" />
              <span aria-hidden className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-cyan-400/40" />
              <span aria-hidden className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-cyan-400/40" />

              {/* Initials */}
              <span
                className="relative font-light tracking-[-0.04em] text-white"
                style={{
                  fontSize: "clamp(80px, 11vw, 144px)",
                  fontFamily: "var(--font-sans), Geist, sans-serif",
                  textShadow: "0 0 40px rgba(0, 229, 255, 0.25)",
                }}
              >
                SN
              </span>

              {/* Bottom hairline meta */}
              <span
                aria-hidden
                className="absolute bottom-4 left-4 right-4 flex items-center justify-between"
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/35">
                  Engineer / 2026
                </span>
                <span className="block h-1 w-1 rounded-full bg-cyan-400" />
              </span>
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
              "Six shipped products, four internships, and a bias toward building things people actually use. I've worked across ed-tech SaaS, civic tech, and AI tooling — owning features from the first commit to production, and turning vague briefs into things real users press buttons on.",
              "Full-stack by discipline, AI-native by choice. My stack: Next.js, React, and Tailwind on the front; Node.js, MongoDB, and AWS on the back. I layer in Gemini and Claude APIs where intelligence adds real value — not as a buzzword, but as a feature. AWS & GCP certified — I prefer infrastructure I can reason about.",
              "Craft is non-negotiable. Pixel-precise UI, sub-100ms perceived performance, accessible by default. I sweat the spacing, the easing curves, and the empty states — because the gap between good and great is felt, not always seen.",
            ].map((text, i) => (
              <p
                key={i}
                className="text-pretty text-[15px] leading-relaxed text-white/55 md:text-[16px]"
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

          {/* Stats row */}
          <div
            className="mt-14 grid grid-cols-4 gap-x-10 gap-y-6 border-t border-white/[0.08] pt-8"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 700ms ease-out 1100ms, transform 700ms ease-out 1100ms",
            }}
          >
            {STATS.map((s, i) => (
              <div key={s.label} className="flex flex-col gap-1.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">
                  <span className="text-cyan-400/70">{String(i + 1).padStart(2, "0")}</span>{" "}
                  {s.label}
                </span>
                <span
                  className="font-light tracking-tight text-white"
                  style={{ fontSize: "clamp(13px, 1.2vw, 17px)" }}
                >
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
