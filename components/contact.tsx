"use client"

import { useEffect, useRef, useState } from "react"

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/imsiddarthnegi" },
  { label: "GitHub", href: "https://github.com/imsiddarthnegi" },
  { label: "WhatsApp", href: "https://wa.me/917579156938" },
]

const EMAIL = "siddharthnegi.dev@gmail.com"

export function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)

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
      id="contact"
      ref={sectionRef}
      aria-label="Contact"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#020408" }}
    >
      {/* Top hairline */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-white/[0.06]" />

      {/* Faint cyan halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-1/3 left-1/2 h-[800px] w-[1100px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0, 229, 255, 0.08) 0%, rgba(0, 229, 255, 0) 60%)",
          filter: "blur(40px)",
        }}
      />

      <div
        className="relative grid grid-cols-1 items-start gap-8 lg:gap-16 lg:grid-cols-12"
        style={{
          paddingLeft: "clamp(24px, 8vw, 120px)",
          paddingRight: "clamp(24px, 8vw, 120px)",
          paddingTop: "clamp(120px, 18vh, 200px)",
          paddingBottom: "clamp(80px, 12vh, 140px)",
        }}
      >
        {/* Left: Giant text */}
        <div className="lg:col-span-7 w-full">
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
              Get In Touch · 2026
            </span>
          </div>

          <h2
            className="mt-10 lg:mt-12 text-pretty leading-[1.2] lg:leading-[1.1] tracking-[-0.045em] text-white"
            style={{ fontFamily: "var(--font-sans), Geist, sans-serif" }}
          >
            <span
              className="block font-light"
              style={{
                fontSize: "clamp(32px, 5vw, 64px)",
                fontWeight: 300,
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 900ms ease-out 250ms, transform 900ms ease-out 250ms",
              }}
            >
              Let&apos;s build
            </span>
            <span
              className="block italic"
              style={{
                fontSize: "clamp(32px, 5vw, 64px)",
                fontWeight: 700,
                backgroundImage:
                  "linear-gradient(90deg, #ffffff 0%, #ffffff 35%, #00e5ff 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 900ms ease-out 450ms, transform 900ms ease-out 450ms",
              }}
            >
              something<span className="text-cyan-400/80 not-italic">.</span>
            </span>
          </h2>
        </div>

        {/* Right: contact links */}
        <div className="flex flex-col gap-8 lg:gap-10 lg:col-span-5 w-full lg:pt-2">
          <div
            className="flex flex-col gap-4 lg:items-end"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 800ms ease-out 700ms, transform 800ms ease-out 700ms",
            }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">
              Email · Direct line
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(EMAIL)
                setEmailCopied(true)
                setTimeout(() => setEmailCopied(false), 2000)
              }}
              className="group relative inline-block text-left transition-all duration-200"
              style={{
                cursor: "pointer",
              }}
            >
              <span
                className="font-light tracking-[-0.02em] transition-all duration-200"
                style={{
                  fontSize: "clamp(22px, 2.8vw, 40px)",
                  fontWeight: 500,
                  color: emailCopied ? "rgba(0, 255, 204, 1)" : "rgba(255, 255, 255, 1)",
                  textShadow: emailCopied
                    ? "0 0 8px rgba(0, 255, 204, 0.4)"
                    : "none",
                }}
              >
                {emailCopied ? "Copied!" : EMAIL}
              </span>
              {/* Underline */}
              <span
                aria-hidden
                className="pointer-events-none absolute left-0 right-0 bg-cyan-400"
                style={{
                  bottom: "-6px",
                  height: "1px",
                  opacity: emailCopied ? 1 : 0,
                  transition: "opacity 200ms ease",
                }}
              />
              {/* Glow effect on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-200"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(0, 229, 255, 0.15) 0%, rgba(0, 229, 255, 0) 70%)",
                  filter: "blur(8px)",
                  inset: "-12px",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLSpanElement).style.opacity = "1"
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLSpanElement).style.opacity = "0"
                }}
              />
            </button>
          </div>

          <div
            className="flex flex-col gap-4 lg:items-end"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 800ms ease-out 850ms, transform 800ms ease-out 850ms",
            }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">
              Elsewhere
            </span>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 lg:justify-end">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-block transition-all duration-150 ease-out"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <span
                    className="font-light tracking-tight transition-all duration-150"
                    style={{
                      fontSize: "clamp(15px, 1.2vw, 17px)",
                      color: "rgba(255, 255, 255, 0.85)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLSpanElement
                      el.style.color = "rgba(255, 255, 255, 1)"
                      el.style.textDecoration = "underline"
                      el.style.textShadow = "0 0 8px rgba(0, 229, 255, 0.4)"
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLSpanElement
                      el.style.color = "rgba(255, 255, 255, 0.85)"
                      el.style.textDecoration = "none"
                      el.style.textShadow = "none"
                    }}
                  >
                    {s.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
