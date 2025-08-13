"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { timelineData } from "@/data/timeline-data";
import { WALL_IMAGES } from "@/constants/images";
import { TimelineModal } from "@/components/timeline/timeline-modal";
import { useTimelineModal } from "@/hooks/use-timeline-modal";

export function TimelineSection() {
  const { selectedItem, isOpen, openModal, closeModal } = useTimelineModal();
  const displayItems = timelineData;

  // Auto-scrolling timeline carousel state (starts with first 4 cards visible)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Auto-advance carousel every 4 seconds - slide one card at a time (left to right)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayItems.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [displayItems.length]);

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

    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev + 1) % displayItems.length);
    }
    if (isRightSwipe) {
      setCurrentIndex(
        (prev) => (prev - 1 + displayItems.length) % displayItems.length
      );
    }
  };

  return (
    <>
      <section
        id="timeline-section"
        className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-visible sm:overflow-hidden"
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

          {/* Unified Timeline View - Responsive */}
          <div className="relative w-full">
            <div
              className="w-full overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Timeline Container - Responsive */}
              <div
                className="flex transition-transform duration-1000 ease-in-out"
                style={
                  isDesktop
                    ? {
                        transform: `translateX(${currentIndex * 350}px)`,
                        width: `${displayItems.length * 350}px`,
                      }
                    : {
                        transform: `translateX(${currentIndex * 100}vw)`,
                        width: `${displayItems.length * 100}vw`,
                      }
                }
              >
                {displayItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex-shrink-0 flex flex-col"
                    style={isDesktop ? { width: "350px" } : { width: "100vw" }}
                  >
                    {/* Card */}
                    <div
                      className={isDesktop ? "mb-6 px-4" : "mb-6 px-12"}
                      onClick={() => openModal(item)}
                    >
                      <div
                        className={
                          isDesktop
                            ? "relative rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                            : "relative rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow w-64 mx-auto"
                        }
                        style={{ backgroundColor: "#ba644d" }}
                      >
                        <div className={isDesktop ? "h-40 lg:h-48 relative" : "h-32 relative"}>
                          <Image
                            src={
                              WALL_IMAGES[index % WALL_IMAGES.length] ||
                              WALL_IMAGES[0]
                            }
                            alt={item.title}
                            fill
                            className="object-cover rounded-t-md"
                            sizes={isDesktop ? "342px" : "256px"}
                          />
                          <div className="absolute inset-0 bg-black/20 rounded-t-md" />
                        </div>
                        <div
                          className="p-4 text-center"
                          style={{ backgroundColor: "#ba644d" }}
                        >
                          <h3
                            className={
                              isDesktop
                                ? "text-base lg:text-lg font-bold text-white"
                                : "text-base font-bold text-white"
                            }
                          >
                            {item.title}
                          </h3>
                          {!isDesktop && (
                            <p className="text-sm text-white/90 mt-1">{item.date}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Timeline Mark and Date */}
                    <div
                      className={
                        isDesktop
                          ? "flex flex-col items-center relative"
                          : "flex flex-col items-center relative mb-8"
                      }
                    >
                      {/* Main timeline line segment */}
                      <div
                        className="absolute top-0 left-0 right-0 h-0.5"
                        style={{ backgroundColor: "#e9e0d3" }}
                      />

                      {/* Tick mark */}
                      <div
                        style={{
                          backgroundColor: "#e9e0d3",
                          width: "3px",
                          height: "20px",
                          marginTop: "-1px",
                          zIndex: 1,
                        }}
                      />

                      {/* Year text */}
                      <div className="mt-2 text-center">
                        <div
                          className={
                            isDesktop
                              ? "text-lg font-bold leading-tight"
                              : "text-xl font-bold leading-tight"
                          }
                          style={{ color: "#d2c2a8" }}
                        >
                          {item.date.includes("לפני הספירה") ? (
                            <>
                              <div>{item.date.replace(" לפני הספירה", "")}</div>
                              <div
                                className={isDesktop ? "text-sm" : "text-base"}
                              >
                                לפני הספירה
                              </div>
                            </>
                          ) : (
                            <div>{item.date}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Touch indicators - Mobile only */}
              {!isDesktop && (
                <div className="flex justify-center space-x-2 mt-6">
                  {displayItems.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        index === currentIndex ? 'bg-amber-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <TimelineModal item={selectedItem} isOpen={isOpen} onClose={closeModal} />
    </>
  );
}
