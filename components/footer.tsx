export function Footer() {
  return (
    <footer
      className="relative w-full border-t border-white/[0.06]"
      style={{ backgroundColor: "#020408" }}
      aria-label="Footer"
    >
      <div
        className="flex h-20 items-center justify-center"
        style={{
          paddingLeft: "clamp(24px, 8vw, 120px)",
          paddingRight: "clamp(24px, 8vw, 120px)",
        }}
      >
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">
          © 2026 Siddharth Negi · Built with precision
        </p>
      </div>
    </footer>
  )
}
