import { useEffect } from 'react';

import { IconRefresh, IconClose } from '../icons';
import { copy, fmt } from '../.././../lib/eng';

interface ToastProps {
  count: number;
  onDismiss: () => void;
}

export const Toast = ({ count, onDismiss }: ToastProps) => {
  useEffect(() => {
    const t = setTimeout(onDismiss, 4500);

    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div role="status" className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 transform">
      <div className="flex items-center gap-3 rounded-lg border border-ink-200 bg-white px-4 py-3 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-sky-50 text-sky-600">
          <IconRefresh size={14} />
        </span>

        <div className="text-sm">
          <div className="font-medium text-ink-900">{fmt.retryingPayments(count)}</div>
          <div className="text-xs text-ink-500">{copy.toastRetrySubtext}</div>
        </div>

        <button
          onClick={onDismiss}
          aria-label={copy.toastDismiss}
          className="ml-2 rounded p-1 text-ink-400 hover:bg-ink-100 hover:text-ink-700"
        >
          <IconClose size={14} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
