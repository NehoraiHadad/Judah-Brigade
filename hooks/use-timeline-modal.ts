"use client"

import { useState, useCallback } from "react"
import type { TimelineItem } from "@/types/timeline"

export function useTimelineModal() {
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null)

  const openModal = useCallback((item: TimelineItem) => {
    setSelectedItem(item)
  }, [])

  const closeModal = useCallback(() => {
    setSelectedItem(null)
  }, [])

  return {
    selectedItem,
    isOpen: selectedItem !== null,
    openModal,
    closeModal,
  }
}
