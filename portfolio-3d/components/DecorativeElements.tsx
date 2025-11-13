'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'
import * as THREE from 'three'

// Butterfly component
function Butterfly({ position, speed, scale }: { position: [number, number, number], speed: number, scale: number }) {
  const butterflyRef = useRef<Group>(null)
  const wingLeftRef = useRef<THREE.Mesh>(null)
  const wingRightRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (butterflyRef.current) {
      // Flight path - figure-8 pattern
      const time = state.clock.elapsedTime * speed
      butterflyRef.current.position.x = position[0] + Math.sin(time) * 8
      butterflyRef.current.position.y = position[1] + Math.sin(time * 2) * 2
      butterflyRef.current.position.z = position[2] + Math.cos(time) * 8
      
      // Rotation to face movement direction
      butterflyRef.current.rotation.y = time
    }

    // Wing flapping
    if (wingLeftRef.current && wingRightRef.current) {
      const flap = Math.sin(state.clock.elapsedTime * 15) * 0.5
      wingLeftRef.current.rotation.y = Math.PI / 4 + flap
      wingRightRef.current.rotation.y = -Math.PI / 4 - flap
    }
  })

  return (
    <group ref={butterflyRef} position={position} scale={scale}>
      {/* Body */}
      <mesh>
        <capsuleGeometry args={[0.05, 0.3, 8, 16]} />
        <meshToonMaterial color="#FF6B9D" gradientMap={null} />
      </mesh>

      {/* Left wing */}
      <mesh ref={wingLeftRef} position={[-0.15, 0, 0]}>
        <sphereGeometry args={[0.2, 12, 12, 0, Math.PI]} />
        <meshToonMaterial
          color="#FF6B9D"
          emissive="#FF6B9D"
          emissiveIntensity={0.3}
          side={THREE.DoubleSide}
          gradientMap={null}
        />
      </mesh>

      {/* Right wing */}
      <mesh ref={wingRightRef} position={[0.15, 0, 0]}>
        <sphereGeometry args={[0.2, 12, 12, 0, Math.PI]} />
        <meshToonMaterial
          color="#FFB6D9"
          emissive="#FFB6D9"
          emissiveIntensity={0.3}
          side={THREE.DoubleSide}
          gradientMap={null}
        />
      </mesh>

      {/* Wing spots */}
      <mesh position={[-0.2, 0, 0.05]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshToonMaterial color="#FFFFFF" gradientMap={null} />
      </mesh>
      <mesh position={[0.2, 0, 0.05]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshToonMaterial color="#FFFFFF" gradientMap={null} />
      </mesh>
    </group>
  )
}

// Bird component
function Bird({ position, speed, scale }: { position: [number, number, number], speed: number, scale: number }) {
  const birdRef = useRef<Group>(null)
  const wingLeftRef = useRef<THREE.Mesh>(null)
  const wingRightRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (birdRef.current) {
      // Circular flight path
      const time = state.clock.elapsedTime * speed
      const radius = 30
      birdRef.current.position.x = position[0] + Math.cos(time) * radius
      birdRef.current.position.y = position[1] + Math.sin(time * 0.5) * 3
      birdRef.current.position.z = position[2] + Math.sin(time) * radius
      
      // Face movement direction
      birdRef.current.rotation.y = time + Math.PI / 2
    }

    // Wing flapping
    if (wingLeftRef.current && wingRightRef.current) {
      const flap = Math.sin(state.clock.elapsedTime * 8) * 0.8
      wingLeftRef.current.rotation.z = flap
      wingRightRef.current.rotation.z = -flap
    }
  })

  return (
    <group ref={birdRef} position={position} scale={scale}>
      {/* Body */}
      <mesh>
        <capsuleGeometry args={[0.1, 0.3, 8, 16]} />
        <meshToonMaterial color="#4ECDC4" gradientMap={null} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshToonMaterial color="#4ECDC4" gradientMap={null} />
      </mesh>

      {/* Beak */}
      <mesh position={[0, 0.2, 0.12]}>
        <coneGeometry args={[0.04, 0.08, 8]} />
        <meshToonMaterial color="#FFE66D" gradientMap={null} />
      </mesh>

      {/* Left wing */}
      <mesh ref={wingLeftRef} position={[-0.15, 0, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.3, 0.05, 0.15]} />
        <meshToonMaterial color="#45B7AF" gradientMap={null} />
      </mesh>

      {/* Right wing */}
      <mesh ref={wingRightRef} position={[0.15, 0, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.3, 0.05, 0.15]} />
        <meshToonMaterial color="#45B7AF" gradientMap={null} />
      </mesh>

      {/* Tail */}
      <mesh position={[0, 0, -0.2]} rotation={[Math.PI / 4, 0, 0]}>
        <boxGeometry args={[0.15, 0.05, 0.15]} />
        <meshToonMaterial color="#45B7AF" gradientMap={null} />
      </mesh>
    </group>
  )
}

export default function DecorativeElements() {
  const butterflies = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => ({
      position: [
        (i - 2) * 10,
        2 + i * 0.5,
        (i - 2) * 10
      ] as [number, number, number],
      speed: 0.3 + i * 0.1,
      scale: 0.8 + (i % 2) * 0.4,
      key: `butterfly-${i}`
    }))
  }, [])

  const birds = useMemo(() => {
    return Array.from({ length: 3 }).map((_, i) => ({
      position: [
        (i - 1) * 20,
        20 + i * 5,
        (i - 1) * 20
      ] as [number, number, number],
      speed: 0.15 + i * 0.05,
      scale: 1 + i * 0.3,
      key: `bird-${i}`
    }))
  }, [])

  return (
    <group>
      {/* Butterflies */}
      {butterflies.map((butterfly) => (
        <Butterfly
          key={butterfly.key}
          position={butterfly.position}
          speed={butterfly.speed}
          scale={butterfly.scale}
        />
      ))}

      {/* Birds */}
      {birds.map((bird) => (
        <Bird
          key={bird.key}
          position={bird.position}
          speed={bird.speed}
          scale={bird.scale}
        />
      ))}
    </group>
  )
}

