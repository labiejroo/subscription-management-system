const delay = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

const DUMMY_PDF = Buffer.from(
  '%PDF-1.4\n1 0 obj\n<</Type/Catalog/Pages 2 0 R>>\nendobj\n' +
    '2 0 obj\n<</Type/Pages/Kids[3 0 R]/Count 1>>\nendobj\n' +
    '3 0 obj\n<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R>>\nendobj\n' +
    'trailer\n<</Size 4/Root 1 0 R>>\n%%EOF\n'
);

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await delay(2000);

  return new Response(DUMMY_PDF, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="invoice-${id}.pdf"`,
      'Content-Length': String(DUMMY_PDF.byteLength),
    },
  });
}
