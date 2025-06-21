"use client"
import type { TimelineProps } from "@/types/timeline"

export function TimelineTablet({ items, onItemSelect }: TimelineProps) {
  return (
    <div className="hidden md:block lg:hidden">
      <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="relative flex flex-col items-center animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <button onClick={() => onItemSelect(item)} className="group relative">
              <div className="w-24 h-24 transform rotate-45 border-4 border-yellow-600 hover:border-yellow-700 bg-gradient-to-br from-yellow-200 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center transform -rotate-45 p-2">
                  <div className="text-center">
                    <div className="text-xs font-bold text-yellow-800 mb-1 leading-tight">{item.title}</div>
                    <div className="text-xs text-yellow-900 font-semibold">{item.date}</div>
                  </div>
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
