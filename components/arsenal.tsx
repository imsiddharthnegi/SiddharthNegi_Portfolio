"use client"

import { useEffect, useRef, useState } from "react"

type Category = {
  label: string
  skills: string[]
}

const CATEGORIES: Category[] = [
  {
    label: "Frontend",
    skills: ["React.js", "Next.js", "Tailwind CSS", "JavaScript", "HTML5"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Express.js", "Python", "Django", "REST APIs"],
  },
  {
    label: "Database",
    skills: ["MongoDB", "PostgreSQL", "SQLite", "Airtable"],
  },
  {
    label: "Cloud",
    skills: ["AWS", "GCP", "Docker", "Vercel", "CloudFormation"],
  },
  {
    label: "AI & APIs",
    skills: ["Gemini API", "OpenAI", "GitHub OAuth", "JWT"],
  },
]

export function Arsenal() {
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

  // Build a flat global index for stagger across all skills
  let globalIndex = 0

  return (
    <section
      id="arsenal"
      ref={sectionRef}
      aria-label="My arsenal — tools and technologies"
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
            Toolkit · Stack
          </span>
        </div>

        <h2
          className="mt-8 text-pretty font-light leading-[0.95] tracking-[-0.04em] text-white"
          style={{
            fontSize: "clamp(48px, 7vw, 96px)",
            fontFamily: "var(--font-sans), Geist, sans-serif",
          }}
        >
          My Arsenal
        </h2>

        <p className="mt-5 font-serif text-base italic text-white/45 md:text-lg">
          The tools I reach for.
        </p>
      </div>

      {/* Categorised list */}
      <div
        className="pb-24 md:pb-32"
        style={{
          paddingLeft: "clamp(24px, 8vw, 120px)",
          paddingRight: "clamp(24px, 8vw, 120px)",
        }}
      >
        <ul className="flex flex-col">
          {CATEGORIES.map((cat, rowIdx) => (
            <li
              key={cat.label}
              className={[
                "flex flex-col gap-2 border-t border-white/[0.06] py-5 md:flex-row md:items-baseline md:gap-8 md:py-6",
                rowIdx === CATEGORIES.length - 1 ? "border-b" : "",
              ].join(" ")}
            >
              {/* Category label */}
              <div
                className="shrink-0"
                style={{ width: "120px" }}
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-300/90">
                  {cat.label}
                </span>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-2 text-white/90">
                {cat.skills.map((skill, i) => {
                  const idx = globalIndex++
                  return (
                    <span
                      key={skill}
                      className="inline-flex items-baseline gap-2"
                      style={{
                        opacity: revealed ? 1 : 0,
                        transform: revealed ? "translateY(0)" : "translateY(6px)",
                        transition: "opacity 500ms ease-out, transform 500ms ease-out",
                        transitionDelay: `${idx * 30}ms`,
                      }}
                    >
                      <span className="text-[15px] font-light tracking-tight md:text-base">
                        {skill}
                      </span>
                      {i < cat.skills.length - 1 && (
                        <span
                          aria-hidden
                          className="text-white/25"
                          style={{ fontSize: "14px" }}
                        >
                          ·
                        </span>
                      )}
                    </span>
                  )
                })}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
