// Centralized image paths used throughout the app.
// Edit here only – the rest of the code imports from "@/constants"

// ===== LOGOS & BRANDING =====
export const IMAGES = {
  LOGO: "/images/judah-brigade-logo-new.webp",
  MILITARY_LANDSCAPE: "/images/military-landscape.webp",
  WHY_WE_ARE_HERE_BACKGROUND: "/images/military-landscape.webp",
  COMMANDER_BRIGADE: "/images/brigade-activities/commander-brigade.webp",
  MEMORY_CIRCLE: "/images/brigade-activities/memory-circle-V2.webp",
} as const

// ===== HERO CAROUSEL IMAGES =====
// Beautiful Cave of Machpelah and Judah Mountains
export const HERO_CAROUSEL_IMAGES = [
  "/images/hero/hero-cave-machpelah-1.webp",
  "/images/hero/hero-cave-machpelah-2.webp", 
  "/images/hero/hero-yatir-spring.webp",
  "/images/hero/hero-carmel-settlement.webp",
] as const

// ===== ABOUT SECTION CAROUSEL =====
// Brigade activities and sector landscapes
export const CAROUSEL_IMAGES = [
  "/images/cave-of-machpelah/cave-of-machpelah-1.webp",
  "/images/new-images/WhatsApp Image 2025-06-25 at 15.08.04.webp",
  "/images/yatir-forest/yatir-spring.webp",
  "/images/brigade-activities/nahal-shafan-tzalim-meeting.webp",
  "/images/new-images/WhatsApp Image 2025-06-25 at 15.08.04 (1).webp",
  "/images/aerial-views/yatir-reservoir-aerial.webp",
  "/images/yatir-forest/yatir-autumn.webp",
  "/images/new-images/WhatsApp Image 2025-06-25 at 15.08.04 (2).webp",
  "/images/aerial-views/mitzpe-yair-viewpoint.webp",
  "/images/desert-landscapes/desert-camels-landscape.webp",
  "/images/new-images/WhatsApp Image 2025-06-25 at 15.08.05.webp",
  "/images/desert-landscapes/sunset-shamea.webp",
  "/images/aerial-views/dji-aerial-landscape.webp",
  "/images/historical-sites/susya-archaeological-site.webp",
] as const

// ===== TIMELINE IMAGES =====
// Historical timeline images in chronological order
export const TIMELINE_IMAGES = {
  ABRAHAM: "/images/timeline/timeline-01-abraham.webp",
  CALEB: "/images/timeline/timeline-02-caleb.webp",
  DAVID: "/images/timeline/timeline-03-david.webp",
  SECOND_TEMPLE: "/images/timeline/timeline-04-second-temple.webp",
  BAR_KOKHBA: "/images/timeline/timeline-05-bar-kokhba.webp",
  MISHNAH: "/images/timeline/timeline-06-mishnah.webp",
  MUSLIM: "/images/timeline/timeline-07-muslim.webp",
  CRUSADER: "/images/timeline/timeline-08-crusader.webp",
  MAMLUK: "/images/timeline/timeline-09-mamluk.webp",
  OTTOMAN: "/images/timeline/timeline-10-ottoman.webp",
  PRE_STATE: "/images/timeline/timeline-11-pre-state.webp",
  EARLY_STATE: "/images/timeline/timeline-12-early-state.webp",
  SIX_DAY_WAR: "/images/timeline/timeline-13-six-day-war.webp",
  WHY_WE_ARE_HERE: "/images/timeline/timeline-14-why-are-we-here.webp",
  SUMMARY: "/images/timeline/timeline-15-summary.webp",
} as const

// ===== TIMELINE ORDERED ARRAY =====
// For easy iteration in timeline components
export const TIMELINE_IMAGES_ARRAY = [
  TIMELINE_IMAGES.ABRAHAM,
  TIMELINE_IMAGES.CALEB,
  TIMELINE_IMAGES.DAVID,
  TIMELINE_IMAGES.SECOND_TEMPLE,
  TIMELINE_IMAGES.BAR_KOKHBA,
  TIMELINE_IMAGES.MISHNAH,
  TIMELINE_IMAGES.MUSLIM,
  TIMELINE_IMAGES.CRUSADER,
  TIMELINE_IMAGES.MAMLUK,
  TIMELINE_IMAGES.OTTOMAN,
  TIMELINE_IMAGES.PRE_STATE,
  TIMELINE_IMAGES.EARLY_STATE,
  TIMELINE_IMAGES.SIX_DAY_WAR,
  TIMELINE_IMAGES.WHY_WE_ARE_HERE,
  TIMELINE_IMAGES.SUMMARY,
] as const

