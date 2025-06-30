"use client"

import type { TimelineItem } from "@/types/timeline"
import { ImagePreviewModal } from "@/components/ui/image-preview-modal"

interface TimelineModalProps {
  item: TimelineItem | null
  isOpen: boolean
  onClose: () => void
}

export function TimelineModal({ item, isOpen, onClose }: TimelineModalProps) {
  if (!item) return null

  return (
    <ImagePreviewModal
      src={item.image}
      alt={item.title}
      title={item.title}
      isOpen={isOpen}
      onClose={onClose}
      className="timeline-modal"
    />
  )
}
