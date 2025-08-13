"use client";

import { useState, useEffect, useRef } from "react";
import { CONTENT } from "@/data";

interface ReasonCard {
  id: string;
  title: string;
  content: string;
  bgColor: string;
  textColor: string;
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
      
      {/* Content */}
      <div className={`relative z-10 ${card.id === 'we-are-here' ? 'p-8 sm:p-4' : 'p-12 pt-12 lg:p-18 lg:pt-30'} h-full flex flex-col ${card.id === 'we-are-here' ? 'justify-center' : 'justify-start'} text-center`}>
        <div>
          <p 
            className={`${card.id === 'we-are-here' ? 'text-xl sm:text-3xl lg:text-4xl font-bold' : 'text-xl lg:text-2xl'} ${card.textColor} `}
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0"
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
