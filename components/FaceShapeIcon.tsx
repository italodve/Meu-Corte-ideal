import type { FaceShape } from '@/lib/faceShapes';

interface Props {
  shape: FaceShape;
  size?: number;
  className?: string;
}

export function FaceShapeIcon({ shape, size = 64, className = '' }: Props) {
  const paths: Record<FaceShape, React.ReactNode> = {
    oval: (
      <ellipse cx="32" cy="36" rx="18" ry="26" />
    ),
    round: (
      <circle cx="32" cy="36" r="22" />
    ),
    square: (
      <rect x="10" y="14" width="44" height="44" rx="5" ry="5" />
    ),
    heart: (
      <path d="M32 62 C10 48, 4 32, 4 24 C4 14 12 10 20 12 C24 13 28 16 32 20 C36 16 40 13 44 12 C52 10 60 14 60 24 C60 32 54 48 32 62Z" />
    ),
    oblong: (
      <ellipse cx="32" cy="36" rx="14" ry="28" />
    ),
    diamond: (
      <polygon points="32,8 52,36 32,64 12,36" />
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 72"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {paths[shape]}
    </svg>
  );
}
