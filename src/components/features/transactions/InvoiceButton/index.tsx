import { cva, type VariantProps } from 'class-variance-authority';

import { IconDownload } from '../../../ui/icons';
import { copy } from '../../../../lib/eng';

const button = cva(
  'inline-flex items-center gap-1.5 rounded-md border border-ink-200 px-2.5 py-1.5 text-xs font-medium',
  {
    variants: {
      state: {
        ready: 'bg-white text-ink-800 hover:bg-ink-50 transition-colors',
        disabled: 'bg-ink-50 text-ink-400 cursor-not-allowed',
        generating: 'bg-white text-ink-500 cursor-default',
      },
    },
    defaultVariants: { state: 'ready' },
  }
);

type InvoiceState = NonNullable<VariantProps<typeof button>['state']>;

interface InvoiceButtonProps {
  state: InvoiceState;
  onDownload?: () => void;
}

export const InvoiceButton = ({ state, onDownload }: InvoiceButtonProps) => {
  if (state === 'generating') {
    return (
      <button disabled className={button({ state: 'generating' })}>
        <span className="h-3 w-3 rounded-full border-2 border-ink-300 border-t-ink-600 spin" />
        {copy.invoiceGenerating}
      </button>
    );
  }

  if (state === 'disabled') {
    return (
      <button disabled aria-disabled="true" className={button({ state: 'disabled' })}>
        <IconDownload size={13} />
        {copy.invoiceDisabled}
      </button>
    );
  }

  return (
    <button onClick={onDownload} className={button({ state: 'ready' })}>
      <IconDownload size={13} />
      {copy.invoiceDownload}
    </button>
  );
};

export default InvoiceButton;
