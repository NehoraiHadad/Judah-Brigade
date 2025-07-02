import React, { useMemo, useLayoutEffect, useRef, useEffect } from 'react';
import { PathGenerator } from '@/lib/path-generator';
import { useFootstepStreaming } from '@/hooks/use-footstep-streaming';
import { pathCache } from '@/utils/path-cache';
import { getResponsiveFootprintScale } from '@/constants/timeline-config';

// Access the global debug logger (defined in timeline-mobile.tsx)
declare global {
  interface Window {
    addDebugLog?: (message: string) => void;
  }
}

// Helper to add debug logs safely
const addDebugLog = (message: string) => {
  if (typeof window !== 'undefined' && window.addDebugLog) {
    window.addDebugLog(message);
  }
};

interface Point {
  x: number;
  y: number;
}



interface TimelineContinuousPathProps {
  diamonds: Point[];
  width: number;
  height: number;
  className?: string;
  animated?: boolean;
  waviness?: number;
  smoothness?: number;
  seed?: number;
  sideOffset?: number;
  visibleUntilIndex?: number;
  footprintScale?: number; // Control footprint size
}

// Responsive configuration
const getResponsiveConfig = () => {
  if (typeof window === 'undefined') {
    return { scale: 0.015, stride: 35, footSpacing: 12, footOffset: 6 };
  }
  
  const width = window.innerWidth;
  if (width < 768) {
    return { scale: 0.035, stride: 25, footSpacing: 12, footOffset: 6 };
  } else if (width < 1024) {
    return { scale: 0.020, stride: 30, footSpacing: 11, footOffset: 6 };
  } else {
    return { scale: 0.015, stride: 35, footSpacing: 12, footOffset: 6 };
  }
};

