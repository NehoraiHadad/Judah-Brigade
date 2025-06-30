import { useCallback, useState, useRef } from 'react';
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

/**
 * Simplified hook for footstep generation.
 * Ensures continuous progression without gaps or backwards jumps.
 */
export function useFootstepStreaming() {
  const [footsteps, setFootsteps] = useState<Footstep[]>([]);
  const lastDistanceRef = useRef(0);
  const footstepCounterRef = useRef(0);

  const generateFootsteps = useCallback((
    samples: SamplePoint[],
    totalLength: number,
    startDistance: number,
    endDistance: number,
    config: FootstepConfig,
    sampleDistance = 5
  ): Footstep[] => {
    const { stride, footSpacing, footOffset } = config;
    const newSteps: Footstep[] = [];
    
    // Start from the exact position we left off
    let currentDistance = startDistance;
    
    while (currentDistance < endDistance) {
      try {
        // Left foot - get point from lookup table
        const leftPoint = pathCache.getInterpolatedPoint(samples, currentDistance, sampleDistance);
        if (!leftPoint) break;

        const perpLeft = leftPoint.angle + Math.PI / 2;

        newSteps.push({
          x: leftPoint.x + Math.cos(perpLeft) * -footOffset,
          y: leftPoint.y + Math.sin(perpLeft) * -footOffset,
          angle: leftPoint.angle * (180 / Math.PI) + 90,
          type: 'left',
          id: `left-${footstepCounterRef.current++}`,
        });

        // Right foot - offset slightly ahead
        const distRight = Math.min(currentDistance + footSpacing, endDistance);
        if (distRight < endDistance) {
          const rightPoint = pathCache.getInterpolatedPoint(samples, distRight, sampleDistance);
          if (rightPoint) {
            const perpRight = rightPoint.angle + Math.PI / 2;

            newSteps.push({
              x: rightPoint.x + Math.cos(perpRight) * footOffset,
              y: rightPoint.y + Math.sin(perpRight) * footOffset,
              angle: rightPoint.angle * (180 / Math.PI) + 90,
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
    
    return newSteps;
  }, []);

  const addFootsteps = useCallback((
    pathData: string,
    targetDistance: number,
    config: FootstepConfig
  ) => {
    // Only proceed if we need to go further than where we already are
    if (targetDistance <= lastDistanceRef.current) {
      return;
    }

    try {
      // Get cached path and generate samples
      const { pathElement, totalLength } = pathCache.getOrCreateTempPath(pathData);
      const samples = pathCache.generateSamples(pathElement, totalLength);

      // Continue from exactly where we left off
      const startDistance = lastDistanceRef.current;
      
      const newSteps = generateFootsteps(samples, totalLength, startDistance, targetDistance, config);
      
      if (newSteps.length > 0) {
        setFootsteps(prev => [...prev, ...newSteps]);
        // Update our tracking to the actual target we reached
        lastDistanceRef.current = targetDistance;
      }
    } catch (error) {
      console.warn('Error adding footsteps:', error);
    }
  }, [generateFootsteps]);

  const resetFootsteps = useCallback(() => {
    setFootsteps([]);
    lastDistanceRef.current = 0;
    footstepCounterRef.current = 0;
  }, []);

  return {
    footsteps,
    addFootsteps,
    resetFootsteps,
    lastDistance: lastDistanceRef.current
  };
} 