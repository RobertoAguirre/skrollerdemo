import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { mergeRefs } from '../utils/mergeRefs'

const Experience = forwardRef<HTMLElement>((_props, ref) => {
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  })

  const projects = [
    {
      hashtag: "#Prepaeiffel",
      description: "We built a clear, story-driven website that explains the educational model and makes key information easy to find program, approach, and contact pathways. The structure is designed to scale as new content is added, with consistent page patterns that support discoverability and long-term SEO growth through strong information architecture and internal linking."
    },
    {
      hashtag: "#SounFahnYa",
      description: "We created an immersive, editorial digital experience for the Bank of the Republic of Colombia through its cultural network—an audio-led journey across the music of San Andrés, Providencia, and Santa Catalina, where each instrument becomes a navigable content hub with sound, storytelling, and cultural context. Built for scale, the structure supports ongoing content growth while maintaining clear navigation and high engagement through rich multimedia exploration."
    },
    {
      hashtag: "#DrJorgeGreen",
      description: "SEO-first medical tourism website designed to attract and convert patients from the United States looking for bariatric surgery in Tijuana, Mexico. The strategy involved a clear service architecture (procedure hubs + supporting education content), location-intent targeting, and consistent internal linking to improve search visibility. The site is supported by ongoing content expansion (blog + topic clusters) and conversion paths that capture high-intent visitors through contact flows and booking-ready CTAs."
    }
  ]

  return (
    <motion.section
      ref={mergeRefs(ref, inViewRef)}
      className="min-h-screen py-32 px-6 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={inViewRef}
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="text-gradient-magenta">Relevant Experience</span>
          </h2>
        </motion.div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div>
                <h3 className="text-blue text-3xl font-bold mb-6">{project.hashtag}</h3>
                <p className="text-gray-300 text-lg leading-relaxed">{project.description}</p>
              </div>
              
              {/* Sport-themed images */}
              <div className="relative">
                <div className="bg-dark-lighter/50 backdrop-blur-sm border border-magenta/20 rounded-2xl p-8 aspect-[9/16] overflow-hidden relative">
                  <img 
                    src={index === 0 
                      ? "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=700&fit=crop&q=80"
                      : index === 1
                      ? "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=700&fit=crop&q=80"
                      : "https://images.unsplash.com/photo-1534158914592-062992fbe900?w=400&h=700&fit=crop&q=80"
                    }
                    alt={index === 0 ? "Soccer" : index === 1 ? "Basketball" : "Tennis"}
                    className="w-full h-full object-cover opacity-60"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent"></div>
                </div>
                
                {/* Decorative effects */}
                <motion.div
                  className="absolute -top-4 -right-4 w-24 h-24 bg-magenta/20 rounded-full blur-xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>
    </motion.section>
  )
})

Experience.displayName = 'Experience'

export default Experience
