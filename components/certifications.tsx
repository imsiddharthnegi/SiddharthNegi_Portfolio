"use client"

import { useEffect, useRef, useState } from "react"
import { Check } from "lucide-react"

type Cert = {
  name: string
  issuer: string
  year: string
}

const CERTS: Cert[] = [
  {
    name: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2025",
    link: "https://www.linkedin.com/in/imsiddarthnegi/overlay/Certifications/255126307/treasury/?profileId=ACoAAGKCXngBt2_vpXBw8C4gLx6DpGriZ_-b2m8"
  },
  {
    name: "Google Cloud Study Jams",
    issuer: "Google Developers Group",
    year: "2025",
    link: "https://www.linkedin.com/in/imsiddarthnegi/overlay/Certifications/258855114/treasury/?profileId=ACoAAGKCXngBt2_vpXBw8C4gLx6DpGriZ_-b2m8"
  },
  {
    name: "Career Essentials in GitHub Copilot",
    issuer: "LinkedIn Learning",
    year: "2026",
    link: "https://www.linkedin.com/in/imsiddarthnegi/overlay/Certifications/1545539275/treasury/?profileId=ACoAAGKCXngBt2_vpXBw8C4gLx6DpGriZ_-b2m8"
  },
  {
    name: "Ideathon 2026 Certificate of Appreciation",
    issuer: "Careerprep",
    year: "2026",
    link: "https://www.linkedin.com/in/imsiddarthnegi/overlay/Certifications/1650502975/treasury/?profileId=ACoAAGKCXngBt2_vpXBw8C4gLx6DpGriZ_-b2m8"
  },
]

function CertCard({ cert, index, revealed }: { cert: Cert; index: number; revealed: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      className="group relative overflow-hidden rounded-xl border outline-none"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.02)",
        borderColor: hovered ? "rgba(0, 229, 255, 0.30)" : "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: hovered
          ? "0 0 0 1px rgba(0, 229, 255, 0.10), 0 0 40px rgba(0, 229, 255, 0.10), inset 0 0 60px rgba(0, 229, 255, 0.03)"
          : "inset 0 0 0 1px rgba(255, 255, 255, 0.0)",
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 700ms ease-out ${index * 110}ms, transform 700ms ease-out ${index * 110}ms, border-color 320ms ease, box-shadow 320ms ease`,
      }}
    >
      <div className="flex items-start justify-between gap-6 p-6 md:p-7">
        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex items-center gap-2">
            <span
              className="grid h-4 w-4 place-items-center rounded-full"
              style={{
                backgroundColor: "rgba(0, 229, 255, 0.12)",
                border: "1px solid rgba(0, 229, 255, 0.45)",
              }}
              aria-label="Verified"
            >
              <Check className="h-2.5 w-2.5" style={{ color: "#00e5ff" }} strokeWidth={3} />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-300/80">
              Verified
            </span>
          </div>

          <h3
            className="text-balance font-medium tracking-[-0.01em] text-white"
            style={{ fontSize: "clamp(16px, 1.3vw, 19px)" }}
          >
            {cert.name}
          </h3>

          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">
            {cert.issuer}
          </span>
        </div>

        <div className="shrink-0 flex flex-col items-end gap-2">
  <span
    className="font-mono tabular-nums text-white/45"
    style={{ fontSize: "clamp(13px, 1vw, 14px)" }}
  >
    {cert.year}
  </span>
  <a
    href={cert.link}
    target="_blank"
    rel="noopener noreferrer"
    className="font-mono text-[11px] uppercase tracking-[0.16em] text-cyan-400/70 hover:text-cyan-300 transition-colors"
  >
    View Certificate →
  </a>
</div>
      </div>

      {/* Hover sheen */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,229,255,0) 0%, rgba(0,229,255,0.5) 50%, rgba(0,229,255,0) 100%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 320ms ease",
        }}
      />
    </div>
  )
}

export function Certifications() {
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

  return (
    <section
      id="certifications"
      ref={sectionRef}
      aria-label="Certifications"
      className="relative w-full"
      style={{ backgroundColor: "#020408" }}
    >
      <div
        className="pt-20 pb-24 md:pt-28 md:pb-32"
        style={{
          paddingLeft: "clamp(24px, 8vw, 120px)",
          paddingRight: "clamp(24px, 8vw, 120px)",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3">
          <span className="block h-1.5 w-1.5 rounded-full bg-cyan-400/80" />
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-300/80">
            Credentials · Verified
          </span>
        </div>

        <h2
          className="mt-6 max-w-3xl text-pretty leading-[0.95] tracking-[-0.04em] text-white"
          style={{ fontFamily: "var(--font-sans), Geist, sans-serif" }}
        >
          <span
            className="block font-light"
            style={{ fontSize: "clamp(48px, 7vw, 96px)", fontWeight: 300 }}
          >
            Receipts.
          </span>
        </h2>
        <p className="mt-4 max-w-md text-[14px] leading-relaxed text-white/45 md:text-[15px]">
          Independently verified certifications across cloud, frontend, and full-stack engineering.
        </p>

        {/* 2x2 grid */}
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {CERTS.map((c, i) => (
            <CertCard key={c.name} cert={c} index={i} revealed={revealed} />
          ))}
        </div>
      </div>
    </section>
  )
}
