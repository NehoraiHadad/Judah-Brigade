"use client"

import { HERO_CAROUSEL_IMAGES } from "@/constants"

interface ImageInfoDisplayProps {
  currentIndex: number
  className?: string
}

const IMAGE_INFO = [
  {
    title: "מערת המכפלה",
    description: "מקום קבורת האבות והאמהות"
  },
  {
    title: "מערת המכפלה",
    description: "המבנה ההיסטורי המרשים"
  },
  {
    title: "יער יתיר",
    description: "היער הגדול במדינת ישראל"
  },
  {
    title: "נוף מדברי",
    description: "מדבר יהודה"
  },
  {
    title: "הרי יהודה",
    description: "נוף הרי יהודה ושומרון"
  }
]

export function ImageInfoDisplay({ currentIndex, className = "" }: ImageInfoDisplayProps) {
  const currentInfo = IMAGE_INFO[currentIndex] || IMAGE_INFO[0]

  return (
    <div className={`absolute right-3 bottom-4 z-30 max-w-44 hidden md:block ${className}`}>
      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 text-white border border-white/10">
        <div className="flex items-center mb-1">
          <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse ml-1.5"></div>
          <span className="text-xs font-medium opacity-70">
            {currentIndex + 1}/{HERO_CAROUSEL_IMAGES.length}
          </span>
        </div>
        
        <h3 className="text-sm font-semibold mb-0.5 text-amber-100">
          {currentInfo.title}
        </h3>
        
        <p className="text-xs leading-tight text-stone-300 opacity-90">
          {currentInfo.description}
        </p>
        
        {/* Progress bar */}
        <div className="mt-2 w-full h-0.5 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-400 to-teal-400 transition-all duration-500 ease-out"
            style={{ width: `${((currentIndex + 1) / HERO_CAROUSEL_IMAGES.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
} 