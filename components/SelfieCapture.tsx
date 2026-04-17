'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface SelfieCaptureProps {
  onCapture: (dataUrl: string) => void;
  disabled?: boolean;
}

export function SelfieCapture({ onCapture, disabled }: SelfieCaptureProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const dragCounterRef = useRef(0);

  useEffect(() => () => stopStream(), []);

  function stopStream() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }

  const processFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith('image/')) {
        setError('Envie um arquivo de imagem válido (JPG, PNG, HEIC…).');
        return;
      }
      setError(null);
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') onCapture(reader.result);
      };
      reader.onerror = () => setError('Falha ao ler o arquivo.');
      reader.readAsDataURL(file);
    },
    [onCapture],
  );

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }

  function handleDragEnter(e: React.DragEvent) {
    e.preventDefault();
    dragCounterRef.current++;
    setIsDragging(true);
  }
  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    dragCounterRef.current--;
    if (dragCounterRef.current === 0) setIsDragging(false);
  }
  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }
  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    dragCounterRef.current = 0;
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
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
    } catch {
      setError('Não foi possível acessar a câmera. Verifique as permissões do navegador.');
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
    closeCamera();
    onCapture(canvas.toDataURL('image/jpeg', 0.92));
  }

  if (cameraOpen) {
    return (
      <div className="flex flex-col items-center gap-4 fade-up">
        <div className="relative w-full max-w-sm overflow-hidden rounded-2xl shadow-lg ring-2 ring-brand-400">
          <video
            ref={videoRef}
            className="w-full aspect-square object-cover bg-black"
            playsInline
            muted
          />
          <div className="absolute inset-0 pointer-events-none border-[3px] border-brand-400 rounded-2xl" />
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={takeSnapshot}
            className="flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-brand-700 active:scale-95 transition-all"
          >
            <CameraIcon />
            Tirar foto
          </button>
          <button
            type="button"
            onClick={closeCamera}
            className="rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 active:scale-95 transition-all"
          >
            Cancelar
          </button>
        </div>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 fade-up">
      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span className="mt-0.5 shrink-0">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Drag-and-drop zone */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => !disabled && fileInputRef.current?.click()}
        onKeyDown={(e) => e.key === 'Enter' && !disabled && fileInputRef.current?.click()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`
          relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed
          py-12 px-6 text-center cursor-pointer transition-all select-none
          ${isDragging
            ? 'border-brand-500 bg-brand-50 scale-[1.01]'
            : 'border-gray-300 bg-white hover:border-brand-400 hover:bg-brand-50/40'
          }
          ${disabled ? 'pointer-events-none opacity-50' : ''}
        `}
      >
        <div className={`rounded-full p-4 transition-colors ${isDragging ? 'bg-brand-100' : 'bg-gray-100'}`}>
          <UploadIcon className={isDragging ? 'text-brand-600' : 'text-gray-400'} />
        </div>
        <div>
          <p className="font-semibold text-gray-800">
            {isDragging ? 'Solte a foto aqui' : 'Arraste uma foto ou clique para enviar'}
          </p>
          <p className="mt-1 text-sm text-gray-500">JPG, PNG, HEIC — máx. 20 MB</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <div className="flex items-center gap-3 text-xs text-gray-400">
        <div className="h-px flex-1 bg-gray-200" />
        ou
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <button
        type="button"
        onClick={openCamera}
        disabled={disabled}
        className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white py-3 px-6 text-sm font-semibold text-gray-700 shadow-sm hover:border-brand-400 hover:text-brand-700 hover:bg-brand-50 active:scale-95 transition-all disabled:opacity-50"
      >
        <CameraIcon className="text-current" />
        Usar câmera
      </button>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}

function UploadIcon({ className = 'text-gray-400' }: { className?: string }) {
  return (
    <svg className={`h-8 w-8 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
  );
}

function CameraIcon({ className = 'text-white' }: { className?: string }) {
  return (
    <svg className={`h-4 w-4 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
  );
}
