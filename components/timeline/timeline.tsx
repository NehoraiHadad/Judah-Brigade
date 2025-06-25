"use client"

import { Suspense, lazy } from "react"
import { useScreenSize } from "@/hooks/use-screen-size"
import { TimelineLoading } from "./timeline-loading"
import type { TimelineProps } from "@/types/timeline"

// Dynamic imports for better performance - components only load when needed
const TimelineDesktop = lazy(() => 
  import("./timeline-desktop").then(module => ({ default: module.TimelineDesktop }))
)

const TimelineTablet = lazy(() => 
  import("./timeline-tablet").then(module => ({ default: module.TimelineTablet }))
)

const TimelineMobile = lazy(() => 
  import("./timeline-mobile").then(module => ({ default: module.TimelineMobile }))
)

export function Timeline({ items, onItemSelect }: TimelineProps) {
  const { screenSize, isLoading } = useScreenSize()

  // Show loading state while detecting screen size
  if (isLoading || !screenSize) {
    return <TimelineLoading screenSize="tablet" />
  }

  // Render appropriate component based on screen size
  const renderTimelineComponent = () => {
    switch (screenSize) {
      case 'mobile':
        return <TimelineMobile items={items} onItemSelect={onItemSelect} />
      case 'tablet':
        return <TimelineTablet items={items} onItemSelect={onItemSelect} />
      case 'desktop':
        return <TimelineDesktop items={items} onItemSelect={onItemSelect} />
      default:
        return <TimelineTablet items={items} onItemSelect={onItemSelect} />
    }
  }

  return (
    <Suspense fallback={<TimelineLoading screenSize={screenSize} />}>
      {renderTimelineComponent()}
    </Suspense>
  )
}
