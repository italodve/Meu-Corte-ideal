import type { FaceShape, Gender } from './faceShapes';
import type { HairType } from './hairProfile';

export interface Haircut {
  id: string;
  name: string;
  description: string;
  styleDescription: string;
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
        styleDescription: 'classic side part haircut, medium length on top combed to one side, tapered sides, glossy finish',
      },
      {
        id: 'undercut-volume',
        name: 'Undercut com volume',
        description:
          'Laterais bem curtas e topo com bastante comprimento e volume. Valoriza o equilíbrio natural do rosto oval.',
        styleDescription: 'modern undercut haircut, short shaved sides, long voluminous top styled upward and slightly back',
      },
      {
        id: 'crew-cut',
        name: 'Crew cut',
        description:
          'Corte curto, limpo e prático. Deixa os traços harmônicos do rosto oval em evidência.',
        styleDescription: 'classic crew cut haircut, short tapered sides, slightly longer on top, neatly styled',
      },
    ],
    feminino: [
      {
        id: 'long-layers',
        name: 'Long layers',
        description:
          'Camadas longas que acompanham o movimento natural do cabelo. Aposta certeira para rostos ovais.',
        styleDescription: 'long layered haircut, soft face-framing layers, natural wave, past-shoulder length',
      },
      {
        id: 'curtain-bangs-bob',
        name: 'Long bob com franja cortina',
        description:
          'Bob abaixo dos ombros com franja cortina que valoriza os olhos e adiciona leveza ao look.',
        styleDescription: 'shoulder-length long bob haircut with curtain bangs parted in the middle, soft waves',
      },
      {
        id: 'long-wavy',
        name: 'Longo ondulado',
        description:
          'Comprimento longo com ondas soltas. O rosto oval sustenta bem os fios compridos sem perder harmonia.',
        styleDescription: 'long wavy hair past the chest, natural loose waves, middle part, healthy shiny hair',
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
        styleDescription: 'classic pompadour haircut, high volume on top swept back, short tapered sides, glossy styled hair',
      },
      {
        id: 'quiff-textured',
        name: 'Quiff texturizado',
        description:
          'Topo com textura e altura puxada para cima, emagrecendo o formato redondo.',
        styleDescription: 'textured quiff haircut, messy volume on top styled upward and forward, short faded sides',
      },
      {
        id: 'faux-hawk',
        name: 'Faux hawk',
        description:
          'Foco vertical no centro do topo ajuda a alongar o rosto. Versão menos agressiva do moicano tradicional.',
        styleDescription: 'faux hawk haircut, tapered sides, center strip of hair styled upward creating vertical volume',
      },
    ],
    feminino: [
      {
        id: 'long-layers-deep-part',
        name: 'Long layers com risca lateral profunda',
        description:
          'Camadas longas com risca bem lateral criam volume assimétrico e afilam o rosto redondo.',
        styleDescription: 'long layered haircut with deep side part, soft layers falling past shoulders, subtle volume on top',
      },
      {
        id: 'angled-lob',
        name: 'Lob angulado',
        description:
          'Long bob mais curto atrás e longo na frente. Cria linhas diagonais que alongam o rosto.',
        styleDescription: 'angled long bob haircut, shorter in the back longer in the front, sleek straight styling',
      },
      {
        id: 'elongated-pixie',
        name: 'Pixie alongado',
        description:
          'Pixie com topo mais comprido e lateral assimétrica. Afasta o volume das bochechas.',
        styleDescription: 'elongated pixie haircut, longer top swept to one side, short tapered sides and nape',
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
        styleDescription: 'textured crop haircut with short messy fringe, short tapered sides, matte finish',
      },
      {
        id: 'ivy-league',
        name: 'Ivy League',
        description:
          'Uma evolução do crew cut com mais comprimento em cima. Visual clássico e elegante.',
        styleDescription: 'ivy league haircut, short on the sides, slightly longer on top combed to the side, polished look',
      },
      {
        id: 'buzz-with-beard',
        name: 'Buzz cut com barba aparada',
        description:
          'Cabelo bem curto com barba bem feita valoriza a força da mandíbula quadrada sem exageros.',
        styleDescription: 'buzz cut haircut, very short uniform length, paired with a neat short trimmed beard',
      },
    ],
    feminino: [
      {
        id: 'soft-waves',
        name: 'Ondas soltas',
        description:
          'Ondas naturais suavizam a rigidez dos ângulos do rosto quadrado sem esconder os traços.',
        styleDescription: 'long hair with soft loose waves, middle-length to long, middle part',
      },
      {
        id: 'side-swept-bangs',
        name: 'Franja lateral',
        description:
          'Franja lateral diagonal quebra a simetria do rosto quadrado e adiciona movimento.',
        styleDescription: 'medium-length haircut with side-swept bangs sweeping across the forehead, layered ends',
      },
      {
        id: 'long-layers-soft',
        name: 'Long layers suaves',
        description:
          'Camadas longas que começam na linha da mandíbula tiram o foco dos ângulos inferiores.',
        styleDescription: 'long layered haircut with face-framing layers starting at the jawline, soft movement',
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
        styleDescription: 'textured fringe haircut, messy forward-styled bangs covering part of the forehead, short sides',
      },
      {
        id: 'messy-medium',
        name: 'Messy medium',
        description:
          'Comprimento médio despenteado dá volume lateral e equilibra o queixo fino.',
        styleDescription: 'medium length messy haircut, tousled natural styling, hair covering ears slightly',
      },
      {
        id: 'side-part-soft',
        name: 'Side part suave',
        description:
          'Risca lateral com topo volumoso e laterais com bastante pelo ajuda a encorpar o queixo.',
        styleDescription: 'soft side part haircut, medium volume on top, longer sides covering upper ears, natural finish',
      },
    ],
    feminino: [
      {
        id: 'chin-bob',
        name: 'Bob na altura do queixo',
        description:
          'Bob que termina exatamente no queixo dá volume onde o rosto coração precisa equilibrar.',
        styleDescription: 'chin-length bob haircut, straight blunt ends at the chin, sleek glossy finish, middle part',
      },
      {
        id: 'curtain-bangs',
        name: 'Franja cortina',
        description:
          'Franja cortina aberta ao meio quebra a largura da testa e emoldura os olhos.',
        styleDescription: 'medium-length haircut with curtain bangs parted in the middle framing the face',
      },
      {
        id: 'long-layers-waves',
        name: 'Ondas longas em camadas',
        description:
          'Comprimento longo com camadas e ondas adiciona volume na altura do queixo.',
        styleDescription: 'long wavy layered haircut, volume concentrated below the chin, soft waves past shoulders',
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
        styleDescription: 'full straight fringe haircut covering the forehead, medium volume on sides, moderate length',
      },
      {
        id: 'french-crop',
        name: 'French crop',
        description:
          'Franja curta reta corta a altura do rosto alongado mantendo um visual moderno.',
        styleDescription: 'french crop haircut, short straight fringe across the forehead, faded sides',
      },
      {
        id: 'wavy-medium',
        name: 'Ondulado médio',
        description:
          'Comprimento médio ondulado adiciona volume lateral, contrabalanceando a verticalidade.',
        styleDescription: 'medium-length wavy haircut, natural wave pattern, volume on the sides, textured finish',
      },
    ],
    feminino: [
      {
        id: 'blunt-bangs',
        name: 'Franja reta shoulder-length',
        description:
          'Franja reta cheia + corte na altura dos ombros reduzem a sensação de rosto alongado.',
        styleDescription: 'shoulder-length haircut with blunt straight bangs across the forehead, sleek glossy finish',
      },
      {
        id: 'wavy-bob',
        name: 'Bob ondulado',
        description:
          'Bob com ondas largas adiciona largura na altura das bochechas e mandíbula.',
        styleDescription: 'wavy bob haircut, chin to jaw length, loose beach waves, natural texture',
      },
      {
        id: 'lob-with-fringe',
        name: 'Lob com franja',
        description:
          'Long bob com franja cortina encurta o rosto visualmente e dá estrutura horizontal.',
        styleDescription: 'long bob haircut with soft curtain bangs, subtle waves, collarbone length',
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
        styleDescription: 'textured messy fringe haircut, forward-styled volume on the forehead, short faded sides',
      },
      {
        id: 'side-swept-crop',
        name: 'Side swept crop',
        description:
          'Topo penteado para o lado com laterais curtas disfarça o estreitamento da testa.',
        styleDescription: 'side-swept crop haircut, medium top styled across the forehead to one side, short sides',
      },
      {
        id: 'messy-medium-diamond',
        name: 'Messy medium',
        description:
          'Comprimento médio despenteado cobre parte da testa e suaviza as maçãs marcantes.',
        styleDescription: 'medium length messy haircut with slight fringe, tousled volume, natural matte finish',
      },
    ],
    feminino: [
      {
        id: 'below-chin-bob',
        name: 'Bob abaixo do queixo',
        description:
          'Bob que termina logo abaixo do queixo dá volume na mandíbula, equilibrando as maçãs.',
        styleDescription: 'bob haircut just below the chin, soft internal layers, glossy straight styling',
      },
      {
        id: 'side-bangs-diamond',
        name: 'Franja lateral longa',
        description:
          'Franja lateral longa cobre parte da testa estreita e suaviza o topo do rosto.',
        styleDescription: 'medium-length haircut with long side-swept bangs covering the forehead, natural layers',
      },
      {
        id: 'medium-layers',
        name: 'Camadas médias',
        description:
          'Camadas médias que começam acima da mandíbula ampliam as laterais inferiores do rosto.',
        styleDescription: 'medium-length layered haircut, layers starting above the jawline, soft movement, middle part',
      },
    ],
  },
};

