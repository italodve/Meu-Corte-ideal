import type { FaceShape, Gender } from './faceShapes';

export interface Haircut {
  id: string;
  name: string;
  description: string;
  /** English prompt used server-side when calling GPT Image 1 Mini. */
  prompt: string;
}

const BASE_STYLE =
  'photorealistic studio portrait, neutral light grey background, soft lighting, head and shoulders framing, sharp focus, natural skin, realistic hair texture, no text, no watermark';

const MALE_SUBJECT = 'a young adult man with a friendly neutral expression';
const FEMALE_SUBJECT = 'a young adult woman with a friendly neutral expression';

function mkPrompt(subject: string, haircut: string): string {
  return `${BASE_STYLE}, ${subject}, hairstyle: ${haircut}`;
}

type Catalog = Record<FaceShape, Record<Gender, Haircut[]>>;

export const HAIRCUTS: Catalog = {
  oval: {
    masculino: [
      {
        id: 'side-part-classic',
        name: 'Risca lateral clássica',
        description:
          'Um corte atemporal que respeita as proporções equilibradas do rosto oval. Comprimento médio em cima, laterais limpas.',
        prompt: mkPrompt(
          MALE_SUBJECT,
          'classic side part haircut, medium length on top combed to one side, tapered sides, glossy finish',
        ),
      },
      {
        id: 'undercut-volume',
        name: 'Undercut com volume',
        description:
          'Laterais bem curtas e topo com bastante comprimento e volume. Valoriza o equilíbrio natural do rosto oval.',
        prompt: mkPrompt(
          MALE_SUBJECT,
          'modern undercut haircut, short shaved sides, long voluminous top styled upward and slightly back',
        ),
      },
      {
        id: 'crew-cut',
        name: 'Crew cut',
        description:
          'Corte curto, limpo e prático. Deixa os traços harmônicos do rosto oval em evidência.',
        prompt: mkPrompt(
          MALE_SUBJECT,
          'classic crew cut haircut, short tapered sides, slightly longer on top, neatly styled',
        ),
      },
    ],
    feminino: [
      {
        id: 'long-layers',
        name: 'Long layers',
        description:
          'Camadas longas que acompanham o movimento natural do cabelo. Aposta certeira para rostos ovais.',
        prompt: mkPrompt(
          FEMALE_SUBJECT,
          'long layered haircut, soft face-framing layers, natural wave, past-shoulder length, glossy brunette hair',
        ),
      },
      {
        id: 'curtain-bangs-bob',
        name: 'Long bob com franja cortina',
        description:
          'Bob abaixo dos ombros com franja cortina que valoriza os olhos e adiciona leveza ao look.',
        prompt: mkPrompt(
          FEMALE_SUBJECT,
          'shoulder-length long bob haircut with curtain bangs parted in the middle, soft waves',
        ),
      },
      {
        id: 'long-wavy',
        name: 'Longo ondulado',
        description:
          'Comprimento longo com ondas soltas. O rosto oval sustenta bem os fios compridos sem perder harmonia.',
        prompt: mkPrompt(
          FEMALE_SUBJECT,
          'long wavy hair past the chest, natural loose waves, middle part, healthy shiny hair',
        ),
      },
    ],
  },

  round: {
    masculino: [
      {
        id: 'pompadour',
        name: 'Pompadour',
        description:
          'Cria altura no topo e alonga visualmente o rosto redondo. Laterais curtas reforçam o contraste.',
        prompt: mkPrompt(
          MALE_SUBJECT,
          'classic pompadour haircut, high volume on top swept back, short tapered sides, glossy styled hair',
        ),
      },
      {
        id: 'quiff-textured',
        name: 'Quiff texturizado',
        description:
          'Topo com textura e altura puxada para cima, emagrecendo o formato redondo.',
        prompt: mkPrompt(
          MALE_SUBJECT,
          'textured quiff haircut, messy volume on top styled upward and forward, short faded sides',
        ),
      },
      {
        id: 'faux-hawk',
        name: 'Faux hawk',
        description:
          'Foco vertical no centro do topo ajuda a alongar o rosto. Versão menos agressiva do moicano tradicional.',
        prompt: mkPrompt(
          MALE_SUBJECT,
          'faux hawk haircut, tapered sides, center strip of hair styled upward creating vertical volume',
        ),
      },
    ],
    feminino: [
      {
        id: 'long-layers-deep-part',
        name: 'Long layers com risca lateral profunda',
        description:
          'Camadas longas com risca bem lateral criam volume assimétrico e afilam o rosto redondo.',
        prompt: mkPrompt(
          FEMALE_SUBJECT,
          'long layered haircut with deep side part, soft layers falling past shoulders, subtle volume on top',
        ),
      },
      {
        id: 'angled-lob',
        name: 'Lob angulado',
        description:
          'Long bob mais curto atrás e longo na frente. Cria linhas diagonais que alongam o rosto.',
        prompt: mkPrompt(
          FEMALE_SUBJECT,
          'angled long bob haircut, shorter in the back longer in the front, sleek straight styling',
        ),
      },
      {
        id: 'elongated-pixie',
        name: 'Pixie alongado',
        description:
          'Pixie com topo mais comprido e lateral assimétrica. Afasta o volume das bochechas.',
        prompt: mkPrompt(
          FEMALE_SUBJECT,
          'elongated pixie haircut, longer top swept to one side, short tapered sides and nape',
        ),
      },
    ],
  },

  square: {
    masculino: [
      {
        id: 'textured-crop',
        name: 'Textured crop',
        description:
          'Topo texturizado com franja curta suaviza a mandíbula marcante do rosto quadrado.',
        prompt: mkPrompt(
          MALE_SUBJECT,
          'textured crop haircut with short messy fringe, short tapered sides, matte finish',
        ),
      },
      {
        id: 'ivy-league',
        name: 'Ivy League',
        description:
          'Uma evolução do crew cut com mais comprimento em cima. Visual clássico e elegante.',
        prompt: mkPrompt(
          MALE_SUBJECT,
          'ivy league haircut, short on the sides, slightly longer on top combed to the side, polished look',
        ),
      },
      {
        id: 'buzz-with-beard',
        name: 'Buzz cut com barba aparada',
        description:
          'Cabelo bem curto com barba bem feita valoriza a força da mandíbula quadrada sem exageros.',
        prompt: mkPrompt(
          MALE_SUBJECT,
          'buzz cut haircut, very short uniform length, paired with a neat short trimmed beard',
        ),
      },
    ],
    feminino: [
      {
        id: 'soft-waves',
        name: 'Ondas soltas',
        description:
          'Ondas naturais suavizam a rigidez dos ângulos do rosto quadrado sem esconder os traços.',
        prompt: mkPrompt(
          FEMALE_SUBJECT,
          'long hair with soft loose waves, middle-length to long, natural brunette, middle part',
        ),
      },
      {
        id: 'side-swept-bangs',
        name: 'Franja lateral',
        description:
          'Franja lateral diagonal quebra a simetria do rosto quadrado e adiciona movimento.',
        prompt: mkPrompt(
          FEMALE_SUBJECT,
          'medium-length haircut with side-swept bangs sweeping across the forehead, layered ends',
        ),
      },
      {
        id: 'long-layers-soft',
        name: 'Long layers suaves',
        description:
          'Camadas longas que começam na linha da mandíbula tiram o foco dos ângulos inferiores.',
        prompt: mkPrompt(
          FEMALE_SUBJECT,
          'long layered haircut with face-framing layers starting at the jawline, soft movement, glossy hair',
        ),
      },
    ],
  },

  heart: {
    masculino: [
      {
        id: 'textured-fringe',
        name: 'Franja texturizada',
        description:
          'Franja texturizada por cima da testa diminui a amplitude do topo do rosto coração.',
        prompt: mkPrompt(
          MALE_SUBJECT,
          'textured fringe haircut, messy forward-styled bangs covering part of the forehead, short sides',
        ),
      },
      {
        id: 'messy-medium',
        name: 'Messy medium',
        description:
          'Comprimento médio despenteado dá volume lateral e equilibra o queixo fino.',
        prompt: mkPrompt(
          MALE_SUBJECT,
          'medium length messy haircut, tousled natural styling, hair covering ears slightly',
        ),
      },
      {
        id: 'side-part-soft',
        name: 'Side part suave',
        description:
          'Risca lateral com topo volumoso e laterais com bastante pelo ajuda a encorpar o queixo.',
        prompt: mkPrompt(
          MALE_SUBJECT,
          'soft side part haircut, medium volume on top, longer sides covering upper ears, natural finish',
        ),
      },
    ],
    feminino: [
      {
        id: 'chin-bob',
        name: 'Bob na altura do queixo',
        description:
          'Bob que termina exatamente no queixo dá volume onde o rosto coração precisa equilibrar.',
        prompt: mkPrompt(
          FEMALE_SUBJECT,
          'chin-length bob haircut, straight blunt ends at the chin, sleek glossy finish, middle part',
        ),
      },
      {
        id: 'curtain-bangs',
        name: 'Franja cortina',
        description:
          'Franja cortina aberta ao meio quebra a largura da testa e emoldura os olhos.',
        prompt: mkPrompt(
          FEMALE_SUBJECT,
          'medium-length haircut with curtain bangs parted in the middle framing the face',
        ),
      },
      {
        id: 'long-layers-waves',
        name: 'Ondas longas em camadas',
        description:
          'Comprimento longo com camadas e ondas adiciona volume na altura do queixo.',
        prompt: mkPrompt(
          FEMALE_SUBJECT,
          'long wavy layered haircut, volume concentrated below the chin, soft waves past shoulders',
        ),
      },
    ],
  },

  oblong: {
    masculino: [
      {
        id: 'fringe-full',
        name: 'Franja cheia com laterais volumosas',
        description:
          'Franja cheia encurta visualmente o comprimento do rosto e equilibra a face alongada.',
        prompt: mkPrompt(
          MALE_SUBJECT,
          'full straight fringe haircut covering the forehead, medium volume on sides, moderate length',
        ),
      },
      {
        id: 'french-crop',
        name: 'French crop',
        description:
          'Franja curta reta corta a altura do rosto alongado mantendo um visual moderno.',
        prompt: mkPrompt(
          MALE_SUBJECT,
          'french crop haircut, short straight fringe across the forehead, faded sides',
        ),
      },
      {
        id: 'wavy-medium',
        name: 'Ondulado médio',
        description:
          'Comprimento médio ondulado adiciona volume lateral, contrabalanceando a verticalidade.',
        prompt: mkPrompt(
          MALE_SUBJECT,
          'medium-length wavy haircut, natural wave pattern, volume on the sides, textured finish',
        ),
      },
    ],
    feminino: [
      {
        id: 'blunt-bangs',
        name: 'Franja reta shoulder-length',
        description:
          'Franja reta cheia + corte na altura dos ombros reduzem a sensação de rosto alongado.',
        prompt: mkPrompt(
          FEMALE_SUBJECT,
          'shoulder-length haircut with blunt straight bangs across the forehead, sleek glossy finish',
        ),
      },
      {
        id: 'wavy-bob',
        name: 'Bob ondulado',
        description:
          'Bob com ondas largas adiciona largura na altura das bochechas e mandíbula.',
        prompt: mkPrompt(
          FEMALE_SUBJECT,
          'wavy bob haircut, chin to jaw length, loose beach waves, natural texture',
        ),
      },
      {
        id: 'lob-with-fringe',
        name: 'Lob com franja',
        description:
          'Long bob com franja cortina encurta o rosto visualmente e dá estrutura horizontal.',
        prompt: mkPrompt(
          FEMALE_SUBJECT,
          'long bob haircut with soft curtain bangs, subtle waves, collarbone length',
        ),
      },
    ],
  },

  diamond: {
    masculino: [
      {
        id: 'textured-fringe-diamond',
        name: 'Franja texturizada',
        description:
          'Franja texturizada adiciona largura à testa, equilibrando as maçãs do rosto salientes.',
        prompt: mkPrompt(
          MALE_SUBJECT,
          'textured messy fringe haircut, forward-styled volume on the forehead, short faded sides',
        ),
      },
      {
        id: 'side-swept-crop',
        name: 'Side swept crop',
        description:
          'Topo penteado para o lado com laterais curtas disfarça o estreitamento da testa.',
        prompt: mkPrompt(
          MALE_SUBJECT,
          'side-swept crop haircut, medium top styled across the forehead to one side, short sides',
        ),
      },
      {
        id: 'messy-medium-diamond',
        name: 'Messy medium',
        description:
          'Comprimento médio despenteado cobre parte da testa e suaviza as maçãs marcantes.',
        prompt: mkPrompt(
          MALE_SUBJECT,
          'medium length messy haircut with slight fringe, tousled volume, natural matte finish',
        ),
      },
    ],
    feminino: [
      {
        id: 'below-chin-bob',
        name: 'Bob abaixo do queixo',
        description:
          'Bob que termina logo abaixo do queixo dá volume na mandíbula, equilibrando as maçãs.',
        prompt: mkPrompt(
          FEMALE_SUBJECT,
          'bob haircut just below the chin, soft internal layers, glossy straight styling',
        ),
      },
      {
        id: 'side-bangs-diamond',
        name: 'Franja lateral longa',
        description:
          'Franja lateral longa cobre parte da testa estreita e suaviza o topo do rosto.',
        prompt: mkPrompt(
          FEMALE_SUBJECT,
          'medium-length haircut with long side-swept bangs covering the forehead, natural layers',
        ),
      },
      {
        id: 'medium-layers',
        name: 'Camadas médias',
        description:
          'Camadas médias que começam acima da mandíbula ampliam as laterais inferiores do rosto.',
        prompt: mkPrompt(
          FEMALE_SUBJECT,
          'medium-length layered haircut, layers starting above the jawline, soft movement, middle part',
        ),
      },
    ],
  },
};

export function getHaircuts(shape: FaceShape, gender: Gender): Haircut[] {
  return HAIRCUTS[shape][gender];
}

export function findHaircut(
  shape: FaceShape,
  gender: Gender,
  id: string,
): Haircut | undefined {
  return HAIRCUTS[shape]?.[gender]?.find((h) => h.id === id);
}
