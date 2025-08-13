"use client"

import { Timeline } from "@/components/timeline/timeline"
import { TimelineModal } from "@/components/timeline/timeline-modal"
import { useTimelineModal } from "@/hooks/use-timeline-modal"

export function TimelineSection() {
  const { selectedItem, isOpen, openModal, closeModal } = useTimelineModal()

  return (
    <>
      <section id="timeline-section" className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-visible sm:overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <Timeline onItemSelect={openModal} />
        </div>
      </section>

      <TimelineModal item={selectedItem} isOpen={isOpen} onClose={closeModal} />
    </>
  )
}
