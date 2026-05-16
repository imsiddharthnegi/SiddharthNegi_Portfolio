"use client"

import { useEffect, useRef, useState } from "react"

const STATS = [
  { label: "6 Projects" },
  { label: "4 Internships" },
  { label: "4 Certs" },
]

// Floating particle — purely decorative
function Particle({ x, y, delay, size }: { x: number; y: number; delay: number; size: number }) {
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: "50%",
        background: "rgba(0, 229, 255, 0.55)",
        animation: `particle-float 6s ease-in-out ${delay}s infinite alternate`,
        pointerEvents: "none",
      }}
    />
  )
}

const PARTICLES = [
  { x: 8,  y: 18, delay: 0,   size: 1.5 },
  { x: 90, y: 12, delay: 1.2, size: 1   },
  { x: 15, y: 72, delay: 2.4, size: 2   },
  { x: 82, y: 68, delay: 0.7, size: 1.5 },
  { x: 50, y: 8,  delay: 1.8, size: 1   },
  { x: 70, y: 85, delay: 3.1, size: 1   },
  { x: 28, y: 42, delay: 0.4, size: 1.5 },
  { x: 94, y: 44, delay: 2,   size: 1   },
  { x: 5,  y: 88, delay: 1.5, size: 2   },
  { x: 60, y: 95, delay: 2.8, size: 1   },
]

