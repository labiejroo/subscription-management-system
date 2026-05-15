import { IconSearch, IconRefresh } from '../../../ui/icons';
import { StatusFilter } from '../StatusFilter';
import type { TransactionStatus } from '../../../../lib/types';
import { copy, fmt } from '../../../../lib/eng';

type FilterValue = TransactionStatus | 'all';

interface ToolbarProps {
  query: string;
  setQuery: (q: string) => void;
  status: FilterValue;
  setStatus: (s: FilterValue) => void;
  selectedCount: number;
  onRetry: () => void;
}

export const Toolbar = ({
  query,
  setQuery,
  status,
  setStatus,
  selectedCount,
  onRetry,
}: ToolbarProps) => (
  <div className="flex flex-col gap-3 border-b border-ink-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2 sm:flex-1 sm:max-w-xl">
      <div className="relative flex-1">
        <IconSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={copy.searchPlaceholder}
          aria-label={copy.searchAriaLabel}
          className="w-full rounded-md border border-ink-200 bg-white py-2 pl-9 pr-3 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
        />
      </div>
      <StatusFilter value={status} onChange={setStatus} />
    </div>

    <div className="flex items-center gap-2">
      {selectedCount > 0 ? (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-md bg-rose-600 px-3 py-2 text-sm font-medium text-white hover:bg-rose-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2"
        >
          <IconRefresh size={14} stroke={2} />
          {fmt.retrySelected(selectedCount)}
        </button>
      ) : (
        <span className="hidden sm:inline-flex items-center text-xs text-ink-400">
          {copy.selectFailedHint}
        </span>
      )}
    </div>
  </div>
);

export default Toolbar;
