import { NextRequest, NextResponse } from 'next/server';
import { FACE_SHAPES, type FaceShape, type Gender } from '@/lib/faceShapes';
import { findHaircut } from '@/lib/haircuts';
import { generateHaircutImage } from '@/lib/openai';
import {
  buildCacheKey,
  getCachedImage,
  setCachedImage,
} from '@/lib/imageCache';

// Image generation is slow — let the route wait up to 60s.
export const maxDuration = 60;
export const runtime = 'nodejs';

const VALID_GENDERS: Gender[] = ['masculino', 'feminino'];

function isFaceShape(value: unknown): value is FaceShape {
  return typeof value === 'string' && (FACE_SHAPES as string[]).includes(value);
}

function isGender(value: unknown): value is Gender {
  return typeof value === 'string' && (VALID_GENDERS as string[]).includes(value);
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'JSON inválido' },
      { status: 400 },
    );
  }

  const { faceShape, gender, styleId } = (body ?? {}) as {
    faceShape?: unknown;
    gender?: unknown;
    styleId?: unknown;
  };

  if (!isFaceShape(faceShape) || !isGender(gender) || typeof styleId !== 'string') {
    return NextResponse.json(
      { error: 'Parâmetros inválidos' },
      { status: 400 },
    );
  }

  const haircut = findHaircut(faceShape, gender, styleId);
  if (!haircut) {
    return NextResponse.json(
      { error: 'Corte não encontrado no catálogo' },
      { status: 404 },
    );
  }

  const cacheKey = buildCacheKey(faceShape, gender, styleId);
  const cached = getCachedImage(cacheKey);
  if (cached) {
    return NextResponse.json({ imageBase64: cached, cached: true });
  }

  try {
    const imageBase64 = await generateHaircutImage(haircut.prompt);
    setCachedImage(cacheKey, imageBase64);
    return NextResponse.json({ imageBase64, cached: false });
  } catch (err) {
    console.error('Image generation failed:', err);
    const message =
      err instanceof Error ? err.message : 'Erro ao gerar imagem';
    const status = message.includes('OPENAI_API_KEY') ? 500 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
