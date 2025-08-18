"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagePreviewModal } from "@/components/ui/image-preview-modal";
import { IMAGES } from "@/constants";

export function MemoryCircleFullscreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative w-full ">
      {/* Background Image */}
      <div className="relative w-full">
        <Image
          src={IMAGES.MEMORIAL_CANDLES}
          alt="נרות זיכרון בהרי יהודה"
          width={1920}
          height={1080}
          className="w-full object-contain"
          style={{
            transform: "scale(1.15)",
            transformOrigin: "bottom left",
            clipPath: "inset(20% 0 0 0)",
          }}
          priority
        />
      </div>

      {/* Clickable area - positioned over specific part of image */}
      <div
        className="absolute left-[15%] top-[20%] w-[32%] h-[60%] cursor-pointer z-20 transition-colors duration-300 rounded-lg"
        onClick={() => setIsModalOpen(true)}
        title="לחץ לצפיה במעגל הזיכרון המלא"
      />

      {/* Content */}
      <div className="absolute right-[10%] md:right-[15%] top-[20%] md:top-[25%] z-10 text-right max-w-[40%]">
        <h2
          className="text-white lg:mb-4 font-suez-one"
          style={{ fontSize: "clamp(1rem, 3.5vw, 4rem)" }}
        >
          מעגל הזכרון
        </h2>

        <p
          className="text-white/90 max-w-md text-right leading-normal"
          style={{ fontSize: "clamp(0.6rem, 1.8vw, 2.2rem)" }}
        >
          זיכרון המסע שעברנו, זיכרון הלוחמים שנפלו בדרך, זיכרון המורשת
          הגדולה שאנחנו נושאים עמנו בכל צעד וצעד. (טקסט זמני)
        </p>
      </div>

      {/* Modal */}
      <ImagePreviewModal
        src={IMAGES.MEMORY_CIRCLE}
        alt="מעגל הזכרון - חטיבת יהודה"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="מעגל הזכרון"
      />
    </section>
  );
}
