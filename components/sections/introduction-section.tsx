"use client"

import { SplitLayoutSection } from "@/components/ui/split-layout-section"
import { CONTENT } from "@/data"

export function IntroductionSection() {
  return (
    <SplitLayoutSection
      id="introduction"
      title={CONTENT.INTRODUCTION.TITLE}
      subtitle={CONTENT.INTRODUCTION.SUBTITLE}
      showDash={true}
      content={CONTENT.INTRODUCTION.CONTENT}
      imageSrc={CONTENT.INTRODUCTION.IMAGE}
      imageAlt="חייל חטיבת יהודה במהלך פעילות"
      imagePosition="right"
      panelColor="teal"
      titleInPanel={true}
      showCta={true}
      ctaText="לקרוא עוד"
      ctaHref="#mission"
    />
  )
} 