// ===== SPECIALIZED COLLECTIONS =====

// Cave of Machpelah images
export const CAVE_IMAGES = [
  "/images/cave-of-machpelah/cave-of-machpelah-1.webp",
  "/images/cave-of-machpelah/cave-of-machpelah-2.webp",
] as const

// Yatir Forest images
export const YATIR_IMAGES = [
  "/images/yatir-forest/yatir-spring.webp",
  "/images/yatir-forest/yatir-autumn.webp",
] as const

// Aerial views
export const AERIAL_IMAGES = [
  "/images/aerial-views/dji-aerial-landscape.webp",
  "/images/aerial-views/mitzpe-yair-viewpoint.webp",
  "/images/aerial-views/yatir-reservoir-aerial.webp",
] as const

// Desert landscapes
export const DESERT_IMAGES = [
  "/images/desert-landscapes/desert-camels-landscape.webp",
  "/images/desert-landscapes/sunset-shamea.webp",
] as const

// Brigade activities
export const BRIGADE_IMAGES = [
  "/images/brigade-activities/commander-brigade.webp",
  "/images/brigade-activities/memory-circle-V2.webp",
  "/images/brigade-activities/nahal-shafan-tzalim-meeting.webp",
] as const

// New WhatsApp images (converted to WebP)
export const NEW_IMAGES = [
  "/images/new-images/WhatsApp Image 2025-06-25 at 15.08.04.webp",
  "/images/new-images/WhatsApp Image 2025-06-25 at 15.08.04 (1).webp",
  "/images/new-images/WhatsApp Image 2025-06-25 at 15.08.04 (2).webp",
  "/images/new-images/WhatsApp Image 2025-06-25 at 15.08.05.webp",
] as const

// Historical sites
export const HISTORICAL_IMAGES = [
  "/images/historical-sites/susya-archaeological-site.webp",
] as const

// ===== WALL GRAFFITI TIMELINE BACKGROUND IMAGES =====
// Images shown in the floating transparent window for timeline atmosphere
export const WALL_IMAGES = [
  "/images/timeline/background/image.webp",
  "/images/timeline/background/WhatsApp Image 2025-06-23 at 15.45.27.webp",
  "/images/timeline/background/WhatsApp Image 2025-06-23 at 15.45.28.webp",
  "/images/timeline/background/WhatsApp Image 2025-06-23 at 15.45.29.webp",
  "/images/timeline/background/WhatsApp Image 2025-06-23 at 15.45.30.webp",
  "/images/timeline/background/WhatsApp Image 2025-06-23 at 15.45.31.webp",
  "/images/timeline/background/WhatsApp Image 2025-06-23 at 15.45.32.webp",
  "/images/timeline/background/WhatsApp Image 2025-06-23 at 15.45.35.webp",
  "/images/timeline/background/WhatsApp Image 2025-06-23 at 15.45.36.webp",
  "/images/timeline/background/WhatsApp Image 2025-06-23 at 15.45.37.webp",
  "/images/timeline/background/WhatsApp Image 2025-06-23 at 15.45.38.webp",
  "/images/timeline/background/WhatsApp Image 2025-06-23 at 15.45.39.webp",
  "/images/timeline/background/WhatsApp Image 2025-06-23 at 15.45.40.webp",
  "/images/timeline/background/WhatsApp Image 2025-06-23 at 15.45.41.webp",
  "/images/timeline/background/WhatsApp Image 2025-06-23 at 15.45.42.webp",
] as const

// ===== TYPE EXPORTS FOR BETTER TYPE SAFETY =====
export type HeroImage = typeof HERO_CAROUSEL_IMAGES[number]
export type CarouselImage = typeof CAROUSEL_IMAGES[number]
export type TimelineImage = typeof TIMELINE_IMAGES_ARRAY[number]
