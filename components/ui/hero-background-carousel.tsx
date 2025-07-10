"use client"

import { useState, useEffect, useRef, useCallback } from "react"
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
  const [preloadedImages, setPreloadedImages] = useState<Set<number>>(new Set([0]))
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Preload adjacent images
  const preloadAdjacentImages = useCallback((index: number) => {
    const imagesToPreload = new Set<number>()
    
    // Current image
    imagesToPreload.add(index)
    
    // Next and previous images
    const nextIndex = (index + 1) % HERO_CAROUSEL_IMAGES.length
    const prevIndex = (index - 1 + HERO_CAROUSEL_IMAGES.length) % HERO_CAROUSEL_IMAGES.length
    
    imagesToPreload.add(nextIndex)
    imagesToPreload.add(prevIndex)
    
    setPreloadedImages(imagesToPreload)
  }, [])

  // Sync with external index
  useEffect(() => {
    if (externalIndex !== undefined) {
      setCurrentIndex(externalIndex)
      preloadAdjacentImages(externalIndex)
    }
  }, [externalIndex, preloadAdjacentImages])

  // Notify parent of index changes
  useEffect(() => {
    onIndexChange?.(currentIndex)
  }, [currentIndex, onIndexChange])

  // Auto-play carousel
  useEffect(() => {
    if (externalIndex !== undefined) return // Don't auto-play if controlled externally
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const newIndex = (prev + 1) % HERO_CAROUSEL_IMAGES.length
        preloadAdjacentImages(newIndex)
        return newIndex
      })
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlayInterval, externalIndex, preloadAdjacentImages])

  // Handle index change with preloading
  const handleIndexChange = useCallback((newIndex: number) => {
    setCurrentIndex(newIndex)
    preloadAdjacentImages(newIndex)
  }, [preloadAdjacentImages])

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
      handleIndexChange((currentIndex + 1) % HERO_CAROUSEL_IMAGES.length)
    }
    if (isRightSwipe) {
      handleIndexChange((currentIndex - 1 + HERO_CAROUSEL_IMAGES.length) % HERO_CAROUSEL_IMAGES.length)
    }
  }

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {HERO_CAROUSEL_IMAGES.map((image, index) => {
        const isCurrentImage = index === currentIndex
        const shouldPreload = preloadedImages.has(index)
        
        return (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
              isCurrentImage ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              alt={`Hero background ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
              loading={shouldPreload ? "eager" : "lazy"}
              quality={isCurrentImage ? 90 : 75}
              sizes="100vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/60" />
          </div>
        )
      })}
      
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
            onSelect={handleIndexChange}
            variant="default"
          />
        </div>
      )}
    </div>
  )
} 