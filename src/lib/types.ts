export type TransactionStatus = 'completed' | 'failed' | 'pending' | 'retrying';

export type RetryStatus = 'idle' | 'loading' | 'success' | 'failed';

export type InvoiceStatus = 'idle' | 'generating' | 'done' | 'error';

export type InvoiceState = 'ready' | 'disabled' | 'generating';

export type PaymentMethodBrand = 'visa' | 'mastercard' | 'amex' | 'paypal' | 'apple_pay';

export interface PaymentMethod {
  brand: PaymentMethodBrand;
  last4?: string;
}

export interface Transaction {
  amount: number;
  currency: string;
  date: string;
  description: string;
  id: string;
  invoice: InvoiceState;
  paymentMethod: PaymentMethod;
  status: TransactionStatus;
}

export interface TransactionRow extends Transaction {
  _sel: boolean;
}
