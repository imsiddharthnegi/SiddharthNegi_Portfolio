'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function HeroParticles() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const twinkleOffsetsRef = useRef<Float32Array | null>(null)
  const twinkleSpeedsRef = useRef<Float32Array | null>(null)
  const timeRef = useRef(0)

  useEffect(() => {
    if (!containerRef.current) return

    // ─── Scene setup ───────────────────────────────────────────
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )
    camera.position.z = 5
    cameraRef.current = camera

    // ─── Renderer setup (transparent background) ─────────────
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // ─── Create circular sprite texture ────────────────────
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 16
      canvas.height = 16
      const ctx = canvas.getContext('2d')!
      
      // Draw radial gradient circle (white center fading to transparent)
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8)
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 16, 16)
      
      return new THREE.CanvasTexture(canvas)
    }
    
    const circleTexture = createCircleTexture()

    // ─── Create three-tier starfield ──────────────────────────

    // Tier 1: 60 tiny white stars (no twinkle)
    const tier1Count = 60
    const tier1Geometry = new THREE.BufferGeometry()
    const tier1Positions = new Float32Array(tier1Count * 3)
    const tier1Opacities = new Float32Array(tier1Count)

    for (let i = 0; i < tier1Count; i++) {
      tier1Positions[i * 3] = (Math.random() - 0.5) * 10
      tier1Positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      tier1Positions[i * 3 + 2] = (Math.random() - 0.5) * 10

      tier1Opacities[i] = Math.random() * 0.03 + 0.06
    }

    tier1Geometry.setAttribute('position', new THREE.BufferAttribute(tier1Positions, 3))
    tier1Geometry.setAttribute('opacity', new THREE.BufferAttribute(tier1Opacities, 1))

    const tier1Material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.015,
      sizeAttenuation: true,
      transparent: true,
      vertexColors: false,
      map: circleTexture,
      alphaTest: 0.01,
    })

    const tier1 = new THREE.Points(tier1Geometry, tier1Material)
    scene.add(tier1)

    // Tier 2: 40 medium off-white stars (slow twinkle, speed 0.2-0.6)
    const tier2Count = 40
    const tier2Geometry = new THREE.BufferGeometry()
    const tier2Positions = new Float32Array(tier2Count * 3)
    const tier2Opacities = new Float32Array(tier2Count)
    const tier2Offsets = new Float32Array(tier2Count)
    const tier2Speeds = new Float32Array(tier2Count)

    for (let i = 0; i < tier2Count; i++) {
      tier2Positions[i * 3] = (Math.random() - 0.5) * 10
      tier2Positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      tier2Positions[i * 3 + 2] = (Math.random() - 0.5) * 10

      tier2Opacities[i] = Math.random() * 0.04 + 0.08
      tier2Offsets[i] = Math.random() * Math.PI * 2
      tier2Speeds[i] = Math.random() * 0.4 + 0.2
    }

    tier2Geometry.setAttribute('position', new THREE.BufferAttribute(tier2Positions, 3))
    tier2Geometry.setAttribute('opacity', new THREE.BufferAttribute(tier2Opacities, 1))

    const tier2Material = new THREE.PointsMaterial({
      color: 0xe8f4f8,
      size: 0.03,
      sizeAttenuation: true,
      transparent: true,
      vertexColors: false,
      map: circleTexture,
      alphaTest: 0.01,
    })

    const tier2 = new THREE.Points(tier2Geometry, tier2Material)
    scene.add(tier2)

    // Tier 3: 20 larger cyan stars (slower deeper twinkle, speed 0.1-0.3)
    const tier3Count = 20
    const tier3Geometry = new THREE.BufferGeometry()
    const tier3Positions = new Float32Array(tier3Count * 3)
    const tier3Opacities = new Float32Array(tier3Count)
    const tier3Offsets = new Float32Array(tier3Count)
    const tier3Speeds = new Float32Array(tier3Count)

    for (let i = 0; i < tier3Count; i++) {
      tier3Positions[i * 3] = (Math.random() - 0.5) * 10
      tier3Positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      tier3Positions[i * 3 + 2] = (Math.random() - 0.5) * 10

      tier3Opacities[i] = Math.random() * 0.05 + 0.1
      tier3Offsets[i] = Math.random() * Math.PI * 2
      tier3Speeds[i] = Math.random() * 0.2 + 0.1
    }

    tier3Geometry.setAttribute('position', new THREE.BufferAttribute(tier3Positions, 3))
    tier3Geometry.setAttribute('opacity', new THREE.BufferAttribute(tier3Opacities, 1))

    const tier3Material = new THREE.PointsMaterial({
      color: 0xccf5ff,
      size: 0.05,
      sizeAttenuation: true,
      transparent: true,
      vertexColors: false,
      map: circleTexture,
      alphaTest: 0.01,
    })

    const tier3 = new THREE.Points(tier3Geometry, tier3Material)
    scene.add(tier3)

    // Store twinkle data for animation
    twinkleOffsetsRef.current = new Float32Array([
      ...tier2Offsets,
      ...tier3Offsets,
    ])
    twinkleSpeedsRef.current = new Float32Array([
      ...tier2Speeds,
      ...tier3Speeds,
    ])

    // ─── Handle window resize ──────────────────────────────
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    // ─── Animation loop ───────────────────────────────────
    let animationFrameId: number

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      timeRef.current += 1 / 60 // Increment time by frame delta

      // Update Tier 1 opacity (static, no twinkle)
      tier1Material.opacity = 1

      // Update Tier 2 opacity (twinkle with sine wave)
      const tier2OpacityArray = tier2Geometry.attributes.opacity.array as Float32Array
      for (let i = 0; i < tier2Count; i++) {
        const twinkle = Math.sin(timeRef.current * tier2Speeds[i] + tier2Offsets[i]) * 0.5 + 0.5
        tier2OpacityArray[i] = (Math.random() * 0.04 + 0.08) * twinkle
      }
      tier2Geometry.attributes.opacity.needsUpdate = true
      tier2Material.opacity = 1

      // Update Tier 3 opacity (slower deeper twinkle)
      const tier3OpacityArray = tier3Geometry.attributes.opacity.array as Float32Array
      for (let i = 0; i < tier3Count; i++) {
        const twinkle = Math.sin(timeRef.current * tier3Speeds[i] + tier3Offsets[i]) * 0.5 + 0.5
        tier3OpacityArray[i] = (Math.random() * 0.05 + 0.1) * twinkle
      }
      tier3Geometry.attributes.opacity.needsUpdate = true
      tier3Material.opacity = 1

      renderer.render(scene, camera)
    }

    animate()

    // ─── Cleanup on unmount ────────────────────────────────
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)

      tier1Geometry.dispose()
      tier1Material.dispose()
      tier2Geometry.dispose()
      tier2Material.dispose()
      tier3Geometry.dispose()
      tier3Material.dispose()
      renderer.dispose()

      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="hidden md:block fixed inset-0 pointer-events-none"
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 0,
      }}
    />
  )
}
