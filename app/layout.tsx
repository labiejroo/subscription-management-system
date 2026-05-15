import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

import { QueryProvider } from '../src/providers/QueryProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Streamline – Transactions',
  description: 'Billing console transaction history',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <QueryProvider>
          {children}
          <ToastContainer
            position="bottom-center"
            autoClose={4500}
            hideProgressBar
            closeOnClick
            pauseOnHover
            aria-live="polite"
          />
        </QueryProvider>
      </body>
    </html>
  );
}
