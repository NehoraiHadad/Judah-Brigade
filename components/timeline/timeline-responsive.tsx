"use client";

import Image from "next/image";
import { CONTENT } from "@/data";
import { IMAGES, WALL_IMAGES } from "@/constants";
import { timelineData } from "@/data/timeline-data";
import { useState, useEffect } from "react";

interface TimelineResponsiveProps {
  onItemSelect: (item: any) => void;
}

export function TimelineResponsive({ onItemSelect }: TimelineResponsiveProps) {
  // Use all items except hidden ones
  const displayItems = timelineData.filter(item => !item.isHidden);
  
  // Auto-scrolling timeline carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Auto-advance carousel every 4 seconds - show 4 cards at a time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (displayItems.length - 3));
    }, 4000);
    
    return () => clearInterval(interval);
  }, [displayItems.length]);

  return (
    <div className="w-full px-4">
      {/* Header Section */}
      <div className="text-center mb-8 lg:mb-12">
        <div className="flex flex-col items-center mb-6">
          <Image 
            src={IMAGES.LOGO}
            alt="לוגו חטיבת יהודה"
            width={120}
            height={120}
            className="mb-4 sm:scale-110 lg:scale-140 transition-all"
            style={{ filter: 'sepia(5) saturate(1.8) hue-rotate(326deg) brightness(0.8) contrast(1.3)' }}
          />
          <h2 className="text-4xl sm:text-3xl lg:text-6xl font-suez-one my-6 mb-4 lg:mb-6 lg:mt-12" style={{ color: '#af6852' }}>
            {CONTENT.TIMELINE.TITLE}
          </h2>
        </div>
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-xl lg:text-4xl text-black mb-6 leading-normal text-center font-normal tracking-tight" style={{ letterSpacing: '-0.02em' }}>
            גזרת יהודה ספוגה בהיסטוריה עתיקה עוד מימי אברהם אבינו והתרחשו 
            אירועים מכוננים שהשפיעו על תולדות עמנו. ציוני הדרך מתועדים על קיר 
            גרפיטי מרשים המעביר את הצופה מסע אחורה בזמן.
          </p>
        </div>
      </div>

      {/* Desktop and Tablet View */}
      <div className="hidden sm:block relative max-w-6xl mx-auto">
        <div className="flex flex-col items-center">
          {/* Timeline Background Cards - Carousel showing 4 periods at a time */}
          <div className="flex justify-between w-full mb-6 overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * 25}%)`,
                width: `${displayItems.length * 25}%`
              }}
            >
              {displayItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="flex-shrink-0 mx-2" 
                  style={{ width: `${100 / displayItems.length}%` }}
                  onClick={() => onItemSelect(item)}
                >
                  <div className="relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="h-32 lg:h-40 relative">
                      <Image
                        src={WALL_IMAGES[index % WALL_IMAGES.length] || WALL_IMAGES[0]}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="25vw"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                    </div>
                    <div className="p-3 text-center">
                      <h3 className="text-sm lg:text-base font-bold text-gray-800">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Axis with all 14 periods */}
          <div className="w-full relative px-12 mt-6 mb-12">
            <div className="relative">
              {/* Main timeline */}
              <div className="w-full h-0.5" style={{ backgroundColor: "#e9e0d3" }} />
              
              {/* All tick marks - short and long with equal spacing */}
              <div className="absolute top-0 left-0 w-full">
                {Array.from({ length: 43 }).map((_, i) => {
                  // Every 3rd tick is a major tick for 14 periods (indices 0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42)
                  const isMajorTick = i % 3 === 0;
                  const majorTickIndex = Math.floor(i / 3);
                  const item = isMajorTick && majorTickIndex < displayItems.length ? displayItems[majorTickIndex] : null;
                  
                  return (
                    <div
                      key={`tick-${i}`}
                      className="absolute flex flex-col items-center"
                      style={{
                        left: `${(i / 42) * 100}%`,
                        transform: "translateX(-50%)",
                      }}
                    >
                      {/* Tick mark - major ticks are 2x longer than minor ticks */}
                      <div
                        className="w-0.5"
                        style={{
                          backgroundColor: "#e9e0d3",
                          height: isMajorTick ? "3rem" : "1.5rem",
                        }}
                      />

                      {/* Year label for major ticks only */}
                      {isMajorTick && item && (
                        <div className="mt-2 text-center">
                          <p className="text-sm lg:text-base font-semibold leading-tight whitespace-nowrap" style={{ color: "#d2c2a8" }}>
                            {item.date.split(' ')[0]} {item.date.split(' ')[1] || ''}
                          </p>
                          <p className="text-sm lg:text-base font-semibold leading-tight" style={{ color: "#d2c2a8" }}>
                            {item.date.includes('לפני הספירה') ? 'לפני הספירה' : 
                             item.date.includes('לספירה') ? 'לספירה' : 
                             item.date.includes('עד היום') ? 'עד היום' : ''}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View - Show all 14 periods */}
      <div className="sm:hidden">
        <div className="relative">
          {/* Vertical timeline */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 z-0" style={{ backgroundColor: "#e9e0d3" }} />
          
          {/* Timeline items */}
          <div className="space-y-8 relative z-10">
            {displayItems.map((item, index) => (
              <div key={item.id} className={`flex items-center gap-4 relative ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                {/* Timeline dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 rounded-full z-20 shadow-lg" style={{ borderColor: "#e9e0d3" }} />
                
                {/* Card */}
                <div className={`w-[45%] ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'} cursor-pointer`} onClick={() => onItemSelect(item)}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="h-28 relative">
                      <Image
                        src={WALL_IMAGES[index % WALL_IMAGES.length] || WALL_IMAGES[0]}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="50vw"
                      />
                    </div>
                    <div className="p-3 text-center">
                      <h3 className="text-sm font-bold text-gray-800 mb-1">{item.title}</h3>
                      <p className="text-xs text-gray-600">{item.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}