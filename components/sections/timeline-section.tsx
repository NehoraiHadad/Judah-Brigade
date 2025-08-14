"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { timelineData } from "@/data/timeline-data";
import { WALL_IMAGES } from "@/constants/images";
import { TimelineModal } from "@/components/timeline/timeline-modal";
import { useTimelineModal } from "@/hooks/use-timeline-modal";

export function TimelineSection() {
  const { selectedItem, isOpen, openModal, closeModal } = useTimelineModal();
  const displayItems = timelineData;

  // Auto-scrolling timeline carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [slideWidth, setSlideWidth] = useState(350);
  const [visibleItems, setVisibleItems] = useState(1);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Handle responsive slide width
  useEffect(() => {
    const updateSlideSettings = () => {
      const width = window.innerWidth;
      setSlideWidth(width < 640 ? width : 420);
      // For desktop, show about 3-4 items, for mobile show 1
      const itemsToShow = width < 640 ? 1 : Math.min(4, Math.floor(width / 420));
      setVisibleItems(itemsToShow);
    };

    updateSlideSettings();
    window.addEventListener('resize', updateSlideSettings);
    return () => window.removeEventListener('resize', updateSlideSettings);
  }, []);

  // Calculate max index - stop when last item is fully visible
  const maxIndex = Math.max(0, displayItems.length - visibleItems);

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        // If we're at max index, jump back to start
        if (prev >= maxIndex) {
          return 0;
        }
        return prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [displayItems.length, maxIndex]);

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

  return (
    <>
      <section
        id="timeline-section"
        className="pt-16 pb-0 sm:pt-20 lg:pt-24 bg-white relative overflow-visible sm:overflow-hidden"
      >
        <div className="w-full">
          {/* Header Section */}
          <div className="text-center mb-8 lg:mb-12">
            <div className="flex flex-col items-center mb-6">
              <Image
                src="/images/judah-brigade-logo-new.webp"
                alt="לוגו חטיבת יהודה"
                width={120}
                height={120}
                className="mb-4 sm:scale-110 lg:scale-140 transition-all"
                style={{
                  filter:
                    "sepia(5) saturate(1.8) hue-rotate(326deg) brightness(0.8) contrast(1.3)",
                }}
              />
              <h2
                className="text-4xl sm:text-3xl lg:text-6xl font-suez-one my-6 mb-4 lg:mb-6 lg:mt-12"
                style={{ color: "#af6852" }}
              >
                ציר הזמן של חטיבת יהודה
              </h2>
            </div>
            <div className="max-w-5xl mx-auto px-4">
              <p
                className="text-xl lg:text-3xl text-black mb-6 leading-normal text-center font-normal tracking-tight"
                style={{ letterSpacing: "-0.02em" }}
              >
                גזרת יהודה ספוגה בהיסטוריה עתיקה עוד מימי אברהם אבינו והתרחשו
                אירועים מכוננים שהשפיעו על תולדות עמנו. ציוני הדרך מתועדים על
                קיר גרפיטי מרשים המעביר את הצופה מסע אחורה בזמן.
              </p>
            </div>
          </div>

          {/* Timeline Carousel */}
          <div className="relative w-full">
            <div
              ref={carouselRef}
              className="w-full overflow-hidden cursor-grab active:cursor-grabbing"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-1000 ease-in-out"
                style={{
                  transform: `translateX(${currentIndex * slideWidth}px)`,
                  width: `${displayItems.length * slideWidth}px`,
                }}
              >
                {displayItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex-shrink-0 flex flex-col w-screen sm:w-[420px]"
                  >
                    {/* Card */}
                    <div className="mb-6 px-2 sm:px-4" onClick={() => openModal(item)}>
                      <div
                        className="relative shadow-md overflow-hidden cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out w-full mx-auto"
                        style={{ backgroundColor: "#ba644d" }}
                      >
                        <div className="h-36 sm:h-44 lg:h-56 relative">
                          <Image
                            src={WALL_IMAGES[index % WALL_IMAGES.length] || WALL_IMAGES[0]}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 320px, 412px"
                          />
                          <div className="absolute inset-0 bg-black/20" />
                        </div>
                        <div className="p-2 md:p-4 text-center" style={{ backgroundColor: "#ba644d" }}>
                          <h3 className="text-2xl lg:text-3xl font-bold text-white">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Mark and Date */}
                    <div className="flex flex-col items-center relative mb-8 sm:mb-0">
                      <div
                        className="absolute top-0 left-0 right-0 h-0.5"
                        style={{ backgroundColor: "#e9e0d3" }}
                      />
                      {/* Long timeline mark */}
                      <div
                        style={{
                          backgroundColor: "#e9e0d3",
                          width: "2px", // Same thickness as short marks
                          height: "50px", // 2x the height of short marks (25px * 2 = 50px)
                          marginTop: "-1px",
                          zIndex: 1,
                        }}
                      />
                      {/* Multiple short timeline marks between periods */}
                      {(
                        <>
                          {/* Short marks evenly distributed between long marks */}
                          {Array.from({ length: 16 }, (_, markIndex) => (
                            <div
                              key={markIndex}
                              className="absolute"
                              style={{
                                left: "50%",
                                transform: `translateX(${(slideWidth / 17) * (markIndex + 1)}px)`, // Divide into 17 parts to have 16 short marks between long marks
                                top: "-1px",
                              }}
                            >
                              <div
                                style={{
                                  backgroundColor: "#e9e0d3",
                                  width: "2px", // Same thickness as long marks
                                  height: "25px", // Uniform height for all short marks
                                }}
                              />
                            </div>
                          ))}
                        </>
                      )}
                      <div className="mt-2 text-center">
                        <div
                          className="text-2xl sm:text-xl lg:text-xl xl:text-2xl leading-tight"
                          style={{ color: "#d2c2a8" }}
                        >
                          {(() => {
                            const dateText = item.date;
                            
                            // Split text into two lines based on content
                            if (dateText.includes("לפני הספירה")) {
                              const yearPart = dateText.replace(" לפני הספירה", "");
                              return (
                                <>
                                  <div>{yearPart}</div>
                                  <div>לפני הספירה</div>
                                </>
                              );
                            } else if (dateText.includes("לספירה")) {
                              const parts = dateText.split(" לספירה");
                              return (
                                <>
                                  <div>{parts[0]}</div>
                                  <div>לספירה</div>
                                </>
                              );
                            } else if (dateText.includes("עד 70 לספירה")) {
                              const parts = dateText.replace(" עד 70 לספירה", "");
                              return (
                                <>
                                  <div>{parts}</div>
                                  <div>עד 70 לספירה</div>
                                </>
                              );
                            } else if (dateText.includes("המנדט הבריטי")) {
                              const parts = dateText.replace(" המנדט הבריטי", "");
                              return (
                                <>
                                  <div>{parts}</div>
                                  <div>המנדט הבריטי</div>
                                </>
                              );
                            } else if (dateText.includes("עד מלחמת ששת הימים")) {
                              const parts = dateText.replace(" עד מלחמת ששת הימים", "");
                              return (
                                <>
                                  <div>{parts}</div>
                                  <div>עד מלחמת ששת הימים</div>
                                </>
                              );
                            } else if (dateText.includes("עד היום")) {
                              const parts = dateText.replace(" עד היום", "");
                              return (
                                <>
                                  <div>{parts}</div>
                                  <div>עד היום</div>
                                </>
                              );
                            } else {
                              // For other dates, try to split in the middle
                              const words = dateText.split(" ");
                              if (words.length > 2) {
                                const mid = Math.ceil(words.length / 2);
                                const firstPart = words.slice(0, mid).join(" ");
                                const secondPart = words.slice(mid).join(" ");
                                return (
                                  <>
                                    <div>{firstPart}</div>
                                    <div>{secondPart}</div>
                                  </>
                                );
                              } else {
                                return <div>{dateText}</div>;
                              }
                            }
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <TimelineModal item={selectedItem} isOpen={isOpen} onClose={closeModal} />
    </>
  );
}
