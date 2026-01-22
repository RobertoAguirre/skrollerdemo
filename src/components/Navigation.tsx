import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark/80 backdrop-blur-md' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          visor<span className="text-blue-light">lab</span>
        </div>
        {/* Skroller logo - using text with styling inspired by skroller.com */}
        <div className="flex items-center gap-2">
          <div className="text-white text-xl font-bold">
            skro<span className="text-magenta">ler</span>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
