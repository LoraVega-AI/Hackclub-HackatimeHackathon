'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Group } from 'three'
import * as THREE from 'three'

export default function Sky() {
  const sunRef = useRef<Mesh>(null)

  // Animate sun pulsing
  useFrame((state) => {
    if (sunRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05
      sunRef.current.scale.setScalar(pulse)
    }
  })

  // Pre-calculate cloud positions
  const clouds = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => {
      const angle = (i / 18) * Math.PI * 2 + (i * 0.3)
      const radius = 40 + (i % 4) * 20
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      const y = 25 + (i % 3) * 8
      const scale = 1 + ((i * 0.4) % 1) * 0.8
      const speed = 0.01 + ((i * 0.2) % 1) * 0.02
      return { x, y, z, scale, speed, key: `cloud-${i}` }
    })
  }, [])

  return (
    <group>
      {/* Sky Dome */}
      <mesh position={[0, 0, 0]} scale={[1, 1, 1]}>
        <sphereGeometry args={[250, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshToonMaterial
          color="#87CEEB"
          side={THREE.BackSide}
          gradientMap={null}
        />
      </mesh>

      {/* Gradient sky layers for depth */}
      <mesh position={[0, 0, 0]} scale={[1, 0.95, 1]}>
        <sphereGeometry args={[249, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshToonMaterial
          color="#A0D8FF"
          side={THREE.BackSide}
          transparent
          opacity={0.5}
          gradientMap={null}
        />
      </mesh>

      {/* Horizon glow */}
      <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[200, 248, 64]} />
        <meshToonMaterial
          color="#D4F0FF"
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
          gradientMap={null}
        />
      </mesh>

      {/* Sun */}
      <mesh ref={sunRef} position={[80, 60, -100]}>
        <sphereGeometry args={[12, 32, 32]} />
        <meshToonMaterial
          color="#FFE66D"
          emissive="#FFE66D"
          emissiveIntensity={1.2}
          gradientMap={null}
        />
      </mesh>

      {/* Sun glow layers */}
      {[1.3, 1.6, 1.9].map((scale, i) => (
        <mesh key={i} position={[80, 60, -100]}>
          <sphereGeometry args={[12 * scale, 32, 32]} />
          <meshToonMaterial
            color="#FFE66D"
            emissive="#FFE66D"
            emissiveIntensity={0.6 - i * 0.2}
            transparent
            opacity={0.3 - i * 0.1}
            gradientMap={null}
          />
        </mesh>
      ))}

      {/* Clouds */}
      {clouds.map((cloud) => (
        <Cloud
          key={cloud.key}
          position={[cloud.x, cloud.y, cloud.z]}
          scale={cloud.scale}
          speed={cloud.speed}
        />
      ))}
    </group>
  )
}

interface CloudProps {
  position: [number, number, number]
  scale: number
  speed: number
}

function Cloud({ position, scale, speed }: CloudProps) {
  const cloudRef = useRef<Group>(null)

  useFrame((state) => {
    if (cloudRef.current) {
      // Floating animation
      cloudRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5
      // Slow drift
      cloudRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * speed * 0.3) * 2
    }
  })

  return (
    <group ref={cloudRef} position={position} scale={scale}>
      {/* Main cloud body - fluffy cartoon style */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshToonMaterial
          color="#FFFFFF"
          gradientMap={null}
        />
      </mesh>
      <mesh position={[1, 0, 0]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshToonMaterial
          color="#FFFFFF"
          gradientMap={null}
        />
      </mesh>
      <mesh position={[-0.8, 0, 0]}>
        <sphereGeometry args={[0.9, 16, 16]} />
        <meshToonMaterial
          color="#FFFFFF"
          gradientMap={null}
        />
      </mesh>
      <mesh position={[0.5, 0.5, 0]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshToonMaterial
          color="#FFFFFF"
          gradientMap={null}
        />
      </mesh>
      <mesh position={[-0.3, 0.4, 0]}>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshToonMaterial
          color="#FFFFFF"
          gradientMap={null}
        />
      </mesh>
      
      {/* Cloud highlights */}
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.6, 12, 12]} />
        <meshToonMaterial
          color="#FFFFFF"
          emissive="#FFFFFF"
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
          gradientMap={null}
        />
      </mesh>
    </group>
  )
}

