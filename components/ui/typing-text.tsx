"use client"

import { useState, useEffect } from "react"

interface TypingTextProps {
  text: string
  speed?: number
  className?: string
  startDelay?: number
}

export function TypingText({ 
  text, 
  speed = 100, 
  className = "",
  startDelay = 0 
}: TypingTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isStarted, setIsStarted] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsStarted(true)
    }, startDelay)

    return () => clearTimeout(startTimer)
  }, [startDelay])

  useEffect(() => {
    if (!isStarted) return

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    }
  }, [currentIndex, text, speed, isStarted])

  return (
    <span className={className}>
      {displayText}
      {currentIndex < text.length && (
        <span className="animate-pulse text-amber-400">|</span>
      )}
    </span>
  )
} 