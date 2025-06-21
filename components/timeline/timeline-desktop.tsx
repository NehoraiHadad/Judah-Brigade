"use client"

import { TimelineDiamond } from "./timeline-diamond"
import { TimelineArrow } from "./timeline-arrow"
import type { TimelineProps } from "@/types/timeline"

export function TimelineDesktop({ items, onItemSelect }: TimelineProps) {
  return (
    <div className="hidden lg:block relative max-w-6xl mx-auto">
      <div className="space-y-16 xl:space-y-20">
        {/* Row 1 - Right to Left (3 items) */}
        <div className="flex justify-between items-center relative">
          {items.slice(0, 3).map((item, index) => (
            <div key={item.id} className="relative">
              <TimelineDiamond
                title={item.title}
                date={item.date}
                onClick={() => onItemSelect(item)}
                animationDelay={index * 200}
              />
              {/* Horizontal Arrow */}
              {index < 2 && (
                <div className="absolute -left-20 xl:-left-24 top-14 xl:top-16 transform -translate-y-1/2 z-10">
                  <TimelineArrow direction="horizontal-left" />
                </div>
              )}
            </div>
          ))}
          {/* Down Arrow */}
          <div className="absolute -bottom-12 right-0">
            <TimelineArrow direction="vertical-down" />
          </div>
        </div>

        {/* Row 2 - Left to Right (3 items) */}
        <div className="flex justify-between items-center relative flex-row-reverse">
          {items.slice(3, 6).map((item, index) => (
            <div key={item.id} className="relative">
              <TimelineDiamond
                title={item.title}
                date={item.date}
                onClick={() => onItemSelect(item)}
                animationDelay={(index + 3) * 200}
              />
              {/* Horizontal Arrow */}
              {index < 2 && (
                <div className="absolute -right-20 xl:-right-24 top-14 xl:top-16 transform -translate-y-1/2 z-10">
                  <TimelineArrow direction="horizontal-right" />
                </div>
              )}
            </div>
          ))}
          {/* Down Arrow */}
          <div className="absolute -bottom-12 left-0">
            <TimelineArrow direction="vertical-down" />
          </div>
        </div>

        {/* Row 3 - Right to Left (3 items) */}
        <div className="flex justify-between items-center relative">
          {items.slice(6, 9).map((item, index) => (
            <div key={item.id} className="relative">
              <TimelineDiamond
                title={item.title}
                date={item.date}
                onClick={() => onItemSelect(item)}
                animationDelay={(index + 6) * 200}
              />
              {/* Horizontal Arrow */}
              {index < 2 && (
                <div className="absolute -left-20 xl:-left-24 top-14 xl:top-16 transform -translate-y-1/2 z-10">
                  <TimelineArrow direction="horizontal-left" />
                </div>
              )}
            </div>
          ))}
          {/* Down Arrow */}
          <div className="absolute -bottom-12 right-0">
            <TimelineArrow direction="vertical-down" />
          </div>
        </div>

        {/* Row 4 - Left to Right (3 items) */}
        <div className="flex justify-between items-center relative flex-row-reverse">
          {items.slice(9, 12).map((item, index) => (
            <div key={item.id} className="relative">
              <TimelineDiamond
                title={item.title}
                date={item.date}
                onClick={() => onItemSelect(item)}
                animationDelay={(index + 9) * 200}
              />
              {/* Horizontal Arrow */}
              {index < 2 && (
                <div className="absolute -right-20 xl:-right-24 top-14 xl:top-16 transform -translate-y-1/2 z-10">
                  <TimelineArrow direction="horizontal-right" />
                </div>
              )}
            </div>
          ))}
          {/* Down Arrow */}
          <div className="absolute -bottom-12 left-0">
            <TimelineArrow direction="vertical-down" />
          </div>
        </div>

        {/* Row 5 - Final 2 items */}
        <div className="flex justify-start items-center relative gap-32">
          {items.slice(12, 14).map((item, index) => (
            <div key={item.id} className="relative">
              <TimelineDiamond
                title={item.title}
                date={item.date}
                onClick={() => onItemSelect(item)}
                animationDelay={(index + 12) * 200}
              />
              {/* Final Arrow */}
              {index === 0 && (
                <div className="absolute -left-20 xl:-left-24 top-14 xl:top-16 transform -translate-y-1/2 z-10">
                  <TimelineArrow direction="horizontal-left" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