export function MobileOverlay() {
  const [visible, setVisible] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true

    // Clear any old flags from previous versions
    sessionStorage.removeItem("mobile-splash-dismissed")
    sessionStorage.removeItem("mobile_overlay_seen_v2")

    // Detect mobile by width OR user agent (covers all real devices)
    const isMobile =
      window.innerWidth < 768 ||
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    const hasSeen = sessionStorage.getItem("overlay_v3")

    if (isMobile && !hasSeen) {
      setVisible(true)
    }
  }, [])

  const handleDismiss = () => {
    setFadeOut(true)
    sessionStorage.setItem("overlay_v3", "true")
    setTimeout(() => {
      if (isMounted.current) setVisible(false)
    }, 300)
  }

  if (!visible) return null

  return (
    <>
      {/* Particle + overlay keyframes */}
      <style>{`
        @keyframes particle-float {
          0%   { transform: translateY(0px) scale(1);   opacity: 0.18; }
          100% { transform: translateY(-18px) scale(1.3); opacity: 0.06; }
        }
        @keyframes splash-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes splash-item-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile entry screen"
        className="fixed inset-0 flex flex-col"
        style={{
          zIndex: 9999,
          backgroundColor: "#020408",
          animation: "splash-fade-in 400ms ease forwards",
          opacity: fadeOut ? 0 : undefined,
          transition: fadeOut ? "opacity 320ms ease" : undefined,
          overflowY: "auto",
        }}
      >
        {/* Background radial glow */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 55% at 50% 55%, rgba(0,229,255,0.07) 0%, transparent 75%)",
            pointerEvents: "none",
          }}
        />

        {/* Floating particles */}
        <span aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          {PARTICLES.map((p, i) => (
            <Particle key={i} {...p} />
          ))}
        </span>

        {/* Top accent line */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: "linear-gradient(90deg, transparent 0%, rgba(0,229,255,0.70) 30%, rgba(0,229,255,0.90) 50%, rgba(0,229,255,0.70) 70%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Main content — vertically centered */}
        <div
          className="relative z-10 flex flex-1 flex-col items-center justify-center text-center"
          style={{
            padding: "96px clamp(24px, 7vw, 40px) 96px",
            gap: "0px",
          }}
        >

          {/* SN monogram — same as navbar but slightly larger */}
          <div
            style={{
              animation: "splash-item-up 600ms cubic-bezier(0.2,0.7,0.2,1) 100ms both",
            }}
          >
            <div
              className="group relative flex items-center justify-center rounded-md"
              style={{
                width: "48px",
                height: "48px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(0, 229, 255, 0.40)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: "0 0 22px rgba(0, 229, 255, 0.18)",
                marginBottom: "32px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  color: "rgba(255,255,255,0.90)",
                }}
              >
                SN
              </span>
            </div>
          </div>

          {/* Heading */}
          <h1
            className="text-white"
            style={{
              fontFamily: "var(--font-sans), Geist, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(36px, 10vw, 52px)",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              marginBottom: "16px",
              animation: "splash-item-up 600ms cubic-bezier(0.2,0.7,0.2,1) 200ms both",
            }}
          >
            Optimized for Desktop
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontFamily: "var(--font-sans), Geist, sans-serif",
              fontWeight: 300,
              fontSize: "clamp(13px, 3.5vw, 15px)",
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.50)",
              maxWidth: "280px",
              marginBottom: "24px",
              animation: "splash-item-up 600ms cubic-bezier(0.2,0.7,0.2,1) 300ms both",
            }}
          >
            {"You're about to enter a full-stack portfolio built for big screens. For the best experience, switch to desktop."}
          </p>

          {/* Stat pills */}
          <div
            className="flex items-center gap-2"
            style={{
              marginBottom: "32px",
              animation: "splash-item-up 600ms cubic-bezier(0.2,0.7,0.2,1) 400ms both",
            }}
          >
            {STATS.map((s, i) => (
              <span
                key={s.label}
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.10em",
                  textTransform: "uppercase" as const,
                  color: "rgb(0, 229, 255)",
                  background: "rgba(0, 229, 255, 0.07)",
                  border: "1px solid rgba(0, 229, 255, 0.22)",
                  borderRadius: "6px",
                  padding: "4px 10px",
                  whiteSpace: "nowrap" as const,
                }}
              >
                {s.label}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div
            className="flex w-full flex-col"
            style={{
              maxWidth: "280px",
              gap: "12px",
              animation: "splash-item-up 600ms cubic-bezier(0.2,0.7,0.2,1) 500ms both",
            }}
          >
            {/* Primary: Enter Anyway */}
            <button
              onClick={handleDismiss}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                minHeight: "48px",
                fontFamily: "'Fira Code', 'JetBrains Mono', 'Courier New', monospace",
                fontSize: "12px",
                letterSpacing: "0.06em",
                color: "rgb(0, 229, 255)",
                background: "transparent",
                border: "1px solid rgba(0, 229, 255, 0.40)",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background 200ms ease, box-shadow 200ms ease, border-color 200ms ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.background = "rgba(0,229,255,0.10)"
                el.style.boxShadow = "0 0 14px rgba(0,229,255,0.22)"
                el.style.borderColor = "rgba(0,229,255,0.60)"
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.background = "transparent"
                el.style.boxShadow = "none"
                el.style.borderColor = "rgba(0,229,255,0.40)"
              }}
              aria-label="Enter the portfolio site"
            >
              Enter Anyway →
            </button>

            {/* Secondary: View Resume */}
            <a
              href="/siddharthnegi_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                minHeight: "48px",
                fontFamily: "'Fira Code', 'JetBrains Mono', 'Courier New', monospace",
                fontSize: "12px",
                letterSpacing: "0.06em",
                color: "rgba(0, 229, 255, 0.55)",
                background: "transparent",
                border: "1px solid rgba(0, 229, 255, 0.18)",
                borderRadius: "5px",
                cursor: "pointer",
                textDecoration: "none",
                transition: "background 200ms ease, box-shadow 200ms ease, border-color 200ms ease, color 200ms ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.background = "rgba(0,229,255,0.06)"
                el.style.boxShadow = "0 0 10px rgba(0,229,255,0.12)"
                el.style.borderColor = "rgba(0,229,255,0.35)"
                el.style.color = "rgba(0,229,255,0.80)"
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.background = "transparent"
                el.style.boxShadow = "none"
                el.style.borderColor = "rgba(0,229,255,0.18)"
                el.style.color = "rgba(0,229,255,0.55)"
              }}
            >
              View Resume →
            </a>
          </div>
        </div>

        {/* Bottom tagline */}
        <div
          className="relative z-10 flex items-center justify-center pb-8"
          style={{
            animation: "splash-item-up 600ms cubic-bezier(0.2,0.7,0.2,1) 650ms both",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "10px",
              fontWeight: 400,
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              color: "rgba(255,255,255,0.22)",
            }}
          >
            Siddharth Negi · Full-Stack Developer
          </span>
        </div>
      </div>
    </>
  )
}
