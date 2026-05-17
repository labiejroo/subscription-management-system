'use client';

import { StatusBadge } from '../../../ui/StatusBadge';
import { Checkbox } from '../../../ui/Checkbox';
import { cn, fmtUSD, fmtPaymentMethod } from '../../../../lib/utils';
import { InvoiceButton } from '../InvoiceButton';
import type { TransactionRow } from '../../../../lib/types';
import { copy, fmt } from '../../../../lib/eng';

interface DataRowProps {
  row: TransactionRow;
  selected: boolean;
  onToggle: (checked: boolean) => void;
  onDownload?: () => void;
}

export const DataRow = ({ row, selected, onToggle, onDownload }: DataRowProps) => {
  const isFailed = row.status === 'failed';
  const isRetrying = row.status === 'retrying';

  return (
    <tr
      className={cn(
        'border-b border-ink-200 last:border-0 transition-colors',
        selected ? 'row-selected' : 'hover:bg-ink-50/60'
      )}
    >
      <td className="w-10 px-4 py-3">
        {isFailed && (
          <Checkbox checked={selected} onChange={onToggle} ariaLabel={fmt.selectForRetry(row.id)} />
        )}
        {isRetrying && (
          <span className="grid h-4.5 w-4.5 place-items-center" aria-label={copy.retryingAriaLabel}>
            <span className="h-3.5 w-3.5 rounded-full border-2 border-sky-200 border-t-sky-500 spin" />
          </span>
        )}
      </td>

      <td className="px-4 py-3">
        <span className="mono text-[12.5px] text-ink-800">{row.id}</span>
      </td>

      <td className="px-4 py-3 whitespace-nowrap text-sm text-ink-700">{row.date}</td>

      <td className="px-4 py-3">
        <div className="text-sm text-ink-900">{row.description}</div>
        <div className="text-xs text-ink-500">{fmtPaymentMethod(row.paymentMethod)}</div>
      </td>

      <td className="px-4 py-3 text-right tabular-nums text-sm font-medium text-ink-900">
        {fmtUSD(row.amount)}
      </td>

      <td className="px-4 py-3">
        <StatusBadge status={row.status} />
      </td>

      <td className="px-4 py-3 text-right">
        <InvoiceButton state={row.invoice} onDownload={onDownload} />
      </td>
    </tr>
  );
};

export default DataRow;
