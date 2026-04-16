'use client';

import Image from 'next/image';
import { FACE_SHAPE_DESCRIPTIONS, FACE_SHAPE_LABELS } from '@/lib/faceShapes';
import type { FaceShapeResult as FaceShapeResultType } from '@/lib/faceShapeClassifier';

interface Props {
  result: FaceShapeResultType;
  annotatedImage: string;
}

export function FaceShapeResult({ result, annotatedImage }: Props) {
  const label = FACE_SHAPE_LABELS[result.shape];
  const description = FACE_SHAPE_DESCRIPTIONS[result.shape];

  const confidenceLabel = {
    high: 'Alta confianca',
    medium: 'Confianca media',
    low: 'Baixa confianca',
  }[result.confidence];

  return (
    <div className="grid items-start gap-6 md:grid-cols-[280px_1fr]">
      <div className="relative aspect-square overflow-hidden rounded-xl border border-gray-200 shadow-md">
        <Image
          src={annotatedImage}
          alt="Analise facial"
          fill
          unoptimized
          className="object-cover"
        />
      </div>
      <div>
        <div className="mb-2 flex items-center gap-3">
          <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700">
            Formato detectado
          </span>
          <span className="text-xs text-gray-500">{confidenceLabel}</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">{label}</h2>
        <p className="mt-3 leading-relaxed text-gray-700">{description}</p>

        <details className="mt-4 text-sm text-gray-500">
          <summary className="cursor-pointer select-none hover:text-gray-700">
            Ver medidas usadas na analise
          </summary>
          <dl className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1">
            <dt>Comprimento</dt>
            <dd>{result.measurements.faceLength}px</dd>
            <dt>Largura da testa</dt>
            <dd>{result.measurements.foreheadWidth}px</dd>
            <dt>Largura das macas</dt>
            <dd>{result.measurements.cheekboneWidth}px</dd>
            <dt>Largura do queixo</dt>
            <dd>{result.measurements.jawWidth}px</dd>
            <dt>Razao comprimento/largura</dt>
            <dd>{result.measurements.ratioLW}</dd>
          </dl>
        </details>
      </div>
    </div>
  );
}
