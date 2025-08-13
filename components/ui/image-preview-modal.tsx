"use client"

import { useState, useCallback, useEffect } from "react"
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
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [initialTouchDistance, setInitialTouchDistance] = useState<number | null>(null)

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

  // Helper function to calculate distance between two touches (for pinch detection)
  const getTouchDistance = useCallback((touches: React.TouchList) => {
    if (touches.length < 2) return null
    const touch1 = touches[0]
    const touch2 = touches[1]
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) + 
      Math.pow(touch2.clientY - touch1.clientY, 2)
    )
  }, [])

  // Handle touch gestures for mobile swipe (improved to detect pinch)
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null)
    
    if (e.targetTouches.length === 1) {
      // Single touch - potential swipe
      setTouchStart(e.targetTouches[0].clientX)
      setInitialTouchDistance(null)
    } else if (e.targetTouches.length === 2) {
      // Two touches - potential pinch
      const distance = getTouchDistance(e.targetTouches)
      setInitialTouchDistance(distance)
      setTouchStart(null)
    }
  }, [getTouchDistance])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.targetTouches.length === 1 && touchStart !== null) {
      // Single touch movement - track for swipe
      setTouchEnd(e.targetTouches[0].clientX)
    } else if (e.targetTouches.length === 2) {
      // Two touches - this is pinch/zoom, don't interfere
      // Let the browser handle zoom naturally
      return
    }
  }, [touchStart])

  const handleTouchEnd = useCallback(() => {
    // Only process swipe if it was a single touch gesture (not pinch)
    if (!touchStart || !touchEnd || initialTouchDistance !== null) {
      setTouchStart(null)
      setTouchEnd(null)
      setInitialTouchDistance(null)
      return
    }
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && galleryImages.length > 1) {
      nextImage()
    }
    if (isRightSwipe && galleryImages.length > 1) {
      prevImage()
    }

    // Reset touch state
    setTouchStart(null)
    setTouchEnd(null)
    setInitialTouchDistance(null)
  }, [touchStart, touchEnd, initialTouchDistance, nextImage, prevImage, galleryImages.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          prevImage()
          break
        case 'ArrowRight':
          e.preventDefault()
          nextImage()
          break
        case 'Escape':
          e.preventDefault()
          handleOpenChange(false)
          break
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'

      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = ''
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, nextImage, prevImage, handleOpenChange])

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
        overlayClassName="bg-black/10 backdrop-blur-sm"
        className={`fixed inset-0 w-screen h-screen max-w-none max-h-none p-0 bg-transparent border-none shadow-none overflow-hidden ${className || ''}`}
      >
        {/* Title for accessibility */}
        {/* <DialogTitle className={title ? "absolute top-2 left-2 md:top-4 md:left-4 z-10 text-white text-sm md:text-xl font-bold bg-black/50 backdrop-blur-sm rounded px-2 py-1" : "sr-only"}>
          {title || currentAlt}
        </DialogTitle> */}

        {/* Close button - always show for consistency */}
        <Button
          variant="carousel"
          size="carouselIcon"
          className="absolute top-2 right-2 md:top-4 md:right-4 z-10 bg-black/50 backdrop-blur-sm hover:bg-black/70 w-8 h-8 md:w-10 md:h-10"
          onClick={() => handleOpenChange(false)}
          aria-label="סגור"
        >
          <X className="w-4 h-4 md:w-6 md:h-6" />
        </Button>

        <div 
          className="absolute inset-0 flex items-center justify-center p-2 md:p-4 image-modal-content"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Image Container */}
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={currentImage}
              alt={currentAlt}
              fill
              sizes="100vw"
              priority={true}
              quality={100}
              unoptimized={false}
              className={`object-contain transition-opacity duration-500 zoomable-image ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={handleImageLoad}
            />

            {/* Loading State */}
            {!isImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="text-center text-white">
                  <div className="w-6 h-6 md:w-8 md:h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2 md:mb-4" />
                  <p className="text-xs md:text-sm">טוען תמונה...</p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation buttons - only show when there are multiple images and not on small mobile */}
          {showNavigation && (
            <>
              <Button
                variant="carousel"
                size="carouselIcon"
                className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm hover:bg-black/70 w-8 h-8 md:w-10 md:h-10 hidden sm:flex z-10"
                onClick={nextImage}
                aria-label="תמונה הבאה"
              >
                <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
              </Button>

              <Button
                variant="carousel"
                size="carouselIcon"
                className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm hover:bg-black/70 w-8 h-8 md:w-10 md:h-10 hidden sm:flex z-10"
                onClick={prevImage}
                aria-label="תמונה קודמת"
              >
                <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
              </Button>
            </>
          )}
        </div>

        {/* Navigation dots - only show when there are multiple images */}
        {showNavigation && (
          <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 
                          bg-black/50 backdrop-blur-sm p-1 md:p-2 rounded-lg">
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