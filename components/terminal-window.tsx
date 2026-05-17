"use client"

import { useEffect, useRef, useState } from "react"

const CLI_LINES: { text: string; type: "prompt" | "check" | "deploy" | "plain" }[] = [
  { text: "> git clone reality",         type: "prompt" },
  { text: "> npm install ambition",       type: "prompt" },
  { text: "> npm run build",             type: "prompt" },
  { text: "✓ 6 projects shipped",        type: "check"  },
  { text: "✓ 4 internships completed",   type: "check"  },
  { text: "> ./deploy --to=production",  type: "prompt" },
  { text: "● Deploying...",              type: "deploy" },
  { text: "✓ Successfully shipped.",     type: "check"  },
]

function lineColor(type: string) {
  if (type === "prompt") return "rgba(200,210,220,0.85)"
  if (type === "check")  return "rgb(0, 229, 255)"
  if (type === "deploy") return "#f5c542"
  return "rgba(200,210,220,0.85)"
}

export function TerminalWindow() {
  // Store each line as a fully-built string; avoids closure/undefined issues
  const [lines, setLines] = useState<string[]>([])
  const [cursorVisible, setCursorVisible] = useState(true)
  const restartKey = useRef(0)

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530)
    return () => clearInterval(id)
  }, [])

  // Typewriter
  useEffect(() => {
    let cancelled = false
    let lineIdx = 0
    let charIdx = 0
    let tid: ReturnType<typeof setTimeout>

    function tick() {
      if (cancelled) return

      if (lineIdx >= CLI_LINES.length) {
        // Restart after 2s pause
        tid = setTimeout(() => {
          if (cancelled) return
          setLines([])
          lineIdx = 0
          charIdx = 0
          restartKey.current++
          tick()
        }, 2000)
        return
      }

      const fullLine = CLI_LINES[lineIdx].text

      if (charIdx <= fullLine.length) {
        const partial = fullLine.slice(0, charIdx)
        setLines((prev) => {
          const next = [...prev]
          next[lineIdx] = partial
          return next
        })
        charIdx++
        tid = setTimeout(tick, 42)
      } else {
        // Line done — move to next
        lineIdx++
        charIdx = 0
        tid = setTimeout(tick, 180)
      }
    }

    tid = setTimeout(tick, 700)
    return () => {
      cancelled = true
      clearTimeout(tid)
    }
  }, [])

  return (
    <div
      className="opacity-0 w-full"
      style={{
        maxWidth: "clamp(260px, 26vw, 360px)",
        animation: "fade-in-up 900ms cubic-bezier(0.2,0.65,0.2,1) 900ms forwards",
        boxSizing: "border-box",
      }}
    >
      {/* Terminal chrome */}
      <div
        className="overflow-hidden rounded-lg"
        style={{
          background: "rgba(5, 8, 14, 0.72)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: "1px solid rgba(0, 229, 255, 0.28)",
          boxShadow:
            "0 0 0 1px rgba(0,0,0,0.4), 0 8px 40px rgba(0,0,0,0.55), 0 0 28px rgba(0,229,255,0.10)",
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-3 py-2"
          style={{
            background: "rgba(255,255,255,0.035)",
            borderBottom: "1px solid rgba(0,229,255,0.12)",
          }}
        >
          {/* Traffic lights */}
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f56" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#27c93f" }} />
          <span
            className="ml-auto font-mono"
            style={{ fontSize: "10px", letterSpacing: "0.08em", color: "rgba(0,229,255,0.6)" }}
          >
            siddharth@dev ~
          </span>
        </div>

        {/* Body */}
        <div className="p-4" style={{ minHeight: "192px" }}>
          {CLI_LINES.map((meta, idx) => {
            const text = lines[idx] ?? ""
            if (text === "" && idx > (lines.length)) return null
            return (
              <div
                key={idx}
                style={{
                  fontFamily: "'Fira Code', 'JetBrains Mono', 'Courier New', monospace",
                  fontSize: "12px",
                  lineHeight: "1.7",
                  letterSpacing: "0.02em",
                  color: lineColor(meta.type),
                  minHeight: text !== "" || idx === lines.length - 1 ? "1.7em" : 0,
                  overflow: "hidden",
                }}
              >
                {text}
              </div>
            )
          })}

          {/* Blinking cursor */}
          <span
            style={{
              fontFamily: "'Fira Code', monospace",
              fontSize: "12px",
              color: "rgb(0,229,255)",
              opacity: cursorVisible ? 1 : 0.15,
              transition: "opacity 0.05s",
              display: "inline-block",
            }}
          >
            ▋
          </span>
        </div>
      </div>

      {/* View Resume button — centered under terminal, always visible */}
      <a
        href="/siddharthnegi_resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "block",
          marginTop: "14px",
          padding: "6px 14px",
          width: "100%",
          boxSizing: "border-box",
          fontFamily: "'Fira Code', 'JetBrains Mono', 'Courier New', monospace",
          fontSize: "12px",
          letterSpacing: "0.06em",
          color: "rgb(0, 229, 255)",
          background: "transparent",
          border: "1px solid rgba(0, 229, 255, 0.40)",
          borderRadius: "5px",
          cursor: "pointer",
          textDecoration: "none",
          transition: "background 200ms ease, box-shadow 200ms ease, border-color 200ms ease",
          textAlign: "center",
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
      >
        View Resume →
      </a>
    </div>
  )
}
