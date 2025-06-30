import { useState, useCallback, useRef } from "react"

/**
 * Hook for tracking which timeline diamonds have become visible in the viewport.
 * Enhanced to prevent backwards jumps and provide stable incremental visibility.
 * Returns the index of the furthest diamond that has been revealed so far and
 * a callback to notify visibility. This allows path/footstep components to be
 * rendered only up to diamonds that have actually appeared, preventing
 * footsteps from showing ahead of the timeline content.
 */
export function useVisibleDiamonds() {
  const [lastVisibleIndex, setLastVisibleIndex] = useState(-1)
  const highestSeenRef = useRef(-1)

  /**
   * Call when a diamond becomes visible. The hook keeps the maximum index that
   * was reported so far and prevents backwards movement to ensure stable progression.
   */
  const handleDiamondVisible = useCallback((index: number) => {
    // Only update if this is actually a new maximum
    if (index > highestSeenRef.current) {
      highestSeenRef.current = index
      setLastVisibleIndex(index)
    }
  }, [])

  /**
   * Reset the visibility tracking (useful for development or route changes)
   */
  const resetVisibility = useCallback(() => {
    highestSeenRef.current = -1
    setLastVisibleIndex(-1)
  }, [])

  return { 
    lastVisibleIndex, 
    handleDiamondVisible,
    resetVisibility 
  }
} 