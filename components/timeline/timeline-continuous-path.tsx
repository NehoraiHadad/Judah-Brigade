import React, { useMemo, useState, useLayoutEffect } from 'react';
import { FootprintIcon } from '../ui/footprint-icon';
import { PathGenerator, Point } from '../../lib/path-generator'; // Correct import
// Point interface is now imported from path-generator

interface Footstep {
  x: number;
  y: number;
  angle: number;
  type: 'left' | 'right';
}

interface TimelineContinuousPathProps {
  diamonds: Point[]; // Uses the imported Point type
  width: number;
  height: number;
  className?: string;
  animated?: boolean;
  waviness?: number;
  smoothness?: number;
  seed?: number;
  sideOffset?: number;
  visibleUntilIndex?: number;
  layoutType?: 'mobile' | 'tablet' | 'desktop';
}

import { useFootsteps } from '../../hooks/use-footsteps';

// SeededRandom and PathGenerator classes are removed from here.

export const TimelineContinuousPath: React.FC<TimelineContinuousPathProps> = ({
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
  layoutType = 'desktop',
}) => {
  const [isSvgVisible, setIsSvgVisible] = useState(false); // For IntersectionObserver
  const pathRef = React.useRef<SVGSVGElement>(null);

  const pathData = useMemo(() => {
    const pathGenerator = new PathGenerator(seed, waviness, smoothness, sideOffset, layoutType);
    return pathGenerator.generatePath(diamonds);
  }, [diamonds, waviness, smoothness, seed, sideOffset, layoutType]);

  // Memoize getFootstepParams to prevent re-creation on every render
  const getFootstepParams = useMemo(() => {
    return () => {
      if (typeof window === 'undefined') {
        return { stride: 35, footSpacing: 12, footOffset: 10 };
      }
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) { // Mobile
        return { stride: 25, footSpacing: 12, footOffset: 10 };
      } else if (screenWidth < 1024) { // Tablet
        return { stride: 30, footSpacing: 11, footOffset: 5 };
      } else { // Desktop
        return { stride: 35, footSpacing: 12, footOffset: 6 };
      }
    };
  }, []); // Empty dependency array ensures this function is stable

  const { footsteps, existingFootstepsCount } = useFootsteps({
    pathData,
    isVisible: isSvgVisible,
    visibleUntilIndex,
    totalPathPoints: diamonds.length,
    getFootstepParams, // Pass the memoized function
  });

  // Responsive scale calculation (remains in component as it's purely render-related)
  const getResponsiveScale = () => {
    if (typeof window === 'undefined') return 0.013;
    
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) { // Mobile
      return 0.035; // Larger for mobile - increased from 0.024
    } else if (screenWidth < 1024) { // Tablet
      return 0.025; // Medium for tablet - increased from 0.018
    } else { // Desktop
      return 0.015; // Original size for desktop - increased from 0.013
    }
  };

  // Responsive scale calculation (remains in component as it's purely render-related)
  const getResponsiveScale = () => {
    if (typeof window === 'undefined') return 0.013;
    
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) { // Mobile
      return 0.035;
    } else if (screenWidth < 1024) { // Tablet
      return 0.025;
    } else { // Desktop
      return 0.015;
    }
  };

  // Intersection Observer to control animations based on SVG visibility
  useLayoutEffect(() => {
    if (!pathRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsSvgVisible(entry.isIntersecting); // Update SVG visibility state
        });
      },
      {
        rootMargin: '100px', // Start loading/animating when SVG is 100px from viewport
        threshold: 0.1       // At least 10% of SVG is visible
      }
    );

    observer.observe(pathRef.current);

    return () => {
      observer.disconnect();
    };
  }, []); // Empty dependency array: observe on mount, disconnect on unmount

  // The main useLayoutEffect for calculating footsteps has been moved to useFootsteps hook.

  const gradientId = useMemo(() => 
    `footstep-gradient-${Math.random().toString(36).substr(2, 9)}`, 
    []
  );

  if (!pathData) return null;

  return (
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
        zIndex: -1
      }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          {/* Color palette aligned with site theme (#ab9b84 as primary) */}
          <stop offset="0%" stopColor="#e2d8c8" stopOpacity="0.9" />  {/* Light highlight */}
          <stop offset="30%" stopColor="#ab9b84" stopOpacity="0.95" /> {/* Main beige */}
          <stop offset="70%" stopColor="#8c7c68" stopOpacity="0.95" /> {/* Darker accent */}
          <stop offset="100%" stopColor="#6e614e" stopOpacity="0.85" /> {/* Deep shadow */}
        </linearGradient>
        
        <filter id="footstep-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.3"/>
        </filter>
        
        <filter id="footstep-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <g>
        {footsteps.map((step, index) => {
          const scale = getResponsiveScale();
          const transform = `translate(${step.x}, ${step.y}) rotate(${step.angle}) scale(${scale}) translate(-503.5, -640)`;
          
          // Only animate new footsteps that were added after existing ones
          const isNewFootstep = index >= existingFootstepsCount;
          const shouldAnimate = animated && isVisible && isNewFootstep;
          
          return (
            <g 
              key={`${Math.round(step.x)}-${Math.round(step.y)}-${step.type}`}
              transform={transform}
              style={shouldAnimate ? {
                opacity: 0,
                animation: `footstepFadeIn 0.45s ease-out forwards`,
                animationDelay: `${(index - existingFootstepsCount) * 0.12 + 0.4}s`
              } : { opacity: 0.85 }}
            >
              {/* Shadow */}
              <FootprintIcon
                type={step.type}
                gClassName="fill-black/30"
                transform="translate(15, 15)"
              />
              
              {/* Main footprint */}
              <FootprintIcon
                type={step.type}
                gFill={`url(#${gradientId})`}
                filter="url(#footstep-glow)"
              />
              
              {/* Highlight */}
              <FootprintIcon
                type={step.type}
                gClassName="fill-white/10"
                transform="scale(0.8) translate(60, 80)"
              />
            </g>
          );
        })}
      </g>
      
      {animated && (
        <style jsx>{`
          @keyframes footstepFadeIn {
            to {
              opacity: 0.85;
            }
          }
        `}</style>
      )}
    </svg>
  );
}; 