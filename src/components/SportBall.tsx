import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface SportBallProps {
  mouse: { x: number; y: number }
  scrollY: number
}

type BallType = 'soccer' | 'basketball' | 'tennis' | 'volleyball' | 'baseball' | 'rugby'

export default function SportBall({ mouse, scrollY }: SportBallProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const [currentBall, setCurrentBall] = useState<BallType>('soccer')
  const [transitionProgress, setTransitionProgress] = useState(1)

  // Ball configurations with proper colors and materials
  const ballConfigs = useMemo(() => {
    return {
      soccer: {
        geometry: new THREE.SphereGeometry(2.5, 32, 32),
        color: '#FFFFFF',
        emissive: '#00BFFF',
        roughness: 0.4
      },
      basketball: {
        geometry: new THREE.SphereGeometry(2.5, 32, 32),
        color: '#FF6B35', // Orange
        emissive: '#FF00FF',
        roughness: 0.6
      },
      tennis: {
        geometry: new THREE.SphereGeometry(2.2, 32, 32),
        color: '#FFFF00', // Yellow/Green
        emissive: '#00BFFF',
        roughness: 0.3
      },
      volleyball: {
        geometry: new THREE.SphereGeometry(2.4, 32, 32),
        color: '#FFFFFF',
        emissive: '#FF00FF',
        roughness: 0.5
      },
      baseball: {
        geometry: new THREE.SphereGeometry(2.3, 32, 32),
        color: '#FFFFFF',
        emissive: '#00BFFF',
        roughness: 0.4
      },
      rugby: {
        geometry: new THREE.SphereGeometry(2.5, 16, 16),
        color: '#FFFFFF',
        emissive: '#FF00FF',
        roughness: 0.5
      }
    }
  }, [])

  // Change ball type every 5 seconds
  useEffect(() => {
    const ballTypes: BallType[] = ['soccer', 'basketball', 'tennis', 'volleyball', 'baseball', 'rugby']
    let currentIndex = 0

    const changeBall = () => {
      setTransitionProgress(0)
      currentIndex = (currentIndex + 1) % ballTypes.length
      setCurrentBall(ballTypes[currentIndex])
      
      // Animate transition
      const transitionDuration = 1200 // 1.2 seconds
      const startTime = Date.now()
      
      const animateTransition = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / transitionDuration, 1)
        // Ease in-out curve
        const eased = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2
        setTransitionProgress(eased)
        
        if (progress < 1) {
          requestAnimationFrame(animateTransition)
        }
      }
      
      requestAnimationFrame(animateTransition)
    }

    // Initial delay
    const timeout = setTimeout(() => {
      changeBall()
      const interval = setInterval(changeBall, 5000)
      return () => clearInterval(interval)
    }, 5000)

    return () => clearTimeout(timeout)
  }, [])

  const currentConfig = ballConfigs[currentBall]
  const material = useMemo(() => {
    const baseColor = new THREE.Color(currentConfig.color)
    const emissiveColor = new THREE.Color(currentConfig.emissive)
    
    return new THREE.MeshStandardMaterial({
      color: baseColor,
      emissive: emissiveColor,
      emissiveIntensity: 0.2 + transitionProgress * 0.3,
      metalness: 0.6,
      roughness: currentConfig.roughness,
      transparent: true,
      opacity: 0.85 + transitionProgress * 0.15
    })
  }, [currentBall, transitionProgress, currentConfig])

  useFrame((_state, delta) => {
    if (groupRef.current) {
      // Smooth rotation
      groupRef.current.rotation.x += delta * 0.3
      groupRef.current.rotation.y += delta * 0.4
      groupRef.current.rotation.z += delta * 0.2
      
      // Mouse interaction
      groupRef.current.position.x = mouse.x * 2
      groupRef.current.position.y = mouse.y * 2
      
      // Scroll interaction
      groupRef.current.position.z = -5 + scrollY * 0.01
    }

    if (meshRef.current) {
      // Scale animation during transition
      const scale = 0.8 + Math.sin(transitionProgress * Math.PI) * 0.3
      meshRef.current.scale.set(scale, scale, scale)
    }
  })

  const geometry = useMemo(() => {
    return currentConfig.geometry.clone()
  }, [currentBall, currentConfig.geometry])

  return (
    <group ref={groupRef} position={[0, 0, -5]}>
      <mesh ref={meshRef} geometry={geometry} material={material}>
        {/* Add pattern lines for soccer ball */}
        {currentBall === 'soccer' && (
          <lineSegments>
            <edgesGeometry args={[geometry]} />
            <lineBasicMaterial color="#000000" opacity={0.4} transparent linewidth={2} />
          </lineSegments>
        )}
        {/* Add lines for basketball */}
        {currentBall === 'basketball' && (
          <lineSegments>
            <edgesGeometry args={[geometry]} />
            <lineBasicMaterial color="#000000" opacity={0.3} transparent linewidth={1.5} />
          </lineSegments>
        )}
      </mesh>
    </group>
  )
}
