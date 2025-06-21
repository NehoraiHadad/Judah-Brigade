"use client"

import { useState, useCallback } from "react"

export function useCarousel(totalItems: number, initialIndex = 0) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

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

  return {
    currentIndex,
    next,
    prev,
    goTo,
  }
}
