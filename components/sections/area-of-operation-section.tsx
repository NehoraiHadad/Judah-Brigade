"use client"

import { SplitLayoutSection } from "@/components/ui/split-layout-section"
import { CONTENT } from "@/data"

export function AreaOfOperationSection() {
  return (
    <SplitLayoutSection
      id="area-of-operation"
      title={CONTENT.AREA_OF_OPERATION.TITLE}
      subtitle={CONTENT.AREA_OF_OPERATION.SUBTITLE}
      content={CONTENT.AREA_OF_OPERATION.CONTENT}
      imageSrc={CONTENT.AREA_OF_OPERATION.IMAGE}
      imageAlt="תצלום אווירי של גזרת יהודה"
      imagePosition="right"
      panelColor="beige"
      titleInPanel={true}
      showKeywords={false}
      showDash={true}
      showCta={true}
      ctaText="לקרוא עוד"
      ctaHref="#pakal"
    />
  )
}
