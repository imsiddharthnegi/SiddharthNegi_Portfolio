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
        @keyframes spacePan {
          0%   { transform: translate(0px, 0px) }
          25%  { transform: translate(-8px, -5px) }
          50%  { transform: translate(-15px, 0px) }
          75%  { transform: translate(-8px, 5px) }
          100% { transform: translate(0px, 0px) }
        }
        @keyframes shootingStar {
          0%   { left: -10%; top: 15%; opacity: 0; }
          2%   { opacity: 1; }
          8%   { left: 60%; top: 35%; opacity: 0; }
          100% { left: 60%; top: 35%; opacity: 0; }
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
          animation: 'spacePan 120s ease-in-out infinite',
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

        {/* Shooting Star 1 */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '-10%',
            width: '180px',
            height: '1px',
            background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
            transform: 'rotate(-15deg)',
            animation: 'shootingStar 10s ease-in-out infinite',
          }}
        />

        {/* Shooting Star 2 */}
        <div
          style={{
            position: 'absolute',
            top: '55%',
            left: '-10%',
            width: '180px',
            height: '1px',
            background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
            transform: 'rotate(-15deg)',
            animation: 'shootingStar 10s ease-in-out infinite',
            animationDelay: '6s',
          }}
        />
      </div>
    </>
  )
}
