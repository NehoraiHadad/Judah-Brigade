"use client"

import { HERO_CAROUSEL_IMAGES } from "@/constants"

interface MobileImageInfoProps {
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

export function MobileImageInfo({ currentIndex, className = "" }: MobileImageInfoProps) {
  const currentInfo = IMAGE_INFO[currentIndex] || IMAGE_INFO[0]

  return (
    <div className={`md:hidden absolute bottom-32 left-3 right-3 z-30 ${className}`}>
      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 text-white border border-white/10">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold text-amber-100">
            {currentInfo.title}
          </h3>
          <span className="text-xs opacity-70">
            {currentIndex + 1}/{HERO_CAROUSEL_IMAGES.length}
          </span>
        </div>
        
        <p className="text-xs leading-tight text-stone-300 opacity-90 mb-2">
          {currentInfo.description}
        </p>
        
        {/* Compact progress bar */}
        <div className="w-full h-0.5 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-400 to-teal-400 transition-all duration-500 ease-out"
            style={{ width: `${((currentIndex + 1) / HERO_CAROUSEL_IMAGES.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
} 