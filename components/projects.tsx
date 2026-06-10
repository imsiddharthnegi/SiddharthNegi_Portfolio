"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
type Project = {
  id: number
  name: string
  description: string
  tech: string[]
  demoUrl: string
  githubUrl: string
  image: string
  category: string
}

const PROJECTS: Project[] = [
  {
    id: 1,
    name: "HORA",
    description:
      "Luxury watch brand landing page with cinematic design, bento-grid gallery, and smooth scroll animations — craft-first frontend.",
    tech: ["NEXT.JS", "TYPESCRIPT", "TAILWIND CSS", "FRAMER MOTION"],
    demoUrl: "https://horatime.vercel.app/",
    githubUrl: "https://github.com/imsiddharthnegi/HORA",
    image: "/projects/hora.png",
    category: "LANDING PAGE",
  },
  {
    id: 2,
    name: "Botanitual",
    description:
      "Premium skincare e-commerce with clean product showcase, smooth animations, and a minimal aesthetic built for conversion.",
    tech: ["NEXT.JS", "TYPESCRIPT", "TAILWIND CSS", "FRAMER MOTION"],
    demoUrl: "https://botanitual.vercel.app/",
    githubUrl: "https://github.com/imsiddharthnegi/Botanitual",
    image: "/projects/botanitual.png",
    category: "E-COMMERCE",
  },
  {
    id: 3,
    name: "WritePro",
    description:
      "AI writing platform with tone control, rewrite suggestions, and export — built for creators who move fast.",
    tech: ["NEXT.JS", "TYPESCRIPT", "SUPABASE", "CLERK", "GEMINI API"],
    demoUrl: "https://trywritepro.vercel.app/",
    githubUrl: "https://github.com/imsiddharthnegi/WriteProAI",
    image: "/projects/writepro.png",
    category: "SAAS PLATFORM",
  },
  {
    id: 4,
    name: "LeadForge",
    description:
      "B2B lead intelligence tool that enriches and scores prospects using AI — built for outbound sales teams.",
    tech: ["REACT", "TAILWIND CSS", "GROQ API", "NODE.JS"],
    demoUrl: "https://leadforgeproject.vercel.app/",
    githubUrl: "https://github.com/imsiddharthnegi/LeadForge",
    image: "/projects/leadforge.png",
    category: "AI TOOL",
  },
  {
    id: 5,
    name: "StyleMatch",
    description:
      "AI-powered outfit recommendation engine — upload a photo, get styled. Built for fashion-forward users who want smart suggestions.",
    tech: ["REACT", "TAILWIND CSS", "GEMINI API"],
    demoUrl: "https://stylematchapp.lovable.app/",
    githubUrl: "https://github.com/imsiddharthnegi/StyleMatch",
    image: "/projects/stylematch.png",
    category: "AI TOOL",
  },
  {
    id: 6,
    name: "UrbanPulse",
    description:
      "City discovery platform surfacing local events, food, and culture in real time — built for explorers, not tourists.",
    tech: ["NEXT.JS", "MONGODB", "NODE.JS", "TAILWIND CSS"],
    demoUrl: "https://projecturbanpulse.vercel.app/",
    githubUrl: "https://github.com/imsiddharthnegi/UrbanPulse",
    image: "/projects/urbanpulse.png",
    category: "WEB APP",
  },
]

