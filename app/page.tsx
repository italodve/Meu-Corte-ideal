'use client';

import { useState } from 'react';
import { SelfieCapture } from '@/components/SelfieCapture';
import { FaceAnalyzer } from '@/components/FaceAnalyzer';
import { FaceShapeResult } from '@/components/FaceShapeResult';
import { GenderToggle } from '@/components/GenderToggle';
import { HaircutGrid } from '@/components/HaircutGrid';
import type { FaceShapeResult as FaceShapeResultType } from '@/lib/faceShapeClassifier';
import type { Gender } from '@/lib/faceShapes';

type Phase = 'intro' | 'analyzing' | 'result' | 'error';

export default function HomePage() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [selfie, setSelfie] = useState<string | null>(null);
  const [annotated, setAnnotated] = useState<string | null>(null);
  const [result, setResult] = useState<FaceShapeResultType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [gender, setGender] = useState<Gender>('masculino');

  function handleCapture(dataUrl: string) {
    setSelfie(dataUrl);
    setResult(null);
    setAnnotated(null);
    setError(null);
    setPhase('analyzing');
  }

  function handleResult(
    r: FaceShapeResultType,
    annotatedDataUrl: string,
  ) {
    setResult(r);
    setAnnotated(annotatedDataUrl);
    setPhase('result');
  }

  function handleError(message: string) {
    setError(message);
    setPhase('error');
  }

  function reset() {
    setPhase('intro');
    setSelfie(null);
    setResult(null);
    setAnnotated(null);
    setError(null);
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:py-16">
      <header className="mb-10">
        <p className="text-brand-600 font-semibold text-sm tracking-wider uppercase">
          Meu Corte Ideal
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mt-1">
          Descubra o corte de cabelo perfeito para o seu rosto
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl text-lg">
          Envie uma selfie e nossa IA analisa o formato do seu rosto para
          recomendar cortes que combinam com você. As imagens de referência
          são geradas sob demanda por inteligência artificial.
        </p>
      </header>

      {phase === 'intro' && (
        <section className="rounded-2xl bg-white shadow-sm border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Comece enviando uma selfie
          </h2>
          <ol className="text-sm text-gray-600 mb-5 space-y-1 list-decimal list-inside">
            <li>Foto de frente, rosto bem visível e iluminado.</li>
            <li>Sem óculos escuros e, de preferência, cabelo para trás.</li>
            <li>Nada sai do seu dispositivo até você ver o resultado.</li>
          </ol>
          <SelfieCapture onCapture={handleCapture} />
        </section>
      )}

      {phase === 'analyzing' && selfie && (
        <section className="rounded-2xl bg-white shadow-sm border border-gray-200 p-6 sm:p-8">
          <FaceAnalyzer
            imageDataUrl={selfie}
            onResult={handleResult}
            onError={handleError}
          />
        </section>
      )}

      {phase === 'error' && (
        <section className="rounded-2xl bg-white shadow-sm border border-red-200 p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-red-700 mb-2">
            Não foi possível analisar a foto
          </h2>
          <p className="text-gray-700 mb-5">{error}</p>
          <button
            type="button"
            onClick={reset}
            className="rounded-lg bg-brand-600 text-white font-semibold py-2 px-5 hover:bg-brand-700"
          >
            Tentar novamente
          </button>
        </section>
      )}

      {phase === 'result' && result && annotated && (
        <div className="space-y-10">
          <section className="rounded-2xl bg-white shadow-sm border border-gray-200 p-6 sm:p-8">
            <FaceShapeResult result={result} annotatedImage={annotated} />
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={reset}
                className="text-sm font-medium text-brand-700 hover:text-brand-800 underline"
              >
                Analisar outra foto
              </button>
            </div>
          </section>

          <section>
            <div className="flex items-end justify-between flex-wrap gap-4 mb-5">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Cortes recomendados
                </h2>
                <p className="text-gray-600 text-sm">
                  Escolha o tipo de corte para gerar as referências.
                </p>
              </div>
              <GenderToggle value={gender} onChange={setGender} />
            </div>
            <HaircutGrid shape={result.shape} gender={gender} />
          </section>
        </div>
      )}

      <footer className="mt-16 text-xs text-gray-400 text-center">
        As imagens de cortes são geradas por IA (GPT Image 1 Mini) e servem
        apenas como referência visual.
      </footer>
    </main>
  );
}
