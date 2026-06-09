export function Footer() {
  return (
    <footer
      aria-label="Footer"
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "#020408",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Subtle top glow line */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "40%",
          maxWidth: 320,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(0,210,220,0.35), transparent)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          paddingTop: 40,
          paddingBottom: 40,
          paddingLeft: "clamp(24px, 8vw, 120px)",
          paddingRight: "clamp(24px, 8vw, 120px)",
        }}
      >
        {/* Main line */}
        <p
          style={{
            margin: 0,
            fontFamily: "'Geist Mono', monospace",
            fontSize: 11,
            fontWeight: 400,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            textAlign: "center",
            color: "rgba(255,255,255,0.28)",
            lineHeight: 1.6,
          }}
        >
          {"© 2026 "}
          <span
            style={{
              fontWeight: 700,
              color: "rgba(255,255,255,0.62)",
              letterSpacing: "0.20em",
            }}
          >
            Siddharth Negi
          </span>
          <span
            style={{
              color: "rgba(0,210,220,0.55)",
              margin: "0 10px",
            }}
            aria-hidden
          >
            ·
          </span>
          Built with precision
        </p>

        {/* Sub-line */}
        <p
          style={{
            margin: 0,
            fontFamily: "'Geist Mono', monospace",
            fontSize: 9,
            fontWeight: 400,
            letterSpacing: "0.30em",
            textTransform: "uppercase",
            textAlign: "center",
            color: "rgba(255,255,255,0.14)",
          }}
        >
          Next.js · TypeScript · Tailwind
        </p>
      </div>
    </footer>
  )
}
