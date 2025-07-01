"use client"

import { useState, useCallback, useRef } from "react"

export function useCarousel(totalItems: number, initialIndex = 0) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  // Touch state for swipe detection
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  // Swipe threshold in pixels
  const SWIPE_THRESHOLD = 50

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalItems)
  }, [totalItems])

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems)
  }, [totalItems])

  const goTo = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalItems) {
        setCurrentIndex(index)
      }
    },
    [totalItems],
  )

  // ==== Swipe Handlers (Mobile) ====
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchEndX.current = null
    touchStartX.current = e.targetTouches[0].clientX
  }, [])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }, [])

  const onTouchEnd = useCallback(() => {
    if (touchStartX.current === null || touchEndX.current === null) return

    const distance = touchStartX.current - touchEndX.current
    if (distance > SWIPE_THRESHOLD) {
      next()
    }
    if (distance < -SWIPE_THRESHOLD) {
      prev()
    }
  }, [next, prev])

  // Object ready to spread on any swipe-enabled element
  const swipeHandlers = {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  }

  return {
    currentIndex,
    next,
    prev,
    goTo,
    swipeHandlers,
  }
}
