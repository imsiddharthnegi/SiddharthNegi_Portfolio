'use client'

import { useEffect, useState } from 'react'

const STATS = [
  { label: '6 Projects' },
  { label: '4 Internships' },
  { label: '4 Certs' },
]

export default function MobileOverlay() {
  const [show, setShow] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const check = () => {
      const isMobile =
        window.innerWidth < 768 ||
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const seen = sessionStorage.getItem('mob_ov')
      if (isMobile && !seen) setShow(true)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (!show) return null

  const dismiss = () => {
    sessionStorage.setItem('mob_ov', '1')
    setFadeOut(true)
    setTimeout(() => setShow(false), 300)
  }

  return (
    <>
      <style>{`
        @keyframes mob-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes mob-item-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes mob-particle {
          0%   { transform: translateY(0px)   scale(1);   opacity: 0.18; }
          100% { transform: translateY(-18px) scale(1.3); opacity: 0.06; }
        }
        .mob-btn-primary {
          transition: background 200ms ease, box-shadow 200ms ease, border-color 200ms ease, transform 100ms ease;
        }
        .mob-btn-primary:hover {
          background: rgba(0,229,255,0.22) !important;
          box-shadow: 0 0 18px rgba(0,229,255,0.30), 0 0 6px rgba(0,229,255,0.15) inset;
          border-color: rgba(0,229,255,0.75) !important;
        }
        .mob-btn-primary:active {
          transform: scale(0.98);
          background: rgba(0,229,255,0.28) !important;
        }
        .mob-btn-secondary {
          transition: background 200ms ease, box-shadow 200ms ease, border-color 200ms ease, color 200ms ease, transform 100ms ease;
        }
        .mob-btn-secondary:hover {
          background: rgba(0,229,255,0.08) !important;
          box-shadow: 0 0 12px rgba(0,229,255,0.18);
          border-color: rgba(0,229,255,0.65) !important;
          color: rgba(0,229,255,0.85) !important;
        }
        .mob-btn-secondary:active {
          transform: scale(0.98);
        }
      `}</style>

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile entry screen"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          backgroundColor: '#020408',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px 32px 40px',
          overflowY: 'auto',
          animation: 'mob-fade-in 400ms ease forwards',
          opacity: fadeOut ? 0 : undefined,
          transition: fadeOut ? 'opacity 300ms ease' : undefined,
        }}
      >
        {/* Radial background glow */}
        <span
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 70% 55% at 50% 55%, rgba(0,229,255,0.13) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Top accent line */}
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(0,229,255,0.70) 30%, rgba(0,229,255,0.90) 50%, rgba(0,229,255,0.70) 70%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Floating particles */}
        {[
          { x: 8,  y: 18, d: 0,   s: 1.5 },
          { x: 90, y: 12, d: 1.2, s: 1   },
          { x: 15, y: 72, d: 2.4, s: 2   },
          { x: 82, y: 68, d: 0.7, s: 1.5 },
          { x: 50, y: 8,  d: 1.8, s: 1   },
          { x: 70, y: 85, d: 3.1, s: 1   },
          { x: 28, y: 42, d: 0.4, s: 1.5 },
          { x: 94, y: 44, d: 2,   s: 1   },
        ].map((p, i) => (
          <span
            key={i}
            aria-hidden
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.s,
              height: p.s,
              borderRadius: '50%',
              background: 'rgba(0,229,255,0.55)',
              animation: `mob-particle 6s ease-in-out ${p.d}s infinite alternate`,
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* Main content */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            width: '100%',
            maxWidth: '320px',
            gap: '0px',
          }}
        >
          {/* SN monogram */}
          <div
            style={{
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '6px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(0,229,255,0.55)',
              boxShadow: '0 0 28px rgba(0,229,255,0.25), 0 0 8px rgba(0,229,255,0.12) inset',
              marginBottom: '28px',
              animation: 'mob-item-up 600ms cubic-bezier(0.2,0.7,0.2,1) 100ms both',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                color: 'rgba(255,255,255,0.90)',
              }}
            >
              SN
            </span>
          </div>

          {/* Heading */}
          <h1
            style={{
              fontFamily: 'var(--font-sans), Geist, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(32px, 10vw, 48px)',
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              color: '#ffffff',
              marginBottom: '14px',
              animation: 'mob-item-up 600ms cubic-bezier(0.2,0.7,0.2,1) 200ms both',
            }}
          >
            Optimized for Desktop
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontFamily: 'var(--font-sans), Geist, sans-serif',
              fontWeight: 300,
              fontSize: 'clamp(13px, 3.5vw, 15px)',
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.50)',
              maxWidth: '260px',
              marginBottom: '22px',
              animation: 'mob-item-up 600ms cubic-bezier(0.2,0.7,0.2,1) 300ms both',
            }}
          >
            This portfolio is designed for a full desktop experience. For the best view, open on a larger screen.
          </p>

          {/* Stat pills */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '28px',
              animation: 'mob-item-up 600ms cubic-bezier(0.2,0.7,0.2,1) 400ms both',
            }}
          >
            {STATS.map((s) => (
              <span
                key={s.label}
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  color: 'rgb(0,229,255)',
                  background: 'rgba(0,229,255,0.07)',
                  border: '1px solid rgba(0,229,255,0.22)',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  whiteSpace: 'nowrap',
                }}
              >
                {s.label}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              width: '100%',
              animation: 'mob-item-up 600ms cubic-bezier(0.2,0.7,0.2,1) 500ms both',
            }}
          >
            {/* Primary: Continue anyway */}
            <button
              onClick={dismiss}
              className="mob-btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                minHeight: '48px',
                fontFamily: "'Fira Code', 'JetBrains Mono', 'Courier New', monospace",
                fontSize: '12px',
                letterSpacing: '0.06em',
                color: 'rgb(0,229,255)',
                background: 'rgba(0,229,255,0.16)',
                border: '1px solid rgba(0,229,255,0.50)',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Enter Anyway →
            </button>

            {/* Secondary: View Resume */}
            <a
              href="/siddharthnegi_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mob-btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                minHeight: '48px',
                fontFamily: "'Fira Code', 'JetBrains Mono', 'Courier New', monospace",
                fontSize: '12px',
                letterSpacing: '0.06em',
                color: 'rgba(0,229,255,0.55)',
                background: 'transparent',
                border: '1px solid rgba(0,229,255,0.18)',
                borderRadius: '5px',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
            >
              View Resume →
            </a>
          </div>
        </div>

        {/* Bottom tagline */}
        <div
          style={{
            position: 'absolute',
            bottom: '28px',
            animation: 'mob-item-up 600ms cubic-bezier(0.2,0.7,0.2,1) 650ms both',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '10px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.50)',
            }}
          >
            Siddharth Negi · Full-Stack Developer
          </span>
        </div>
      </div>
    </>
  )
}
