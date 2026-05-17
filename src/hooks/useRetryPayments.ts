import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { logger } from '@/lib/logger';
import type { Transaction, RetryStatus } from '@/lib/types';

interface RetryResult {
  error?: string;
  id: string;
  status: 'completed' | 'failed';
}

interface MutationContext {
  snapshot: Transaction[] | undefined;
}

const retryOne = async (id: string): Promise<RetryResult> => {
  const res = await fetch(`/api/transactions/${id}/retry`, { method: 'POST' });
  const body = (await res.json()) as RetryResult;
  if (!res.ok) throw new Error(body.error ?? 'Retry failed');

  return body;
};

export const useRetryPayments = () => {
  const queryClient = useQueryClient();
  const [rowStatus, setRowStatus] = useState<Map<string, RetryStatus>>(new Map());

  const mutation = useMutation<
    PromiseSettledResult<RetryResult>[],
    Error,
    string[],
    MutationContext
  >({
    mutationFn: (ids) => Promise.allSettled(ids.map(retryOne)),

    onMutate: async (ids) => {
      logger.info('retry_payment_clicked', { transactionIds: ids });

      await queryClient.cancelQueries({ queryKey: ['transactions'] });
      const snapshot = queryClient.getQueryData<Transaction[]>(['transactions']);

      queryClient.setQueryData<Transaction[]>(['transactions'], (prev) =>
        prev?.map((t) => (ids.includes(t.id) ? { ...t, status: 'retrying' } : t))
      );

      setRowStatus(new Map(ids.map((id) => [id, 'loading'])));
      return { snapshot };
    },

    onSuccess: (results, ids) => {
      const next = new Map<string, RetryStatus>();

      results.forEach((result, i) => {
        const id = ids[i];
        if (result.status === 'fulfilled') {
          next.set(id, 'success');

          logger.info('retry_payment_success', { transactionId: id });
        } else {
          next.set(id, 'failed');
          logger.error('retry_payment_failed', { transactionId: id, error: String(result.reason) });
        }
      });

      setRowStatus(next);

      queryClient.setQueryData<Transaction[]>(['transactions'], (prev) =>
        prev?.map((t) => {
          const idx = ids.indexOf(t.id);
          if (idx === -1) return t;
          return {
            ...t,
            status: results[idx].status === 'fulfilled' ? 'completed' : 'failed',
          };
        })
      );
    },

    onError: (_err, _ids, context) => {
      if (context?.snapshot) {
        queryClient.setQueryData(['transactions'], context.snapshot);
      }
      setRowStatus(new Map());
    },
  });

  return {
    rowStatus,
    retryAll: (ids: string[]) => mutation.mutate(ids),
    isPending: mutation.isPending,
  };
};
