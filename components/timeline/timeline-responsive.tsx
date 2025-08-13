"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { timelineData } from '@/data/timeline-data'
import { WALL_IMAGES } from '@/constants/images'

interface TimelineResponsiveProps {
  onItemSelect: (item: any) => void
}

export function TimelineResponsive({ onItemSelect }: TimelineResponsiveProps) {
  const displayItems = timelineData;
  
  // Auto-scrolling timeline carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Auto-advance carousel every 4 seconds - show 4 cards at a time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (Math.ceil(displayItems.length / 4)));
    }, 4000);
    
    return () => clearInterval(interval);
  }, [displayItems.length]);

  return (
    <div className="w-full px-4">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 leading-tight">
            ציר זמן היסטורי
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            מסע בזמן דרך תולדות עם ישראל והקשר הנצחי לארץ ישראל
          </p>
        </div>
      </div>

      {/* Desktop and Tablet View */}
      <div className="hidden sm:block relative max-w-6xl mx-auto">
        <div className="w-full overflow-hidden">
          <div 
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * 25}%)`,
              width: `${Math.ceil(displayItems.length / 4) * 100}%`
            }}
          >
            {Array.from({ length: Math.ceil(displayItems.length / 4) }).map((_, slideIndex) => {
              const slideItems = displayItems.slice(slideIndex * 4, slideIndex * 4 + 4);
              
              return (
                <div key={slideIndex} className="flex-shrink-0" style={{ width: "100%" }}>
                  {/* Timeline Cards for this slide */}
                  <div className="flex justify-between w-full mb-6 px-4">
                    {slideItems.map((item, itemIndex) => (
                      <div key={item.id} className="flex-1 mx-2" onClick={() => onItemSelect(item)}>
                        <div className="relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                          <div className="h-32 lg:h-40 relative">
                            <Image
                              src={WALL_IMAGES[(slideIndex * 4 + itemIndex) % WALL_IMAGES.length] || WALL_IMAGES[0]}
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
                    {/* Fill empty slots if less than 4 items */}
                    {Array.from({ length: 4 - slideItems.length }).map((_, emptyIndex) => (
                      <div key={`empty-${emptyIndex}`} className="flex-1 mx-2" />
                    ))}
                  </div>

                  {/* Timeline Axis for this slide */}
                  <div className="w-full relative px-12 mt-6 mb-12">
                    <div className="relative">
                      {/* Main timeline */}
                      <div className="w-full h-0.5" style={{ backgroundColor: "#e9e0d3" }} />
                      
                      {/* Timeline marks and dates for current 4 periods */}
                      <div className="flex justify-between px-8">
                        {slideItems.map((item) => (
                          <div key={item.id} className="flex flex-col items-center">
                            {/* Long tick mark */}
                            <div 
                              className="bg-current" 
                              style={{ 
                                backgroundColor: "#e9e0d3",
                                width: "3px",
                                height: "20px",
                                marginTop: "-1px"
                              }} 
                            />
                            
                            {/* Year text */}
                            <div className="mt-2 text-center">
                              <div className="text-lg font-bold leading-tight" style={{ color: "#d2c2a8" }}>
                                {item.date.includes('לפני הספירה') ? (
                                  <>
                                    <div>{item.date.replace(' לפני הספירה', '')}</div>
                                    <div className="text-sm">לפני הספירה</div>
                                  </>
                                ) : (
                                  <div>{item.date}</div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full z-20" style={{ backgroundColor: "#d2c2a8" }} />
                
                {/* Content card */}
                <div className="flex-1 max-w-[calc(50%-2rem)]" onClick={() => onItemSelect(item)}>
                  <div className="relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="h-24 relative">
                      <Image
                        src={WALL_IMAGES[index % WALL_IMAGES.length] || WALL_IMAGES[0]}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="50vw"
                      />
                      <div className="absolute inset-0 bg-black/20" />
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
  )
}