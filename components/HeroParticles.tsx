'use client'

// Helper function to generate stars with box-shadow
function generateStars(count: number, color: string, maxX: number, maxY: number): string {
  const stars: string[] = []
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * maxX)
    const y = Math.floor(Math.random() * maxY)
    stars.push(`${x}px ${y}px 0 ${color}`)
  }
  return stars.join(',')
}

export default function HeroParticles() {
  // Generate star shadows at module level
  const stars1Shadow = generateStars(600, 'rgba(255,255,255,0.5)', 1600, 900)
  const stars2Shadow = generateStars(300, 'rgba(200,230,255,0.55)', 1600, 900)
  const stars3Shadow = generateStars(100, 'rgba(0,255,204,0.35)', 1600, 900)

  return (
    <>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          animation: 'spacePan 120s ease-in-out infinite',
        }}
        className="hidden md:block"
      >
        {/* ─ LAYER 1: STARFIELD ─ */}
        <div style={{ position: 'absolute', inset: 0 }}>
          {/* Tier 1 */}
          <div style={{ position: 'absolute', inset: 0 }}>
            <div
              style={{
                width: '1px',
                height: '1px',
                boxShadow: stars1Shadow,
                animation: 'twinkle1 10s ease-in-out infinite',
              }}
            />
          </div>

          {/* Tier 2 */}
          <div style={{ position: 'absolute', inset: 0 }}>
            <div
              style={{
                width: '2px',
                height: '2px',
                boxShadow: stars2Shadow,
                animation: 'twinkle2 14s ease-in-out infinite',
                animationDelay: '3s',
              }}
            />
          </div>

          {/* Tier 3 */}
          <div style={{ position: 'absolute', inset: 0 }}>
            <div
              style={{
                width: '2px',
                height: '2px',
                boxShadow: stars3Shadow,
                animation: 'twinkle3 18s ease-in-out infinite',
                animationDelay: '7s',
              }}
            />
          </div>
        </div>

        {/* ─ LAYER 2: NEBULA GLOWS ─ */}
        {/* Left glow */}
        <div
          style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            left: '-15%',
            top: '15%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(150,160,200,0.06) 0%, transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
            animation: 'nebulaFloat 25s ease-in-out infinite',
          }}
        />

        {/* Right glow */}
        <div
          style={{
            position: 'absolute',
            width: '450px',
            height: '450px',
            right: '-10%',
            top: '35%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(120,140,180,0.05) 0%, transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
            animation: 'nebulaFloat 25s ease-in-out infinite',
            animationDelay: '12s',
          }}
        />

        {/* ─ LAYER 3: VERTICAL LIGHT STREAKS ─ */}
        {/* Streak 1 */}
        <div
          style={{
            position: 'absolute',
            width: '1px',
            height: '100px',
            left: '28%',
            top: '-150px',
            background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)',
            animation: 'streakFall linear infinite',
            animationDuration: '7s',
            animationDelay: '0s',
          }}
        />

        {/* Streak 2 */}
        <div
          style={{
            position: 'absolute',
            width: '1px',
            height: '140px',
            left: '38%',
            top: '-150px',
            background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)',
            animation: 'streakFall linear infinite',
            animationDuration: '9s',
            animationDelay: '2s',
          }}
        />

        {/* Streak 3 */}
        <div
          style={{
            position: 'absolute',
            width: '1px',
            height: '80px',
            left: '48%',
            top: '-150px',
            background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)',
            animation: 'streakFall linear infinite',
            animationDuration: '6s',
            animationDelay: '4s',
          }}
        />

        {/* Streak 4 */}
        <div
          style={{
            position: 'absolute',
            width: '1px',
            height: '120px',
            left: '57%',
            top: '-150px',
            background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)',
            animation: 'streakFall linear infinite',
            animationDuration: '11s',
            animationDelay: '1s',
          }}
        />

        {/* Streak 5 */}
        <div
          style={{
            position: 'absolute',
            width: '1px',
            height: '90px',
            left: '67%',
            top: '-150px',
            background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)',
            animation: 'streakFall linear infinite',
            animationDuration: '8s',
            animationDelay: '6s',
          }}
        />

        {/* Streak 6 */}
        <div
          style={{
            position: 'absolute',
            width: '1px',
            height: '110px',
            left: '75%',
            top: '-150px',
            background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)',
            animation: 'streakFall linear infinite',
            animationDuration: '10s',
            animationDelay: '3s',
          }}
        />

        {/* ─ LAYER 4: CORNER ARCS ─ */}
        {/* Top-left */}
        <div
          style={{
            position: 'absolute',
            width: '220px',
            height: '220px',
            top: '-110px',
            left: '-110px',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '50%',
          }}
        />

        {/* Top-right */}
        <div
          style={{
            position: 'absolute',
            width: '220px',
            height: '220px',
            top: '-110px',
            right: '-110px',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '50%',
          }}
        />

        {/* Bottom-left */}
        <div
          style={{
            position: 'absolute',
            width: '220px',
            height: '220px',
            bottom: '-110px',
            left: '-110px',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '50%',
          }}
        />

        {/* Bottom-right */}
        <div
          style={{
            position: 'absolute',
            width: '220px',
            height: '220px',
            bottom: '-110px',
            right: '-110px',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '50%',
          }}
        />

        {/* ─ LAYER 5: CYAN SCAN LINE ─ */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            width: '100%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(0,255,204,0.2) 50%, transparent 100%)',
            animation: 'scanLine 18s linear infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes twinkle1 {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 0.2; }
        }
        @keyframes twinkle2 {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.15; }
        }
        @keyframes twinkle3 {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.1; }
        }
        @keyframes nebulaFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-25px) scale(1.04); }
        }
        @keyframes streakFall {
          0% { top: -150px; opacity: 0; }
          8% { opacity: 1; }
          88% { opacity: 0.5; }
          100% { top: 105%; opacity: 0; }
        }
        @keyframes scanLine {
          0% { top: -2px; opacity: 0; }
          3% { opacity: 1; }
          95% { opacity: 0.2; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes spacePan {
          0%, 100% { transform: translate(0px, 0px); }
          25% { transform: translate(-8px, -4px); }
          50% { transform: translate(-14px, 0px); }
          75% { transform: translate(-8px, 4px); }
        }
      `}</style>
    </>
  )
}
