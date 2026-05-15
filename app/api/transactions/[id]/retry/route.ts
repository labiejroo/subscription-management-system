import { NextResponse } from 'next/server';

const delay = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await delay(1000 + Math.random() * 3000);

  if (Math.random() < 0.2) {
    return NextResponse.json(
      { id, status: 'failed', error: 'Payment declined by issuer' },
      { status: 422 }
    );
  }

  return NextResponse.json({ id, status: 'completed' });
}
