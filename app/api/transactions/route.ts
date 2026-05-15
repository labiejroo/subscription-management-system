import { NextResponse } from 'next/server';

import { mockTransactions } from '@/lib/mockData';

const delay = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

export async function GET() {
  await delay(300);
  return NextResponse.json(mockTransactions);
}
