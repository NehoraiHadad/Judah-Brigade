"use client"

import Image from "next/image"
import { CONTENT } from "@/data"
import { useImageGalleryCarousel } from "@/hooks/use-image-gallery-carousel"

export function ImageGallerySection() {
  const { IMAGES } = CONTENT.IMAGE_GALLERY
  
  const {
    currentIndex,
    slideWidth,
    carouselRef,
    IMAGES_PER_SLIDE,
    MOVE_BY,
    isMobile
  } = useImageGalleryCarousel({
    imagesLength: IMAGES.length,
    autoAdvanceInterval: 4000
  })

  // Calculate transform based on device type
  const imageWidth = slideWidth / IMAGES_PER_SLIDE  // Desktop: width of single image
  const transformValue = isMobile 
    ? currentIndex * slideWidth        // Mobile: currentIndex 0,1,2... move by full slide width
    : currentIndex * imageWidth        // Desktop: move by single image width
  
  console.log('Gallery Debug:', { 
    currentIndex, 
    slideWidth,
    imageWidth,
    transformValue,
    imagesLength: IMAGES.length,
    isMobile,
    MOVE_BY
  })

  return (
    <section className="w-full overflow-hidden" ref={carouselRef}>
      <div className={`w-full ${isMobile ? 'aspect-square' : 'aspect-[4/1]'}`}>
        {/* Sliding container */}
        <div
          className="flex transition-transform duration-1000 ease-in-out h-full"
          style={{
            transform: `translateX(${transformValue}px)`,
            width: `${isMobile ? Math.floor(IMAGES.length / 4) * slideWidth : IMAGES.length * imageWidth}px`,
          }}
        >
          {isMobile ? (
            // Mobile: Create 2x2 grids
            // Note: We exclude incomplete slides (less than 4 images) to prevent white space
            // in the last slide. This ensures a better visual experience where each slide
            // shows a complete 2x2 grid instead of having orphaned images with empty spaces.
            Array.from({ length: Math.floor(IMAGES.length / 4) }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                className="grid grid-cols-2 grid-rows-2 gap-0 flex-shrink-0"
                style={{ width: `${slideWidth}px`, height: '100%' }}
              >
                {IMAGES.slice(slideIndex * 4, slideIndex * 4 + 4).map((image: any, index: number) => (
                  <div
                    key={image.src}
                    className="relative aspect-square overflow-hidden"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="50vw"
                      priority={slideIndex === 0 && index < 4}
                    />
                  </div>
                ))}
              </div>
            ))
          ) : (
            // Desktop: Single row
            IMAGES.map((image: any, index: number) => (
              <div
                key={image.src}
                className="relative aspect-square overflow-hidden flex-shrink-0"
                style={{ width: `${imageWidth}px` }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="25vw"
                  priority={index < IMAGES_PER_SLIDE}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
