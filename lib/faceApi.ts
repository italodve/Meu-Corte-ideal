'use client';

import type * as FaceApi from 'face-api.js';

// Lazy-loaded singleton so we pay the cost of loading models once per session.
let faceApiPromise: Promise<typeof FaceApi> | null = null;

export async function loadFaceApi(): Promise<typeof FaceApi> {
  if (faceApiPromise) return faceApiPromise;

  faceApiPromise = (async () => {
    const faceapi = await import('face-api.js');
    const MODEL_URL = '/models';
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    ]);
    return faceapi;
  })();

  return faceApiPromise;
}
