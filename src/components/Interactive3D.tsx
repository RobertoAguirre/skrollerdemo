import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface Interactive3DProps {
  position?: [number, number, number]
  color?: string
}

export default function Interactive3D({ position = [0, 0, 0], color = "#FF00FF" }: Interactive3DProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const geometry = useRef(new THREE.IcosahedronGeometry(1, 1))
  const material = useRef(new THREE.MeshStandardMaterial({
    color: color,
    emissive: color,
    emissiveIntensity: 0.5,
    metalness: 0.8,
    roughness: 0.2
  }))

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2
    }
  })

  return (
    <mesh ref={meshRef} geometry={geometry.current} material={material.current} position={position}>
    </mesh>
  )
}
