"use client"

import { SectionTitle } from "@/components/ui/section-title"
import { useCarousel } from "@/hooks/use-carousel"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { CONTENT } from "@/constants"

// Brigade activity images from the available images
const BRIGADE_IMAGES = [
  "/images/google-drive/תמונות מעמרן/מפגש נחל שפן עם נחל צאלים צילום עמרן.jpg",
  "/images/google-drive/תמונות מעמרן/נוף יתיר.jpg",
  "/images/google-drive/תמונות מעמרן/נוף כרמל צילום עמרן.jpg",
  "/images/google-drive/תמונות אווירה נוספות/עותק של מאגר יתיר-אוירי.jpg",
  "/images/google-drive/תמונות אווירה נוספות/עותק של מבט כללי.jpg",
  "/images/atmosphere/carmel-view.jpg",
  "/images/desert-landscape/desert-view-1.jpg",
  "/images/yatir-forest/yatir-spring.jpg"
]

export function AboutSection() {
  const { currentIndex, next, prev, goTo } = useCarousel(BRIGADE_IMAGES.length)

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-stone-50 to-stone-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionTitle className="text-teal-800">{CONTENT.ABOUT.TITLE}</SectionTitle>

        {/* Improved Layout: 2 Vertical Cubes + 1 Horizontal Cube */}
        <div className="space-y-6 sm:space-y-8 mb-12 sm:mb-16">
          {/* Top Row: Mission and Regional Characteristics side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Mission Cube - Vertical */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in-up delay-300">
              <h3 className="text-xl sm:text-2xl font-bold text-teal-800 mb-4 text-center">
                {CONTENT.ABOUT.MISSION.TITLE}
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-teal-500 mx-auto mb-6 rounded-full"></div>
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-teal-700 text-center whitespace-pre-line">
                {CONTENT.ABOUT.MISSION.CONTENT}
              </p>
            </div>

            {/* Regional Characteristics Cube - Vertical */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in-up delay-500">
              <h3 className="text-xl sm:text-2xl font-bold text-teal-800 mb-4 text-center">
                {CONTENT.ABOUT.REGIONAL_CHARACTERISTICS.TITLE}
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-amber-400 mx-auto mb-6 rounded-full"></div>
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-teal-700 text-center">
                {CONTENT.ABOUT.REGIONAL_CHARACTERISTICS.CONTENT}
              </p>
            </div>
          </div>

          {/* Bottom Row: Area Features - Horizontal (Full Width) */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in-up delay-700">
            <h3 className="text-xl sm:text-2xl font-bold text-teal-800 mb-4 text-center">
              {CONTENT.ABOUT.AREA_FEATURES.TITLE}
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-teal-500 mx-auto mb-6 rounded-full"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-teal-700 text-center whitespace-pre-line">
                {CONTENT.ABOUT.AREA_FEATURES.CONTENT.substring(0, Math.floor(CONTENT.ABOUT.AREA_FEATURES.CONTENT.length / 2))}
              </p>
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-teal-700 text-center whitespace-pre-line">
                {CONTENT.ABOUT.AREA_FEATURES.CONTENT.substring(Math.floor(CONTENT.ABOUT.AREA_FEATURES.CONTENT.length / 2))}
              </p>
            </div>
          </div>
        </div>

        {/* Brigade Activities Image Carousel */}
        <div className="relative animate-fade-in-up delay-900">
          <h3 className="text-2xl sm:text-3xl font-bold text-teal-800 mb-8 text-center">
            פעילות החטיבה ונופי הגזרה
          </h3>
          
          <div className="relative h-80 sm:h-96 lg:h-[28rem] rounded-2xl overflow-hidden shadow-2xl group">
            <Image
              src={BRIGADE_IMAGES[currentIndex] || "/placeholder.svg"}
              alt={`תמונה ${currentIndex + 1} מפעילות החטיבה`}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
            />

            <button
              onClick={prev}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <button
              onClick={next}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {BRIGADE_IMAGES.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-amber-600 scale-125 shadow-lg"
                    : "bg-gray-300 hover:bg-gray-400 hover:scale-110"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
