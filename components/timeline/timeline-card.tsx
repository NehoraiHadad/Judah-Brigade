import React from "react";
import Image from "next/image";
import { WALL_IMAGES } from "@/constants/images";

interface TimelineCardProps {
  item: {
    id: number;
    title: string;
    date: string;
  };
  index: number;
  isAnimating: boolean;
  onClick: () => void;
}

export const TimelineCard: React.FC<TimelineCardProps> = React.memo(({ 
  item, 
  index, 
  isAnimating, 
  onClick 
}) => {
  return (
    <div className="mb-6 px-2 sm:px-4" onClick={onClick}>
      <div
        className="relative shadow-md overflow-hidden cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out w-full mx-auto"
        style={{
          backgroundColor: "#ba644d",
          transform: isAnimating ? 'scale(1.1)' : 'scale(1)',
          boxShadow: isAnimating ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : undefined,
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out'
        }}
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
  );
});

TimelineCard.displayName = "TimelineCard";