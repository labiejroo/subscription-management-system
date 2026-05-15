export const copy = {
  // Page header
  pageTitle: 'Transaction history',
  pageDescription:
    'Every charge, refund, and retry across your subscription billing. Filter by status, search for a specific transaction, or download invoices for accounting.',
  liveStatus: 'Live · syncing',

  // Stat cards
  statTotalTransactions: 'Total transactions',
  statTotalTransactionsSub: 'Last 30 days',
  statTotalTransactionsDelta: '12.4%',
  statTotalPaid: 'Total paid',
  statTotalPaidSub: 'Net of refunds & failures',
  statTotalPaidDelta: '8.1%',
  statFailedPayments: 'Failed payments',
  statFailedPaymentsSub: 'Pending review or retry',
  statFailedPaymentsDelta: '2 vs. last week',
  statLastPayment: 'Last payment',
  statNoRecentPayments: 'No recent payments',

  // Table headers
  colTransaction: 'Transaction',
  colDateTime: 'Date & time',
  colDescription: 'Description',
  colAmount: 'Amount',
  colStatus: 'Status',
  colInvoice: 'Invoice',

  // Empty state / disclaimer
  emptyFilters: 'No transactions match the current filters.',
  amountsDisclaimer: 'All amounts in USD. Times shown in your local timezone (UTC−05:00).',

  // Toolbar
  searchPlaceholder: 'Search by transaction ID, plan, or method',
  searchAriaLabel: 'Search transactions',
  selectFailedHint: 'Select failed rows to retry',

  // Status filter options
  filterAll: 'All statuses',
  filterCompleted: 'Completed',
  filterFailed: 'Failed',
  filterPending: 'Pending',
  filterRetrying: 'Retrying',

  // Status badge labels
  statusCompleted: 'Completed',
  statusFailed: 'Failed',
  statusPending: 'Pending',
  statusRetrying: 'Retrying',
  statusRetryingEllipsis: '…',

  // Invoice button
  invoiceGenerating: 'Generating…',
  invoiceDisabled: 'Invoice',
  invoiceDownload: 'Download',

  // Row states
  retryingAriaLabel: 'Retrying',

  // Pagination
  rowsPerPage: 'Rows per page',
  prevAriaLabel: 'Previous page',
  prevLabel: 'Prev',
  nextAriaLabel: 'Next page',
  nextLabel: 'Next',

  // Toast (custom component)
  toastRetrySubtext: "We'll notify you when each completes.",
  toastDismiss: 'Dismiss',

  // react-toastify messages (useDownloadInvoice)
  toastInvoicePending: 'Generating invoice…',
  toastInvoiceSuccess: 'Invoice ready — downloading',
  toastInvoiceError: 'Failed to generate invoice',

  // TopNav
  brand: 'Streamline',
  brandSubtitle: 'Billing console',
  navOverview: 'Overview',
  navSubscribers: 'Subscribers',
  navTransactions: 'Transactions',
  navPayouts: 'Payouts',
  navSettings: 'Settings',
} as const;

export const fmt = {
  retrySelected: (count: number) => `Retry selected (${count})`,
  selectForRetry: (id: string) => `Select ${id} for retry`,
  retryingPayments: (count: number) => `Retrying ${count} payment${count > 1 ? 's' : ''}`,
};
