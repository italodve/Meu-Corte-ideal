'use client';

import Image from 'next/image';
import { FACE_SHAPE_DESCRIPTIONS, FACE_SHAPE_LABELS } from '@/lib/faceShapes';
import type { FaceShapeResult as FaceShapeResultType } from '@/lib/faceShapeClassifier';
import { FaceShapeIcon } from './FaceShapeIcon';

interface Props {
  result: FaceShapeResultType;
  annotatedImage: string;
}

const CONFIDENCE_COLORS = {
  high:   { dot: 'bg-green-500',  text: 'text-green-700',  bg: 'bg-green-50',  label: 'Alta precisão' },
  medium: { dot: 'bg-yellow-500', text: 'text-yellow-700', bg: 'bg-yellow-50', label: 'Precisão média' },
  low:    { dot: 'bg-gray-400',   text: 'text-gray-600',   bg: 'bg-gray-50',   label: 'Baixa precisão' },
};

export function FaceShapeResult({ result, annotatedImage }: Props) {
  const label       = FACE_SHAPE_LABELS[result.shape];
  const description = FACE_SHAPE_DESCRIPTIONS[result.shape];
  const conf        = CONFIDENCE_COLORS[result.confidence];

  return (
    <div className="grid items-start gap-6 md:grid-cols-[260px_1fr] fade-up">
      {/* Annotated photo */}
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-gray-200 shadow-md">
        <Image
          src={annotatedImage}
          alt="Análise facial"
          fill
          unoptimized
          className="object-cover"
        />
      </div>

      {/* Info panel */}
      <div className="flex flex-col gap-4">
        <div className={`inline-flex items-center gap-1.5 self-start rounded-full px-3 py-1 text-xs font-medium ${conf.bg} ${conf.text}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${conf.dot}`} />
          {conf.label}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
            <FaceShapeIcon shape={result.shape} size={40} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">Formato detectado</p>
            <h2 className="text-3xl font-bold text-gray-900">{label}</h2>
          </div>
        </div>

        <p className="leading-relaxed text-gray-700">{description}</p>

        <details className="group rounded-xl border border-gray-200 bg-gray-50">
          <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 select-none">
            Ver medidas da análise
            <svg className="h-4 w-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="border-t border-gray-200 px-4 py-3">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {([
                ['Comprimento',        `${result.measurements.faceLength}px`],
                ['Largura da testa',   `${result.measurements.foreheadWidth}px`],
                ['Largura das maçãs',  `${result.measurements.cheekboneWidth}px`],
                ['Largura do queixo',  `${result.measurements.jawWidth}px`],
                ['Razão comp./larg.',  String(result.measurements.ratioLW)],
              ] as [string, string][]).map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-gray-500">{k}</dt>
                  <dd className="font-medium text-gray-800">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </details>
      </div>
    </div>
  );
}
