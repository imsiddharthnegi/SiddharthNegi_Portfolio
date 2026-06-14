"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { useIsMobile } from "@/components/ui/use-mobile"

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#arsenal" },
  { label: "Experience", href: "#journey" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Close menu when clicking a link
  const handleLinkClick = () => {
    if (isMobile) {
      setMobileMenuOpen(false)
    }
  }

  // Close menu on escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  // ─── PRE-MOUNT: transparent pill placeholder — prevents layout shift ───
  if (!mounted) {
    return (
      <div
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: "12px 5%",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: "100%",
            height: 48,
            borderRadius: 50,
            backgroundColor: "rgba(10, 10, 10, 0.85)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        />
      </div>
    )
  }

  // ─── MOBILE NAVBAR — floating pill ───
  if (isMobile) {
    return (
      <div
        aria-label="Primary navigation"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          /* transparent layer — pill handles its own styling */
          pointerEvents: "none",
        }}
      >
        {/* Floating pill bar */}
        <nav
          role="navigation"
          aria-label="Mobile navigation"
          style={{
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "12px auto",
            width: "90%",
            maxWidth: 480,
            padding: "8px 16px",
            borderRadius: 50,
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            opacity: mounted ? 1 : 0,
            transition: "opacity 500ms ease 80ms",
          }}
        >
          {/* Logo — remove the large desktop marginRight */}
          <MobileLogoMark />

          {/* Hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              color: "#ffffff",
              flexShrink: 0,
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* Dropdown — positioned below the pill, matching pill width */}
        {mobileMenuOpen && (
          <div
            style={{
              pointerEvents: "auto",
              margin: "0 auto",
              width: "90%",
              maxWidth: 480,
              borderRadius: 20,
              backgroundColor: "rgba(10, 10, 10, 0.92)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
              padding: "12px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
              marginTop: 6,
            }}
          >
            {/* Nav links */}
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleLinkClick}
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: 44,
                  paddingLeft: 16,
                  paddingRight: 16,
                  fontFamily: "Geist, sans-serif",
                  fontSize: 15,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.85)",
                  textDecoration: "none",
                  borderRadius: 12,
                  transition: "background-color 180ms ease, color 180ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.07)"
                  e.currentTarget.style.color = "#ffffff"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                  e.currentTarget.style.color = "rgba(255,255,255,0.85)"
                }}
              >
                {link.label}
              </a>
            ))}

            {/* CTA */}
            <a
              href="#contact"
              onClick={handleLinkClick}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 44,
                marginTop: 4,
                borderRadius: 12,
                background: "rgba(0,229,255,1)",
                color: "#020408",
                fontFamily: "Geist, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.02em",
                textDecoration: "none",
                transition: "background 180ms ease, transform 180ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0,229,255,0.85)"
                e.currentTarget.style.transform = "scale(0.98)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0,229,255,1)"
                e.currentTarget.style.transform = "scale(1)"
              }}
            >
              Let&apos;s Connect
            </a>
          </div>
        )}
      </div>
    )
  }

  // ─── DESKTOP NAVBAR ───

  return (
    <div
      aria-label="Primary navigation"
      style={{
        position: "fixed",
        top: 14,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        /* Fade-in on mount */
        opacity: mounted ? 1 : 0,
        transition: "opacity 600ms ease 100ms",
        /* Don't shrink below content */
        width: "max-content",
        maxWidth: "calc(100vw - 32px)",
      }}
    >
      {/* ── The pill ───────────────────────────────────────────── */}
      <nav
        role="navigation"
        aria-label="Sections"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          height: 60,
          paddingLeft: 24,
          paddingRight: 10,
          borderRadius: 999,
          background: "rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* ── Logo ─────────────────────────────────────────────── */}
        <LogoMark />

        {/* ── Nav links ─────────────────────────────────────────── */}
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            listStyle: "none",
            margin: 0,
            padding: 0,
            paddingRight: 44,
          }}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <PillNavLink label={link.label} href={link.href} />
            </li>
          ))}
        </ul>

        {/* ── CTA Button ────────────────────────────────────────── */}
        <PillCTA />
      </nav>
    </div>
  )
}