const TimelineContinuousPathComponent: React.FC<TimelineContinuousPathProps> = ({
  diamonds,
  width,
  height,
  className = "",
  animated = true,
  waviness = 0.5,
  smoothness = 0.7,
  seed = 42,
  sideOffset = 20,
  visibleUntilIndex,
  footprintScale = 1.0, // Default scale
}) => {
  const pathRef = useRef<SVGSVGElement>(null);
  const pathDataRef = useRef<string>('');
  const lastTargetDistanceRef = useRef(0);
  
  // Use the enhanced footstep streaming hook
  const { footsteps, addFootsteps, resetFootsteps } = useFootstepStreaming();

  // Generate path using the extracted PathGenerator class
  const pathData = useMemo(() => {
    // Lazy generation: only create path when we have diamonds
    if (diamonds.length === 0) return '';
    
    const pathGenerator = new PathGenerator(seed, waviness, smoothness, sideOffset);
    return pathGenerator.generatePath(diamonds);
  }, [diamonds, waviness, smoothness, seed, sideOffset]);

  // Main effect for footstep generation
  useLayoutEffect(() => {
    if (!pathData || typeof document === 'undefined') return;

    try {
      const { totalLength } = pathCache.getOrCreateTempPath(pathData);
      let targetDistance = totalLength;

      // Calculate target distance based on visible diamonds
      if (
        typeof visibleUntilIndex === 'number' &&
        visibleUntilIndex >= 0 &&
        diamonds.length > 1 &&
        visibleUntilIndex < diamonds.length
      ) {
        const ratio = (visibleUntilIndex + 1) / diamonds.length;
        const calculatedDistance = totalLength * ratio;
        
        // Never go backwards - only advance forward
        targetDistance = Math.max(calculatedDistance, lastTargetDistanceRef.current);
      } else {
        // If no specific limit, use full path but don't go backwards
        targetDistance = Math.max(totalLength, lastTargetDistanceRef.current);
      }

      // Only proceed if we have a new target distance
      if (targetDistance > lastTargetDistanceRef.current) {
        lastTargetDistanceRef.current = targetDistance;
        
        const config = getResponsiveConfig();
        addFootsteps(pathData, targetDistance, config);
        
        // Debug: Log footstep generation for production troubleshooting
        if (process.env.NODE_ENV === 'production') {
          const logMessage = `Footsteps generated: targetDistance=${Math.round(targetDistance)}, totalLength=${Math.round(pathCache.getOrCreateTempPath(pathData).totalLength)}, visibleIndex=${visibleUntilIndex ?? 'initial'}, device=${window.innerWidth < 768 ? 'mobile' : 'desktop'}`;
          console.log(logMessage);
          addDebugLog(logMessage);
        }
      }
    } catch (error) {
      // Enhanced error logging for mobile debugging
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack?.slice(0, 200) : undefined;
      
      const errorLog = `ERROR in footsteps: ${errorMessage}, pathLength=${pathData?.length || 0}, diamonds=${diamonds.length}, visible=${visibleUntilIndex}, viewport=${window.innerWidth}x${window.innerHeight}`;
      console.error(errorLog);
      addDebugLog(errorLog);
    }
  }, [pathData, visibleUntilIndex, diamonds.length, addFootsteps]);

  // Reset when path changes significantly
  useLayoutEffect(() => {
    if (pathData !== pathDataRef.current) {
      resetFootsteps();
      lastTargetDistanceRef.current = 0;
      pathDataRef.current = pathData;
    }
  }, [pathData, resetFootsteps]);

  const gradientId = useMemo(() => 
    `footstep-gradient-${Math.random().toString(36).substr(2, 9)}`, 
    []
  );

  // Production logging: Track footsteps count for debugging
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && footsteps.length > 0) {
      const renderLog = `Footsteps rendered: count=${footsteps.length}, lastId=${footsteps[footsteps.length - 1]?.id || 'none'}`;
      console.log(renderLog);
      addDebugLog(renderLog);
    }
  }, [footsteps.length]);

  // Lazy SVG creation: don't render if no path or footsteps
  if (!pathData || diamonds.length === 0) return null;

  return (
    <>
      {/* SVG with footsteps path */}
      <svg
        ref={pathRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className={`${className} overflow-visible`}
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          pointerEvents: 'none',
          zIndex: 0,
          willChange: 'opacity, transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2d8c8" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#ab9b84" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#8c7c68" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#6e614e" stopOpacity="0.85" />
          </linearGradient>
          
          <filter id="footstep-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.3"/>
          </filter>

          {/* Footprint symbols for reuse */}
          <g id="foot-left" transform="translate(0, 1280) scale(0.1, -0.1)">
            <path d="M8402 12785 c-683 -105 -1241 -617 -1417 -1300 -185 -717 111 -1431 726 -1755 105 -54 260 -109 389 -137 131 -28 448 -25 590 6 436 93 812 347 1069 721 394 573 413 1309 49 1855 -68 102 -219 259 -327 340 -156 118 -368 213 -569 255 -129 28 -381 35 -510 15z" />
            <path d="M3525 12592 c-156 -47 -299 -158 -398 -310 -89 -136 -125 -263 -134 -468 -16 -389 121 -727 362 -891 231 -156 477 -184 681 -78 77 41 101 58 182 138 108 106 178 231 218 388 24 99 30 343 11 465 -61 383 -238 620 -548 735 -73 28 -100 32 -199 35 -90 3 -128 0 -175 -14z" />
            <path d="M5514 12589 c-134 -16 -252 -77 -365 -189 -204 -201 -331 -515 -333 -820 0 -128 12 -200 54 -302 41 -101 86 -171 160 -248 164 -170 392 -260 630 -247 173 9 287 58 412 175 179 169 296 406 343 697 14 82 6 263 -15 346 -56 225 -229 429 -447 525 -126 56 -297 81 -439 63z" />
            <path d="M1835 11855 c-150 -28 -271 -91 -375 -195 -154 -154 -215 -326 -190 -532 26 -217 142 -450 304 -612 131 -131 258 -195 422 -215 237 -29 458 51 622 223 119 125 172 258 172 431 0 210 -81 419 -240 619 -185 234 -439 333 -715 281z" />
            <path d="M402 10644 c-89 -23 -164 -66 -228 -129 -70 -70 -106 -127 -142 -228 -22 -63 -25 -89 -26 -202 0 -150 13 -212 75 -343 217 -465 762 -632 1063 -327 62 63 117 162 142 255 21 79 23 240 5 325 -81 375 -413 667 -755 664 -45 0 -105 -7 -134 -15z" />
            <path d="M4230 10524 c-581 -43 -990 -144 -1515 -376 -535 -236 -925 -488 -1235 -798 -148 -147 -231 -249 -345 -420 -297 -448 -481 -1004 -614 -1855 -51 -327 -56 -400 -56 -845 0 -402 6 -523 41 -870 144 -1445 571 -2910 1126 -3870 189 -327 381 -583 603 -806 204 -205 364 -325 572 -428 221 -110 471 -176 883 -233 177 -24 563 -24 718 0 314 49 552 147 746 308 214 177 336 408 365 697 19 181 -15 382 -106 626 -64 174 -259 560 -434 861 -342 587 -427 740 -525 940 -164 336 -217 502 -234 732 -55 729 314 1300 1057 1633 304 136 602 212 1078 275 586 77 996 418 1184 982 169 507 138 1115 -88 1723 -39 104 -146 326 -209 435 -184 316 -444 597 -726 786 -247 164 -668 327 -1066 413 -296 63 -522 86 -875 90 -159 2 -315 2 -345 0z" />
          </g>
          
          <g id="foot-right" transform="translate(0, 1280) scale(0.1, -0.1)">
            <path d="M1270 12789 c-241 -31 -492 -132 -681 -274 -108 -81 -259 -238 -327 -340 -326 -488 -347 -1142 -55 -1685 248 -461 672 -784 1173 -891 142 -31 459 -34 590 -6 293 63 536 193 741 398 260 261 411 614 426 1004 35 881 -614 1667 -1477 1790 -113 16 -285 18 -390 4z" />
            <path d="M6243 12595 c-346 -94 -555 -349 -620 -759 -19 -122 -13 -366 11 -465 40 -157 110 -282 218 -388 81 -80 105 -97 182 -138 204 -106 450 -78 681 78 154 105 272 292 329 522 58 236 44 528 -35 717 -85 204 -281 382 -476 432 -74 20 -219 20 -290 1z" />
            <path d="M4343 12589 c-176 -21 -333 -100 -468 -234 -155 -154 -225 -323 -226 -548 -1 -111 2 -143 22 -242 33 -157 121 -359 209 -476 64 -85 173 -188 241 -227 174 -99 406 -108 631 -25 144 54 309 189 386 316 83 137 116 262 116 427 -2 309 -130 621 -339 826 -87 86 -203 153 -295 173 -72 15 -199 20 -277 10z" />
            <path d="M7945 11855 c-346 -72 -665 -503 -665 -900 0 -173 53 -306 172 -431 164 -172 385 -252 622 -223 164 20 291 84 422 215 162 162 278 395 304 612 25 207 -36 378 -192 534 -61 61 -96 86 -170 122 -51 25 -120 53 -153 61 -87 23 -255 28 -340 10z" />
            <path d="M9373 10640 c-287 -75 -527 -336 -594 -645 -18 -85 -16 -246 5 -325 25 -93 80 -192 142 -255 301 -305 846 -138 1063 327 62 131 75 193 75 343 -1 113 -4 139 -26 202 -36 101 -72 158 -142 228 -132 129 -328 176 -523 125z" />
            <path d="M5285 10524 c-493 -37 -871 -117 -1250 -265 -361 -141 -604 -297 -835 -535 -206 -213 -344 -413 -484 -704 -351 -726 -388 -1580 -94 -2164 219 -438 588 -694 1093 -761 375 -50 589 -96 835 -180 698 -240 1141 -667 1266 -1224 34 -153 47 -340 34 -504 -17 -230 -70 -396 -234 -732 -98 -200 -183 -353 -525 -940 -175 -301 -370 -687 -434 -861 -91 -244 -125 -445 -106 -626 29 -289 151 -520 365 -697 194 -161 432 -259 746 -308 155 -24 541 -24 718 0 412 57 662 123 883 233 208 103 368 223 572 428 299 299 544 660 790 1161 508 1035 846 2370 967 3815 17 210 17 945 0 1105 -17 153 -64 457 -102 650 -128 665 -298 1127 -555 1515 -114 171 -197 273 -345 420 -310 310 -700 562 -1235 798 -468 206 -824 304 -1306 357 -136 15 -646 28 -764 19z" />
          </g>
        </defs>
        
        <g>
          {useMemo(() => {
            const config = getResponsiveConfig();
            const globalFootprintScale = getResponsiveFootprintScale();
            
            return footsteps.map((step, index) => {
              const effectiveScale = config.scale * footprintScale * globalFootprintScale;
              const transform = `translate(${step.x}, ${step.y}) rotate(${step.angle}) scale(${effectiveScale}) translate(-503.5, -640)`;
              const symbolId = step.type === 'left' ? '#foot-left' : '#foot-right';
              
              const delay = `${index * 0.12 + 0.4}s`;
              return (
                <g 
                  key={step.id}
                  transform={transform}
                  className={animated ? "footstep-fade" : "footstep-static"}
                  style={animated ? { animationDelay: delay } : undefined}
                >
                  {/* Shadow layer */}
                  <use 
                    href={symbolId}
                    fill="black"
                    opacity="0.3"
                    transform="translate(15, 15)"
                  />
                  
                  {/* Main footprint */}
                  <use 
                    href={symbolId}
                    fill={`url(#${gradientId})`}
                    filter="url(#footstep-shadow)"
                  />
                  
                  {/* Highlight layer */}
                  <use 
                    href={symbolId}
                    fill="white"
                    opacity="0.1"
                    transform="scale(0.8) translate(60, 80)"
                  />
                </g>
              );
            });
          }, [footsteps, footprintScale, gradientId, animated])}
        </g>
      </svg>

      {/* Animation keyframes and helper classes – global scope */}
      {animated && (
        <style jsx global>{`
          @-webkit-keyframes footstepFadeIn {
            to { opacity: 0.85; }
          }
          @keyframes footstepFadeIn {
            to { opacity: 0.85; }
          }
          .footstep-fade {
            opacity: 0;
            -webkit-animation: footstepFadeIn 0.45s ease-out forwards;
            animation: footstepFadeIn 0.45s ease-out forwards;
          }
          .footstep-static {
            opacity: 0.85;
          }
        `}</style>
      )}
    </>
  );
};

// Memoize the component for performance optimization
export const TimelineContinuousPath = React.memo(TimelineContinuousPathComponent); 