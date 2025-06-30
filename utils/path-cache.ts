interface PathCacheEntry {
  pathElement: SVGPathElement;
  totalLength: number;
  lastAccessed: number;
}

interface SamplePoint {
  x: number;
  y: number;
  angle: number;
}

class PathCache {
  private cache = new Map<string, PathCacheEntry>();
  private readonly maxCacheSize = 10;
  private readonly cacheTimeout = 30000; // 30 seconds

  /**
   * Get or create a cached path element for the given path data
   */
  getOrCreateTempPath(pathData: string): { pathElement: SVGPathElement; totalLength: number } {
    const cacheKey = this.generateCacheKey(pathData);
    
    // Check if we have a cached entry
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.lastAccessed < this.cacheTimeout) {
      cached.lastAccessed = Date.now();
      return {
        pathElement: cached.pathElement,
        totalLength: cached.totalLength
      };
    }

    // Clean old entries if cache is getting too large
    this.cleanupCache();

    // Create new path element
    const pathElement = this.createPathElement(pathData);
    const totalLength = pathElement.getTotalLength();

    // Cache the result
    this.cache.set(cacheKey, {
      pathElement,
      totalLength,
      lastAccessed: Date.now()
    });

    return { pathElement, totalLength };
  }

  /**
   * Generate lookup table with sampled points along the path
   */
  generateSamples(pathElement: SVGPathElement, totalLength: number, sampleDistance = 5): SamplePoint[] {
    const samples: SamplePoint[] = [];
    const numSamples = Math.ceil(totalLength / sampleDistance);

    for (let i = 0; i <= numSamples; i++) {
      const distance = Math.min(i * sampleDistance, totalLength);
      try {
        const point = pathElement.getPointAtLength(distance);
        const nextDistance = Math.min(distance + 1, totalLength);
        const nextPoint = pathElement.getPointAtLength(nextDistance);
        
        const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x);
        
        samples.push({
          x: point.x,
          y: point.y,
          angle: angle
        });
      } catch (error) {
        console.warn(`Error sampling point at distance ${distance}:`, error);
        break;
      }
    }

    return samples;
  }

  /**
   * Get interpolated point from sample table
   */
  getInterpolatedPoint(samples: SamplePoint[], distance: number, sampleDistance = 5): SamplePoint | null {
    if (samples.length === 0) return null;

    const index = distance / sampleDistance;
    const lowerIndex = Math.floor(index);
    const upperIndex = Math.ceil(index);

    if (lowerIndex >= samples.length) {
      return samples[samples.length - 1];
    }

    if (lowerIndex === upperIndex || upperIndex >= samples.length) {
      return samples[lowerIndex];
    }

    // Linear interpolation
    const t = index - lowerIndex;
    const lower = samples[lowerIndex];
    const upper = samples[upperIndex];

    return {
      x: lower.x + (upper.x - lower.x) * t,
      y: lower.y + (upper.y - lower.y) * t,
      angle: lower.angle + (upper.angle - lower.angle) * t
    };
  }

  private generateCacheKey(pathData: string): string {
    // Simple hash function for cache key
    let hash = 0;
    for (let i = 0; i < pathData.length; i++) {
      const char = pathData.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(36);
  }

  private createPathElement(pathData: string): SVGPathElement {
    const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathElement.setAttribute('d', pathData);
    
    // Create hidden SVG container
    const tempSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    tempSvg.style.visibility = 'hidden';
    tempSvg.style.position = 'absolute';
    tempSvg.style.top = '-9999px';
    tempSvg.appendChild(pathElement);
    
    document.body.appendChild(tempSvg);
    
    // Store reference to cleanup later
    (pathElement as any).__tempSvg = tempSvg;
    
    return pathElement;
  }

  private cleanupCache(): void {
    if (this.cache.size <= this.maxCacheSize) return;

    // Sort by last accessed time and remove oldest entries
    const entries = Array.from(this.cache.entries())
      .sort(([, a], [, b]) => a.lastAccessed - b.lastAccessed);

    const toRemove = entries.slice(0, entries.length - this.maxCacheSize + 1);
    
    toRemove.forEach(([key, entry]) => {
      // Cleanup DOM element
      const tempSvg = (entry.pathElement as any).__tempSvg;
      if (tempSvg && tempSvg.parentNode) {
        tempSvg.parentNode.removeChild(tempSvg);
      }
      this.cache.delete(key);
    });
  }

  /**
   * Clear entire cache and cleanup DOM elements
   */
  clear(): void {
    this.cache.forEach(entry => {
      const tempSvg = (entry.pathElement as any).__tempSvg;
      if (tempSvg && tempSvg.parentNode) {
        tempSvg.parentNode.removeChild(tempSvg);
      }
    });
    this.cache.clear();
  }
}

// Export singleton instance
export const pathCache = new PathCache();

// Export types
export type { PathCacheEntry, SamplePoint }; 