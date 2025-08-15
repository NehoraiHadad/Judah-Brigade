"use client";

import React from "react";
import { timelineData } from "@/data/timeline-data";
import { TimelineModal } from "@/components/timeline/timeline-modal";
import { TimelineHeader } from "@/components/timeline/timeline-header";
import { TimelineCard } from "@/components/timeline/timeline-card";
import { TimelineMarks } from "@/components/timeline/timeline-marks";
import { useTimelineModal } from "@/hooks/use-timeline-modal";
import { useTimelineCarousel } from "@/hooks/use-timeline-carousel";

export function TimelineSection() {
  const { selectedItem, isOpen, openModal, closeModal } = useTimelineModal();
  const displayItems = timelineData;

  const {
    currentIndex,
    slideWidth,
    animatingCardIndex,
    carouselRef,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useTimelineCarousel({
    itemsLength: displayItems.length,
    autoAdvanceInterval: 4000
  });

  return (
    <>
      <section
        id="timeline-section"
        className="pt-16 pb-0 sm:pt-20 lg:pt-24 bg-white relative overflow-visible sm:overflow-hidden"
      >
        <div className="w-full">
          <TimelineHeader />

          {/* Timeline Carousel */}
          <div className="relative w-full">
            <div
              ref={carouselRef}
              className="w-full overflow-hidden cursor-grab active:cursor-grabbing"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-1000 ease-in-out"
                style={{
                  transform: `translateX(${currentIndex * slideWidth}px)`,
                  width: `${displayItems.length * slideWidth}px`,
                }}
              >
                {displayItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex-shrink-0 flex flex-col w-screen sm:w-[420px]"
                  >
                    <TimelineCard
                      item={item}
                      index={index}
                      isAnimating={animatingCardIndex === index}
                      onClick={() => openModal(item)}
                    />

                    <TimelineMarks
                      item={item}
                      slideWidth={slideWidth}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <TimelineModal item={selectedItem} isOpen={isOpen} onClose={closeModal} />
    </>
  );
}