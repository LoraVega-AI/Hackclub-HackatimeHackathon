'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Sample images - replace with your actual images
const carouselImages = [
  { id: 1, url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop', title: 'Project 1' },
  { id: 2, url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop', title: 'Project 2' },
  { id: 3, url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=400&fit=crop', title: 'Project 3' },
  { id: 4, url: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=400&fit=crop', title: 'Project 4' },
];

function ThickWireframeSphere({ radius = 1 }: { radius?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const sphereGeometry = new THREE.SphereGeometry(radius, 12, 8);
  const edgesGeometry = new THREE.EdgesGeometry(sphereGeometry);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial 
          color="#60a5fa" 
          linewidth={4}
          linecap="round"
          linejoin="round"
        />
      </lineSegments>
    </group>
  );
}

function ImagePlane({ image, position, rotation, isActive }: { 
  image: typeof carouselImages[0]; 
  position: [number, number, number]; 
  rotation: [number, number, number];
  isActive: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [error, setError] = useState(false);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      image.url,
      (loadedTexture) => {
        loadedTexture.minFilter = THREE.LinearFilter;
        setTexture(loadedTexture);
      },
      undefined,
      () => {
        setError(true);
      }
    );
  }, [image.url]);

  // Shader for rounded corners
  const roundedRectShader = {
    uniforms: {
      uTexture: { value: texture || new THREE.Texture() },
      uColor: { value: new THREE.Color(error || !texture ? '#1e40af' : '#ffffff') },
      uOpacity: { value: isActive ? 1 : 0.3 },
      uRadius: { value: 0.15 }, // Corner radius
      uHasTexture: { value: texture ? 1.0 : 0.0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D uTexture;
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uRadius;
      uniform float uHasTexture;
      varying vec2 vUv;
      
      float roundedBoxSDF(vec2 centerPosition, vec2 size, float radius) {
        return length(max(abs(centerPosition) - size + radius, 0.0)) - radius;
      }
      
      void main() {
        vec2 center = vUv - 0.5;
        vec2 size = vec2(0.5, 0.5);
        float distance = roundedBoxSDF(center, size, uRadius);
        float smoothedAlpha = 1.0 - smoothstep(-0.01, 0.01, distance);
        
        vec4 texColor = texture2D(uTexture, vUv);
        vec3 finalColor = mix(uColor, texColor.rgb, uHasTexture);
        float finalAlpha = mix(uOpacity, texColor.a * uOpacity, uHasTexture) * smoothedAlpha;
        
        gl_FragColor = vec4(finalColor, finalAlpha);
      }
    `,
  };

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTexture.value = texture || new THREE.Texture();
      materialRef.current.uniforms.uOpacity.value = isActive ? 1 : 0.3;
      materialRef.current.uniforms.uColor.value = new THREE.Color(error || !texture ? '#1e40af' : '#ffffff');
      materialRef.current.uniforms.uHasTexture.value = texture ? 1.0 : 0.0;
    }
  }, [texture, isActive, error]);

  return (
    <group position={position} rotation={rotation}>
      <mesh ref={meshRef}>
        <planeGeometry args={[0.75, 0.75]} />
        <shaderMaterial
          ref={materialRef}
          {...roundedRectShader}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function RotatingGlobe({ images }: { images: typeof carouselImages }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Change active image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Calculate positions for images on the globe (equator)
  const getImagePosition = (index: number, total: number) => {
    const phi = (index / total) * Math.PI * 2;
    const theta = Math.PI / 2; // Equator
    const radius = 1.5; // Adjusted for larger globe
    return [
      radius * Math.sin(theta) * Math.cos(phi),
      radius * Math.cos(theta),
      radius * Math.sin(theta) * Math.sin(phi),
    ] as [number, number, number];
  };

  // Calculate rotation for images to face outward
  const getImageRotation = (index: number, total: number) => {
    const phi = (index / total) * Math.PI * 2;
    return [0, phi + Math.PI / 2, 0] as [number, number, number];
  };

  return (
    <group>
      {/* Thick Wireframe Globe */}
      <ThickWireframeSphere radius={1.3} />

      {/* Images positioned on globe surface */}
      {images.map((image, index) => {
        const position = getImagePosition(index, images.length);
        const rotation = getImageRotation(index, images.length);
        const isActive = index === currentImageIndex;
        
        return (
          <ImagePlane
            key={image.id}
            image={image}
            position={position}
            rotation={rotation}
            isActive={isActive}
          />
        );
      })}
    </group>
  );
}

export default function GlobeCarousel() {
  return (
    <div className="w-[500px] h-[650px] -mt-8 relative" style={{ clipPath: 'none', overflow: 'visible' }}>
      <div className="absolute inset-0 w-screen h-screen -left-1/2 -top-1/2 pointer-events-none" style={{ clipPath: 'none' }}></div>
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 50 }}
        style={{ background: 'transparent', overflow: 'visible', clipPath: 'none', width: '100%', height: '100%' }}
        gl={{ antialias: true, alpha: true, linewidth: 3, preserveDrawingBuffer: true }}
        className="relative z-0"
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[5, 5, 5]} intensity={0.5} />
        <RotatingGlobe images={carouselImages} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI - Math.PI / 3}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}

