import Image from "next/image"
import { Mail, Phone } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { IMAGES } from "@/constants"
import { CONTENT } from "@/data"

export function FooterSection() {
  return (
    <footer className="relative bg-teal-900 text-white overflow-hidden">
      {/* Military Landscape Section - Top */}
      <div className="relative h-32 sm:h-40 lg:h-48">
        <Image
          src={IMAGES.MILITARY_LANDSCAPE || "/placeholder.svg"}
          alt="נוף צבאי"
          fill
          className="object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 to-transparent"></div>
      </div>

      {/* Content Section - Bottom */}
      <div className="relative bg-teal-900 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Main Content - Horizontal Layout */}
          <div className="flex flex-col md:flex-row items-center justify-around">
            {/* Logo Section */}
            <div className="animate-fade-in-up">
              <Logo 
                src={IMAGES.LOGO} 
                alt="סמל חטיבת יהודה" 
                width={100} 
                height={100} 
                className="hover:scale-105 transition-transform duration-300" 
              />
            </div>

            {/* Contact Section */}
            <div className="text-center md:text-center animate-fade-in-up delay-300">
              <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-amber-200">
                {CONTENT.FOOTER.CONTACT_TITLE}
              </h4>
              <div className="flex flex-col sm:flex-row items-center md:items-start gap-4 sm:gap-8">
                <div className="flex items-center text-sm sm:text-base group cursor-pointer">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 ml-3 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:text-amber-200 transition-colors font-medium">
                    {CONTENT.FOOTER.EDUCATION_OFFICER_PHONE}
                  </span>
                </div>
                <div className="flex items-center text-sm sm:text-base group cursor-pointer">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 ml-3 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:text-amber-200 transition-colors font-medium">
                    {CONTENT.FOOTER.EMAIL}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-teal-700/50 mt-12 sm:mt-16 pt-8 sm:pt-12 text-center animate-fade-in-up delay-700">
            <p className="text-sm sm:text-base text-stone-400 mb-4">{CONTENT.FOOTER.COPYRIGHT}</p>
            <p className="text-xs sm:text-sm text-stone-500 max-w-2xl mx-auto leading-relaxed">
              {CONTENT.FOOTER.QUOTE}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
