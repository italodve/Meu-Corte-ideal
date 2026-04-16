export type FaceShape =
  | 'oval'
  | 'round'
  | 'square'
  | 'heart'
  | 'oblong'
  | 'diamond';

export type Gender = 'masculino' | 'feminino';

export const FACE_SHAPES: FaceShape[] = [
  'oval',
  'round',
  'square',
  'heart',
  'oblong',
  'diamond',
];

export const FACE_SHAPE_LABELS: Record<FaceShape, string> = {
  oval: 'Oval',
  round: 'Redondo',
  square: 'Quadrado',
  heart: 'Coração',
  oblong: 'Alongado',
  diamond: 'Diamante',
};

export const FACE_SHAPE_DESCRIPTIONS: Record<FaceShape, string> = {
  oval:
    'Testa, maçãs do rosto e mandíbula bem equilibradas, com o comprimento ligeiramente maior que a largura. É o formato mais versátil — quase tudo cai bem.',
  round:
    'Comprimento e largura similares, com maçãs do rosto em destaque e mandíbula suave. Cortes que criam altura e alongam o rosto funcionam melhor.',
  square:
    'Mandíbula angular e forte, com testa e maxilar de larguras parecidas. Texturas suaves e camadas ajudam a amenizar os traços.',
  heart:
    'Testa mais larga afinando em direção ao queixo pontudo. Volume na parte inferior e franjas ajudam a equilibrar as proporções.',
  oblong:
    'Rosto bem mais comprido do que largo, com testa, maçãs e mandíbula de larguras semelhantes. Franjas e volume nas laterais encurtam visualmente o rosto.',
  diamond:
    'Maçãs do rosto largas com testa e queixo mais estreitos. Franjas e cortes que dão volume na testa equilibram o formato.',
};
