"use client"

import Image from "next/image"
import { X } from "lucide-react"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { IMAGES } from "@/constants"
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
        {/* Header with logo, title and close button */}
        <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image 
              src={IMAGES.LOGO}
              alt="לוגו חטיבת יהודה"
              width={60}
              height={60}
              className="object-contain"
            />
            <h2 className="text-2xl font-bold">{item.title}</h2>
          </div>
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
        
        {/* Content section with white background and simple styling */}
        <div className="p-8 relative bg-white">
          <div className="text-right">
            <h3 className="text-2xl font-bold text-orange-600 mb-3">{item.title}</h3>
            <p className="text-lg text-orange-500 font-medium mb-6">{item.date}</p>
            
            <p className="text-base text-gray-700 leading-relaxed">
              {item.content}
            </p>
          </div>
          
          {/* Red circle with text - positioned like in the image */}
          <div className="absolute bottom-6 right-6 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold text-center leading-tight shadow-lg">
            לפרטים
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
