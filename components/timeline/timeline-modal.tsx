"use client"

import Image from "next/image"
import { X } from "lucide-react"
import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog"
import { WALL_IMAGES } from "@/constants"
import type { TimelineItem } from "@/types/timeline"

interface TimelineModalProps {
  item: TimelineItem | null
  isOpen: boolean
  onClose: () => void
}

export function TimelineModal({ item, isOpen, onClose }: TimelineModalProps) {
  if (!item) return null

  // Use background image from WALL_IMAGES based on item ID
  const backgroundImage = WALL_IMAGES[(item.id - 1) % WALL_IMAGES.length]

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[95vh] sm:max-h-[90vh] p-0 overflow-hidden z-50" style={{ backgroundColor: "#ffffff" }} overlayClassName="bg-[#878a87]">
        <DialogTitle className="sr-only">{item.title}</DialogTitle>
        
        {/* Close button positioned at top right */}
        <DialogClose className="absolute top-4 left-4 z-10 bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors">
          <X className="h-6 w-6 text-white" />
        </DialogClose>
        
        {/* Short title at the top */}
        <div className="absolute top-2 sm:top-6 left-1/2 transform -translate-x-1/2 z-10">
          <h3 className="text-lg sm:text-2xl font-bold px-2 sm:px-4 py-1 sm:py-2 rounded" style={{ color: "#ffffff" }}>
            {item.title}
          </h3>
        </div>
        
        {/* Image section */}
        <div className="relative h-[250px] sm:h-[400px] w-full">
          <Image
            src={backgroundImage}
            alt={item.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        
        {/* Content section with header */}
        <div className="p-3 pt-0 sm:p-6 text-center overflow-y-auto max-h-[250px] sm:max-h-[300px]" style={{ backgroundColor: "#ffffff" }}>
          {/* Full title above date */}
          <h2 className="text-base sm:text-xl font-bold" style={{ color: "#ba644d" }}>
            {item.fullTitle}
          </h2>
          
          {/* Date in brown color */}
          <h3 className="text-base sm:text-xl font-bold mb-2 sm:mb-4" style={{ color: "#ba644d" }}>
            {item.date}
          </h3>
          
          {/* Content text */}
          <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-line text-black">
            {item.content}
          </div>
        </div>
        
      </DialogContent>
    </Dialog>
  )
}
