"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { GradientText } from "@/components/ui/gradient-text"
import Image from "next/image"
import { CONTENT } from "@/constants"

// Curated hero images for a clean, professional look
const HERO_IMAGES = [
  {
    src: "/images/hero/hero-cave-machpelah-1.jpg",
    alt: "Cave of Machpelah - מערת המכפלה"
  },
  {
    src: "/images/hero/hero-yatir-spring.jpg", 
    alt: "Yatir Forest in Spring - יער יתיר באביב"
  },
  {
    src: "/images/hero/hero-desert-view.jpg",
    alt: "Judah Desert Landscape - נוף מדבר יהודה"
  }
]

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Gentle automatic rotation every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const scrollToNext = () => {
    const nextSection = document.querySelector('#about')
    nextSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Clean background with subtle rotation */}
      <div className="absolute inset-0">
        {HERO_IMAGES.map((image, index) => (
          <div
            key={image.src}
            className={`absolute inset-0 transition-opacity duration-3000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
              quality={95}
            />
          </div>
        ))}
        
        {/* Enhanced gradient overlay for optimal readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/65 via-black/45 to-black/75" />
        {/* Subtle brand color overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-950/30 via-transparent to-amber-950/30" />
      </div>
      
      {/* Minimal indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
        {HERO_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              index === currentImageIndex 
                ? "bg-white scale-150 shadow-lg" 
                : "bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Switch to image ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Main content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          {/* Logo section */}
          <div className="mb-4 sm:mb-6 animate-fade-in-up">
            <Logo
              src="/images/judah-brigade-logo-new.png"
              alt="סמל חטיבת יהודה"
              width={120}
              height={120}
              className="mx-auto mb-4 sm:w-[140px] sm:h-[140px] lg:w-[160px] lg:h-[160px] xl:w-[180px] xl:h-[180px] drop-shadow-lg object-contain"
              priority
            />
          </div>

          {/* Main title with enhanced gradient */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4 sm:mb-6 leading-tight animate-fade-in-up delay-300 text-center drop-shadow-lg">
            <GradientText variant="primary">
              {CONTENT.HERO.TITLE}
            </GradientText>
          </h1>

          {/* Subtitle with better spacing */}
          <div className="mb-8 sm:mb-10 animate-fade-in-up delay-500">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-stone-100 max-w-4xl mx-auto leading-relaxed text-center mb-4 drop-shadow-md">
              {CONTENT.HERO.SUBTITLE}
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-amber-400 via-white to-teal-400 mx-auto rounded-full shadow-lg"></div>
          </div>
        </div>
      
      {/* Scroll indicator positioned in corner */}
      <div className="absolute bottom-8 right-8 z-30 animate-fade-in-up delay-1000">
        <button
          onClick={scrollToNext}
          className="group flex flex-col items-center text-white/70 hover:text-white transition-all duration-300"
          aria-label="Scroll to next section"
        >
          <span className="text-xs mb-1 font-medium tracking-wide opacity-80 group-hover:opacity-100">גלה עוד</span>
          <div className="p-3 rounded-full border border-white/30 group-hover:border-white/60 transition-all duration-300 group-hover:bg-white/20 backdrop-blur-sm">
            <ChevronDown className="h-5 w-5 animate-bounce group-hover:scale-110 transition-transform duration-300" />
          </div>
        </button>
      </div>
    </section>
  )
}
