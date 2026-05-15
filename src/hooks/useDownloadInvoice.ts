import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { logger } from '@/lib/logger';
import { copy } from '@/lib/eng';
import type { InvoiceStatus } from '@/lib/types';

interface InvoiceResult {
  id: string;
  blob: Blob;
}

const fetchInvoice = async (id: string): Promise<InvoiceResult> => {
  const res = await fetch(`/api/transactions/${id}/invoice`);
  if (!res.ok) throw new Error(`Failed to generate invoice for ${id}`);

  return { id, blob: await res.blob() };
};

const triggerDownload = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const useDownloadInvoice = () => {
  const [rowStatus, setRowStatus] = useState<Map<string, InvoiceStatus>>(new Map());

  const mutation = useMutation<InvoiceResult, Error, string>({
    mutationFn: fetchInvoice,

    onMutate: (id) => {
      logger.info('invoice_download_clicked', { transactionId: id });

      setRowStatus((prev) => new Map(prev).set(id, 'generating'));
    },

    onSuccess: ({ id, blob }) => {
      triggerDownload(blob, `invoice-${id}.pdf`);
      setRowStatus((prev) => new Map(prev).set(id, 'done'));
      logger.info('invoice_download_success', { transactionId: id });
    },

    onError: (error, id) => {
      setRowStatus((prev) => new Map(prev).set(id, 'error'));
      logger.error('invoice_download_failed', { transactionId: id, error: error.message });
    },
  });

  const download = (id: string): void => {
    toast.promise(mutation.mutateAsync(id), {
      pending: copy.toastInvoicePending,
      success: copy.toastInvoiceSuccess,
      error: copy.toastInvoiceError,
    });
  };

  return {
    rowStatus,
    download,
    isPending: mutation.isPending,
  };
};
