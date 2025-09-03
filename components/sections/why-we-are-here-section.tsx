"use client";

import { useState, useEffect, useRef } from "react";
import { CONTENT } from "@/data";
import Image from "next/image";

interface ReasonCard {
  id: string;
  title: string;
  content: string;
  bgColor: string;
  textColor: string;
  backgroundImage?: string;
}

interface WhyWeAreHereCardProps {
  card: ReasonCard;
  index: number;
  isVisible: boolean;
}

function WhyWeAreHereCard({ card, index, isVisible }: WhyWeAreHereCardProps) {
  return (
    <div
      className={`relative ${card.bgColor} overflow-hidden
        transform transition-all duration-700 ease-out
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
        `}
      style={{ 
        transitionDelay: isVisible ? `${index * 50}ms` : '0ms',
        minHeight: '120px',
        aspectRatio: '1'
      }}
    >
      {/* Background Image */}
      {card.backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={card.backgroundImage}
            alt={card.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
          />
          {/* Overlay for text readability */}
          <div className={`absolute inset-0 ${card.bgColor} opacity-70`} />
        </div>
      )}
      
      {/* Content */}
      <div className={`relative z-10 ${card.id === 'we-are-here' ? 'p-8 sm:p-4' : 'p-4 pt-6 lg:p-14 lg:pt-17 xl:p-15 xl:pt-23'} h-full flex flex-col ${card.id === 'we-are-here' ? 'justify-center' : 'justify-start'} text-center`}>
        <div>
          <p 
            className={`${card.id === 'we-are-here' ? 'font-bold' : ''} ${card.textColor} ${card.backgroundImage ? 'drop-shadow-lg' : ''}`}
            style={{
              fontSize: card.id === 'we-are-here' 
                ? 'clamp(1.5rem, 3vw, 2rem)' 
                : 'clamp(0.65rem, 1.2vw, 1.5rem)',
              textShadow: card.backgroundImage ? '1px 1px 2px rgba(0,0,0,0.8)' : 'none'
            }}
            dangerouslySetInnerHTML={{
              __html: card.content.replace(/אנחנו כאן/g, '<strong>אנחנו כאן</strong>')
            }}
          />
        </div>
        
      </div>
      
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
        <div className="relative z-10">
          <h2 className="mb-0 text-center font-['Suez_One'] text-[#ba644d] text-4xl  lg:text-6xl">
            {CONTENT.WHY_WE_ARE_HERE.TITLE}
          </h2>
        </div>
      </section>

      {/* Cards Section with White Background */}
      <section
        id="why-we-are-here"
        ref={sectionRef}
        className="bg-white relative"
      >
        <div className="w-full">
          {/* Grid of Reason Cards */}
          <div
            ref={gridRef}
            className="grid grid-cols-2 lg:grid-cols-4 gap-0"
          >
            {CONTENT.WHY_WE_ARE_HERE.CARDS.map((card: any, index: number) => (
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
