"use client"

interface TimelineLoadingProps {
  screenSize: 'mobile' | 'tablet' | 'desktop'
}

export function TimelineLoading({ screenSize }: TimelineLoadingProps) {
  const getDiamondCount = () => {
    switch (screenSize) {
      case 'mobile': return 8 // Show fewer diamonds for mobile
      case 'tablet': return 10
      case 'desktop': return 15
      default: return 10
    }
  }

  const getLayoutClasses = () => {
    switch (screenSize) {
      case 'mobile': return 'block md:hidden'
      case 'tablet': return 'hidden md:block lg:hidden'
      case 'desktop': return 'hidden lg:block'
      default: return ''
    }
  }

  const renderMobileLayout = () => (
    <div className="w-[95%] mx-auto relative px-2 py-4">
      <div className="text-center mb-12">
        <div className="h-8 bg-gray-300 rounded animate-pulse mx-auto w-48"></div>
        <div className="mt-2 w-16 h-0.5 bg-gray-300 rounded-full mx-auto animate-pulse"></div>
      </div>
      {Array.from({ length: Math.ceil(getDiamondCount() / 2) }).map((_, pairIndex) => (
        <div key={pairIndex} className="relative mb-12 sm:mb-16">
          <div className="flex justify-start pl-4 mb-6">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 transform rotate-45 animate-pulse rounded-sm"></div>
          </div>
          {pairIndex * 2 + 1 < getDiamondCount() && (
            <div className="flex justify-end pr-4">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 transform rotate-45 animate-pulse rounded-sm"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  )

  const renderTabletLayout = () => (
    <div className="relative max-w-4xl mx-auto px-8">
      <div className="text-center mb-10">
        <div className="h-8 bg-gray-300 rounded animate-pulse mx-auto w-48"></div>
      </div>
      <div className="space-y-24">
        {Array.from({ length: Math.ceil(getDiamondCount() / 2) }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex justify-between items-center max-w-xl mx-auto">
            <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-gray-200 to-gray-300 transform rotate-45 animate-pulse rounded-sm"></div>
            <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-gray-200 to-gray-300 transform rotate-45 animate-pulse rounded-sm"></div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderDesktopLayout = () => (
    <div className="relative max-w-6xl mx-auto px-8">
      <div className="text-center mb-12">
        <div className="h-9 bg-gray-300 rounded animate-pulse mx-auto w-48"></div>
      </div>
      <div className="space-y-32 xl:space-y-36 pt-20">
        {Array.from({ length: Math.ceil(getDiamondCount() / 3) }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex justify-between items-center">
            {Array.from({ length: 3 }).map((_, itemIndex) => (
              <div 
                key={itemIndex} 
                className="w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-gray-200 to-gray-300 transform rotate-45 animate-pulse rounded-sm"
                style={{ animationDelay: `${(rowIndex * 3 + itemIndex) * 100}ms` }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )

  const renderLayout = () => {
    switch (screenSize) {
      case 'mobile': return renderMobileLayout()
      case 'tablet': return renderTabletLayout()
      case 'desktop': return renderDesktopLayout()
      default: return renderTabletLayout()
    }
  }

  return (
    <div className={getLayoutClasses()}>
      {renderLayout()}
      
      {/* Loading text */}
      <div className="text-center mt-8">
        <div className="inline-flex items-center gap-2 text-gray-600">
          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm">טוען ציר זמן...</span>
        </div>
      </div>
    </div>
  )
} 