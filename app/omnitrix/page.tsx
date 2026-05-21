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
    <div className="relative w-full min-h-screen overflow-hidden" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Subtle grid pattern background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(0, 255, 0, 0.05) 25%, rgba(0, 255, 0, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, 0.05) 75%, rgba(0, 255, 0, 0.05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(0, 255, 0, 0.05) 25%, rgba(0, 255, 0, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, 0.05) 75%, rgba(0, 255, 0, 0.05) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px',
          opacity: 0.3,
        }}
      />

      {/* Pulsing radar dot - top left */}
      <div className="absolute top-8 left-8 z-20">
        <div
          className="w-3 h-3 rounded-full"
          style={{
            backgroundColor: '#00ff00',
            boxShadow: '0 0 10px #00ff00, 0 0 20px rgba(0, 255, 0, 0.5)',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
              rgba(0, 255, 0, 0.03) 0px,
              rgba(0, 255, 0, 0.03) 1px,
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
          className="text-center mb-16 font-mono font-bold text-4xl md:text-6xl"
          style={{
            color: '#00ff00',
            textShadow: '0 0 20px #00ff00, 0 0 40px rgba(0, 255, 0, 0.5)',
            letterSpacing: '0.05em',
          }}
        >
          OMNITRIX ACTIVATED
        </h1>

        {/* Omnitrix symbol container */}
        <div className="mb-16 flex items-center justify-center">
          <div
            className="relative w-40 h-40 md:w-56 md:h-56 rounded-full flex items-center justify-center"
            style={{
              border: '3px solid #00ff00',
              boxShadow: '0 0 30px #00ff00, 0 0 60px rgba(0, 255, 0, 0.3), inset 0 0 30px rgba(0, 255, 0, 0.1)',
              animation: 'omnitrix-pulse 3s ease-in-out infinite',
            }}
          >
            {/* Inner circle */}
            <div
              className="absolute inset-4 rounded-full"
              style={{
                border: '2px solid rgba(0, 255, 0, 0.5)',
                background: 'radial-gradient(circle at center, rgba(0, 255, 0, 0.1), transparent)',
              }}
            />

            {/* Hourglass/alien symbol */}
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative z-10"
            >
              {/* Top triangle */}
              <path
                d="M 20 20 L 100 20 L 60 60 Z"
                stroke="#00ff00"
                strokeWidth="2"
                fill="rgba(0, 255, 0, 0.1)"
              />
              {/* Bottom triangle */}
              <path
                d="M 60 60 L 20 100 L 100 100 Z"
                stroke="#00ff00"
                strokeWidth="2"
                fill="rgba(0, 255, 0, 0.1)"
              />
              {/* Center line */}
              <line x1="60" y1="20" x2="60" y2="100" stroke="#00ff00" strokeWidth="1" opacity="0.5" />
            </svg>
          </div>
        </div>

        {/* Alien cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full mb-16">
          {aliens.map((alien, idx) => (
            <div
              key={idx}
              className="group relative p-6 rounded-lg transition-all duration-300 hover:shadow-lg"
              style={{
                backgroundColor: 'rgba(0, 20, 10, 0.6)',
                border: '2px solid rgba(0, 255, 0, 0.4)',
                backdropFilter: 'blur(10px)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#00ff00'
                e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 0, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 255, 0, 0.4)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <h2
                className="text-2xl md:text-3xl font-mono font-bold mb-2"
                style={{
                  color: '#00ff00',
                  textShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
                }}
              >
                {alien.name}
              </h2>
              <p
                className="text-xs md:text-sm font-mono"
                style={{ color: 'rgba(255, 255, 255, 0.6)' }}
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
            e.currentTarget.style.boxShadow = '0 0 20px #00ff00'
            e.currentTarget.style.backgroundColor = 'rgba(0, 255, 0, 0.1)'
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
        @keyframes omnitrix-pulse {
          0%, 100% {
            box-shadow: 0 0 30px #00ff00, 0 0 60px rgba(0, 255, 0, 0.3), inset 0 0 30px rgba(0, 255, 0, 0.1);
          }
          50% {
            box-shadow: 0 0 50px #00ff00, 0 0 100px rgba(0, 255, 0, 0.5), inset 0 0 40px rgba(0, 255, 0, 0.15);
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
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  )
}
