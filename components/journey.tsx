"use client"

import { useEffect, useRef, useState } from "react"

type Entry = {
  years: string
  role: string
  company: string
  description: string
}

const ENTRIES: Entry[] = [
  {
    years: "Jan — June 2026",
    role: "Full-Stack Developer",
    company: "Techvista Global",
    description: "Engineered React.js component architecture and redesigned MongoDB schemas, reducing API response times by ~40% and improving page load performance across core product views.",
  },
  {
    years: "Jul — Dec 2025",
    role: "Web Developer",
    company: "LaunchED Global",
    description: "Owned 6+ features end-to-end in an ed-tech SaaS product — from scoping with designers to production deployment — moving at startup speed in a cross-functional team.",
  },
  {
    years: "JULY 2024 — JUNE 2025 ",
    role: "Founding Engineer - TECH",
    company: "Zero Monk",
    description: "Founding engineer at a college ed-tech startup — built and shipped the platform serving 300+ schools across India, owning full-stack decisions from architecture to deployment.",
  },
]

function JourneyRow({
  entry,
  index,
  isLast,
}: {
  entry: Entry
  index: number
  isLast: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const cardElement = ref.current
    if (!cardElement) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(cardElement)
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(cardElement)
    return () => observer.disconnect()
  }, [index])

  const isActive = index === 0

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      className="group relative w-full outline-none transition-all duration-200"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transitionProperty: "opacity, transform, background-color, border-color",
        transitionDuration: "0.5s, 0.5s, 0.2s, 0.2s",
        transitionTimingFunction: "ease-out, ease-out, ease, ease",
        transitionDelay: `${index * 120}ms`,
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
        borderBottom: isLast ? "1px solid rgba(255, 255, 255, 0.05)" : "none",
        borderLeft: hovered
          ? "3px solid rgba(0, 210, 255, 0.3)"
          : isActive
          ? "3px solid rgba(0, 210, 255, 1)"
          : "3px solid rgba(0, 210, 255, 0.08)",
        backgroundColor: hovered
          ? "rgba(255, 255, 255, 0.03)"
          : isActive
          ? "rgba(0, 210, 255, 0.04)"
          : "transparent",
      }}
    >
      <div
        className="grid grid-cols-12 items-baseline gap-4 transition-all duration-200"
        style={{
          paddingTop: hovered ? "32px" : "26px",
          paddingBottom: hovered ? "32px" : "26px",
          paddingLeft: "24px",
          paddingRight: "24px",
        }}
      >
          {/* Years */}
        <div className="col-span-12 md:col-span-3">
          <span 
            className="font-mono uppercase tracking-[0.18em] transition-colors duration-200"
            style={{ 
              fontSize: 13,
              color: isActive ? "rgba(0,210,255,0.9)" : "rgba(255,255,255,0.4)" 
            }}
          >
            {entry.years}
          </span>
        </div>

        {/* Role */}
        <div className="col-span-12 md:col-span-3">
          <h3
            className="text-balance font-semibold tracking-[-0.01em] transition-colors duration-200"
            style={{ 
              fontSize: "clamp(18px, 1.5vw, 22px)",
              color: hovered ? "rgba(0,210,255,0.9)" : "#ffffff" 
            }}
          >
            {entry.role}
          </h3>
        </div>

        {/* Company */}
        <div className="col-span-12 md:col-span-2">
          <span
            className="font-light tracking-tight transition-colors duration-200"
            style={{ 
              fontSize: "clamp(15px, 1.3vw, 18px)",
              color: isActive && !hovered ? "rgba(0,210,255,1)" : hovered ? "rgba(0,210,255,0.8)" : "rgba(0,229,255,0.6)"
            }}
          >
            {entry.company}
          </span>
        </div>

        {/* Description */}
        <div className="col-span-12 md:col-span-4 md:text-right">
          <p 
            className="text-pretty text-sm leading-relaxed transition-opacity duration-200 md:text-[15px]"
            style={{ color: "#ffffff", opacity: hovered ? 0.85 : 0.6 }}
          >
            {entry.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export function Journey() {
  const sectionRef = useRef<HTMLElement | null>(null)

  return (
    <section
      id="journey"
      ref={sectionRef}
      aria-label="The journey — work history"
      className="relative w-full"
      style={{ backgroundColor: "#020408" }}
    >
      {/* Section header */}
      <div
        className="pt-24 pb-14 md:pt-32 md:pb-16"
        style={{
          paddingLeft: "clamp(24px, 8vw, 120px)",
          paddingRight: "clamp(24px, 8vw, 120px)",
        }}
      >
        <div className="flex items-center gap-3">
          <span className="block h-1.5 w-1.5 rounded-full bg-cyan-400/80" />
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-300/80">
            Experience · 2025—2026
          </span>
        </div>

        <h2
          className="mt-8 text-pretty leading-[0.92] tracking-[-0.04em] text-white"
          style={{
            fontFamily: "var(--font-sans), Geist, sans-serif",
          }}
        >
          <span
            className="block font-light"
            style={{ fontSize: "clamp(56px, 9vw, 128px)", fontWeight: 300 }}
          >
            Where I've
          </span>
          <span
            className="block italic"
            style={{
              fontSize: "clamp(56px, 9vw, 128px)",
              fontWeight: 800,
              backgroundImage:
                "linear-gradient(90deg, #ffffff 0%, #ffffff 40%, #00e5ff 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
            }}
          >
            Worked.
          </span>
        </h2>
      </div>

      {/* Rows */}
      <div
        className="pb-24 md:pb-32"
        style={{
          paddingLeft: "clamp(24px, 8vw, 120px)",
          paddingRight: "clamp(24px, 8vw, 120px)",
        }}
      >
        <div className="flex flex-col">
          {ENTRIES.map((e, i) => (
            <JourneyRow
              key={e.company}
              entry={e}
              index={i}
              isLast={i === ENTRIES.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
