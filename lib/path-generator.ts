// lib/path-generator.ts

/**
 * Represents a 2D point.
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Seeded random number generator for producing consistent sequences of random numbers.
 */
export class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  /**
   * Generates the next random number in the sequence.
   * @returns A pseudo-random number between 0 (inclusive) and 1 (exclusive).
   */
  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
}

/**
 * Generates an SVG path string for a continuous, wavy line connecting a series of diamond points.
 * It adapts its pathing strategy based on the layout type (mobile, tablet, desktop)
 * and includes parameters for controlling the path's appearance.
 */
export class PathGenerator {
  private rng: SeededRandom;
  private waviness: number;
  private smoothness: number;
  private baseOffset: number;
  private layoutType: 'mobile' | 'tablet' | 'desktop';
  private environmentalEffectScale: number = 0.5; // Factor to scale down environmental effects

  constructor(
    seed: number,
    waviness: number,
    smoothness: number,
    sideOffset: number, // sideOffset from props, used as baseOffset internally
    layoutType: 'mobile' | 'tablet' | 'desktop' = 'desktop'
  ) {
    this.rng = new SeededRandom(seed);
    this.waviness = waviness;
    this.smoothness = smoothness;
    this.baseOffset = sideOffset;
    this.layoutType = layoutType;
  }

  // Calculates the effective start (exit) and end (entry) points for a path segment between two diamonds
  private getSegmentEndpoints(
    diamondPrevCenter: Point,
    diamondCurrCenter: Point,
    diamondPrevIndex: number // Original index of diamondPrevCenter in the main diamonds array
  ): { exitPoint: Point; entryPoint: Point } {

    let exitPoint = { ...diamondPrevCenter };
    let entryPoint = { ...diamondCurrCenter };

    const hRandom = (this.rng.next() - 0.5) * this.baseOffset * 0.1; // Small horizontal randomness
    const vRandom = (this.rng.next() - 0.5) * this.baseOffset * 0.1; // Small vertical randomness

    if (this.layoutType === 'mobile') {
      const isPrevDiamondLeftInPair = diamondPrevIndex % 2 === 0;

      exitPoint.x += (isPrevDiamondLeftInPair ? this.baseOffset : -this.baseOffset) + hRandom;
      exitPoint.y += vRandom;

      const isCurrDiamondLeftInPair = (diamondPrevIndex + 1) % 2 === 0;
      // If current diamond (diamondCurrCenter) is on the Left side of a pair (e.g. D2, D4),
      // the path is coming from a diamond on its Right (e.g. D1, D3). So, entry should be on Right side of current diamond.
      // entryPoint.x = diamondCurrCenter.x + this.baseOffset
      // If current diamond is on the Right side of a pair (e.g. D1, D3),
      // the path is coming from a diamond on its Left (e.g. D0, D2). So, entry should be on Left side of current diamond.
      // entryPoint.x = diamondCurrCenter.x - this.baseOffset
      entryPoint.x += (isCurrDiamondLeftInPair ? this.baseOffset : -this.baseOffset) + hRandom;
      entryPoint.y += vRandom;

    } else { // Tablet & Desktop logic
      const deltaX = diamondCurrCenter.x - diamondPrevCenter.x;
      const deltaY = diamondCurrCenter.y - diamondPrevCenter.y;

      if (Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
        exitPoint.x += (deltaX > 0 ? this.baseOffset : -this.baseOffset) + hRandom;
        entryPoint.x -= (deltaX > 0 ? this.baseOffset : -this.baseOffset) - hRandom;
        exitPoint.y += vRandom;
        entryPoint.y += vRandom;
      } else {
        const verticalOffsetScale = 0.7;
        exitPoint.y += (deltaY > 0 ? this.baseOffset * verticalOffsetScale : -this.baseOffset * verticalOffsetScale) + vRandom;
        entryPoint.y -= (deltaY > 0 ? this.baseOffset * verticalOffsetScale : -this.baseOffset * verticalOffsetScale) - vRandom;
        exitPoint.x += hRandom;
        entryPoint.x += hRandom;
      }
    }
    return { exitPoint, entryPoint };
  }

  private calculateControlPoints(
    segmentStart: Point,
    segmentEnd: Point,
    isFirstSegment: boolean,
    isLastSegment: boolean,
  ): { cp1: Point; cp2: Point } {
    const dx = segmentEnd.x - segmentStart.x;
    const dy = segmentEnd.y - segmentStart.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const perpX = -dy / distance || 0;
    const perpY = dx / distance || 0;

    if (distance === 0) {
        return { cp1: {...segmentStart}, cp2: {...segmentEnd}};
    }

    if (isFirstSegment) {
      return this.generateFirstSegmentControlPoints(segmentStart, segmentEnd, dx, dy, perpX, perpY, distance);
    } else if (isLastSegment) {
      return this.generateLastSegmentControlPoints(segmentStart, segmentEnd, dx, dy, perpX, perpY, distance);
    } else {
      return this.generateMidSegmentControlPoints(segmentStart, segmentEnd, dx, dy, perpX, perpY, distance);
    }
  }

