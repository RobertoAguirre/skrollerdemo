import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Points, PointMaterial } from '@react-three/drei'

interface ParticleFieldProps {
  count?: number
  speed?: number
  color?: string
}

export default function ParticleField({ count = 1000, speed = 0.5, color = "#FF00FF" }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 20
      positions[i3 + 1] = (Math.random() - 0.5) * 20
      positions[i3 + 2] = (Math.random() - 0.5) * 20
      
      velocities[i3] = (Math.random() - 0.5) * speed
      velocities[i3 + 1] = (Math.random() - 0.5) * speed
      velocities[i3 + 2] = (Math.random() - 0.5) * speed
    }
    
    return { positions, velocities }
  }, [count, speed])

  useFrame(() => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
      const velocities = particles.velocities
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        positions[i3] += velocities[i3] * 0.01
        positions[i3 + 1] += velocities[i3 + 1] * 0.01
        positions[i3 + 2] += velocities[i3 + 2] * 0.01
        
        // Wrap around
        if (Math.abs(positions[i3]) > 10) velocities[i3] *= -1
        if (Math.abs(positions[i3 + 1]) > 10) velocities[i3 + 1] *= -1
        if (Math.abs(positions[i3 + 2]) > 10) velocities[i3 + 2] *= -1
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <Points ref={pointsRef} positions={particles.positions} stride={3}>
      <PointMaterial
        transparent
        color={color}
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}
