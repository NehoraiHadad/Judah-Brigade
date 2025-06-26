"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import type { TimelineItem } from "@/types/timeline"

interface TimelineImageManagerProps {
  items: TimelineItem[]
  currentIndex: number
  onImageLoad?: (index: number) => void
  preloadCount?: number
}

export function TimelineImageManager({ 
  items, 
  currentIndex, 
  onImageLoad,
  preloadCount = 3 
}: TimelineImageManagerProps) {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const [preloadedImages, setPreloadedImages] = useState<Set<number>>(new Set())
  const preloadCache = useRef<Map<string, HTMLImageElement>>(new Map())

  // Preload images around current index
  const preloadImages = useCallback(async (centerIndex: number) => {
    const start = Math.max(0, centerIndex - preloadCount)
    const end = Math.min(items.length - 1, centerIndex + preloadCount)
    
    for (let i = start; i <= end; i++) {
      const item = items[i]
      if (!item?.image || preloadedImages.has(i)) continue

      try {
        if (!preloadCache.current.has(item.image)) {
          const img = new Image()
          img.src = item.image
          
          await new Promise((resolve, reject) => {
            img.onload = resolve
            img.onerror = reject
          })
          
          preloadCache.current.set(item.image, img)
        }
        
        setPreloadedImages(prev => new Set(prev).add(i))
      } catch (error) {
        console.warn(`Failed to preload image ${i}:`, error)
      }
    }
  }, [items, preloadCount, preloadedImages])

  // Effect to preload images when current index changes
  useEffect(() => {
    preloadImages(currentIndex)
  }, [currentIndex, preloadImages])

  // Handle individual image load
  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages(prev => new Set(prev).add(index))
    onImageLoad?.(index)
  }, [onImageLoad])

  // Get image loading priority
  const getImagePriority = useCallback((index: number) => {
    const distance = Math.abs(index - currentIndex)
    return distance === 0 || distance <= 2
  }, [currentIndex])

  // Get image quality based on distance from current
  const getImageQuality = useCallback((index: number) => {
    const distance = Math.abs(index - currentIndex)
    if (distance === 0) return 95 // Current image - highest quality
    if (distance <= 2) return 85  // Near images - high quality
    return 75                     // Far images - standard quality
  }, [currentIndex])

  return (
    <>
      {items.map((item, index) => (
        <div key={item.id} className="hidden">
          <Image
            src={item.image}
            alt={item.title}
            width={400}
            height={300}
            priority={getImagePriority(index)}
            quality={getImageQuality(index)}
            onLoad={() => handleImageLoad(index)}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>
      ))}
    </>
  )
}

// Hook for managing timeline image state
export function useTimelineImages(items: TimelineItem[]) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loadedCount, setLoadedCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const handleImageLoad = useCallback(() => {
    setLoadedCount(prev => {
      const newCount = prev + 1
      if (newCount >= Math.min(items.length, 5)) { // Consider loaded when first 5 are ready
        setIsLoading(false)
      }
      return newCount
    })
  }, [items.length])

  const getLoadingProgress = useCallback(() => {
    return Math.min((loadedCount / Math.min(items.length, 5)) * 100, 100)
  }, [loadedCount, items.length])

  return {
    currentIndex,
    setCurrentIndex,
    loadedCount,
    isLoading,
    loadingProgress: getLoadingProgress(),
    handleImageLoad,
  }
} 