import { cva, type VariantProps } from 'class-variance-authority';

import { IconArrowUp, IconArrowDown } from '../../../ui/icons';

const deltaVariants = cva(
  'inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-2xs font-medium',
  {
    variants: {
      tone: {
        up: 'text-emerald-700 bg-emerald-50',
        down: 'text-rose-700 bg-rose-50',
        neutral: 'text-ink-600 bg-ink-100',
      },
    },
    defaultVariants: { tone: 'neutral' },
  }
);

type DeltaTone = NonNullable<VariantProps<typeof deltaVariants>['tone']>;

interface StatCardProps {
  label: string;
  value: string;
  sub: string;
  delta?: string;
  deltaTone?: DeltaTone;
  icon: React.ReactNode;
}

export const StatCard = ({
  label,
  value,
  sub,
  delta,
  deltaTone = 'neutral',
  icon,
}: StatCardProps) => {
  return (
    <div className="rounded-card border border-ink-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <span className="text-[13px] font-medium text-ink-500">{label}</span>
        <span className="grid h-7 w-7 place-items-center rounded-md bg-ink-50 text-ink-600">
          {icon}
        </span>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-[28px] font-semibold tracking-tight text-ink-900">{value}</span>
        {delta && (
          <span className={deltaVariants({ tone: deltaTone })}>
            {deltaTone === 'up' && <IconArrowUp size={11} stroke={2.5} />}
            {deltaTone === 'down' && <IconArrowDown size={11} stroke={2.5} />}
            {delta}
          </span>
        )}
      </div>

      <p className="mt-1 text-xs text-ink-500">{sub}</p>
    </div>
  );
};

export default StatCard;
