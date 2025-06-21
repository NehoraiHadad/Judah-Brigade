import type React from "react"
import { cn } from "@/lib/utils"

interface SectionTitleProps {
  children: React.ReactNode
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
}

const sizeClasses = {
  sm: "text-2xl sm:text-3xl md:text-4xl",
  md: "text-3xl sm:text-4xl md:text-5xl",
  lg: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
  xl: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl",
}

export function SectionTitle({ children, className, size = "lg" }: SectionTitleProps) {
  return (
    <h2
      className={cn("font-bold text-center mb-12 sm:mb-16 lg:mb-20 animate-fade-in-up", sizeClasses[size], className)}
    >
      {children}
    </h2>
  )
}
