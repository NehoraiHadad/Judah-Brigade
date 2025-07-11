"use client"

import { useEffect, useState } from "react"
import { pathCache } from "@/utils/path-cache"

interface PerformanceMetrics {
  renderTime: number
  memoryUsage: { cacheSize: number; estimatedMemoryKB: number }
  imageLoadTime: number
  bundleSize: string
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return

    const updateMetrics = () => {
      const performanceEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]
      const navigationTiming = performanceEntries[0]
      
      const imageEntries = performance.getEntriesByType('resource').filter(
        entry => entry.name.includes('.webp') || entry.name.includes('.jpg') || entry.name.includes('.png')
      )
      
      const avgImageLoadTime = imageEntries.length > 0 
        ? imageEntries.reduce((sum, entry) => sum + entry.duration, 0) / imageEntries.length
        : 0

      const memoryUsage = pathCache.getMemoryUsage()

      setMetrics({
        renderTime: navigationTiming?.loadEventEnd - navigationTiming?.fetchStart || 0,
        memoryUsage,
        imageLoadTime: avgImageLoadTime,
        bundleSize: 'See Network tab'
      })
    }

    // Initial update
    updateMetrics()

    // Update every 5 seconds
    const interval = setInterval(updateMetrics, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(!isVisible)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isVisible])

  if (process.env.NODE_ENV !== 'development' || !isVisible || !metrics) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg text-xs font-mono z-50 max-w-xs">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Performance Metrics</h3>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-1">
        <div>
          <span className="text-gray-400">Page Load:</span> {Math.round(metrics.renderTime)}ms
        </div>
        <div>
          <span className="text-gray-400">Avg Image Load:</span> {Math.round(metrics.imageLoadTime)}ms
        </div>
        <div>
          <span className="text-gray-400">Path Cache:</span> {metrics.memoryUsage.cacheSize} entries
        </div>
        <div>
          <span className="text-gray-400">Cache Memory:</span> ~{metrics.memoryUsage.estimatedMemoryKB}KB
        </div>
        <div className="pt-2 text-xs text-gray-500">
          Press Ctrl+Shift+P to toggle
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-gray-700">
        <button
          onClick={() => {
            pathCache.forceCleanup()
            window.location.reload()
          }}
          className="text-xs bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
        >
          Clear Cache & Reload
        </button>
      </div>
    </div>
  )
} 