// hooks/use-footsteps.ts
import { useState, useEffect } from 'react';
import type { Point } from '@/lib/path-generator'; // Assuming Point might be needed, though calculations are on path string

// Footstep type definition - can be shared or redefined if not already global
// For now, keep it local to the hook and the component that uses it.
// If TimelineContinuousPath exports its Footstep type, this could import it.
interface Footstep {
  x: number;
  y: number;
  angle: number;
  type: 'left' | 'right';
}

interface UseFootstepsProps {
  pathData: string | null;
  isVisible: boolean; // Is the timeline component visible?
  visibleUntilIndex: number | undefined; // How many diamonds are visible to draw path up to
  totalPathPoints: number; // Total number of points (diamonds) the full path could connect
  getFootstepParams: () => { stride: number; footSpacing: number; footOffset: number };
}

interface UseFootstepsReturn {
  footsteps: Footstep[];
  existingFootstepsCount: number; // For animation staggering
}

export function useFootsteps({
  pathData,
  isVisible,
  visibleUntilIndex,
  totalPathPoints,
  getFootstepParams,
}: UseFootstepsProps): UseFootstepsReturn {
  const [footsteps, setFootsteps] = useState<Footstep[]>([]);
  const [existingFootstepsCount, setExistingFootstepsCount] = useState<number>(0);

  useEffect(() => {
    // This effect calculates new footstep positions based on inputs
    if (pathData && typeof document !== 'undefined' && isVisible) {
      const tempPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      tempPath.setAttribute('d', pathData);
      const tempSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      tempSvg.appendChild(tempPath);

      let newFootsteps: Footstep[] = [];
      try {
        const totalLength = tempPath.getTotalLength();
        let maxFootstepDistance = totalLength;

        if (
          typeof visibleUntilIndex === 'number' &&
          visibleUntilIndex >= 0 &&
          totalPathPoints > 1 && // ensure no division by zero or negative
          visibleUntilIndex < totalPathPoints
        ) {
          const ratio = Math.max(0, Math.min(1, visibleUntilIndex / (totalPathPoints - 1)));
          maxFootstepDistance = totalLength * ratio;
        } else if (typeof visibleUntilIndex === 'number' && visibleUntilIndex >= totalPathPoints -1) {
          maxFootstepDistance = totalLength; // Show all if index is last or beyond
        } else if (totalPathPoints <=1 && typeof visibleUntilIndex === 'number' && visibleUntilIndex >=0) {
           maxFootstepDistance = totalLength; // Show all if only one point/diamond but index is valid
        }


        const params = getFootstepParams();
        const { stride, footSpacing, footOffset } = params;

        for (let dist = 0; dist < maxFootstepDistance; dist += stride) {
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

          const distRight = Math.min(dist + footSpacing, totalLength);
          if (distRight > maxFootstepDistance && dist < maxFootstepDistance) { // Ensure last right footstep isn't far beyond maxDist
             // Only add if it's close to the last left footstep within bounds
             if (maxFootstepDistance - dist < stride * 1.5) { // Heuristic: if last left step was close to end
                // Potentially skip this right footstep or adjust its position if it significantly exceeds maxFootstepDistance
             } else {
                 continue; // Skip if too far
             }
          }
          if (distRight >= maxFootstepDistance && newFootsteps[newFootsteps.length-1]?.type === 'left') continue;


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

        // Thinning logic
        const thinnedFootsteps: Footstep[] = [];
        if (newFootsteps.length > 0) {
          thinnedFootsteps.push(newFootsteps[0]);
          const screenWidth = (typeof window !== 'undefined') ? window.innerWidth : 1024;
          const minPixelDistance = screenWidth < 768 ? 15 : (screenWidth < 1024 ? 18 : 22);
          const minDistanceSq = minPixelDistance * minPixelDistance;
          for (let i = 1; i < newFootsteps.length; i++) {
            const prevFootstep = thinnedFootsteps[thinnedFootsteps.length - 1];
            const currentFootstep = newFootsteps[i];
            const dx = currentFootstep.x - prevFootstep.x;
            const dy = currentFootstep.y - prevFootstep.y;
            const distanceSq = dx * dx + dy * dy;
            if (distanceSq >= minDistanceSq) {
              thinnedFootsteps.push(currentFootstep);
            }
          }
        }
        newFootsteps = thinnedFootsteps;

      } catch (error) {
        console.warn('Error processing path for footsteps:', error);
        newFootsteps = []; // Reset on error
      }

      // Compare with the hook's internal `footsteps` state
      let changed = false;
      if (newFootsteps.length !== footsteps.length) {
        changed = true;
      } else {
        for (let i = 0; i < newFootsteps.length; i++) {
          if (
            newFootsteps[i].x !== footsteps[i].x ||
            newFootsteps[i].y !== footsteps[i].y ||
            newFootsteps[i].type !== footsteps[i].type
          ) {
            changed = true;
            break;
          }
        }
      }

      if (changed) {
        setExistingFootstepsCount(footsteps.length); // Set based on current state before update
        setFootsteps(newFootsteps);
      }
      // If not changed, but pathData is null or component is not visible, footsteps should be cleared.
      // This case is handled by the `else if` below.
    } else if ((!pathData || !isVisible) && footsteps.length > 0) {
      // If path disappears, or component becomes invisible, and there are existing footsteps, clear them.
      setExistingFootstepsCount(0); // Or footsteps.length if a fade-out of existing is desired
      setFootsteps([]);
    }
  // `footsteps` is a dependency because we compare `newFootsteps` against it,
  // and `setExistingFootstepsCount(footsteps.length)` uses its current value.
  }, [pathData, isVisible, visibleUntilIndex, totalPathPoints, getFootstepParams, footsteps]);

  return { footsteps, existingFootstepsCount };
}
