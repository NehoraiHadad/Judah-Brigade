"use client"

import { SplitLayoutSection } from "@/components/ui/split-layout-section"
import { CONTENT } from "@/data"

export function MissionSection() {
  return (
    <SplitLayoutSection
      id="mission"
      title={CONTENT.MISSION.TITLE}
      subtitle={CONTENT.MISSION.SUBTITLE}
      content={CONTENT.MISSION.CONTENT}
      imageSrc={CONTENT.MISSION.IMAGE}
      imageAlt="חיילי חטיבת יהודה במהלך משימה"
      imagePosition="left"
      panelColor="mission"
      titleInPanel={true}
      showDash={true}
      showCta={true}
      ctaText="לדבר המפקד"
      ctaHref="#commander-message"
    />
  )
}
