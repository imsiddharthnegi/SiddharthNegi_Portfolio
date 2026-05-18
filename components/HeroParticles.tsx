'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface Particle {
  position: THREE.Vector3
  velocity: THREE.Vector3
  opacityTarget: number
  opacityCurrent: number
  opacitySpeed: number
}

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const pointsRef = useRef<THREE.Points | null>(null)
  const animationIdRef = useRef<number | null>(null)
  const rotationRef = useRef({ y: 0 })

  useEffect(() => {
    if (!canvasRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 30
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: canvasRef.current,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    rendererRef.current = renderer

    // Create particles
    const particleCount = 135
    const particles: Particle[] = []
    const geometry = new THREE.BufferGeometry()
    const positions: number[] = []
    const opacities: number[] = []

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 100
      const y = (Math.random() - 0.5) * 100
      const z = (Math.random() - 0.5) * 100

      positions.push(x, y, z)

      const particle: Particle = {
        position: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1
        ),
        opacityTarget: Math.random() * 0.2 + 0.05,
        opacityCurrent: 0.1,
        opacitySpeed: Math.random() * 0.01 + 0.005,
      }
      particles.push(particle)
      opacities.push(particle.opacityCurrent)
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3))
    geometry.setAttribute('opacity', new THREE.BufferAttribute(new Float32Array(opacities), 1))

    const material = new THREE.PointsMaterial({
      size: 1,
      sizeAttenuation: true,
      color: 0x00ffcc,
      transparent: true,
      opacity: 0.15,
      vertexColors: false,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)
    pointsRef.current = points
    particlesRef.current = particles

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      // Update particle positions and opacity
      const positionAttribute = geometry.getAttribute('position') as THREE.BufferAttribute
      const opacityAttribute = geometry.getAttribute('opacity') as THREE.BufferAttribute
      const positionArray = positionAttribute.array as Float32Array
      const opacityArray = opacityAttribute.array as Float32Array

      particles.forEach((particle, i) => {
        // Slow drift
        particle.position.add(particle.velocity)

        // Wrap around bounds
        if (particle.position.x > 50) particle.position.x = -50
        if (particle.position.x < -50) particle.position.x = 50
        if (particle.position.y > 50) particle.position.y = -50
        if (particle.position.y < -50) particle.position.y = 50
        if (particle.position.z > 50) particle.position.z = -50
        if (particle.position.z < -50) particle.position.z = 50

        // Update opacity with pulsing
        if (Math.abs(particle.opacityCurrent - particle.opacityTarget) < 0.01) {
          particle.opacityTarget = Math.random() * 0.2 + 0.05
        }
        particle.opacityCurrent += (particle.opacityTarget - particle.opacityCurrent) * particle.opacitySpeed

        // Update geometry
        positionArray[i * 3] = particle.position.x
        positionArray[i * 3 + 1] = particle.position.y
        positionArray[i * 3 + 2] = particle.position.z
        opacityArray[i] = particle.opacityCurrent
      })

      positionAttribute.needsUpdate = true
      opacityAttribute.needsUpdate = true

      // Slow Y-axis rotation (one full rotation every 40 seconds)
      rotationRef.current.y += (Math.PI * 2) / (40 * 60) // 40 seconds at 60fps
      if (points) {
        points.rotation.y = rotationRef.current.y
      }

      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current || !renderer || !camera) return

      const width = window.innerWidth
      const height = window.innerHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        display: 'block',
      }}
      className="hidden md:block"
    />
  )
}
