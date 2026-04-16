import OpenAI from 'openai';

let cachedClient: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  if (cachedClient) return cachedClient;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      'OPENAI_API_KEY is not configured. Set it in your environment variables.',
    );
  }
  cachedClient = new OpenAI({ apiKey });
  return cachedClient;
}

/**
 * Generate a haircut reference image using GPT Image 1 Mini.
 * Returns a base64-encoded PNG.
 */
export async function generateHaircutImage(prompt: string): Promise<string> {
  const client = getOpenAIClient();
  const response = await client.images.generate({
    model: 'gpt-image-1-mini',
    prompt,
    size: '1024x1024',
    n: 1,
  });

  const first = response.data?.[0];
  if (!first?.b64_json) {
    throw new Error('Image generation returned no data');
  }
  return first.b64_json;
}
