"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react"
import { useSectionVisibility } from "@/hooks/use-section-visibility"

const WALL_IMAGES = [
  "/images/timeline/background/image.png",
  "/images/timeline/background/WhatsApp Image 2025-06-23 at 15.45.27.jpeg",
  "/images/timeline/background/WhatsApp Image 2025-06-23 at 15.45.28.jpeg",
  "/images/timeline/background/WhatsApp Image 2025-06-23 at 15.45.29.jpeg",
  "/images/timeline/background/WhatsApp Image 2025-06-23 at 15.45.30.jpeg",
  "/images/timeline/background/WhatsApp Image 2025-06-23 at 15.45.31.jpeg",
  "/images/timeline/background/WhatsApp Image 2025-06-23 at 15.45.32.jpeg",
  "/images/timeline/background/WhatsApp Image 2025-06-23 at 15.45.35.jpeg",
  "/images/timeline/background/WhatsApp Image 2025-06-23 at 15.45.36.jpeg",
  "/images/timeline/background/WhatsApp Image 2025-06-23 at 15.45.37.jpeg",
  "/images/timeline/background/WhatsApp Image 2025-06-23 at 15.45.38.jpeg",
  "/images/timeline/background/WhatsApp Image 2025-06-23 at 15.45.39.jpeg",
  "/images/timeline/background/WhatsApp Image 2025-06-23 at 15.45.40.jpeg",
  "/images/timeline/background/WhatsApp Image 2025-06-23 at 15.45.41.jpeg",
  "/images/timeline/background/WhatsApp Image 2025-06-23 at 15.45.42.jpeg",
]

export function WallGraffitiViewer() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
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
    setCurrentImageIndex(previewImageIndex)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % WALL_IMAGES.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + WALL_IMAGES.length) % WALL_IMAGES.length)
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
        <div className="w-full aspect-[16/10] bg-gradient-to-br from-stone-200/40 to-amber-100/40">
          <OptimizedImage
            src={WALL_IMAGES[previewImageIndex]}
            alt={`קיר גרפיטי ציר זמן ${previewImageIndex + 1}`}
            fill
            objectFit="cover"
            quality={60}
            sizes="(max-width: 767px) 112px, 160px"
            className="transition-all duration-500 group-hover:brightness-105"
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

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl h-[90vh] p-0 bg-black/80 backdrop-blur-lg border-none">
          <DialogHeader className="absolute top-4 left-4 z-10">
            <DialogTitle className="text-white text-xl font-bold">
              ציר הזמן על הקיר - גרפיטי מקורי
            </DialogTitle>
          </DialogHeader>

          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
            onClick={closeModal}
          >
            <X className="w-6 h-6" />
          </Button>

          {/* Main image */}
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <div className="relative w-full h-full max-w-3xl max-h-[80vh]">
              <OptimizedImage
                src={WALL_IMAGES[currentImageIndex]}
                alt={`קיר גרפיטי ציר זמן ${currentImageIndex + 1}`}
                fill
                objectFit="contain"
                quality={90}
                sizes="(max-width: 768px) 100vw, 75vw"
                className="rounded-lg"
              />
            </div>

            {/* Navigation buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 
                         text-white hover:bg-white/20 bg-black/30 backdrop-blur-sm"
              onClick={prevImage}
              disabled={WALL_IMAGES.length <= 1}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 
                         text-white hover:bg-white/20 bg-black/30 backdrop-blur-sm"
              onClick={nextImage}
              disabled={WALL_IMAGES.length <= 1}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </div>

          {/* Thumbnail navigation */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 
                          flex space-x-2 bg-black/60 backdrop-blur-sm p-2 rounded-lg">
            {WALL_IMAGES.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentImageIndex 
                    ? 'bg-amber-400 scale-125' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
} 