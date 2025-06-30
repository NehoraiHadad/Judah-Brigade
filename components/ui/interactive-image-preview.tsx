"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { HERO_CAROUSEL_IMAGES } from "@/constants"

interface InteractiveImagePreviewProps {
  currentIndex: number
  onImageSelect: (index: number) => void
  className?: string
}

export function InteractiveImagePreview({ 
  currentIndex, 
  onImageSelect, 
  className = "" 
}: InteractiveImagePreviewProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className={`absolute left-6 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block ${className}`}>
      <div className="flex flex-col space-y-3">
        {HERO_CAROUSEL_IMAGES.map((image, index) => (
          <Button
            key={index}
            variant="carouselLight"
            size="icon"
            onClick={() => onImageSelect(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`relative w-16 h-12 rounded-lg overflow-hidden transition-all duration-300 p-0 ${
              index === currentIndex 
                ? "ring-2 ring-amber-400 scale-110 shadow-lg" 
                : "opacity-70 hover:opacity-100 hover:scale-105"
            }`}
            aria-label={`Switch to image ${index + 1}`}
          >
            <Image
              src={image}
              alt={`Preview ${index + 1}`}
              fill
              className="object-cover"
              sizes="64px"
            />
            
            {/* Overlay for current/hovered state */}
            <div className={`absolute inset-0 transition-opacity duration-200 ${
              index === currentIndex 
                ? "bg-amber-400/20" 
                : hoveredIndex === index 
                  ? "bg-white/20" 
                  : "bg-black/20"
            }`} />
            
            {/* Active indicator */}
            {index === currentIndex && (
              <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            )}
          </Button>
        ))}
      </div>
      
      {/* Progress indicator */}
      <div className="mt-4 w-16 h-1 bg-white/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-amber-400 transition-all duration-300 ease-out"
          style={{ width: `${((currentIndex + 1) / HERO_CAROUSEL_IMAGES.length) * 100}%` }}
        />
      </div>
    </div>
  )
} 