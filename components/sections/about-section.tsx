"use client"

import { SectionTitle } from "@/components/ui/section-title"
import { GradientDivider } from "@/components/ui/gradient-divider"
import { ContentCard } from "@/components/ui/content-card"
import { NavigationDots } from "@/components/ui/navigation-dots"
import { Button } from "@/components/ui/button"
import { useCarousel } from "@/hooks/use-carousel"
import { useReadMore } from "@/hooks/use-read-more"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { CONTENT } from "@/data"
import { CAROUSEL_IMAGES } from "@/constants"

export function AboutSection() {
  const { currentIndex, next, prev, goTo } = useCarousel(CAROUSEL_IMAGES.length)
  const { displayText, isExpanded, hasMore, toggleExpanded } = useReadMore(
    CONTENT.ABOUT.SECTOR_CHARACTERISTICS.CONTENT,
    { 
      truncateAt: "בחברון פועל גדוד העיר, האמון על ביטחון העיר חברון וסביבתה.",
      mobiletruncateAt: "הווה מאתגר ואחריות לעתיד."
    }
  )

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-stone-50 to-stone-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionTitle className="text-teal-800">{CONTENT.ABOUT.TITLE}</SectionTitle>

        {/* Vertical layout: Mission top, Sector Characteristics bottom */}
        <div className="space-y-6 sm:space-y-8 mb-12 sm:mb-16">
          
          {/* Mission Section - Compact, Full Width */}
          <ContentCard variant="compact" animationDelay="300" enableHoverScale>
            <h3 className="text-xl sm:text-2xl font-bold text-teal-800 mb-4 text-center">
              {CONTENT.ABOUT.MISSION.TITLE}
            </h3>
            <GradientDivider size="sm" variant="minimal" className="mb-6" />
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-teal-700 text-center whitespace-pre-line max-w-4xl mx-auto">
              {CONTENT.ABOUT.MISSION.CONTENT}
            </p>
          </ContentCard>

          {/* Sector Characteristics Section - Extended, Full Width */}
          <ContentCard variant="extended" animationDelay="500" enableHoverScale>
            <h3 className="text-xl sm:text-2xl font-bold text-teal-800 mb-4 text-center">
              {CONTENT.ABOUT.SECTOR_CHARACTERISTICS.TITLE}
            </h3>
            <GradientDivider size="sm" variant="minimal" className="mb-6" />
            <div className="columns-1 lg:columns-2 xl:columns-2 gap-6 lg:gap-8 text-sm sm:text-base lg:text-lg leading-relaxed text-teal-700 text-justify space-y-4">
              <p className="whitespace-pre-line break-words">
                {displayText}
              </p>
            </div>
            
            {/* Read More Button */}
            {hasMore && (
              <div className="flex justify-center mt-8">
                <Button 
                  variant="readMore" 
                  onClick={toggleExpanded}
                >
                  {isExpanded ? "הצג פחות" : "קרא עוד"}
                </Button>
              </div>
            )}
          </ContentCard>
        </div>

        {/* Brigade Activities Image Carousel */}
        <div className="relative animate-fade-in-up delay-700">
          <h3 className="text-2xl sm:text-3xl font-bold text-teal-800 mb-8 text-center">
            פעילות החטיבה ונופי הגזרה
          </h3>
          
          <div className="relative h-80 sm:h-96 lg:h-[28rem] rounded-2xl overflow-hidden shadow-2xl group">
            <Image
              src={CAROUSEL_IMAGES[currentIndex] || "/placeholder.svg"}
              alt={`תמונה ${currentIndex + 1} מפעילות החטיבה`}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
            />

            <Button
              variant="carousel"
              size="carouselIcon"
              onClick={prev}
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              aria-label="תמונה קודמת"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>

            <Button
              variant="carousel"
              size="carouselIcon"
              onClick={next}
              className="absolute left-4 top-1/2 transform -translate-y-1/2"
              aria-label="תמונה הבאה"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>

            {/* Navigation dots on image with backdrop */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-full">
              <NavigationDots
                total={CAROUSEL_IMAGES.length}
                current={currentIndex}
                onSelect={goTo}
                variant="default"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
