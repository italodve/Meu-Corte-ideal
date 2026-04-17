'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { FaceShape, Gender } from '@/lib/faceShapes';
import type { Haircut } from '@/lib/haircuts';
import type { HairProfile } from '@/lib/hairProfile';

interface Props {
  shape: FaceShape;
  gender: Gender;
  haircut: Haircut;
  hairProfile: HairProfile;
}

type LoadState = 'idle' | 'loading' | 'ready' | 'error';

function profileTag(hp: HairProfile) {
  return `${hp.type}|${hp.color}|${hp.volume}|${hp.skinTone}`;
}

function storageKey(shape: FaceShape, gender: Gender, id: string, hp: HairProfile) {
  return `haircut-img:${shape}:${gender}:${id}:${profileTag(hp)}`;
}

async function doFetch(
  shape: FaceShape,
  gender: Gender,
  id: string,
  hairProfile: HairProfile,
): Promise<string> {
  const res = await fetch('/api/generate-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ faceShape: shape, gender, styleId: id, hairProfile }),
  });
  const payload = await res.json();
  if (!res.ok) throw new Error(payload.error || 'Falha ao gerar imagem');
  return `data:image/png;base64,${payload.imageBase64}`;
}

export function HaircutCard({ shape, gender, haircut, hairProfile }: Props) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [state, setState] = useState<LoadState>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const triggeredRef = useRef(false);

  useEffect(() => {
    triggeredRef.current = false;
    setImageSrc(null);
    setState('idle');
    setErrorMsg(null);

    try {
      const cached = localStorage.getItem(storageKey(shape, gender, haircut.id, hairProfile));
      if (cached) {
        setImageSrc(cached);
        setState('ready');
        triggeredRef.current = true;
      }
    } catch { /* ignore */ }
  }, [shape, gender, haircut.id, hairProfile]);

  useEffect(() => {
    if (!cardRef.current || triggeredRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !triggeredRef.current) {
            triggeredRef.current = true;
            load();
          }
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shape, gender, haircut.id, hairProfile]);

  function load() {
    setState('loading');
    setErrorMsg(null);
    doFetch(shape, gender, haircut.id, hairProfile)
      .then((url) => {
        setImageSrc(url);
        setState('ready');
        try { localStorage.setItem(storageKey(shape, gender, haircut.id, hairProfile), url); } catch { /* quota */ }
      })
      .catch((err) => {
        setErrorMsg(err instanceof Error ? err.message : 'Erro ao gerar imagem');
        setState('error');
      });
  }

  function retry() {
    triggeredRef.current = true;
    load();
  }

  return (
    <div
      ref={cardRef}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {state === 'ready' && imageSrc ? (
          <Image
            src={imageSrc}
            alt={haircut.name}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : state === 'error' ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
            <span className="text-3xl">🖼️</span>
            <p className="text-sm text-gray-500">Não foi possível gerar a imagem</p>
            {errorMsg && <p className="text-xs text-gray-400 line-clamp-2">{errorMsg}</p>}
            <button
              type="button"
              onClick={retry}
              className="mt-1 rounded-full border border-brand-300 px-4 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-50 transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div className="skeleton absolute inset-0" />
            <div className="relative z-10 flex flex-col items-center gap-2 text-gray-400">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-brand-500" />
              <span className="text-xs font-medium">Gerando com IA…</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="font-semibold text-gray-900">{haircut.name}</h3>
        <p className="text-sm leading-relaxed text-gray-600">{haircut.description}</p>
      </div>
    </div>
  );
}
