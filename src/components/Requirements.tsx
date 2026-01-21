import { useRef, forwardRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { mergeRefs } from '../utils/mergeRefs'

const Requirements = forwardRef<HTMLElement>((_props, ref) => {
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const requirements = [
    {
      number: "01",
      title: "WordPress",
      subtitle: "(reusable blocks + templates)",
      description: "We build with reusable blocks and templates for easy content management."
    },
    {
      number: "02",
      title: "HubSpot",
      subtitle: "(forms + meeting booking + inquiry tracking)",
      description: "Integration for forms, meeting bookings, and inquiry tracking."
    },
    {
      number: "03",
      title: "Analytics + quarterly reporting",
      subtitle: "",
      description: "Setting up tracking for user behavior and providing performance reports."
    },
    {
      number: "04",
      title: "End of Q1 delivery",
      subtitle: "(structured process with weekly check-ins + approval moments)",
      description: "A structured delivery process with weekly check-ins and approval moments."
    }
  ]

  return (
    <motion.section
      ref={mergeRefs(ref, containerRef)}
      className="min-h-screen py-32 px-6 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={inViewRef}
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 border-2 border-magenta rounded-lg flex items-center justify-center">
              <span className="text-magenta text-2xl">⚙</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-white">
              Built around your <span className="text-gradient-magenta">requirements</span>
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {requirements.map((req, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              style={{ y }}
            >
              <div className="bg-dark-lighter/50 backdrop-blur-sm border border-magenta/20 rounded-2xl p-8 h-full hover:border-magenta/50 transition-all duration-300">
                <div className="text-blue text-4xl font-bold mb-4">{req.number}</div>
                <h3 className="text-blue text-2xl font-bold mb-2">{req.title}</h3>
                {req.subtitle && (
                  <p className="text-blue-light text-sm mb-4">{req.subtitle}</p>
                )}
                <p className="text-gray-300 text-sm leading-relaxed">{req.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background decorative lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1000 1000">
          <motion.path
            d="M 0 500 Q 250 300 500 500 T 1000 500"
            stroke="#FF00FF"
            strokeWidth="2"
            fill="none"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </svg>
      </div>
    </motion.section>
  )
})

Requirements.displayName = 'Requirements'

export default Requirements
