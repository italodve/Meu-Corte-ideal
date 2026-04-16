'use client';

import { useEffect, useRef, useState } from 'react';

interface SelfieCaptureProps {
  onCapture: (dataUrl: string) => void;
  disabled?: boolean;
}

export function SelfieCapture({ onCapture, disabled }: SelfieCaptureProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      stopStream();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function stopStream() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }

  async function openCamera() {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 1024, height: 1024 },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraOpen(true);
    } catch (err) {
      console.error(err);
      setError(
        'Não foi possível acessar a câmera. Verifique as permissões do navegador.',
      );
    }
  }

  function closeCamera() {
    stopStream();
    setCameraOpen(false);
  }

  function takeSnapshot() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const size = Math.min(video.videoWidth, video.videoHeight) || 720;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const sx = (video.videoWidth - size) / 2;
    const sy = (video.videoHeight - size) / 2;
    ctx.drawImage(video, sx, sy, size, size, 0, 0, size, size);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    closeCamera();
    onCapture(dataUrl);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Envie um arquivo de imagem válido.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        onCapture(result);
      }
    };
    reader.onerror = () => {
      setError('Falha ao ler o arquivo.');
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      {!cameraOpen ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
            className="rounded-xl bg-brand-600 text-white font-semibold py-4 px-6 shadow-sm hover:bg-brand-700 transition disabled:opacity-50"
          >
            Enviar foto
          </button>
          <button
            type="button"
            onClick={openCamera}
            disabled={disabled}
            className="rounded-xl bg-white text-brand-700 font-semibold py-4 px-6 shadow-sm border border-brand-200 hover:bg-brand-50 transition disabled:opacity-50"
          >
            Usar câmera
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <video
            ref={videoRef}
            className="w-full max-w-md aspect-square object-cover rounded-xl bg-black"
            playsInline
            muted
          />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={takeSnapshot}
              className="rounded-lg bg-brand-600 text-white font-semibold py-2 px-5 hover:bg-brand-700"
            >
              Tirar foto
            </button>
            <button
              type="button"
              onClick={closeCamera}
              className="rounded-lg bg-white text-gray-700 font-semibold py-2 px-5 border border-gray-300 hover:bg-gray-50"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
