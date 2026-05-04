"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"

type Project = {
  name: string
  description: string
  tech: string[]
  href: string
}

const PROJECTS: Project[] = [
  {
    name: "LeadForge",
    description:
      "AI-powered lead generation platform that scrapes, enriches, and scores prospects in real time using Gemini for intelligent qualification.",
    tech: ["REACT", "GEMINI API", "VERCEL"],
    href: "#",
  },
  {
    name: "UrbanPulse",
    description:
      "Civic insights dashboard mapping real-time urban activity across cities — traffic, events, and public infrastructure on an interactive Leaflet canvas.",
    tech: ["NEXT.JS", "MONGODB", "LEAFLET.JS"],
    href: "#",
  },
  {
    name: "DisasterShield",
    description:
      "Emergency response companion aggregating live disaster feeds, shelter routing, and community alerts into a single resilient mobile-first interface.",
    tech: ["REACT", "REST APIS", "TAILWIND"],
    href: "#",
  },
  {
    name: "CarbonTrace",
    description:
      "Personal carbon footprint tracker with Gemini-powered habit insights and beautiful visual breakdowns of weekly emissions across categories.",
    tech: ["REACT", "CHART.JS", "GEMINI API"],
    href: "#",
  },
  {
    name: "StyleMatch",
    description:
      "AI-powered ecommerce recommendation engine. Users complete a 60-second style quiz, get personalized product recommendations with AI explanations, and checkout via Stripe. Built with Lovable (no-code), Claude AI, and real-time filtering.",
    tech: ["JAVASCRIPT", "TAILWIND CSS", "CLAUDE AI", "STRIPE", "DATABASE"],
    href: "https://stylematchapp.lovable.app",
  },
  {
    name: "BrandForge",
    description:
      "Brand identity generator that drafts logos, voice guidelines, and color systems from a single prompt — built for solo founders shipping fast.",
    tech: ["REACT", "GEMINI API", "TAILWIND"],
    href: "#",
  },
]

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false)
  const isLast = index === PROJECTS.length - 1

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className={[
        "group relative w-full overflow-hidden border-t border-white/[0.08] transition-all duration-500 ease-out",
        isLast ? "border-b" : "",
      ].join(" ")}
      style={{
        backgroundImage: hovered
          ? "linear-gradient(90deg, rgba(0, 229, 255, 0.04) 0%, rgba(79, 10, 235, 0.06) 50%, rgba(0, 229, 255, 0.02) 100%)"
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

      <a
        href={project.href}
        className="block w-full"
        aria-label={`${project.name} — Live demo`}
      >
        <div
          className="grid grid-cols-12 items-center gap-4 transition-all duration-500 ease-out"
          style={{
            paddingLeft: "clamp(24px, 8vw, 120px)",
            paddingRight: "clamp(24px, 8vw, 120px)",
            paddingTop: hovered ? "44px" : "32px",
            paddingBottom: hovered ? "44px" : "32px",
          }}
        >
          {/* Number */}
          <div className="col-span-2 md:col-span-1">
            <span
              className="font-mono text-3xl font-light tabular-nums tracking-tight transition-colors duration-500 md:text-4xl"
              style={{
                color: hovered ? "rgba(0, 229, 255, 0.9)" : "rgba(255, 255, 255, 0.18)",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Name + reveal description */}
          <div className="col-span-10 md:col-span-6">
            <h3
              className="text-pretty font-light tracking-[-0.02em] text-white"
              style={{
                fontSize: "clamp(28px, 4vw, 56px)",
                lineHeight: 1.05,
                fontWeight: 400,
              }}
            >
              {project.name}
            </h3>

            {/* Expandable description */}
            <div
              className="overflow-hidden transition-all duration-500 ease-out"
              style={{
                maxHeight: hovered ? "120px" : "0px",
                opacity: hovered ? 1 : 0,
                marginTop: hovered ? "12px" : "0px",
              }}
            >
              <p className="max-w-xl text-balance text-sm leading-relaxed text-white/55">
                {project.description}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="block h-px w-4 bg-cyan-400/60" />
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-300/80">
                  Live Demo
                </span>
              </div>
            </div>
          </div>

          {/* Tech pills */}
          <div className="col-span-12 mt-4 flex flex-wrap items-center gap-2 md:col-span-4 md:mt-0 md:justify-end">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/50 transition-colors duration-500"
                style={{
                  borderColor: hovered ? "rgba(0, 229, 255, 0.25)" : undefined,
                  color: hovered ? "rgba(255, 255, 255, 0.75)" : undefined,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Arrow */}
          <div className="col-span-12 mt-4 flex items-center justify-end md:col-span-1 md:mt-0">
            <span
              aria-hidden
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-500 ease-out"
              style={{
                borderColor: hovered
                  ? "rgba(0, 229, 255, 0.5)"
                  : "rgba(255, 255, 255, 0.12)",
                backgroundColor: hovered
                  ? "rgba(0, 229, 255, 0.08)"
                  : "rgba(255, 255, 255, 0.02)",
                transform: hovered ? "rotate(45deg)" : "rotate(0deg)",
              }}
            >
              <ArrowUpRight
                className="h-4 w-4 transition-colors duration-500"
                style={{
                  color: hovered ? "rgb(103, 232, 249)" : "rgba(255, 255, 255, 0.6)",
                }}
              />
            </span>
          </div>
        </div>
      </a>
    </div>
  )
}

export function Projects() {
  return (
    <section
      id="projects"
      aria-label="Selected projects"
      className="relative w-full"
      style={{ backgroundColor: "#020408" }}
    >
      {/* Section header */}
      <div
        className="pt-24 pb-16 md:pt-32 md:pb-20"
        style={{
          paddingLeft: "clamp(24px, 8vw, 120px)",
          paddingRight: "clamp(24px, 8vw, 120px)",
        }}
      >
        <div className="flex items-center gap-3">
          <span className="block h-1.5 w-1.5 rounded-full bg-cyan-400/80" />
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-300/80">
            Selected Work · 2025—2026
          </span>
        </div>

        <h2
          className="mt-8 text-pretty leading-[0.92] tracking-[-0.04em] text-white"
          style={{ fontFamily: "var(--font-sans), Geist, sans-serif" }}
        >
          <span
            className="block font-light"
            style={{ fontSize: "clamp(56px, 9vw, 128px)", fontWeight: 300 }}
          >
            Things I&apos;ve
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
            Shipped.
          </span>
        </h2>
      </div>

      {/* Project rows */}
      <div className="w-full">
        {PROJECTS.map((p, i) => (
          <ProjectRow key={p.name} project={p} index={i} />
        ))}
      </div>

      {/* Footer meta */}
      <div
        className="flex flex-col items-start justify-between gap-4 py-10 md:flex-row md:items-center"
        style={{
          paddingLeft: "clamp(24px, 8vw, 120px)",
          paddingRight: "clamp(24px, 8vw, 120px)",
        }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">
          {String(PROJECTS.length).padStart(2, "0")} Projects · Hover to expand
        </span>
        <a
          href="#contact"
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-white/70 transition-colors hover:text-white"
        >
          <span className="block h-px w-6 bg-white/30 transition-all duration-300 group-hover:w-10 group-hover:bg-cyan-400" />
          Start a Project
        </a>
      </div>
    </section>
  )
}
