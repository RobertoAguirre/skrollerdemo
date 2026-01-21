import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Adoption() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  })

  return (
    <motion.section
      className="min-h-screen py-32 px-6 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div>
            <motion.div
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="w-12 h-12 border-2 border-magenta rounded-lg flex items-center justify-center">
                <span className="text-magenta text-2xl">💻</span>
              </div>
            </motion.div>

            <motion.h2
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="text-gradient-magenta">Built for adoption</span> —{' '}
              <span className="text-white">not dependency</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-blue text-xl font-semibold mb-4">Adoption is the real success metric:</p>
            <p className="text-gray-300 text-lg leading-relaxed">
              If the team can't use and maintain what's delivered, it becomes a cost—not an investment. That's why we pair the build with clear CMS guidelines, lightweight tutorials, and a training session that turns the site into an internal capability, not an ongoing dependency.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Efectos de ondas de fondo */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.path
              key={i}
              d={`M 0 ${100 + i * 100} Q 250 ${150 + i * 100} 500 ${100 + i * 100} T 1000 ${100 + i * 100}`}
              stroke={i % 2 === 0 ? "#FF00FF" : "#00BFFF"}
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 2, delay: i * 0.2 }}
            />
          ))}
        </svg>
      </div>
    </motion.section>
  )
}
