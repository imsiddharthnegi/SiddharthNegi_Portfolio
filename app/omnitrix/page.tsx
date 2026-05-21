'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const aliens = [
  { name: 'XLR8', skills: 'Next.js · React · Speed' },
  { name: 'Heatblast', skills: 'AWS · GCP · Cloud Infrastructure' },
  { name: 'Grey Matter', skills: 'System Design · Architecture' },
  { name: 'Wildvine', skills: 'Node.js · Express · Backend' },
  { name: 'Upgrade', skills: 'AI Integration · Claude · Gemini' },
  { name: 'Diamondhead', skills: 'PostgreSQL · MongoDB · Databases' },
]

export default function OmnitrixPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative w-full min-h-screen overflow-hidden" style={{ backgroundColor: '#000000' }}>
      {/* Dark green radial gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 50, 0, 0.3), #000000)',
        }}
      />

      {/* Green grid pattern background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(0, 255, 0, 0.08) 25%, rgba(0, 255, 0, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, 0.08) 75%, rgba(0, 255, 0, 0.08) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(0, 255, 0, 0.08) 25%, rgba(0, 255, 0, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, 0.08) 75%, rgba(0, 255, 0, 0.08) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Pulsing radar dot - top left */}
      <div className="absolute top-8 left-8 z-20">
        <div
          className="w-4 h-4 rounded-full"
          style={{
            backgroundColor: '#00ff00',
            boxShadow: '0 0 15px #00ff00, 0 0 30px rgba(0, 255, 0, 0.7), 0 0 50px rgba(0, 255, 0, 0.4)',
            animation: 'pulse-dot 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }}
        />
      </div>

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              rgba(0, 255, 0, 0.04) 0px,
              rgba(0, 255, 0, 0.04) 1px,
              transparent 1px,
              transparent 2px
            )
          `,
          animation: 'scanlines 8s linear infinite',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Heading */}
        <h1
          className="text-center mb-8 font-mono font-bold text-5xl md:text-7xl"
          style={{
            color: '#00ff00',
            textShadow: '0 0 30px #00ff00, 0 0 60px rgba(0, 255, 0, 0.6), 0 0 100px rgba(0, 255, 0, 0.3)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          OMNITRIX ACTIVATED
        </h1>

        {/* Blinking selecting alien text */}
        <div
          className="mb-12 font-mono text-lg md:text-xl"
          style={{
            color: '#00ff00',
            textShadow: '0 0 15px rgba(0, 255, 0, 0.7)',
            animation: 'blink-text 1.6s steps(1, start) infinite',
            letterSpacing: '0.05em',
          }}
        >
          SELECTING ALIEN...
        </div>

        {/* Omnitrix symbol container */}
        <div className="mb-20 flex items-center justify-center">
          <svg
            width="220"
            height="220"
            viewBox="0 0 220 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'drop-shadow(0 0 40px #00ff00) drop-shadow(0 0 80px rgba(0,255,0,0.5)) drop-shadow(0 0 120px rgba(0,255,0,0.2))' }}
          >
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <style>{`
                @keyframes symbol-pulse {
                  0%, 100% {
                    filter: drop-shadow(0 0 40px #00ff00) drop-shadow(0 0 80px rgba(0,255,0,0.5)) drop-shadow(0 0 120px rgba(0,255,0,0.2));
                  }
                  50% {
                    filter: drop-shadow(0 0 60px #00ff00) drop-shadow(0 0 120px rgba(0,255,0,0.7)) drop-shadow(0 0 180px rgba(0,255,0,0.4));
                  }
                }
                @keyframes svg-pulse {
                  0%, 100% {
                    opacity: 1;
                  }
                  50% {
                    opacity: 0.95;
                  }
                }
              `}</style>
            </defs>

            {/* Outermost dark ring */}
            <circle cx="110" cy="110" r="105" fill="none" stroke="#001a00" strokeWidth="8" opacity="0.6" />

            {/* Outer black circle with subtle green border */}
            <circle cx="110" cy="110" r="100" fill="#0a0a0a" stroke="#00ff00" strokeWidth="2" opacity="0.8" />

            {/* Middle dark circle */}
            <circle cx="110" cy="110" r="90" fill="none" stroke="#001100" strokeWidth="1" opacity="0.5" />

            {/* Gradient radial background for center */}
            <defs>
              <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#001a00" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
              </radialGradient>
            </defs>
            <circle cx="110" cy="110" r="85" fill="url(#centerGrad)" />

            {/* Top triangle (part of hourglass/bowtie) */}
            <polygon
              points="110,40 160,85 60,85"
              fill="#00ff00"
              stroke="#00ff00"
              strokeWidth="1.5"
              filter="url(#glow)"
            />

            {/* Bottom triangle (part of hourglass/bowtie) */}
            <polygon
              points="60,135 160,135 110,180"
              fill="#00ff00"
              stroke="#00ff00"
              strokeWidth="1.5"
              filter="url(#glow)"
            />

            {/* Center connecting point - small circle */}
            <circle cx="110" cy="110" r="3" fill="#00ff00" filter="url(#glow)" />

            {/* Vertical center line */}
            <line x1="110" y1="40" x2="110" y2="180" stroke="rgba(0, 255, 0, 0.4)" strokeWidth="1" opacity="0.6" />

            {/* Horizontal accent lines */}
            <line x1="60" y1="110" x2="160" y2="110" stroke="rgba(0, 255, 0, 0.3)" strokeWidth="0.5" opacity="0.4" />
          </svg>
        </div>

        {/* Alien cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full mb-16">
          {aliens.map((alien, idx) => (
            <div
              key={idx}
              className="group relative p-6 rounded-lg transition-all duration-300 cursor-pointer"
              style={{
                backgroundColor: '#050f05',
                border: '2px solid rgba(0, 255, 0, 0.4)',
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#00ff00'
                e.currentTarget.style.backgroundColor = '#0a1a0a'
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 255, 0, 0.4)'
                e.currentTarget.style.backgroundColor = '#050f05'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <h2
                className="text-2xl font-mono font-bold mb-3"
                style={{
                  color: '#00ff00',
                  textShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
                }}
              >
                {alien.name}
              </h2>
              <p
                className="text-sm font-mono"
                style={{ color: '#00aa00' }}
              >
                {alien.skills}
              </p>
            </div>
          ))}
        </div>

        {/* Return button */}
        <button
          onClick={() => router.push('/')}
          className="px-8 py-3 font-mono font-semibold uppercase tracking-widest transition-all duration-300 text-sm md:text-base"
          style={{
            color: '#00ff00',
            backgroundColor: 'transparent',
            border: '2px solid #00ff00',
            textShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 20px #00ff00, 0 0 40px rgba(0, 255, 0, 0.3)'
            e.currentTarget.style.backgroundColor = 'rgba(0, 255, 0, 0.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none'
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
        >
          ← Return to Portfolio
        </button>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.2);
          }
        }
        @keyframes blink-text {
          0%, 49% {
            opacity: 1;
          }
          50%, 100% {
            opacity: 0.2;
          }
        }
        @keyframes scanlines {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(10px);
          }
        }
      `}</style>
    </div>
  )
}
