import { useCallback, useState, useRef, useMemo } from 'react';
import { pathCache, type SamplePoint } from '@/utils/path-cache';

interface Footstep {
  x: number;
  y: number;
  angle: number;
  type: 'left' | 'right';
  id: string;
}

interface FootstepConfig {
  stride: number;
  footSpacing: number;
  footOffset: number;
}

// Cache for computed footsteps to avoid regeneration
const footstepCache = new Map<string, Footstep[]>();

/**
 * Optimized hook for footstep generation with improved caching and performance.
 * Ensures continuous progression without gaps or backwards jumps.
 */
export function useFootstepStreaming() {
  const [footsteps, setFootsteps] = useState<Footstep[]>([]);
  const lastDistanceRef = useRef(0);
  const footstepCounterRef = useRef(0);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize angle conversion function
  const convertAngle = useMemo(() => (angle: number) => angle * (180 / Math.PI) + 90, []);

  const generateFootsteps = useCallback((
    samples: SamplePoint[],
    totalLength: number,
    startDistance: number,
    endDistance: number,
    config: FootstepConfig,
    sampleDistance = 5
  ): Footstep[] => {
    const { stride, footSpacing, footOffset } = config;
    
    // Create cache key for this segment
    const cacheKey = `${startDistance}-${endDistance}-${stride}-${footSpacing}-${footOffset}`;
    if (footstepCache.has(cacheKey)) {
      return footstepCache.get(cacheKey)!;
    }

    const newSteps: Footstep[] = [];
    let currentDistance = startDistance;
    
    // Pre-calculate common values
    const halfPI = Math.PI / 2;
    
    while (currentDistance < endDistance) {
      try {
        // Left foot - get point from lookup table
        const leftPoint = pathCache.getInterpolatedPoint(samples, currentDistance, sampleDistance);
        if (!leftPoint) break;

        const perpLeft = leftPoint.angle + halfPI;
        const cosLeft = Math.cos(perpLeft);
        const sinLeft = Math.sin(perpLeft);

        newSteps.push({
          x: leftPoint.x + cosLeft * -footOffset,
          y: leftPoint.y + sinLeft * -footOffset,
          angle: convertAngle(leftPoint.angle),
          type: 'left',
          id: `left-${footstepCounterRef.current++}`,
        });

        // Right foot - offset slightly ahead
        const distRight = Math.min(currentDistance + footSpacing, endDistance);
        if (distRight < endDistance) {
          const rightPoint = pathCache.getInterpolatedPoint(samples, distRight, sampleDistance);
          if (rightPoint) {
            const perpRight = rightPoint.angle + halfPI;
            const cosRight = Math.cos(perpRight);
            const sinRight = Math.sin(perpRight);

            newSteps.push({
              x: rightPoint.x + cosRight * footOffset,
              y: rightPoint.y + sinRight * footOffset,
              angle: convertAngle(rightPoint.angle),
              type: 'right',
              id: `right-${footstepCounterRef.current++}`,
            });
          }
        }
        
        currentDistance += stride;
      } catch (error) {
        console.warn('Error generating footstep at distance', currentDistance, error);
        break;
      }
    }
    
    // Cache the result if we have a reasonable number of steps
    if (newSteps.length > 0 && newSteps.length < 1000) {
      footstepCache.set(cacheKey, newSteps);
      
      // Limit cache size to prevent memory leaks
      if (footstepCache.size > 50) {
        const firstKey = footstepCache.keys().next().value;
        if (firstKey) {
          footstepCache.delete(firstKey);
        }
      }
    }
    
    return newSteps;
  }, [convertAngle]);

  const addFootsteps = useCallback((
    pathData: string,
    targetDistance: number,
    config: FootstepConfig
  ) => {
    // Only proceed if we need to go further than where we already are
    if (targetDistance <= lastDistanceRef.current) {
      return;
    }

    // Debounce rapid calls to avoid excessive computations
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      try {
        // Get cached path and generate samples
        const { pathElement, totalLength } = pathCache.getOrCreateTempPath(pathData);
        const samples = pathCache.generateSamples(pathElement, totalLength);

        // Continue from exactly where we left off
        const startDistance = lastDistanceRef.current;
        
        const newSteps = generateFootsteps(samples, totalLength, startDistance, targetDistance, config);
        
        if (newSteps.length > 0) {
          setFootsteps(prev => {
            // Use functional update to avoid stale closure issues
            const combined = [...prev, ...newSteps];
            
            // Limit total footsteps to prevent memory issues
            if (combined.length > 2000) {
              return combined.slice(-1500); // Keep most recent 1500 steps
            }
            
            return combined;
          });
          
          // Update our tracking to the actual target we reached
          lastDistanceRef.current = targetDistance;
        }
      } catch (error) {
        console.warn('Error adding footsteps:', error);
      }
    }, 16); // Debounce to ~60fps
  }, [generateFootsteps]);

  const resetFootsteps = useCallback(() => {
    // Clear any pending operations
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    setFootsteps([]);
    lastDistanceRef.current = 0;
    footstepCounterRef.current = 0;
    
    // Clear the cache when resetting
    footstepCache.clear();
  }, []);

  return {
    footsteps,
    addFootsteps,
    resetFootsteps,
    lastDistance: lastDistanceRef.current
  };
} 