"use client";

import { useState, useEffect, useRef } from "react";
import { SectionTitle } from "@/components/ui/section-title";
import { CONTENT } from "@/data";

interface ReasonCard {
  id: string;
  title: string;
  content: string;
  bgColor: string;
  textColor: string;
  isHighlight?: boolean;
}

interface WhyWeAreHereCardProps {
  card: ReasonCard;
  index: number;
  isVisible: boolean;
}

function WhyWeAreHereCard({ card, index, isVisible }: WhyWeAreHereCardProps) {
  return (
    <div
      className={`group relative bg-gradient-to-br ${card.bgColor} overflow-hidden
        transform transition-all duration-700 ease-out hover:scale-105 hover:shadow-xl
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
        ${card.isHighlight ? "ring-2 ring-amber-400/50" : ""}`}
      style={{ 
        transitionDelay: isVisible ? `${index * 50}ms` : '0ms',
        minHeight: '120px',
        aspectRatio: '1'
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      
      {/* Content */}
      <div className="relative z-10 p-3 sm:p-4 h-full flex flex-col justify-center text-right">
        <div>
          <h3 className={`text-sm sm:text-base lg:text-lg font-bold mb-2 ${card.textColor} leading-tight`}>
            {card.title}
          </h3>
          <p className={`text-xs sm:text-sm ${card.textColor.replace('100', '200')} leading-snug line-clamp-3`}>
            {card.content}
          </p>
        </div>
        
        {card.isHighlight && (
          <div className="mt-2">
            <div className="w-6 h-0.5 bg-amber-400"></div>
          </div>
        )}
      </div>
      
      {/* Hover Effect */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}

export function WhyWeAreHereSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Title Section with White Background */}
      <section className="py-12 sm:py-16 bg-white relative overflow-hidden">

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionTitle className="mb-0 text-center font-['Suez_One'] text-[#ba644d]">
            {CONTENT.WHY_WE_ARE_HERE.TITLE}
          </SectionTitle>
        </div>
      </section>

      {/* Cards Section with White Background */}
      <section
        id="why-we-are-here"
        ref={sectionRef}
        className="py-12 sm:py-16 lg:py-20 bg-white relative"
      >
        <div className="container mx-auto max-w-7xl">
          {/* Grid of Reason Cards */}
          <div
            ref={gridRef}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-0 max-w-5xl mx-auto"
          >
            {CONTENT.WHY_WE_ARE_HERE.CARDS.map((card, index) => (
              <WhyWeAreHereCard
                key={card.id}
                card={card}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
