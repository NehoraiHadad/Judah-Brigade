import { useState, useMemo } from 'react'
import { useIsMobile } from './use-mobile'

interface ReadMoreConfig {
  truncateAt: string
  mobiletruncateAt?: string
}

export function useReadMore(text: string, config: ReadMoreConfig) {
  const [isExpanded, setIsExpanded] = useState(false)
  const isMobile = useIsMobile()
  
  const { truncatedText, hasMore } = useMemo(() => {
    const truncatePoint = isMobile && config.mobiletruncateAt 
      ? config.mobiletruncateAt 
      : config.truncateAt
    
    const truncateIndex = text.indexOf(truncatePoint)
    
    if (truncateIndex === -1) {
      return {
        truncatedText: text,
        hasMore: false
      }
    }
    
    const truncated = text.substring(0, truncateIndex + truncatePoint.length)
    
    return {
      truncatedText: truncated,
      hasMore: truncated.length < text.length
    }
  }, [text, config, isMobile])
  
  const displayText = isExpanded ? text : truncatedText
  
  const toggleExpanded = () => setIsExpanded(!isExpanded)
  
  return {
    displayText,
    isExpanded,
    hasMore,
    toggleExpanded
  }
} 