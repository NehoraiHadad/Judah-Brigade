"use client"

import { SectionTitle } from "@/components/ui/section-title"
import { Timeline } from "@/components/timeline/timeline"
import { TimelineModal } from "@/components/timeline/timeline-modal"
import { useTimelineModal } from "@/hooks/use-timeline-modal"
import { timelineData } from "@/data/timeline-data"

const CONTENT = {
  TIMELINE: {
    TITLE: "ציר הזמן של חטיבת יהודה",
  },
}

export function TimelineSection() {
  const { selectedItem, isOpen, openModal, closeModal } = useTimelineModal()

  return (
    <>
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-100 via-stone-100 to-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionTitle className="text-teal-800">{CONTENT.TIMELINE.TITLE}</SectionTitle>

          <Timeline items={timelineData} onItemSelect={openModal} />
        </div>
      </section>

      <TimelineModal item={selectedItem} isOpen={isOpen} onClose={closeModal} />
    </>
  )
}
