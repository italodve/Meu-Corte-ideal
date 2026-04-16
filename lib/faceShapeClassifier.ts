import type { FaceShape } from './faceShapes';

interface Point {
  x: number;
  y: number;
}

export interface FaceShapeResult {
  shape: FaceShape;
  confidence: 'high' | 'medium' | 'low';
  measurements: {
    faceLength: number;
    jawWidth: number;
    cheekboneWidth: number;
    foreheadWidth: number;
    ratioLW: number;
  };
}

function distance(a: Point, b: Point): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function midpoint(a: Point, b: Point): Point {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

/**
 * Classify the face shape from 68 face-api.js landmarks.
 *
 * Landmark index reference (iBUG 68):
 *  - 0..16: jaw line (0 right cheek → 8 chin → 16 left cheek)
 *  - 17..21: right eyebrow
 *  - 22..26: left eyebrow
 *  - 27..35: nose
 *  - 36..41: right eye
 *  - 42..47: left eye
 *  - 48..67: mouth
 */
export function classifyFaceShape(points: Point[]): FaceShapeResult {
  if (points.length !== 68) {
    throw new Error(`Expected 68 landmarks, got ${points.length}`);
  }

  // Jaw width: narrow spot of the jaw, below the cheekbones.
  const jawWidth = distance(points[4], points[12]);

  // Cheekbone width: widest point of the face, around landmarks 1 & 15.
  const cheekboneWidth = distance(points[1], points[15]);

  // Forehead width: distance between outer eyebrow tips, scaled slightly
  // outward to approximate the actual temple width (eyebrows sit a bit inside
  // the hairline width).
  const foreheadWidth = distance(points[17], points[26]) * 1.1;

  // Face length: from the midpoint between the inner eyebrows up to an
  // estimated hairline, down to the chin (point 8). Multiplier accounts for
  // the forehead that sits above the eyebrows.
  const browMid = midpoint(points[21], points[22]);
  const faceLengthRaw = distance(browMid, points[8]);
  const faceLength = faceLengthRaw * 1.3;

  const maxWidth = Math.max(jawWidth, cheekboneWidth, foreheadWidth);
  const ratioLW = faceLength / maxWidth;

  // Normalised deltas used for the classification rules.
  const cheekVsJaw = cheekboneWidth / jawWidth;
  const foreheadVsJaw = foreheadWidth / jawWidth;
  const cheekVsForehead = cheekboneWidth / foreheadWidth;

  let shape: FaceShape = 'oval';
  let confidence: FaceShapeResult['confidence'] = 'medium';

  // Very long face regardless of width distribution.
  if (ratioLW > 1.55) {
    shape = 'oblong';
    confidence = 'high';
  } else if (ratioLW > 1.35) {
    // Longer-than-wide family: oval / heart / diamond.
    if (foreheadVsJaw > 1.08 && cheekVsJaw > 1.02 && jawWidth < cheekboneWidth) {
      shape = 'heart';
      confidence = 'high';
    } else if (cheekVsJaw > 1.08 && cheekVsForehead > 1.05) {
      shape = 'diamond';
      confidence = 'medium';
    } else {
      shape = 'oval';
      confidence = 'high';
    }
  } else {
    // Close to 1:1 ratio family: round / square / heart-ish.
    if (foreheadVsJaw > 1.1 && cheekVsJaw > 1.05) {
      shape = 'heart';
      confidence = 'medium';
    } else if (cheekVsJaw > 1.08) {
      shape = 'round';
      confidence = 'high';
    } else if (Math.abs(cheekVsJaw - 1) < 0.08 && Math.abs(foreheadVsJaw - 1) < 0.1) {
      shape = 'square';
      confidence = 'high';
    } else {
      shape = 'round';
      confidence = 'medium';
    }
  }

  return {
    shape,
    confidence,
    measurements: {
      faceLength: Math.round(faceLength),
      jawWidth: Math.round(jawWidth),
      cheekboneWidth: Math.round(cheekboneWidth),
      foreheadWidth: Math.round(foreheadWidth),
      ratioLW: Number(ratioLW.toFixed(2)),
    },
  };
}
