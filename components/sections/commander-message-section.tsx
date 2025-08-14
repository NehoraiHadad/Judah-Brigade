"use client";

import { CONTENT } from "@/data";
import Image from "next/image";
import { IMAGES } from "@/constants";
import { useState } from "react";

// Helper function to render content with proper line breaks and formatting
function renderContent(content: string) {
  return content.split("\n\n").map((paragraph, index) => {
    // Check if this is the signature section
    if (paragraph.includes('אל"מ שחר ברקאי')) {
      return (
        <div key={index} className="font-noto">
          {paragraph.split("\n").map((line, lineIndex) => {
            if (line.includes('אל"מ שחר ברקאי')) {
              return (
                <div
                  key={lineIndex}
                  className="font-salman"
                  style={{
                    color: "#ba644d",
                    fontSize: "clamp(1.5rem, 3vw, 3.5rem)",
                    lineHeight: "0.5",
                  }}
                >
                  {line}
                </div>
              );
            }
            if (line.includes("מפקד חטיבת יהודה")) {
              return (
                <div
                  key={lineIndex}
                  className="font-semibold"
                  style={{
                    color: "#ba644d",
                    fontSize: "clamp(1.25rem, 3vw, 2rem)",
                  }}
                >
                  {line}
                </div>
              );
            }
            return (
              <div
                key={lineIndex}
                style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}
              >
                {line}
              </div>
            );
          })}
        </div>
      );
    }

    // Check if this paragraph is the poem (starts with **"When we return)
    if (paragraph.includes('"ועת נשוב')) {
      // Remove the ** markers and format the poem
      const cleanPoem = paragraph
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .join("<br/>");

      return (
        <div
          key={index}
          className="font-noto leading-relaxed italic text-center"
          style={{ 
            fontSize: "clamp(1.25rem, 1.8vw, 2rem)",
          }}
          dangerouslySetInnerHTML={{ __html: cleanPoem }}
        />
      );
    }

    // Check if this paragraph is a regular quote (starts with " or **)
    if (paragraph.startsWith('"') || paragraph.startsWith('**"')) {
      // Format the quote using the same technique as split-layout-section
      const formattedQuote = paragraph
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .split("\n\n")
        .map(
          (p) =>
            `<p style="line-height: inherit;">${p.replace(/\n/g, "<br/>")}</p>`
        )
        .join("");

      return (
        <div
          key={index}
          className="font-noto leading-relaxed"
          style={{ 
            fontSize: "clamp(1.25rem, 2vw, 2.1rem)"
          }}
          dangerouslySetInnerHTML={{ __html: formattedQuote }}
        />
      );
    }

    // Regular paragraph
    return (
      <p
        key={index}
        className="font-noto leading-relaxed"
        style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.8rem)" }}
      >
        {paragraph}
      </p>
    );
  });
}

export function CommanderMessageSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <section
      id="commander-message"
      className="relative overflow-visible lg:py-16 pt-85 lg:pt-16 pb-8"
      style={{ backgroundColor: "#f1ede5" }}
    >
      {/* Commander Image - positioned to overflow upward */}
      <div
        className="absolute top-[-170px] sm:top-[-170px] md:top-[-200px] lg:bottom-0 lg:top-auto z-10 left-0 md:left-[clamp(2rem,5vw,5rem)]"
      >
        <div
          className="relative translate-y-0"
          style={{
            width: "clamp(24rem, 35vw, 50rem)",
            height: "clamp(30rem, 62.5vw, 68.75rem)",
          }}
        >
          <Image
            src={IMAGES.COMMANDER_BRIGADE}
            alt="מפקד החטיבה"
            fill
            priority
            className="object-cover object-top"
          />
        </div>
      </div>

      <div className="container mx-auto px-2 sm:px-3 max-w-7xl">
        <div className="lg:flex">
          {/* Message Content - Responsive width */}
                      <div
              className="flex flex-col justify-center text-center px-6 sm:px-6 w-full md:w-[clamp(55%,55vw,60%)] max-w-full md:max-w-[clamp(55rem,60vw,56rem)]"
            >
            {/* Content */}
            <div
              className="text-black leading-normal font-noto overflow-hidden"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(1rem, 3vw, 2rem)",
                maxHeight: isExpanded ? "350vh" : "100vh",
                transition: "max-height 800ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {renderContent(isExpanded ? CONTENT.COMMANDER_MESSAGE.FULL_CONTENT : CONTENT.COMMANDER_MESSAGE.CONTENT)}
            </div>

            {/* CTA Button */}
            <div className="mt-8 flex flex-col items-center">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center transition-all duration-300 hover:opacity-80 cursor-pointer"
                style={{
                  color: "#000000",
                  fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                }}
              >
                {isExpanded ? "טקסט מקוצר" : "לדבר המפקד"}
              </button>
              {/* Underline */}
              <div
                className="h-1 transition-all duration-500 ease-in-out"
                style={{
                  backgroundColor: "#ba644d",
                  width: isExpanded ? "2rem" : "9rem",
                }}
              />
            </div>
          </div>
          {/* Left spacer to push content to the right */}
          <div className="hidden lg:block" style={{ width: "clamp(10%, 15vw, 20%)" }}>
            {/* Empty spacer */}
          </div>

          {/* Right space reserved for the absolutely positioned image */}
          <div
            className="hidden lg:block fl"
            style={{ width: "clamp(10%, 30vw, 35%)" }}
          >
            {/* This space is reserved for the image overlay */}
          </div>
        </div>
      </div>
    </section>
  );
}
