"use client"

import { SectionTitle } from "@/components/ui/section-title"
import { GradientDivider } from "@/components/ui/gradient-divider"
import { CONTENT } from "@/data"
import Image from "next/image"
import { IMAGES } from "@/constants"

// Helper function to render content with proper line breaks for poems
function renderContent(content: string) {
  return content.split('\n\n').map((paragraph, index) => {
    // Check if this paragraph is a poem (starts with "ועת נשוב")
    if (paragraph.includes('"ועת נשוב') || paragraph.includes('אל"מ שחר ברקאי')) {
      return (
        <div key={index} className="text-base sm:text-lg lg:text-xl font-medium italic">
          {paragraph.split('\n').map((line, lineIndex) => (
            <div key={lineIndex}>
              {line}
              {lineIndex < paragraph.split('\n').length - 1 && <br />}
            </div>
          ))}
        </div>
      )
    }
    
    // Regular paragraph
    return (
      <p key={index} className="text-base sm:text-lg lg:text-xl font-medium">
        {paragraph}
      </p>
    )
  })
}

export function CommanderMessageSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-amber-50 via-stone-50 to-teal-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionTitle className="text-teal-800">{CONTENT.COMMANDER_MESSAGE.TITLE}</SectionTitle>

        {/* Mobile Layout - Image inside text box */}
        <div className="lg:hidden animate-fade-in-up delay-300">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-white/50">
            <div className="prose prose-lg sm:prose-xl max-w-none text-right" dir="rtl">
              <div className="text-teal-800 leading-relaxed space-y-4 sm:space-y-6">
                {/* Commander Image - Floating inside text */}
                <div className="float-right mr-0 mb-3 sm:mb-6 ml-4 sm:ml-6">
                  <div className="relative w-32 sm:w-40 aspect-[2/3] rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={IMAGES.COMMANDER_BRIGADE}
                      alt="מפקד החטיבה"
                      fill
                      sizes="(max-width: 640px) 128px, 160px"
                      className="object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                </div>
                
                {renderContent(CONTENT.COMMANDER_MESSAGE.CONTENT)}
              </div>
            </div>
            
            {/* Decorative border */}
            <div className="mt-8 pt-6 ">
              <div className="flex items-center justify-center">
                <GradientDivider size="sm" variant="accent" />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Original Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Commander Image - Desktop */}
          <div className="lg:col-span-1 animate-fade-in-up delay-300">
            <div className="relative w-full max-w-2xl mx-auto">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl group">
                <div className="relative aspect-[2/3]">
                  <Image
                    src={IMAGES.COMMANDER_BRIGADE}
                    alt="מפקד החטיבה"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>

          {/* Message Content - Desktop */}
          <div className="lg:col-span-2 animate-fade-in-up delay-500">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-white/50">
              <div className="prose prose-lg sm:prose-xl max-w-none text-right" dir="rtl">
                <div className="text-teal-800 leading-relaxed space-y-4 sm:space-y-6">
                  {renderContent(CONTENT.COMMANDER_MESSAGE.CONTENT)}
                </div>
              </div>
              
              {/* Decorative border - Desktop */}
              <div className="mt-8 pt-4">
                <div className="flex items-center justify-center">
                  <GradientDivider size="sm" variant="accent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 