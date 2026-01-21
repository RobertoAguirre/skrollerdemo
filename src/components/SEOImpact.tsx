import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { mergeRefs } from '../utils/mergeRefs'

const SEOImpact = forwardRef<HTMLElement>((_props, ref) => {
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  })

  return (
    <motion.section
      ref={mergeRefs(ref, inViewRef)}
      className="min-h-screen py-32 px-6 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={inViewRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div>
            <motion.h2
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="text-gradient-magenta">Proof of SEO impact</span>
            </motion.h2>
            <motion.p
              className="text-gray-300 text-lg leading-relaxed mb-6"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              For medical tourism, SEO is built around high-intent searches from the U.S. and consistent publishing rules. Below is an example of how we track and improve visibility over time—using keyword rankings, page-one growth, and movement across priority queries.
            </motion.p>
            <motion.a
              href="#"
              className="text-magenta text-lg font-semibold hover:text-magenta-light transition-colors"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              View SEO Ranking Report →
            </motion.a>
            <motion.div
              className="mt-8 text-gray-400"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className="text-3xl font-light mb-2">Jorge Green</p>
              <p className="text-sm">Bariatric surgery</p>
            </motion.div>
          </div>

          {/* Paneles de reportes SEO */}
          <div className="space-y-6">
            {[1, 2, 3].map((_panel, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-magenta/20 rounded-2xl p-6"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <div className="text-white">
                  <div className="text-sm text-gray-400 mb-4">Reporte de Ranking</div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Keywords in TOP3</span>
                      <span className="text-magenta font-bold">64%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Keywords in TOP10</span>
                      <span className="text-blue font-bold">14</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating data effects */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-magenta text-xs font-mono"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            {Math.floor(Math.random() * 100)}
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
})

SEOImpact.displayName = 'SEOImpact'

export default SEOImpact
