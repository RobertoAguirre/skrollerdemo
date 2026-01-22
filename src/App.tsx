import { useState, useEffect, useRef } from 'react'
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
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation'
import { useActiveSection, sectionColors } from './hooks/useActiveSection'

function App() {
  const [scrollY, setScrollY] = useState(0)

  // Refs for each section
  const heroRef = useRef<HTMLElement>(null)
  const requirementsRef = useRef<HTMLElement>(null)
  const storytellingRef = useRef<HTMLElement>(null)
  const processRef = useRef<HTMLElement>(null)
  const structureRef = useRef<HTMLElement>(null)
  const premiumRef = useRef<HTMLElement>(null)
  const experienceRef = useRef<HTMLElement>(null)
  const adoptionRef = useRef<HTMLElement>(null)
  const seoImpactRef = useRef<HTMLElement>(null)
  const measurableRef = useRef<HTMLElement>(null)
  const deliveryRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const investmentRef = useRef<HTMLElement>(null)
  const finalSlideRef = useRef<HTMLElement>(null)

  const sections = [
    { id: 'hero', ref: heroRef },
    { id: 'requirements', ref: requirementsRef },
    { id: 'storytelling', ref: storytellingRef },
    { id: 'process', ref: processRef },
    { id: 'structure', ref: structureRef },
    { id: 'premium', ref: premiumRef },
    { id: 'experience', ref: experienceRef },
    { id: 'adoption', ref: adoptionRef },
    { id: 'seo-impact', ref: seoImpactRef },
    { id: 'measurable', ref: measurableRef },
    { id: 'delivery', ref: deliveryRef },
    { id: 'about', ref: aboutRef },
    { id: 'investment', ref: investmentRef },
    { id: 'final-slide', ref: finalSlideRef },
  ]

  useKeyboardNavigation(sections)
  
  // Get active section and its colors
  const activeSection = useActiveSection(sections)
  const activeColors = sectionColors[activeSection] || sectionColors.hero

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* 3D background canvas with advanced effects */}
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full">
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
          style={{ width: '100%', height: '100%' }}
        >
          <Scene3D scrollY={scrollY} sectionColors={activeColors} />
        </Canvas>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full">
        <Navigation />
        <Hero ref={heroRef} />
        <Requirements ref={requirementsRef} />
        <Storytelling ref={storytellingRef} />
        <Process ref={processRef} />
        <Structure ref={structureRef} />
        <Premium ref={premiumRef} />
        <Experience ref={experienceRef} />
        <Adoption ref={adoptionRef} />
        <SEOImpact ref={seoImpactRef} />
        <Measurable ref={measurableRef} />
        <Delivery ref={deliveryRef} />
        <About ref={aboutRef} />
        <Investment ref={investmentRef} />
        <FinalSlide ref={finalSlideRef} />
      </div>
    </div>
  )
}

export default App
