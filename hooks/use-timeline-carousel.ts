import { useState, useEffect, useRef } from "react";

interface UseTimelineCarouselProps {
  itemsLength: number;
  autoAdvanceInterval?: number;
}

export function useTimelineCarousel({ 
  itemsLength, 
  autoAdvanceInterval = 4000 
}: UseTimelineCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [slideWidth, setSlideWidth] = useState(350);
  const [visibleItems, setVisibleItems] = useState(1);
  const [animatingCardIndex, setAnimatingCardIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Handle responsive slide width
  useEffect(() => {
    const updateSlideSettings = () => {
      const width = window.innerWidth;
      setSlideWidth(width < 640 ? width : 420);
      const itemsToShow = width < 640 ? 1 : Math.min(4, Math.floor(width / 420));
      setVisibleItems(itemsToShow);
    };

    updateSlideSettings();
    window.addEventListener('resize', updateSlideSettings);
    return () => window.removeEventListener('resize', updateSlideSettings);
  }, []);

  // Calculate max index - stop when last item is fully visible
  const maxIndex = Math.max(0, itemsLength - visibleItems);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= maxIndex) {
          return 0;
        }
        return prev + 1;
      });
    }, autoAdvanceInterval);

    return () => clearInterval(interval);
  }, [itemsLength, maxIndex, autoAdvanceInterval]);

  // Random card pulse animation
  useEffect(() => {
    const interval = setInterval(() => {
      const visibleCardIndices = Array.from({ length: visibleItems }, (_, i) => currentIndex + i)
        .filter(index => index < itemsLength);
      
      if (visibleCardIndices.length > 0) {
        const randomIndex = visibleCardIndices[Math.floor(Math.random() * visibleCardIndices.length)];
        setAnimatingCardIndex(randomIndex);
        
        setTimeout(() => {
          setAnimatingCardIndex(null);
        }, 800);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, visibleItems, itemsLength]);

  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex((prev) => {
      if (prev === 0) {
        return maxIndex;
      }
      return prev - 1;
    });
  };

  const goToNext = () => {
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) {
        return 0;
      }
      return prev + 1;
    });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToNext(); // RTL: left arrow goes to next
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToPrevious(); // RTL: right arrow goes to previous
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

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    // RTL: Swipe left goes to previous, swipe right goes to next
    if (isLeftSwipe) {
      goToPrevious();
    }
    if (isRightSwipe) {
      goToNext();
    }
  };

  return {
    currentIndex,
    slideWidth,
    visibleItems,
    animatingCardIndex,
    carouselRef,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    goToPrevious,
    goToNext,
  };
}