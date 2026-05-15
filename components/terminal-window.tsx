"use client"

import { useEffect, useState } from "react"

const CLI_LINES = [
  "> git clone reality",
  "> npm install ambition",
  "> npm run build",
  "✓ 6 projects shipped",
  "✓ 4 internships completed",
  "> ./deploy --to=production",
  "● Deploying...",
  "✓ Successfully shipped.",
]

export function TerminalWindow() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    // Blink cursor
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    let currentLineIndex = 0
    let currentCharIndex = 0
    let timeoutId: NodeJS.Timeout

    const typeNext = () => {
      if (currentLineIndex >= CLI_LINES.length) {
        // Restart animation loop after a pause
        setTimeout(() => {
          currentLineIndex = 0
          currentCharIndex = 0
          setDisplayedLines([])
          typeNext()
        }, 2000)
        return
      }

      const line = CLI_LINES[currentLineIndex]

      if (currentCharIndex < line.length) {
        // Type one character
        setDisplayedLines((prev) => {
          const updated = [...prev]
          updated[currentLineIndex] =
            (updated[currentLineIndex] || "") + line[currentCharIndex]
          return updated
        })
        currentCharIndex++
        timeoutId = setTimeout(typeNext, 45) // typewriter speed
      } else {
        // Move to next line
        currentLineIndex++
        currentCharIndex = 0
        timeoutId = setTimeout(typeNext, 200) // pause between lines
      }
    }

    timeoutId = setTimeout(typeNext, 600) // initial delay before starting

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <div
      className="hidden md:block absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 opacity-0"
      style={{
        width: "clamp(280px, 35vw, 420px)",
        animation: "fade-in-up 900ms cubic-bezier(0.2,0.65,0.2,1) 800ms forwards",
      }}
    >
      {/* Terminal window container */}
      <div
        className="overflow-hidden rounded-lg border"
        style={{
          background: "rgba(2, 4, 8, 0.65)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderColor: "rgba(0, 229, 255, 0.35)",
          boxShadow:
            "0 0 32px rgba(0, 229, 255, 0.12), 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(0, 229, 255, 0.15)",
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center justify-between px-3 py-2.5"
          style={{
            background: "rgba(255, 255, 255, 0.04)",
            borderBottom: "1px solid rgba(0, 229, 255, 0.15)",
          }}
        >
          {/* Traffic lights */}
          <div className="flex gap-2">
            <div
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: "#ff5f56" }}
            />
            <div
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: "#ffbd2e" }}
            />
            <div
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: "#27c93f" }}
            />
          </div>

          {/* Terminal title */}
          <span
            className="flex-1 text-center font-mono text-[11px] tracking-[0.08em]"
            style={{ color: "rgba(0, 229, 255, 0.7)" }}
          >
            siddharth@dev ~ 
          </span>

          <div className="w-6" />
        </div>

        {/* Terminal content */}
        <div className="p-4 font-mono text-sm leading-relaxed">
          {displayedLines.map((line, idx) => (
            <div
              key={idx}
              className="text-white/85"
              style={{ fontSize: "13px", letterSpacing: "0.02em" }}
            >
              {line}
            </div>
          ))}

          {/* Blinking cursor */}
          <div
            className="inline-block"
            style={{
              color: "rgb(0, 229, 255)",
              opacity: cursorVisible ? 1 : 0.3,
              transition: "opacity 0s",
            }}
          >
            ▋
          </div>
        </div>
      </div>
    </div>
  )
}
