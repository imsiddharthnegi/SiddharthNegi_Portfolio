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
    years: "Jan — May 2026",
    role: "Full-Stack Developer Intern",
    company: "Tech Vista",
    description: "Engineered React.js component architecture and redesigned MongoDB schemas, reducing API response times by ~40% and improving page load performance across core product views.",
  },
  {
    years: "Jul — Dec 2025",
    role: "Web Developer",
    company: "LaunchED Global",
    description: "Owned 6+ features end-to-end in an ed-tech SaaS product — from scoping with designers to production deployment — moving at startup speed in a cross-functional team.",
  },
  {
    years: "Apr — Jun 2025",
    role: "Software Engineer Trainee",
    company: "Web Dev Open",
    description: "Designed 5+ RESTful endpoints with structured MongoDB schemas and integrated Gemini API to power an automated code-feedback pipeline for learners.",
  },
  {
    years: "Jan — Mar 2025",
    role: "Data Analyst Intern",
    company: "Blacksof",
    description: "Automated data processing pipelines in Python, cutting manual workload by 30%. Queried and analyzed large datasets with SQL to surface insights for business reporting.",
  },
]

function JourneyRow({
  entry,
  index,
  revealed,
  isLast,
}: {
  entry: Entry
  index: number
  revealed: boolean
  isLast: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      className={[
        "group relative w-full border-t border-white/[0.08] outline-none",
        isLast ? "border-b" : "",
      ].join(" ")}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 600ms ease-out, transform 600ms ease-out",
        transitionDelay: `${index * 90}ms`,
        backgroundImage: hovered
          ? "linear-gradient(90deg, rgba(0, 229, 255, 0.04) 0%, rgba(79, 10, 235, 0.05) 60%, rgba(0, 229, 255, 0.02) 100%)"
          : "none",
      }}
    >
      {/* Cyan left edge accent on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-full w-[2px] bg-cyan-400 transition-transform duration-500 ease-out"
        style={{
          transform: hovered ? "scaleY(1)" : "scaleY(0)",
          transformOrigin: "top",
          boxShadow: "0 0 24px rgba(0, 229, 255, 0.6)",
        }}
      />

      <div
        className="grid grid-cols-12 items-baseline gap-4 transition-all duration-500 ease-out"
        style={{
          paddingTop: hovered ? "32px" : "26px",
          paddingBottom: hovered ? "32px" : "26px",
        }}
      >
        {/* Years */}
        <div className="col-span-12 md:col-span-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
            {entry.years}
          </span>
        </div>

        {/* Role */}
        <div className="col-span-12 md:col-span-3">
          <h3
            className="text-balance font-medium tracking-[-0.01em] text-white"
            style={{ fontSize: "clamp(16px, 1.4vw, 20px)" }}
          >
            {entry.role}
          </h3>
        </div>

        {/* Company */}
        <div className="col-span-12 md:col-span-2">
          <span
            className="font-light tracking-tight text-cyan-300"
            style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}
          >
            {entry.company}
          </span>
        </div>

        {/* Description */}
        <div className="col-span-12 md:col-span-4 md:text-right">
          <p className="text-pretty text-sm leading-relaxed text-white/50 md:text-[15px]">
            {entry.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export function Journey() {
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
            Track Record · 2025—2026
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
            The
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
            Journey.
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
              revealed={revealed}
              isLast={i === ENTRIES.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
