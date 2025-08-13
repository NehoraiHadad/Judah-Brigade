import Image from "next/image"
import { cn } from "@/lib/utils"
import { CSSProperties } from "react"

interface LogoProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  style?: CSSProperties
}

export function Logo({ src, alt, width, height, className, priority = false, style }: LogoProps) {
  const containerStyle = {
    width: width || style?.width,
    height: height || style?.height,
    ...style
  }

  return (
    <div className={cn("relative", className)} style={containerStyle}>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill
        className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
        priority={priority}
        sizes={`${width || 200}px`}
      />
    </div>
  )
}
