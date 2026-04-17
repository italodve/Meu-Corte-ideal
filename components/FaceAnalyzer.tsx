'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { loadFaceApi } from '@/lib/faceApi';
import { classifyFaceShape, type FaceShapeResult } from '@/lib/faceShapeClassifier';

interface FaceAnalyzerProps {
  imageDataUrl: string;
  onResult: (result: FaceShapeResult, annotatedDataUrl: string) => void;
  onError: (message: string) => void;
}

type Status = 'loading-models' | 'detecting' | 'done' | 'error';

const STEPS: { key: Status; label: string }[] = [
  { key: 'loading-models', label: 'Carregando modelos de IA' },
  { key: 'detecting',      label: 'Detectando pontos faciais' },
  { key: 'done',           label: 'Análise concluída' },
];

export function FaceAnalyzer({ imageDataUrl, onResult, onError }: FaceAnalyzerProps) {
  const [status, setStatus] = useState<Status>('loading-models');

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        setStatus('loading-models');
        const faceapi = await loadFaceApi();
        if (cancelled) return;

        const img = new window.Image();
        img.src = imageDataUrl;
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error('Falha ao carregar a imagem'));
        });
        if (cancelled) return;

        setStatus('detecting');
        const detections = await faceapi
          .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions({ inputSize: 416, scoreThreshold: 0.4 }))
          .withFaceLandmarks();
        if (cancelled) return;

        if (detections.length === 0) {
          onError('Não conseguimos detectar um rosto nessa foto. Tente uma selfie bem iluminada, de frente, sem óculos escuros.');
          setStatus('error');
          return;
        }
        if (detections.length > 1) {
          onError('Detectamos mais de um rosto. Envie uma foto com apenas uma pessoa para uma análise precisa.');
          setStatus('error');
          return;
        }

        const points = detections[0].landmarks.positions.map((p) => ({ x: p.x, y: p.y }));
        const result = classifyFaceShape(points);

        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const lw = Math.max(2, Math.min(img.width, img.height) / 250);
          ctx.strokeStyle = 'rgba(234, 88, 12, 0.85)';
          ctx.fillStyle   = 'rgba(234, 88, 12, 0.85)';
          ctx.lineWidth   = lw;
          for (const pt of points) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, lw * 1.2, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.beginPath();
          for (let i = 0; i <= 16; i++) {
            if (i === 0) ctx.moveTo(points[i].x, points[i].y);
            else ctx.lineTo(points[i].x, points[i].y);
          }
          ctx.stroke();
        }

        setStatus('done');
        onResult(result, canvas.toDataURL('image/jpeg', 0.9));
      } catch (err) {
        if (!cancelled) {
          onError(err instanceof Error ? err.message : 'Erro desconhecido ao analisar a imagem.');
          setStatus('error');
        }
      }
    }

    void run();
    return () => { cancelled = true; };
  }, [imageDataUrl, onError, onResult]);

  const currentStep = STEPS.findIndex((s) => s.key === status);

  return (
    <div className="flex flex-col items-center gap-8 py-6 fade-up">
      <div className="relative w-64 h-64 sm:w-72 sm:h-72">
        <div className="absolute inset-0 rounded-full pulse-ring" />
        <div className="relative w-full h-full overflow-hidden rounded-full shadow-xl ring-4 ring-brand-200">
          <Image
            src={imageDataUrl}
            alt="Sua selfie"
            fill
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
        </div>
      </div>

      <div className="w-full max-w-xs space-y-3">
        {STEPS.map((step, i) => {
          const isDone   = i < currentStep;
          const isActive = i === currentStep;
          return (
            <div key={step.key} className="flex items-center gap-3">
              <div className={`
                flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all
                ${isDone  ? 'bg-green-500 text-white' : ''}
                ${isActive ? 'bg-brand-500 text-white ring-4 ring-brand-100' : ''}
                ${!isDone && !isActive ? 'bg-gray-100 text-gray-400' : ''}
              `}>
                {isDone ? '✓' : i + 1}
              </div>
              <span className={`text-sm transition-colors ${isActive ? 'font-semibold text-gray-900' : isDone ? 'text-gray-400 line-through' : 'text-gray-400'}`}>
                {step.label}
                {isActive && <span className="ml-1 inline-block animate-pulse">…</span>}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