  private generateFirstSegmentControlPoints(segmentStart: Point, segmentEnd: Point, dx: number, dy: number, perpX: number, perpY: number, distance: number) {
    const meander1 = this.waviness * distance * 0.4 * (this.rng.next() - 0.5);
    const meander2 = this.waviness * distance * 0.5 * (this.rng.next() - 0.5);
    const curvature = (this.rng.next() - 0.5) * 45 * this.environmentalEffectScale;

    return {
      cp1: {
        x: segmentStart.x + dx * 0.3 + perpX * meander1 + curvature,
        y: segmentStart.y + dy * 0.3 + perpY * meander1
      },
      cp2: {
        x: segmentEnd.x - dx * 0.35 + perpX * meander2 - curvature * 0.7,
        y: segmentEnd.y - dy * 0.35 + perpY * meander2
      }
    };
  }

  private generateLastSegmentControlPoints(segmentStart: Point, segmentEnd: Point, dx: number, dy: number, perpX: number, perpY: number, distance: number) {
    const meander1 = this.waviness * distance * 0.45 * (this.rng.next() - 0.5);
    const meander2 = this.waviness * distance * 0.35 * (this.rng.next() - 0.5);
    const curvature = (this.rng.next() - 0.5) * 35 * this.environmentalEffectScale;

    return {
      cp1: {
        x: segmentStart.x + dx * this.smoothness * 0.4 + perpX * meander1 + curvature,
        y: segmentStart.y + dy * this.smoothness * 0.4 + perpY * meander1
      },
      cp2: {
        x: segmentEnd.x - dx * 0.3 + perpX * meander2 - curvature * 0.8,
        y: segmentEnd.y - dy * 0.3 + perpY * meander2
      }
    };
  }

  private generateMidSegmentControlPoints(segmentStart: Point, segmentEnd: Point, dx: number, dy: number, perpX: number, perpY: number, distance: number) {
    const primaryMeander = this.waviness * distance * 0.5 * (this.rng.next() - 0.5);
    const secondaryMeander = this.waviness * distance * 0.4 * (this.rng.next() - 0.5);

    const scale = this.environmentalEffectScale;
    const terrainInfluence1 = Math.sin(this.rng.next() * Math.PI * 2) * 20 * scale;
    const terrainInfluence2 = Math.cos(this.rng.next() * Math.PI * 2) * 15 * scale;
    const windEffect1 = Math.sin(this.rng.next() * Math.PI * 2) * 12 * scale;
    const windEffect2 = Math.cos(this.rng.next() * Math.PI * 2) * 10 * scale;
    const seek1 = (this.rng.next() - 0.5) * 30 * scale;
    const seek2 = (this.rng.next() - 0.5) * 25 * scale;

    return {
      cp1: {
        x: segmentStart.x + dx * this.smoothness * 0.4 + perpX * primaryMeander + terrainInfluence1 + windEffect1 + seek1,
        y: segmentStart.y + dy * this.smoothness * 0.4 + perpY * primaryMeander
      },
      cp2: {
        x: segmentEnd.x - dx * this.smoothness * 0.4 + perpX * secondaryMeander + terrainInfluence2 + windEffect2 + seek2,
        y: segmentEnd.y - dy * this.smoothness * 0.4 + perpY * secondaryMeander
      }
    };
  }

  public generatePath(diamonds: Point[]): string {
    if (diamonds.length < 2) return '';

    const { exitPoint: exitPointD0, entryPoint: entryPointD1 } = this.getSegmentEndpoints(
      diamonds[0],
      diamonds[1],
      0
    );

    let path = `M ${exitPointD0.x} ${exitPointD0.y}`;

    const { cp1: cp1_D0_D1, cp2: cp2_D0_D1 } = this.calculateControlPoints(
        exitPointD0,
        entryPointD1,
        true,
        diamonds.length === 2
    );
    path += ` C ${cp1_D0_D1.x} ${cp1_D0_D1.y}, ${cp2_D0_D1.x} ${cp2_D0_D1.y}, ${entryPointD1.x} ${entryPointD1.y}`;

    for (let i = 1; i < diamonds.length - 1; i++) {
      const diamondPrevCenterForCurve = diamonds[i];
      const diamondCurrCenterForCurve = diamonds[i+1];

      let curveActualStartPoint: Point;
      if (i === 1) {
        curveActualStartPoint = entryPointD1;
      } else {
        const { entryPoint: entryToDi } = this.getSegmentEndpoints(
          diamonds[i-1],
          diamonds[i],
          i-1
        );
        curveActualStartPoint = entryToDi;
      }

      const { entryPoint: entryToDiPlus1 } = this.getSegmentEndpoints(
        diamondPrevCenterForCurve,
        diamondCurrCenterForCurve,
        i
      );

      const isLastSegment = i === diamonds.length - 2;

      const { cp1, cp2 } = this.calculateControlPoints(
        curveActualStartPoint,
        entryToDiPlus1,
        false,
        isLastSegment
      );
      path += ` C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${entryToDiPlus1.x} ${entryToDiPlus1.y}`;
    }
    return path;
  }
}
