"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import type { TimelineItem } from "@/types/timeline"

interface TimelineModalProps {
  item: TimelineItem | null
  isOpen: boolean
  onClose: () => void
}

export function TimelineModal({ item, isOpen, onClose }: TimelineModalProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen && item) {
      setIsImageLoaded(false)
      setIsClosing(false)
    }
  }, [isOpen, item])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleClose = useCallback(() => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, 200)
  }, [onClose])

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }, [handleClose])

  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true)
  }, [])

  if (!isOpen || !item) return null

  return (
    <div
      className={`timeline-modal-fullscreen animate-modal-backdrop-fade ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="timeline-modal-close text-white hover:text-gray-200 transition-colors"
        aria-label="סגור חלון"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Modal content */}
      <div 
        className={`timeline-modal-image-container animate-timeline-image-zoom ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image container */}
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority
            quality={95}
            sizes="100vw"
            className={`object-contain transition-all duration-700 ${
              isImageLoaded ? 'animate-image-fade-in' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
          />

          {/* Loading state */}
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-center text-white">
                <div className="image-loading-spinner mx-auto mb-4" />
                <p className="text-sm">טוען תמונה...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
