"use client"

import { useEffect, useState } from "react"

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Arsenal", href: "#arsenal" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out",
        scrolled
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

        {/* Center: Nav links */}
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

        {/* Right: Available pill */}
        <a
          href="#contact"
          className="group inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1.5 transition-colors hover:bg-green-500/15"
        >
          <span className="relative flex h-1.5 w-1.5 items-center justify-center">
            <span
              aria-hidden
              className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
              style={{ animation: "ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite" }}
            />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-green-200/90">
            Available for work
          </span>
        </a>
      </div>
    </header>
  )
}
