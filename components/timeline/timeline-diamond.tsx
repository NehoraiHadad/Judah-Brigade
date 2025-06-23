"use client"

import { useState, useEffect } from "react"
import { OptimizedImage } from "@/components/ui/optimized-image"

interface TimelineDiamondProps {
  title: string
  date: string
  image: string
  onClick: () => void
  animationDelay?: number
}

export function TimelineDiamond({ title, date, image, onClick, animationDelay = 0 }: TimelineDiamondProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, animationDelay)
    
    return () => clearTimeout(timer)
  }, [animationDelay])

  const handleImageLoad = () => {
    setIsLoaded(true)
  }

  return (
    <div
      className={`group relative w-32 h-32 lg:w-40 lg:h-40 cursor-pointer transition-all duration-500 ease-out
                  hover:scale-110 hover:z-10 ${
                    isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
                  }`}
      style={{ animationDelay: `${animationDelay}ms` }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Diamond shape container */}
      <div className="relative w-full h-full transform rotate-45 overflow-hidden timeline-diamond-glow">
        {/* Diamond background with enhanced gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200 
                        group-hover:from-amber-100 group-hover:via-amber-200 group-hover:to-amber-300 
                        transition-all duration-500 border-2 border-amber-300 group-hover:border-amber-400
                        shadow-lg group-hover:shadow-xl" />

        {/* Timeline image preview */}
        <div className="absolute inset-2 overflow-hidden rounded-sm bg-white/80">
          <div className="w-full h-full transform -rotate-45 scale-110 origin-center flex items-center justify-center">
            <div className="w-full h-full relative">
              <OptimizedImage
                src={image}
                alt={title}
                fill
                quality={75}
                sizes="(max-width: 768px) 128px, 160px"
                objectFit="contain"
                onLoad={handleImageLoad}
                showPlaceholder={false}
                className={`transition-all duration-700 ${
                  isLoaded ? 'opacity-90 group-hover:opacity-100' : 'opacity-0'
                }`}
              />
            </div>
            
            {/* Loading placeholder */}
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-amber-50">
                <div className="w-6 h-6 bg-amber-400 rounded-full animate-pulse opacity-60" />
              </div>
            )}
          </div>
        </div>

        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Shine effect on hover */}
        <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent
                        transform transition-transform duration-700 ${
                          isHovered ? 'translate-x-full' : '-translate-x-full'
                        }`} />
      </div>

      {/* Title and date - positioned to avoid overlap */}
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-max max-w-36 lg:max-w-44 z-20 pointer-events-none">
        <div className={`transition-all duration-300 ${
          isHovered ? 'transform -translate-y-1 scale-105' : ''
        }`}>
          <p className="text-xs lg:text-sm font-bold text-center text-amber-900 
                       group-hover:text-amber-950 transition-colors duration-300 leading-tight
                       drop-shadow-sm bg-white/80 px-2 py-1 rounded-md backdrop-blur-sm">
            {title}
          </p>
        </div>
      </div>

      {/* Pulse animation ring on load */}
      {isVisible && !isLoaded && (
        <div className="absolute inset-0 animate-pulse-glow">
          <div className="w-full h-full transform rotate-45 border-2 border-amber-400 opacity-60" />
        </div>
      )}

      {/* Hover indicator */}
      {isHovered && isLoaded && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 rounded-full 
                        animate-bounce shadow-lg border-2 border-white">
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}
