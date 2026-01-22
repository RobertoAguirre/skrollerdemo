import { useState, useEffect, RefObject } from 'react'

interface Section {
  id: string
  ref: RefObject<HTMLElement>
}

export function useActiveSection(sections: Section[]): string {
  const [activeSection, setActiveSection] = useState<string>('hero')

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    }

    const observers: IntersectionObserver[] = []

    sections.forEach((section) => {
      if (section.ref.current) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(section.id)
            }
          })
        }, observerOptions)

        observer.observe(section.ref.current)
        observers.push(observer)
      }
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [sections])

  return activeSection
}

// Color mapping for each section based on presentation
export const sectionColors: Record<string, { primary: string; secondary: string; emissive: string }> = {
  hero: {
    primary: '#22C55E', // Green
    secondary: '#16A34A',
    emissive: '#10B981'
  },
  requirements: {
    primary: '#FF00FF', // Magenta
    secondary: '#FF66FF',
    emissive: '#CC00CC'
  },
  storytelling: {
    primary: '#00BFFF', // Blue/Cyan
    secondary: '#40D9FF',
    emissive: '#0099CC'
  },
  process: {
    primary: '#8B00FF', // Purple
    secondary: '#A855F7',
    emissive: '#9333EA'
  },
  structure: {
    primary: '#FF00FF', // Magenta
    secondary: '#FF66FF',
    emissive: '#CC00CC'
  },
  premium: {
    primary: '#00BFFF', // Blue
    secondary: '#40D9FF',
    emissive: '#0099CC'
  },
  experience: {
    primary: '#FF6B35', // Orange
    secondary: '#FF8C42',
    emissive: '#FF4500'
  },
  adoption: {
    primary: '#00CED1', // Teal
    secondary: '#20B2AA',
    emissive: '#008B8B'
  },
  'seo-impact': {
    primary: '#FF00FF', // Magenta
    secondary: '#FF66FF',
    emissive: '#CC00CC'
  },
  measurable: {
    primary: '#00BFFF', // Blue
    secondary: '#40D9FF',
    emissive: '#0099CC'
  },
  delivery: {
    primary: '#8B00FF', // Purple
    secondary: '#A855F7',
    emissive: '#9333EA'
  },
  about: {
    primary: '#FF00FF', // Magenta
    secondary: '#FF66FF',
    emissive: '#CC00CC'
  },
  investment: {
    primary: '#00BFFF', // Blue
    secondary: '#40D9FF',
    emissive: '#0099CC'
  },
  'final-slide': {
    primary: '#22C55E', // Green (soccer field)
    secondary: '#16A34A',
    emissive: '#10B981'
  }
}
