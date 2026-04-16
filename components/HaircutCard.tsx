'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { FaceShape, Gender } from '@/lib/faceShapes';
import type { Haircut } from '@/lib/haircuts';

interface Props {
  shape: FaceShape;
  gender: Gender;
  haircut: Haircut;
}

type LoadState = 'idle' | 'loading' | 'ready' | 'error';

function storageKey(shape: FaceShape, gender: Gender, id: string) {
  return `haircut-img:${shape}:${gender}:${id}`;
}

export function HaircutCard({ shape, gender, haircut }: Props) {
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
      const cached = localStorage.getItem(storageKey(shape, gender, haircut.id));
      if (cached) {
        setImageSrc(cached);
        setState('ready');
        triggeredRef.current = true;
      }
    } catch {
      // ignore storage errors
    }
  }, [shape, gender, haircut.id]);

  useEffect(() => {
    if (!cardRef.current || triggeredRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !triggeredRef.current) {
            triggeredRef.current = true;
            void fetchImage();
          }
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();

    async function fetchImage() {
      setState('loading');
      setErrorMsg(null);
      try {
        const res = await fetch('/api/generate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            faceShape: shape,
            gender,
            styleId: haircut.id,
          }),
        });

        const payload = await res.json();
        if (!res.ok) {
          throw new Error(payload.error || 'Falha ao gerar imagem');
        }

        const dataUrl = `data:image/png;base64,${payload.imageBase64}`;
        setImageSrc(dataUrl);
        setState('ready');

        try {
          localStorage.setItem(storageKey(shape, gender, haircut.id), dataUrl);
        } catch {
          // ignore quota errors
        }
      } catch (err) {
        console.error(err);
        setErrorMsg(err instanceof Error ? err.message : 'Erro ao gerar imagem');
        setState('error');
      }
    }
  }, [shape, gender, haircut.id]);

  return (
    <div
      ref={cardRef}
      className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
    >
      <div className="relative flex aspect-square items-center justify-center bg-gray-100">
        {state === 'ready' && imageSrc ? (
          <Image
            src={imageSrc}
            alt={haircut.name}
            fill
            unoptimized
            className="object-cover"
          />
        ) : state === 'error' ? (
          <div className="p-4 text-center text-sm text-gray-500">
            <p>Nao foi possivel gerar a imagem.</p>
            {errorMsg && <p className="mt-1 text-xs text-gray-400">{errorMsg}</p>}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-brand-500" />
            <span className="text-xs">Gerando com IA...</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="font-semibold text-gray-900">{haircut.name}</h3>
        <p className="text-sm leading-relaxed text-gray-600">
          {haircut.description}
        </p>
      </div>
    </div>
  );
}
