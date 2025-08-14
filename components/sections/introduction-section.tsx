"use client"

import { useState } from "react"
import { SplitLayoutSection } from "@/components/ui/split-layout-section"
import { CONTENT } from "@/data"

export function IntroductionSection() {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <SplitLayoutSection
      id="introduction"
      title={CONTENT.INTRODUCTION.TITLE}
      subtitle={CONTENT.INTRODUCTION.SUBTITLE}
      showDash={true}
      content={isExpanded ? (CONTENT.INTRODUCTION.FULL_CONTENT || CONTENT.INTRODUCTION.CONTENT) : CONTENT.INTRODUCTION.CONTENT}
      imageSrc={CONTENT.INTRODUCTION.IMAGE || ""}
      imageAlt="חייל חטיבת יהודה במהלך פעילות"
      imagePosition="right"
      panelColor="teal"
      titleInPanel={true}
      showCta={true}
      ctaText={isExpanded ? "טקסט מקוצר" : "לקרוא עוד"}
      onCtaClick={handleToggle}
      isContentExpanded={isExpanded}
    />
  )
} 