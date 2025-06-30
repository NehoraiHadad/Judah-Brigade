"use client";

import { useState, useEffect, useRef } from "react";
import { SectionTitle } from "@/components/ui/section-title";
import { GradientDivider } from "@/components/ui/gradient-divider";
import { CONTENT } from "@/data";

export function WhyWeAreHereSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2, rootMargin: "50px" }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Function to format text with emphasis on key parts
  const formatContent = (text: string) => {
    return text
      .replace(
        /אברהם העברי הראשון/g,
        '<strong class="text-amber-300 font-bold">אברהם העברי הראשון</strong>'
      )
      .replace(
        /אמהות ואבות האומה הישראלית/g,
        '<strong class="text-amber-300 font-bold">אמהות ואבות האומה הישראלית</strong>'
      )
      .replace(
        /כלב בן יפונה/g,
        '<strong class="text-amber-300 font-bold">כלב בן יפונה</strong>'
      )
      .replace(/דוד/g, '<strong class="text-amber-300 font-bold">דוד</strong>')
      .replace(
        /מלכות בית דוד/g,
        '<strong class="text-amber-300 font-bold">מלכות בית דוד</strong>'
      )
      .replace(
        /שבי ציון/g,
        '<strong class="text-amber-300 font-bold">שבי ציון</strong>'
      )
      .replace(
        /הורדוס/g,
        '<strong class="text-amber-300 font-bold">הורדוס</strong>'
      )
      .replace(
        /מערת המכפלה/g,
        '<strong class="text-amber-300 font-bold">מערת המכפלה</strong>'
      )
      .replace(
        /בר כוכבא/g,
        '<strong class="text-amber-300 font-bold">בר כוכבא</strong>'
      )
      .replace(
        /שמעון בן כוסבא/g,
        '<strong class="text-amber-300 font-bold">שמעון בן כוסבא</strong>'
      )
      .replace(
        /החטיבה הירושלמית/g,
        '<strong class="text-amber-300 font-bold">החטיבה הירושלמית</strong>'
      )
      .replace(
        /תשכ"ז/g,
        '<strong class="text-amber-300 font-bold">תשכ"ז</strong>'
      )
      .replace(
        /הכותל המערבי/g,
        '<strong class="text-amber-300 font-bold">הכותל המערבי</strong>'
      )
      .replace(
        /אנחנו כאן!/g,
        '<strong class="text-amber-200 font-bold text-2xl">אנחנו כאן!</strong>'
      )
      .replace(
        /"עלה נעלה וְיִרְשָׁנוּ אתָהּ כִי-יָכוֹל נוּכַל לָהּ וְהָאָרֶץ אֲשֶׁר עָבַרְנוּ בָהּ לָתוּר אֹתָהּ טוֹבָה הָאָרֶץ מאד מאד"/g,
        '<em class="text-teal-200 italic font-medium">"עלה נעלה וְיִרְשָׁנוּ אתָהּ כִי-יָכוֹל נוּכַל לָהּ וְהָאָרֶץ אֲשֶׁר עָבַרְנוּ בָהּ לָתוּר אֹתָהּ טוֹבָה הָאָרֶץ מאד מאד"</em>'
      )
      .replace(
        /"שקל ישראל", "ירושלים הקדושה" ו"לחירות ציון"/g,
        '<em class="text-teal-200 italic font-medium">"שקל ישראל", "ירושלים הקדושה" ו"לחירות ציון"</em>'
      )
      .replace(
        /"בשנת שלוש לגאולת ישראל על ידי שמעון בן כוסבא נשיא ישראל"/g,
        '<em class="text-teal-200 italic font-medium">"בשנת שלוש לגאולת ישראל על ידי שמעון בן כוסבא נשיא ישראל"</em>'
      );
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-teal-800 via-teal-900 to-slate-900 text-white relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-900/20 via-transparent to-teal-900/40"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 left-20 w-48 h-48 bg-teal-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-16 sm:mb-20">
          <SectionTitle className="text-amber-100 mb-8">
            {CONTENT.WHY_WE_ARE_HERE.TITLE}
          </SectionTitle>
          <GradientDivider size="lg" variant="primary" />
        </div>

        <div
          ref={contentRef}
          className={`transform transition-all duration-1500 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="text-right max-w-5xl mx-auto">

            <div
              className="text-lg sm:text-xl lg:text-2xl leading-relaxed font-medium text-stone-100 space-y-6"
              dangerouslySetInnerHTML={{
                __html: formatContent(CONTENT.WHY_WE_ARE_HERE.CONTENT).replace(
                  /\n/g,
                  "<br><br>"
                ),
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
