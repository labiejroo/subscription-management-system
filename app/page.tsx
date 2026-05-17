'use client';

import { useEffect, useMemo, useState } from 'react';

import { fmtUSD, fmtPaymentMethod } from '../src/lib/utils';
import { useTransactions } from '../src/hooks/useTransactions';
import { useDownloadInvoice } from '../src/hooks/useDownloadInvoice';
import { copy } from '../src/lib/eng';
import type { InvoiceState } from '../src/lib/types';
import { TopNav } from '../src/components/layout/TopNav';
import { Pagination } from '../src/components/ui/Pagination';
import { Toast } from '../src/components/ui/Toast';
import { IconCardCoin, IconWallet, IconAlert, IconClock } from '../src/components/ui/icons';
import { StatCard } from '../src/components/features/transactions/StatCard';
import { Toolbar } from '../src/components/features/transactions/Toolbar';
import { DataRow } from '../src/components/features/transactions/DataRow';
import { MobileRow } from '../src/components/features/transactions/MobileRow';
import {
  DesktopRowSkeleton,
  MobileRowSkeleton,
} from '../src/components/features/transactions/TableSkeleton';
import type { TransactionRow, TransactionStatus } from '../src/lib/types';

type FilterValue = TransactionStatus | 'all';

export default function Page() {
  const { data, isLoading } = useTransactions();
  const [rows, setRows] = useState<TransactionRow[]>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<FilterValue>('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [toast, setToast] = useState<{ count: number } | null>(null);
  const { download, rowStatus: invoiceRowStatus } = useDownloadInvoice();

  useEffect(() => {
    if (data) setRows(data.map((r) => ({ ...r, _sel: false })));
  }, [data]);

  const invoiceState = (id: string, original: InvoiceState): InvoiceState =>
    invoiceRowStatus.get(id) === 'generating' ? 'generating' : original;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return rows.filter((r) => {
      if (status !== 'all' && r.status !== status) return false;
      if (!q) return true;

      return (
        r.id.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        fmtPaymentMethod(r.paymentMethod).toLowerCase().includes(q)
      );
    });
  }, [rows, query, status]);

  const pageRows = useMemo(() => {
    const start = (page - 1) * pageSize;

    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [query, status, pageSize]);

  const selectedIds = rows.filter((r) => r._sel && r.status === 'failed').map((r) => r.id);

  const toggleRow = (id: string) => (next: boolean) => {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, _sel: next } : r)));
  };

  const onRetry = () => {
    setRows((rs) =>
      rs.map((r) =>
        r._sel && r.status === 'failed' ? { ...r, status: 'retrying' as const, _sel: false } : r
      )
    );
    setToast({ count: selectedIds.length });
  };

  const stats = useMemo(() => {
    const total = rows.length;
    const paid = rows.filter((r) => r.status === 'completed').reduce((s, r) => s + r.amount, 0);
    const failed = rows.filter((r) => r.status === 'failed').length;
    const last = rows.find((r) => r.status === 'completed');

    return { total, paid, failed, last };
  }, [rows]);

  return (
    <div className="min-h-screen">
      <TopNav />

      <main className="mx-auto max-w-layout px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-ink-900 sm:text-[28px]">
              {copy.pageTitle}
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-ink-500 text-pretty">
              {copy.pageDescription}
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-ink-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {copy.liveStatus}
            </span>
          </div>
        </div>

        <section className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label={copy.statTotalTransactions}
            value={isLoading ? '—' : stats.total.toLocaleString()}
            sub={copy.statTotalTransactionsSub}
            delta={copy.statTotalTransactionsDelta}
            deltaTone="up"
            icon={<IconCardCoin size={14} />}
          />
          <StatCard
            label={copy.statTotalPaid}
            value={isLoading ? '—' : fmtUSD(stats.paid)}
            sub={copy.statTotalPaidSub}
            delta={copy.statTotalPaidDelta}
            deltaTone="up"
            icon={<IconWallet size={14} />}
          />
          <StatCard
            label={copy.statFailedPayments}
            value={isLoading ? '—' : stats.failed.toLocaleString()}
            sub={copy.statFailedPaymentsSub}
            delta={copy.statFailedPaymentsDelta}
            deltaTone="down"
            icon={<IconAlert size={14} />}
          />
          <StatCard
            label={copy.statLastPayment}
            value={isLoading ? '—' : stats.last ? fmtUSD(stats.last.amount) : '—'}
            sub={isLoading ? '—' : stats.last ? stats.last.date : copy.statNoRecentPayments}
            icon={<IconClock size={14} />}
          />
        </section>

        <section className="mt-6 overflow-hidden rounded-card border border-ink-200 bg-white">
          <Toolbar
            query={query}
            setQuery={setQuery}
            status={status}
            setStatus={setStatus}
            selectedCount={selectedIds.length}
            onRetry={onRetry}
          />

          <div className="hidden md:block">
            <div className="x-scroll overflow-x-auto">
              <table className="w-full min-w-table table-fixed">
                <colgroup>
                  <col style={{ width: '44px' }} />
                  <col style={{ width: '150px' }} />
                  <col style={{ width: '170px' }} />
                  <col />
                  <col style={{ width: '110px' }} />
                  <col style={{ width: '130px' }} />
                  <col style={{ width: '140px' }} />
                </colgroup>
                <thead>
                  <tr className="border-b border-ink-200 bg-ink-50/60 text-left text-[11px] font-medium uppercase tracking-wider text-ink-500">
                    <th className="px-4 py-2.5"></th>
                    <th className="px-4 py-2.5">{copy.colTransaction}</th>
                    <th className="px-4 py-2.5">{copy.colDateTime}</th>
                    <th className="px-4 py-2.5">{copy.colDescription}</th>
                    <th className="px-4 py-2.5 text-right">{copy.colAmount}</th>
                    <th className="px-4 py-2.5">{copy.colStatus}</th>
                    <th className="px-4 py-2.5 text-right">{copy.colInvoice}</th>
                  </tr>
                </thead>
                <tbody aria-busy={isLoading}>
                  {isLoading ? (
                    Array.from({ length: 8 }).map((_, i) => <DesktopRowSkeleton key={i} />)
                  ) : pageRows.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-16 text-center text-sm text-ink-500">
                        {copy.emptyFilters}
                      </td>
                    </tr>
                  ) : (
                    pageRows.map((r) => (
                      <DataRow
                        key={r.id}
                        row={{ ...r, invoice: invoiceState(r.id, r.invoice) }}
                        selected={r._sel}
                        onToggle={toggleRow(r.id)}
                        onDownload={() => download(r.id)}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <ul className="md:hidden">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => <MobileRowSkeleton key={i} />)
            ) : pageRows.length === 0 ? (
              <li className="px-4 py-16 text-center text-sm text-ink-500">{copy.emptyFilters}</li>
            ) : (
              pageRows.map((r) => (
                <MobileRow
                  key={r.id}
                  row={{ ...r, invoice: invoiceState(r.id, r.invoice) }}
                  selected={r._sel}
                  onToggle={toggleRow(r.id)}
                  onDownload={() => download(r.id)}
                />
              ))
            )}
          </ul>

          <Pagination
            page={page}
            pageSize={pageSize}
            total={filtered.length}
            onPage={setPage}
            onPageSize={setPageSize}
          />
        </section>

        <p className="mt-6 text-xs text-ink-400">{copy.amountsDisclaimer}</p>
      </main>

      {toast && <Toast count={toast.count} onDismiss={() => setToast(null)} />}
    </div>
  );
}
