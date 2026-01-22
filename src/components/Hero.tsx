import { useRef, useEffect, forwardRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { gsap } from 'gsap'

const Hero = forwardRef<HTMLElement>((_props, ref) => {
  const sectionRef = useRef<HTMLElement>(null)
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false
  })

  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])

  useEffect(() => {
    if (inView && titleRef.current && subtitleRef.current && buttonRef.current) {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      
      tl.from(titleRef.current.children, {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1
      })
      .from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8
      }, "-=0.5")
      .from(buttonRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.6
      }, "-=0.3")
    }
  }, [inView])

  return (
    <motion.section
      ref={(node) => {
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLElement | null>).current = node
        }
        if (sectionRef.current !== node) {
          (sectionRef as React.MutableRefObject<HTMLElement | null>).current = node
        }
        if (typeof inViewRef === 'function') {
          inViewRef(node)
        }
      }}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ opacity, scale, y }}
    >
      {/* Sport images overlay - subtle background references */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32">
          <img 
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop&q=80" 
            alt="Soccer" 
            className="w-full h-full object-cover rounded-full blur-sm"
            loading="lazy"
          />
        </div>
        <div className="absolute top-20 right-20 w-24 h-24">
          <img 
            src="https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200&h=200&fit=crop&q=80" 
            alt="Basketball" 
            className="w-full h-full object-cover rounded-full blur-sm"
            loading="lazy"
          />
        </div>
        <div className="absolute bottom-20 left-20 w-28 h-28">
          <img 
            src="https://images.unsplash.com/photo-1534158914592-062992fbe900?w=200&h=200&fit=crop&q=80" 
            alt="Tennis" 
            className="w-full h-full object-cover rounded-full blur-sm"
            loading="lazy"
          />
        </div>
        <div className="absolute bottom-10 right-10 w-36 h-36">
          <img 
            src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=200&h=200&fit=crop&q=80" 
            alt="Sports" 
            className="w-full h-full object-cover rounded-full blur-sm"
            loading="lazy"
          />
        </div>
      </div>

      {/* Additional floating particle effects */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-magenta rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
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
      {/* Geometric lines overlay */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.path
              key={i}
              d={`M ${50 + i * 30} 0 Q ${500} ${200 + i * 20} ${950 - i * 30} 1000`}
              stroke={i % 2 === 0 ? "#FF00FF" : "#00BFFF"}
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 0.3 } : {}}
              transition={{ duration: 2, delay: i * 0.1 }}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Skroller logo */}
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img 
            src="/skrollerlogo.svg" 
            alt="Skroller" 
            className="h-12 md:h-16 w-auto"
          />
        </motion.div>
        
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="text-white inline-block">A premium</span>{' '}
          <span className="text-gradient-magenta inline-block">website</span>{' '}
          <span className="text-white inline-block">that proves impact</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-300 mb-8"
        >
          WordPress-first build + measurable activation system
        </p>

        <div ref={buttonRef} className="flex justify-center gap-4">
          <motion.button
            className="px-8 py-4 bg-magenta text-white font-semibold rounded-lg hover:bg-magenta-light transition-colors relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Get Started</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-magenta to-blue opacity-0 group-hover:opacity-100"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-magenta rounded-full flex justify-center">
          <div className="w-1 h-3 bg-magenta rounded-full mt-2"></div>
        </div>
      </motion.div>
    </motion.section>
  )
})

Hero.displayName = 'Hero'

export default Hero
