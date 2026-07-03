"use client"

import { useEffect, useRef, useState } from "react"
import { SiGooglecloud, SiTailwindcss, SiReact, SiNextdotjs, SiDocker, SiSupabase, SiGithubactions, SiZapier, SiN8N, SiVercel } from "react-icons/si"
import { FaAws } from "react-icons/fa"

type Category = {
  label: string
  color: string
  skills: string[]
}

const CATEGORIES: Category[] = [
  {
    label: "Frontend",
    color: "#00e5ff",
    skills: ["React.js", "Next.js", "Tailwind CSS", "JavaScript"],
  },
  {
    label: "Backend",
    color: "#6366f1",
    skills: ["Node.js", "Express.js", "Python", "Django"],
  },
  {
    label: "Database",
    color: "#a855f7",
    skills: ["MongoDB", "PostgreSQL", "SQLite", "Supabase"],
  },
  {
    label: "Cloud",
    color: "#10b981",
    skills: ["AWS", "GCP", "Docker", "Vercel"],
  },
  {
    label: "API Integration",
    color: "#ec4899",
    skills: ["REST APIs", "Gemini API", "OpenAI", "Claude API"],
  },
  {
    label: "Automation & Workflows",
    color: "#f59e0b",
    skills: ["Cursor", "n8n", "Zapier", "GitHub Actions"],
  },
]

const HIGHLIGHTED_SKILLS = new Set([
  "React.js",
  "Node.js",
  "Python",
  "MongoDB",
  "AWS",
  "REST APIs",
  "Gemini API",
  "Cursor",
])

