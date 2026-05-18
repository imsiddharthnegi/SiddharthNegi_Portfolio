'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function HeroParticles() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const opacityTargetsRef = useRef<Float32Array | null>(null)
  const rotationRef = useRef({ y: 0 })

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
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // ─── Particle geometry and material ──────────────────────
    const particleCount = 135 // 120-150 range
    const geometry = new THREE.BufferGeometry()

    // Position particles in a sphere-like cloud
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)
    const opacities = new Float32Array(particleCount)
    const opacityTargets = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      // Random position within a sphere
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const radius = Math.random() * 3 + 0.5

      positions[i * 3] = Math.sin(phi) * Math.cos(theta) * radius
      positions[i * 3 + 1] = Math.cos(phi) * radius
      positions[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * radius

      // Very slow random velocity
      velocities[i * 3] = (Math.random() - 0.5) * 0.08
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.08
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.08

      // Starting opacity and random target
      opacities[i] = Math.random() * 0.2 + 0.05
      opacityTargets[i] = Math.random() * 0.25 + 0.05
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute(
      'opacity',
      new THREE.BufferAttribute(opacities, 1),
    )

    const material = new THREE.PointsMaterial({
      color: 0x00ffcc,
      size: 0.08,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.18,
      vertexColors: false,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)
    particlesRef.current = particles
    opacityTargetsRef.current = opacityTargets

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

      // Slowly rotate the entire particle field on Y axis
      rotationRef.current.y += 0.00008 // One full rotation every ~30-40 seconds
      particles.rotation.y = rotationRef.current.y

      // Update particle positions (slow drift)
      const positionArray = geometry.attributes.position.array as Float32Array
      const velocityArray = velocities

      for (let i = 0; i < particleCount; i++) {
        positionArray[i * 3] += velocityArray[i * 3]
        positionArray[i * 3 + 1] += velocityArray[i * 3 + 1]
        positionArray[i * 3 + 2] += velocityArray[i * 3 + 2]

        // Wrap particles around to create continuous effect
        if (Math.abs(positionArray[i * 3]) > 5)
          velocityArray[i * 3] *= -1
        if (Math.abs(positionArray[i * 3 + 1]) > 5)
          velocityArray[i * 3 + 1] *= -1
        if (Math.abs(positionArray[i * 3 + 2]) > 5)
          velocityArray[i * 3 + 2] *= -1
      }
      geometry.attributes.position.needsUpdate = true

      // Pulse opacity effect
      const opacityArray = geometry.attributes.opacity.array as Float32Array
      const targets = opacityTargetsRef.current!

      for (let i = 0; i < particleCount; i++) {
        opacityArray[i] += (targets[i] - opacityArray[i]) * 0.02

        // Randomly switch target opacity
        if (Math.random() < 0.001) {
          targets[i] = Math.random() * 0.25 + 0.05
        }
      }
      geometry.attributes.opacity.needsUpdate = true

      renderer.render(scene, camera)
    }

    animate()

    // ─── Cleanup on unmount ────────────────────────────────
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)

      geometry.dispose()
      material.dispose()
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
