"use client";

import { TimelineItem } from "@/types/timeline";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { CONTENT } from "@/data";
import { IMAGES, WALL_IMAGES } from "@/constants";

interface TimelineResponsiveProps {
  items: TimelineItem[];
  onItemSelect: (item: TimelineItem) => void;
}

export function TimelineResponsive({
  items,
  onItemSelect,
}: TimelineResponsiveProps) {
  // Display all items instead of pagination - show first 4 on desktop
  const displayItems = items.filter((item) => !item.isHidden);

  return (
    <div className="w-full px-4">
      <div className="text-center mb-8 lg:mb-12">
        <div className="flex flex-col items-center mb-6">
          <Image
            src={IMAGES.LOGO}
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
            {CONTENT.TIMELINE.TITLE}
          </h2>
        </div>
        <div className="max-w-5xl mx-auto px-4">
          <p
            className="text-xl lg:text-4xl text-black mb-6 leading-normal text-center font-normal tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            גזרת יהודה ספוגה בהיסטוריה עתיקה עוד מימי אברהם אבינו והתרחשו
            אירועים מכוננים שהשפיעו על תולדות עמנו. ציוני הדרך מתועדים על קיר
            גרפיטי מרשים המעביר את הצופה מסע אחורה בזמן.
          </p>
        </div>
      </div>

      {/* Desktop and Tablet View */}
      <div className="hidden sm:block relative max-w-6xl mx-auto">
        <div className="flex flex-col items-center">
          {/* Timeline Background Cards - Images from background folder */}
          <div className="flex justify-between w-full mb-6">
            {displayItems.slice(0, 4).map((item, index) => (
              <div key={`bg-${item.id}`} className="flex-1 mx-2">
                <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
                  {/* Background image */}
                  <div className="h-32 lg:h-40 relative">
                    <Image
                      src={WALL_IMAGES[index] || WALL_IMAGES[0]}
                      alt={`רקע ${item.title}`}
                      fill
                      className="object-cover"
                      sizes="25vw"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                  {/* Title */}
                  <div className="p-3 text-center">
                    <h3 className="text-sm lg:text-base font-bold text-gray-800">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>


          {/* Timeline Axis with Years - Like graffiti wall */}
          <div className="w-full relative px-12 mt-6 mb-12">
            {/* Main timeline bar - thinner */}
            <div className="relative">
              {/* Base timeline - thicker */}
              <div className="w-full h-0.5" style={{ backgroundColor: "#e9e0d3" }} />

              {/* All tick marks - small and large with equal spacing */}
              <div className="absolute top-0 left-0 w-full">
                {Array.from({ length: 31 }).map((_, i) => {
                  // Every 7th tick is a major tick (indices 0, 7, 14, 21, 28...)
                  const isMajorTick = i % 7 === 0 || i === 30;
                  const majorTickIndex = i === 30 ? 3 : Math.floor(i / 7);
                  const item = isMajorTick
                    ? displayItems[majorTickIndex]
                    : null;

                  return (
                    <div
                      key={`tick-${i}`}
                      className="absolute flex flex-col items-center"
                      style={{
                        left: `${(i / 30) * 100}%`,
                        transform: "translateX(-50%)",
                      }}
                    >
                      {/* Tick mark - major ticks are 2x longer than minor ticks */}
                      <div
                        className="w-0.5"
                        style={{
                          backgroundColor: "#e9e0d3",
                          height: isMajorTick ? "3rem" : "1.5rem",
                        }}
                      />

                      {/* Year label for major ticks only */}
                      {isMajorTick && item && (
                        <div className="mt-1 text-center">
                          {(() => {
                            // Parse and format the date into two lines
                            const dateText = item.date;

                            // Different date formats in the data
                            if (dateText.includes("המאה ה-18")) {
                              return (
                                <>
                                  <p
                                    className="text-lg lg:text-xl font-semibold leading-tight"
                                    style={{ color: "#d2c2a8" }}
                                  >
                                    המאה ה-18
                                  </p>
                                  <p
                                    className="text-lg lg:text-xl font-semibold leading-tight"
                                    style={{ color: "#d2c2a8" }}
                                  >
                                    לפני הספירה{" "}
                                  </p>
                                </>
                              );
                            } else if (dateText.includes("המאה ה-13")) {
                              return (
                                <>
                                  <p
                                    className="text-xl lg:text-2xl font-semibold leading-tight"
                                    style={{ color: "#d2c2a8" }}
                                  >
                                    המאה ה-13
                                  </p>
                                  <p
                                    className="text-xl lg:text-2xl font-semibold leading-tight"
                                    style={{ color: "#d2c2a8" }}
                                  >
                                    לפני הספירה
                                  </p>
                                </>
                              );
                            } else if (dateText.includes("1000")) {
                              return (
                                <>
                                  <p
                                    className="text-xl lg:text-2xl font-semibold leading-tight"
                                    style={{ color: "#d2c2a8" }}
                                  >
                                    סביב 1000
                                  </p>
                                  <p
                                    className="text-xl lg:text-2xl font-semibold leading-tight"
                                    style={{ color: "#d2c2a8" }}
                                  >
                                    לפני הספירה
                                  </p>
                                </>
                              );
                            } else if (dateText.includes("1967")) {
                              return (
                                <>
                                  <p
                                    className="text-xl lg:text-2xl font-semibold leading-tight"
                                    style={{ color: "#d2c2a8" }}
                                  >
                                    1967
                                  </p>
                                  <p
                                    className="text-xl lg:text-2xl font-semibold leading-tight"
                                    style={{ color: "#d2c2a8" }}
                                  >
                                    עד היום
                                  </p>
                                </>
                              );
                            } else {
                              // Default single line for other formats
                              return (
                                <p
                                  className="text-sm lg:text-base font-semibold leading-tight"
                                  style={{ color: "#d2c2a8" }}
                                >
                                  {dateText}
                                </p>
                              );
                            }
                          })()}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View - Vertical Layout */}
      <div className="sm:hidden">
        <div className="relative">
          {/* Enhanced Vertical Timeline Axis */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-700 via-amber-600 to-amber-700 -translate-x-1/2 z-0 rounded-full shadow-md" />
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-600/40 via-amber-500/40 to-amber-600/40 -translate-x-1/2 z-0 blur-md" />

          {/* Timeline items */}
          <div className="space-y-8 relative z-10">
            {displayItems.map((item, index) => (
              <TimelineCardMobile
                key={item.id}
                item={item}
                onClick={() => onItemSelect(item)}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface TimelineCardProps {
  item: TimelineItem;
  onClick: () => void;
  index: number;
  className?: string;
}

function TimelineCard({ item, onClick, index, className }: TimelineCardProps) {
  // צבעים בדיוק כמו בתמונה - ציבעוניות חמה של הגרפיטי
  const bgColors = [
    { bg: "#D2B48C", border: "#8B7355" }, // חום זהוב - בית שני
    { bg: "#B8860B", border: "#6B5B35" }, // זהב כהה - דוד המלך
    { bg: "#DEB887", border: "#8B7D6B" }, // חום בהיר - כלב ועכסה
    { bg: "#CD853F", border: "#8B5A2B" }, // שקד חום - אברהם אבינו
  ];

  const colors = bgColors[index % bgColors.length];

  return (
    <div className={cn("flex flex-col items-center relative mx-2", className)}>
      <button
        onClick={onClick}
        className="group flex flex-col items-center w-full max-w-[250px] transition-all hover:scale-105 hover:shadow-xl rounded-lg overflow-hidden"
        style={{ backgroundColor: colors.bg }}
      >
        <div
          className="w-full h-40 lg:h-48 relative overflow-hidden"
          style={{ borderBottom: `6px solid ${colors.border}` }}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, 250px"
          />
        </div>

        <div className="p-4 lg:p-6 text-center w-full">
          <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">
            {item.title}
          </h3>
          <p className="text-sm lg:text-base text-gray-700 font-medium">
            {item.date}
          </p>
        </div>
      </button>
    </div>
  );
}

interface TimelineCardMobileProps {
  item: TimelineItem;
  onClick: () => void;
  index: number;
  isLeft: boolean;
}

function TimelineCardMobile({
  item,
  onClick,
  index,
  isLeft,
}: TimelineCardMobileProps) {
  const bgColors = [
    { bg: "#D2B48C", border: "#8B7355" },
    { bg: "#B8860B", border: "#6B5B35" },
    { bg: "#DEB887", border: "#8B7D6B" },
    { bg: "#CD853F", border: "#8B5A2B" },
  ];

  const colors = bgColors[index % bgColors.length];

  return (
    <div
      className={cn(
        "flex items-center gap-4 relative",
        isLeft ? "flex-row" : "flex-row-reverse"
      )}
    >
      {/* Timeline dot with connection */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-[3px] rounded-full z-20 shadow-lg"
        style={{ borderColor: colors.border }}
      />

      {/* Card */}
      <button
        onClick={onClick}
        className={cn(
          "group flex flex-col w-[45%] transition-all hover:scale-105 hover:shadow-xl",
          isLeft ? "mr-auto" : "ml-auto"
        )}
        style={{ backgroundColor: colors.bg }}
      >
        <div
          className="w-full h-28 relative overflow-hidden border-b-4"
          style={{ borderColor: colors.border }}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="50vw"
          />
        </div>

        <div className="p-3 text-center">
          <h3 className="text-sm font-bold text-gray-800 mb-1">{item.title}</h3>
          <p className="text-xs text-gray-600">{item.date}</p>
        </div>
      </button>
    </div>
  );
}
