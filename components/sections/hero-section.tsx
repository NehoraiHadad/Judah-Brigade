"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { HeroBackgroundCarousel } from "@/components/ui/hero-background-carousel";
import { CONTENT } from "@/data";
import { IMAGES } from "@/constants";

export function HeroSection() {
  const scrollToNext = () => {
    const nextSection = document.querySelector("#introduction");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background carousel with enhanced overlay */}
      <HeroBackgroundCarousel autoPlayInterval={8000} enableParallax={false} />
      
      {/* Enhanced gradient overlay for optimal readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/75 z-10" />
      {/* Subtle brand color overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-900/40 via-transparent to-amber-900/30 z-10" />

      {/* Main content */}
      <div className="relative z-20 text-center mx-auto" style={{ 
        padding: '0 clamp(1rem, 3vw, 4rem)',
        maxWidth: 'clamp(320px, 90vw, 1200px)'
      }}>
        {/* Logo section */}
        <div className="mb-6 sm:mb-8 animate-fade-in-up">
          <Logo
            src={IMAGES.LOGO}
            alt="סמל חטיבת יהודה"
            priority={true}
            className="mx-auto mb-6 drop-shadow-2xl object-contain"
            style={{ 
              width: 'clamp(120px, 15vw, 220px)', 
              height: 'clamp(120px, 15vw, 220px)' 
            }}
          />
        </div>

        {/* Main title */}
        <h1 className="mb-6 sm:mb-8 leading-none animate-fade-in-up delay-300 text-center drop-shadow-2xl font-black tracking-wide" style={{ fontSize: 'clamp(2.25rem, 7vw, 5rem)', color: '#fefefe' }}>
          <span>- {CONTENT.HERO.TITLE} -</span>
        </h1>

        {/* Subtitle + Tagline */}
        <div className="mb-10 sm:mb-12 lg:mb-16 animate-fade-in-up delay-500 space-y-3 lg:space-y-4">
          <h2 className="max-w-6xl leading-tight text-center mb-0 drop-shadow-xl font-bold" style={{ fontSize: 'clamp(1rem, 4vw, 3rem)', color: '#e6dfd3' }}>
            {CONTENT.HERO.SUBTITLE}
          </h2>
          {CONTENT.HERO.TAGLINE && (
            <h3 className="max-w-6xl mx-auto leading-relaxed text-center drop-shadow-lg font-medium" style={{ fontSize: 'clamp(0.8rem, 2.5vw, 2rem)', color: '#e6dfd3' }}>
              {CONTENT.HERO.TAGLINE}
            </h3>
          )}
        </div>

        {/* Navigation cards - unified responsive layout */}
        <div className="animate-fade-in-up delay-700">
          <div className="flex justify-center" style={{ gap: 'clamp(0.5rem, 2vw, 2rem)' }}>
            {[
              { label: "המשימה\nשלנו", href: "#mission" },
              { label: "על\nהגזרה", href: "#about" },
              { label: "המורשת\nשלנו", href: "#timeline-section" },
              { label: "דבר\nהמפקד", href: "#commander-message" },
            ].map((card) => (
              <Link
                key={card.label}
                href={card.href}
                aria-label={`נווט אל ${card.label.replace('\n', ' ')}`}
                className="flex-1 text-stone-800 text-center shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm font-bold border border-stone-300/40"
                style={{ 
                  backgroundColor: '#cec2ab',
                  color: '#0f2d38',
                  padding: 'clamp(0.5rem, 1.5vw, 1.5rem) clamp(0.25rem, 1vw, 1rem)',
                  fontSize: 'clamp(0.75rem, 1.8vw, 2rem)',
                  lineHeight: '0.5',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c5b8a1'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#cec2ab'}
              >
                <span className="whitespace-pre-line leading-tight">{card.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator positioned in corner */}
      <div className="absolute bottom-8 right-8 z-30 animate-fade-in-up delay-1000 cursor-pointer">
        <Button
          variant="scrollIndicator"
          size="scrollIcon"
          onClick={scrollToNext}
          aria-label="Scroll to next section"
          className="flex-col transform lg:scale-80 xl:scale-110"
        >
          <span className="text-xs lg:text-sm xl:text-base mb-1 font-medium tracking-wide opacity-80 group-hover:opacity-100">
            גלה עוד
          </span>
          <ChevronDown className="h-5 w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7 animate-bounce group-hover:scale-110 transition-transform duration-300" />
        </Button>
      </div>
    </section>
  );
}
