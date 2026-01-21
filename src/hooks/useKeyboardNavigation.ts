import { useEffect, useRef, useState } from 'react'

interface SectionRef {
  id: string
  ref: React.RefObject<HTMLElement>
}

export function useKeyboardNavigation(sections: SectionRef[]) {
  const [currentSection, setCurrentSection] = useState(0)
  const isNavigating = useRef(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent navigation if already navigating
      if (isNavigating.current) return

      // Ignore if typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      let nextSection = currentSection

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault()
        nextSection = Math.min(currentSection + 1, sections.length - 1)
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        nextSection = Math.max(currentSection - 1, 0)
      } else if (e.key === 'Home') {
        e.preventDefault()
        nextSection = 0
      } else if (e.key === 'End') {
        e.preventDefault()
        nextSection = sections.length - 1
      }

      if (nextSection !== currentSection && sections[nextSection]?.ref.current) {
        isNavigating.current = true
        setCurrentSection(nextSection)

        sections[nextSection].ref.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })

        // Allow new navigation after 800ms
        setTimeout(() => {
          isNavigating.current = false
        }, 800)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSection, sections])

  // Update current section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isNavigating.current) return

      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i].ref.current
        if (section) {
          const { offsetTop, offsetHeight } = section
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setCurrentSection(i)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  return { currentSection }
}
