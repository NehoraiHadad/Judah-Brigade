"use client"

import { TimelineItem } from "@/types/timeline"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface TimelineSimpleProps {
  items: TimelineItem[]
  onItemSelect: (item: TimelineItem) => void
}

export function TimelineSimple({ items, onItemSelect }: TimelineSimpleProps) {
  return (
    <div className="w-full px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-amber-800 mb-4">ציר הזמן של חטיבת יהודה</h2>
        <p className="text-gray-700 max-w-3xl mx-auto text-lg">
          גזרת יהודה ספוגה בהיסטוריה עתיקה עוד מימי אברהם אבינו והתרחשו אירועים מכוננים שהשפיעו על תולדות עמנו. 
          ציוני הדרך מתועדים על קיר גרפיטי מרשים המעביר את הצופה מסע אחורה בזמן.
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Timeline items row */}
        <div className="flex justify-between items-center relative">
          {/* Horizontal line connecting the items */}
          <div className="absolute top-[calc(100%-2rem)] left-[10%] right-[10%] h-[3px] bg-gray-400 z-0" />
          
          {items.slice(0, 4).map((item, index) => (
            <TimelineCard key={item.id} item={item} onClick={() => onItemSelect(item)} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

interface TimelineCardProps {
  item: TimelineItem
  onClick: () => void
  index: number
}

function TimelineCard({ item, onClick, index }: TimelineCardProps) {
  // Soft pastel colors matching the design
  const bgColors = [
    { bg: "#F5DEB3", border: "#D4AF37" }, // Wheat/Gold
    { bg: "#E6E6FA", border: "#9370DB" }, // Lavender/Purple
    { bg: "#FFE4B5", border: "#FF8C00" }, // Moccasin/Orange
    { bg: "#F0E68C", border: "#DAA520" }, // Khaki/Goldenrod
  ]
  
  const colors = bgColors[index % bgColors.length]
  
  return (
    <div className="flex flex-col items-center relative">
      <button
        onClick={onClick}
        className="group flex flex-col items-center w-48 transition-all hover:scale-105 hover:shadow-xl"
        style={{ backgroundColor: colors.bg }}
      >
        {/* Image section with graffiti style */}
        <div className="w-full h-36 relative overflow-hidden border-b-4" style={{ borderColor: colors.border }}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 200px"
          />
        </div>
        
        {/* Content section */}
        <div className="p-4 text-center w-full">
          <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
          <p className="text-sm text-gray-600">{item.date}</p>
        </div>
      </button>
      
      {/* Connection dot on the timeline */}
      <div className="absolute -bottom-8 w-4 h-4 bg-white border-3 rounded-full z-10" 
           style={{ borderColor: colors.border }} />
    </div>
  )
}