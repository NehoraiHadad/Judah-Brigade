interface Point {
  x: number;
  y: number;
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
export class PathGenerator {
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
      const baseOffset = this.sideOffset || 20;
      const sideOffset = baseOffset + (this.rng.next() - 0.5) * 10;
      const verticalVariation = (this.rng.next() - 0.5) * 15;
      
      const isLeftPosition = index % 2 === 0;
      
      if (isLeftPosition) {
        return {
          x: diamond.x + sideOffset,
          y: diamond.y + verticalVariation
        };
      } else {
        return {
          x: diamond.x - sideOffset,
          y: diamond.y + verticalVariation
        };
      }
    });
  }

  private calculateControlPoints(
    prev: Point, 
    curr: Point, 
    next: Point | null, 
    index: number, 
    totalPoints: number
  ): { cp1: Point; cp2: Point } {
    const dx = curr.x - prev.x;
    const dy = curr.y - prev.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

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

  private generateFirstSegmentControlPoints(
    prev: Point, curr: Point, dx: number, dy: number, 
    perpX: number, perpY: number, distance: number
  ) {
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

  private generateLastSegmentControlPoints(
    prev: Point, curr: Point, dx: number, dy: number,
    perpX: number, perpY: number, distance: number
  ) {
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

  private generateMidSegmentControlPoints(
    prev: Point, curr: Point, next: Point, dx: number, dy: number,
    perpX: number, perpY: number, distance: number, index: number
  ) {
    const nextDx = next.x - curr.x;
    const nextDy = next.y - curr.y;
    
    const primaryMeander = this.waviness * distance * 0.5 * (this.rng.next() - 0.5);
    const secondaryMeander = this.waviness * distance * 0.4 * (this.rng.next() - 0.5);
    
    const terrainInfluence1 = Math.sin(index * 0.8) * 20;
    const terrainInfluence2 = Math.cos(index * 1.1) * 15;
    const windEffect1 = Math.sin(index * 1.5) * 12;
    const windEffect2 = Math.cos(index * 1.3) * 10;
    
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