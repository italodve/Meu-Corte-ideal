'use client';

import type { FaceShape, Gender } from '@/lib/faceShapes';
import type { HairProfile } from '@/lib/hairProfile';
import { getHaircuts } from '@/lib/haircuts';
import { HaircutCard } from './HaircutCard';

interface Props {
  shape: FaceShape;
  gender: Gender;
  hairProfile: HairProfile;
}

export function HaircutGrid({ shape, gender, hairProfile }: Props) {
  const haircuts = getHaircuts(shape, gender);
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {haircuts.map((h) => (
        <HaircutCard
          key={`${shape}-${gender}-${h.id}`}
          shape={shape}
          gender={gender}
          haircut={h}
          hairProfile={hairProfile}
        />
      ))}
    </div>
  );
}
