export interface SamplePoint {
  x: number;
  y: number;
  angle: number;
}

interface CacheEntry {
  pathElement: SVGPathElement;
  totalLength: number;
  samples?: SamplePoint[];
  lastAccessed: number;
  accessCount: number;
}

class PathCache {
  private cache = new Map<string, CacheEntry>();
  private tempContainer: SVGSVGElement | null = null;
  private cleanupTimer: NodeJS.Timeout | null = null;
  private readonly maxCacheSize = 50;
  private readonly maxAge = 5 * 60 * 1000; // 5 minutes
  private readonly cleanupInterval = 60 * 1000; // 1 minute

  constructor() {
    this.startCleanupTimer();
  }

  private startCleanupTimer() {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }

    this.cleanupTimer = setInterval(() => {
      this.cleanup();
    }, this.cleanupInterval);
  }

  private cleanup() {
    const now = Date.now();
    const entriesToDelete: string[] = [];

    // Find entries to delete based on age and access patterns
    for (const [key, entry] of this.cache.entries()) {
      const age = now - entry.lastAccessed;
      
      // Delete old entries or least accessed entries if cache is full
      if (age > this.maxAge || 
          (this.cache.size > this.maxCacheSize && entry.accessCount < 2)) {
        entriesToDelete.push(key);
      }
    }

    // Remove old entries
    entriesToDelete.forEach(key => {
      const entry = this.cache.get(key);
      if (entry?.pathElement.parentNode) {
        entry.pathElement.parentNode.removeChild(entry.pathElement);
      }
      this.cache.delete(key);
    });

    // If still over limit, remove least recently used
    if (this.cache.size > this.maxCacheSize) {
      const sortedEntries = Array.from(this.cache.entries())
        .sort((a, b) => a[1].lastAccessed - b[1].lastAccessed);
      
      const toRemove = sortedEntries.slice(0, this.cache.size - this.maxCacheSize);
      toRemove.forEach(([key, entry]) => {
        if (entry.pathElement.parentNode) {
          entry.pathElement.parentNode.removeChild(entry.pathElement);
        }
        this.cache.delete(key);
      });
    }

    console.debug(`Path cache cleanup: ${entriesToDelete.length} entries removed, ${this.cache.size} remaining`);
  }

  getMemoryUsage(): { cacheSize: number; estimatedMemoryKB: number } {
    let estimatedMemory = 0;
    
    for (const entry of this.cache.values()) {
      // Rough estimation: path string + samples array + metadata
      estimatedMemory += 1; // 1KB base per entry
      if (entry.samples) {
        estimatedMemory += entry.samples.length * 0.024; // ~24 bytes per sample point
      }
    }

    return {
      cacheSize: this.cache.size,
      estimatedMemoryKB: Math.round(estimatedMemory)
    };
  }

  private getOrCreateContainer(): SVGSVGElement {
    if (!this.tempContainer) {
      this.tempContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      this.tempContainer.style.position = 'absolute';
      this.tempContainer.style.left = '-9999px';
      this.tempContainer.style.top = '-9999px';
      this.tempContainer.style.width = '1px';
      this.tempContainer.style.height = '1px';
      this.tempContainer.style.visibility = 'hidden';
      document.body.appendChild(this.tempContainer);
    }
    return this.tempContainer;
  }

  getOrCreateTempPath(pathData: string): { pathElement: SVGPathElement; totalLength: number } {
    // Update access info
    const entry = this.cache.get(pathData);
    if (entry) {
      entry.lastAccessed = Date.now();
      entry.accessCount++;
      return { pathElement: entry.pathElement, totalLength: entry.totalLength };
    }

    // Create new path element
    const container = this.getOrCreateContainer();
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    container.appendChild(path);

    const totalLength = path.getTotalLength();
    
    const newEntry: CacheEntry = {
      pathElement: path,
      totalLength,
      lastAccessed: Date.now(),
      accessCount: 1
    };

    this.cache.set(pathData, newEntry);
    
    // Trigger cleanup if we're getting too full
    if (this.cache.size > this.maxCacheSize * 1.2) {
      this.cleanup();
    }

    return { pathElement: path, totalLength };
  }

  generateSamples(pathElement: SVGPathElement, totalLength: number, sampleDistance = 5): SamplePoint[] {
    const pathData = pathElement.getAttribute('d') || '';
    const entry = this.cache.get(pathData);
    
    if (entry?.samples) {
      entry.lastAccessed = Date.now();
      entry.accessCount++;
      return entry.samples;
    }

    const samples: SamplePoint[] = [];
    const numSamples = Math.max(Math.ceil(totalLength / sampleDistance), 2);
    
    // Use requestIdleCallback for non-blocking generation if available
    const generateSample = (i: number) => {
      const distance = (i / (numSamples - 1)) * totalLength;
      const point = pathElement.getPointAtLength(distance);
      
      // Calculate angle using small offset
      const offset = Math.min(1, totalLength * 0.001);
      const nextDistance = Math.min(distance + offset, totalLength);
      const nextPoint = pathElement.getPointAtLength(nextDistance);
      
      const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x);
      
      samples[i] = { x: point.x, y: point.y, angle };
    };

    // Generate samples (synchronous for now, could be made async if needed)
    for (let i = 0; i < numSamples; i++) {
      generateSample(i);
    }

    // Cache the samples
    if (entry) {
      entry.samples = samples;
      entry.lastAccessed = Date.now();
      entry.accessCount++;
    }

    return samples;
  }

  getInterpolatedPoint(samples: SamplePoint[], targetDistance: number, sampleDistance = 5): SamplePoint | null {
    if (samples.length === 0) return null;
    
    const targetIndex = targetDistance / sampleDistance;
    const lowerIndex = Math.floor(targetIndex);
    const upperIndex = Math.ceil(targetIndex);
    
    if (lowerIndex >= samples.length - 1) {
      return samples[samples.length - 1];
    }
    
    if (upperIndex <= 0) {
      return samples[0];
    }
    
    // Use the closest sample for performance
    if (lowerIndex === upperIndex) {
      return samples[lowerIndex];
    }
    
    // Simple interpolation
    const t = targetIndex - lowerIndex;
    const lower = samples[lowerIndex];
    const upper = samples[upperIndex];
    
    return {
      x: lower.x + (upper.x - lower.x) * t,
      y: lower.y + (upper.y - lower.y) * t,
      angle: lower.angle + (upper.angle - lower.angle) * t,
    };
  }

  clear() {
    // Clear cleanup timer
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
    }

    // Remove all path elements
    for (const entry of this.cache.values()) {
      if (entry.pathElement.parentNode) {
        entry.pathElement.parentNode.removeChild(entry.pathElement);
      }
    }
    
    this.cache.clear();
    
    // Remove container
    if (this.tempContainer && this.tempContainer.parentNode) {
      this.tempContainer.parentNode.removeChild(this.tempContainer);
      this.tempContainer = null;
    }
  }

  // Method to manually trigger cleanup
  forceCleanup() {
    this.cleanup();
  }
}

export const pathCache = new PathCache(); 