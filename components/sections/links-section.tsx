"use client"

import { Globe } from "lucide-react"
import { GradientDivider } from "@/components/ui/gradient-divider"
import { CONTENT } from "@/data"

// Custom CSS animations for better UX
const pulseAnimation = `
@keyframes gentle-pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.animate-gentle-pulse {
  animation: gentle-pulse 2s ease-in-out infinite;
}
`

// Static SVG icons instead of simple-icons library for better performance
const InstagramIcon = ({ className = "h-12 w-12" }) => (
  <svg role="img" viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const WhatsAppIcon = ({ className = "h-12 w-12" }) => (
  <svg role="img" viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
)

const YouTubeIcon = ({ className = "h-12 w-12" }) => (
  <svg role="img" viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

// Icon mapping for different link types using static SVGs
const getIconComponent = (text: string) => {
  const lowerText = text.toLowerCase()
  if (lowerText.includes('אינסטגרם') || lowerText.includes('instagram')) {
    return InstagramIcon
  }
  if (lowerText.includes('וואטסאפ') || lowerText.includes('whatsapp')) {
    return WhatsAppIcon
  }
  if (lowerText.includes('יוטיוב') || lowerText.includes('youtube')) {
    return YouTubeIcon
  }
  // Default to Globe for website
  return Globe
}

// Color schemes for different platforms with glow effects
const getIconColor = (text: string) => {
  const lowerText = text.toLowerCase()
  if (lowerText.includes('אינסטגרם') || lowerText.includes('instagram')) {
    return 'text-pink-500 hover:text-pink-600 hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]'
  }
  if (lowerText.includes('וואטסאפ') || lowerText.includes('whatsapp')) {
    return 'text-green-500 hover:text-green-600 hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]'
  }
  if (lowerText.includes('יוטיוב') || lowerText.includes('youtube')) {
    return 'text-red-500 hover:text-red-600 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]'
  }
  // Default teal for website
  return 'text-teal-500 hover:text-teal-600 hover:drop-shadow-[0_0_8px_rgba(20,184,166,0.6)]'
}

export function LinksSection() {
  return (
    <>
      {/* Inject CSS animations */}
      <style jsx>{pulseAnimation}</style>
      
      <section id="links" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-amber-50 via-white to-teal-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-32 h-32 bg-teal-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-amber-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
        {/* Title Section */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
          <h2 className="mb-0 text-center font-['Suez_One'] text-[#ba644d] text-4xl  lg:text-6xl">
            {CONTENT.LINKS_SECTION.TITLE}
          </h2>
        </div>

        <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
          <p className="text-base sm:text-lg lg:text-xl text-[#0f2d38] font-bold max-w-3xl mx-auto">
            {CONTENT.LINKS_SECTION.ACTION_TEXT}
          </p>
        </div>

        {/* Enhanced Icons Grid - Single Row Layout */}
        <div className="flex justify-center items-center gap-3 sm:gap-6 md:gap-8 lg:gap-12 max-w-4xl mx-auto overflow-x-auto pb-2">
          {CONTENT.LINKS_SECTION.LINKS.map((link: any, index: number) => {
            const IconComponent = getIconComponent(link.text)
            const iconColor = getIconColor(link.text)
            
            return (
              <div
                key={index}
                className="group animate-fade-in-up flex-shrink-0"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 sm:p-4 md:p-5 rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
                  title={link.text}
                >
                  <IconComponent className={`h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 ${iconColor} transition-all duration-300 animate-gentle-pulse`} />
                </a>
              </div>
            )
          })}
        </div>
        </div>
      </section>
    </>
  )
} 