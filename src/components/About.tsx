import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function About() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  })

  const services = [
    {
      title: "Legal entity: VisorLab",
      description: "operates under Propósito y Desarrollo de Negocios SAPI de CV. Every contract is backed by an active legal corporate structure."
    },
    {
      title: "Software Development",
      description: "We design and build scalable websites and digital platforms with strong performance, clean architecture, and team ownership in mind."
    },
    {
      title: "Digital Marketing",
      description: "We implement tracking, reporting, CRM integrations, and automations that turn digital channels into measurable pipelines—optionally enhanced with AI."
    },
    {
      title: "Independent software delivery team:",
      description: "We work with a dedicated software development team with multiple successful implementations across industries."
    },
    {
      title: "eLearning Development",
      description: "We create enablement and training systems (LMS-ready), so teams can adopt what's delivered and keep capabilities inside the organization."
    },
    {
      title: "eCommerce Development",
      description: "We build conversion-focused commerce experiences, connecting product, content, and checkout flows to measurable business outcomes."
    },
    {
      title: "Process Automation (with or without AI)",
      description: "We streamline operations beyond marketing—connecting tools, improving workflows, and building automations for follow-up, reporting, internal coordination, and continuous process improvement, optionally enhanced with AI."
    }
  ]

  return (
    <motion.section
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
            <div className="text-6xl font-bold text-magenta mb-4">V</div>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient-magenta">VisorLab is a consolidated digital company</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-3xl">
            With 12 years of experience, VisorLab operates from its headquarters in Tijuana, Baja California, with active operations in Mexico and Colombia. We have supported clients across Latin America and the United States, delivering digital systems designed for scale, measurement, and adoption.
          </p>
          <h3 className="text-blue text-4xl font-bold">We build digital experiences</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-dark-lighter/50 backdrop-blur-sm border border-blue/20 rounded-2xl p-6 hover:border-blue/50 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h4 className="text-blue text-lg font-bold mb-3">{service.title}</h4>
              <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Efectos de agua/fluido */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.path
              key={i}
              d={`M 0 ${i * 66} Q 500 ${i * 66 + 50} 1000 ${i * 66}`}
              stroke={i % 2 === 0 ? "#FF00FF" : "#00BFFF"}
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 2, delay: i * 0.1, repeat: Infinity, repeatType: "reverse" }}
            />
          ))}
        </svg>
      </div>
    </motion.section>
  )
}
