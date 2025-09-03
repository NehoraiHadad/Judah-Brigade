import { useState, useEffect, useRef } from "react";

interface UseImageGalleryCarouselProps {
  imagesLength: number;
  autoAdvanceInterval?: number;
}

export function useImageGalleryCarousel({ 
  imagesLength, 
  autoAdvanceInterval = 4000 
}: UseImageGalleryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Handle responsive slide width and mobile detection
  useEffect(() => {
    const updateSlideSettings = () => {
      if (carouselRef.current) {
        const containerWidth = carouselRef.current.offsetWidth;
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
        setSlideWidth(containerWidth);
      }
    };

    // Initial setup with timeout to ensure DOM is ready
    setTimeout(updateSlideSettings, 100);
    window.addEventListener('resize', updateSlideSettings);
    return () => window.removeEventListener('resize', updateSlideSettings);
  }, []);

  // Responsive images per slide: mobile shows 2x2 (4 images), moves by 2
  // Desktop shows 4x1 (4 images), moves by 1
  const IMAGES_PER_SLIDE = 4; // How many images visible at once
  const MOVE_BY = isMobile ? 2 : 1; // How many images to move per step
  // For mobile: only show complete 2x2 grids, so max slides = floor(imagesLength / 4)
  // For desktop: show all images with normal sliding behavior
  const totalSlides = isMobile ? Math.floor(imagesLength / 4) : Math.ceil(imagesLength / IMAGES_PER_SLIDE);
  const maxIndex = Math.max(0, (totalSlides - 1) * MOVE_BY); // Last possible starting position

  // Auto-advance carousel - move by MOVE_BY images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + MOVE_BY > maxIndex ? 0 : prev + MOVE_BY));
    }, autoAdvanceInterval);

    return () => clearInterval(interval);
  }, [maxIndex, autoAdvanceInterval, MOVE_BY]);

  // Navigation functions
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + MOVE_BY > maxIndex ? 0 : prev + MOVE_BY));
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - MOVE_BY < 0 ? Math.floor(maxIndex / MOVE_BY) * MOVE_BY : prev - MOVE_BY));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Mouse wheel navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!carouselRef.current?.contains(e.target as Node)) return;
      
      e.preventDefault();
      if (e.deltaY > 0) {
        goToNext();
      } else if (e.deltaY < 0) {
        goToPrevious();
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("wheel", handleWheel, { passive: false });
      return () => carousel.removeEventListener("wheel", handleWheel);
    }
  }, []);

  return {
    currentIndex,
    slideWidth,
    carouselRef,
    goToPrevious,
    goToNext,
    maxIndex,
    IMAGES_PER_SLIDE,
    MOVE_BY,
    isMobile
  };
}