"use client"

import { useState, useEffect } from "react"

export function useSectionVisibility(sectionId: string) {
  const [isInSection, setIsInSection] = useState(false)

  useEffect(() => {
    // A small delay to ensure the DOM is fully ready
    const timeoutId = setTimeout(() => {
      const section = document.getElementById(sectionId)

      if (!section) {
        return
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target.id === sectionId) {
              setIsInSection(entry.isIntersecting)
            }
          })
        },
        {
          threshold: 0.1, // Show when 10% of the section is visible
          rootMargin: "0px",
        },
      )

      observer.observe(section)

      // Cleanup function
      return () => {
        observer.unobserve(section)
      }
    }, 100) // 100ms delay

    return () => clearTimeout(timeoutId)
  }, [sectionId])

  return isInSection
} 