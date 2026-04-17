import { NextRequest, NextResponse } from 'next/server';
import { FACE_SHAPES, type FaceShape, type Gender } from '@/lib/faceShapes';
import { findHaircut } from '@/lib/haircuts';
import { generateHaircutImage } from '@/lib/openai';
import {
  buildCacheKey,
  getCachedImage,
  setCachedImage,
} from '@/lib/imageCache';
import {
  HAIR_COLORS,
  HAIR_COLOR_EN,
  HAIR_TYPE_EN,
  HAIR_VOLUME_EN,
  SKIN_TONES,
  SKIN_TONE_EN,
  type HairColor,
  type HairProfile,
  type HairType,
  type HairVolume,
  type SkinTone,
} from '@/lib/hairProfile';

export const maxDuration = 60;
export const runtime = 'nodejs';

const VALID_GENDERS: Gender[] = ['masculino', 'feminino'];
const VALID_HAIR_TYPES: HairType[] = ['liso', 'ondulado', 'cacheado', 'crespo'];
const VALID_HAIR_VOLUMES: HairVolume[] = ['fino', 'normal', 'volumoso'];

const BASE_STYLE =
  'photorealistic studio portrait, neutral light grey background, soft lighting, head and shoulders framing, sharp focus, natural skin, realistic hair texture, no text, no watermark';

function isFaceShape(value: unknown): value is FaceShape {
  return typeof value === 'string' && (FACE_SHAPES as string[]).includes(value);
}

function isGender(value: unknown): value is Gender {
  return typeof value === 'string' && (VALID_GENDERS as string[]).includes(value);
}

function isHairType(v: unknown): v is HairType {
  return typeof v === 'string' && (VALID_HAIR_TYPES as string[]).includes(v);
}
function isHairColor(v: unknown): v is HairColor {
  return typeof v === 'string' && (HAIR_COLORS as readonly string[]).includes(v);
}
function isHairVolume(v: unknown): v is HairVolume {
  return typeof v === 'string' && (VALID_HAIR_VOLUMES as string[]).includes(v);
}
function isSkinTone(v: unknown): v is SkinTone {
  return typeof v === 'string' && (SKIN_TONES as readonly string[]).includes(v);
}

function isHairProfile(v: unknown): v is HairProfile {
  if (!v || typeof v !== 'object') return false;
  const p = v as Record<string, unknown>;
  return isHairType(p.type) && isHairColor(p.color) && isHairVolume(p.volume) && isSkinTone(p.skinTone);
}

function buildSubject(gender: Gender, hp: HairProfile): string {
  const genderWord = gender === 'masculino' ? 'man' : 'woman';
  return (
    `a young adult ${genderWord} with ${SKIN_TONE_EN[hp.skinTone]} skin tone, ` +
    `${HAIR_COLOR_EN[hp.color]} ${HAIR_VOLUME_EN[hp.volume]} ${HAIR_TYPE_EN[hp.type]} hair, ` +
    `friendly neutral expression, front-facing`
  );
}

function buildPrompt(gender: Gender, hp: HairProfile, styleDescription: string): string {
  return `${BASE_STYLE}, ${buildSubject(gender, hp)}, hairstyle: ${styleDescription}`;
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  const { faceShape, gender, styleId, hairProfile } = (body ?? {}) as {
    faceShape?: unknown;
    gender?: unknown;
    styleId?: unknown;
    hairProfile?: unknown;
  };

  if (
    !isFaceShape(faceShape) ||
    !isGender(gender) ||
    typeof styleId !== 'string' ||
    !isHairProfile(hairProfile)
  ) {
    return NextResponse.json({ error: 'Parâmetros inválidos' }, { status: 400 });
  }

  const haircut = findHaircut(faceShape, gender, styleId, hairProfile.type);
  if (!haircut) {
    return NextResponse.json(
      { error: 'Corte não encontrado no catálogo' },
      { status: 404 },
    );
  }

  const cacheKey = buildCacheKey(faceShape, gender, styleId, hairProfile);
  const cached = getCachedImage(cacheKey);
  if (cached) {
    return NextResponse.json({ imageBase64: cached, cached: true });
  }

  try {
    const prompt = buildPrompt(gender, hairProfile, haircut.styleDescription);
    const imageBase64 = await generateHaircutImage(prompt);
    setCachedImage(cacheKey, imageBase64);
    return NextResponse.json({ imageBase64, cached: false });
  } catch (err) {
    console.error('Image generation failed:', err);
    const message = err instanceof Error ? err.message : 'Erro ao gerar imagem';
    const status = message.includes('OPENAI_API_KEY') ? 500 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
