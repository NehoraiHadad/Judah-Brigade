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
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-white">
        {/* Header with title and close button */}
        <div className="bg-black text-white px-6 py-3 flex items-center justify-between">
          <h2 className="text-xl font-bold">{item.title}</h2>
          <DialogClose className="hover:opacity-70 transition-opacity">
            <X className="h-6 w-6" />
          </DialogClose>
        </div>
        
        {/* Image section */}
        <div className="relative h-[400px] w-full">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
        
        {/* Content section */}
        <div className="p-6" style={{ backgroundColor: '#F5F5DC' }}>
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              {item.title}
            </h3>
            <p className="text-lg text-gray-600">{item.date}</p>
          </div>
          
          <p className="text-gray-700 leading-relaxed text-justify">
            {item.content}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
