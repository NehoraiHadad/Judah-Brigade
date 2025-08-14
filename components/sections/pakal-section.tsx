"use client";

import { CONTENT } from "@/data";
import { IMAGES } from "@/constants";
import Image from "next/image";

export function PakalSection() {
  // const scrollToLinks = () => {
  //   const linksSection = document.querySelector('#links')
  //   linksSection?.scrollIntoView({ behavior: 'smooth' })
  // }

  // Map each sub-region to its corresponding PDF file
  const pdfFiles = [
    'city-sector-pakal.pdf',
    'hebron-envelope-pakal.pdf',
    'judah-fortresses-pakal.pdf',
    'otniel-sector-pakal.pdf'
  ];

  const handlePdfDownload = (index: number) => {
    const pdfUrl = `/pdf/${pdfFiles[index]}`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = pdfFiles[index];
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="pakal"
      className="relative isolate min-h-[125vh] sm:min-h-[115vh] lg:min-h-[105vh] overflow-visible"
    >
      {/* Background Image with Blue Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={IMAGES.PAKAL_BACKGROUND}
          alt="רקע פקל שקשוקה"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-[#0f2d38]/70" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full h-full px-6 sm:px-6 lg:pl-32 lg:pr-5 flex flex-col py-6 sm:py-6 lg:pt-16">
        {/* Simple 2-column layout on desktop, stacked on mobile */}
        <div className="flex flex-col lg:flex-row sm:gap-12 lg:gap-16 items-stretch flex-1">
          {/* Text column (RTL) - Left side on desktop */}
                      <div
              className="order-2 text-center lg:text-right animate-fade-in-up flex flex-col justify-start lg:justify-center align-bottom lg:order-2 lg:py-0 lg:flex-[2]"
              dir="rtl"
            >
            <h2
              className="text-[#ba644d] font-medium mb-6 text-center lg:text-right font-['Suez_One']"
              style={{
                fontSize: "clamp(2rem, 3vw, 3.5rem)",
                lineHeight: "1.1",
              }}
            >
              {CONTENT.PAKAL.TITLE}
            </h2>

            {/* Tagline */}
            <p
              className="text-white font-bold mb-4 text-center lg:text-right font-['Noto_Sans_Hebrew']"
              style={{
                fontSize: "clamp(1rem, 1.7vw, 2.3rem)",
                lineHeight: "1.3",
              }}
            >
              {CONTENT.PAKAL.TAGLINE}
            </p>

            {/* Description */}
            <p
              className="text-white font-normal whitespace-pre-line mb-4 text-center lg:text-right font-['Noto_Sans_Hebrew']"
              style={{
                fontSize: "clamp(0.875rem, 1.3vw, 1.5rem)",
                lineHeight: "1.6",
              }}
            >
              {CONTENT.PAKAL.DESCRIPTION1}
            </p>
            <p
              className="text-white font-normal whitespace-pre-line mb-8 text-center lg:text-right font-['Noto_Sans_Hebrew']"
              style={{
                fontSize: "clamp(0.875rem, 1.3vw, 1.5rem)",
                lineHeight: "1.4",
              }}
            >
              {CONTENT.PAKAL.DESCRIPTION2}
            </p>

            {/* Educational kits note with arrow */}
            <div className="mb-4 flex items-center justify-center text-[#28d2d2] flex-wrap">
              <span
                className="whitespace-nowrap"
                style={{ fontSize: "clamp(0.875rem, 1.1vw, 1.25rem)" }}
              >
                {CONTENT.PAKAL.KITS_NOTE}
              </span>
              <svg
                className="mt-1 mr-1"
                width="12"
                height="12"
                viewBox="0 0 8 8"
                fill="none"
              >
                <path
                  d="M4 1L4 6M4 6L2 4M4 6L6 4"
                  stroke="#28d2d2"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Sub-Region Buttons */}
            <div
              className="flex justify-center mb-12 sm:mb-16 lg:mb-24"
              style={{ gap: "clamp(0.5rem, 2vw, 2rem)" }}
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 justify-items-stretch w-full max-w-4xl">
                {CONTENT.PAKAL.SUB_REGIONS.map((region: any, index: number) => (
                  <button
                    key={index}
                    className="group bg-[#ba644d] hover:bg-[#a55a44] text-white hover:text-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#ba644d] hover:border-[#a55a44] backdrop-blur-sm font-bold font-['Noto_Sans_Hebrew'] cursor-pointer"
                    style={{
                      padding:
                        "clamp(0.5rem, 1.2vw, 1.2rem) clamp(0.25rem, 1vw, 1rem)",
                      fontSize: "clamp(0.75rem, 1.2vw, 1.3rem)",
                      lineHeight: "1.2",
                    }}
                    onClick={() => handlePdfDownload(index)}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#a55a44")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#ba644d")
                    }
                  >
                    <div className="leading-tight group-hover:text-white transition-colors duration-300 text-center whitespace-pre-line">
                      {region.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Illustration column - Left side on desktop */}
          <div
            className="order-1 animate-fade-in-up delay-300 lg:order-1 relative flex lg:items-start justify-center lg:flex-[2]"
            style={{
              minHeight: "clamp(300px, 40vh, 600px)",
            }}
          >
          <div
               className="relative w-full h-full flex lg:items-start lg:justify-start"
               style={{
                 width: "clamp(280px, 45vw, 900px)",
                 height: "clamp(280px, 45vw, 900px)",
               }}
             >
              <Image
                src={IMAGES.PAKAL_ILLUSTRATION}
                alt="פק״ל שקשוקה"
                height={1000}
                width={1000}
                sizes="(min-width: 1024px) 60vw, 90vw"
                className="object-contain object-center"
                priority
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
