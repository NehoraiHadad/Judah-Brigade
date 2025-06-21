import type React from "react"
interface AnimatedBackgroundProps {
  children: React.ReactNode
}

export function AnimatedBackground({ children }: AnimatedBackgroundProps) {
  return (
    <div className="relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-20 right-10 w-2 h-2 bg-amber-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 left-20 w-1 h-1 bg-amber-300/40 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 right-1/4 w-1.5 h-1.5 bg-amber-200/20 rounded-full animate-pulse delay-2000"></div>
      </div>
      {children}
    </div>
  )
}
