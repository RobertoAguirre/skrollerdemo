import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Storytelling() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <motion.section
      ref={containerRef}
      className="min-h-screen py-32 px-6 relative overflow-hidden"
      style={{ opacity }}
    >
      {/* Fondo con efecto de movimiento */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ y: backgroundY }}
      >
        <div className="w-full h-full bg-gradient-to-br from-magenta/10 via-transparent to-blue/10"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <motion.div
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="w-12 h-12 border-2 border-magenta rounded-lg flex items-center justify-center">
                <span className="text-magenta text-2xl">&lt;/&gt;</span>
              </div>
            </motion.div>

            <motion.h2
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="text-gradient-magenta">Premium storytelling</span>,{' '}
              <span className="text-white">built to rank and convert</span>
            </motion.h2>

            <motion.p
              className="text-blue text-xl mb-8"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              SEO will scale as Skroller grows
            </motion.p>

            <motion.p
              className="text-gray-300 text-lg leading-relaxed mb-8"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              We'll build SEO-ready templates and a simple publishing system so every new project or insight can follow best practices by default—clear structure, metadata, internal linking, and indexable content. To keep quality consistent over time, we'll deliver lightweight tutorials and checklists, supported by your preferred WordPress SEO tool (e.g., Rank Math or Yoast).
            </motion.p>
          </div>

          <div className="space-y-8">
            <motion.div
              className="bg-dark-lighter/50 backdrop-blur-sm border border-blue/20 rounded-2xl p-8"
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-gray-400 text-sm mb-4">What you asked for:</p>
              <p className="text-white text-xl font-bold">Continuous scroll feel + scalable SEO</p>
            </motion.div>

            <div className="flex items-center justify-center">
              <motion.div
                className="text-6xl font-bold text-magenta"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                =
              </motion.div>
            </div>

            <motion.div
              className="bg-dark-lighter/50 backdrop-blur-sm border border-magenta/20 rounded-2xl p-8"
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <p className="text-gray-400 text-sm mb-4">How we deliver:</p>
              <p className="text-white text-xl font-bold">Guided-scroll Home + SEO templates (Work / Case / Insights)</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Efectos de partículas decorativas */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-magenta rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </motion.section>
  )
}
