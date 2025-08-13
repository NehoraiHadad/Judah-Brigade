"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface KeywordsBandProps {
  className?: string
  topLine: readonly string[]
  bottomLine?: readonly string[]
}

export function KeywordsBand({ className, topLine, bottomLine = [] }: KeywordsBandProps) {
  // Create doubled content for seamless loop
  const topContent = [...topLine, ...topLine]
  const bottomContent = [...bottomLine, ...bottomLine]
  
  return (
    <div className={cn("w-full", className)} dir="rtl">
        {/* Top line - marquee left */}
        <div className="py-3 sm:py-4 overflow-hidden select-none">
          <div className="marquee-container">
            <div className="marquee marquee-left">
              {topContent.map((keyword, index) => (
                <span
                  key={`top-${index}`}
                  className="marquee-item font-semibold"
                  style={{
                    color: "#0f2d38",
                    fontFamily: "'Suez One', serif",
                    fontSize: "clamp(1.6rem, 5cqw, 2.6rem)",
                    lineHeight: 1.15,
                    whiteSpace: "nowrap",
                  }}
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom line - marquee right */}
        {bottomLine.length > 0 && (
          <div className="pb-3 sm:pb-4 overflow-hidden select-none">
            <div className="marquee-container">
              <div className="marquee marquee-right">
                {bottomContent.map((keyword, index) => (
                  <span
                    key={`bottom-${index}`}
                    className="marquee-item font-semibold"
                    style={{
                      color: "#ba644d",
                      fontFamily: "'Suez One', serif",
                      fontSize: "clamp(1.6rem, 5cqw, 2.6rem)",
                      lineHeight: 1.15,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

      {/* Local styles for marquee effect */}
      <style jsx>{`
        .marquee-container {
          overflow: hidden;
          width: 100%;
        }
        
        .marquee {
          display: inline-block;
          white-space: nowrap;
          will-change: transform;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        
        .marquee-item {
          display: inline-block;
          padding: 0 clamp(1rem, 3vw, 2.5rem);
        }
        
        .marquee-left {
          animation-name: scrollLeftContinuous;
          animation-duration: 40s;
          animation-delay: 0s;
        }
        
        .marquee-right {
          animation-name: scrollRightContinuous;
          animation-duration: 45s;
          animation-delay: 0s;
        }
        
        @keyframes scrollLeftContinuous {
          from { transform: translateX(100%); }
          to { transform: translateX(-100%); }
        }
        
        @keyframes scrollRightContinuous {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}


