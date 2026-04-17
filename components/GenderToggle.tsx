'use client';

import clsx from 'clsx';
import type { Gender } from '@/lib/faceShapes';

interface Props {
  value: Gender;
  onChange: (value: Gender) => void;
}

const OPTIONS: { value: Gender; label: string; icon: string }[] = [
  { value: 'masculino', label: 'Masculino', icon: '♂' },
  { value: 'feminino',  label: 'Feminino',  icon: '♀' },
];

export function GenderToggle({ value, onChange }: Props) {
  return (
    <div className="inline-flex rounded-full bg-gray-100 p-1 text-sm font-medium shadow-inner">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={clsx(
            'flex items-center gap-1.5 rounded-full px-5 py-2 transition-all',
            value === opt.value
              ? 'bg-white shadow text-brand-700 font-semibold'
              : 'text-gray-500 hover:text-gray-800',
          )}
        >
          <span className="text-base leading-none">{opt.icon}</span>
          {opt.label}
        </button>
      ))}
    </div>
  );
}
