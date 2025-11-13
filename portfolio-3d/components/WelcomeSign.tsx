'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'
import * as THREE from 'three'

export default function WelcomeSign() {
  const signRef = useRef<Group>(null)
  const floatRef = useRef(0)

  useFrame(() => {
    if (signRef.current) {
      floatRef.current += 0.01
      // Gentle floating animation
      signRef.current.position.y = 3 + Math.sin(floatRef.current) * 0.2
    }
  })

  // Create simple text texture
  const textTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 2048
    canvas.height = 1024
    const context = canvas.getContext('2d')
    
    if (context) {
      // Simple light brown background
      context.fillStyle = '#D4A574'
      context.fillRect(0, 0, canvas.width, canvas.height)
      
      // Large, bold cartoonish text with black outline
      context.strokeStyle = '#000000'
      context.lineWidth = 20
      context.font = 'bold 160px "Comic Sans MS", "Marker Felt", fantasy'
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      
      // Draw text outline
      context.strokeText("Hey! The names Lora Vega.", canvas.width / 2, canvas.height / 2 - 140)
      context.strokeText("A tech enthusiast, aspiring", canvas.width / 2, canvas.height / 2 - 30)
      context.strokeText("to be an AI & ML enginer", canvas.width / 2, canvas.height / 2 + 80)
      
      // Main text - bright white
      context.fillStyle = '#FFFFFF'
      context.font = 'bold 160px "Comic Sans MS", "Marker Felt", fantasy'
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.fillText("Hey! The names Lora Vega.", canvas.width / 2, canvas.height / 2 - 140)
      context.fillText("A tech enthusiast, aspiring", canvas.width / 2, canvas.height / 2 - 30)
      context.fillText("to be an AI & ML enginer", canvas.width / 2, canvas.height / 2 + 80)
    }
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [])

  return (
    <group ref={signRef} position={[0, 3, -8]}>
      {/* Simple wooden post */}
      <mesh position={[0, -1.5, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 3, 16]} />
        <meshToonMaterial
          color="#8B6F47"
          gradientMap={null}
        />
      </mesh>

      {/* Simple light brown board - bigger for larger text */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[5, 2.8, 0.15]} />
        <meshToonMaterial
          color="#D4A574"
          gradientMap={null}
        />
      </mesh>

      {/* Text on board */}
      <mesh position={[0, 0.5, 0.08]}>
        <planeGeometry args={[4.9, 2.7]} />
        <meshStandardMaterial
          map={textTexture}
          transparent
        />
      </mesh>
    </group>
  )
}