const CRESPO_HAIRCUTS: Catalog = {
  oval: {
    masculino: [
      {
        id: 'nudred-oval',
        name: 'Nudred (esponja)',
        description:
          'A textura uniforme do nudred combina perfeitamente com as proporções equilibradas do rosto oval.',
        styleDescription: 'nudred sponge curl haircut, short defined coily curls created with hair sponge, tapered sides, natural texture',
      },
      {
        id: 'taper-fade-cachos',
        name: 'Taper fade com cachos',
        description:
          'Laterais em degradê com cachos naturais definidos no topo. Visual limpo e versátil.',
        styleDescription: 'taper fade haircut with natural defined coils on top, skin fade on sides, medium length coily hair on top',
      },
      {
        id: 'afro-curto-oval',
        name: 'Afro curtinho',
        description:
          'Afro curto e bem modelado que valoriza o formato harmônico do rosto oval.',
        styleDescription: 'short afro haircut, even length all around, natural coily texture, well-shaped rounded silhouette',
      },
    ],
    feminino: [
      {
        id: 'twa-oval',
        name: 'Big chop (TWA)',
        description:
          'O rosto oval sustenta perfeitamente o cabelo bem curtinho, destacando os traços faciais.',
        styleDescription: 'teeny weeny afro TWA haircut, very short natural coily hair, defined curls, tapered shape',
      },
      {
        id: 'afro-medio-camadas',
        name: 'Afro médio com camadas',
        description:
          'Camadas no crespo médio criam movimento e realçam o equilíbrio natural do rosto.',
        styleDescription: 'medium-length afro haircut with layers, defined coily curls, face-framing shape, natural volume',
      },
      {
        id: 'crespo-longo-definido',
        name: 'Crespo longo definido',
        description:
          'Cachos longos e definidos emolduram o rosto oval com volume e personalidade.',
        styleDescription: 'long defined coily hair, natural coils past shoulders, voluminous and well-defined, center part',
      },
    ],
  },

  round: {
    masculino: [
      {
        id: 'high-top-fade',
        name: 'High top fade',
        description:
          'Cria altura no topo que alonga o rosto redondo. Um clássico absoluto para cabelo crespo.',
        styleDescription: 'high top fade haircut, tall natural coily hair on top styled upward, skin fade on sides, flat top shape',
      },
      {
        id: 'frohawk',
        name: 'Frohawk',
        description:
          'Volume concentrado no centro do topo alonga visualmente o rosto redondo.',
        styleDescription: 'frohawk haircut, natural coily hair styled into a mohawk shape, short tapered sides, elongated volume on top',
      },
      {
        id: 'nudred-high-taper',
        name: 'Nudred com taper alto',
        description:
          'O degradê alto e a textura nudred somam verticalidade ao visual, afinando o rosto.',
        styleDescription: 'high taper fade with nudred sponge curls on top, defined coily texture, skin fade on sides and back',
      },
    ],
    feminino: [
      {
        id: 'afro-volume-topo',
        name: 'Afro com volume no topo',
        description:
          'Volume concentrado no topo do afro alonga o rosto redondo naturalmente.',
        styleDescription: 'afro hairstyle with volume concentrated on top, natural coily texture, sides slightly tapered, elongated shape',
      },
      {
        id: 'tapered-assimetrico',
        name: 'Tapered cut assimétrico',
        description:
          'Corte assimétrico com laterais mais curtas cria diagonais que afinam o rosto redondo.',
        styleDescription: 'asymmetric tapered natural haircut, coily hair longer on one side, short tapered opposite side',
      },
      {
        id: 'crespo-risca-lateral',
        name: 'Crespo médio com risca lateral',
        description:
          'O comprimento médio com risca lateral profunda desvia da simetria do rosto redondo.',
        styleDescription: 'medium-length coily hair with deep side part, natural defined curls, volume swept to one side',
      },
    ],
  },

  square: {
    masculino: [
      {
        id: 'nudred-arredondado',
        name: 'Nudred arredondado',
        description:
          'A textura suave do nudred arredondado suaviza os ângulos marcantes da mandíbula quadrada.',
        styleDescription: 'short rounded nudred sponge curl haircut, soft coily texture, rounded silhouette, even length',
      },
      {
        id: 'low-fade-cachos',
        name: 'Low fade com cachos',
        description:
          'O degradê baixo com cachos soltos no topo equilibra a mandíbula forte do rosto quadrado.',
        styleDescription: 'low fade haircut with loose natural coils on top, medium length, soft texture, gradual fade',
      },
      {
        id: 'crespo-medio-texturizado',
        name: 'Crespo médio texturizado',
        description:
          'Comprimento médio com bastante textura suaviza as linhas retas do rosto quadrado.',
        styleDescription: 'medium-length textured coily hair, natural loose coils, soft messy styling, covering ears slightly',
      },
    ],
    feminino: [
      {
        id: 'crespo-franja-sq',
        name: 'Crespo médio com franja',
        description:
          'A franja crespa suaviza a linha reta da testa e da mandíbula do rosto quadrado.',
        styleDescription: 'medium-length coily hair with coily bangs, natural curls framing the face, soft volume',
      },
      {
        id: 'afro-camadas-suaves',
        name: 'Afro com camadas suaves',
        description:
          'Camadas no afro criam curvas que contrastam com os ângulos do rosto quadrado.',
        styleDescription: 'medium afro with soft layers, rounded shape, natural coily texture, face-framing volume',
      },
      {
        id: 'crespo-longo-camadas-sq',
        name: 'Crespo longo em camadas',
        description:
          'O comprimento longo com camadas tira o foco da mandíbula quadrada.',
        styleDescription: 'long layered coily hair, layers starting at jawline, natural defined curls, voluminous',
      },
    ],
  },

  heart: {
    masculino: [
      {
        id: 'afro-medio-lateral',
        name: 'Afro médio com volume lateral',
        description:
          'O volume nas laterais equilibra a testa mais larga e o queixo mais fino do rosto coração.',
        styleDescription: 'medium afro haircut with volume on the sides, natural coily texture, rounded shape, ear-length',
      },
      {
        id: 'nudred-longo-topo',
        name: 'Nudred com topo mais longo',
        description:
          'Nudred com gradação, mais longo no topo para cobrir parte da testa ampla.',
        styleDescription: 'nudred sponge curl haircut, longer on top shorter on sides, forward-styled coily texture',
      },
      {
        id: 'taper-twist',
        name: 'Taper fade com twist',
        description:
          'Twists curtos com degradê criam textura cheia que emoldura o rosto coração.',
        styleDescription: 'taper fade with short twist out on top, defined coily twists, gradual fade on sides',
      },
    ],
    feminino: [
      {
        id: 'crespo-queixo',
        name: 'Crespo na altura do queixo',
        description:
          'Crespo com comprimento no queixo adiciona volume onde o rosto coração precisa de equilíbrio.',
        styleDescription: 'chin-length coily bob haircut, natural curls with volume at chin level, rounded shape',
      },
      {
        id: 'afro-definido-volumoso',
        name: 'Afro volumoso definido',
        description:
          'Afro volumoso adiciona corpo lateral, equilibrando a testa mais ampla.',
        styleDescription: 'voluminous defined afro, natural coily hair with even volume all around, medium length',
      },
      {
        id: 'twist-out-medio',
        name: 'Twist out médio',
        description:
          'Twist out com comprimento médio cria textura e largura na metade inferior do rosto.',
        styleDescription: 'medium-length twist out hairstyle, defined elongated coils, volume below cheekbones',
      },
    ],
  },

  oblong: {
    masculino: [
      {
        id: 'afro-arredondado',
        name: 'Afro arredondado',
        description:
          'O afro arredondado adiciona largura que compensa o rosto alongado.',
        styleDescription: 'rounded afro haircut, natural coily hair shaped into a wide round silhouette, medium height, emphasis on side volume',
      },
      {
        id: 'nudred-lateral-volumoso',
        name: 'Nudred com laterais volumosas',
        description:
          'Nudred com bastante volume lateral reduz a sensação de rosto comprido.',
        styleDescription: 'nudred sponge curl haircut with full volume on sides, even length, wide rounded shape',
      },
      {
        id: 'low-fade-definido',
        name: 'Low fade com cachos definidos',
        description:
          'Degradê baixo mantém volume nos lados, encurtando a proporção vertical do rosto.',
        styleDescription: 'low fade with defined coils on top and sides, maintaining width, medium length coily hair',
      },
    ],
    feminino: [
      {
        id: 'afro-largo',
        name: 'Afro volumoso nas laterais',
        description:
          'Volume lateral generoso contrabalanceia a verticalidade do rosto alongado.',
        styleDescription: 'wide voluminous afro, emphasis on horizontal volume, natural coily texture, round shape',
      },
      {
        id: 'crespo-franja-cheia',
        name: 'Crespo com franja cheia',
        description:
          'A franja crespa encurta visualmente o rosto alongado, criando proporção horizontal.',
        styleDescription: 'medium-length coily hair with full coily bangs across forehead, natural texture, shoulder length',
      },
      {
        id: 'bob-crespo',
        name: 'Bob crespo',
        description:
          'Bob crespo na altura do queixo amplia a silhueta e encurta visualmente o rosto.',
        styleDescription: 'coily bob haircut at chin length, natural voluminous curls, wide rounded shape',
      },
    ],
  },

  diamond: {
    masculino: [
      {
        id: 'nudred-texturizado-dm',
        name: 'Nudred texturizado',
        description:
          'A textura no topo amplia a testa, equilibrando as maçãs salientes do rosto diamante.',
        styleDescription: 'nudred sponge curl haircut with textured top, slightly longer on top covering forehead, tapered sides',
      },
      {
        id: 'afro-curto-uniforme',
        name: 'Afro curtinho uniforme',
        description:
          'Afro curto uniforme suaviza os ângulos do rosto diamante com uma silhueta arredondada.',
        styleDescription: 'short uniform afro, even natural coily texture all around, soft rounded silhouette',
      },
      {
        id: 'taper-twist-dm',
        name: 'Taper fade com twist',
        description:
          'Twists curtos com degradê disfarçam o estreitamento da testa do rosto diamante.',
        styleDescription: 'taper fade with short twists on top, coily texture styled forward, gradual fade on sides',
      },
    ],
    feminino: [
      {
        id: 'crespo-abaixo-queixo',
        name: 'Crespo abaixo do queixo',
        description:
          'O volume abaixo do queixo alarga a mandíbula, equilibrando as maçãs proeminentes.',
        styleDescription: 'coily hair just below chin length, natural curls with volume at jaw level, defined texture',
      },
      {
        id: 'crespo-franja-lateral-dm',
        name: 'Crespo com franja lateral',
        description:
          'Franja lateral crespa cobre a testa estreita e suaviza o topo do rosto diamante.',
        styleDescription: 'medium-length coily hair with side-swept coily bangs, natural texture, face-framing curls',
      },
      {
        id: 'afro-medio-camadas-dm',
        name: 'Afro médio com camadas',
        description:
          'Camadas no afro médio criam volume onde o rosto diamante precisa de equilíbrio.',
        styleDescription: 'medium layered afro, natural coily hair with layers starting above jawline, rounded volume',
      },
    ],
  },
};

function getCatalog(hairType?: HairType): Catalog {
  return hairType === 'crespo' ? CRESPO_HAIRCUTS : HAIRCUTS;
}

export function getHaircuts(shape: FaceShape, gender: Gender, hairType?: HairType): Haircut[] {
  return getCatalog(hairType)[shape][gender];
}

export function findHaircut(
  shape: FaceShape,
  gender: Gender,
  id: string,
  hairType?: HairType,
): Haircut | undefined {
  return getCatalog(hairType)[shape]?.[gender]?.find((h) => h.id === id)
    ?? HAIRCUTS[shape]?.[gender]?.find((h) => h.id === id);
}
