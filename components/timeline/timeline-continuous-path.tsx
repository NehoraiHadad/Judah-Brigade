import React, { useMemo, useState, useLayoutEffect } from 'react';
import { FootprintIcon } from '../ui/footprint-icon';

interface Point {
  x: number;
  y: number;
}

interface Footstep {
  x: number;
  y: number;
  angle: number;
  type: 'left' | 'right';
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
}

// Seeded random number generator for consistent paths
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
}

// Enhanced path generation with improved curvature and diamond entry/exit points
class PathGenerator {
  private rng: SeededRandom;
  private waviness: number;
  private smoothness: number;
  private sideOffset: number;

  constructor(seed: number, waviness: number, smoothness: number, sideOffset: number) {
    this.rng = new SeededRandom(seed);
    this.waviness = waviness;
    this.smoothness = smoothness;
    this.sideOffset = sideOffset;
  }

  private generateSideEntryPoints(diamonds: Point[]): Point[] {
    return diamonds.map((diamond, index) => {
      // Create entry/exit points on diamond sides for mobile diagonal layout
      const baseOffset = this.sideOffset || 20;
      const sideOffset = baseOffset + (this.rng.next() - 0.5) * 10;
      const verticalVariation = (this.rng.next() - 0.5) * 15; // ±7.5 pixels vertical variation
      
      // For mobile diagonal layout: 
      // Even indices (0,2,4...) are left-top positions
      // Odd indices (1,3,5...) are right-bottom positions
      const isLeftPosition = index % 2 === 0;
      
      if (isLeftPosition) {
        // Left-positioned diamonds: exit from right side towards next diamond
        return {
          x: diamond.x + sideOffset,
          y: diamond.y + verticalVariation
        };
      } else {
        // Right-positioned diamonds: enter from left side from previous diamond
        return {
          x: diamond.x - sideOffset,
          y: diamond.y + verticalVariation
        };
      }
    });
  }

  private calculateControlPoints(prev: Point, curr: Point, next: Point | null, index: number, totalPoints: number): { cp1: Point; cp2: Point } {
    const dx = curr.x - prev.x;
    const dy = curr.y - prev.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Enhanced perpendicular calculation for more natural curves
    const perpX = -dy / distance || 0;
    const perpY = dx / distance || 0;

    const isFirst = index === 1;
    const isLast = index === totalPoints - 1;

    if (isFirst) {
      return this.generateFirstSegmentControlPoints(prev, curr, dx, dy, perpX, perpY, distance);
    } else if (isLast) {
      return this.generateLastSegmentControlPoints(prev, curr, dx, dy, perpX, perpY, distance);
    } else {
      return this.generateMidSegmentControlPoints(prev, curr, next!, dx, dy, perpX, perpY, distance, index);
    }
  }

  private generateFirstSegmentControlPoints(prev: Point, curr: Point, dx: number, dy: number, perpX: number, perpY: number, distance: number) {
    const meander1 = this.waviness * distance * 0.4 * (this.rng.next() - 0.5);
    const meander2 = this.waviness * distance * 0.5 * (this.rng.next() - 0.5);
    const curvature = (this.rng.next() - 0.5) * 45;

    return {
      cp1: {
        x: prev.x + dx * 0.3 + perpX * meander1 + curvature,
        y: prev.y + dy * 0.3 + perpY * meander1
      },
      cp2: {
        x: curr.x - dx * 0.35 + perpX * meander2 - curvature * 0.7,
        y: curr.y - dy * 0.35 + perpY * meander2
      }
    };
  }

  private generateLastSegmentControlPoints(prev: Point, curr: Point, dx: number, dy: number, perpX: number, perpY: number, distance: number) {
    const meander1 = this.waviness * distance * 0.45 * (this.rng.next() - 0.5);
    const meander2 = this.waviness * distance * 0.35 * (this.rng.next() - 0.5);
    const curvature = (this.rng.next() - 0.5) * 35;

    return {
      cp1: {
        x: prev.x + dx * this.smoothness * 0.4 + perpX * meander1 + curvature,
        y: prev.y + dy * this.smoothness * 0.4 + perpY * meander1
      },
      cp2: {
        x: curr.x - dx * 0.3 + perpX * meander2 - curvature * 0.8,
        y: curr.y - dy * 0.3 + perpY * meander2
      }
    };
  }

  private generateMidSegmentControlPoints(prev: Point, curr: Point, next: Point, dx: number, dy: number, perpX: number, perpY: number, distance: number, index: number) {
    const nextDx = next.x - curr.x;
    const nextDy = next.y - curr.y;
    
    // Enhanced meandering with terrain and wind effects - reduced for mobile
    const primaryMeander = this.waviness * distance * 0.5 * (this.rng.next() - 0.5);
    const secondaryMeander = this.waviness * distance * 0.4 * (this.rng.next() - 0.5);
    
    // Natural environmental influences - reduced for mobile
    const terrainInfluence1 = Math.sin(index * 0.8) * 20;
    const terrainInfluence2 = Math.cos(index * 1.1) * 15;
    const windEffect1 = Math.sin(index * 1.5) * 12;
    const windEffect2 = Math.cos(index * 1.3) * 10;
    
    // Enhanced seeking behavior for more realistic paths - reduced for mobile
    const seek1 = (this.rng.next() - 0.5) * 30;
    const seek2 = (this.rng.next() - 0.5) * 25;

    return {
      cp1: {
        x: prev.x + dx * this.smoothness * 0.4 + perpX * primaryMeander + terrainInfluence1 + windEffect1 + seek1,
        y: prev.y + dy * this.smoothness * 0.4 + perpY * primaryMeander
      },
      cp2: {
        x: curr.x - (nextDx * 0.25 + dx) * this.smoothness * 0.4 + perpX * secondaryMeander + terrainInfluence2 + windEffect2 + seek2,
        y: curr.y - (nextDy * 0.25 + dy) * this.smoothness * 0.4 + perpY * secondaryMeander
      }
    };
  }

