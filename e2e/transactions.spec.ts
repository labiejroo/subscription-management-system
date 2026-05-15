import { test, expect } from '@playwright/test';

test.describe('Transactions dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the table to populate (handles both local state and React Query fetch)
    await expect(page.locator('tbody tr').first()).toBeVisible({ timeout: 5_000 });
  });

  // ── 1. List loads ────────────────────────────────────────────────────────────

  test('loads and displays transaction rows', async ({ page }) => {
    await expect(page.getByText('Transaction history')).toBeVisible();

    const rows = page.locator('tbody tr');
    await expect(rows).toHaveCount(10); // default page size

    // Every row should contain a monospace transaction ID
    await expect(rows.first().locator('.mono')).toBeVisible();
  });

  // ── 2. Checkbox presence ─────────────────────────────────────────────────────

  test('failed rows have checkboxes, completed rows do not', async ({ page }) => {
    const failedRows = page.locator('tbody tr').filter({
      has: page.getByText('Failed', { exact: true }),
    });
    const completedRows = page.locator('tbody tr').filter({
      has: page.getByText('Completed', { exact: true }),
    });

    await expect(failedRows.first().locator('input[type="checkbox"]')).toBeVisible();
    await expect(completedRows.first().locator('input[type="checkbox"]')).not.toBeVisible();
  });

  // ── 3. Selection count in toolbar ────────────────────────────────────────────

  test('selecting failed rows shows Retry button with correct count', async ({ page }) => {
    await expect(page.getByRole('button', { name: /retry selected/i })).not.toBeVisible();

    const failedRows = page.locator('tbody tr').filter({
      has: page.getByText('Failed', { exact: true }),
    });

    await failedRows.nth(0).locator('input[type="checkbox"]').check();
    await expect(page.getByRole('button', { name: 'Retry selected (1)' })).toBeVisible();

    await failedRows.nth(1).locator('input[type="checkbox"]').check();
    await expect(page.getByRole('button', { name: 'Retry selected (2)' })).toBeVisible();

    // Unchecking decrements the count
    await failedRows.nth(0).locator('input[type="checkbox"]').uncheck();
    await expect(page.getByRole('button', { name: 'Retry selected (1)' })).toBeVisible();
  });

  // ── 4. Per-row retry loading state ───────────────────────────────────────────

  test('clicking retry shows per-row loading spinner', async ({ page }) => {
    // Intercept retry API — immediate response so we can observe the transition
    await page.route('**/api/transactions/*/retry', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ status: 'completed' }),
      })
    );

    const failedRows = page.locator('tbody tr').filter({
      has: page.getByText('Failed', { exact: true }),
    });

    // Capture the stable transaction ID before clicking — the filter re-evaluates
    // after status changes and would point to a different row otherwise
    const txnId = (await failedRows.first().locator('.mono').textContent())!.trim();

    await failedRows.first().locator('input[type="checkbox"]').check();
    await page.getByRole('button', { name: /retry selected/i }).click();

    // Find the row by its immutable ID
    const retryingRow = page.locator('tbody tr').filter({
      has: page.locator('.mono', { hasText: txnId }),
    });

    await expect(retryingRow.locator('[aria-label="Retrying"]')).toBeVisible();
    await expect(retryingRow.getByText('Retrying')).toBeVisible();
    await expect(retryingRow.locator('input[type="checkbox"]')).not.toBeVisible();
  });

  // ── 5. Invoice generating state ──────────────────────────────────────────────

  test('invoice download button shows Generating state during fetch', async ({ page }) => {
    // Hold the invoice response open long enough to assert the intermediate state
    let resolveInvoice: () => void;
    await page.route('**/api/transactions/*/invoice', async (route) => {
      await new Promise<void>((r) => {
        resolveInvoice = r;
      });
      await route.fulfill({
        status: 200,
        contentType: 'application/pdf',
        body: Buffer.from('%PDF-1.4\n%%EOF\n'),
        headers: { 'Content-Disposition': 'attachment; filename="invoice.pdf"' },
      });
    });

    const completedRow = page
      .locator('tbody tr')
      .filter({
        has: page.getByText('Completed', { exact: true }),
      })
      .first();

    // Click and wait until the network request is actually in-flight
    await Promise.all([
      page.waitForRequest('**/api/transactions/*/invoice'),
      completedRow.getByRole('button', { name: 'Download' }).click(),
    ]);

    // onMutate has fired — the button should show "Generating…"
    await expect(completedRow.locator('button').filter({ hasText: /generating/i })).toBeVisible();

    // Let the request complete
    resolveInvoice!();

    // After completion the button returns to "Download"
    await expect(completedRow.getByRole('button', { name: 'Download' })).toBeVisible();
  });
});
