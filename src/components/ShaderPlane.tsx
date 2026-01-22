import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ShaderPlaneProps {
  colors?: { primary: string; secondary: string; emissive: string }
}

export default function ShaderPlane({ colors }: ShaderPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const defaultColors = { primary: '#22C55E', secondary: '#16A34A', emissive: '#10B981' }
  const activeColors = colors || defaultColors

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(activeColors.primary) },
        uColor2: { value: new THREE.Color(activeColors.secondary) }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vec2 uv = vUv;
          float time = uTime * 0.5;
          
          // Wave pattern
          float wave = sin(uv.x * 10.0 + time) * sin(uv.y * 10.0 + time) * 0.5 + 0.5;
          
          // Gradiente radial
          float dist = distance(uv, vec2(0.5));
          float gradient = 1.0 - smoothstep(0.0, 0.7, dist);
          
          // Mezcla de colores
          vec3 color = mix(uColor1, uColor2, wave * gradient);
          
          gl_FragColor = vec4(color, 0.3 * gradient);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    })
  }, [activeColors])

  useFrame((state) => {
    if (meshRef.current && shaderMaterial.uniforms) {
      shaderMaterial.uniforms.uTime.value = state.clock.elapsedTime
      // Update colors dynamically
      shaderMaterial.uniforms.uColor1.value = new THREE.Color(activeColors.primary)
      shaderMaterial.uniforms.uColor2.value = new THREE.Color(activeColors.secondary)
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -3]} rotation={[0, 0, 0]}>
      <planeGeometry args={[20, 20, 32, 32]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  )
}
