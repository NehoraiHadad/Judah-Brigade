import React, { useMemo, useState, useLayoutEffect } from 'react';

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

  constructor(seed: number, waviness: number, smoothness: number) {
    this.rng = new SeededRandom(seed);
    this.waviness = waviness;
    this.smoothness = smoothness;
  }

  private generateSideEntryPoints(diamonds: Point[]): Point[] {
    return diamonds.map((diamond, index) => {
      // Create entry/exit points on diamond sides for mobile diagonal layout
      const sideOffset = 20 + (this.rng.next() - 0.5) * 10; // 20±5 pixels from center
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
    const isMidpoint = !isFirst && !isLast;

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
  seed = 42
}) => {
  const pathData = useMemo(() => {
    const pathGenerator = new PathGenerator(seed, waviness, smoothness);
    return pathGenerator.generatePath(diamonds);
  }, [diamonds, waviness, smoothness, seed]);

  const [footsteps, setFootsteps] = useState<Footstep[]>([]);

  useLayoutEffect(() => {
    if (pathData && typeof document !== 'undefined') {
      const tempPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      tempPath.setAttribute('d', pathData);
      
      const tempSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      tempSvg.style.visibility = 'hidden';
      tempSvg.style.position = 'absolute';
      tempSvg.appendChild(tempPath);
      document.body.appendChild(tempSvg);
      
      try {
        const totalLength = tempPath.getTotalLength();
        const newFootsteps: Footstep[] = [];

        const stride = 35;        // distance between each pair of footprints - reduced for mobile
        const footSpacing = 12;   // distance between left & right footprints in a pair
        const footOffset = 6;     // lateral offset from the path centre - reduced for mobile

        for (let dist = 0; dist < totalLength; dist += stride) {
          // LEFT FOOT
          const pLeft = tempPath.getPointAtLength(dist);
          const pLeftAhead = tempPath.getPointAtLength(Math.min(dist + 1, totalLength));
          const angleLeft = Math.atan2(pLeftAhead.y - pLeft.y, pLeftAhead.x - pLeft.x);
          const perpLeft = angleLeft + Math.PI / 2;

          newFootsteps.push({
            x: pLeft.x + Math.cos(perpLeft) * -footOffset,
            y: pLeft.y + Math.sin(perpLeft) * -footOffset,
            angle: angleLeft * (180 / Math.PI),
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
            angle: angleRight * (180 / Math.PI),
            type: 'right',
          });
        }
        setFootsteps(newFootsteps);
      } catch (error) {
        console.warn('Error processing path for footsteps:', error);
      } finally {
        document.body.removeChild(tempSvg);
      }
    }
  }, [pathData]);

  const gradientId = useMemo(() => 
    `footstep-gradient-${Math.random().toString(36).substr(2, 9)}`, 
    []
  );

  // More realistic footprint shape
  const leftFootPath = "M12,2 C14,1.5 16,2 18,3 C19,4 19.5,5 20,7 C20.2,9 19.8,11 19,13 C18,15 16.5,16.5 15,17.5 C13.5,18.2 12,18.5 10.5,18.2 C9,17.8 8,17 7.5,15.5 C7,14 7.2,12 8,10 C8.8,8 10,6.5 11,5 C11.5,3.5 12,2.5 12,2 Z M11,5 C10.5,5.3 10,5.8 9.8,6.2 M13,4.8 C13.2,5.1 13.5,5.5 13.7,5.9 M15,6 C15.1,6.3 15.2,6.7 15.1,7 M9,8 C8.9,8.4 9,8.8 9.2,9.1 M16,8.5 C15.9,8.9 15.7,9.2 15.5,9.4";
  
  const rightFootPath = "M8,2 C6,1.5 4,2 2,3 C1,4 0.5,5 0,7 C-0.2,9 0.2,11 1,13 C2,15 3.5,16.5 5,17.5 C6.5,18.2 8,18.5 9.5,18.2 C11,17.8 12,17 12.5,15.5 C13,14 12.8,12 12,10 C11.2,8 10,6.5 9,5 C8.5,3.5 8,2.5 8,2 Z M9,5 C9.5,5.3 10,5.8 10.2,6.2 M7,4.8 C6.8,5.1 6.5,5.5 6.3,5.9 M5,6 C4.9,6.3 4.8,6.7 4.9,7 M11,8 C11.1,8.4 11,8.8 10.8,9.1 M4,8.5 C4.1,8.9 4.3,9.2 4.5,9.4";

  if (!pathData) return null;

  return (
    <svg
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
          <stop offset="0%" stopColor="#8B7355" stopOpacity="0.8" />
          <stop offset="30%" stopColor="#A0855B" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#8B7355" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#6B5B47" stopOpacity="0.7" />
        </linearGradient>
        
        <path id="left-foot" d={leftFootPath} />
        <path id="right-foot" d={rightFootPath} />
        
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
          const scale = 0.6;
          const transform = `translate(${step.x}, ${step.y}) rotate(${step.angle}) scale(${scale}) translate(-10, -10)`;
          const footType = step.type === 'left' ? 'left-foot' : 'right-foot';
          
          return (
            <g 
              key={index} 
              transform={transform}
              style={animated ? {
                opacity: 0,
                animation: `footstepFadeIn 0.45s ease-out forwards`,
                animationDelay: `${index * 0.12 + 0.4}s`
              } : { opacity: 0.85 }}
            >
              {/* Shadow */}
              <use 
                href={`#${footType}`} 
                fill="rgba(0,0,0,0.2)" 
                transform="translate(1.5, 1.5) scale(1.05)"
              />
              
              {/* Main footprint */}
              <use 
                href={`#${footType}`} 
                fill={`url(#${gradientId})`}
                filter="url(#footstep-glow)"
              />
              
              {/* Highlight */}
              <use 
                href={`#${footType}`} 
                fill="rgba(255,255,255,0.1)" 
                transform="scale(0.8) translate(1, 1)"
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