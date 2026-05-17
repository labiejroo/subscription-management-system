'use client';

import { useEffect, useRef, useState } from 'react';

import { IconChevronD, IconCheck, IconFilter } from '../../../ui/icons';
import { cn } from '../../../../lib/utils';
import type { TransactionStatus } from '../../../../lib/types';
import { copy } from '../../../../lib/eng';

type FilterValue = TransactionStatus | 'all';

interface FilterOption {
  v: FilterValue;
  label: string;
}

interface StatusFilterProps {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
}

const OPTS: FilterOption[] = [
  { v: 'all', label: copy.filterAll },
  { v: 'completed', label: copy.filterCompleted },
  { v: 'failed', label: copy.filterFailed },
  { v: 'pending', label: copy.filterPending },
  { v: 'retrying', label: copy.filterRetrying },
];

export const StatusFilter = ({ value, onChange }: StatusFilterProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener('mousedown', handler);

    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const cur = OPTS.find((o) => o.v === value)!;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-800 hover:bg-ink-50 transition-colors min-w-[148px] justify-between"
      >
        <span className="inline-flex items-center gap-2">
          <IconFilter size={14} className="text-ink-500" />
          {cur.label}
        </span>
        <IconChevronD size={14} className="text-ink-500" />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-20 mt-1 w-44 rounded-md border border-ink-200 bg-white p-1 ring-1 ring-black/[0.03]"
        >
          {OPTS.map((o) => (
            <li key={o.v} role="option" aria-selected={value === o.v}>
              <button
                onClick={() => {
                  onChange(o.v);
                  setOpen(false);
                }}
                className={cn(
                  'flex w-full items-center justify-between rounded px-2.5 py-1.5 text-sm hover:bg-ink-50',
                  value === o.v ? 'text-ink-900' : 'text-ink-700'
                )}
              >
                {o.label}
                {value === o.v && <IconCheck size={14} className="text-indigo-600" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StatusFilter;
