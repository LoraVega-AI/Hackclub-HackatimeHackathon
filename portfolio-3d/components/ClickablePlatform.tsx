'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import * as THREE from 'three'

interface ClickablePlatformProps {
  onClick: () => void
}

export default function ClickablePlatform({ onClick }: ClickablePlatformProps) {
  const platformRef = useRef<Mesh>(null)
  const ringRef = useRef<Mesh>(null)

  // Gentle floating animation
  useFrame((state) => {
    if (platformRef.current) {
      platformRef.current.position.y = 0.2 + Math.sin(state.clock.elapsedTime * 0.8) * 0.05
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Main platform - light blue like in the image */}
      <mesh
        ref={platformRef}
        position={[0, 0.2, 0]}
        receiveShadow
        castShadow
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default'
        }}
      >
        <cylinderGeometry args={[2.5, 2.5, 0.3, 32]} />
        <meshToonMaterial
          color="#B8E6FF"
          gradientMap={null}
        />
      </mesh>
      
      {/* Top ring decoration */}
      <mesh
        ref={ringRef}
        position={[0, 0.35, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <torusGeometry args={[2.2, 0.1, 16, 32]} />
        <meshToonMaterial
          color="#D0F0FF"
          emissive="#D0F0FF"
          emissiveIntensity={0.4}
          gradientMap={null}
        />
      </mesh>
      
      {/* Center decorative dot */}
      <mesh
        position={[0, 0.36, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <circleGeometry args={[0.8, 32]} />
        <meshToonMaterial
          color="#E0F4FF"
          emissive="#E0F4FF"
          emissiveIntensity={0.6}
          gradientMap={null}
        />
      </mesh>
    </group>
  )
}

