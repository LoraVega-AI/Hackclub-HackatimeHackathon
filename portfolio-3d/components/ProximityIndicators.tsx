'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Vector3 } from 'three'
import * as THREE from 'three'

interface ProximityRingProps {
  catPosition: Vector3
  landmarkPosition: Vector3
  color: string
  maxDistance?: number
}

export function ProximityRing({ 
  catPosition, 
  landmarkPosition, 
  color, 
  maxDistance = 5 
}: ProximityRingProps) {
  const ringRef = useRef<Mesh>(null)
  const pulseRef = useRef(0)

  useFrame((state) => {
    if (!ringRef.current) return

    const distance = catPosition.distanceTo(landmarkPosition)
    
    if (distance < maxDistance) {
      // Calculate proximity factor (1 = close, 0 = far)
      const proximity = 1 - (distance / maxDistance)
      
      // Make ring visible and scale based on proximity
      ringRef.current.visible = true
      ringRef.current.scale.setScalar(1 + proximity * 0.5)
      
      // Pulse effect
      pulseRef.current += 0.05
      const pulse = Math.sin(pulseRef.current) * 0.2 + 0.8
      
      // Update material opacity based on proximity
      if (ringRef.current.material instanceof THREE.MeshStandardMaterial) {
        ringRef.current.material.opacity = proximity * 0.6 * pulse
        ringRef.current.material.emissiveIntensity = proximity * 0.8
      }
      
      // Rotate the ring
      ringRef.current.rotation.y += 0.02
    } else {
      ringRef.current.visible = false
    }
  })

  return (
    <mesh
      ref={ringRef}
      position={[landmarkPosition.x, 0.05, landmarkPosition.z]}
      rotation={[-Math.PI / 2, 0, 0]}
      visible={false}
    >
      <ringGeometry args={[1.5, 2, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.6}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

interface BeaconProps {
  position: Vector3
  color: string
  active: boolean
}

export function Beacon({ position, color, active }: BeaconProps) {
  const beamRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (!beamRef.current) return
    
    if (active) {
      beamRef.current.visible = true
      
      // Animate beam height
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.5 + 0.5
      beamRef.current.scale.y = 0.5 + pulse * 0.5
      
      // Update opacity
      if (beamRef.current.material instanceof THREE.MeshStandardMaterial) {
        beamRef.current.material.opacity = 0.3 + pulse * 0.3
      }
    } else {
      beamRef.current.visible = false
    }
  })

  return (
    <mesh
      ref={beamRef}
      position={[position.x, 5, position.z]}
      visible={false}
    >
      <cylinderGeometry args={[0.5, 1, 10, 32, 1, true]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        transparent
        opacity={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

interface InteractionPromptProps {
  catPosition: Vector3
  landmarkPosition: Vector3
  label: string
}

export function InteractionPrompt({ 
  catPosition, 
  landmarkPosition, 
  label 
}: InteractionPromptProps) {
  const spriteRef = useRef<THREE.Sprite>(null)

  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 128
    const context = canvas.getContext('2d')
    
    if (context) {
      // Background
      context.fillStyle = 'rgba(0, 0, 0, 0.7)'
      context.roundRect(10, 10, 236, 108, 15)
      context.fill()
      
      // Border
      context.strokeStyle = 'rgba(255, 255, 255, 0.8)'
      context.lineWidth = 3
      context.roundRect(10, 10, 236, 108, 15)
      context.stroke()
      
      // Text
      context.fillStyle = 'white'
      context.font = 'bold 32px Arial'
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.fillText('Press E', 128, 45)
      
      context.font = '24px Arial'
      context.fillText(label, 128, 85)
    }
    
    const tex = new THREE.CanvasTexture(canvas)
    tex.needsUpdate = true
    return tex
  }, [label])

  useFrame(() => {
    if (!spriteRef.current) return

    const distance = catPosition.distanceTo(landmarkPosition)
    
    if (distance < 2) {
      spriteRef.current.visible = true
      spriteRef.current.position.set(
        landmarkPosition.x,
        landmarkPosition.y + 3,
        landmarkPosition.z
      )
      
      // Billboard effect (always face camera)
      spriteRef.current.material.opacity = 1 - (distance / 2) * 0.5
    } else {
      spriteRef.current.visible = false
    }
  })

  return (
    <sprite ref={spriteRef} scale={[2, 1, 1]} visible={false}>
      <spriteMaterial map={texture} transparent opacity={1} />
    </sprite>
  )
}

interface FloatingArrowProps {
  position: Vector3
  color: string
}

export function FloatingArrow({ position, color }: FloatingArrowProps) {
  const arrowRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (!arrowRef.current) return
    
    const time = state.clock.elapsedTime
    arrowRef.current.position.y = position.y + 4 + Math.sin(time * 2) * 0.3
    arrowRef.current.rotation.y = time * 0.5
  })

  return (
    <mesh ref={arrowRef} position={[position.x, position.y + 4, position.z]}>
      <coneGeometry args={[0.3, 0.6, 4]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
      />
    </mesh>
  )
}