/* ─────────────────────────────────────────────
   PLACEHOLDER IMAGE (renders inside the card)
───────────────────────────────────────────── */
function ProjectPlaceholder({ name, index }: { name: string; index: number }) {
  // Unique gradient per project
  const gradients = [
    "radial-gradient(ellipse at 30% 40%, rgba(0,229,255,0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(79,10,235,0.22) 0%, transparent 55%)",
    "radial-gradient(ellipse at 70% 30%, rgba(168,85,247,0.18) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(0,229,255,0.15) 0%, transparent 55%)",
    "radial-gradient(ellipse at 50% 50%, rgba(52,211,153,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(0,229,255,0.12) 0%, transparent 55%)",
    "radial-gradient(ellipse at 20% 60%, rgba(251,191,36,0.12) 0%, transparent 60%), radial-gradient(ellipse at 75% 30%, rgba(0,229,255,0.18) 0%, transparent 55%)",
    "radial-gradient(ellipse at 60% 40%, rgba(244,114,182,0.15) 0%, transparent 60%), radial-gradient(ellipse at 25% 75%, rgba(79,10,235,0.2) 0%, transparent 55%)",
    "radial-gradient(ellipse at 40% 60%, rgba(34,211,238,0.18) 0%, transparent 60%), radial-gradient(ellipse at 70% 25%, rgba(168,85,247,0.15) 0%, transparent 55%)",
  ]

  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{ background: "#0a0a0f", backgroundImage: gradients[index] }}
    >
      {/* Grid lines */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Project name as large watermark */}
      <span
        className="select-none text-center font-bold uppercase tracking-widest"
        style={{
          fontSize: "clamp(28px, 5vw, 64px)",
          color: "rgba(255,255,255,0.06)",
          letterSpacing: "0.18em",
          lineHeight: 1,
        }}
      >
        {name}
      </span>
      {/* Corner bracket decoration */}
      {[
        { top: 16, left: 16, rotate: 0 },
        { top: 16, right: 16, rotate: 90 },
        { bottom: 16, right: 16, rotate: 180 },
        { bottom: 16, left: 16, rotate: 270 },
      ].map((pos, i) => (
        <span
          key={i}
          className="pointer-events-none absolute block"
          style={{
            top: pos.top,
            left: (pos as { left?: number }).left,
            right: (pos as { right?: number }).right,
            bottom: pos.bottom,
            width: 20,
            height: 20,
            borderTop: i === 0 || i === 3 ? "1.5px solid rgba(0,229,255,0.3)" : "none",
            borderBottom: i === 1 || i === 2 ? "1.5px solid rgba(0,229,255,0.3)" : "none",
            borderLeft: i === 0 || i === 2 ? "1.5px solid rgba(0,229,255,0.3)" : "none",
            borderRight: i === 1 || i === 3 ? "1.5px solid rgba(0,229,255,0.3)" : "none",
            transform: `rotate(${pos.rotate}deg)`,
          }}
        />
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────
   PROJECT FRAME (screenshot in rounded frame)
───────────────────────────────────────────── */
function ProjectFrame({ project, index }: { project: Project; index: number }) {
  const [errored, setErrored] = useState(false)

  return (
    <div
      className="group relative"
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "#0a0a0a",
        border: "1px solid #333",
      }}
    >
      {errored ? (
        <ProjectPlaceholder name={project.name} index={index} />
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={project.image}
            src={project.image}
            alt={`${project.name} screenshot`}
            onError={() => setErrored(true)}
            draggable={false}
            className="transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              display: "block",
            }}
          />
          <div 
            className="pointer-events-none absolute bottom-0 left-0 w-full h-1/3"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)"
            }}
          />
        </>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────
   NAV ARROW BUTTON
───────────────────────────────────────────── */
function ArrowBtn({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right"
  onClick: () => void
  disabled: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={direction === "left" ? "Previous project" : "Next project"}
      className="relative z-20 flex items-center justify-center rounded-full border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
      style={{
        width: 52,
        height: 52,
        borderColor: hovered ? "rgba(0,210,255,1)" : "rgba(255,255,255,0.15)",
        backgroundColor: hovered ? "rgba(0,210,255,0.15)" : "rgba(255,255,255,0.08)",
        boxShadow: hovered ? "0 0 16px rgba(0,210,255,0.4)" : "none",
        backdropFilter: "blur(8px)",
        flexShrink: 0,
      }}
    >
      {direction === "left" ? (
        <ChevronLeft
          className="h-5 w-5 transition-colors duration-200"
          style={{ color: "#ffffff" }}
        />
      ) : (
        <ChevronRight
          className="h-5 w-5 transition-colors duration-200"
          style={{ color: "#ffffff" }}
        />
      )}
    </button>
  )
}

