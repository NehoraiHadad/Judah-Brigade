"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { NavigationDots } from "@/components/ui/navigation-dots"
import { HERO_CAROUSEL_IMAGES } from "@/constants"

interface HeroBackgroundCarouselProps {
  autoPlayInterval?: number
  enableParallax?: boolean
  onIndexChange?: (index: number) => void
  externalIndex?: number
}

export function HeroBackgroundCarousel({ 
  autoPlayInterval = 6000,
  enableParallax = false,
  onIndexChange,
  externalIndex
}: HeroBackgroundCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)

  // Sync with external index
  useEffect(() => {
    if (externalIndex !== undefined) {
      setCurrentIndex(externalIndex)
    }
  }, [externalIndex])

  // Notify parent of index changes
  useEffect(() => {
    onIndexChange?.(currentIndex)
  }, [currentIndex, onIndexChange])

  // Auto-play carousel
  useEffect(() => {
    if (externalIndex !== undefined) return // Don't auto-play if controlled externally
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_CAROUSEL_IMAGES.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlayInterval, externalIndex])

  // Touch gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    
    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev + 1) % HERO_CAROUSEL_IMAGES.length)
    }
    if (isRightSwipe) {
      setCurrentIndex((prev) => (prev - 1 + HERO_CAROUSEL_IMAGES.length) % HERO_CAROUSEL_IMAGES.length)
    }
  }

  return (
    <div 
      className="absolute inset-0 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {HERO_CAROUSEL_IMAGES.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image}
            alt={`Hero background ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
            quality={90}
          />
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/60" />
        </div>
      ))}
      
      {/* Animated overlay patterns */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-600/20 via-transparent to-amber-600/20" />
      </div>
      
      {/* Navigation dots - hide when only one image */}
      {HERO_CAROUSEL_IMAGES.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <NavigationDots
            total={HERO_CAROUSEL_IMAGES.length}
            current={currentIndex}
            onSelect={setCurrentIndex}
            variant="default"
          />
        </div>
      )}
    </div>
  )
} 