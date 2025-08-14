// Centralized image paths used throughout the app.
// Edit here only – the rest of the code imports from "@/constants"

// ===== LOGOS & BRANDING =====
export const IMAGES = {
  LOGO: "/images/judah-brigade-logo-new.webp",
  MILITARY_LANDSCAPE: "/images/military-landscape.webp",
  WHY_WE_ARE_HERE_BACKGROUND: "/images/military-landscape.webp",
  COMMANDER_BRIGADE: "/images/brigade-activities/commander-brigade - Edited.webp",
  MEMORY_CIRCLE: "/images/brigade-activities/memory-circle-V2.webp",
  MEMORIAL_CANDLES: "/images/brigade-activities/bracha_visual_Memorial_candles_on_the_Judean_Desert_mountains.jpg",
  // Pakal (Shakshuka kit) specific assets
  PAKAL_BACKGROUND: "/images/historical-sites/susya-archaeological-site-for-pakal.webp",
  PAKAL_ILLUSTRATION: "/pakal.webp",
} as const

// ===== HERO CAROUSEL IMAGES =====
// Beautiful Cave of Machpelah and Judah Mountains
export const HERO_CAROUSEL_IMAGES = [
  "/images/hero/hero-cave-machpelah-1.webp",
  "/images/hero/hero-cave-machpelah-2.webp", 
  "/images/Soldiers/Soldier3.webp",
  "/images/Soldiers/Soldier4.webp",
] as const

// ===== ABOUT SECTION CAROUSEL =====
// Brigade activities and sector landscapes
export const CAROUSEL_IMAGES = [
  "/images/cave-of-machpelah/cave-of-machpelah-1.webp",
  "/images/new-images/WhatsApp Image 2025-06-25 at 15.08.04.webp",
  "/images/yatir-forest/yatir-spring.webp",
  "/images/brigade-activities/nahal-shafan-tzalim-meeting.webp",
  "/images/Soldiers/Soldier1.webp",
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


// ===== SPECIALIZED COLLECTIONS =====

// Brigade activities (only used images)
export const BRIGADE_IMAGES = [
  "/images/brigade-activities/commander-brigade - Edited.webp",
  "/images/brigade-activities/memory-circle-V2.webp",
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
