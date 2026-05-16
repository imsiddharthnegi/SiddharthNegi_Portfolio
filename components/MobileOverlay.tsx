'use client'

import { useEffect, useState } from 'react'

export default function MobileOverlay() {
  const [show, setShow] = useState(false)
  const [enterHover, setEnterHover] = useState(false)
  const [resumeHover, setResumeHover] = useState(false)

  useEffect(() => {
    // Clear all old keys from every previous version
    const OLD_KEYS = [
      'mob_ov',
      'overlay_v1', 'overlay_v2', 'overlay_v3', 'overlay_v4',
      'mobile_overlay_seen', 'mobile_overlay_seen_v2',
      'mobile-splash-dismissed',
    ]
    OLD_KEYS.forEach((k) => sessionStorage.removeItem(k))

    const isMobile =
      window.innerWidth < 768 ||
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    const seen = sessionStorage.getItem('mob_ov_final')
    if (isMobile && !seen) setShow(true)
  }, [])

  if (!show) return null

  const handleEnter = () => {
    sessionStorage.setItem('mob_ov_final', '1')
    setShow(false)
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      backgroundColor: '#000000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px',
      fontFamily: 'inherit',
    }}>
      {/* Top cyan accent line */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(0,255,204,0.8) 30%, rgba(0,255,204,1) 50%, rgba(0,255,204,0.8) 70%, transparent 100%)',
      }} />

      {/* SN Monogram */}
      <div style={{
        border: '1px solid rgba(0,255,204,0.4)',
        boxShadow: '0 0 20px rgba(0,255,204,0.15)',
        padding: '12px 16px',
        marginBottom: '24px',
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#ffffff',
        borderRadius: '4px',
      }}>SN</div>

      {/* Heading */}
      <h1 style={{
        fontSize: '36px',
        fontWeight: 900,
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: '16px',
        lineHeight: 1.1,
        letterSpacing: '-0.03em',
      }}>Optimized for Desktop</h1>

      {/* Subtext */}
      <p style={{
        fontSize: '14px',
        color: 'rgba(255,255,255,0.5)',
        textAlign: 'center',
        maxWidth: '280px',
        marginBottom: '28px',
        lineHeight: 1.6,
      }}>
        This portfolio is designed for a full desktop experience. For the best view, open on a larger screen.
      </p>

      {/* Stat pills */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '32px',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {['6 PROJECTS', '4 INTERNSHIPS', '4 CERTS'].map((stat) => (
          <span key={stat} style={{
            border: '1px solid rgba(0,255,204,0.4)',
            color: '#00ffcc',
            fontSize: '11px',
            padding: '6px 12px',
            letterSpacing: '0.05em',
            borderRadius: '4px',
          }}>{stat}</span>
        ))}
      </div>

      {/* Enter Anyway button */}
      <button
        onClick={handleEnter}
        onMouseEnter={() => setEnterHover(true)}
        onMouseLeave={() => setEnterHover(false)}
        onTouchStart={() => { setEnterHover(true); }}
        onTouchEnd={() => { setEnterHover(false); }}
        onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.97)' }}
        onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)' }}
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '16px',
          marginBottom: '12px',
          background: enterHover ? 'rgba(0,255,204,0.2)' : 'rgba(0,255,204,0.1)',
          border: `1px solid ${enterHover ? 'rgba(0,255,204,0.7)' : 'rgba(0,255,204,0.4)'}`,
          boxShadow: enterHover ? '0 0 15px rgba(0,255,204,0.3)' : 'none',
          color: '#00ffcc',
          fontSize: '13px',
          fontFamily: 'monospace',
          letterSpacing: '0.05em',
          cursor: 'pointer',
          borderRadius: '4px',
          transition: 'background 200ms ease, border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease',
        }}
      >Enter Anyway →</button>

      {/* View Resume button */}
      <a
        href="/siddharthnegi_resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setResumeHover(true)}
        onMouseLeave={() => setResumeHover(false)}
        onTouchStart={() => { setResumeHover(true); }}
        onTouchEnd={() => { setResumeHover(false); }}
        onMouseDown={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(0.97)' }}
        onMouseUp={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)' }}
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '16px',
          background: resumeHover ? 'rgba(0,255,204,0.08)' : 'transparent',
          border: `1px solid ${resumeHover ? 'rgba(0,255,204,0.4)' : 'rgba(0,255,204,0.2)'}`,
          color: resumeHover ? 'rgba(0,255,204,0.9)' : 'rgba(0,255,204,0.6)',
          fontSize: '13px',
          fontFamily: 'monospace',
          letterSpacing: '0.05em',
          cursor: 'pointer',
          textAlign: 'center',
          textDecoration: 'none',
          display: 'block',
          borderRadius: '4px',
          boxSizing: 'border-box',
          transition: 'background 200ms ease, border-color 200ms ease, color 200ms ease, transform 200ms ease',
        }}
      >View Resume →</a>

      {/* Bottom tagline */}
      <p style={{
        position: 'absolute',
        bottom: '24px',
        fontSize: '11px',
        color: 'rgba(255,255,255,0.35)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}>Siddharth Negi · Full-Stack Developer</p>
    </div>
  )
}
