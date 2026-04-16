'use client';

import { useEffect, useRef, useState } from 'react';
import { loadFaceApi } from '@/lib/faceApi';
import {
  classifyFaceShape,
  type FaceShapeResult,
} from '@/lib/faceShapeClassifier';

interface FaceAnalyzerProps {
  imageDataUrl: string;
  onResult: (result: FaceShapeResult, annotatedDataUrl: string) => void;
  onError: (message: string) => void;
}

export function FaceAnalyzer({
  imageDataUrl,
  onResult,
  onError,
}: FaceAnalyzerProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [status, setStatus] = useState<
    'loading-models' | 'detecting' | 'done' | 'error'
  >('loading-models');

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        setStatus('loading-models');
        const faceapi = await loadFaceApi();
        if (cancelled) return;

        const img = new Image();
        img.src = imageDataUrl;
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error('Falha ao carregar a imagem'));
        });
        if (cancelled) return;

        setStatus('detecting');
        const detections = await faceapi
          .detectAllFaces(
            img,
            new faceapi.TinyFaceDetectorOptions({
              inputSize: 416,
              scoreThreshold: 0.4,
            }),
          )
          .withFaceLandmarks();

        if (cancelled) return;

        if (detections.length === 0) {
          onError(
            'Não conseguimos detectar um rosto nessa foto. Tente uma selfie bem iluminada, de frente, sem óculos escuros.',
          );
          setStatus('error');
          return;
        }

        if (detections.length > 1) {
          onError(
            'Detectamos mais de um rosto. Envie uma foto com apenas uma pessoa para uma análise precisa.',
          );
          setStatus('error');
          return;
        }

        const detection = detections[0];
        const points = detection.landmarks.positions.map((p) => ({
          x: p.x,
          y: p.y,
        }));
        const result = classifyFaceShape(points);

        // Render annotated preview so the user sees what the model detected.
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          ctx.strokeStyle = 'rgba(249, 115, 22, 0.9)';
          ctx.lineWidth = Math.max(2, Math.min(img.width, img.height) / 300);
          ctx.fillStyle = 'rgba(249, 115, 22, 0.9)';
          for (const pt of points) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, ctx.lineWidth, 0, Math.PI * 2);
            ctx.fill();
          }
          // Connect jaw line for a nicer visualisation.
          ctx.beginPath();
          for (let i = 0; i <= 16; i++) {
            if (i === 0) ctx.moveTo(points[i].x, points[i].y);
            else ctx.lineTo(points[i].x, points[i].y);
          }
          ctx.stroke();
        }
        const annotated = canvas.toDataURL('image/jpeg', 0.9);

        setStatus('done');
        onResult(result, annotated);
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          onError(
            err instanceof Error
              ? err.message
              : 'Erro desconhecido ao analisar a imagem.',
          );
          setStatus('error');
        }
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [imageDataUrl, onError, onResult]);

  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <img
        ref={imgRef}
        src={imageDataUrl}
        alt="Selfie para análise"
        className="max-h-80 rounded-xl shadow-md"
      />
      <div className="flex items-center gap-3 text-brand-700">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-300 border-t-brand-700" />
        <span className="font-medium">
          {status === 'loading-models'
            ? 'Carregando modelos de detecção...'
            : status === 'detecting'
              ? 'Analisando geometria do rosto...'
              : status === 'error'
                ? 'Erro na análise'
                : 'Pronto!'}
        </span>
      </div>
    </div>
  );
}
