"use client"

import { NavigationDots } from "@/components/ui/navigation-dots"
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
      {/* Mobile navigation dots */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-30">
        <NavigationDots
          total={HERO_CAROUSEL_IMAGES.length}
          current={currentIndex}
          onSelect={onSelect}
          variant="small"
        />
      </div>
    </div>
  )
} 