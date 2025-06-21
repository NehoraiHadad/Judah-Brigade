"use client"
import type { TimelineProps } from "@/types/timeline"

export function TimelineMobile({ items, onItemSelect }: TimelineProps) {
  return (
    <div className="block md:hidden space-y-6">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="relative flex flex-col items-center animate-fade-in-up"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <button onClick={() => onItemSelect(item)} className="group relative">
            <div className="w-20 h-20 transform rotate-45 border-3 border-yellow-600 hover:border-yellow-700 bg-gradient-to-br from-yellow-200 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center transform -rotate-45 p-1.5">
                <div className="text-center">
                  <div className="text-xs font-bold text-yellow-800 mb-0.5 leading-tight">{item.title}</div>
                  <div className="text-xs text-yellow-900 font-semibold">{item.date}</div>
                </div>
              </div>
            </div>
          </button>

          {/* Vertical Arrow for mobile */}
          {index < items.length - 1 && (
            <div className="mt-3">
              <svg width="16" height="20" viewBox="0 0 16 20" className="text-yellow-600" fill="currentColor">
                <path d="M7 0v12l-3-3h2v-9h2v9h2l-3 3v-12z" />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
