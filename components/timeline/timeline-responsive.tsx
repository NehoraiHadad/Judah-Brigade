"use client"

import { TimelineItem } from "@/types/timeline"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"

interface TimelineResponsiveProps {
  items: TimelineItem[]
  onItemSelect: (item: TimelineItem) => void
}

export function TimelineResponsive({ items, onItemSelect }: TimelineResponsiveProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 4
  const totalPages = Math.ceil(items.length / itemsPerPage)
  const displayItems = items.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  return (
    <div className="w-full px-4">
      <div className="text-center mb-8 lg:mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-800 mb-3 lg:mb-4">
          ציר הזמן של חטיבת יהודה
        </h2>
        <p className="text-base lg:text-lg text-gray-700 max-w-3xl mx-auto px-4">
          גזרת יהודה ספוגה בהיסטוריה עתיקה עוד מימי אברהם אבינו והתרחשו אירועים מכוננים שהשפיעו על תולדות עמנו. 
          ציוני הדרך מתועדים על קיר גרפיטי מרשים המעביר את הצופה מסע אחורה בזמן.
        </p>
      </div>

      {/* Desktop and Tablet View */}
      <div className="hidden sm:block relative max-w-6xl mx-auto">
        <div className="flex justify-between items-center relative">
          {/* Horizontal line */}
          <div className="absolute top-[calc(100%-2rem)] left-[5%] right-[5%] h-[3px] bg-gray-400 z-0" />
          
          {/* Desktop: 4 items, Tablet: 2 items */}
          <div className="flex justify-between w-full">
            {displayItems.map((item, index) => (
              <TimelineCard 
                key={item.id} 
                item={item} 
                onClick={() => onItemSelect(item)} 
                index={index}
                className={cn(
                  "flex-1",
                  // On tablet, show only 2 items
                  "sm:block",
                  index >= 2 && "lg:block hidden"
                )}
              />
            ))}
          </div>
        </div>

        {/* Pagination for desktop/tablet */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  currentPage === i ? "bg-amber-800 w-8" : "bg-gray-400"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Mobile View - Vertical Layout */}
      <div className="sm:hidden">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-gray-400 -translate-x-1/2 z-0" />
          
          {/* Timeline items */}
          <div className="space-y-8 relative z-10">
            {items.map((item, index) => (
              <TimelineCardMobile
                key={item.id}
                item={item}
                onClick={() => onItemSelect(item)}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface TimelineCardProps {
  item: TimelineItem
  onClick: () => void
  index: number
  className?: string
}

function TimelineCard({ item, onClick, index, className }: TimelineCardProps) {
  const bgColors = [
    { bg: "#F5DEB3", border: "#D4AF37" },
    { bg: "#E6E6FA", border: "#9370DB" },
    { bg: "#FFE4B5", border: "#FF8C00" },
    { bg: "#F0E68C", border: "#DAA520" },
  ]
  
  const colors = bgColors[index % bgColors.length]
  
  return (
    <div className={cn("flex flex-col items-center relative mx-2", className)}>
      <button
        onClick={onClick}
        className="group flex flex-col items-center w-full max-w-[200px] transition-all hover:scale-105 hover:shadow-xl"
        style={{ backgroundColor: colors.bg }}
      >
        <div className="w-full h-32 lg:h-36 relative overflow-hidden border-b-4" 
             style={{ borderColor: colors.border }}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, 200px"
          />
        </div>
        
        <div className="p-3 lg:p-4 text-center w-full">
          <h3 className="text-base lg:text-lg font-bold text-gray-800 mb-1 lg:mb-2">
            {item.title}
          </h3>
          <p className="text-xs lg:text-sm text-gray-600">{item.date}</p>
        </div>
      </button>
      
      <div className="absolute -bottom-8 w-3 h-3 lg:w-4 lg:h-4 bg-white border-[3px] rounded-full z-10" 
           style={{ borderColor: colors.border }} />
    </div>
  )
}

interface TimelineCardMobileProps {
  item: TimelineItem
  onClick: () => void
  index: number
  isLeft: boolean
}

function TimelineCardMobile({ item, onClick, index, isLeft }: TimelineCardMobileProps) {
  const bgColors = [
    { bg: "#F5DEB3", border: "#D4AF37" },
    { bg: "#E6E6FA", border: "#9370DB" },
    { bg: "#FFE4B5", border: "#FF8C00" },
    { bg: "#F0E68C", border: "#DAA520" },
  ]
  
  const colors = bgColors[index % bgColors.length]
  
  return (
    <div className={cn(
      "flex items-center gap-4 relative",
      isLeft ? "flex-row" : "flex-row-reverse"
    )}>
      {/* Timeline dot */}
      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-[3px] rounded-full z-20" 
           style={{ borderColor: colors.border }} />
      
      {/* Card */}
      <button
        onClick={onClick}
        className={cn(
          "group flex flex-col w-[45%] transition-all hover:scale-105 hover:shadow-xl",
          isLeft ? "mr-auto" : "ml-auto"
        )}
        style={{ backgroundColor: colors.bg }}
      >
        <div className="w-full h-28 relative overflow-hidden border-b-4" 
             style={{ borderColor: colors.border }}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="50vw"
          />
        </div>
        
        <div className="p-3 text-center">
          <h3 className="text-sm font-bold text-gray-800 mb-1">{item.title}</h3>
          <p className="text-xs text-gray-600">{item.date}</p>
        </div>
      </button>
    </div>
  )
}