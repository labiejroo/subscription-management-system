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
  id: string;
  date: string;
  description: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  status: TransactionStatus;
  invoice: InvoiceState;
}

export interface TransactionRow extends Transaction {
  _sel: boolean;
}
