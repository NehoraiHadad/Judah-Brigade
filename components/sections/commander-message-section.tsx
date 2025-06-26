import { SectionTitle } from "@/components/ui/section-title"
import { CONTENT } from "@/data"
import { IMAGES } from "@/constants"
import Image from "next/image"

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
                <div className="float-right mr-0 mb-4 sm:mb-6 ml-4 sm:ml-6">
                  <div className="relative w-32 h-40 sm:w-40 sm:h-48 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={IMAGES.COMMANDER_BRIGADE}
                      alt="מפקד החטיבה"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                </div>
                
                {CONTENT.COMMANDER_MESSAGE.CONTENT.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-base sm:text-lg font-medium">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            
            {/* Decorative border */}
            <div className="mt-8 pt-6 border-t border-amber-200 clear-both">
              <div className="flex items-center justify-center">
                <div className="w-16 h-1 bg-gradient-to-r from-amber-400 via-teal-500 to-amber-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Original Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Commander Image - Desktop */}
          <div className="lg:col-span-1 animate-fade-in-up delay-300">
            <div className="relative h-80 sm:h-96 lg:h-[32rem] rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src={IMAGES.COMMANDER_BRIGADE}
                alt="מפקד החטיבה"
                fill
                className="object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>

          {/* Message Content - Desktop */}
          <div className="lg:col-span-2 animate-fade-in-up delay-500">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-white/50">
              <div className="prose prose-lg sm:prose-xl max-w-none text-right" dir="rtl">
                <div className="text-teal-800 leading-relaxed space-y-4 sm:space-y-6">
                  {CONTENT.COMMANDER_MESSAGE.CONTENT.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-base sm:text-lg lg:text-xl font-medium">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              
              {/* Decorative border - Desktop */}
              <div className="mt-8 pt-4">
                <div className="flex items-center justify-center">
                  <div className="w-16 h-1 bg-gradient-to-r from-amber-400 via-teal-500 to-amber-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 