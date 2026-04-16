/**
 * In-memory cache for generated haircut images on the server side.
 * Key format: `${shape}:${gender}:${styleId}` → base64 PNG string.
 *
 * NOTE: this is ephemeral (cleared on process restart) but fine for the
 * intended use case — repeated visits in a single deployment benefit from
 * skipping redundant OpenAI calls, and on cold start we regenerate.
 */
const cache = new Map<string, string>();

export function getCachedImage(key: string): string | undefined {
  return cache.get(key);
}

export function setCachedImage(key: string, base64: string): void {
  cache.set(key, base64);
}

export function buildCacheKey(
  shape: string,
  gender: string,
  styleId: string,
): string {
  return `${shape}:${gender}:${styleId}`;
}
