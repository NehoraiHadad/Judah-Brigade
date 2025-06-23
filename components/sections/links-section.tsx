"use client"

import { Button } from "@/components/ui/button"
import { SectionTitle } from "@/components/ui/section-title"
import { ExternalLink } from "lucide-react"
import { CONTENT } from "@/constants"

export function LinksSection() {
  return (
    <section id="links" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-amber-50 via-white to-teal-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-12 sm:mb-16">
          <SectionTitle className="text-teal-800 mb-6">{CONTENT.LINKS_SECTION.TITLE}</SectionTitle>
          <p className="text-xl sm:text-2xl lg:text-3xl text-teal-600 font-medium mb-8 max-w-4xl mx-auto">
            {CONTENT.LINKS_SECTION.SUBTITLE}
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-amber-400 via-teal-500 to-amber-400 mx-auto rounded-full mb-8"></div>
          <p className="text-lg sm:text-xl lg:text-2xl text-amber-700 font-bold max-w-3xl mx-auto">
            {CONTENT.LINKS_SECTION.ACTION_TEXT}
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {CONTENT.FOOTER.LINKS.map((link, index) => (
            <div
              key={index}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <Button
                asChild
                size="lg"
                className="w-full h-24 bg-gradient-to-br from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-6 py-8 text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-teal-500/50"
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-3"
                >
                  <ExternalLink className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-center leading-tight">{link.text}</span>
                </a>
              </Button>
            </div>
          ))}
        </div>


      </div>
    </section>
  )
} 