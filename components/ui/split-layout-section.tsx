"use client";

import React, { useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface SplitLayoutSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  showDash?: boolean;
  content: string | ReactNode;
  imageSrc: string;
  imageAlt: string;
  imagePosition: "left" | "right";
  panelColor: "beige" | "orange" | "teal" | "mission";
  showCta?: boolean;
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  isContentExpanded?: boolean;
  showKeywords?: boolean;
  keywords?: readonly string[];
  titleInPanel?: boolean;
  className?: string;
  /** Tailwind aspect-ratio class to control the element shape (e.g. "aspect-square", "aspect-video"). Defaults to "aspect-square". */
  aspectClass?: string;
}

const panelColorClasses = {
  beige: "text-black",
  orange:
    "bg-gradient-to-br from-orange-600 via-red-500 to-orange-700 text-white",
  teal: "text-black",
  mission: "text-white",
};

const textColorClasses = {
  beige: "text-black",
  orange: "text-white",
  teal: "text-black",
  mission: "text-white",
};

export function SplitLayoutSection({
  id,
  title,
  subtitle,
  showDash = false,
  content,
  imageSrc,
  imageAlt,
  imagePosition = "right",
  panelColor = "beige",
  showCta = false,
  ctaText,
  ctaHref,
  onCtaClick,
  isContentExpanded = false,
  showKeywords = false,
  keywords = [],
  titleInPanel = false,
  aspectClass = "aspect-square",
  className,
}: SplitLayoutSectionProps) {
  const isImageLeft = imagePosition === "left";
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  const handleContentToggle = useCallback(() => {
    if (isAnimating || !onCtaClick) return;
    
    setIsAnimating(true);
    onCtaClick();
    
    // Reset animation state after completion
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  }, [isAnimating, onCtaClick]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      id={id}
      className={cn("bg-gradient-to-b from-stone-50 to-white", className)}
    >
      <div className="w-full">
        {/* Full width container */}

        {/* Unified Responsive Layout - Square Aspect Ratio */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0 items-stretch">
          {/* Image */}
          <div
            className={cn(
              `relative w-full ${aspectClass} animate-fade-in-up delay-200`,
              isImageLeft ? "lg:order-1" : "lg:order-2"
            )}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-all duration-700"
            />
          </div>

          {/* Content Panel */}
          <div
            className={cn(
              `relative w-full ${aspectClass} animate-fade-in-up delay-300 lg:delay-500`,
              isImageLeft ? "lg:order-2" : "lg:order-1"
            )}
          >
            <div
              className="relative w-full h-full flex flex-col"
              style={{
                backgroundColor:
                  panelColor === "mission" ? "#ba644d" : "#f1ede5",
                containerType: "inline-size",
              }}
            >
              {/* Main Content Area */}
                <div
                  className="relative flex-1 flex flex-col justify-center overflow-hidden"
                  style={{ 
                    padding: "clamp(3.5rem, 16cqw, 10rem)",
                    paddingBottom: "clamp(5.5rem, 24cqw, 15rem)"
                  }}
                >
                <div className="prose max-w-none text-center lg:text-right" dir="rtl">
                  <div className="space-y-4">
                    {titleInPanel && (
                      <div className="mb-4 sm:mb-6">
                        <h2
                          className="font-medium leading-tight flex items-center justify-center lg:justify-start gap-3"
                          style={{
                            color:
                              panelColor === "mission" ? "#0f2d38" : "#ba644d",
                            fontFamily: "'Suez One', serif",
                            fontSize: "clamp(2.2rem, 8cqw, 3.3rem)",
                            lineHeight: 1.15,
                          }}
                        >
                          {showDash && (
                            <span
                              style={{
                                color:
                                  panelColor === "mission"
                                    ? "#cec2ab"
                                    : "#000000",
                              }}
                            >
                              -
                            </span>
                          )}
                          {title}
                        </h2>
                        {subtitle && (
                          <h3
                            className="font-normal leading-tight"
                            style={{
                              color:
                                panelColor === "mission" ? "#0f2d38" : "#ba644d",
                              fontFamily: "'Suez One', serif",
                              fontSize: "clamp(2rem, 6cqw, 2.9rem)",
                              lineHeight: 1.2,
                            }}
                          >
                            {subtitle}
                          </h3>
                        )}
                      </div>
                    )}

                    {typeof content === "string" ? (
                      <div 
                        className={cn(
                          "leading-relaxed",
                          onCtaClick ? [
                            "transition-all duration-700 ease-in-out",
                            isContentExpanded 
                              ? isMobile 
                                ? "max-h-[220vh] overflow-visible opacity-100" 
                                : "max-h-[50vh] overflow-y-auto custom-scrollbar opacity-100"
                              :  "max-h-[80vh] overflow-hidden opacity-95"
                          ] : []
                        )}
                        style={{
                          color: panelColor === "mission" ? "#f7f7f7" : "#000000",
                          fontFamily: "'Noto Sans Hebrew', sans-serif",
                          fontSize: "clamp(1rem, 2.4cqw, 1.3rem)",
                          lineHeight: 1.6,
                          scrollbarWidth: "thin",
                          scrollbarColor: "#ba644d #f1ede5",
                          paddingLeft: (onCtaClick && isContentExpanded) ? "8px" : "0",
                          position: "relative",
                          zIndex: 10,
                        }}
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: content
                              .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                              .split("\n\n")
                              .map(
                                (paragraph) =>
                                  `<p style="margin-bottom: 1.2em; line-height: inherit;">${paragraph.replace(
                                    /\n/g,
                                    "<br/>"
                                  )}</p>`
                              )
                              .join(""),
                          }}
                        />
                      </div>
                    ) : (
                      <div
                        className="flex-1 overflow-y-auto"
                        style={{ fontSize: "clamp(1rem, 2.8cqw, 1.2rem)" }}
                      >
                        {content}
                      </div>
                    )}
                  </div>
                  {/* CTA - Positioned absolutely within the padded content area */}
                  {showCta && ctaText && (
                    <div
                      className="absolute bottom-[clamp(0.75rem,16cqw,56rem)] left-[clamp(0.75rem,20cqw,56rem)]"
                      dir="rtl"
                    >
                      {onCtaClick ? (
                        <div className="flex flex-col items-center">
                          <button
                            onClick={handleContentToggle}
                            disabled={isAnimating}
                            className={cn(
                              "inline-flex items-center justify-center transition-all duration-300 hover:opacity-80",
                              isAnimating ? "cursor-wait opacity-70" : "cursor-pointer"
                            )}
                            style={{
                              color: panelColor === "mission" ? "#f7f7f7" : "black",
                              fontSize: "clamp(0.9rem, 2.5cqw, 1.3rem)",
                              fontFamily: "'Noto Sans Hebrew', sans-serif",
                              fontWeight: "400",
                              background: "transparent",
                              border: "none",
                              padding: "0",
                            }}
                          >
                            {ctaText}
                            <svg
                              className="mr-2 mt-1 transition-transform duration-1000 ease-out"
                              width="12"
                              height="12"
                              viewBox="0 0 8 8"
                              fill="none"
                              style={{ 
                                transform: isContentExpanded 
                                  ? (panelColor === "mission" ? "rotate(-90deg)" : "rotate(180deg)")
                                  : (panelColor === "mission" ? "rotate(90deg)" : ""),
                              }}
                            >
                              <path
                                d="M4 1L4 6M4 6L2 4M4 6L6 4"
                                stroke={
                                  panelColor === "mission" ? "#f7f7f7" : "black"
                                }
                                strokeWidth="1"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                          {/* Underline */}
                          <div
                            className="h-1 transition-all duration-500 ease-in-out mt-1"
                            style={{
                              backgroundColor: panelColor === "mission" ? "#cec2ab" : "#ba644d",
                              width: ctaText === "טקסט מקוצר" ? "2rem" : "6rem",
                            }}
                          />
                        </div>
                      ) : ctaHref ? (
                        <Link href={ctaHref}>
                          <div
                            className="inline-flex items-center justify-center font-light transition-all duration-300 hover:opacity-80 px-2"
                            style={{
                              fontSize: "clamp(0.9rem, 2.5cqw, 1.3rem)",
                              borderBottom:
                                panelColor === "mission"
                                  ? "4px solid #cec2ab"
                                  : "4px solid #ba644d",
                              color: panelColor === "mission" ? "#f7f7f7" : "black",
                              fontFamily: "'Noto Sans Hebrew', sans-serif",
                              fontWeight: "400",
                              paddingBottom: "2px",
                            }}
                          >
                            {ctaText}
                            <svg
                              className="mr-2 mt-1"
                              width="12"
                              height="12"
                              viewBox="0 0 8 8"
                              fill="none"
                              style={{ 
                                transform: panelColor === "mission" ? "rotate(90deg)" : "",
                              }}
                            >
                              <path
                                d="M4 1L4 6M4 6L2 4M4 6L6 4"
                                stroke={
                                  panelColor === "mission" ? "#f7f7f7" : "black"
                                }
                                strokeWidth="1"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </Link>
                      ) : null}
                    </div>
                  )}
                </div>

                {/* CTA moved inside padded container above */}
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* Close full width container */}
      {/* Keywords Band */}
      {showKeywords && keywords.length > 0 && (
        <div className="mt-12 sm:mt-16 animate-fade-in-up delay-700 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-teal-800 text-white py-4 px-6 rounded-xl shadow-lg overflow-hidden">
              <div className="flex items-center justify-center">
                <div className="flex gap-4 sm:gap-6 lg:gap-8 text-center">
                  {keywords.map((keyword, index) => (
                    <React.Fragment key={index}>
                      <span className="text-sm sm:text-base lg:text-lg font-medium whitespace-nowrap">
                        {keyword}
                      </span>
                      {index < keywords.length - 1 && (
                        <span className="text-white/40">•</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}