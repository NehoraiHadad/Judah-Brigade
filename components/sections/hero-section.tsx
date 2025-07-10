"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { GradientText } from "@/components/ui/gradient-text";
import { NavigationDots } from "@/components/ui/navigation-dots";
import { Button } from "@/components/ui/button";
import { CONTENT } from "@/data";
import { HERO_CAROUSEL_IMAGES, IMAGES } from "@/constants";
import { GradientDivider } from "@/components/ui/gradient-divider";
import { useCarousel } from "@/hooks/use-carousel";
import { getBlurPlaceholder } from "@/lib/blur-placeholder";

// Use the centralized HERO_CAROUSEL_IMAGES instead of local array
const HERO_IMAGES = HERO_CAROUSEL_IMAGES.map((src, index) => ({
  src,
  alt: `Hero image ${index + 1}`,
}));

export function HeroSection() {
  const { currentIndex, next, goTo, swipeHandlers } = useCarousel(HERO_IMAGES.length);

  useEffect(() => {
    // Gentle automatic rotation every 8 seconds
    const interval = setInterval(() => {
      next();
    }, 8000);
    return () => clearInterval(interval);
  }, [next]);

  const scrollToNext = () => {
    const nextSection = document.querySelector("#introduction");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      {...swipeHandlers}
    >
      {/* Clean background with subtle rotation */}
      <div className="absolute inset-0">
        {HERO_IMAGES.map((image, index) => (
          <div
            key={image.src}
            className={`absolute inset-0 transition-opacity duration-3000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
              quality={index === 0 ? 85 : 75}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={getBlurPlaceholder('hero')}
            />
          </div>
        ))}

        {/* Enhanced gradient overlay for optimal readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/65 via-black/45 to-black/75" />
        {/* Subtle brand color overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-950/30 via-transparent to-amber-950/30" />
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <NavigationDots
          total={HERO_IMAGES.length}
          current={currentIndex}
          onSelect={goTo}
          variant="small"
        />
      </div>

      {/* Main content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Logo section */}
        <div className="mb-4 sm:mb-6 animate-fade-in-up">
          <Logo
            src={IMAGES.LOGO}
            alt="סמל חטיבת יהודה"
            width={150}
            height={150}
            priority={true}
            className="mx-auto mb-4 sm:w-[180px] sm:h-[180px] lg:w-[200px] lg:h-[200px] xl:w-[220px] xl:h-[220px] drop-shadow-lg object-contain"
          />
        </div>

        {/* Main title with enhanced gradient */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4 sm:mb-6 leading-tight animate-fade-in-up delay-300 text-center drop-shadow-lg">
          <GradientText variant="primary">{CONTENT.HERO.TITLE}</GradientText>
        </h1>

        {/* Subtitle with better spacing */}
        <div className="mb-8 sm:mb-10 animate-fade-in-up delay-500">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-stone-100 max-w-4xl mx-auto leading-relaxed text-center mb-4 drop-shadow-md">
            {CONTENT.HERO.SUBTITLE}
          </p>
          <GradientDivider size="lg" variant="primary" className="shadow-lg" />
        </div>
      </div>

      {/* Scroll indicator positioned in corner */}
      <div className="absolute bottom-8 right-8 z-30 animate-fade-in-up delay-1000">
        <Button
          variant="scrollIndicator"
          size="scrollIcon"
          onClick={scrollToNext}
          aria-label="Scroll to next section"
          className="flex-col"
        >
          <span className="text-xs mb-1 font-medium tracking-wide opacity-80 group-hover:opacity-100">
            גלה עוד
          </span>
          <ChevronDown className="h-5 w-5 animate-bounce group-hover:scale-110 transition-transform duration-300" />
        </Button>
      </div>
    </section>
  );
}
