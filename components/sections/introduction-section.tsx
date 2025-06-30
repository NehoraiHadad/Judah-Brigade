import { SectionTitle } from "@/components/ui/section-title"
import { ContentCard } from "@/components/ui/content-card"
import { GradientDivider } from "@/components/ui/gradient-divider"
import { CONTENT } from "@/data"

export function IntroductionSection() {
  return (
    <section id="introduction" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-stone-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <SectionTitle className="text-teal-800 mb-12 sm:mb-16">
          {CONTENT.INTRODUCTION.TITLE}
        </SectionTitle>
        
        <ContentCard>
          <div className="prose prose-lg sm:prose-xl lg:prose-2xl mx-auto text-center">
            <div className="text-teal-700 leading-relaxed space-y-6 whitespace-pre-line">
              {CONTENT.INTRODUCTION.CONTENT}
            </div>
          </div>
          
          {/* Decorative element */}
          <div className="flex justify-center mt-8">
            <GradientDivider size="md" variant="accent" className="shadow-lg" />
          </div>
        </ContentCard>
      </div>
    </section>
  )
} 