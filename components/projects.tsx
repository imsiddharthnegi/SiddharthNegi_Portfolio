"use client"

import { useState } from "react"
import { ArrowUpRight, Github, ExternalLink } from "lucide-react"

type Project = {
  name: string
  description: string
  tech: string[]
  href: string
  demoUrl?: string
  githubUrl?: string
}

const PROJECTS: Project[] = [
  {
    name: "WritePro",
    description:
      "Full-stack AI writing SaaS for professionals and content creators. Features a distraction-free editor with real-time Claude-powered suggestions, project management dashboard, subscription billing, and secure auth — built end to end with Next.js and Supabase.",
    tech: ["NEXT.JS", "CLAUDE API", "SUPABASE", "PRISMA"],
    href: "https://writepro-ai.vercel.app/",
    demoUrl: "https://writepro-ai.vercel.app/",
    githubUrl: "https://github.com/imsiddharthnegi/WriteProAI",
  },
  {
    name: "LeadForge",
    description:
      "AI-powered lead generation platform that scrapes, enriches, and scores prospects in real time — cutting manual qualification time with Gemini-powered intelligence.",
    tech: ["REACT", "CLAUDE API", "VERCEL", "REST APIS"],
    href: "https://leadforgeproject.vercel.app/",
    demoUrl: "https://leadforgeproject.vercel.app/",
    githubUrl: "https://github.com/imsiddharthnegi/LeadForge",
  },
  {
    name: "StyleMatch",
    description:
      "AI-powered ecommerce recommendation engine with a personalized style quiz, AI-generated product explanations, and end-to-end Stripe checkout.",
    tech: ["LOVABLE", "JAVASCRIPT", "STRIPE", "POSTGRESQL"],
    href: "https://stylematchapp.lovable.app/",
    demoUrl: "https://stylematchapp.lovable.app/",
    githubUrl: "https://github.com/imsiddharthnegi/StyleMatch",
  },
  {
    name: "UrbanPulse",
    description:
      "Civic insights dashboard mapping real-time urban activity across cities — traffic, events, and public infrastructure on an interactive map interface.",
    tech: ["NEXT.JS", "MONGODB", "LEAFLET.JS", "VERCEL"],
    href: "https://projecturbanpulse.vercel.app/",
    demoUrl: "https://projecturbanpulse.vercel.app/",
    githubUrl: "https://github.com/imsiddharthnegi/UrbanPulse",
  },
  {
    name: "DisasterShield",
    description:
      "Emergency response platform aggregating live disaster feeds, shelter routing, and community alerts into a resilient mobile-first interface.",
    tech: ["REACT", "REST APIS", "TAILWIND", "FIREBASE"],
    href: "https://disastershieldin.vercel.app/",
    demoUrl: "https://disastershieldin.vercel.app/",
    githubUrl: "https://github.com/imsiddharthnegi/DisasterShield",
  },
  {
    name: "BrandForge",
    description:
      "Brand identity generator that creates logo concepts, voice guidelines, and color systems from a single prompt — built for solo founders shipping fast.",
    tech: ["FRAMER", "REACT", "TAILWIND CSS", "NODE.JS"],
    href: "https://brandforgeproject.lovable.app/",
    demoUrl: "https://brandforgeproject.lovable.app/",
    githubUrl: "https://github.com/imsiddharthnegi/brandforge",
  },
]

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false)
  const [demoHovered, setDemoHovered] = useState(false)
  const [githubHovered, setGithubHovered] = useState(false)
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

      <div
        className="block w-full"
        style={{
          paddingLeft: "clamp(24px, 8vw, 120px)",
          paddingRight: "clamp(24px, 8vw, 120px)",
          paddingTop: hovered ? "44px" : "32px",
          paddingBottom: hovered ? "44px" : "32px",
          transition: "all 500ms ease-out",
        }}
      >
        <div
          className="grid grid-cols-12 items-center gap-4"
          style={{
            transition: "all 500ms ease-out",
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

            {/* Expandable description — desktop: hover to expand; mobile: always visible */}
            <div
              className="overflow-hidden transition-all duration-500 ease-out mobile-description"
              style={{
                maxHeight: hovered ? "200px" : "0px",
                opacity: hovered ? 1 : 0,
                marginTop: hovered ? "12px" : "0px",
              }}
            >
              <p className="max-w-xl text-balance text-sm leading-relaxed text-white/55">
                {project.description}
              </p>

              {/* Action Buttons */}
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-3">
                {/* Live Demo Button */}
                <a
                  href={project.demoUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setDemoHovered(true)}
                  onMouseLeave={() => setDemoHovered(false)}
                  onClick={(e) => {
                    if (!project.demoUrl || project.demoUrl === "#") {
                      e.preventDefault()
                    }
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-cyan-400/40 bg-cyan-500/10 px-4 py-2.5 font-mono text-xs font-medium uppercase tracking-wide text-cyan-300 transition-all duration-200 ease-out hover:border-cyan-400/70 hover:bg-cyan-500/20 hover:scale-105 hover:text-cyan-200 cursor-pointer"
                  style={{
                    height: "40px",
                    fontSize: "12px",
                    fontWeight: 500,
                    padding: "10px 16px",
                    borderRadius: "6px",
                    gap: "8px",
                    backgroundColor: demoHovered ? "rgba(34, 211, 238, 0.15)" : "rgba(34, 211, 238, 0.05)",
                    borderColor: demoHovered ? "rgba(34, 211, 238, 0.7)" : "rgba(34, 211, 238, 0.4)",
                    color: demoHovered ? "rgb(165, 243, 252)" : "rgb(165, 243, 252)",
                    transform: demoHovered ? "scale(1.05)" : "scale(1)",
                  }}
                >
                  LIVE DEMO
                  <ExternalLink
                    className="h-3 w-3 transition-transform duration-200"
                    style={{
                      transform: demoHovered ? "translateX(2px)" : "translateX(0)",
                    }}
                  />
                </a>

                {/* GitHub Button */}
                <a
                  href={project.githubUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setGithubHovered(true)}
                  onMouseLeave={() => setGithubHovered(false)}
                  onClick={(e) => {
                    if (!project.githubUrl || project.githubUrl === "#") {
                      e.preventDefault()
                    }
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 px-4 py-2.5 font-mono text-xs font-medium uppercase tracking-wide text-white/70 transition-all duration-200 ease-out hover:border-white/30 hover:bg-white/10 hover:scale-105 hover:text-white/90 cursor-pointer"
                  style={{
                    height: "40px",
                    fontSize: "12px",
                    fontWeight: 500,
                    padding: "10px 16px",
                    borderRadius: "6px",
                    gap: "8px",
                    backgroundColor: githubHovered ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.03)",
                    borderColor: githubHovered ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.15)",
                    color: githubHovered ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.7)",
                    transform: githubHovered ? "scale(1.05)" : "scale(1)",
                  }}
                >
                  GITHUB
                  <Github className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Tech pills */}
          <div className="col-span-12 mt-4 flex flex-wrap items-center gap-2.5 md:col-span-4 md:mt-0 md:justify-end">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded transition-all duration-300"
                style={{
                  padding: "8px",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-mono), monospace",
                  backgroundColor: "rgba(100, 116, 139, 0.1)",
                  border: "1px solid rgba(100, 116, 139, 0.3)",
                  borderRadius: "6px",
                  color: "rgba(255, 255, 255, 0.7)",
                  transform: hovered ? "scale(1.05)" : "scale(1)",
                  backgroundColor: hovered ? "rgba(100, 116, 139, 0.2)" : "rgba(100, 116, 139, 0.1)",
                  color: hovered ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.7)",
                  borderColor: hovered ? "rgba(100, 116, 139, 0.5)" : "rgba(100, 116, 139, 0.3)",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Arrow */}
          <div className="col-span-12 mt-4 flex items-center justify-end md:col-span-1 md:mt-0">
            <a
              href={project.demoUrl || project.href || "#"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (!project.demoUrl && project.href === "#") {
                  e.preventDefault()
                }
              }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-500 ease-out hover:no-underline"
              style={{
                borderColor: hovered
                  ? "rgba(0, 229, 255, 0.5)"
                  : "rgba(255, 255, 255, 0.12)",
                backgroundColor: hovered
                  ? "rgba(0, 229, 255, 0.08)"
                  : "rgba(255, 255, 255, 0.02)",
                transform: hovered ? "rotate(45deg)" : "rotate(0deg)",
                cursor: project.demoUrl && project.demoUrl !== "#" ? "pointer" : "default",
              }}
            >
              <ArrowUpRight
                className="h-4 w-4 transition-colors duration-500"
                style={{
                  color: hovered ? "rgb(103, 232, 249)" : "rgba(255, 255, 255, 0.6)",
                }}
              />
            </a>
          </div>
        </div>
      </div>
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
