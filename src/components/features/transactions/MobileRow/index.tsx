'use client';

import { StatusBadge } from '../../../ui/StatusBadge';
import { Checkbox } from '../../../ui/Checkbox';
import { cn, fmtUSD, fmtPaymentMethod } from '../../../../lib/utils';
import { InvoiceButton } from '../InvoiceButton';
import type { TransactionRow } from '../../../../lib/types';
import { fmt } from '../../../../lib/eng';

export interface MobileRowProps {
  row: TransactionRow;
  selected: boolean;
  onToggle: (checked: boolean) => void;
  onDownload?: () => void;
}

export const MobileRowContent = ({ row, selected, onToggle, onDownload }: MobileRowProps) => {
  const isFailed = row.status === 'failed';
  const isRetrying = row.status === 'retrying';

  return (
    <div className={cn('border-b border-ink-200 p-4', selected && 'row-selected')}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {isFailed && (
              <Checkbox
                checked={selected}
                onChange={onToggle}
                ariaLabel={fmt.selectForRetry(row.id)}
              />
            )}
            {isRetrying && (
              <span className="grid h-4.5 w-4.5 place-items-center">
                <span className="h-3.5 w-3.5 rounded-full border-2 border-sky-200 border-t-sky-500 spin" />
              </span>
            )}
            <span className="mono text-[12px] text-ink-700 truncate">{row.id}</span>
          </div>

          <p className="mt-1 text-sm text-ink-900">{row.description}</p>
          <p className="text-xs text-ink-500">
            {row.date} · {fmtPaymentMethod(row.paymentMethod)}
          </p>
        </div>

        <div className="text-right">
          <div className="text-sm font-semibold text-ink-900">{fmtUSD(row.amount)}</div>
          <div className="mt-1">
            <StatusBadge status={row.status} />
          </div>
        </div>
      </div>

      <div className="mt-3 flex justify-end">
        <InvoiceButton state={row.invoice} onDownload={onDownload} />
      </div>
    </div>
  );
};

export const MobileRow = (props: MobileRowProps) => (
  <li>
    <MobileRowContent {...props} />
  </li>
);

export default MobileRow;
