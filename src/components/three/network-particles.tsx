'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const PARTICLE_COUNT = 200
const MAX_DISTANCE = 65
const MAX_LINES = 6000
const BOUNDS = 250
const SPEED_LIMIT = 0.2
const DRIFT = 0.003

interface Velocity {
  x: number
  y: number
  z: number
}

export function NetworkParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    console.log('[NetworkParticles] Initializing Three.js scene')

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0xffffff, 0.002)

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )
    camera.position.z = 250

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    // Particles
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const velocities: Velocity[] = []

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 500
      positions[i * 3 + 1] = (Math.random() - 0.5) * 500
      positions[i * 3 + 2] = (Math.random() - 0.5) * 500
      velocities.push({
        x: (Math.random() - 0.5) * 0.1,
        y: (Math.random() - 0.5) * 0.1,
        z: (Math.random() - 0.5) * 0.1,
      })
    }

    const pointGeometry = new THREE.BufferGeometry()
    pointGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3),
    )

    // Particle texture
    const particleCanvas = document.createElement('canvas')
    particleCanvas.width = 32
    particleCanvas.height = 32
    const context = particleCanvas.getContext('2d')
    if (context) {
      const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16)
      gradient.addColorStop(0, 'rgba(47,187,140,0.5)')
      gradient.addColorStop(1, 'rgba(47,187,140,0)')
      context.fillStyle = gradient
      context.beginPath()
      context.arc(16, 16, 16, 0, Math.PI * 2, true)
      context.fill()
    }
    const particleTexture = new THREE.CanvasTexture(particleCanvas)

    const pointMaterial = new THREE.PointsMaterial({
      color: 0x2fbb8c,
      size: 10,
      transparent: true,
      opacity: 0.6,
      map: particleTexture,
      depthWrite: false,
    })

    const particles = new THREE.Points(pointGeometry, pointMaterial)
    scene.add(particles)

    // Lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x2fbb8c,
      transparent: true,
      opacity: 0.15,
    })

    const linePositions = new Float32Array(MAX_LINES * 6)
    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(linePositions, 3),
    )

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(linesMesh)

    // Mouse tracking
    let mouseX = 0
    let mouseY = 0
    let windowHalfX = window.innerWidth / 2
    let windowHalfY = window.innerHeight / 2

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX - windowHalfX
      mouseY = event.clientY - windowHalfY
    }

    const handleResize = () => {
      windowHalfX = window.innerWidth / 2
      windowHalfY = window.innerHeight / 2
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    document.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    // Animation loop
    let animationId: number

    function animate() {
      animationId = requestAnimationFrame(animate)

      const posAttribute = pointGeometry.attributes
        .position as THREE.BufferAttribute
      let lineVertexIndex = 0

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        velocities[i].x += (Math.random() - 0.5) * DRIFT
        velocities[i].y += (Math.random() - 0.5) * DRIFT
        velocities[i].z += (Math.random() - 0.5) * DRIFT

        const speed = Math.sqrt(
          velocities[i].x ** 2 + velocities[i].y ** 2 + velocities[i].z ** 2,
        )
        if (speed > SPEED_LIMIT) {
          velocities[i].x *= SPEED_LIMIT / speed
          velocities[i].y *= SPEED_LIMIT / speed
          velocities[i].z *= SPEED_LIMIT / speed
        }

        const x = posAttribute.getX(i) + velocities[i].x
        const y = posAttribute.getY(i) + velocities[i].y
        const z = posAttribute.getZ(i) + velocities[i].z

        if (x > BOUNDS || x < -BOUNDS) velocities[i].x *= -1
        if (y > BOUNDS || y < -BOUNDS) velocities[i].y *= -1
        if (z > BOUNDS || z < -BOUNDS) velocities[i].z *= -1

        posAttribute.setXYZ(i, x, y, z)

        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = x - posAttribute.getX(j)
          const dy = y - posAttribute.getY(j)
          const dz = z - posAttribute.getZ(j)
          const distSq = dx * dx + dy * dy + dz * dz

          if (
            distSq < MAX_DISTANCE * MAX_DISTANCE &&
            lineVertexIndex < MAX_LINES * 2
          ) {
            linePositions[lineVertexIndex * 3] = x
            linePositions[lineVertexIndex * 3 + 1] = y
            linePositions[lineVertexIndex * 3 + 2] = z
            lineVertexIndex++

            linePositions[lineVertexIndex * 3] = posAttribute.getX(j)
            linePositions[lineVertexIndex * 3 + 1] = posAttribute.getY(j)
            linePositions[lineVertexIndex * 3 + 2] = posAttribute.getZ(j)
            lineVertexIndex++
          }
        }
      }

      posAttribute.needsUpdate = true

      for (let i = lineVertexIndex; i < MAX_LINES * 2; i++) {
        linePositions[i * 3] = 0
        linePositions[i * 3 + 1] = 0
        linePositions[i * 3 + 2] = 0
      }
      ;(lineGeometry.attributes.position as THREE.BufferAttribute).needsUpdate =
        true

      scene.rotation.y += 0.0005
      scene.rotation.x += 0.0002

      const targetX = mouseX * 0.2
      const targetY = mouseY * 0.2
      camera.position.x += (targetX - camera.position.x) * 0.08
      camera.position.y += (-targetY - camera.position.y) * 0.08
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }

    animate()
    console.log('[NetworkParticles] Animation started')

    return () => {
      console.log('[NetworkParticles] Cleanup')
      cancelAnimationFrame(animationId)
      document.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      pointGeometry.dispose()
      pointMaterial.dispose()
      particleTexture.dispose()
      lineGeometry.dispose()
      lineMaterial.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} id="networkCanvas" />
}
