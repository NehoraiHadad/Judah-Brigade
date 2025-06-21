import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export function Logo({ src, alt, width = 100, height = 100, className, priority = false }: LogoProps) {
  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      className={cn("drop-shadow-2xl hover:scale-105 transition-transform duration-300", className)}
      priority={priority}
    />
  )
}
