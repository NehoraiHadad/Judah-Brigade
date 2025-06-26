import { SectionTitle } from "@/components/ui/section-title"
import { CONTENT } from "@/data"

export function IntroductionSection() {
  return (
    <section id="introduction" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-stone-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <SectionTitle className="text-teal-800 mb-12 sm:mb-16">
          {CONTENT.INTRODUCTION.TITLE}
        </SectionTitle>
        
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 lg:p-12 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 animate-fade-in-up">
          <div className="prose prose-lg sm:prose-xl lg:prose-2xl mx-auto text-center">
            <div className="text-teal-700 leading-relaxed space-y-6 whitespace-pre-line">
              {CONTENT.INTRODUCTION.CONTENT}
            </div>
          </div>
          
          {/* Decorative element */}
          <div className="flex justify-center mt-8">
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 via-teal-500 to-amber-400 rounded-full shadow-lg"></div>
          </div>
        </div>
      </div>
    </section>
  )
} 