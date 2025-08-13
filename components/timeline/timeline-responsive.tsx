"use client"

import { TimelineItem } from "@/types/timeline"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { CONTENT } from "@/data"
import { IMAGES } from "@/constants"

interface TimelineResponsiveProps {
  items: TimelineItem[]
  onItemSelect: (item: TimelineItem) => void
}

export function TimelineResponsive({ items, onItemSelect }: TimelineResponsiveProps) {
  // Display all items instead of pagination - show first 4 on desktop
  const displayItems = items.filter(item => !item.isHidden)

  return (
    <div className="w-full px-4">
      <div className="text-center mb-8 lg:mb-12">
        <div className="flex flex-col items-center mb-6">
          <Image 
            src={IMAGES.LOGO}
            alt="לוגו חטיבת יהודה"
            width={120}
            height={120}
            className="mb-4"
            style={{ filter: 'sepia(1) saturate(2) hue-rotate(15deg) brightness(0.8)' }}
          />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6" style={{ color: '#af6852' }}>
            {CONTENT.TIMELINE.TITLE}
          </h2>
        </div>
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-lg lg:text-xl text-black mb-6 leading-relaxed text-center">
            גזרת יהודה ספוגה בהיסטוריה עתיקה עוד מימי אברהם אבינו והתרחשו 
            אירועים מכוננים שהשפיעו על תולדות עמנו. ציוני הדרך מתועדים על קיר 
            גרפיטי מרשים המעביר את הצופה מסע אחורה בזמן.
          </p>
        </div>
      </div>

      {/* Desktop and Tablet View */}
      <div className="hidden sm:block relative max-w-6xl mx-auto">
        <div className="flex justify-between items-center relative">
          {/* Horizontal line */}
          <div className="absolute top-[calc(100%-2rem)] left-[5%] right-[5%] h-[3px] bg-gray-400 z-0" />
          
          {/* Desktop: show first 4 items in a row */}
          <div className="flex justify-between w-full">
            {displayItems.slice(0, 4).map((item, index) => (
              <TimelineCard 
                key={item.id} 
                item={item} 
                onClick={() => onItemSelect(item)} 
                index={index}
                className="flex-1"
              />
            ))}
          </div>
        </div>

      </div>

      {/* Mobile View - Vertical Layout */}
      <div className="sm:hidden">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-gray-400 -translate-x-1/2 z-0" />
          
          {/* Timeline items */}
          <div className="space-y-8 relative z-10">
            {displayItems.map((item, index) => (
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
  // צבעים בדיוק כמו בתמונה - ציבעוניות חמה של הגרפיטי
  const bgColors = [
    { bg: "#D2B48C", border: "#8B7355" }, // חום זהוב - בית שני
    { bg: "#B8860B", border: "#6B5B35" }, // זהב כהה - דוד המלך
    { bg: "#DEB887", border: "#8B7D6B" }, // חום בהיר - כלב ועכסה
    { bg: "#CD853F", border: "#8B5A2B" }, // שקד חום - אברהם אבינו
  ]
  
  const colors = bgColors[index % bgColors.length]
  
  return (
    <div className={cn("flex flex-col items-center relative mx-2", className)}>
      <button
        onClick={onClick}
        className="group flex flex-col items-center w-full max-w-[250px] transition-all hover:scale-105 hover:shadow-xl rounded-lg overflow-hidden"
        style={{ backgroundColor: colors.bg }}
      >
        <div className="w-full h-40 lg:h-48 relative overflow-hidden" 
             style={{ borderBottom: `6px solid ${colors.border}` }}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, 250px"
          />
        </div>
        
        <div className="p-4 lg:p-6 text-center w-full">
          <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">
            {item.title}
          </h3>
          <p className="text-sm lg:text-base text-gray-700 font-medium">{item.date}</p>
        </div>
      </button>
      
      <div className="absolute -bottom-6 w-4 h-4 lg:w-5 lg:h-5 bg-white border-[4px] rounded-full z-10 shadow-md" 
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
    { bg: "#D2B48C", border: "#8B7355" },
    { bg: "#B8860B", border: "#6B5B35" },
    { bg: "#DEB887", border: "#8B7D6B" },
    { bg: "#CD853F", border: "#8B5A2B" },
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