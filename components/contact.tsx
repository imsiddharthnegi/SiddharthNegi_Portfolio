"use client"

import { useEffect, useRef, useState } from "react"
import { useIsMobile } from "@/components/ui/use-mobile"

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/imsiddarthnegi" },
  { label: "GitHub", href: "https://github.com/imsiddarthnegi" },
  { label: "WhatsApp", href: "https://wa.me/919389273455" },
]

const EMAIL = "siddharthnegi.dev@gmail.com"

function TravelingLink({
  children,
  href,
  external,
  className,
  size = "lg",
  isEmail = false,
}: {
  children: React.ReactNode
  href: string
  external?: boolean
  className?: string
  size?: "lg" | "sm"
  isEmail?: boolean
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={[
        "group relative inline-block transition-all duration-300",
        isEmail ? "hover:scale-105" : "hover:scale-102",
        className ?? "",
      ].join(" ")}
    >
      <span className="relative inline-block">
        {children}
        {/* Static base underline (very faint) */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 bg-white/15"
          style={{ bottom: size === "lg" ? "-6px" : "-3px", height: "1px" }}
        />
        {/* Traveling line */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 block bg-cyan-400 transition-[width,transform] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:w-full"
          style={{
            bottom: size === "lg" ? "-6px" : "-3px",
            height: "1px",
            width: "0%",
            boxShadow: isEmail
              ? "0 0 20px rgba(0, 229, 255, 0.8), 0 0 40px rgba(0, 229, 255, 0.4)"
              : "0 0 12px rgba(0, 229, 255, 0.6)",
          }}
        />
      </span>
      {/* Email glow effect on hover */}
      {isEmail && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0, 229, 255, 0.15) 0%, rgba(0, 229, 255, 0) 70%)",
            filter: "blur(8px)",
            inset: "-12px",
          }}
        />
      )}
    </a>
  )
}

export function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [revealed, setRevealed] = useState(false)
  const isMobile = useIsMobile()

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
        className="contact-inner relative grid grid-cols-1 lg:grid-cols-12 items-start"
        style={{
          paddingLeft: "clamp(24px, 8vw, 120px)",
          paddingRight: "clamp(24px, 8vw, 120px)",
          paddingTop: isMobile ? "80px" : "clamp(96px, 14vh, 160px)",
          paddingBottom: isMobile ? "32px" : "clamp(80px, 12vh, 120px)",
          gap: isMobile ? "24px" : "clamp(32px, 4vw, 64px)",
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
            className="mt-4 lg:mt-5 text-pretty leading-[1.2] lg:leading-[1.1] tracking-[-0.045em] text-white"
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
              Let&apos;s work
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
              together<span className="text-cyan-400/80 not-italic">.</span>
            </span>
          </h2>
        </div>

        {/* Right: contact links */}
        <div className="flex flex-col gap-8 lg:gap-10 lg:col-span-5 w-full">
          <div
            className="flex flex-col gap-4 lg:items-end"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 800ms ease-out 700ms, transform 800ms ease-out 700ms",
            }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">
              Currently Available · Open to Full-Time Roles
            </span>
            <TravelingLink href={`mailto:${EMAIL}`} size="lg" isEmail>
              <span
                className="font-light tracking-[-0.02em] text-white hover:text-cyan-300 transition-colors duration-300"
                style={{
                  fontSize: "clamp(22px, 2.8vw, 40px)",
                  fontWeight: 500,
                }}
              >
                {EMAIL}
              </span>
            </TravelingLink>
          </div>

          <div
            className="flex flex-col gap-4 lg:items-end"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 800ms ease-out 850ms, transform 800ms ease-out 850ms",
            }}
          >
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 lg:justify-end">
              {SOCIALS.map((s) => (
                <TravelingLink key={s.label} href={s.href} external size="sm">
                  <span
                    className="font-light tracking-tight text-white/85 transition-colors duration-300 ease-out hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.6)] underline-offset-2"
                    style={{ fontSize: "clamp(15px, 1.2vw, 17px)" }}
                  >
                    {s.label}
                  </span>
                </TravelingLink>
              ))}
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">
              Based in India · IST · Open to Relocation
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
