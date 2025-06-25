import { useState, useEffect } from 'react'

export type ScreenSize = 'mobile' | 'tablet' | 'desktop'

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024

export function useScreenSize(): {
  screenSize: ScreenSize | null
  isLoading: boolean
} {
  const [screenSize, setScreenSize] = useState<ScreenSize | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth
      
      let newScreenSize: ScreenSize
      if (width < MOBILE_BREAKPOINT) {
        newScreenSize = 'mobile'
      } else if (width < TABLET_BREAKPOINT) {
        newScreenSize = 'tablet'
      } else {
        newScreenSize = 'desktop'
      }
      
      setScreenSize(newScreenSize)
      setIsLoading(false)
    }

    // Initial check
    updateScreenSize()

    // Create media query listeners for precise breakpoint detection
    const mobileQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const tabletQuery = window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT}px) and (max-width: ${TABLET_BREAKPOINT - 1}px)`)
    
    const handleChange = () => updateScreenSize()
    
    mobileQuery.addEventListener('change', handleChange)
    tabletQuery.addEventListener('change', handleChange)

    return () => {
      mobileQuery.removeEventListener('change', handleChange)
      tabletQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return { screenSize, isLoading }
} 