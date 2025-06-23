"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  quality?: number
  sizes?: string
  fill?: boolean
  width?: number
  height?: number
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down"
  showPlaceholder?: boolean
  onLoad?: () => void
}

export function OptimizedImage({
  src,
  alt,
  className,
  priority = false,
  quality = 90,
  sizes = "100vw",
  fill = false,
  width,
  height,
  objectFit = "contain",
  showPlaceholder = true,
  onLoad,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
    onLoad?.()
  }, [onLoad])

  const handleError = useCallback(() => {
    setHasError(true)
    setIsLoaded(true)
  }, [])

  return (
    <div className="relative w-full h-full">
      {/* Loading placeholder */}
      {showPlaceholder && !isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse">
          <div className="w-12 h-12 rounded-full bg-slate-300 animate-bounce opacity-60" />
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
          <div className="text-center text-red-600">
            <div className="w-8 h-8 mx-auto mb-2 text-red-400">⚠️</div>
            <p className="text-xs">שגיאה בטעינת התמונה</p>
          </div>
        </div>
      )}

      {/* Main image */}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        quality={quality}
        priority={priority}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "transition-all duration-700 ease-out",
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95",
          fill && `object-${objectFit}`,
          className
        )}
        style={{
          objectFit: fill ? objectFit : undefined,
          objectPosition: 'center'
        }}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      />

      {/* Shimmer effect overlay */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
      )}
    </div>
  )
} 