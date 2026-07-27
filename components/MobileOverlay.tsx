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
      padding: '24px',
      fontFamily: 'inherit',
    }}>
      {/* Top cyan accent line */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(0,255,204,0.8) 30%, rgba(0,255,204,1) 50%, rgba(0,255,204,0.8) 70%, transparent 100%)',
      }} />

      {/* Radial glow background behind content */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(0,255,204,0.08) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* SN Monogram */}
      <div style={{
        border: '1px solid rgba(0,255,204,0.4)',
        boxShadow: '0 0 20px rgba(0,255,204,0.15)',
        padding: '12px 16px',
        marginBottom: '12px',
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#ffffff',
        borderRadius: '4px',
        position: 'relative',
        zIndex: 1,
      }}>SN</div>

      {/* Name & Title */}
      <p style={{
        fontSize: '15px',
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        marginBottom: '32px',
        letterSpacing: '0.05em',
        position: 'relative',
        zIndex: 1,
      }}>SIDDHARTH NEGI · FULL-STACK DEVELOPER</p>

      {/* Heading */}
      <h1 style={{
        fontSize: '36px',
        fontWeight: 900,
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: '16px',
        lineHeight: 1.1,
        letterSpacing: '-0.03em',
        position: 'relative',
        zIndex: 1,
      }}>Optimized for Desktop</h1>

      {/* Subtext */}
      <p style={{
        fontSize: '14px',
        color: 'rgba(255,255,255,0.5)',
        textAlign: 'center',
        maxWidth: '280px',
        marginBottom: '28px',
        lineHeight: 1.6,
        position: 'relative',
        zIndex: 1,
      }}>
        Full-Stack Developer · AI-Native SaaS Builder · 6 products shipped and counting.
      </p>

      {/* Stat pills */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '40px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        {['6 PROJECTS', '3 ROLES', '4 CERTS'].map((stat) => (
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

      {/* Enter Anyway button - Primary filled */}
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
          background: enterHover ? 'rgba(0,255,204,0.15)' : 'rgba(0,255,204,0.15)',
          border: `2px solid rgba(0,255,204,1)`,
          boxShadow: enterHover ? '0 0 20px rgba(0,255,204,0.4)' : '0 0 12px rgba(0,255,204,0.2)',
          color: '#00ffcc',
          fontSize: '13px',
          fontFamily: 'monospace',
          letterSpacing: '0.05em',
          cursor: 'pointer',
          borderRadius: '4px',
          transition: 'background 200ms ease, border-color 200ms ease, color 200ms ease, box-shadow 200ms ease, transform 200ms ease',
          position: 'relative',
          zIndex: 1,
        }}
      >Enter Anyway →</button>

      {/* View Resume button - Secondary outlined */}
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
          marginBottom: '12px',
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
          position: 'relative',
          zIndex: 1,
        }}
      >View Resume →</a>

      {/* GitHub button - Secondary outlined */}
      <a
        href="https://github.com/imsiddharthnegi"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => { /* would need separate state for this */ }}
        onMouseLeave={() => { /* would need separate state for this */ }}
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '16px',
          background: 'transparent',
          border: `1px solid rgba(0,255,204,0.2)`,
          color: 'rgba(0,255,204,0.6)',
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
          position: 'relative',
          zIndex: 1,
        }}
        onMouseDown={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(0.97)' }}
        onMouseUp={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)' }}
      >GitHub →</a>


    </div>
  )
}
