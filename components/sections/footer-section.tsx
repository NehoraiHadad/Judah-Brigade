import Image from "next/image"
import { Mail, MapPin } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { IMAGES, CONTENT } from "@/constants"

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 items-start">
            {/* Logo Section */}
            <div className="text-center md:text-right animate-fade-in-up">
              <Logo src={IMAGES.LOGO} alt="סמל חטיבת יהודה" width={100} height={100} className="mx-auto md:mx-0" />
            </div>

            {/* Contact Section */}
            <div className="text-center animate-fade-in-up delay-300">
              <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-amber-200">
                {CONTENT.FOOTER.CONTACT_TITLE}
              </h4>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-center text-sm sm:text-base group">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 ml-3 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:text-amber-200 transition-colors">{CONTENT.FOOTER.EMAIL}</span>
                </div>
                <div className="flex items-center justify-center text-sm sm:text-base group">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 ml-3 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:text-amber-200 transition-colors">{CONTENT.FOOTER.LOCATION}</span>
                </div>
              </div>
            </div>

            {/* Links Section */}
            <div className="text-center md:text-left animate-fade-in-up delay-500">
              <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-amber-200">{CONTENT.FOOTER.LINKS_TITLE}</h4>
              <div className="space-y-3 sm:space-y-4">
                {CONTENT.FOOTER.LINKS.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="block text-sm sm:text-base text-stone-300 hover:text-amber-300 transition-colors duration-300 hover:underline"
                  >
                    {link.text}
                  </a>
                ))}
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
