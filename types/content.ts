export interface ContentSection {
  TITLE: string
  SUBTITLE: string
  CONTENT: string
  FULL_CONTENT?: string
  IMAGE?: string
}

export interface ButtonConfig {
  label: string
  href: string
}

export interface HeroContent {
  TITLE: string
  SUBTITLE: string
  TAGLINE: string
  BUTTONS: {
    PAKAL: ButtonConfig
    BESHVIL: ButtonConfig
  }
}

export interface ContentData {
  HERO: HeroContent
  INTRODUCTION: ContentSection
  MISSION: ContentSection
  [key: string]: any // For other dynamic sections
}