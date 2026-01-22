import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface SportBallProps {
  mouse: { x: number; y: number }
  scrollY: number
  color?: { primary: string; secondary: string; emissive: string }
}

export default function SportBall({ mouse, scrollY, color }: SportBallProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const velocityRef = useRef(new THREE.Vector3(0, 0, 0))
  const targetPositionRef = useRef(new THREE.Vector3(0, 0, -5))
  
  // Default green color for hero section
  const defaultColor = {
    primary: '#22C55E',
    secondary: '#16A34A',
    emissive: '#10B981'
  }
  
  const ballColor = color || defaultColor

  // Soccer ball geometry (always soccer ball, but color changes)
  const geometry = useMemo(() => new THREE.SphereGeometry(2.5, 32, 32), [])

  const material = useMemo(() => {
    const baseColor = new THREE.Color(ballColor.primary)
    const emissiveColor = new THREE.Color(ballColor.emissive)
    
    return new THREE.MeshStandardMaterial({
      color: baseColor,
      emissive: emissiveColor,
      emissiveIntensity: 0.3,
      metalness: 0.7,
      roughness: 0.4,
      transparent: true,
      opacity: 0.95
    })
  }, [ballColor])

  // Update target position based on mouse (with smooth following)
  useEffect(() => {
    targetPositionRef.current.x = mouse.x * 3
    targetPositionRef.current.y = mouse.y * 3
    targetPositionRef.current.z = -5 + scrollY * 0.01
  }, [mouse.x, mouse.y, scrollY])

  useFrame((_state, delta) => {
    if (groupRef.current && meshRef.current) {
      // Smooth physics-based movement (like a ball being pushed)
      const currentPos = groupRef.current.position
      const target = targetPositionRef.current
      
      // Calculate distance to target
      const distance = currentPos.distanceTo(target)
      
      // Apply force towards target (stronger when further away)
      const force = distance * 0.15
      const direction = new THREE.Vector3()
        .subVectors(target, currentPos)
        .normalize()
        .multiplyScalar(force)
      
      // Update velocity with damping
      velocityRef.current.multiplyScalar(0.85) // Damping
      velocityRef.current.add(direction)
      
      // Apply velocity to position
      currentPos.add(velocityRef.current.clone().multiplyScalar(delta * 10))
      
      // Add rotation based on movement (ball rolling effect)
      const rotationSpeed = velocityRef.current.length() * 0.5
      meshRef.current.rotation.x += rotationSpeed * delta
      meshRef.current.rotation.y += rotationSpeed * delta * 0.7
      meshRef.current.rotation.z += rotationSpeed * delta * 0.3
      
      // Add some natural rotation even when still
      meshRef.current.rotation.x += delta * 0.1
      meshRef.current.rotation.y += delta * 0.15
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, -5]}>
      <mesh ref={meshRef} geometry={geometry} material={material}>
        {/* Soccer ball pattern lines */}
        <lineSegments>
          <edgesGeometry args={[geometry]} />
          <lineBasicMaterial 
            color={ballColor.secondary} 
            opacity={0.5} 
            transparent 
            linewidth={2} 
          />
        </lineSegments>
      </mesh>
    </group>
  )
}
