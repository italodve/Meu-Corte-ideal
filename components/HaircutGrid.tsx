'use client';

import type { FaceShape, Gender } from '@/lib/faceShapes';
import { getHaircuts } from '@/lib/haircuts';
import { HaircutCard } from './HaircutCard';

interface Props {
  shape: FaceShape;
  gender: Gender;
}

export function HaircutGrid({ shape, gender }: Props) {
  const haircuts = getHaircuts(shape, gender);
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {haircuts.map((h) => (
        <HaircutCard
          key={`${shape}-${gender}-${h.id}`}
          shape={shape}
          gender={gender}
          haircut={h}
        />
      ))}
    </div>
  );
}
