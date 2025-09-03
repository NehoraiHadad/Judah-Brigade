"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { CONTENT } from "@/data"

export function ImageGallerySection() {
  const { IMAGES } = CONTENT.IMAGE_GALLERY
  const [currentStartIndex, setCurrentStartIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  
  const IMAGES_PER_SLIDE = 4
  const totalSlides = Math.ceil(IMAGES.length / IMAGES_PER_SLIDE)

  const nextSlide = () => {
    if (isTransitioning) return
    
    // Step 1: Start fade out
    setIsTransitioning(true)
    
    // Step 2: Change images after fade out completes
    setTimeout(() => {
      setCurrentStartIndex((prev) => (prev + 1) % IMAGES.length)
    }, 500) // Wait for fade out
    
    // Step 3: Start fade in
    setTimeout(() => {
      setIsTransitioning(false)
    }, 600) // Small delay after image change
  }

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [isTransitioning])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault()
        nextSlide()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Mouse wheel navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!carouselRef.current?.contains(e.target as Node)) return
      
      e.preventDefault()
      nextSlide()
    }

    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener("wheel", handleWheel, { passive: false })
      return () => carousel.removeEventListener("wheel", handleWheel)
    }
  }, [])

  const getCurrentImages = () => {
    const currentImages = []
    for (let i = 0; i < IMAGES_PER_SLIDE; i++) {
      const imageIndex = (currentStartIndex + i) % IMAGES.length
      currentImages.push(IMAGES[imageIndex])
    }
    return currentImages
  }

  return (
    <section className="w-full" ref={carouselRef}>
      <div className="grid grid-cols-2 md:grid-cols-4 w-full">
        {getCurrentImages().map((image: any, index: number) => (
          <div key={index} className="relative aspect-square overflow-hidden">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className={`object-cover transition-opacity duration-500 ease-in-out ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
              sizes="(max-width: 768px) 50vw, 25vw"
              priority={index < 2}
            />
          </div>
        ))}
      </div>
      
    </section>
  )
}
