import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { gsap } from 'gsap'

export default function FinalSlide() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false
  })

  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (inView && titleRef.current && subtitleRef.current && textRef.current && contactRef.current) {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      
      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1
      })
      .from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8
      }, "-=0.5")
      .from(textRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8
      }, "-=0.4")
      .from(contactRef.current.children, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6
      }, "-=0.3")
    }
  }, [inView])

  return (
    <motion.section
      ref={ref}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Fondo con efecto de campo de fútbol */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-green-900 via-green-800 to-green-900"></div>
        {/* Líneas del campo */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <line x1="0" y1="500" x2="1000" y2="500" stroke="#FFFFFF" strokeWidth="2" opacity="0.3" />
          <circle cx="500" cy="500" r="100" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.3" />
          <rect x="0" y="200" width="200" height="600" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.3" />
          <rect x="800" y="200" width="200" height="600" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.3" />
        </svg>
      </div>

      {/* Overlay de líneas geométricas */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.path
              key={i}
              d={`M 0 ${100 + i * 60} Q 500 ${150 + i * 60} 1000 ${100 + i * 60}`}
              stroke="#00FF88"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 0.4 } : {}}
              transition={{ duration: 2, delay: i * 0.1 }}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Lado izquierdo - Contenido principal */}
          <div>
            <motion.h1
              ref={titleRef}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="text-gradient-magenta">So where do we go from here?</span>
            </motion.h1>

            <motion.h2
              ref={subtitleRef}
              className="text-3xl md:text-5xl font-bold mb-6 text-white"
            >
              Let's make Skroller impossible to ignore
            </motion.h2>

            <motion.p
              ref={textRef}
              className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8"
            >
              A premium website is only valuable when it's adopted, scalable, and measurable. We're ready to turn Skroller into a site that feels world-class—and proves its impact.
            </motion.p>
          </div>

          {/* Lado derecho - Información de contacto */}
          <motion.div
            ref={contactRef}
            className="bg-dark-lighter/80 backdrop-blur-md border border-magenta/30 rounded-2xl p-8"
          >
            <div className="mb-6">
              <h3 className="text-white text-2xl font-bold mb-2">VisorLab</h3>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <div>
                <p className="text-sm text-gray-400 mb-1">Location</p>
                <p className="text-white">Tijuana, Baja California, Mexico</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-400 mb-1">Email</p>
                <a 
                  href="mailto:info@visorlab.com" 
                  className="text-magenta hover:text-magenta-light transition-colors"
                >
                  info@visorlab.com
                </a>
              </div>
              
              <div>
                <p className="text-sm text-gray-400 mb-1">Phone / WhatsApp</p>
                <a 
                  href="https://wa.me/526643052154" 
                  className="text-magenta hover:text-magenta-light transition-colors"
                >
                  +52 664 305 2154
                </a>
              </div>
              
              <div className="pt-4 border-t border-magenta/20">
                <a 
                  href="https://visorlab.com" 
                  className="text-magenta/70 hover:text-magenta transition-colors text-sm"
                >
                  visorlab.com
                </a>
              </div>
            </div>

            <motion.button
              className="mt-8 w-full px-6 py-4 bg-magenta text-white font-semibold rounded-lg hover:bg-magenta-light transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get in Touch
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Partículas decorativas */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </motion.section>
  )
}
