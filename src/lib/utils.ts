import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { PaymentMethod, PaymentMethodBrand } from './types';

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

export const fmtUSD = (n: number): string =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

const BRAND_LABEL: Record<PaymentMethodBrand, string> = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  amex: 'Amex',
  paypal: 'PayPal',
  apple_pay: 'Apple Pay',
};

export const fmtPaymentMethod = (pm: PaymentMethod): string => {
  const label = BRAND_LABEL[pm.brand];
  return pm.last4 ? `${label} •• ${pm.last4}` : label;
};
