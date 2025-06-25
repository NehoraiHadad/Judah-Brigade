import { cn } from "@/lib/utils"

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  variant?: "primary" | "secondary" | "accent"
  animated?: boolean
}

export function GradientText({ 
  children, 
  className, 
  variant = "primary",
  animated = false 
}: GradientTextProps) {
  const gradientClasses = {
    primary: "bg-gradient-to-r from-amber-200 via-amber-100 to-white",
    secondary: "bg-gradient-to-r from-teal-200 via-teal-100 to-white",
    accent: "bg-gradient-to-r from-amber-300 via-amber-200 to-teal-200"
  }

  return (
    <span 
      className={cn(
        "bg-clip-text text-transparent font-bold",
        gradientClasses[variant],
        animated && "animate-gradient",
        className
      )}
    >
      {children}
    </span>
  )
} 