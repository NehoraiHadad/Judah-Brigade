import React from "react";
import Image from "next/image";

export const TimelineHeader: React.FC = React.memo(() => {
  return (
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
  );
});

TimelineHeader.displayName = "TimelineHeader";