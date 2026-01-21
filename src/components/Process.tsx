import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Process() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const deliverables = [
    "Discovery + SEO baseline",
    "IA + Wireframes",
    "UI system + Motion direction",
    "WordPress build (templates/blocks)",
    "Tracking + HubSpot",
    "QA + Launch + Training"
  ]

  return (
    <motion.section
      ref={containerRef}
      className="min-h-screen py-32 px-6 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 border-2 border-magenta rounded-lg flex items-center justify-center">
              <span className="text-magenta text-2xl">📋</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-white">
              A structured process with <span className="text-gradient-magenta">clear gates</span>
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              We work in short cycles with weekly alignment to keep decisions fast and visible. Each milestone ends with a tangible deliverable—wireframes, design system, WordPress templates, and a tracking plan—so progress is easy to validate and rework is minimized.
            </p>
            <p className="text-blue text-xl font-semibold mb-4">This is "agile with gates":</p>
            <p className="text-gray-300 text-lg leading-relaxed">
              A clear timeline, defined approvals, and lightweight documentation. From day one, we build for ownership—editable WordPress blocks, publishing guidelines, and training—so your team can update the site confidently without ongoing external dependency.
            </p>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-dark-lighter/50 backdrop-blur-sm border border-blue/20 rounded-2xl p-6">
              <p className="text-gray-400 text-sm mb-4">What you asked for:</p>
              <p className="text-white text-xl font-bold">Plan, timeline, deliverables</p>
            </div>

            <div className="flex items-center justify-center py-4">
              <div className="text-5xl font-bold text-magenta">=</div>
            </div>

            <div className="bg-dark-lighter/50 backdrop-blur-sm border border-magenta/20 rounded-2xl p-6">
              <p className="text-gray-400 text-sm mb-4">How we deliver:</p>
              <div className="grid grid-cols-2 gap-4">
                {deliverables.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <span className="text-magenta text-xl">•</span>
                    <span className="text-white text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Líneas de fondo animadas */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.path
              key={i}
              d={`M ${i * 66} 0 L ${i * 66 + 100} 1000`}
              stroke={i % 2 === 0 ? "#FF00FF" : "#00BFFF"}
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.3 } : {}}
              transition={{ duration: 1, delay: i * 0.1 }}
            />
          ))}
        </svg>
      </div>
    </motion.section>
  )
}
