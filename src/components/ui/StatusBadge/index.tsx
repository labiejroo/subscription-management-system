import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../../lib/utils';
import { copy } from '../../../lib/eng';

const badge = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset',
  {
    variants: {
      status: {
        completed: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
        failed: 'bg-rose-50 text-rose-800 ring-rose-200',
        pending: 'bg-amber-50 text-amber-900 ring-amber-200',
        retrying: 'bg-sky-50 text-sky-800 ring-sky-200',
      },
    },
    defaultVariants: { status: 'pending' },
  }
);

type BadgeStatus = NonNullable<VariantProps<typeof badge>['status']>;

const DOT_COLOR: Record<BadgeStatus, string> = {
  completed: 'bg-emerald-500',
  failed: 'bg-rose-500',
  pending: 'bg-amber-500',
  retrying: 'bg-sky-500',
};

const LABEL: Record<BadgeStatus, string> = {
  completed: copy.statusCompleted,
  failed: copy.statusFailed,
  pending: copy.statusPending,
  retrying: copy.statusRetrying,
};

interface StatusBadgeProps {
  status: BadgeStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const dot = DOT_COLOR[status] ?? DOT_COLOR.pending;

  return (
    <span className={badge({ status })}>
      <span className={cn('relative inline-flex h-1.5 w-1.5 rounded-full', dot)}>
        {status === 'retrying' && (
          <span
            className={cn('absolute inset-0 inline-flex rounded-full opacity-60 animate-ping', dot)}
          />
        )}
      </span>
      {LABEL[status]}
      {status === 'retrying' ? copy.statusRetryingEllipsis : ''}
    </span>
  );
};

export default StatusBadge;
