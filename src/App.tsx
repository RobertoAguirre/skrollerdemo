import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import Requirements from './components/Requirements'
import Storytelling from './components/Storytelling'
import Process from './components/Process'
import Structure from './components/Structure'
import Premium from './components/Premium'
import Experience from './components/Experience'
import Adoption from './components/Adoption'
import SEOImpact from './components/SEOImpact'
import Measurable from './components/Measurable'
import Delivery from './components/Delivery'
import About from './components/About'
import Investment from './components/Investment'
import FinalSlide from './components/FinalSlide'
import Navigation from './components/Navigation'
import { Canvas } from '@react-three/fiber'
import Scene3D from './components/Scene3D'

function App() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative">
      {/* Canvas 3D de fondo con efectos avanzados */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 75 }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: true
          }}
          dpr={[1, 2]}
        >
          <Scene3D scrollY={scrollY} />
        </Canvas>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <Requirements />
        <Storytelling />
        <Process />
        <Structure />
        <Premium />
        <Experience />
        <Adoption />
        <SEOImpact />
        <Measurable />
        <Delivery />
        <About />
        <Investment />
        <FinalSlide />
      </div>
    </div>
  )
}

export default App