  generatePath(diamonds: Point[]): string {
    if (diamonds.length < 2) return '';

    const trailPoints = this.generateSideEntryPoints(diamonds);
    let path = `M ${trailPoints[0].x} ${trailPoints[0].y}`;

    for (let i = 1; i < trailPoints.length; i++) {
      const prev = trailPoints[i - 1];
      const curr = trailPoints[i];
      const next = trailPoints[i + 1] || null;

      const { cp1, cp2 } = this.calculateControlPoints(prev, curr, next, i, trailPoints.length);
      path += ` C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${curr.x} ${curr.y}`;
    }

    return path;
  }
}

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
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const pathRef = React.useRef<SVGSVGElement>(null);

  const pathData = useMemo(() => {
    const pathGenerator = new PathGenerator(seed, waviness, smoothness, sideOffset);
    return pathGenerator.generatePath(diamonds);
  }, [diamonds, waviness, smoothness, seed, sideOffset]);

  const [footsteps, setFootsteps] = useState<Footstep[]>([]);
  const [existingFootstepsCount, setExistingFootstepsCount] = useState(0);

  // Responsive scale calculation
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

  // Responsive footstep parameters
  const getFootstepParams = () => {
    if (typeof window === 'undefined') {
      return { stride: 35, footSpacing: 12, footOffset: 10 };
    }
    
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) { // Mobile
      return {
        stride: 25,        // Closer steps for mobile
        footSpacing: 12,   // Closer left/right spacing
        footOffset: 10     // Increased offset to avoid overlapping diamond centre
      };
    } else if (screenWidth < 1024) { // Tablet
      return {
        stride: 30,        // Medium spacing
        footSpacing: 11,   
        footOffset: 5      
      };
    } else { // Desktop
      return {
        stride: 35,        // Original spacing
        footSpacing: 12,   
        footOffset: 6      
      };
    }
  };

  // Intersection Observer to control animations
  useLayoutEffect(() => {
    if (!pathRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        rootMargin: '100px',
        threshold: 0.1
      }
    );

    observer.observe(pathRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    if (pathData && typeof document !== 'undefined' && isVisible) {
      const tempPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      tempPath.setAttribute('d', pathData);
      
      const tempSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      tempSvg.style.visibility = 'hidden';
      tempSvg.style.position = 'absolute';
      tempSvg.appendChild(tempPath);
      document.body.appendChild(tempSvg);
      
      try {
        const totalLength = tempPath.getTotalLength();

        // Determine the maximum distance along the path that we should create
        // footsteps for. This prevents recalculation של המסלול – רק מוסיפים צעדים.
        let maxFootstepDistance = totalLength;
        if (
          typeof visibleUntilIndex === 'number' &&
          visibleUntilIndex >= 0 &&
          diamonds.length > 1 &&
          visibleUntilIndex < diamonds.length
        ) {
          // Approximate the proportional distance: lastVisible / (totalDiamonds-1)
          const ratio = visibleUntilIndex / (diamonds.length - 1);
          maxFootstepDistance = totalLength * ratio;
        }

        const newFootsteps: Footstep[] = [];

        const params = getFootstepParams();
        const { stride, footSpacing, footOffset } = params;

        for (let dist = 0; dist < maxFootstepDistance; dist += stride) {
          // LEFT FOOT
          const pLeft = tempPath.getPointAtLength(dist);
          const pLeftAhead = tempPath.getPointAtLength(Math.min(dist + 1, totalLength));
          const angleLeft = Math.atan2(pLeftAhead.y - pLeft.y, pLeftAhead.x - pLeft.x);
          const perpLeft = angleLeft + Math.PI / 2;

          newFootsteps.push({
            x: pLeft.x + Math.cos(perpLeft) * -footOffset,
            y: pLeft.y + Math.sin(perpLeft) * -footOffset,
            angle: angleLeft * (180 / Math.PI) + 90,
            type: 'left',
          });

          // RIGHT FOOT slightly ahead on the path
          const distRight = Math.min(dist + footSpacing, totalLength);
          const pRight = tempPath.getPointAtLength(distRight);
          const pRightAhead = tempPath.getPointAtLength(Math.min(distRight + 1, totalLength));
          const angleRight = Math.atan2(pRightAhead.y - pRight.y, pRightAhead.x - pRight.x);
          const perpRight = angleRight + Math.PI / 2;

          newFootsteps.push({
            x: pRight.x + Math.cos(perpRight) * footOffset,
            y: pRight.y + Math.sin(perpRight) * footOffset,
            angle: angleRight * (180 / Math.PI) + 90,
            type: 'right',
          });
        }
        
        // Only update if we actually have new footsteps to add
        if (newFootsteps.length > existingFootstepsCount) {
          setExistingFootstepsCount(footsteps.length); // Remember current count before update
          setFootsteps(newFootsteps);
        }
      } catch (error) {
        console.warn('Error processing path for footsteps:', error);
      } finally {
        document.body.removeChild(tempSvg);
      }
    }
  }, [pathData, isVisible, visibleUntilIndex]);

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