/* ─────────────────────────────────────────────
   MAIN PROJECTS COMPONENT
───────────────────────────────────────────── */
export function Projects() {
  const [current, setCurrent] = useState<number>(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [cardHovered, setCardHovered] = useState(false)

  const total = PROJECTS.length

  const goTo = useCallback(
    (idx: number, dir: 1 | -1) => {
      setDirection(dir)
      setCurrent(idx)
    },
    []
  )

  const prev = useCallback(() => {
    const idx = (current - 1 + total) % total
    goTo(idx, -1)
  }, [current, total, goTo])

  const next = useCallback(() => {
    const idx = (current + 1) % total
    goTo(idx, 1)
  }, [current, total, goTo])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [prev, next])

  const project = PROJECTS[current]

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "60%" : "-60%",
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: "0%",
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-60%" : "60%",
      opacity: 0,
      scale: 0.96,
    }),
  }

  return (
    <section
      id="projects"
      aria-label="Selected projects"
      className="relative w-full"
      style={{ backgroundColor: "#020408" }}
    >
      {/* ── Section header ── */}
      <div
        className="pt-24 pb-12 md:pt-32 md:pb-14"
        style={{
          paddingLeft: "clamp(24px, 8vw, 120px)",
          paddingRight: "clamp(24px, 8vw, 120px)",
        }}
      >
        <div className="flex items-center gap-3">
          <span className="block h-1.5 w-1.5 rounded-full bg-cyan-400/80" />
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-300/80">
            PROJECTS
          </span>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <h2
            className="text-pretty leading-[0.92] tracking-[-0.04em] text-white"
            style={{ fontFamily: "var(--font-sans), Geist, sans-serif" }}
          >
            <span
              className="block font-light"
              style={{ fontSize: "clamp(48px, 8vw, 112px)", fontWeight: 300 }}
            >
              Things I&apos;ve
            </span>
            <span
              className="block italic"
              style={{
                fontSize: "clamp(48px, 8vw, 112px)",
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
      </div>

      {/* ── Viewer wrapper ── */}
      <div
        className="relative w-full"
        style={{
          paddingLeft: "clamp(16px, 5vw, 80px)",
          paddingRight: "clamp(16px, 5vw, 80px)",
          paddingBottom: "clamp(48px, 6vw, 96px)",
        }}
      >
        {/* Row: arrow + card + arrow */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Left arrow */}
          <ArrowBtn direction="left" onClick={prev} disabled={false} />

          {/* ── The Card ── */}
          <div
            className="relative flex-1 overflow-hidden rounded-2xl"
            onMouseEnter={() => setCardHovered(true)}
            onMouseLeave={() => setCardHovered(false)}
            style={{
              backgroundColor: "#0d0d12",
              border: "1px solid rgba(0,229,255,0.14)",
              boxShadow: cardHovered
                ? "0 0 0 1px rgba(0,210,255,0.2), 0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(0,229,255,0.04) inset"
                : "0 0 0 1px rgba(0,229,255,0.06), 0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(0,229,255,0.04) inset",
              transition: "box-shadow 0.3s ease",
              padding: 24,
            }}
          >
            {/* Subtle top glow line */}
            <div
              className="pointer-events-none absolute left-0 top-0 h-px w-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(0,229,255,0.35) 35%, rgba(0,229,255,0.35) 65%, transparent 100%)",
              }}
            />

            <AnimatePresence custom={direction} initial={false} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full"
                style={{ display: "flex", flexDirection: "row", alignItems: "stretch", gap: 32 }}
              >
                {/* ── LEFT: Browser mockup with screenshot (52%) ── */}
                <div
                  style={{
                    width: "52%",
                    display: "flex",
                  }}
                >
                  <ProjectFrame project={project} index={current} />
                </div>

                {/* ── RIGHT: Details (48%) ── */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    width: "48%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 12,
                  }}
                >
                  {/* Category and Project Number */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.2em",
                        color: "rgba(255,255,255,0.4)",
                        textTransform: "uppercase",
                      }}
                    >
                      {project.category}
                    </span>
                    <span
                      className="font-mono font-medium"
                      style={{
                        fontSize: 12,
                        letterSpacing: "0.2em",
                        color: "rgba(0,229,255,0.6)",
                        textTransform: "uppercase",
                      }}
                    >
                      Project {String(current + 1).padStart(2, "0")} of {String(total).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Name */}
                  <h3
                    className="font-bold leading-none tracking-tight text-white"
                    style={{ fontSize: 56, letterSpacing: "-0.02em" }}
                  >
                    {project.name}
                  </h3>

                  {/* Description */}
                  <p
                    className="leading-relaxed"
                    style={{
                      fontSize: "clamp(14px, 1.2vw, 16px)",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    {project.description}
                  </p>

                  <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.1)", margin: "4px 0" }} />

                  {/* Tech stack pills */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono font-medium flex items-center justify-center transition-colors duration-200 hover:bg-[rgba(0,210,255,0.15)] hover:border-[#00d2ff]"
                        style={{
                          fontSize: 11,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          padding: "4px 12px",
                          borderRadius: 6,
                          backgroundColor: "rgba(0,229,255,0.06)",
                          border: "1px solid rgba(0,229,255,0.25)",
                          color: "rgba(0,229,255,0.85)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-3 mt-1">
                      {/* Live Demo — filled teal */}
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center gap-2 rounded-lg font-mono font-semibold uppercase tracking-wider transition-all duration-200 hover:scale-[1.03] shadow-[0_0_24px_rgba(0,229,255,0.3)] hover:shadow-[0_0_20px_rgba(0,210,255,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                        style={{
                          height: 40,
                          fontSize: 12,
                          padding: "0 20px",
                          backgroundColor: "rgba(0,229,255,1)",
                          color: "#020408",
                          letterSpacing: "0.1em",
                        }}
                      >
                        Live Demo
                        <ExternalLink className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </a>

                      {/* GitHub — ghost outline */}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center gap-2 rounded-lg font-mono font-semibold uppercase tracking-wider transition-all duration-200 hover:scale-[1.03] hover:bg-[rgba(255,255,255,0.08)] hover:border-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                        style={{
                          height: 40,
                          fontSize: 12,
                          padding: "0 20px",
                          backgroundColor: "transparent",
                          border: "1px solid rgba(255,255,255,0.18)",
                          color: "rgba(255,255,255,0.75)",
                          letterSpacing: "0.1em",
                        }}
                      >
                        GitHub
                        <Github className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </a>
                    </div>
                  </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right arrow */}
          <ArrowBtn direction="right" onClick={next} disabled={false} />
        </div>

        {/* ── Progress Bar ── */}
        <div className="mt-8 flex items-center justify-between gap-2 w-full max-w-md mx-auto">
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              aria-label={`Go to project ${i + 1}`}
              className="flex-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-full"
              style={{
                height: 2,
                backgroundColor: i === current ? "rgba(0,210,255,1)" : "rgba(255,255,255,0.2)",
                boxShadow: i === current ? "0 0 8px rgba(0,210,255,0.5)" : "none",
              }}
            />
          ))}
        </div>

        {/* ── Footer meta row ── */}
        <div
          className="mt-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/30">
            {String(PROJECTS.length).padStart(2, "0")} Projects · Use ← → keys to navigate
          </span>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-white/60 transition-colors hover:text-white"
          >
            <span className="block h-px w-6 bg-white/25 transition-all duration-300 group-hover:w-10 group-hover:bg-cyan-400" />
            Start a Project
          </a>
        </div>
      </div>
    </section>
  )
}
