import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Premium() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  })

  const principles = [
    {
      number: "1",
      title: "Design tokens",
      subtitle: "(type, spacing, color, grid)",
      description: "We define the core visual rules—typography, spacing, color, and layout grid—so every page feels consistent, premium, and easy to scale as new content is added."
    },
    {
      number: "2",
      title: "Component library",
      subtitle: "(WP blocks)",
      description: "We build a set of reusable WordPress blocks (sections and modules) that your team can assemble and update quickly, without breaking the design, structure, or SEO."
    },
    {
      number: "3",
      title: "Motion guidelines",
      subtitle: "(scroll triggers, micro-interactions)",
      description: "We specify how motion is used with intention—subtle scroll-based moments and micro-interactions that elevate the experience."
    },
    {
      number: "4",
      title: "Accessibility + performance mobile-first",
      subtitle: "",
      description: "We apply mobile-first standards to ensure the site loads fast, works smoothly across devices, and remains readable and usable for all audiences."
    }
  ]

  return (
    <motion.section
      className="min-h-screen py-32 px-6 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-12 border-2 border-magenta rounded-lg flex items-center justify-center">
              <span className="text-magenta text-2xl">SEO</span>
            </div>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="text-gradient-magenta">Premium doesn't mean complex</span>
          </h2>
          <h2 className="text-5xl md:text-7xl font-bold">
            <span className="text-gradient-blue">— it means intentional</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              className="bg-dark-lighter/50 backdrop-blur-sm border border-magenta/20 rounded-2xl p-8 hover:border-magenta/50 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="text-blue text-4xl font-bold mb-4">{principle.number}</div>
              <h3 className="text-blue text-2xl font-bold mb-2">{principle.title}</h3>
              {principle.subtitle && (
                <p className="text-blue-light text-sm mb-4">{principle.subtitle}</p>
              )}
              <p className="text-gray-300 text-sm leading-relaxed">{principle.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Efectos decorativos de fondo */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-magenta rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue rounded-full blur-3xl"></div>
      </div>
    </motion.section>
  )
}
