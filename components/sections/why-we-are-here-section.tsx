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
      className={`group relative bg-gradient-to-br ${card.bgColor} rounded-lg overflow-hidden
        transform transition-all duration-700 ease-out hover:scale-105 hover:shadow-2xl
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
        ${card.isHighlight ? "ring-2 ring-amber-400/50" : ""}`}
      style={{ 
        transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
        minHeight: '200px'
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      
      {/* Content */}
      <div className="relative z-10 p-6 h-full flex flex-col justify-between text-right">
        <div>
          <h3 className={`text-xl lg:text-2xl font-bold mb-4 ${card.textColor} leading-tight`}>
            {card.title}
          </h3>
          <p className={`text-sm lg:text-base ${card.textColor.replace('100', '200')} leading-relaxed`}>
            {card.content}
          </p>
        </div>
        
        {card.isHighlight && (
          <div className="mt-4">
            <div className="w-8 h-1 bg-amber-400 rounded-full"></div>
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
    <section
      id="why-we-are-here"
      ref={sectionRef}
      className="py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-slate-900 via-teal-900 to-slate-900 text-white relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-900/20 via-transparent to-teal-900/40"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 left-20 w-48 h-48 bg-teal-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Title */}
        <SectionTitle className="text-amber-100 mb-12 text-center">
          {CONTENT.WHY_WE_ARE_HERE.TITLE}
        </SectionTitle>

        {/* Grid of Reason Cards */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto"
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
  );
}
