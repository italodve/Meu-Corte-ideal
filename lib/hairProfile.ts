export type HairType = 'liso' | 'ondulado' | 'cacheado' | 'crespo';
export type HairVolume = 'fino' | 'normal' | 'volumoso';

export const HAIR_COLORS = [
  'preto',
  'castanho escuro',
  'castanho',
  'castanho claro',
  'loiro',
  'ruivo',
  'grisalho',
] as const;

export type HairColor = (typeof HAIR_COLORS)[number];

export const SKIN_TONES = ['claro', 'medio', 'moreno', 'negro'] as const;
export type SkinTone = (typeof SKIN_TONES)[number];

export interface HairProfile {
  type: HairType;
  color: HairColor;
  volume: HairVolume;
  skinTone: SkinTone;
}

export const HAIR_TYPE_LABELS: Record<HairType, string> = {
  liso: 'Liso',
  ondulado: 'Ondulado',
  cacheado: 'Cacheado',
  crespo: 'Crespo',
};

export const HAIR_VOLUME_LABELS: Record<HairVolume, string> = {
  fino: 'Fino',
  normal: 'Normal',
  volumoso: 'Volumoso',
};

export const HAIR_COLOR_LABELS: Record<HairColor, string> = {
  preto: 'Preto',
  'castanho escuro': 'Castanho escuro',
  castanho: 'Castanho',
  'castanho claro': 'Castanho claro',
  loiro: 'Loiro',
  ruivo: 'Ruivo',
  grisalho: 'Grisalho',
};

export const HAIR_COLOR_HEX: Record<HairColor, string> = {
  preto: '#1a1a1a',
  'castanho escuro': '#3b2215',
  castanho: '#6b3a2a',
  'castanho claro': '#a06030',
  loiro: '#d4a940',
  ruivo: '#b5432a',
  grisalho: '#9e9e9e',
};

export const SKIN_TONE_LABELS: Record<SkinTone, string> = {
  claro: 'Claro',
  medio: 'Médio',
  moreno: 'Moreno',
  negro: 'Negro',
};

export const SKIN_TONE_HEX: Record<SkinTone, string> = {
  claro: '#f5d5b8',
  medio: '#d4a574',
  moreno: '#a67040',
  negro: '#6b4226',
};

// English equivalents for prompt construction.
export const HAIR_TYPE_EN: Record<HairType, string> = {
  liso: 'straight',
  ondulado: 'wavy',
  cacheado: 'curly',
  crespo: 'coily afro-textured',
};

export const HAIR_COLOR_EN: Record<HairColor, string> = {
  preto: 'jet black',
  'castanho escuro': 'dark brown',
  castanho: 'brown',
  'castanho claro': 'light brown',
  loiro: 'blonde',
  ruivo: 'auburn red',
  grisalho: 'gray silver',
};

export const HAIR_VOLUME_EN: Record<HairVolume, string> = {
  fino: 'fine thin',
  normal: 'medium-density',
  volumoso: 'thick voluminous',
};

export const SKIN_TONE_EN: Record<SkinTone, string> = {
  claro: 'fair light',
  medio: 'medium olive',
  moreno: 'tan brown',
  negro: 'dark deep',
};
