import { useRef, useEffect, forwardRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { gsap } from 'gsap'
import { mergeRefs } from '../utils/mergeRefs'

const FinalSlide = forwardRef<HTMLElement>((_props, ref) => {
  const { ref: inViewRef, inView } = useInView({
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
      ref={mergeRefs(ref, inViewRef)}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Vibrant green soccer field background */}
      <div className="absolute inset-0">
        {/* Green base with more vibrant gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-500 to-green-600 opacity-70"></div>
        
        {/* Grass texture with stripes (cutting effect) */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                rgba(34, 197, 94, 0.3) 0px,
                rgba(34, 197, 94, 0.3) 2px,
                rgba(22, 163, 74, 0.3) 2px,
                rgba(22, 163, 74, 0.3) 4px
              )
            `,
            backgroundSize: '100% 4px'
          }}
        ></div>

        {/* Additional grass texture pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 98px,
                rgba(16, 185, 129, 0.1) 100px
              )
            `
          }}
        ></div>

        {/* More visible field lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          {/* Center line */}
          <line x1="0" y1="500" x2="1000" y2="500" stroke="#FFFFFF" strokeWidth="3" opacity="0.8" />
          {/* Center circle */}
          <circle cx="500" cy="500" r="100" stroke="#FFFFFF" strokeWidth="3" fill="none" opacity="0.8" />
          {/* Center point */}
          <circle cx="500" cy="500" r="5" fill="#FFFFFF" opacity="0.9" />
          {/* Left area */}
          <rect x="0" y="200" width="200" height="600" stroke="#FFFFFF" strokeWidth="3" fill="none" opacity="0.8" />
          <rect x="0" y="350" width="50" height="300" stroke="#FFFFFF" strokeWidth="3" fill="none" opacity="0.8" />
          {/* Right area */}
          <rect x="800" y="200" width="200" height="600" stroke="#FFFFFF" strokeWidth="3" fill="none" opacity="0.8" />
          <rect x="950" y="350" width="50" height="300" stroke="#FFFFFF" strokeWidth="3" fill="none" opacity="0.8" />
          {/* Corner lines */}
          <path d="M 0 0 L 0 200 L 50 200" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M 0 1000 L 0 800 L 50 800" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M 1000 0 L 1000 200 L 950 200" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M 1000 1000 L 1000 800 L 950 800" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.6" />
        </svg>

        {/* Shadow for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10"></div>
      </div>

      {/* Overlay of subtle green geometric lines */}
      <div className="absolute inset-0 opacity-15">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.path
              key={i}
              d={`M 0 ${100 + i * 75} Q 500 ${150 + i * 75} 1000 ${100 + i * 75}`}
              stroke="#22C55E"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 0.3 } : {}}
              transition={{ duration: 2, delay: i * 0.1 }}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Main content */}
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

          {/* Right side - Contact information */}
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

      {/* More visible green decorative particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              backgroundColor: i % 2 === 0 ? '#22C55E' : '#16A34A',
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1.2, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>
    </motion.section>
  )
})

FinalSlide.displayName = 'FinalSlide'

export default FinalSlide
