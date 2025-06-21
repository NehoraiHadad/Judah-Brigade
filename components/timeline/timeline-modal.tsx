"use client"

import Image from "next/image"
import type { TimelineItem } from "@/types/timeline"

interface TimelineModalProps {
  item: TimelineItem | null
  isOpen: boolean
  onClose: () => void
}

export function TimelineModal({ item, isOpen, onClose }: TimelineModalProps) {
  if (!isOpen || !item) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        {/* Diamond Modal Container */}
        <div className="w-[600px] h-[600px] md:w-[700px] md:h-[700px] lg:w-[800px] lg:h-[800px] relative animate-diamond-appear">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 z-20 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 hover:scale-110 transition-all duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Direct image display */}
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            fill
            className="object-contain"
            priority={true}
            quality={90}
            sizes="(max-width: 768px) 600px, (max-width: 1024px) 700px, 800px"
          />
        </div>
      </div>
    </div>
  )
}
