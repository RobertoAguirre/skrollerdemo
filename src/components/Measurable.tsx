import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { mergeRefs } from '../utils/mergeRefs'

const Measurable = forwardRef<HTMLElement>((_props, ref) => {
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  })

  const deliverables = [
    "GA4 + GTM setup with section-level events",
    "Conversion definitions (forms, bookings, CTA clicks)",
    "HubSpot embedding (forms + meeting widget) + basic attribution inputs",
    "Reporting framework for quarterly updates (as requested)"
  ]

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
            <motion.div
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="w-12 h-12 border-2 border-magenta rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-magenta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </motion.div>

            <motion.h2
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="text-gradient-magenta">Every key action</span>{' '}
              <span className="text-white">becomes a measurable signal</span>
            </motion.h2>

            <div className="flex items-center gap-4 mt-8">
              <div className="text-white text-sm font-semibold">HubSpot</div>
              <div className="text-white text-sm font-semibold">Google Analytics 4</div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Every key action on the site will be tracked as a measurable signal. We'll set up analytics so you can understand how people engage with each section, define the key conversions that matter (forms, meeting bookings, and CTA clicks), and connect HubSpot so inquiries and bookings are captured in one place with clear visibility into where they came from. To support ongoing optimization, we'll also provide a quarterly reporting framework aligned with your requested update cycle.
            </p>

            <div className="bg-dark-lighter/50 backdrop-blur-sm border border-blue/20 rounded-2xl p-6">
              <p className="text-gray-400 text-sm mb-4">Key deliverables:</p>
              <ul className="space-y-3">
                {deliverables.map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    <span className="text-magenta text-xl">•</span>
                    <span className="text-white text-sm">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Abstract data visualization */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1000 1000">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.line
              key={i}
              x1={i * 50}
              y1={0}
              x2={i * 50}
              y2={1000}
              stroke={i % 3 === 0 ? "#FF00FF" : "#00BFFF"}
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.3 } : {}}
              transition={{ duration: 1, delay: i * 0.05 }}
            />
          ))}
        </svg>
      </div>
    </motion.section>
  )
})

Measurable.displayName = 'Measurable'

export default Measurable
