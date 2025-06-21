"use client"

interface TimelineDiamondProps {
  title: string
  date: string
  onClick: () => void
  animationDelay?: number
}

export function TimelineDiamond({ title, date, onClick, animationDelay = 0 }: TimelineDiamondProps) {
  return (
    <div className="relative animate-fade-in-up" style={{ animationDelay: `${animationDelay}ms` }}>
      <button onClick={onClick} className="group relative">
        <div className="w-28 h-28 xl:w-32 xl:h-32 transform rotate-45 border-4 border-yellow-600 hover:border-yellow-700 bg-gradient-to-br from-yellow-200 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110 relative overflow-hidden shadow-yellow-400/30">
          {/* Content inside diamond */}
          <div className="absolute inset-0 flex items-center justify-center transform -rotate-45 p-2">
            <div className="text-center">
              <div className="text-xs xl:text-sm font-bold text-yellow-800 mb-1 leading-tight">{title}</div>
              <div className="text-xs xl:text-sm text-yellow-900 font-semibold">{date}</div>
            </div>
          </div>

          {/* Decorative corners - smaller versions */}
          <div className="absolute top-1 right-1 w-2 h-2 bg-gold-600 transform rotate-45 opacity-50"></div>
          <div className="absolute bottom-1 left-1 w-2 h-2 bg-gold-600 transform rotate-45 opacity-50"></div>

          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-gold-200/0 to-gold-300/0 group-hover:from-gold-200/20 group-hover:to-gold-300/20 transition-all duration-300"></div>
        </div>
      </button>
    </div>
  )
}
