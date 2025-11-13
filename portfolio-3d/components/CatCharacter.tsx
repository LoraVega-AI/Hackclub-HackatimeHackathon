'use client'

import { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Mesh, Vector3, Group } from 'three'
import * as THREE from 'three'

interface CatCharacterProps {
  onReachLandmark?: (section: string) => void
  onPositionChange?: (position: Vector3) => void
}

export default function CatCharacter({ onReachLandmark, onPositionChange }: CatCharacterProps) {
  const catRef = useRef<Group>(null)
  const tailRef = useRef<Group>(null)
  const leftEyeRef = useRef<Mesh>(null)
  const rightEyeRef = useRef<Mesh>(null)
  const [position, setPosition] = useState(new Vector3(0, 0.5, 0))
  const [velocity, setVelocity] = useState(new Vector3(0, 0, 0))
  const [keys, setKeys] = useState<{ [key: string]: boolean }>({})
  const [blinkTimer, setBlinkTimer] = useState(0)
  const [isBlinking, setIsBlinking] = useState(false)
  const { camera } = useThree()

  const speed = 0.04
  const friction = 0.88

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys((prev) => ({ ...prev, [e.key.toLowerCase()]: true }))
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys((prev) => ({ ...prev, [e.key.toLowerCase()]: false }))
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useFrame((state) => {
    if (!catRef.current) return

    const newVelocity = new Vector3()

    // Movement controls (WASD or Arrow keys)
    if (keys['w'] || keys['arrowup']) newVelocity.z -= speed
    if (keys['s'] || keys['arrowdown']) newVelocity.z += speed
    if (keys['a'] || keys['arrowleft']) newVelocity.x -= speed
    if (keys['d'] || keys['arrowright']) newVelocity.x += speed

    // Apply friction
    const currentVel = velocity.clone().multiplyScalar(friction)
    const finalVelocity = currentVel.add(newVelocity)

    // Update position
    const newPosition = position.clone().add(finalVelocity)

    // Boundary constraints (keep cat within main interactive area)
    const boundary = 45
    newPosition.x = Math.max(-boundary, Math.min(boundary, newPosition.x))
    newPosition.z = Math.max(-boundary, Math.min(boundary, newPosition.z))

    setPosition(newPosition)
    setVelocity(finalVelocity)

    // Update cat mesh position
    catRef.current.position.copy(newPosition)
    
    // Notify parent of position change
    if (onPositionChange) {
      onPositionChange(newPosition)
    }

    // Rotate cat to face movement direction
    if (finalVelocity.length() > 0.01) {
      const angle = Math.atan2(finalVelocity.x, finalVelocity.z)
      catRef.current.rotation.y = angle
    }

    // Animate tail based on movement
    if (tailRef.current) {
      const movementSpeed = finalVelocity.length()
      const time = state.clock.elapsedTime
      const tailSwing = Math.sin(time * 8) * (0.3 + movementSpeed * 2)
      tailRef.current.rotation.z = tailSwing
      tailRef.current.rotation.x = Math.sin(time * 4) * 0.2
    }

    // Blinking animation
    const newBlinkTimer = blinkTimer + 0.016
    setBlinkTimer(newBlinkTimer)
    
    if (newBlinkTimer > 3 && !isBlinking) {
      setIsBlinking(true)
      setBlinkTimer(0)
    } else if (newBlinkTimer > 0.15 && isBlinking) {
      setIsBlinking(false)
      setBlinkTimer(0)
    }

    // Update eye scale for blink
    if (leftEyeRef.current && rightEyeRef.current) {
      const eyeScale = isBlinking ? 0.1 : 1
      leftEyeRef.current.scale.y = eyeScale
      rightEyeRef.current.scale.y = eyeScale
    }

    // Check for landmark proximity
    if (onReachLandmark) {
      const landmarks = [
        { name: 'projects', pos: new Vector3(-10, 0, -10) },
        { name: 'experience', pos: new Vector3(10, 0, -10) },
        { name: 'about', pos: new Vector3(-10, 0, 10) },
        { name: 'contact', pos: new Vector3(10, 0, 10) },
      ]

      landmarks.forEach((landmark) => {
        const distance = newPosition.distanceTo(landmark.pos)
        if (distance < 2) {
          onReachLandmark(landmark.name)
        }
      })
    }
  })

  return (
    <group ref={catRef} position={position}>
      {/* Cat body - cartoon style with gradient */}
      <mesh castShadow position={[0, 0.4, 0]}>
        <capsuleGeometry args={[0.3, 0.4, 12, 24]} />
        <meshToonMaterial 
          color="#FFB8D0" 
          gradientMap={null}
        />
      </mesh>

      {/* White chest patch */}
      <mesh castShadow position={[0, 0.3, 0.3]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshToonMaterial 
          color="#FFFFFF"
          gradientMap={null}
        />
      </mesh>

      {/* Cat head - larger for cartoon proportions */}
      <mesh castShadow position={[0, 0.7, 0.15]}>
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshToonMaterial 
          color="#FFB8D0"
          gradientMap={null}
        />
      </mesh>

      {/* Chubby cheeks */}
      <mesh castShadow position={[-0.25, 0.62, 0.25]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshToonMaterial 
          color="#FFD4E5"
          gradientMap={null}
        />
      </mesh>
      <mesh castShadow position={[0.25, 0.62, 0.25]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshToonMaterial 
          color="#FFD4E5"
          gradientMap={null}
        />
      </mesh>

      {/* Cat snout */}
      <mesh castShadow position={[0, 0.6, 0.42]}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshToonMaterial 
          color="#FFF0F5"
          gradientMap={null}
        />
      </mesh>

      {/* Cat ears - rounded triangles */}
      <mesh castShadow position={[-0.22, 0.95, 0.08]} rotation={[0, 0, -0.3]}>
        <coneGeometry args={[0.15, 0.28, 16]} />
        <meshToonMaterial 
          color="#FFB8D0"
          gradientMap={null}
        />
      </mesh>
      <mesh castShadow position={[0.22, 0.95, 0.08]} rotation={[0, 0, 0.3]}>
        <coneGeometry args={[0.15, 0.28, 16]} />
        <meshToonMaterial 
          color="#FFB8D0"
          gradientMap={null}
        />
      </mesh>

      {/* Inner ears - darker pink */}
      <mesh position={[-0.22, 0.9, 0.1]} rotation={[0, 0, -0.3]}>
        <coneGeometry args={[0.1, 0.18, 16]} />
        <meshToonMaterial 
          color="#FF9AC1"
          gradientMap={null}
        />
      </mesh>
      <mesh position={[0.22, 0.9, 0.1]} rotation={[0, 0, 0.3]}>
        <coneGeometry args={[0.1, 0.18, 16]} />
        <meshToonMaterial 
          color="#FF9AC1"
          gradientMap={null}
        />
      </mesh>

      {/* Cat eyes - large and expressive with gradient */}
      <group>
        {/* Eye whites */}
        <mesh ref={leftEyeRef} castShadow position={[-0.15, 0.72, 0.38]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshToonMaterial 
            color="#FFFFFF"
            gradientMap={null}
          />
        </mesh>
        <mesh ref={rightEyeRef} castShadow position={[0.15, 0.72, 0.38]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshToonMaterial 
            color="#FFFFFF"
            gradientMap={null}
          />
        </mesh>

        {/* Eye pupils - large and cute */}
        <mesh position={[-0.15, 0.72, 0.45]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshToonMaterial 
            color="#4A3C4C"
            emissive="#000000"
            emissiveIntensity={0.3}
            gradientMap={null}
          />
        </mesh>
        <mesh position={[0.15, 0.72, 0.45]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshToonMaterial 
            color="#4A3C4C"
            emissive="#000000"
            emissiveIntensity={0.3}
            gradientMap={null}
          />
        </mesh>

        {/* Eye shine highlights - larger */}
        <mesh position={[-0.13, 0.76, 0.46]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshToonMaterial 
            color="#FFFFFF"
            emissive="#FFFFFF"
            emissiveIntensity={1}
            gradientMap={null}
          />
        </mesh>
        <mesh position={[0.17, 0.76, 0.46]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshToonMaterial 
            color="#FFFFFF"
            emissive="#FFFFFF"
            emissiveIntensity={1}
            gradientMap={null}
          />
        </mesh>
      </group>

      {/* Cat nose - heart-shaped */}
      <mesh castShadow position={[0, 0.62, 0.5]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshToonMaterial 
          color="#FF6B9D"
          emissive="#FF6B9D"
          emissiveIntensity={0.3}
          gradientMap={null}
        />
      </mesh>

      {/* Smiling mouth */}
      <mesh position={[0, 0.58, 0.48]}>
        <torusGeometry args={[0.08, 0.01, 8, 16, Math.PI]} />
        <meshToonMaterial 
          color="#4A3C4C"
          gradientMap={null}
        />
      </mesh>

      {/* Whiskers - thicker for cartoon style */}
      {[-1, 1].map((side) => (
        <group key={side}>
          {[0, 0.06, -0.06].map((offset, i) => (
            <mesh
              key={i}
              position={[side * 0.2, 0.65 + offset, 0.42]}
              rotation={[0, 0, side * (0.2 + i * 0.1)]}
            >
              <cylinderGeometry args={[0.008, 0.008, 0.4, 8]} />
              <meshToonMaterial 
                color="#FFFFFF"
                gradientMap={null}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* Cat legs - chubby cartoon style */}
      {[
        [-0.18, 0.15, 0.1],
        [0.18, 0.15, 0.1],
        [-0.18, 0.15, -0.1],
        [0.18, 0.15, -0.1],
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh castShadow>
            <capsuleGeometry args={[0.08, 0.2, 8, 16]} />
            <meshToonMaterial 
              color="#FFB8D0"
              gradientMap={null}
            />
          </mesh>
        </group>
      ))}

      {/* Cat paws - with paw pads */}
      {[
        [-0.18, 0.04, 0.1],
        [0.18, 0.04, 0.1],
        [-0.18, 0.04, -0.1],
        [0.18, 0.04, -0.1],
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh castShadow>
            <sphereGeometry args={[0.11, 16, 16]} />
            <meshToonMaterial 
              color="#FFC4DC"
              gradientMap={null}
            />
          </mesh>
          {/* Paw pads */}
          <mesh position={[0, 0, 0.08]}>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshToonMaterial 
              color="#FF9AC1"
              gradientMap={null}
            />
          </mesh>
        </group>
      ))}

      {/* Cat tail - curved and animated */}
      <group ref={tailRef} position={[0, 0.45, -0.3]}>
        <mesh castShadow rotation={[Math.PI / 3, 0, 0]}>
          <capsuleGeometry args={[0.09, 0.5, 12, 24]} />
          <meshToonMaterial 
            color="#FFB8D0"
            gradientMap={null}
          />
        </mesh>
        <mesh castShadow position={[0, 0.4, 0]} rotation={[Math.PI / 6, 0, 0]}>
          <capsuleGeometry args={[0.08, 0.3, 12, 24]} />
          <meshToonMaterial 
            color="#FFB8D0"
            gradientMap={null}
          />
        </mesh>
        {/* Tail tip - white */}
        <mesh castShadow position={[0, 0.6, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshToonMaterial 
            color="#FFFFFF"
            gradientMap={null}
          />
        </mesh>
      </group>
    </group>
  )
}
