'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Suspense, useState } from 'react'
import Map from './Map'
import CatCharacter from './CatCharacter'
import Landmarks from './Landmarks'
import UIOverlay from './UIOverlay'
import { LandmarkParticles, AmbientParticles, Starfield } from './ParticleEffects'
import { ProximityRing, FloatingArrow } from './ProximityIndicators'
import Sky from './Sky'
import DecorativeElements from './DecorativeElements'
import ClickablePlatform from './ClickablePlatform'
import { Vector3 } from 'three'

export default function Scene3D() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [catPosition, setCatPosition] = useState(new Vector3(0, 0.5, 0))
  const [showProjects, setShowProjects] = useState(false)
  
  const landmarks = [
    { name: 'projects', position: new Vector3(-10, 0, -10), color: '#FF6B6B', label: 'Projects' },
    { name: 'experience', position: new Vector3(10, 0, -10), color: '#4ECDC4', label: 'Experience' },
    { name: 'about', position: new Vector3(-10, 0, 10), color: '#95E1D3', label: 'About Me' },
    { name: 'contact', position: new Vector3(10, 0, 10), color: '#F38181', label: 'Contact' },
  ]

  return (
    <>
      <Canvas
        shadows
        gl={{ 
          antialias: true, 
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
        className="w-full h-full"
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Cartoon-style Lighting Setup - Bright and Even */}
          <ambientLight intensity={0.8} />
          
          {/* Main directional light (sun) - softer for cartoon look */}
          <directionalLight
            position={[20, 30, 15]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-left={-60}
            shadow-camera-right={60}
            shadow-camera-top={60}
            shadow-camera-bottom={-60}
            shadow-camera-near={0.1}
            shadow-camera-far={200}
            shadow-bias={-0.0001}
          />
          
          {/* Fill lights for cartoon aesthetic - brighter and more colorful */}
          <pointLight position={[-20, 12, -20]} intensity={0.6} color="#FFE4E1" />
          <pointLight position={[20, 12, 20]} intensity={0.6} color="#E0F4FF" />
          <pointLight position={[-20, 12, 20]} intensity={0.5} color="#FFF5E1" />
          <pointLight position={[20, 12, -20]} intensity={0.5} color="#E1F5FF" />
          
          {/* Hemisphere light for cartoon sky/ground - brighter */}
          <hemisphereLight
            color="#B8E6FF"
            groundColor="#A0E8D8"
            intensity={0.6}
          />
          
          {/* Rim lighting effect */}
          <directionalLight
            position={[-15, 5, -15]}
            intensity={0.4}
            color="#FFE4E1"
          />
          <directionalLight
            position={[15, 5, 15]}
            intensity={0.4}
            color="#E0F4FF"
          />

          {/* Camera */}
          <PerspectiveCamera
            makeDefault
            position={[0, 15, 20]}
            fov={55}
          />

          {/* Controls - isometric view */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={12}
            maxDistance={80}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.2}
            target={[0, 0, 0]}
            panSpeed={0.5}
          />

          {/* Sky */}
          <Sky />
          
          {/* Fog for atmospheric depth */}
          <fog attach="fog" args={['#B8E6FF', 80, 250]} />

          {/* Map */}
          <Map />

          {/* Clickable Platform at origin */}
          <ClickablePlatform onClick={() => setShowProjects(true)} />

          {/* Cat Character */}
          <CatCharacter 
            onReachLandmark={setSelectedSection}
            onPositionChange={setCatPosition}
          />

          {/* Portfolio Landmarks */}
          <Landmarks onSelectSection={setSelectedSection} />

          {/* Particle Effects */}
          <LandmarkParticles position={[-10, 0, -10]} color="#FF6B6B" />
          <LandmarkParticles position={[10, 0, -10]} color="#4ECDC4" />
          <LandmarkParticles position={[-10, 0, 10]} color="#95E1D3" />
          <LandmarkParticles position={[10, 0, 10]} color="#F38181" />
          
          {/* Ambient Effects */}
          <AmbientParticles />
          <Starfield count={80} />
          
          {/* Decorative animated elements */}
          <DecorativeElements />

          {/* Proximity Indicators */}
          {landmarks.map((landmark) => (
            <ProximityRing
              key={`ring-${landmark.name}`}
              catPosition={catPosition}
              landmarkPosition={landmark.position}
              color={landmark.color}
              maxDistance={5}
            />
          ))}

          {/* Floating Arrows */}
          {landmarks.map((landmark) => (
            <FloatingArrow
              key={`arrow-${landmark.name}`}
              position={landmark.position}
              color={landmark.color}
            />
          ))}
        </Suspense>
      </Canvas>
      <UIOverlay
        selectedSection={selectedSection}
        onClose={() => setSelectedSection(null)}
        showProjects={showProjects}
        onCloseProjects={() => setShowProjects(false)}
      />
    </>
  )
}

