'use client'

import { useMemo } from 'react'

// Main interactive area radius - all decorative elements stay within this
const MAIN_AREA_RADIUS = 45

export default function Map() {
  // Pre-calculate all positions once using useMemo to prevent re-calculation
  // All elements constrained to MAIN_AREA_RADIUS
  const trees = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => {
      const angle = (i / 30) * Math.PI * 2 + (i * 0.5)
      const radius = 8 + (i % 8) * 4
      const x = Math.cos(angle) * radius + ((i * 0.3) % 1 - 0.5) * 3
      const z = Math.sin(angle) * radius + ((i * 0.7) % 1 - 0.5) * 3
      const height = 1.5 + ((i * 0.5) % 1) * 1
      const foliageColor = i % 3 === 0 ? '#5CDB95' : i % 3 === 1 ? '#05C46B' : '#0EAD69'
      return { x, z, height, foliageColor, key: `tree-${i}` }
    })
  }, [])

  const rocks = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => {
      const angle = (i / 25) * Math.PI * 2 + (i * 0.7)
      const radius = 12 + (i % 6) * 3
      const x = Math.cos(angle) * radius + ((i * 0.4) % 1 - 0.5) * 4
      const z = Math.sin(angle) * radius + ((i * 0.6) % 1 - 0.5) * 4
      const scale = 0.4 + ((i * 0.3) % 1) * 0.5
      const rockType = i % 3
      return { x, z, scale, rockType, key: `rock-${i}` }
    })
  }, [])

  const bushes = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => {
      const angle = (i / 40) * Math.PI * 2 + (i * 0.3)
      const radius = 6 + (i % 10) * 3
      const x = Math.cos(angle) * radius + ((i * 0.2) % 1 - 0.5) * 5
      const z = Math.sin(angle) * radius + ((i * 0.4) % 1 - 0.5) * 5
      const scale = 0.25 + ((i * 0.3) % 1) * 0.35
      const color = i % 2 === 0 ? '#98FB98' : '#90EE90'
      return { x, z, scale, color, key: `bush-${i}` }
    })
  }, [])

  const flowers = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => {
      const angle = (i / 20) * Math.PI * 2 + (i * 0.8)
      const radius = 5 + (i % 5) * 4
      const x = Math.cos(angle) * radius + ((i * 0.5) % 1 - 0.5) * 2
      const z = Math.sin(angle) * radius + ((i * 0.3) % 1 - 0.5) * 2
      const colors = ['#FF6B9D', '#FFB6D9', '#FFE66D', '#FF6B6B', '#A8E6CF']
      const color = colors[i % colors.length]
      return { x, z, color, key: `flower-${i}` }
    })
  }, [])

  return (
    <>
      {/* Infinite ground plane - vibrant cartoon style */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[500, 500, 10, 10]} />
        <meshToonMaterial
          color="#7FD8BE"
          gradientMap={null}
        />
      </mesh>

      {/* Decorative terrain - Cartoon-style Trees */}
      {trees.map((tree) => (
        <group key={tree.key} position={[tree.x, 0, tree.z]}>
          {/* Tree trunk - rounded */}
          <mesh castShadow receiveShadow position={[0, tree.height / 2, 0]}>
            <capsuleGeometry args={[0.12, tree.height * 0.8, 12, 24]} />
            <meshToonMaterial
              color="#8B6F47"
              gradientMap={null}
            />
          </mesh>
          
          {/* Tree foliage - multiple rounded layers */}
          <mesh castShadow position={[0, tree.height + 0.4, 0]}>
            <sphereGeometry args={[0.9, 16, 16]} />
            <meshToonMaterial
              color={tree.foliageColor}
              gradientMap={null}
            />
          </mesh>
          <mesh castShadow position={[0, tree.height + 0.8, 0]}>
            <sphereGeometry args={[0.7, 16, 16]} />
            <meshToonMaterial
              color={tree.foliageColor}
              emissive={tree.foliageColor}
              emissiveIntensity={0.1}
              gradientMap={null}
            />
          </mesh>
          <mesh castShadow position={[0, tree.height + 1.1, 0]}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshToonMaterial
              color="#7FE8C4"
              gradientMap={null}
            />
          </mesh>
        </group>
      ))}

      {/* Decorative rocks - smooth rounded cartoon style */}
      {rocks.map((rock) => {
        const rockColors = ['#B8B8B8', '#A8A8A8', '#C8C8C8']
        return (
          <group key={rock.key} position={[rock.x, 0, rock.z]}>
            {rock.rockType === 0 ? (
              // Round rock
              <mesh castShadow receiveShadow position={[0, rock.scale * 0.5, 0]}>
                <sphereGeometry args={[rock.scale, 16, 12]} />
                <meshToonMaterial
                  color={rockColors[0]}
                  gradientMap={null}
                />
              </mesh>
            ) : rock.rockType === 1 ? (
              // Flat rock
              <mesh castShadow receiveShadow position={[0, rock.scale * 0.3, 0]}>
                <capsuleGeometry args={[rock.scale * 0.8, rock.scale * 0.2, 12, 16]} />
                <meshToonMaterial
                  color={rockColors[1]}
                  gradientMap={null}
                />
              </mesh>
            ) : (
              // Tall rock
              <mesh castShadow receiveShadow position={[0, rock.scale * 0.6, 0]}>
                <capsuleGeometry args={[rock.scale * 0.6, rock.scale, 12, 16]} />
                <meshToonMaterial
                  color={rockColors[2]}
                  gradientMap={null}
                />
              </mesh>
            )}
            {/* Top highlight */}
            <mesh position={[0, rock.scale, 0]}>
              <sphereGeometry args={[rock.scale * 0.3, 12, 12]} />
              <meshToonMaterial
                color="#E8E8E8"
                emissive="#FFFFFF"
                emissiveIntensity={0.2}
                transparent
                opacity={0.6}
                gradientMap={null}
              />
            </mesh>
          </group>
        )
      })}

      {/* Elevated platforms - cartoon style with rounded edges */}
      {[
        { x: -18, z: -18, radius: 3.2, height: 0.4, color: '#A8E6CF', topColor: '#C4FAE0' },
        { x: 18, z: -18, radius: 3.2, height: 0.4, color: '#A8E6CF', topColor: '#C4FAE0' },
        { x: -18, z: 18, radius: 3.2, height: 0.4, color: '#A8E6CF', topColor: '#C4FAE0' },
        { x: 18, z: 18, radius: 3.2, height: 0.4, color: '#A8E6CF', topColor: '#C4FAE0' },
        { x: -12, z: -12, radius: 2.7, height: 0.35, color: '#90D5BB', topColor: '#B0F0D0' },
        { x: 12, z: -12, radius: 2.7, height: 0.35, color: '#90D5BB', topColor: '#B0F0D0' },
        { x: -12, z: 12, radius: 2.7, height: 0.35, color: '#90D5BB', topColor: '#B0F0D0' },
        { x: 12, z: 12, radius: 2.7, height: 0.35, color: '#90D5BB', topColor: '#B0F0D0' },
        { x: 0, z: -22, radius: 2.7, height: 0.3, color: '#7FD8BE', topColor: '#A0F0D0' },
        { x: 0, z: 22, radius: 2.7, height: 0.3, color: '#7FD8BE', topColor: '#A0F0D0' },
        { x: -22, z: 0, radius: 2.7, height: 0.3, color: '#7FD8BE', topColor: '#A0F0D0' },
        { x: 22, z: 0, radius: 2.7, height: 0.3, color: '#7FD8BE', topColor: '#A0F0D0' },
        { x: -25, z: -25, radius: 2.2, height: 0.25, color: '#B8F0E8', topColor: '#D0FFF5' },
        { x: 25, z: -25, radius: 2.2, height: 0.25, color: '#B8F0E8', topColor: '#D0FFF5' },
        { x: -25, z: 25, radius: 2.2, height: 0.25, color: '#B8F0E8', topColor: '#D0FFF5' },
        { x: 25, z: 25, radius: 2.2, height: 0.25, color: '#B8F0E8', topColor: '#D0FFF5' },
        { x: -8, z: -8, radius: 2.2, height: 0.25, color: '#B8F0E8', topColor: '#D0FFF5' },
        { x: 8, z: -8, radius: 2.2, height: 0.25, color: '#B8F0E8', topColor: '#D0FFF5' },
        { x: -8, z: 8, radius: 2.2, height: 0.25, color: '#B8F0E8', topColor: '#D0FFF5' },
        { x: 8, z: 8, radius: 2.2, height: 0.25, color: '#B8F0E8', topColor: '#D0FFF5' },
      ].map((platform, i) => (
        <group key={`platform-${i}`}>
          {/* Platform base */}
          <mesh
            position={[platform.x, platform.height / 2, platform.z]}
            receiveShadow
            castShadow
          >
            <cylinderGeometry args={[platform.radius, platform.radius, platform.height, 16]} />
            <meshToonMaterial
              color={platform.color}
              gradientMap={null}
            />
          </mesh>
          {/* Platform top ring */}
          <mesh
            position={[platform.x, platform.height, platform.z]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <torusGeometry args={[platform.radius * 0.9, 0.08, 12, 24]} />
            <meshToonMaterial
              color={platform.topColor}
              emissive={platform.topColor}
              emissiveIntensity={0.3}
              gradientMap={null}
            />
          </mesh>
          {/* Decorative center dot */}
          <mesh
            position={[platform.x, platform.height + 0.05, platform.z]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <circleGeometry args={[platform.radius * 0.3, 16]} />
            <meshToonMaterial
              color={platform.topColor}
              emissive={platform.topColor}
              emissiveIntensity={0.5}
              gradientMap={null}
            />
          </mesh>
        </group>
      ))}

      {/* Decorative bushes - fluffy cartoon style */}
      {bushes.map((bush) => (
        <group key={bush.key} position={[bush.x, bush.scale * 0.8, bush.z]}>
          {/* Main bush sphere */}
          <mesh castShadow>
            <sphereGeometry args={[bush.scale, 16, 16]} />
            <meshToonMaterial
              color={bush.color}
              gradientMap={null}
            />
          </mesh>
          {/* Top highlight */}
          <mesh position={[0, bush.scale * 0.3, 0]}>
            <sphereGeometry args={[bush.scale * 0.6, 12, 12]} />
            <meshToonMaterial
              color="#C8FFC8"
              transparent
              opacity={0.5}
              gradientMap={null}
            />
          </mesh>
        </group>
      ))}

      {/* Decorative flowers */}
      {flowers.map((flower) => (
        <group key={flower.key} position={[flower.x, 0.15, flower.z]}>
          {/* Flower stem */}
          <mesh castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.25, 8]} />
            <meshToonMaterial
              color="#5CDB95"
              gradientMap={null}
            />
          </mesh>
          {/* Flower petals */}
          {Array.from({ length: 5 }).map((_, i) => {
            const angle = (i / 5) * Math.PI * 2
            return (
              <mesh
                key={i}
                position={[Math.cos(angle) * 0.08, 0.18, Math.sin(angle) * 0.08]}
                castShadow
              >
                <sphereGeometry args={[0.06, 12, 12]} />
                <meshToonMaterial
                  color={flower.color}
                  emissive={flower.color}
                  emissiveIntensity={0.3}
                  gradientMap={null}
                />
              </mesh>
            )
          })}
          {/* Flower center */}
          <mesh position={[0, 0.18, 0]} castShadow>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshToonMaterial
              color="#FFE66D"
              emissive="#FFE66D"
              emissiveIntensity={0.5}
              gradientMap={null}
            />
          </mesh>
        </group>
      ))}

      {/* Path markers - smooth cartoon stones */}
      {[
        { from: [0, 0], to: [-10, -10] },
        { from: [0, 0], to: [10, -10] },
        { from: [0, 0], to: [-10, 10] },
        { from: [0, 0], to: [10, 10] },
      ].map((path, pathIdx) => {
        const stones = []
        for (let i = 1; i < 6; i++) {
          const t = i / 6
          const x = path.from[0] + (path.to[0] - path.from[0]) * t
          const z = path.from[1] + (path.to[1] - path.from[1]) * t
          stones.push(
            <mesh
              key={`path-${pathIdx}-${i}`}
              position={[x, 0.08, z]}
              castShadow
              receiveShadow
            >
              <capsuleGeometry args={[0.35, 0.05, 12, 16]} />
              <meshToonMaterial
                color="#E0E0E0"
                gradientMap={null}
              />
            </mesh>
          )
        }
        return stones
      })}
    </>
  )
}
