import { useState, useCallback } from "react"

/**
 * Hook for tracking which timeline diamonds have become visible in the viewport.
 * Returns the index of the furthest diamond that has been revealed so far and
 * a callback to notify visibility. This allows path/footstep components to be
 * rendered only up to diamonds that have actually appeared, preventing
 * footsteps from showing ahead of the timeline content.
 */
export function useVisibleDiamonds() {
  const [lastVisibleIndex, setLastVisibleIndex] = useState(-1)

  /**
   * Call when a diamond becomes visible. The hook keeps the maximum index that
   * was reported so far.
   */
  const handleDiamondVisible = useCallback((index: number) => {
    setLastVisibleIndex((prev) => (index > prev ? index : prev))
  }, [])

  return { lastVisibleIndex, handleDiamondVisible }
} 