import { cva } from 'class-variance-authority';

import { copy } from '../../../lib/eng';

import { IconChevronL, IconChevronR } from '../icons';

const pageBtn = cva('h-7 min-w-7 rounded-md px-2 text-xs font-medium transition-colors', {
  variants: {
    active: {
      true: 'bg-ink-900 text-white',
      false: 'text-ink-700 hover:bg-ink-100',
    },
  },
  defaultVariants: { active: false },
});

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPage: (page: number) => void;
  onPageSize: (size: number) => void;
}

export const Pagination = ({ page, pageSize, total, onPage, onPageSize }: PaginationProps) => {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-col gap-3 border-t border-ink-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3 text-xs text-ink-500">
        <span>
          Showing{' '}
          <span className="font-medium text-ink-800">
            {from}–{to}
          </span>{' '}
          of <span className="font-medium text-ink-800">{total}</span>
        </span>
        <span className="hidden sm:inline text-ink-300">·</span>
        <label className="hidden sm:inline-flex items-center gap-2">
          {copy.rowsPerPage}
          <select
            value={pageSize}
            onChange={(e) => onPageSize(Number(e.target.value))}
            className="rounded border border-ink-200 bg-white py-1 pl-2 pr-6 text-xs text-ink-800 focus:outline-none focus:border-indigo-500"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </label>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPage(Math.max(1, page - 1))}
          disabled={page === 1}
          aria-label={copy.prevAriaLabel}
          className="inline-flex items-center gap-1 rounded-md border border-ink-200 bg-white px-2.5 py-1.5 text-xs font-medium text-ink-700 hover:bg-ink-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <IconChevronL size={13} /> {copy.prevLabel}
        </button>

        {Array.from({ length: pages }, (_, i) => i + 1)
          .slice(0, 5)
          .map((p) => (
            <button
              key={p}
              onClick={() => onPage(p)}
              aria-current={p === page ? 'page' : undefined}
              className={pageBtn({ active: p === page })}
            >
              {p}
            </button>
          ))}

        <button
          onClick={() => onPage(Math.min(pages, page + 1))}
          disabled={page === pages}
          aria-label={copy.nextAriaLabel}
          className="inline-flex items-center gap-1 rounded-md border border-ink-200 bg-white px-2.5 py-1.5 text-xs font-medium text-ink-700 hover:bg-ink-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {copy.nextLabel} <IconChevronR size={13} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
