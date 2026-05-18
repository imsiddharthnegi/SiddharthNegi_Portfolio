'use client'

// Generate stars using box-shadow technique
function generateStars(count: number, color: string): string {
  const shadows: string[] = []
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 1600)
    const y = Math.floor(Math.random() * 900)
    shadows.push(`${x}px ${y}px 0 ${color}`)
  }
  return shadows.join(',')
}

// Pre-generate all star layers at module load
const tier1Shadows = generateStars(700, 'rgba(255,255,255,0.5)')
const tier2Shadows = generateStars(400, 'rgba(200,240,255,0.6)')
const tier3Shadows = generateStars(200, 'rgba(0,255,204,0.4)')

export default function HeroParticles() {
  return (
    <>
      <style>{`
        @keyframes twinkle1 {
          0% { opacity: 0.6; }
          50% { opacity: 0.2; }
          100% { opacity: 0.6; }
        }
        @keyframes twinkle2 {
          0% { opacity: 0.7; }
          50% { opacity: 0.15; }
          100% { opacity: 0.7; }
        }
        @keyframes twinkle3 {
          0% { opacity: 0.5; }
          50% { opacity: 0.1; }
          100% { opacity: 0.5; }
        }
      `}</style>
      <div
        className="hidden md:block"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {/* Tier 1: 700 white stars, 1px */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              boxShadow: tier1Shadows,
              animation: 'twinkle1 8s ease-in-out infinite',
              animationDelay: '0s',
            }}
          />
        </div>

        {/* Tier 2: 400 cyan stars, 2px */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              boxShadow: tier2Shadows,
              animation: 'twinkle2 12s ease-in-out infinite',
              animationDelay: '3s',
            }}
          />
        </div>

        {/* Tier 3: 200 bright cyan stars, 3px */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '3px',
              height: '3px',
              boxShadow: tier3Shadows,
              animation: 'twinkle3 16s ease-in-out infinite',
              animationDelay: '6s',
            }}
          />
        </div>
      </div>
    </>
  )
}
