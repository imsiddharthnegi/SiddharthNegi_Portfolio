"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { useIsMobile } from "@/components/ui/use-mobile"

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#arsenal" },
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

  // ─── MOBILE NAVBAR ───
  if (isMobile && mounted) {
    return (
      <div
        aria-label="Primary navigation"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          width: "100%",
        }}
      >
        {/* Top bar */}
        <nav
          role="navigation"
          aria-label="Mobile navigation"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            height: 60,
            paddingLeft: 16,
            paddingRight: 16,
            backgroundColor: "rgba(226, 221, 211, 0.96)",
            backdropFilter: "blur(16px) saturate(140%)",
            WebkitBackdropFilter: "blur(16px) saturate(140%)",
            borderBottom: "1px solid rgba(0,0,0,0.10)",
            opacity: mounted ? 1 : 0,
            transition: "opacity 600ms ease 100ms",
          }}
        >
          {/* Logo */}
          <LogoMark />

          {/* Hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              color: "#111111",
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div
            style={{
              position: "absolute",
              top: 60,
              left: 0,
              right: 0,
              width: "100%",
              backgroundColor: "rgba(226, 221, 211, 0.96)",
              backdropFilter: "blur(16px) saturate(140%)",
              WebkitBackdropFilter: "blur(16px) saturate(140%)",
              borderBottom: "1px solid rgba(0,0,0,0.10)",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            {/* Mobile Nav links */}
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleLinkClick}
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: 44,
                  paddingLeft: 12,
                  paddingRight: 12,
                  fontFamily: "Geist, sans-serif",
                  fontSize: 15,
                  fontWeight: 500,
                  color: "#1a1a1a",
                  textDecoration: "none",
                  borderRadius: 6,
                  transition: "background-color 200ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                }}
              >
                {link.label}
              </a>
            ))}

            {/* CTA Button in menu */}
            <a
              href="#contact"
              onClick={handleLinkClick}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 44,
                marginTop: 8,
                borderRadius: 6,
                background: "#111111",
                color: "#ffffff",
                fontFamily: "Geist, sans-serif",
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
                transition: "background 200ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#2a2a2a"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#111111"
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
          background: "rgba(226, 221, 211, 0.96)",
          border: "1px solid rgba(0,0,0,0.10)",
          backdropFilter: "blur(16px) saturate(140%)",
          WebkitBackdropFilter: "blur(16px) saturate(140%)",
          boxShadow:
            "0 2px 20px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.10)",
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
        color: hov ? "#000000" : "#1a1a1a",
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
          background: "#111111",
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
        background: hov ? "#2a2a2a" : "#111111",
        color: "#ffffff",
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
