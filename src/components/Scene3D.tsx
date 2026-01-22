import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Points, PointMaterial } from '@react-three/drei'
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import ShaderPlane from './ShaderPlane'
import SportBall from './SportBall'

interface Scene3DProps {
  scrollY: number
}

export default function Scene3D({ scrollY }: Scene3DProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.Group>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Improved particles with more density
  const particles = useMemo(() => {
    const count = 5000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    
    const color1 = new THREE.Color("#FF00FF")
    const color2 = new THREE.Color("#00BFFF")
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 30
      positions[i3 + 1] = (Math.random() - 0.5) * 30
      positions[i3 + 2] = (Math.random() - 0.5) * 30
      
      const mixedColor = color1.clone().lerp(color2, Math.random())
      colors[i3] = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b
      
      sizes[i] = Math.random() * 0.1 + 0.05
    }
    
    return { positions, colors, sizes }
  }, [])

  // Improved geometric lines with more complex curves
  const lines = useMemo(() => {
    const lineCount = 50
    const linesData: Array<{ geometry: THREE.BufferGeometry; material: THREE.LineBasicMaterial }> = []
    
    for (let i = 0; i < lineCount; i++) {
      const points: number[] = []
      const segments = 30
      const radius = 5 + Math.random() * 5
      
      for (let j = 0; j <= segments; j++) {
        const t = j / segments
        const angle = t * Math.PI * 2
        const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 2
        const y = Math.sin(angle) * radius + (Math.random() - 0.5) * 2
        const z = (t - 0.5) * 15 + Math.sin(angle * 3) * 2
        points.push(x, y, z)
      }
      
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
      const material = new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? "#FF00FF" : "#00BFFF",
        opacity: 0.3,
        transparent: true,
        linewidth: 2
      })
      linesData.push({ geometry, material })
    }
    
    return linesData
  }, [])

  useFrame((_state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = scrollY * 0.0001 + mouse.y * 0.1
      pointsRef.current.rotation.y = scrollY * 0.0002 + mouse.x * 0.1
      pointsRef.current.rotation.z += delta * 0.1
    }
    
    if (linesRef.current) {
      linesRef.current.rotation.z = scrollY * 0.0001 + mouse.x * 0.05
      linesRef.current.rotation.x = mouse.y * 0.05
    }
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#FF00FF" />
      <pointLight position={[-10, -10, -10]} intensity={2} color="#00BFFF" />
      <directionalLight position={[0, 10, 5]} intensity={1} />
      
      {/* Improved particles with colors */}
      <Points ref={pointsRef} positions={particles.positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Improved geometric lines */}
      <group ref={linesRef}>
        {lines.map((lineData, i) => (
          <primitive key={i} object={new THREE.Line(lineData.geometry, lineData.material)} />
        ))}
      </group>

      {/* Sport ball that changes between different ball types */}
      <SportBall mouse={mouse} scrollY={scrollY} />

      {/* Plane with custom shader */}
      <ShaderPlane />

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom intensity={1.5} luminanceThreshold={0.9} luminanceSmoothing={0.9} />
        <Vignette eskil={false} offset={0.1} darkness={0.5} />
      </EffectComposer>
    </>
  )
}
