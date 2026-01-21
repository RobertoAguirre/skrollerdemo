import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { mergeRefs } from '../utils/mergeRefs'

const Investment = forwardRef<HTMLElement>((_props, ref) => {
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  })

  const stages = [
    {
      stage: "Stage 1",
      title: "Strategy & Foundations",
      weeks: "(Weeks 1-2) - 30%",
      deliverables: [
        "Project plan, timeline, and approval checkpoints (week-by-week).",
        "SEO baseline + scalable SEO strategy (structure, templates, content rules).",
        "Hosting & technical setup review (or configuration recommendations).",
        "Content intake audit: review of copy, visuals, and assets provided.",
        "HubSpot review: forms/meetings setup assessment + CRM flow mapping for the website."
      ]
    },
    {
      stage: "Stage 2",
      title: "Design System & UX/UI",
      weeks: "(Weeks 3-4) - 30%",
      deliverables: [
        "Information architecture + wireframes (guided-scroll narrative + templates).",
        "Visual direction + UI system (tokens, components, motion principles).",
        "Key page designs ready for build (homepage + core templates)."
      ]
    },
    {
      stage: "Stage 3",
      title: "Build, Tracking, Launch & Enablement",
      weeks: "(Weeks 5-12) - 40%",
      deliverables: [
        "WordPress build (editable blocks + repeatable templates).",
        "Interactive experience: React + WebGL modules + 3D web optimization.",
        "Tracking setup + conversion measurement.",
        "HubSpot forms + meeting booking embedded.",
        "Content loading (agreed scope) + QA (devices/performance).",
        "Enablement package (100% available): training delivered as PDF guides + interactive video walkthroughs, with 24/7 access via an online learning platform so your team can onboard, update, and maintain the site confidently at any time."
      ]
    }
  ]

  return (
    <motion.section
      ref={mergeRefs(ref, inViewRef)}
      className="min-h-screen py-32 px-6 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Resumen superior */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-dark-lighter/50 backdrop-blur-sm border border-magenta/20 rounded-2xl p-6">
            <div className="text-magenta text-2xl mb-2">💰</div>
            <div className="text-magenta text-sm font-semibold mb-2">Investment</div>
            <div className="text-white text-3xl font-bold">€22,000</div>
          </div>
          <div className="bg-dark-lighter/50 backdrop-blur-sm border border-blue/20 rounded-2xl p-6">
            <div className="text-blue text-2xl mb-2">📅</div>
            <div className="text-white text-sm mb-2">Delivery: 12 weeks</div>
            <div className="text-gray-400 text-xs">(End of Q1)</div>
          </div>
          <div className="bg-dark-lighter/50 backdrop-blur-sm border border-magenta/20 rounded-2xl p-6">
            <div className="text-magenta text-2xl mb-2">💳</div>
            <div className="text-magenta text-sm font-semibold mb-2">Payment terms: 30% / 30% / 40%</div>
            <div className="text-gray-400 text-xs">(tied to milestone deliverables)</div>
          </div>
        </motion.div>

        {/* Etapas */}
        <div className="space-y-8">
          {stages.map((stage, index) => (
            <motion.div
              key={index}
              className="bg-dark-lighter/50 backdrop-blur-sm border border-magenta/20 rounded-2xl p-8 hover:border-magenta/50 transition-all duration-300"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <div className="mb-6">
                <div className="text-blue text-2xl font-bold mb-2">{stage.stage}</div>
                <div className="text-white text-3xl font-bold mb-2">{stage.title}</div>
                <div className="text-magenta text-lg font-semibold">{stage.weeks}</div>
              </div>
              
              <div className="border-t border-magenta/20 pt-6">
                <p className="text-gray-400 text-sm mb-4">What you receive:</p>
                <ul className="space-y-3">
                  {stage.deliverables.map((item, itemIndex) => {
                    const isHighlighted = index === 2 && itemIndex === 5 // Last item of Stage 3
                    return (
                      <motion.li
                        key={itemIndex}
                        className={`flex items-start gap-3 ${isHighlighted ? 'bg-magenta/10 p-4 rounded-lg border border-magenta/30' : ''}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 + itemIndex * 0.05 }}
                      >
                        <span className={`text-xl ${isHighlighted ? 'text-magenta' : 'text-magenta'}`}>•</span>
                        <span className={`text-sm ${isHighlighted ? 'text-magenta font-semibold' : 'text-gray-300'}`}>{item}</span>
                      </motion.li>
                    )
                  })}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Numeric decorative effects */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-magenta text-9xl font-bold"
            style={{
              left: `${10 + i * 8}%`,
              top: `${20 + i * 5}%`,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            {i}
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
})

Investment.displayName = 'Investment'

export default Investment
