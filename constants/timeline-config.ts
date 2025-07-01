// Timeline configuration constants
export const TIMELINE_CONFIG = {
  // Footprint appearance - separate scales for each device type
  FOOTPRINT_SCALE: {
    MOBILE: 0.35,    // < 768px 
    TABLET: 0.7,   // 768px - 1024px 
    DESKTOP: 1.0,   // >= 1024px 
  },
  
  // Path generation
  DEFAULT_WAVINESS: 0.5,
  DEFAULT_SMOOTHNESS: 0.7,
  DEFAULT_SEED: 42,
  DEFAULT_SIDE_OFFSET: 20,
  
  // Performance settings
  PATH_CACHE_TIMEOUT: 30000, // 30 seconds
  PATH_SAMPLE_DISTANCE: 5, // pixels
  DEBOUNCE_DELAY: 50, // ms
  IDLE_CALLBACK_TIMEOUT: 50, // ms
  
  // Animation settings
  FOOTSTEP_ANIMATION_DURATION: 450, // ms
  FOOTSTEP_ANIMATION_DELAY: 120, // ms between footsteps
  FOOTSTEP_FADE_IN_DELAY: 400, // ms before first footstep
} as const;

// Helper to get responsive footprint scale based on screen size
export const getResponsiveFootprintScale = () => {
  if (typeof window === 'undefined') {
    return TIMELINE_CONFIG.FOOTPRINT_SCALE.DESKTOP;
  }
  
  const width = window.innerWidth;
  
  // Return specific scale for each device type
  if (width < 768) {
    return TIMELINE_CONFIG.FOOTPRINT_SCALE.MOBILE;
  } else if (width < 1024) {
    return TIMELINE_CONFIG.FOOTPRINT_SCALE.TABLET;
  } else {
    return TIMELINE_CONFIG.FOOTPRINT_SCALE.DESKTOP;
  }
};

// Easy way to update footprint scale at runtime
export const setFootprintScale = (
  scale: number | { mobile?: number; tablet?: number; desktop?: number }
) => {
  if (typeof scale === 'number') {
    // Set same scale for all devices
    (TIMELINE_CONFIG as any).FOOTPRINT_SCALE.MOBILE = scale;
    (TIMELINE_CONFIG as any).FOOTPRINT_SCALE.TABLET = scale;
    (TIMELINE_CONFIG as any).FOOTPRINT_SCALE.DESKTOP = scale;
  } else {
    // Set specific scales for each device
    if (scale.mobile !== undefined) {
      (TIMELINE_CONFIG as any).FOOTPRINT_SCALE.MOBILE = scale.mobile;
    }
    if (scale.tablet !== undefined) {
      (TIMELINE_CONFIG as any).FOOTPRINT_SCALE.TABLET = scale.tablet;
    }
    if (scale.desktop !== undefined) {
      (TIMELINE_CONFIG as any).FOOTPRINT_SCALE.DESKTOP = scale.desktop;
    }
  }
};

// Helper functions for quick device-specific adjustments
export const setMobileFootprintScale = (scale: number) => {
  (TIMELINE_CONFIG as any).FOOTPRINT_SCALE.MOBILE = scale;
};

export const setTabletFootprintScale = (scale: number) => {
  (TIMELINE_CONFIG as any).FOOTPRINT_SCALE.TABLET = scale;
};

export const setDesktopFootprintScale = (scale: number) => {
  (TIMELINE_CONFIG as any).FOOTPRINT_SCALE.DESKTOP = scale;
}; 