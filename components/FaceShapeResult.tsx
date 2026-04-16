'use client';

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
    high: 'Alta confiança',
    medium: 'Confiança média',
    low: 'Baixa confiança',
  }[result.confidence];

  return (
    <div className="grid gap-6 md:grid-cols-[280px_1fr] items-start">
      <img
        src={annotatedImage}
        alt="Análise facial"
        className="w-full rounded-xl shadow-md border border-gray-200"
      />
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs uppercase tracking-wider text-brand-700 bg-brand-100 rounded-full px-3 py-1 font-semibold">
            Formato detectado
          </span>
          <span className="text-xs text-gray-500">{confidenceLabel}</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">{label}</h2>
        <p className="mt-3 text-gray-700 leading-relaxed">{description}</p>

        <details className="mt-4 text-sm text-gray-500">
          <summary className="cursor-pointer select-none hover:text-gray-700">
            Ver medidas usadas na análise
          </summary>
          <dl className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1">
            <dt>Comprimento</dt>
            <dd>{result.measurements.faceLength}px</dd>
            <dt>Largura da testa</dt>
            <dd>{result.measurements.foreheadWidth}px</dd>
            <dt>Largura das maçãs</dt>
            <dd>{result.measurements.cheekboneWidth}px</dd>
            <dt>Largura do queixo</dt>
            <dd>{result.measurements.jawWidth}px</dd>
            <dt>Razão comprimento/largura</dt>
            <dd>{result.measurements.ratioLW}</dd>
          </dl>
        </details>
      </div>
    </div>
  );
}
