import { HeroSection } from "@/components/sections/hero-section"
import { IntroductionSection } from "@/components/sections/introduction-section"
import { MissionSection } from "@/components/sections/mission-section"
import { AreaOfOperationSection } from "@/components/sections/area-of-operation-section"
import { ValuesBandSection } from "@/components/sections/values-band-section"
import { ImageGallerySection } from "@/components/sections/image-gallery-section"
import { PakalSection } from "@/components/sections/pakal-section"
import { CommanderMessageSection } from "@/components/sections/commander-message-section"
import nextDynamic from "next/dynamic"

// Route Segment Config for optimal performance
export const dynamic = 'auto'
export const revalidate = 86400 // Revalidate daily (24 hours)
export const fetchCache = 'default-cache'

// Lazy load below-the-fold sections for better performance
const TimelineSection = nextDynamic(() => import("@/components/sections/timeline-section").then(mod => ({ default: mod.TimelineSection })), {
  loading: () => <div className="h-96 flex items-center justify-center bg-gradient-to-br from-stone-50 to-amber-50"><div className="animate-pulse text-amber-600 font-semibold">טוען ציר זמן...</div></div>
})

const WhyWeAreHereSection = nextDynamic(() => import("@/components/sections/why-we-are-here-section").then(mod => ({ default: mod.WhyWeAreHereSection })), {
  loading: () => <div className="h-64 flex items-center justify-center bg-gradient-to-br from-stone-50 to-teal-50"><div className="animate-pulse text-teal-600 font-semibold">טוען תוכן...</div></div>
})

const LinksSection = nextDynamic(() => import("@/components/sections/links-section").then(mod => ({ default: mod.LinksSection })), {
  loading: () => <div className="h-32 bg-gradient-to-br from-amber-50 to-stone-50"></div>
})

const FooterSection = nextDynamic(() => import("@/components/sections/footer-section").then(mod => ({ default: mod.FooterSection })), {
  loading: () => <div className="h-24 bg-stone-800"></div>
})

export default function JudahBrigadeLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      {/* Above-the-fold - load immediately */}
      <HeroSection />
      <IntroductionSection />
      <MissionSection />
      <AreaOfOperationSection />
      <ValuesBandSection />
      <ImageGallerySection />
      <PakalSection />
      <CommanderMessageSection />
      
      {/* Below-the-fold - lazy loaded */}
      <TimelineSection />
      <WhyWeAreHereSection />
      <LinksSection />
      <FooterSection />
    </div>
  )
}
