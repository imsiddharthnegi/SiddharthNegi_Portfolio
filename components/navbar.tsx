"use client"

import { useEffect, useState } from "react"

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Arsenal", href: "#arsenal" },
  { label: "Journey", href: "#journey" },
  { label: "Certifications", href: "#certifications" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out",
          scrolled || open
            ? "backdrop-blur-xl bg-white/[0.03] border-b border-white/[0.08]"
            : "bg-transparent border-b border-transparent",
        ].join(" ")}
        aria-label="Primary"
      >
        <div
          className="flex h-16 items-center justify-between"
          style={{ paddingLeft: "clamp(20px, 4vw, 48px)", paddingRight: "clamp(20px, 4vw, 48px)" }}
        >
          {/* Left: SN monogram */}
          <a
            href="#top"
            className="group relative flex h-8 w-8 items-center justify-center rounded-md border border-cyan-400/40 bg-white/[0.03] backdrop-blur-md transition-colors hover:border-cyan-400/80"
            aria-label="Home — Siddharth Negi"
          >
            <span className="font-mono text-[11px] font-medium tracking-[0.08em] text-white/90">
              SN
            </span>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                boxShadow: "0 0 18px rgba(0, 229, 255, 0.35)",
              }}
            />
          </a>

          {/* Center: Nav links (desktop) */}
          <nav className="hidden md:block" aria-label="Sections">
            <ul className="flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group relative inline-flex flex-col items-center py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-white/60 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -bottom-0.5 h-1 w-1 rounded-full bg-cyan-400 opacity-0 transition-all duration-500 group-hover:opacity-100"
                      style={{
                        transform: "translateY(4px) scale(0.4)",
                        transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                      }}
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -bottom-0.5 h-1 w-1 rounded-full bg-cyan-400 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100"
                      style={{
                        transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                        boxShadow: "0 0 10px rgba(0, 229, 255, 0.6)",
                      }}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: Available pill (desktop) + hamburger (mobile) */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="group hidden items-center gap-2 rounded-full px-3 py-1.5 transition-all sm:inline-flex hover:scale-[1.03]"
              style={{
                background: "rgba(34,197,94,0.16)",
                border: "1px solid rgba(34,197,94,0.40)",
                boxShadow: "0 0 14px rgba(34,197,94,0.14)",
              }}
              aria-label="Available for work: May 2026 — contact me"
            >
              <span className="relative flex h-2 w-2 items-center justify-center" aria-hidden>
                <span
                  className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
                  style={{ animation: "ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite" }}
                />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-green-300">
                Available · May 2026
              </span>
            </a>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative grid h-9 w-9 place-items-center rounded-md border border-white/10 bg-white/[0.02] text-white transition-colors hover:border-cyan-400/50 md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  aria-hidden
                  className="absolute left-0 top-0 block h-px w-4 bg-white transition-transform duration-300"
                  style={{
                    transform: open ? "translateY(6px) rotate(45deg)" : "translateY(0) rotate(0)",
                  }}
                />
                <span
                  aria-hidden
                  className="absolute left-0 top-1/2 block h-px w-4 bg-white transition-opacity duration-200"
                  style={{ opacity: open ? 0 : 1 }}
                />
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 block h-px w-4 bg-white transition-transform duration-300"
                  style={{
                    transform: open ? "translateY(-6px) rotate(-45deg)" : "translateY(0) rotate(0)",
                  }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className="fixed inset-0 z-40 md:hidden"
        style={{
          pointerEvents: open ? "auto" : "none",
          backgroundColor: "rgba(2, 4, 8, 0.96)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          opacity: open ? 1 : 0,
          transition: "opacity 400ms ease",
        }}
      >
        <div
          className="flex h-full w-full flex-col justify-between"
          style={{
            paddingLeft: "clamp(24px, 6vw, 48px)",
            paddingRight: "clamp(24px, 6vw, 48px)",
            paddingTop: "96px",
            paddingBottom: "48px",
          }}
        >
          <nav aria-label="Mobile sections">
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <li key={link.label} className="overflow-hidden">
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 py-3 transition-colors"
                    style={{
                      transform: open ? "translateY(0)" : "translateY(40px)",
                      opacity: open ? 1 : 0,
                      transition: `transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1) ${150 + i * 70}ms, opacity 500ms ease ${150 + i * 70}ms`,
                    }}
                  >
                    <span className="font-mono text-[10px] tabular-nums tracking-[0.22em] text-cyan-300/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="font-light tracking-[-0.02em] text-white"
                      style={{ fontSize: "clamp(36px, 8vw, 56px)" }}
                    >
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className="flex flex-col gap-3 border-t border-white/[0.08] pt-6"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(20px)",
              transition: `transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1) ${150 + NAV_LINKS.length * 70}ms, opacity 500ms ease ${150 + NAV_LINKS.length * 70}ms`,
            }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">
              Direct line
            </span>
            <a
              href="mailto:siddharthnegi.dev@gmail.com"
              className="font-light tracking-tight text-white"
              style={{ fontSize: "clamp(16px, 4vw, 20px)" }}
            >
              siddharthnegi.dev@gmail.com
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
