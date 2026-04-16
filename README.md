# Meu Corte Ideal

Site que analisa uma selfie, detecta o **formato do rosto** (oval, redondo,
quadrado, coração, alongado ou diamante) e recomenda **cortes de cabelo
ideais** para o visitante, com imagens de referência geradas por IA sob
demanda (GPT Image 1 Mini da OpenAI).

## Como funciona

1. O usuário envia uma selfie (upload ou captura pela webcam).
2. Os **modelos do face-api.js** rodam **no navegador** (tiny face detector +
   68 landmarks). A foto nunca é enviada para nenhum servidor.
3. `lib/faceShapeClassifier.ts` aplica regras geométricas sobre os landmarks
   (largura da testa, maçãs do rosto, mandíbula, comprimento) para classificar
   o formato do rosto.
4. O site mostra o formato detectado e três sugestões de corte (separadas por
   gênero masculino/feminino).
5. Cada card dispara, quando entra no viewport, um `POST /api/generate-image`
   no servidor; esse endpoint chama a API da OpenAI (`gpt-image-1-mini`) e
   devolve uma imagem PNG em base64. O resultado é cacheado em memória no
   servidor e no `localStorage` do cliente.

## Stack

- [Next.js 14](https://nextjs.org/) (App Router) + React 18 + TypeScript
- [face-api.js](https://github.com/justadudewhohacks/face-api.js) para
  detecção e landmarks
- [Tailwind CSS](https://tailwindcss.com/) para estilização
- [OpenAI SDK](https://github.com/openai/openai-node) para geração de imagens
  (modelo `gpt-image-1-mini`)

## Rodando localmente

```bash
# 1. instalar dependências
npm install

# 2. configurar a chave da OpenAI
cp .env.example .env.local
# edite .env.local e preencha OPENAI_API_KEY

# 3. rodar em desenvolvimento
npm run dev
# abra http://localhost:3000
```

Sem a variável `OPENAI_API_KEY` configurada o site continua funcionando:
a análise do rosto e as recomendações de texto aparecem normalmente, mas
cada card exibirá uma mensagem de erro no lugar da imagem.

## Scripts

- `npm run dev` — dev server
- `npm run build` — build de produção
- `npm run start` — sobe o build de produção (`next start -p ${PORT:-3000}`)
- `npm run lint` — roda o ESLint

## Estrutura

```
app/
  api/generate-image/route.ts  # endpoint server-side de geração de imagens
  page.tsx                     # fluxo principal (intro → análise → resultado)
components/                    # React components do fluxo
lib/
  faceApi.ts                   # carregamento lazy dos modelos face-api.js
  faceShapeClassifier.ts       # landmarks → formato de rosto
  haircuts.ts                  # catálogo formato × gênero × cortes
  openai.ts                    # wrapper do GPT Image 1 Mini
  imageCache.ts                # cache em memória no servidor
public/models/                 # pesos do face-api.js (bundlados)
```

## Deploy no Railway

1. Crie um projeto novo no [Railway](https://railway.app/) conectando este
   repositório.
2. Em **Variables**, adicione `OPENAI_API_KEY` com sua chave da OpenAI.
3. O `railway.json` já configura `npm ci && npm run build` e `npm start`.
   Railway injeta a variável `PORT` — o script `start` do `package.json` a
   respeita.
4. Após o deploy, acesse a URL pública gerada.

## Privacidade

- A selfie nunca sai do navegador. A detecção facial roda **100% no cliente**.
- A API do servidor recebe apenas `{ faceShape, gender, styleId }` (texto) —
  nenhuma foto é transmitida nem armazenada.
- O cache no `localStorage` fica apenas no dispositivo do usuário.

## Limitações conhecidas

- A classificação de formato de rosto usa heurísticas geométricas simples.
  Para uso profissional, um modelo especializado seria mais preciso.
- O catálogo atual tem 3 sugestões por formato × gênero (total: 36 cortes).
  Para adicionar mais, edite `lib/haircuts.ts`.
- O cache do servidor é em memória (perdido a cada reinício). Para algo mais
  persistente, plugue um Redis ou object storage.
