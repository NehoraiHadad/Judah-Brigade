"use client"

import { SectionTitle } from "@/components/ui/section-title"
import { BattalionCard } from "@/components/ui/battalion-card"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import { battalions } from "@/data"
import { CONTENT } from "@/data"

export function PakalSection() {
  const scrollToLinks = () => {
    const linksSection = document.querySelector('#links')
    linksSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="pakal" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 animate-fade-in-up">
          <SectionTitle className="text-teal-800">{CONTENT.PAKAL.TITLE}</SectionTitle>
          <p className="text-lg sm:text-xl lg:text-2xl text-teal-600 max-w-4xl mx-auto leading-relaxed font-medium text-center whitespace-pre-line">
            {CONTENT.PAKAL.DESCRIPTION}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {battalions.map((battalion, index) => (
            <BattalionCard key={index} battalion={battalion} index={index} />
          ))}
        </div>

        {/* Call to Action Button */}
        <div className="text-center animate-fade-in-up delay-700">
          <Button
            onClick={scrollToLinks}
            size="lg"
            className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-amber-500/50"
          >
            <span className="ml-2">רוצים להכיר עוד?</span>
            <ArrowDown className="mr-2 h-5 w-5 animate-bounce" />
          </Button>
        </div>
      </div>
    </section>
  )
}
