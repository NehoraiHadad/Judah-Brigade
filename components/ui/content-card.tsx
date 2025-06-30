import type React from "react"
import { cn } from "@/lib/utils"

interface ContentCardProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "compact" | "extended"
  animationDelay?: "none" | "300" | "500" | "700"
  enableHoverScale?: boolean
}

const variantClasses = {
  default: "p-8 sm:p-10 lg:p-12",
  compact: "p-6 sm:p-8",
  extended: "p-6 sm:p-8 lg:p-10",
}

const animationDelayClasses = {
  none: "",
  "300": "delay-300",
  "500": "delay-500", 
  "700": "delay-700",
}

export function ContentCard({ 
  children, 
  className, 
  variant = "default",
  animationDelay = "none",
  enableHoverScale = false
}: ContentCardProps) {
  return (
    <div
      className={cn(
        "bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50",
        "hover:shadow-2xl transition-all duration-300 animate-fade-in-up",
        variantClasses[variant],
        animationDelayClasses[animationDelay],
        enableHoverScale && "hover:scale-105",
        className
      )}
    >
      {children}
    </div>
  )
} 