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
    // Debounce helper – executed at most once every 120 ms
    let timeout: number | undefined
    const updateScreenSize = () => {
      clearTimeout(timeout)
      timeout = window.setTimeout(() => {
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
      }, 120)
    }

    // Initial check
    updateScreenSize()

    const mobileQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const tabletQuery = window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT}px) and (max-width: ${TABLET_BREAKPOINT - 1}px)`)
    
    mobileQuery.addEventListener('change', updateScreenSize, { passive: true })
    tabletQuery.addEventListener('change', updateScreenSize, { passive: true })

    return () => {
      clearTimeout(timeout)
      mobileQuery.removeEventListener('change', updateScreenSize)
      tabletQuery.removeEventListener('change', updateScreenSize)
    }
  }, [])

  return { screenSize, isLoading }
} 