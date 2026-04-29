'use client';

import { useState } from 'react';
import type { Gender } from '@/lib/faceShapes';
import type { HairColor, HairProfile, HairType, HairVolume, SkinTone } from '@/lib/hairProfile';
import {
  HAIR_COLORS,
  HAIR_COLOR_HEX,
  HAIR_COLOR_LABELS,
  HAIR_TYPE_LABELS,
  HAIR_VOLUME_LABELS,
  SKIN_TONE_HEX,
  SKIN_TONE_LABELS,
  SKIN_TONES,
} from '@/lib/hairProfile';

interface Props {
  initial: HairProfile;
  initialGender: Gender;
  onConfirm: (profile: HairProfile, gender: Gender) => void;
}

const HAIR_TYPE_OPTIONS: { value: HairType; icon: string }[] = [
  { value: 'liso',      icon: '│' },
  { value: 'ondulado',  icon: '∿' },
  { value: 'cacheado',  icon: '𝒸' },
  { value: 'crespo',    icon: '𝕫' },
];

const HAIR_VOLUME_OPTIONS: HairVolume[] = ['fino', 'normal', 'volumoso'];

const GENDER_OPTIONS: { value: Gender; label: string; icon: string }[] = [
  { value: 'masculino', label: 'Masculino', icon: '♂' },
  { value: 'feminino',  label: 'Feminino',  icon: '♀' },
];

export function HairProfileForm({ initial, initialGender, onConfirm }: Props) {
  const [profile, setProfile] = useState<HairProfile>(initial);
  const [gender, setGender] = useState<Gender>(initialGender);

  function set<K extends keyof HairProfile>(key: K, val: HairProfile[K]) {
    setProfile((p) => ({ ...p, [key]: val }));
  }

  return (
    <div className="space-y-6 fade-up">
      <div>
        <p className="text-sm text-gray-500 mb-1">
          Detectamos automaticamente algumas características. Confirme ou ajuste antes de continuar.
        </p>
      </div>

      {/* Gender */}
      <fieldset>
        <legend className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">Gênero dos cortes</legend>
        <div className="flex gap-2">
          {GENDER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setGender(opt.value)}
              className={`flex items-center gap-2 rounded-full border-2 px-5 py-2 text-sm font-semibold transition-all
                ${gender === opt.value
                  ? 'border-brand-500 bg-brand-50 text-brand-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
            >
              <span className="text-base leading-none">{opt.icon}</span>
              {opt.label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Hair type */}
      <fieldset>
        <legend className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">Tipo de cabelo</legend>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {HAIR_TYPE_OPTIONS.map(({ value, icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => set('type', value)}
              className={`flex flex-col items-center gap-1.5 rounded-xl border-2 py-4 px-3 text-center transition-all
                ${profile.type === value
                  ? 'border-brand-500 bg-brand-50 text-brand-700 ring-2 ring-brand-200'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
            >
              <span className="text-2xl leading-none font-mono">{icon}</span>
              <span className="text-sm font-semibold">{HAIR_TYPE_LABELS[value]}</span>
            </button>
          ))}
        </div>
      </fieldset>

      {/* Hair color */}
      <fieldset>
        <legend className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">Cor do cabelo</legend>
        <div className="flex flex-wrap gap-2">
          {HAIR_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => set('color', color)}
              className={`flex items-center gap-2 rounded-full border-2 px-3 py-1.5 text-sm font-medium transition-all
                ${profile.color === color
                  ? 'border-brand-500 bg-brand-50 text-brand-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
            >
              <span
                className="h-4 w-4 rounded-full ring-1 ring-gray-300"
                style={{ backgroundColor: HAIR_COLOR_HEX[color] }}
              />
              {HAIR_COLOR_LABELS[color]}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Hair volume */}
      <fieldset>
        <legend className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">Volume</legend>
        <div className="flex gap-2">
          {HAIR_VOLUME_OPTIONS.map((vol) => (
            <button
              key={vol}
              type="button"
              onClick={() => set('volume', vol)}
              className={`rounded-full border-2 px-5 py-2 text-sm font-semibold transition-all
                ${profile.volume === vol
                  ? 'border-brand-500 bg-brand-50 text-brand-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
            >
              {HAIR_VOLUME_LABELS[vol]}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Skin tone */}
      <fieldset>
        <legend className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">Tom de pele</legend>
        <div className="flex gap-2">
          {SKIN_TONES.map((tone) => (
            <button
              key={tone}
              type="button"
              onClick={() => set('skinTone', tone)}
              className={`flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-medium transition-all
                ${profile.skinTone === tone
                  ? 'border-brand-500 bg-brand-50 text-brand-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
            >
              <span
                className="h-5 w-5 rounded-full ring-1 ring-gray-300"
                style={{ backgroundColor: SKIN_TONE_HEX[tone] }}
              />
              {SKIN_TONE_LABELS[tone]}
            </button>
          ))}
        </div>
      </fieldset>

      <button
        type="button"
        onClick={() => onConfirm(profile, gender)}
        className="w-full rounded-full bg-brand-600 py-3 text-center font-semibold text-white shadow-md hover:bg-brand-700 active:scale-[0.98] transition-all"
      >
        Confirmar e ver cortes recomendados
      </button>
    </div>
  );
}
