'use client';

import { useState } from 'react';
import { SelfieCapture } from '@/components/SelfieCapture';
import { FaceAnalyzer } from '@/components/FaceAnalyzer';
import { FaceShapeResult } from '@/components/FaceShapeResult';
import { FaceShapeIcon } from '@/components/FaceShapeIcon';
import { GenderToggle } from '@/components/GenderToggle';
import { HaircutGrid } from '@/components/HaircutGrid';
import { HairProfileForm } from '@/components/HairProfileForm';
import type { FaceShapeResult as FaceShapeResultType } from '@/lib/faceShapeClassifier';
import type { DetectedAppearance } from '@/lib/hairColorDetector';
import type { FaceShape, Gender } from '@/lib/faceShapes';
import type { HairProfile } from '@/lib/hairProfile';
import { FACE_SHAPE_LABELS } from '@/lib/faceShapes';

type Phase = 'intro' | 'analyzing' | 'hair-profile' | 'result' | 'error';

const ALL_SHAPES: FaceShape[] = ['oval', 'round', 'square', 'heart', 'oblong', 'diamond'];

export default function HomePage() {
  const [phase, setPhase]       = useState<Phase>('intro');
  const [selfie, setSelfie]     = useState<string | null>(null);
  const [annotated, setAnnotated] = useState<string | null>(null);
  const [result, setResult]     = useState<FaceShapeResultType | null>(null);
  const [error, setError]       = useState<string | null>(null);
  const [gender, setGender]     = useState<Gender>('masculino');
  const [detected, setDetected] = useState<DetectedAppearance | null>(null);
  const [hairProfile, setHairProfile] = useState<HairProfile | null>(null);

  function handleCapture(dataUrl: string) {
    setSelfie(dataUrl);
    setResult(null);
    setAnnotated(null);
    setError(null);
    setDetected(null);
    setHairProfile(null);
    setPhase('analyzing');
  }

  function handleResult(
    r: FaceShapeResultType,
    appearance: DetectedAppearance,
    annotatedDataUrl: string,
  ) {
    setResult(r);
    setAnnotated(annotatedDataUrl);
    setDetected(appearance);
    setPhase('hair-profile');
  }

  function handleConfirmProfile(profile: HairProfile) {
    setHairProfile(profile);
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
    setDetected(null);
    setHairProfile(null);
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Hero / Top bar ────────────────────────────────── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 px-4 py-12 text-white sm:py-16">
        {/* decorative circles */}
        <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-white/5" />

        <div className="relative mx-auto max-w-4xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            <span className="text-brand-100">✂</span> Meu Corte Ideal
          </div>
          <h1 className="text-3xl font-extrabold leading-tight sm:text-5xl">
            Descubra o corte<br className="hidden sm:block" /> perfeito para o seu rosto
          </h1>
          <p className="mt-3 max-w-xl text-brand-100 text-base sm:text-lg">
            Envie uma selfie e nossa IA detecta o formato do seu rosto para recomendar cortes que realmente combinam com você.
          </p>
        </div>
      </header>

      {/* ── Main content ──────────────────────────────────── */}
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10">

        {/* Steps indicator (intro + analyzing) */}
        {(phase === 'intro' || phase === 'analyzing') && (
          <ol className="mb-8 flex items-center gap-0 text-xs font-medium fade-up">
            {['Enviar selfie', 'Analisar rosto', 'Ver cortes'].map((label, i) => {
              const stepDone   = phase === 'analyzing' && i === 0;
              const stepActive = (phase === 'intro' && i === 0) || (phase === 'analyzing' && i === 1);
              return (
                <li key={label} className="flex items-center">
                  <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 transition-all
                    ${stepActive ? 'bg-brand-600 text-white font-semibold' : stepDone ? 'text-green-700' : 'text-gray-400'}`}>
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold
                      ${stepActive ? 'bg-white text-brand-700' : stepDone ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                      {stepDone ? '✓' : i + 1}
                    </span>
                    {label}
                  </div>
                  {i < 2 && <div className="mx-1 h-px w-4 bg-gray-200" />}
                </li>
              );
            })}
          </ol>
        )}

        {/* ── INTRO ── */}
        {phase === 'intro' && (
          <div className="fade-up">
            <div className="grid gap-8 md:grid-cols-2 md:items-start">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="mb-1 text-lg font-bold text-gray-900">Envie sua selfie</h2>
                <p className="mb-5 text-sm text-gray-500">
                  A análise acontece direto no seu dispositivo — nenhuma foto é enviada ao servidor.
                </p>
                <SelfieCapture onCapture={handleCapture} />
              </div>

              <div className="flex flex-col gap-4">
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-500">Como funciona</h3>
                  <ol className="space-y-3">
                    {[
                      ['📸', 'Envie uma selfie de frente, bem iluminada'],
                      ['🔍', 'Nossa IA detecta os pontos do seu rosto e calcula o formato'],
                      ['✂️', 'Receba 3 sugestões de corte geradas por inteligência artificial'],
                    ].map(([icon, text]) => (
                      <li key={text} className="flex gap-3 text-sm text-gray-700">
                        <span className="text-lg leading-none">{icon}</span>
                        {text}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="rounded-2xl border border-brand-100 bg-brand-50 p-5">
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-brand-700">Dicas para melhor resultado</h3>
                  <ul className="space-y-1.5 text-sm text-brand-800">
                    {[
                      'Rosto de frente, olhando para a câmera',
                      'Boa iluminação, sem sombras fortes',
                      'Sem óculos escuros',
                      'Cabelo preso, se possível',
                    ].map((tip) => (
                      <li key={tip} className="flex gap-2">
                        <span className="text-brand-500">→</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── ANALYZING ── */}
        {phase === 'analyzing' && selfie && (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-6 text-center text-lg font-bold text-gray-900">Analisando seu rosto…</h2>
            <FaceAnalyzer
              imageDataUrl={selfie}
              onResult={handleResult}
              onError={handleError}
            />
          </div>
        )}

        {/* ── HAIR PROFILE CONFIRMATION ── */}
        {phase === 'hair-profile' && detected && result && (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 fade-up">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900">Confirme seu perfil de cabelo</h2>
              <p className="mt-1 text-sm text-gray-500">
                Para gerar imagens que combinam com você, precisamos saber como é o seu cabelo e tom de pele.
              </p>
            </div>
            <HairProfileForm
              initial={{
                type: 'liso',
                volume: 'normal',
                color: detected.hairColor,
                skinTone: detected.skinTone,
              }}
              onConfirm={handleConfirmProfile}
            />
          </div>
        )}

        {/* ── ERROR ── */}
        {phase === 'error' && (
          <div className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm sm:p-8 fade-up">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-2xl">
                ⚠️
              </div>
              <div>
                <h2 className="text-lg font-bold text-red-700">Não foi possível analisar a foto</h2>
                <p className="mt-1 text-gray-700">{error}</p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-4 rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 active:scale-95 transition-all"
                >
                  Tentar novamente
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── RESULT ── */}
        {phase === 'result' && result && annotated && hairProfile && (
          <div className="space-y-8 fade-up">
            {/* Face shape card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <FaceShapeResult result={result} annotatedImage={annotated} />
              <div className="mt-6 flex justify-end border-t border-gray-100 pt-4">
                <button
                  type="button"
                  onClick={reset}
                  className="flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:text-brand-800 transition-colors"
                >
                  ← Analisar outra foto
                </button>
              </div>
            </div>

            {/* Haircut recommendations */}
            <div>
              <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Cortes recomendados</h2>
                  <p className="text-sm text-gray-500">Imagens geradas por IA ao carregar cada card.</p>
                </div>
                <GenderToggle value={gender} onChange={setGender} />
              </div>
              <HaircutGrid shape={result.shape} gender={gender} hairProfile={hairProfile} />
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-gray-100 bg-white px-4 py-6" />
    </div>
  );
}
