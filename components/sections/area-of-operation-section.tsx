"use client"

import { SplitLayoutSection } from "@/components/ui/split-layout-section"
import { CONTENT } from "@/data"
import { useState } from "react"

export function AreaOfOperationSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <SplitLayoutSection
      id="area-of-operation"
      title={CONTENT.AREA_OF_OPERATION.TITLE}
      subtitle={CONTENT.AREA_OF_OPERATION.SUBTITLE}
      content={isExpanded ? CONTENT.AREA_OF_OPERATION.FULL_CONTENT : CONTENT.AREA_OF_OPERATION.CONTENT}
      imageSrc={CONTENT.AREA_OF_OPERATION.IMAGE}
      imageAlt="תצלום אווירי של גזרת יהודה"
      imagePosition="right"
      panelColor="beige"
      titleInPanel={true}
      showKeywords={false}
      showDash={true}
      showCta={true}
      ctaText={isExpanded ? "טקסט מקוצר" : "לקרוא עוד"}
      ctaHref="#"
      onCtaClick={() => setIsExpanded(!isExpanded)}
      isContentExpanded={isExpanded}
    />
  )
}
