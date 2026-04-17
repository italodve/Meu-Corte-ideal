import type { HairColor, SkinTone } from './hairProfile';

interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface DetectedAppearance {
  hairColor: HairColor;
  skinTone: SkinTone;
}

function averageColor(data: Uint8ClampedArray): RGB {
  let r = 0, g = 0, b = 0, count = 0;
  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a < 128) continue;
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    count++;
  }
  if (count === 0) return { r: 0, g: 0, b: 0 };
  return { r: r / count, g: g / count, b: b / count };
}

function colorDistance(a: RGB, b: RGB): number {
  return Math.sqrt((a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2);
}

const HAIR_COLOR_REFS: { color: HairColor; rgb: RGB }[] = [
  { color: 'preto',           rgb: { r: 30, g: 25, b: 25 } },
  { color: 'castanho escuro', rgb: { r: 60, g: 35, b: 22 } },
  { color: 'castanho',        rgb: { r: 110, g: 65, b: 45 } },
  { color: 'castanho claro',  rgb: { r: 165, g: 100, b: 55 } },
  { color: 'loiro',           rgb: { r: 200, g: 170, b: 80 } },
  { color: 'ruivo',           rgb: { r: 175, g: 75, b: 45 } },
  { color: 'grisalho',        rgb: { r: 160, g: 160, b: 160 } },
];

const SKIN_TONE_REFS: { tone: SkinTone; rgb: RGB }[] = [
  { tone: 'claro',  rgb: { r: 245, g: 215, b: 185 } },
  { tone: 'medio',  rgb: { r: 210, g: 165, b: 115 } },
  { tone: 'moreno', rgb: { r: 170, g: 115, b: 65 } },
  { tone: 'negro',  rgb: { r: 105, g: 65, b: 40 } },
];

function classifyHairColor(avg: RGB): HairColor {
  let best: HairColor = 'castanho';
  let bestDist = Infinity;
  for (const ref of HAIR_COLOR_REFS) {
    const d = colorDistance(avg, ref.rgb);
    if (d < bestDist) {
      bestDist = d;
      best = ref.color;
    }
  }
  return best;
}

function classifySkinTone(avg: RGB): SkinTone {
  let best: SkinTone = 'medio';
  let bestDist = Infinity;
  for (const ref of SKIN_TONE_REFS) {
    const d = colorDistance(avg, ref.rgb);
    if (d < bestDist) {
      bestDist = d;
      best = ref.tone;
    }
  }
  return best;
}

/**
 * Detect hair color and skin tone by sampling pixel regions around
 * face-api.js 68-point landmarks.
 *
 * Hair: region above the eyebrows (landmarks 17-26).
 * Skin: cheek area between landmarks 1-3 and nose bridge.
 */
export function detectAppearance(
  img: HTMLImageElement | HTMLCanvasElement,
  landmarks: { x: number; y: number }[],
): DetectedAppearance {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0);

  // --- Hair color ---
  const brows = landmarks.slice(17, 27);
  const browTop = Math.min(...brows.map((p) => p.y));
  const browLeft = Math.min(...brows.map((p) => p.x));
  const browRight = Math.max(...brows.map((p) => p.x));
  const hairHeight = Math.max(20, img.height * 0.08);
  const hairY = Math.max(0, browTop - hairHeight);
  const hairW = Math.max(1, Math.round(browRight - browLeft));
  const hairH = Math.max(1, Math.round(browTop - hairY));
  const hairPixels = ctx.getImageData(Math.round(browLeft), Math.round(hairY), hairW, hairH);
  const hairAvg = averageColor(hairPixels.data);
  const hairColor = classifyHairColor(hairAvg);

  // --- Skin tone ---
  const cheekX = Math.round((landmarks[1].x + landmarks[31].x) / 2);
  const cheekY = Math.round((landmarks[2].y + landmarks[30].y) / 2);
  const sampleR = Math.max(8, Math.round(img.width * 0.03));
  const sx = Math.max(0, cheekX - sampleR);
  const sy = Math.max(0, cheekY - sampleR);
  const sw = Math.min(sampleR * 2, img.width - sx);
  const sh = Math.min(sampleR * 2, img.height - sy);
  const skinPixels = ctx.getImageData(sx, sy, sw, sh);
  const skinAvg = averageColor(skinPixels.data);
  const skinTone = classifySkinTone(skinAvg);

  return { hairColor, skinTone };
}
