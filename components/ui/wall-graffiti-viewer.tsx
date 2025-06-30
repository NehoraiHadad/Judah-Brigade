"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Expand } from "lucide-react"
import { useSectionVisibility } from "@/hooks/use-section-visibility"
import { ImagePreviewModal } from "@/components/ui/image-preview-modal"
import { WALL_IMAGES } from "@/constants"

export function WallGraffitiViewer() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [previewImageIndex, setPreviewImageIndex] = useState(0)
  
  // Check if user is in timeline section
  const isInTimelineSection = useSectionVisibility("timeline-section")

  // Auto-change preview image every 4 seconds (slower for better UX)
  useEffect(() => {
    if (!isInTimelineSection) return
    
    const interval = setInterval(() => {
      setPreviewImageIndex((prev) => (prev + 1) % WALL_IMAGES.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isInTimelineSection])

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Don't render if not in timeline section
  if (!isInTimelineSection) return null

  return (
    <>
      {/* Floating preview window - Responsive & Extra Small */}
      <div
        className="fixed bottom-4 right-4 w-20
                   md:bottom-5 md:right-5 md:w-32
                   bg-white/40 backdrop-blur-md rounded-xl
                   shadow-xl border border-amber-300/20 overflow-hidden z-50 
                   transition-all duration-300 ease-in-out cursor-pointer group
                   transform hover:scale-110 opacity-50 hover:opacity-100
                   ring-1 ring-amber-400/20 hover:ring-2 hover:ring-amber-500/70"
        onClick={openModal}
      >
        {/* Image preview with aspect ratio */}
        <div className="w-full aspect-[16/10] bg-gradient-to-br from-stone-200/40 to-amber-100/40 relative">
          <Image
            src={WALL_IMAGES[previewImageIndex]}
            alt={`קיר גרפיטי ציר זמן ${previewImageIndex + 1}`}
            fill
            quality={60}
            sizes="(max-width: 767px) 112px, 160px"
            className="object-cover transition-all duration-500 group-hover:brightness-105"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />

          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

          {/* Expand Icon */}
          <div
            className="absolute top-2 right-2 p-1 
                       md:p-1.5 
                       bg-black/40 rounded-full backdrop-blur-sm
                       transition-all duration-300 opacity-70 group-hover:opacity-100 group-hover:bg-black/50"
          >
            <Expand className="w-2.5 h-2.5 md:w-3 md:h-3 text-white/90" />
          </div>

          {/* Click hint overlay */}
          <div className="absolute inset-0 bg-amber-900/0 group-hover:bg-amber-900/30 
                          transition-all duration-300 flex items-center justify-center">
            <div
              className="opacity-0 group-hover:opacity-100 transition-all duration-300 
                         bg-white/95 backdrop-blur-sm 
                         px-2.5 py-1 text-[10px]
                         md:px-3 md:py-1 md:text-xs 
                         font-bold text-amber-800 shadow-lg border border-amber-200
                         rounded-full
                         transform scale-90 group-hover:scale-100"
            >
              צפייה בגלריה
            </div>
          </div>
        </div>
      </div>

      {/* Unified Modal - now using gallery mode */}
      <ImagePreviewModal
        images={WALL_IMAGES}
        initialIndex={previewImageIndex}
        isOpen={isModalOpen}
        onClose={closeModal}
        title="ציר הזמן על הקיר - גרפיטי מקורי"
        altTextPattern="קיר גרפיטי ציר זמן {index}"
      />
    </>
  )
} 