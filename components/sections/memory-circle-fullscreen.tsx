"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ImagePreviewModal } from "@/components/ui/image-preview-modal";
import { IMAGES } from "@/constants";

export function MemoryCircleFullscreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative w-full h-screen sm:h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0" 
        style={{ 
          top: isMobile ? '-25%' : '-30%' 
        }}
      >
        <Image
          src={IMAGES.MEMORIAL_CANDLES}
          alt="נרות זיכרון בהרי יהודה"
          fill
          className="object-contain"
          style={{ 
            transform: isMobile ? 'scale(1.2)' : 'scale(1.15)',
            transformOrigin: 'bottom left',
            clipPath: isMobile ? 'inset(25% 0 0 0)' : 'inset(30% 0 0 0)'
          }}
          priority
        />
      </div>
      
      {/* Clickable area - positioned over specific part of image */}
      <div 
        className="absolute left-[10%] top-[25%] w-[45%] h-[50%] sm:left-[15%] sm:top-[10%] sm:w-[32%] sm:h-[40%] cursor-pointer z-20 transition-colors duration-300 rounded-lg min-h-[44px] min-w-[44px] hover:bg-white/5 active:bg-white/10 sm:hover:bg-white/10"
        onClick={() => setIsModalOpen(true)}
        title="לחץ לצפיה במעגל הזיכרון המלא"
      />
      
      {/* Content */}
      <div className="absolute right-[8%] top-[18%] sm:right-[15%] sm:top-[15%] z-10 text-right max-w-[45%] sm:max-w-[40%] px-2 sm:px-0">
        <h2 
          className="text-white mb-2 sm:mb-4 font-suez-one text-shadow-lg" 
          style={{ fontSize: 'clamp(1.2rem, 3vw, 4rem)' }}
        >
          מעגל הזכרון
        </h2>
        
        <p 
          className="text-white/95 xl:max-w-md lg:max-w-lg sm:max-w-sm text-right leading-relaxed drop-shadow-lg" 
          style={{ fontSize: 'clamp(0.8rem, 1.8vw, 2.2rem)' }}
        >
          זיכרון האבות והאמהות שלנו, זיכרון הלוחמים שנפלו בדרך, 
          זיכרון המורשת הגדולה שאנחנו נושאים עמנו בכל צעד וצעד.
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