"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface NavigationDotsProps {
  total: number
  current: number
  onSelect: (index: number) => void
  variant?: "default" | "small" | "large"
  position?: "center" | "left" | "right"
  className?: string
  showLabels?: boolean
}

export function NavigationDots({
  total,
  current,
  onSelect,
  variant = "default",
  position = "center",
  className,
  showLabels = false
}: NavigationDotsProps) {
  // Map variant to button size
  const sizeMap = {
    small: "navDotSmall",
    default: "navDot", 
    large: "navDotLarge"
  } as const

  // Define spacing based on variant
  const spacing = {
    small: "gap-1.5",
    default: "gap-2",
    large: "gap-3"
  }

  // Position classes
  const positionClasses = {
    center: "justify-center",
    left: "justify-start", 
    right: "justify-end"
  }

  return (
    <div className={cn(
      "flex items-center",
      spacing[variant],
      positionClasses[position],
      className
    )}>
      {Array.from({ length: total }, (_, index) => (
        <Button
          key={index}
          variant={index === current ? "navDotActive" : "navDot"}
          size={sizeMap[variant]}
          onClick={() => onSelect(index)}
          aria-label={showLabels ? `עבור לתמונה ${index + 1}` : `Go to slide ${index + 1}`}
        />
      ))}
    </div>
  )
} 