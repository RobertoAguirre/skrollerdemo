import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Structure() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  })

  const sections = [
    {
      name: "Work",
      description: "Overview + filters/collections if needed"
    },
    {
      name: "Case Study Template",
      description: "Repeatable, indexable, measurable"
    },
    {
      name: "Insights",
      description: "Indexable library for thought leadership"
    },
    {
      name: "Team",
      description: "Credibility + roles + culture"
    },
    {
      name: "Brief Us",
      description: "Conversion-focused"
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
            <div className="w-12 h-12 border-2 border-magenta rounded-lg flex items-center justify-center">
              <span className="text-magenta text-2xl">🗺</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-white">
              Structure is <span className="text-gradient-magenta">strategy</span>
            </h2>
          </div>
        </motion.div>

        <div className="space-y-12">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <div className="text-blue text-4xl font-bold mb-4">1</div>
              <p className="text-gray-300 text-lg leading-relaxed">
                The website structure is not only how people navigate—it's how search engines understand Skroller. A clear information architecture turns your site into a scalable SEO system: every section, menu, and template becomes a pathway for discovery, relevance, and authority as new work is published.
              </p>
            </div>
            <div>
              <div className="text-blue text-4xl font-bold mb-4">2</div>
              <p className="text-gray-300 text-lg leading-relaxed">
                We design navigation and content zones deliberately—so Skroller can grow search visibility over time through strategic hubs (Work, Case Studies, Insights), internal linking, and consistent page structures that help both users and search engines find the right content faster.
              </p>
            </div>
          </motion.div>

          {/* Timeline visual */}
          <motion.div
            className="relative mt-20"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {/* Línea principal */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-magenta via-blue to-magenta transform -translate-y-1/2"></div>

            <div className="relative flex justify-between items-center">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  {/* Punto en la línea */}
                  <div className="w-4 h-4 bg-magenta rounded-full mb-4 relative z-10">
                    <div className="absolute inset-0 bg-magenta rounded-full animate-ping opacity-75"></div>
                  </div>
                  
                  {/* Línea vertical */}
                  <div className="w-1 h-16 bg-magenta mb-4"></div>
                  
                  {/* Contenido */}
                  <div className="bg-dark-lighter/50 backdrop-blur-sm border border-magenta/20 rounded-xl p-6 max-w-[200px] text-center hover:border-magenta/50 transition-all">
                    <h3 className="text-magenta text-lg font-bold mb-2">{section.name}</h3>
                    <p className="text-gray-400 text-xs">{section.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Efectos de fondo */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          background: 'radial-gradient(circle, rgba(255,0,255,0.2) 0%, transparent 70%)'
        }}></div>
      </div>
    </motion.section>
  )
}
