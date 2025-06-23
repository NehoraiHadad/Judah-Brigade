"use client"

import { HERO_CAROUSEL_IMAGES } from "@/constants"

interface MobileCarouselControlsProps {
  currentIndex: number
  onNext: () => void
  onPrev: () => void
  onSelect: (index: number) => void
}

export function MobileCarouselControls({
  currentIndex,
  onNext,
  onPrev,
  onSelect
}: MobileCarouselControlsProps) {
  return (
    <div className="md:hidden">
      {/* Mobile carousel dots */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-1.5 z-30">
        {HERO_CAROUSEL_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? "bg-amber-400 scale-125" 
                : "bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
} 