'use client';

import { useEffect, useRef } from 'react';

import { IconCheck } from '../icons';

interface CheckboxProps {
  ariaLabel?: string;
  checked: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Checkbox = ({
  checked,
  onChange,
  indeterminate = false,
  ariaLabel,
}: CheckboxProps) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label className="relative inline-flex items-center justify-center cursor-pointer">
      <input
        ref={ref}
        type="checkbox"
        checked={!!checked}
        onChange={(e) => onChange?.(e.target.checked)}
        aria-label={ariaLabel}
        className="cbx peer h-4.5 w-4.5 rounded-[5px] border border-ink-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 transition-colors"
      />
      <IconCheck
        size={12}
        stroke={3}
        className="absolute pointer-events-none text-white opacity-0 peer-checked:opacity-100"
      />
      {indeterminate && (
        <span className="absolute pointer-events-none h-0.5 w-2.5 bg-white rounded-sm" />
      )}
    </label>
  );
};

export default Checkbox;
