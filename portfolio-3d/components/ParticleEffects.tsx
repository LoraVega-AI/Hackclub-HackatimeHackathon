'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface LandmarkParticlesProps {
  position: [number, number, number]
  color: string
  count?: number
}

export function LandmarkParticles({ position, color, count = 15 }: LandmarkParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const velocitiesRef = useRef<Float32Array | null>(null)

  const initialPositions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const radius = 0.8 + Math.random() * 0.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI

      positions[i3] = position[0] + Math.sin(phi) * Math.cos(theta) * radius
      positions[i3 + 1] = position[1] + 0.5 + Math.random() * 2
      positions[i3 + 2] = position[2] + Math.sin(phi) * Math.sin(theta) * radius

      velocities[i3] = (Math.random() - 0.5) * 0.01
      velocities[i3 + 1] = Math.random() * 0.02 + 0.01
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01
    }

    velocitiesRef.current = velocities
    return positions
  }, [position, count])

  useFrame(() => {
    if (!pointsRef.current || !velocitiesRef.current) return

    const geometry = pointsRef.current.geometry
    const positionAttribute = geometry.attributes.position
    
    if (!positionAttribute) return
    
    const positions = positionAttribute.array as Float32Array
    
    // Ensure we don't exceed the buffer size
    const maxIndex = Math.min(count * 3, positions.length)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      if (i3 + 2 >= maxIndex) break

      // Update positions
      positions[i3] += velocitiesRef.current[i3]
      positions[i3 + 1] += velocitiesRef.current[i3 + 1]
      positions[i3 + 2] += velocitiesRef.current[i3 + 2]

      // Reset particles that go too high
      if (positions[i3 + 1] > position[1] + 3) {
        const radius = 0.8 + Math.random() * 0.5
        const theta = Math.random() * Math.PI * 2
        const phi = Math.random() * Math.PI

        positions[i3] = position[0] + Math.sin(phi) * Math.cos(theta) * radius
        positions[i3 + 1] = position[1] + 0.5
        positions[i3 + 2] = position[2] + Math.sin(phi) * Math.sin(theta) * radius
      }

      // Orbital motion
      const dx = positions[i3] - position[0]
      const dz = positions[i3 + 2] - position[2]
      const angle = Math.atan2(dz, dx)
      const orbitSpeed = 0.01

      velocitiesRef.current[i3] = Math.cos(angle + orbitSpeed) * 0.01 - dx * 0.001
      velocitiesRef.current[i3 + 2] = Math.sin(angle + orbitSpeed) * 0.01 - dz * 0.001
    }

    positionAttribute.needsUpdate = true
  })

  return (
    <Points ref={pointsRef} positions={initialPositions}>
      <PointMaterial
        transparent
        color={color}
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  )
}

interface CatTrailProps {
  catPosition: THREE.Vector3
}

export function CatTrail({ catPosition }: CatTrailProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const trailPositions = useRef<Float32Array>(new Float32Array(50 * 3))
  const trailIndex = useRef(0)

  useFrame(() => {
    if (!pointsRef.current) return

    const geometry = pointsRef.current.geometry
    const positionAttribute = geometry.attributes.position
    
    if (!positionAttribute) return
    
    const positions = positionAttribute.array as Float32Array
    
    // Ensure we have the correct buffer size
    if (positions.length !== 50 * 3) return

    const index = trailIndex.current % 50
    const i3 = index * 3

    // Add new trail position
    positions[i3] = catPosition.x
    positions[i3 + 1] = catPosition.y + 0.2
    positions[i3 + 2] = catPosition.z

    trailIndex.current++

    // Fade out old positions
    for (let i = 0; i < 50; i++) {
      const age = (trailIndex.current - i) / 50
      if (age < 1) {
        const i3 = i * 3
        if (i3 + 1 < positions.length) {
          positions[i3 + 1] -= 0.005 // Slowly fall
        }
      }
    }

    positionAttribute.needsUpdate = true
  })

  return (
    <Points ref={pointsRef} positions={trailPositions.current}>
      <PointMaterial
        transparent
        color="#FFB6C1"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.4}
      />
    </Points>
  )
}

export function AmbientParticles() {
  const particles = useMemo(() => {
    const count = 50
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 40
      positions[i3 + 1] = 2 + Math.random() * 6
      positions[i3 + 2] = (Math.random() - 0.5) * 40
    }

    return positions
  }, [])

  // Static particles - no animation for better performance
  return (
    <Points positions={particles}>
      <PointMaterial
        transparent
        color="#FFFFFF"
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.4}
      />
    </Points>
  )
}

interface StarfieldProps {
  count?: number
}

export function Starfield({ count = 100 }: StarfieldProps) {
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 100
      positions[i3 + 1] = Math.random() * 50 + 10
      positions[i3 + 2] = (Math.random() - 0.5) * 100
    }

    return positions
  }, [count])

  return (
    <Points positions={particles}>
      <PointMaterial
        transparent
        color="#FFFFFF"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  )
}