/* ── Logo mark with cyan border ───────────────────────────────── */
function LogoMark() {
  const [hov, setHov] = useState(false)
  return (
    <a
      href="#top"
      aria-label="Home — Siddharth Negi"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 34,
        height: 34,
        borderRadius: 9,
        border: `1.5px solid ${hov ? "rgba(0,229,255,0.75)" : "rgba(0,210,220,0.45)"}`,
        background: hov ? "#0e1a1a" : "#0c0c0c",
        boxShadow: hov ? "0 0 16px rgba(0,229,255,0.22)" : "0 0 6px rgba(0,210,220,0.08)",
        textDecoration: "none",
        flexShrink: 0,
        marginRight: 44,
        transition: "border-color 280ms ease, background 280ms ease, box-shadow 280ms ease",
      }}
    >
      <span
        style={{
          fontFamily: "'Geist Mono', monospace",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.06em",
          color: hov ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.88)",
          userSelect: "none",
          transition: "color 280ms ease",
        }}
      >
        SN
      </span>
    </a>
  )
}

/* ── Mobile logo mark — same design, no right margin for compact pill ── */
function MobileLogoMark() {
  const [hov, setHov] = useState(false)
  return (
    <a
      href="#top"
      aria-label="Home — Siddharth Negi"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 34,
        height: 34,
        borderRadius: 9,
        border: `1.5px solid ${hov ? "rgba(0,229,255,0.75)" : "rgba(0,210,220,0.45)"}`,
        background: hov ? "#0e1a1a" : "#0c0c0c",
        boxShadow: hov ? "0 0 16px rgba(0,229,255,0.22)" : "0 0 6px rgba(0,210,220,0.08)",
        textDecoration: "none",
        flexShrink: 0,
        transition: "border-color 280ms ease, background 280ms ease, box-shadow 280ms ease",
      }}
    >
      <span
        style={{
          fontFamily: "'Geist Mono', monospace",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.06em",
          color: hov ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.88)",
          userSelect: "none",
          transition: "color 280ms ease",
        }}
      >
        SN
      </span>
    </a>
  )
}

/* ── Nav link inside pill ──────────────────────────────────────── */
function PillNavLink({ label, href }: { label: string; href: string }) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        fontFamily: "Geist, sans-serif",
        fontSize: 15,
        fontWeight: 500,
        letterSpacing: "0.01em",
        color: hov ? "#00e5ff" : "#ffffff",
        textDecoration: "none",
        whiteSpace: "nowrap",
        paddingBottom: 2,
        transition: "color 220ms ease",
      }}
    >
      {label}
      {/* underline on hover */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1.5,
          borderRadius: 1,
          background: "#00e5ff",
          transform: hov ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "center",
          transition: "transform 240ms cubic-bezier(0.34,1.1,0.64,1)",
        }}
      />
    </a>
  )
}

/* ── Dark pill CTA button ──────────────────────────────────────── */
function PillCTA() {
  const [hov, setHov] = useState(false)
  return (
    <a
      href="#contact"
      aria-label="Let's Connect"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        paddingLeft: 22,
        paddingRight: 22,
        paddingTop: 11,
        paddingBottom: 11,
        borderRadius: 999,
        background: hov ? "rgba(0, 229, 255, 0.82)" : "#00e5ff",
        color: "#020408",
        fontFamily: "Geist, sans-serif",
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: "0.01em",
        textDecoration: "none",
        whiteSpace: "nowrap",
        flexShrink: 0,
        boxShadow: hov
          ? "0 4px 16px rgba(0,0,0,0.35)"
          : "0 2px 8px rgba(0,0,0,0.25)",
        transform: hov ? "scale(1.02)" : "scale(1)",
        transition:
          "background 250ms ease, transform 250ms ease, box-shadow 250ms ease",
      }}
    >
      Let&apos;s Connect
    </a>
  )
}
