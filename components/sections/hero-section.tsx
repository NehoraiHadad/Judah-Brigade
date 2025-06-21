import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { AnimatedBackground } from "@/components/ui/animated-background"
import Link from "next/link"
import { IMAGES, CONTENT } from "@/constants"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-800 via-teal-700 to-teal-600 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/30 z-10" />
      <Image
        src={IMAGES.HERO_BACKGROUND || "/placeholder.svg"}
        alt="מערת המכפלה ונוף הרי חברון"
        fill
        className="object-cover"
        priority
      />

      <AnimatedBackground>
        <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12 animate-fade-in-up">
            <Logo
              src={IMAGES.LOGO}
              alt="סמל חטיבת יהודה"
              width={100}
              height={100}
              className="mx-auto mb-6 sm:w-[120px] sm:h-[120px] lg:w-[140px] lg:h-[140px]"
              priority
            />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-bold mb-6 sm:mb-8 text-amber-100 leading-tight animate-fade-in-up delay-300 text-center">
            {CONTENT.HERO.TITLE}
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-12 sm:mb-16 text-stone-200 max-w-4xl mx-auto leading-relaxed animate-fade-in-up delay-500 text-center">
            {CONTENT.HERO.SUBTITLE}
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 justify-center items-center animate-fade-in-up delay-700">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Link href={CONTENT.HERO.BUTTONS.PAKAL.href}>{CONTENT.HERO.BUTTONS.PAKAL.label}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 border-white text-white hover:text-teal-800 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl backdrop-blur-sm bg-white/10 hover:bg-white transition-all duration-300 hover:scale-105"
            >
              <Link href={CONTENT.HERO.BUTTONS.BESHVIL.href} target="_blank" rel="noopener noreferrer" className="flex items-center">
                {CONTENT.HERO.BUTTONS.BESHVIL.label}
                <ExternalLink className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </AnimatedBackground>
    </section>
  )
}
