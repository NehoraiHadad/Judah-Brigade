"use client"

import Image from "next/image"
import { X } from "lucide-react"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import type { TimelineItem } from "@/types/timeline"

interface TimelineModalProps {
  item: TimelineItem | null
  isOpen: boolean
  onClose: () => void
}

export function TimelineModal({ item, isOpen, onClose }: TimelineModalProps) {
  if (!item) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white relative">
        {/* Header with title and close button */}
        <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{item.title}</h2>
          <DialogClose className="hover:opacity-70 transition-opacity">
            <X className="h-7 w-7" />
          </DialogClose>
        </div>
        
        {/* Image section - larger and more prominent */}
        <div className="relative h-[500px] w-full">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 1024px"
          />
        </div>
        
        {/* Content section with beige background */}
        <div className="p-8 relative" style={{ backgroundColor: '#F5F5DC' }}>
          <div className="mb-6">
            <h3 className="text-3xl font-bold text-orange-800 mb-2">
              {item.title} קונה את מערת המכפלה
            </h3>
            <p className="text-xl text-orange-700 font-medium">{item.date}</p>
          </div>
          
          <div className="text-right">
            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              {item.content}
            </p>
            
            <p className="text-lg text-gray-800 leading-relaxed">
              נמר כל הנקרא עכר במקפיות מכל עתרים. דמ עד צדת עליהם. קין עתן 
              תחזור מעורה בשועה ה-80 של המעורה ברמות ציקלון. קין עתן תחזור תלוח המעיד בה המעוח תמותן 
              השפה המעורה ציפה תמעא מעופרת מעי תביאן והיתן מיירים הח הנח המעי פעפורים
              שלי תביאן והיתן מיירן הח הנח המעי פעופים
            </p>
          </div>
          
          {/* Red circle with text - positioned like in the image */}
          <div className="absolute bottom-6 right-6 w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold text-center leading-tight shadow-lg">
            לראות
            <br />
            לפרטים
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
