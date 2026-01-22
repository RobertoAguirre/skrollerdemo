import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { mergeRefs } from '../utils/mergeRefs'

const Delivery = forwardRef<HTMLElement>((_props, ref) => {
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  })

  const phases = [
    {
      weeks: "Weeks 1-2",
      focus: "Discovery + Structure",
      description: "We align on goals, audiences, and what \"success\" means. We map the website structure and draft the first page layouts for quick feedback. (Approval Gate: Structure + wireframes)"
    },
    {
      weeks: "Weeks 3-4",
      focus: "Look & Feel System",
      description: "We define the visual direction and the reusable design system, then shape the homepage story flow and key sections. (Approval Gate: Visual direction + system)"
    },
    {
      weeks: "Weeks 5-7",
      focus: "Build in WordPress",
      description: "We build the site using reusable blocks and templates so your team can update it easily and safely. (Approval Gate: Working templates demo)"
    },
    {
      weeks: "Weeks 8-9",
      focus: "Tracking + HubSpot + Content",
      description: "We connect forms and meeting booking, set up tracking, and load the core content so everything is measurable. (Approval Gate: Tracking + HubSpot validation)"
    },
    {
      weeks: "Weeks 10-12",
      focus: "Final QA + Launch + Enablement",
      description: "We test across devices, polish performance, launch, and deliver training + documentation so the team can run it confidently. (Approval Gate: Launch readiness)"
    }
  ]

  return (
    <motion.section
      ref={mergeRefs(ref, inViewRef)}
      className="min-h-screen py-32 px-6 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 border-2 border-magenta rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-magenta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-white">
              A fast, structured delivery with <span className="text-gradient-magenta">clear checkpoints</span>
            </h2>
          </div>
        </motion.div>

        <div className="space-y-6">
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              className="bg-dark-lighter/50 backdrop-blur-sm border border-magenta/20 rounded-2xl p-8 hover:border-magenta/50 transition-all duration-300"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-blue text-lg font-semibold mb-2">{phase.weeks}</div>
                  <div className="text-magenta text-2xl font-bold">{phase.focus}</div>
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-300 leading-relaxed">{phase.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Visual timeline */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-magenta via-blue to-magenta opacity-20"></div>
    </motion.section>
  )
})

Delivery.displayName = 'Delivery'

export default Delivery
