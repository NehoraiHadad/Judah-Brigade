"use client"

import { HeroSection } from "@/components/sections/hero-section"
import { IntroductionSection } from "@/components/sections/introduction-section"
import { AboutSection } from "@/components/sections/about-section"
import { PakalSection } from "@/components/sections/pakal-section"
import { CommanderMessageSection } from "@/components/sections/commander-message-section"
import { TimelineSection } from "@/components/sections/timeline-section"
import { WhyWeAreHereSection } from "@/components/sections/why-we-are-here-section"
import { LinksSection } from "@/components/sections/links-section"
import { FooterSection } from "@/components/sections/footer-section"

export default function JudahBrigadeLanding() {
  return (
    <div className="min-h-screen bg-stone-50" dir="rtl">
      <HeroSection />
      <IntroductionSection />
      <AboutSection />
      <PakalSection />
      <CommanderMessageSection />
      <TimelineSection />
      <WhyWeAreHereSection />
      <LinksSection />
      <FooterSection />
    </div>
  )
}