// Icon map for different skills
const SKILL_ICONS: Record<string, React.ReactNode> = {
  "React.js": <SiReact color="#FFFFFF" />,
  "Next.js": <SiNextdotjs color="#FFFFFF" />,
  "Tailwind CSS": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" className="w-4 h-4 object-contain" alt="Tailwind CSS" />,
  "JavaScript": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" className="w-4 h-4 object-contain" alt="JavaScript" />,
  "Node.js": "🟢",
  "Express.js": "⚡",
  "Python": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" className="w-4 h-4 object-contain" alt="Python" />,
  "Django": "🎯",
  "MongoDB": "🍃",
  "PostgreSQL": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" className="w-4 h-4 object-contain" alt="PostgreSQL" />,
  "SQLite": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg" className="w-4 h-4 object-contain" alt="SQLite" />,
  "Supabase": <SiSupabase color="#3ECF8E" />,
  "AWS": <FaAws color="#FF9900" />,
  "GCP": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg" className="w-4 h-4 object-contain" alt="GCP" />,
  "Docker": <SiDocker color="#2496ED" />,
  "Vercel": <SiVercel color="#FFFFFF" />,
  "REST APIs": "🔗",
  "Gemini API": "✨",
  "OpenAI": "🤖",
  "Claude API": "🧠",
  "Cursor": <svg viewBox="0 0 24 24" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 object-contain"><path d="M4.686 2.052c-.672-.315-1.423.238-1.324.98L5.2 19.34c.088.663.856.963 1.348.528L9.9 16.9l2.76 5.86c.2.42.72.6 1.15.4l2.45-1.15c.42-.2.6-.72.4-1.15l-2.76-5.86 4.38-1.55c.63-.22.75-1.07.22-1.47L4.686 2.052z"/></svg>,
  "n8n": <SiN8N color="#FF6D5A" className="w-4 h-4 object-contain" />,
  "Zapier": <SiZapier color="#FF4A00" className="w-4 h-4 object-contain" />,
  "GitHub Actions": <SiGithubactions color="#2088FF" className="w-4 h-4 object-contain" />,
}

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
        className="pt-24 pb-16 md:pt-32 md:pb-20"
        style={{
          paddingLeft: "clamp(24px, 8vw, 120px)",
          paddingRight: "clamp(24px, 8vw, 120px)",
        }}
      >
        <div className="flex items-center gap-3">
          <span className="block h-1.5 w-1.5 rounded-full bg-cyan-400/80" />
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-300/80">
            Toolkit · Technologies
          </span>
        </div>

        <h2
          className="mt-8 text-pretty leading-[0.92] tracking-[-0.04em] text-white"
          style={{ fontFamily: "var(--font-sans), Geist, sans-serif" }}
        >
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
            Stack.
          </span>
        </h2>

        <p className="mt-5 font-serif text-base italic text-white/45 md:text-lg">
          The tools I reach for.
        </p>
      </div>

      {/* Grid-based categories */}
      <div
        className="pb-24 md:pb-32"
        style={{
          paddingLeft: "clamp(24px, 8vw, 120px)",
          paddingRight: "clamp(24px, 8vw, 120px)",
        }}
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {CATEGORIES.map((category, catIdx) => (
            <div
              key={category.label}
              className="flex flex-col gap-4 rounded-lg border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.04] hover:shadow-lg"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 600ms ease-out, transform 600ms ease-out",
                transitionDelay: `${catIdx * 50}ms`,
              }}
            >
              {/* Category header with badge */}
              <div className="flex items-center gap-3">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg font-semibold text-sm"
                  style={{
                    backgroundColor: `${category.color}20`,
                    color: category.color,
                  }}
                >
                  {category.label.charAt(0)}
                </div>
                <span
                  className="font-mono text-xs font-semibold uppercase tracking-[0.15em]"
                  style={{ color: category.color }}
                >
                  {category.label}
                </span>
              </div>

              {/* Skills grid */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
                {category.skills.map((skill, skillIdx) => {
                  const idx = globalIndex++
                  const isHighlighted = HIGHLIGHTED_SKILLS.has(skill)
                  const icon = SKILL_ICONS[skill] || "•"
                  return (
                    <div
                      key={skill}
                      className="group relative"
                      style={{
                        opacity: revealed ? 1 : 0,
                        transform: revealed ? "translateY(0)" : "translateY(8px)",
                        transition: "opacity 500ms ease-out, transform 500ms ease-out",
                        transitionDelay: `${idx * 25 + 100}ms`,
                      }}
                    >
                      <div
                        className="flex items-center gap-2 rounded-md border border-white/[0.08] bg-white/[0.03] px-3 py-2 transition-all duration-150"
                        style={{
                          borderColor: isHighlighted
                            ? `${category.color}40`
                            : "rgba(255, 255, 255, 0.08)",
                          backgroundColor: isHighlighted
                            ? `${category.color}10`
                            : "rgba(255, 255, 255, 0.03)",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLDivElement
                          el.style.borderColor = "rgba(0, 255, 204, 0.5)"
                          el.style.backgroundColor = "rgba(0, 255, 204, 0.05)"
                          el.style.boxShadow = "0 0 12px rgba(0, 255, 204, 0.2)"
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLDivElement
                          el.style.borderColor = isHighlighted
                            ? `${category.color}40`
                            : "rgba(255, 255, 255, 0.08)"
                          el.style.backgroundColor = isHighlighted
                            ? `${category.color}10`
                            : "rgba(255, 255, 255, 0.03)"
                          el.style.boxShadow = "none"
                        }}
                      >
                        <span className="text-base">{icon}</span>
                        <span
                          className="text-xs font-medium tracking-tight transition-colors duration-150"
                          style={{
                            color: isHighlighted
                              ? category.color
                              : "rgba(255, 255, 255, 0.7)",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLSpanElement).style.color = "#ffffff"
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLSpanElement).style.color = isHighlighted
                              ? category.color
                              : "rgba(255, 255, 255, 0.7)"
                          }}
                        >
                          {skill}
                        </span>
                      </div>

                      {/* Hover glow effect */}
                      <div
                        className="absolute inset-0 -z-10 rounded-md opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-50"
                        style={{
                          background: `radial-gradient(circle, ${category.color}40 0%, transparent 70%)`,
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
