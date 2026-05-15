import { useQuery } from '@tanstack/react-query';

import { logger } from '@/lib/logger';
import type { Transaction } from '@/lib/types';

const fetchTransactions = async (): Promise<Transaction[]> => {
  const res = await fetch('/api/transactions');
  if (!res.ok) throw new Error(`Failed to fetch transactions: ${res.status}`);
  const data = (await res.json()) as Transaction[];

  logger.info('transaction_list_loaded', { count: data.length });

  return data;
};

export const useTransactions = () =>
  useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
  });
