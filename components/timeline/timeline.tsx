"use client"

import { Suspense, lazy, useEffect, useState } from "react"
import { useScreenSize } from "@/hooks/use-screen-size"
import { TimelineLoading } from "./timeline-loading"
import type { TimelineProps } from "@/types/timeline"

// Dynamic imports with chunk names for better performance monitoring
const TimelineDesktop = lazy(() => 
  import(/* webpackChunkName: "timeline-desktop" */ "./timeline-desktop")
    .then(module => ({ default: module.TimelineDesktop }))
)

const TimelineTablet = lazy(() => 
  import(/* webpackChunkName: "timeline-tablet" */ "./timeline-tablet")
    .then(module => ({ default: module.TimelineTablet }))
)

const TimelineMobile = lazy(() => 
  import(/* webpackChunkName: "timeline-mobile" */ "./timeline-mobile")
    .then(module => ({ default: module.TimelineMobile }))
)

// Preload components based on likely screen size transitions
const preloadTimelineComponents = {
  mobile: () => {
    // Mobile users might rotate to tablet
    import(/* webpackChunkName: "timeline-tablet" */ "./timeline-tablet")
  },
  tablet: () => {
    // Tablet users might go to mobile or desktop
    import(/* webpackChunkName: "timeline-mobile" */ "./timeline-mobile")
    import(/* webpackChunkName: "timeline-desktop" */ "./timeline-desktop")
  },
  desktop: () => {
    // Desktop users might resize to tablet
    import(/* webpackChunkName: "timeline-tablet" */ "./timeline-tablet")
  }
}

export function Timeline({ items, onItemSelect }: TimelineProps) {
  const { screenSize, isLoading } = useScreenSize()
  const [hasPreloaded, setHasPreloaded] = useState(false)

  // Preload likely components after initial render
  useEffect(() => {
    if (screenSize && !hasPreloaded) {
      // Use a short delay to avoid blocking initial render
      const timer = setTimeout(() => {
        preloadTimelineComponents[screenSize]?.()
        setHasPreloaded(true)
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [screenSize, hasPreloaded])

  // Show loading state while detecting screen size
  if (isLoading || !screenSize) {
    return <TimelineLoading screenSize="tablet" />
  }

  // Render appropriate component based on screen size
  const renderTimelineComponent = () => {
    const commonProps = { items, onItemSelect }

    switch (screenSize) {
      case 'mobile':
        return <TimelineMobile {...commonProps} />
      case 'tablet':
        return <TimelineTablet {...commonProps} />
      case 'desktop':
        return <TimelineDesktop {...commonProps} />
      default:
        return <TimelineTablet {...commonProps} />
    }
  }

  return (
    <Suspense fallback={<TimelineLoading screenSize={screenSize} />}>
      {renderTimelineComponent()}
    </Suspense>
  )
}
