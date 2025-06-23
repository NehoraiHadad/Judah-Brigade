"use client"

import { SectionTitle } from "@/components/ui/section-title"
import { Timeline } from "@/components/timeline/timeline"
import { TimelineModal } from "@/components/timeline/timeline-modal"
import { useTimelineModal } from "@/hooks/use-timeline-modal"
import { timelineData } from "@/data/timeline-data"
import { CONTENT } from "@/constants"

export function TimelineSection() {
  const { selectedItem, isOpen, openModal, closeModal } = useTimelineModal()

  return (
    <>
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-100 via-stone-100 to-slate-200 relative overflow-hidden">
        {/* Graffiti-style background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-teal-800 rounded-full blur-3xl"></div>
          <div className="absolute top-32 right-20 w-24 h-24 bg-amber-600 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-teal-700 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 right-1/3 w-20 h-20 bg-amber-500 rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <SectionTitle className="text-teal-800">{CONTENT.TIMELINE.TITLE}</SectionTitle>

          <Timeline items={timelineData} onItemSelect={openModal} />
        </div>
      </section>

      <TimelineModal item={selectedItem} isOpen={isOpen} onClose={closeModal} />
    </>
  )
}
