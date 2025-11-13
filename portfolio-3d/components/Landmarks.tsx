'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Vector3, Group } from 'three'
import * as THREE from 'three'

interface LandmarkProps {
  position: Vector3
  color: string
  secondaryColor: string
  label: string
  type: 'projects' | 'experience' | 'about' | 'contact'
}

function Landmark({ position, color, secondaryColor, label, type }: LandmarkProps) {
  const groupRef = useRef<Group>(null)
  const glowRef = useRef<Mesh>(null)
  const floatRef = useRef(0)

  useFrame((state) => {
    if (!groupRef.current) return
    floatRef.current += 0.01
    const float = Math.sin(floatRef.current) * 0.2
    groupRef.current.position.y = position.y + float
    
    groupRef.current.rotation.y += 0.003
    
    if (glowRef.current) {
      const pulse = 0.4 + Math.sin(state.clock.elapsedTime * 2) * 0.3
      glowRef.current.material.emissiveIntensity = pulse
    }
  })

  // Projects Landmark - Modern Cartoon Building
  if (type === 'projects') {
    return (
      <group ref={groupRef} position={position}>
        {/* Base platform - rounded */}
        <mesh receiveShadow castShadow position={[0, 0.1, 0]}>
          <cylinderGeometry args={[1.4, 1.4, 0.2, 24]} />
          <meshToonMaterial 
            color={secondaryColor}
            gradientMap={null}
          />
        </mesh>

        {/* Main building - smooth rounded */}
        <mesh castShadow position={[0, 1, 0]}>
          <capsuleGeometry args={[0.6, 1.2, 16, 32]} />
          <meshToonMaterial 
            color={color}
            gradientMap={null}
          />
        </mesh>

        {/* Windows - glowing */}
        {[0.4, 0.8, 1.2, 1.6].map((y, i) => (
          <group key={i}>
            {[-0.4, 0.4].map((x, j) => (
              <mesh key={j} position={[x, y, 0.65]}>
                <capsuleGeometry args={[0.12, 0.2, 8, 16]} />
                <meshToonMaterial 
                  color="#4DD0E1"
                  emissive="#4DD0E1"
                  emissiveIntensity={0.8}
                  gradientMap={null}
                />
              </mesh>
            ))}
          </group>
        ))}

        {/* Top decoration - rounded */}
        <mesh castShadow position={[0, 1.9, 0]}>
          <sphereGeometry args={[0.8, 24, 24]} />
          <meshToonMaterial 
            color={color}
            emissive={color}
            emissiveIntensity={0.2}
            gradientMap={null}
          />
        </mesh>

        <mesh castShadow position={[0, 2.3, 0]}>
          <coneGeometry args={[0.5, 0.6, 24]} />
          <meshToonMaterial 
            color={secondaryColor}
            emissive={secondaryColor}
            emissiveIntensity={0.3}
            gradientMap={null}
          />
        </mesh>

        {/* Corner spheres for decoration */}
        {[
          [-0.5, 1, -0.5],
          [0.5, 1, -0.5],
          [-0.5, 1, 0.5],
          [0.5, 1, 0.5],
        ].map((pos, i) => (
          <mesh key={i} castShadow position={pos as [number, number, number]}>
            <capsuleGeometry args={[0.08, 1.2, 8, 16]} />
            <meshToonMaterial 
              color={secondaryColor}
              emissive={secondaryColor}
              emissiveIntensity={0.2}
              gradientMap={null}
            />
          </mesh>
        ))}

        {/* Glow effect */}
        <mesh ref={glowRef} position={[0, 1, 0]}>
          <capsuleGeometry args={[0.7, 1.3, 16, 32]} />
          <meshToonMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.4}
            transparent
            opacity={0.4}
            gradientMap={null}
          />
        </mesh>
      </group>
    )
  }

  // Experience Landmark - Cartoon Tower
  if (type === 'experience') {
    return (
      <group ref={groupRef} position={position}>
        {/* Base */}
        <mesh receiveShadow castShadow position={[0, 0.1, 0]}>
          <cylinderGeometry args={[1.4, 1.4, 0.2, 24]} />
          <meshToonMaterial 
            color={secondaryColor}
            gradientMap={null}
          />
        </mesh>

        {/* Central pillar - smooth */}
        <mesh castShadow position={[0, 1.2, 0]}>
          <capsuleGeometry args={[0.2, 2, 16, 32]} />
          <meshToonMaterial 
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            gradientMap={null}
          />
        </mesh>

        {/* Floating platforms with cartoon style */}
        {[0.6, 1.2, 1.8].map((y, i) => {
          const size = 1 - i * 0.15
          const rotation = (i * Math.PI) / 3
          return (
            <group key={i} rotation={[0, rotation, 0]}>
              {/* Platform */}
              <mesh castShadow position={[0, y, 0]}>
                <cylinderGeometry args={[size, size, 0.15, 24]} />
                <meshToonMaterial 
                  color={i % 2 === 0 ? color : secondaryColor}
                  gradientMap={null}
                />
              </mesh>
              {/* Platform ring decoration */}
              <mesh position={[0, y + 0.08, 0]}>
                <torusGeometry args={[size, 0.06, 12, 24]} />
                <meshToonMaterial 
                  color="#FFD700"
                  emissive="#FFD700"
                  emissiveIntensity={0.8}
                  gradientMap={null}
                />
              </mesh>
              {/* Floating orbs around platforms */}
              {Array.from({ length: 4 }).map((_, j) => {
                const angle = (j / 4) * Math.PI * 2
                return (
                  <mesh
                    key={j}
                    position={[
                      Math.cos(angle) * (size + 0.3),
                      y,
                      Math.sin(angle) * (size + 0.3)
                    ]}
                    castShadow
                  >
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshToonMaterial
                      color="#FFD700"
                      emissive="#FFD700"
                      emissiveIntensity={1}
                      gradientMap={null}
                    />
                  </mesh>
                )
              })}
            </group>
          )
        })}

        {/* Top crystal - cartoon star */}
        <mesh castShadow position={[0, 2.6, 0]}>
          <octahedronGeometry args={[0.4, 0]} />
          <meshToonMaterial 
            color={color}
            emissive={color}
            emissiveIntensity={0.9}
            gradientMap={null}
          />
        </mesh>

        {/* Glow */}
        <mesh ref={glowRef} position={[0, 1.2, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 2.4, 24]} />
          <meshToonMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.4}
            transparent
            opacity={0.3}
            gradientMap={null}
          />
        </mesh>
      </group>
    )
  }

  // About Landmark - Organic Cartoon Design
  if (type === 'about') {
    return (
      <group ref={groupRef} position={position}>
        {/* Base */}
        <mesh receiveShadow castShadow position={[0, 0.1, 0]}>
          <cylinderGeometry args={[1.4, 1.4, 0.2, 24]} />
          <meshToonMaterial 
            color={secondaryColor}
            gradientMap={null}
          />
        </mesh>

        {/* Flowing spheres - smooth cartoon style */}
        {[
          { pos: [0, 0.5, 0], scale: 0.6, color: color },
          { pos: [0, 1, 0], scale: 0.55, color: secondaryColor },
          { pos: [0, 1.4, 0], scale: 0.48, color: color },
          { pos: [0, 1.75, 0], scale: 0.4, color: secondaryColor },
          { pos: [0, 2.05, 0], scale: 0.3, color: color },
        ].map((sphere, i) => (
          <mesh 
            key={i} 
            castShadow 
            position={sphere.pos as [number, number, number]}
          >
            <sphereGeometry args={[sphere.scale, 32, 32]} />
            <meshToonMaterial 
              color={sphere.color}
              emissive={sphere.color}
              emissiveIntensity={0.2}
              gradientMap={null}
            />
          </mesh>
        ))}

        {/* Orbiting rings - cartoon style */}
        {[0.7, 1.2, 1.7].map((y, i) => (
          <mesh 
            key={i} 
            position={[0, y, 0]} 
            rotation={[Math.PI / 4, 0, i * Math.PI / 3]}
          >
            <torusGeometry args={[0.7 - i * 0.12, 0.06, 16, 32]} />
            <meshToonMaterial 
              color={color}
              emissive={color}
              emissiveIntensity={0.5}
              transparent
              opacity={0.8}
              gradientMap={null}
            />
          </mesh>
        ))}

        {/* Floating heart particles */}
        {Array.from({ length: 4 }).map((_, i) => {
          const angle = (i / 4) * Math.PI * 2
          const radius = 0.9
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle + floatRef.current) * radius,
                1.2,
                Math.sin(angle + floatRef.current) * radius
              ]}
              castShadow
            >
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshToonMaterial
                color="#FFB6D9"
                emissive="#FFB6D9"
                emissiveIntensity={0.8}
                gradientMap={null}
              />
            </mesh>
          )
        })}

        {/* Top decoration */}
        <mesh castShadow position={[0, 2.25, 0]}>
          <sphereGeometry args={[0.2, 24, 24]} />
          <meshToonMaterial 
            color={secondaryColor}
            emissive={secondaryColor}
            emissiveIntensity={0.8}
            gradientMap={null}
          />
        </mesh>

        {/* Glow */}
        <mesh ref={glowRef} position={[0, 1.1, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshToonMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.4}
            transparent
            opacity={0.3}
            gradientMap={null}
          />
        </mesh>
      </group>
    )
  }

  // Contact Landmark - Tech Cartoon Style
  if (type === 'contact') {
    return (
      <group ref={groupRef} position={position}>
        {/* Base */}
        <mesh receiveShadow castShadow position={[0, 0.1, 0]}>
          <cylinderGeometry args={[1.4, 1.4, 0.2, 24]} />
          <meshToonMaterial 
            color={secondaryColor}
            gradientMap={null}
          />
        </mesh>

        {/* Central holographic pillar - cartoon style */}
        <mesh castShadow position={[0, 1.1, 0]}>
          <capsuleGeometry args={[0.35, 1.8, 16, 32]} />
          <meshToonMaterial 
            color={color}
            emissive={color}
            emissiveIntensity={0.6}
            transparent
            opacity={0.8}
            gradientMap={null}
          />
        </mesh>

        {/* Floating data panels - rounded */}
        {[0, 1, 2, 3].map((i) => {
          const angle = (i / 4) * Math.PI * 2
          const radius = 0.8
          const x = Math.cos(angle) * radius
          const z = Math.sin(angle) * radius
          return (
            <group key={i} position={[x, 1.2, z]} rotation={[0, -angle, 0]}>
              <mesh castShadow>
                <capsuleGeometry args={[0.25, 0.4, 12, 24]} />
                <meshToonMaterial 
                  color={secondaryColor}
                  emissive="#00E5FF"
                  emissiveIntensity={0.7}
                  transparent
                  opacity={0.9}
                  gradientMap={null}
                />
              </mesh>
              {/* Panel details */}
              <mesh position={[0, 0, 0.05]}>
                <circleGeometry args={[0.15, 24]} />
                <meshToonMaterial
                  color="#00E5FF"
                  emissive="#00E5FF"
                  emissiveIntensity={1}
                  gradientMap={null}
                />
              </mesh>
            </group>
          )
        })}

        {/* Holographic rings */}
        {[0.6, 1.2, 1.8].map((y, i) => (
          <mesh 
            key={i} 
            position={[0, y, 0]}
          >
            <torusGeometry args={[0.9 - i * 0.15, 0.04, 16, 32]} />
            <meshToonMaterial 
              color="#00E5FF"
              emissive="#00E5FF"
              emissiveIntensity={1}
              transparent
              opacity={0.7}
              gradientMap={null}
            />
          </mesh>
        ))}

        {/* Top antenna */}
        <mesh castShadow position={[0, 2.2, 0]}>
          <coneGeometry args={[0.18, 0.5, 24]} />
          <meshToonMaterial 
            color={color}
            emissive={color}
            emissiveIntensity={0.7}
            gradientMap={null}
          />
        </mesh>

        {/* Signal sphere */}
        <mesh position={[0, 2.5, 0]} castShadow>
          <sphereGeometry args={[0.15, 24, 24]} />
          <meshToonMaterial 
            color="#FFFFFF"
            emissive="#00E5FF"
            emissiveIntensity={1.2}
            gradientMap={null}
          />
        </mesh>

        {/* Signal waves */}
        {[0.3, 0.5, 0.7].map((size, i) => (
          <mesh
            key={i}
            position={[0, 2.5, 0]}
          >
            <sphereGeometry args={[0.15 + size, 24, 24]} />
            <meshToonMaterial
              color="#00E5FF"
              emissive="#00E5FF"
              emissiveIntensity={0.5}
              transparent
              opacity={0.2 - i * 0.05}
              gradientMap={null}
            />
          </mesh>
        ))}

        {/* Glow */}
        <mesh ref={glowRef} position={[0, 1.1, 0]}>
          <capsuleGeometry args={[1, 2, 16, 32]} />
          <meshToonMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.4}
            transparent
            opacity={0.3}
            gradientMap={null}
          />
        </mesh>
      </group>
    )
  }

  return null
}

interface LandmarksProps {
  onSelectSection?: (section: string) => void
}

export default function Landmarks({ onSelectSection }: LandmarksProps) {
  const landmarks = [
    {
      name: 'projects',
      position: new Vector3(-10, 0, -10),
      color: '#FF6B6B',
      secondaryColor: '#FF8787',
      type: 'projects' as const,
    },
    {
      name: 'experience',
      position: new Vector3(10, 0, -10),
      color: '#4ECDC4',
      secondaryColor: '#45B7AF',
      type: 'experience' as const,
    },
    {
      name: 'about',
      position: new Vector3(-10, 0, 10),
      color: '#95E1D3',
      secondaryColor: '#7DD3C0',
      type: 'about' as const,
    },
    {
      name: 'contact',
      position: new Vector3(10, 0, 10),
      color: '#F38181',
      secondaryColor: '#F5A3A3',
      type: 'contact' as const,
    },
  ]

  return (
    <>
      {landmarks.map((landmark) => (
        <Landmark
          key={landmark.name}
          position={landmark.position}
          color={landmark.color}
          secondaryColor={landmark.secondaryColor}
          label={landmark.name}
          type={landmark.type}
        />
      ))}
    </>
  )
}
