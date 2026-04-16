'use client';

import clsx from 'clsx';
import type { Gender } from '@/lib/faceShapes';

interface Props {
  value: Gender;
  onChange: (value: Gender) => void;
}

export function GenderToggle({ value, onChange }: Props) {
  return (
    <div className="inline-flex rounded-full bg-gray-100 p-1 text-sm font-medium">
      {(['masculino', 'feminino'] as Gender[]).map((g) => (
        <button
          key={g}
          type="button"
          onClick={() => onChange(g)}
          className={clsx(
            'px-5 py-2 rounded-full capitalize transition',
            value === g
              ? 'bg-white shadow text-brand-700'
              : 'text-gray-500 hover:text-gray-800',
          )}
        >
          {g}
        </button>
      ))}
    </div>
  );
}
