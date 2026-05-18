'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroParticles() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const pointsRef = useRef<THREE.Points | null>(null)
  const animationIdRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(Date.now())

  const particleDataRef = useRef<{
    speeds: number[]
    offsets: number[]
    colors: THREE.Color[]
  }>({
    speeds: [],
    offsets: [],
    colors: [],
  })

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // ─── Create soft circular glow texture ────────────────────────
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')!

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.4)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 64, 64)

    const glowTexture = new THREE.CanvasTexture(canvas)

    // ─── Initialize Three.js scene ────────────────────────────────
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100)
    camera.position.z = 4
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
    })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(width, height)
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // ─── Create 150 particles with distribution ───────────────────
    const particleCount = 150
    const geometry = new THREE.BufferGeometry()

    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    const speeds: number[] = []
    const offsets: number[] = []
    const colorObjects: THREE.Color[] = []

    for (let i = 0; i < particleCount; i++) {
      // Random position
      positions[i * 3] = Math.random() * 16 - 8 // x: -8 to 8
      positions[i * 3 + 1] = Math.random() * 10 - 5 // y: -5 to 5
      positions[i * 3 + 2] = Math.random() * 4 - 3 // z: -3 to 1

      // Random size distribution
      const rand = Math.random()
      if (rand < 0.7) {
        sizes[i] = 0.04 + Math.random() * 0.04 // 70%: 0.04–0.08
      } else if (rand < 0.9) {
        sizes[i] = 0.1 + Math.random() * 0.05 // 20%: 0.1–0.15
      } else {
        sizes[i] = 0.18 + Math.random() * 0.07 // 10%: 0.18–0.25
      }

      // Color distribution
      const colorRand = Math.random()
      let color: THREE.Color
      if (colorRand < 0.7) {
        // 70% white with slight brightness variation
        const brightness = 0.85 + Math.random() * 0.15
        color = new THREE.Color(brightness, brightness, brightness)
      } else if (colorRand < 0.9) {
        // 20% light blue
        color = new THREE.Color('#c8f0ff')
      } else {
        // 10% cyan
        color = new THREE.Color('#00ffcc')
      }
      colorObjects.push(color)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b

      // Twinkle parameters
      speeds.push(0.2 + Math.random() * 0.8)
      offsets.push(Math.random() * Math.PI * 2)
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const material = new THREE.PointsMaterial({
      size: 0.12,
      map: glowTexture,
      vertexColors: true,
      transparent: true,
      opacity: 1.0,
      alphaTest: 0.001,
      depthWrite: false,
      sizeAttenuation: true,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)
    pointsRef.current = points

    particleDataRef.current = {
      speeds,
      offsets,
      colors: colorObjects,
    }

    // ─── Animation loop ───────────────────────────────────────────
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      const elapsed = (Date.now() - startTimeRef.current) / 1000
      const colorArray = geometry.attributes.color.array as Float32Array

      for (let i = 0; i < particleCount; i++) {
        const opacity =
          0.4 + 0.6 * Math.abs(Math.sin(elapsed * speeds[i] + offsets[i]))
        const baseColor = colorObjects[i]

        colorArray[i * 3] = baseColor.r * opacity
        colorArray[i * 3 + 1] = baseColor.g * opacity
        colorArray[i * 3 + 2] = baseColor.b * opacity
      }

      geometry.attributes.color.needsUpdate = true

      renderer.render(scene, camera)
    }

    animate()

    // ─── Handle window resize ─────────────────────────────────────
    const handleResize = () => {
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight

      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()

      renderer.setSize(newWidth, newHeight)
    }

    window.addEventListener('resize', handleResize)

    // ─── Cleanup on unmount ───────────────────────────────────────
    return () => {
      window.removeEventListener('resize', handleResize)

      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }

      geometry.dispose()
      material.dispose()
      glowTexture.dispose()
      renderer.dispose()

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="hidden md:block"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
