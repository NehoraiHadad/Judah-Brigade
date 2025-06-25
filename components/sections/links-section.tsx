"use client"

import { Globe } from "lucide-react"
import { CONTENT } from "@/data"
// Import from simple-icons library
import { siInstagram, siWhatsapp, siYoutube } from 'simple-icons'

// Simple Icons component using the library
const SimpleIcon = ({ 
  siIcon, 
  className = "h-12 w-12" 
}: { 
  siIcon: any
  className?: string 
}) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-label={siIcon.title}
  >
    <path d={siIcon.path} />
  </svg>
)

// Icon mapping for different link types using simple-icons
const getIconComponent = (text: string) => {
  const lowerText = text.toLowerCase()
  if (lowerText.includes('אינסטגרם') || lowerText.includes('instagram')) {
    return (props: any) => <SimpleIcon siIcon={siInstagram} {...props} />
  }
  if (lowerText.includes('וואטסאפ') || lowerText.includes('whatsapp')) {
    return (props: any) => <SimpleIcon siIcon={siWhatsapp} {...props} />
  }
  if (lowerText.includes('יוטיוב') || lowerText.includes('youtube')) {
    return (props: any) => <SimpleIcon siIcon={siYoutube} {...props} />
  }
  // Default to Globe for website
  return Globe
}

// Color schemes for different platforms
const getIconColor = (text: string) => {
  const lowerText = text.toLowerCase()
  if (lowerText.includes('אינסטגרם') || lowerText.includes('instagram')) {
    return 'text-pink-500 hover:text-pink-600'
  }
  if (lowerText.includes('וואטסאפ') || lowerText.includes('whatsapp')) {
    return 'text-green-500 hover:text-green-600'
  }
  if (lowerText.includes('יוטיוב') || lowerText.includes('youtube')) {
    return 'text-red-500 hover:text-red-600'
  }
  // Default teal for website
  return 'text-teal-500 hover:text-teal-600'
}

export function LinksSection() {
  return (
    <section id="links" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-amber-50 via-white to-teal-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-32 h-32 bg-teal-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-amber-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          {/* <SectionTitle className="text-teal-800 mb-6">{CONTENT.LINKS_SECTION.TITLE}</SectionTitle> */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-teal-600 font-medium mb-8 max-w-4xl mx-auto leading-relaxed">
            {CONTENT.LINKS_SECTION.SUBTITLE}
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-amber-400 via-teal-500 to-amber-400 mx-auto rounded-full mb-8"></div>
          <p className="text-lg sm:text-xl lg:text-2xl text-amber-700 font-bold max-w-3xl mx-auto">
            {CONTENT.LINKS_SECTION.ACTION_TEXT}
          </p>
        </div>

        {/* Enhanced Icons Grid - Mobile Optimized */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 max-w-4xl mx-auto">
          {CONTENT.LINKS_SECTION.LINKS.map((link, index) => {
            const IconComponent = getIconComponent(link.text)
            const iconColor = getIconColor(link.text)
            
            return (
              <div
                key={index}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 sm:p-4 md:p-5 rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
                  title={link.text}
                >
                  <IconComponent className={`h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 ${iconColor} transition-all duration-300`} />
                </a>
              </div>
            )
          })}
        </div>
        </div>
    </section>
  )
} 