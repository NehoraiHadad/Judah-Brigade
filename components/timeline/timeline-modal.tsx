"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimelineModalProps {
  isOpen: boolean
  onClose: () => void
  data: {
    title: string
    date: string
    content: string
    image: string
  }
  onPrevious?: () => void
  onNext?: () => void
  canGoPrevious?: boolean
  canGoNext?: boolean
}

export function TimelineModal({
  isOpen,
  onClose,
  data,
  onPrevious,
  onNext,
  canGoPrevious = false,
  canGoNext = false,
}: TimelineModalProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <Card className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl animate-scale-in bg-gradient-to-br from-white via-stone-50 to-amber-50 border-2 border-amber-200">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-white/80 hover:bg-white/90 text-stone-600 hover:text-stone-800 border border-stone-200 shadow-md"
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Navigation buttons */}
        {canGoPrevious && onPrevious && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrevious}
            className="absolute top-1/2 left-4 z-10 h-10 w-10 rounded-full bg-white/80 hover:bg-white/90 text-stone-600 hover:text-stone-800 border border-stone-200 shadow-md transform -translate-y-1/2"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}

        {canGoNext && onNext && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onNext}
            className="absolute top-1/2 right-4 z-10 h-10 w-10 rounded-full bg-white/80 hover:bg-white/90 text-stone-600 hover:text-stone-800 border border-stone-200 shadow-md transform -translate-y-1/2"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        )}

        <CardContent className="p-0 flex flex-col lg:flex-row max-h-[90vh]">
          {/* Image section */}
          <div className="lg:w-1/2 relative bg-stone-100 min-h-[300px] lg:min-h-[500px]">
            <Image
              src={data.image}
              alt={data.title}
              fill
              quality={90}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={cn(
                "object-contain transition-opacity duration-700",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setImageLoaded(true)}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
            
            {/* Image loading placeholder */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            )}
          </div>

          {/* Content section */}
          <div className="lg:w-1/2 p-6 lg:p-8 overflow-y-auto">
            <div className="space-y-4">
              {/* Date badge */}
              <div className="inline-block px-3 py-1 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-sm font-semibold rounded-full shadow-md">
                {data.date}
              </div>

              {/* Title */}
              <h2 className="text-2xl lg:text-3xl font-bold text-stone-800 leading-tight">
                {data.title}
              </h2>

              {/* Decorative line */}
              <div className="w-16 h-1 bg-gradient-to-r from-amber-400 via-teal-500 to-amber-400 rounded-full"></div>

              {/* Content */}
              <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed">
                {data.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-base lg:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Navigation indicators */}
              {(canGoPrevious || canGoNext) && (
                <div className="flex items-center justify-center space-x-2 pt-4 border-t border-stone-200">
                  <span className="text-xs text-stone-500">
                    {canGoPrevious && "◀ "}
                    הקש על החצים לניווט
                    {canGoNext && " ▶"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
