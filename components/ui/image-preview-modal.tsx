"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { NavigationDots } from "@/components/ui/navigation-dots"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface ImagePreviewModalProps {
  // For single image
  src?: string
  alt?: string
  // For gallery
  images?: readonly string[]
  initialIndex?: number
  altTextPattern?: string 
  // Common props
  isOpen: boolean
  onClose: () => void
  title?: string
  className?: string
}

export function ImagePreviewModal({ 
  src, 
  alt, 
  images, 
  initialIndex = 0,
  altTextPattern = "תמונה {index}",
  isOpen, 
  onClose, 
  title,
  className 
}: ImagePreviewModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  // Determine if we're in gallery mode
  const isGallery = images && images.length > 0
  const galleryImages = isGallery ? images : (src ? [src] : [])
  
  if (galleryImages.length === 0) return null

  const currentImage = galleryImages[currentIndex]
  const currentAlt = isGallery 
    ? altTextPattern.replace('{index}', (currentIndex + 1).toString())
    : alt || title || "תמונה"

  const handleOpenChange = useCallback((open: boolean) => {
    if (!open) {
      onClose()
    }
  }, [onClose])

  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true)
  }, [])

  const nextImage = useCallback(() => {
    if (galleryImages.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
      setIsImageLoaded(false)
    }
  }, [galleryImages.length])

  const prevImage = useCallback(() => {
    if (galleryImages.length > 1) {
      setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
      setIsImageLoaded(false)
    }
  }, [galleryImages.length])

  const goToImage = useCallback((index: number) => {
    setCurrentIndex(index)
    setIsImageLoaded(false)
  }, [])

  // Reset to initial index when modal opens
  const handleDialogOpenChange = useCallback((open: boolean) => {
    if (open) {
      setCurrentIndex(isGallery ? initialIndex : 0)
      setIsImageLoaded(false)
    }
    handleOpenChange(open)
  }, [isGallery, initialIndex, handleOpenChange])

  const showNavigation = galleryImages.length > 1

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
      <DialogContent 
        className={`max-w-4xl h-[90vh] p-0 bg-black/80 backdrop-blur-lg border-none ${className || ''}`}
      >
        {/* Title for accessibility */}
        <DialogTitle className={title ? "absolute top-4 left-4 z-10 text-white text-xl font-bold" : "sr-only"}>
          {title || currentAlt}
        </DialogTitle>

        {/* Close button - always show for consistency */}
        <Button
          variant="carousel"
          size="carouselIcon"
          className="absolute top-4 right-4 z-10"
          onClick={() => handleOpenChange(false)}
          aria-label="סגור"
        >
          <X className="w-6 h-6" />
        </Button>

        <div className="relative w-full h-full flex items-center justify-center p-4">
          {/* Main Image */}
          <div className="relative w-full h-full max-w-3xl max-h-[80vh]">
            <Image
              src={currentImage}
              alt={currentAlt}
              fill
              priority
              quality={90}
              sizes="(max-width: 768px) 100vw, 75vw"
              className={`object-contain rounded-lg transition-opacity duration-500 ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={handleImageLoad}
            />

            {/* Loading State */}
            {!isImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                <div className="text-center text-white">
                  <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-sm">טוען תמונה...</p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation buttons - only show when there are multiple images */}
          {showNavigation && (
            <>
              <Button
                variant="carousel"
                size="carouselIcon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2"
                onClick={nextImage}
                aria-label="תמונה הבאה"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <Button
                variant="carousel"
                size="carouselIcon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                onClick={prevImage}
                aria-label="תמונה קודמת"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </>
          )}
        </div>

        {/* Navigation dots - only show when there are multiple images */}
        {showNavigation && (
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 
                          bg-black/60 backdrop-blur-sm p-2 rounded-lg">
            <NavigationDots
              total={galleryImages.length}
              current={currentIndex}
              onSelect={goToImage}
              variant="default"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
} 