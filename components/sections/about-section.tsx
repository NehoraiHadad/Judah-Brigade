"use client"

import { SectionTitle } from "@/components/ui/section-title"
import { useCarousel } from "@/hooks/use-carousel"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const CAROUSEL_IMAGES = [
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
]

const CONTENT = {
  ABOUT: {
    TITLE: "על החטיבה בקצרה",
    DESCRIPTION:
      'חטיבת יהודה היא יחידה מיוחדת בצה"ל הפועלת באזור יהודה ושומרון. החטיבה מורכבת מגדודים מנוסים ומאומנים המשלבים בין משימות ביטחוניות לבין שמירה על המורשת ההיסטורית של האזור.',
    POINTS: [
      "שמירה על ביטחון התושבים והמתיישבים באזור",
      "חיבור בין החיילים למורשת ההיסטורית של עם ישראל",
      "פעילות חינוכית וערכית לחיזוק הזהות היהודית",
    ],
    CONCLUSION:
      "האתר הזה נועד לחבר בין החיילים לבין ההיסטוריה העשירה של האזור, ולספק כלים לחיזוק הרקע הערכי והרוחני של הלוחמים.",
  },
}

export function AboutSection() {
  const { currentIndex, next, prev, goTo } = useCarousel(CAROUSEL_IMAGES.length)

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-stone-50 to-stone-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionTitle className="text-teal-800">{CONTENT.ABOUT.TITLE}</SectionTitle>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <div className="space-y-6 sm:space-y-8 animate-fade-in-up delay-300 text-right">
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-teal-700 font-medium">
              {CONTENT.ABOUT.DESCRIPTION}
            </p>

            <ul className="space-y-4 sm:space-y-5 text-base sm:text-lg lg:text-xl text-teal-700">
              {CONTENT.ABOUT.POINTS.map((point, index) => (
                <li key={index} className="flex items-start group text-right">
                  <span className="text-amber-600 ml-3 text-xl group-hover:scale-110 transition-transform duration-200">
                    •
                  </span>
                  <span className="font-medium">{point}</span>
                </li>
              ))}
            </ul>

            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-teal-700 font-medium">
              {CONTENT.ABOUT.CONCLUSION}
            </p>
          </div>

          <div className="relative animate-fade-in-up delay-500">
            <div className="relative h-80 sm:h-96 lg:h-[28rem] rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src={CAROUSEL_IMAGES[currentIndex] || "/placeholder.svg"}
                alt={`תמונה ${currentIndex + 1} מהאזור`}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-105"
              />

              <button
                onClick={prev}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              <button
                onClick={next}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>

            <div className="flex justify-center mt-6 space-x-3">
              {CAROUSEL_IMAGES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-amber-600 scale-125 shadow-lg"
                      : "bg-gray-300 hover:bg-gray-400 hover:scale-110"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
