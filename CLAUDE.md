# Project context

## What we are building

Transactions Management Dashboard — a Next.js application for a streaming subscription service.
Allows subscribers to review transaction history, download invoices, and retry failed payments in bulk.

This is a recruitment task for a Senior Front-end Engineer position at some company — a SaaS platform for subscription management.

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + CVA + cn() |
| Data fetching | TanStack React Query v5 |
| Notifications | react-toastify (use `toast.promise()` where applicable) |
| List virtualization | react-virtuoso |
| Testing | Playwright (E2E) |
| Formatting | Prettier |
| Git hooks | Husky |
| Containerization | Docker (multi-stage, Node 20 alpine) |
| CI/CD | GitHub Actions |
| Deployment | Vercel |

---

## Folder structure

```
app/
  layout.tsx                        # root layout, Geist font
  page.tsx                          # main page ('use client')
  globals.css

src/
  components/
    ui/                             # primitives (no business logic)
      Checkbox/index.tsx
      icons/index.tsx
      Pagination/index.tsx
      StatusBadge/index.tsx
      Toast/index.tsx
    layout/
      TopNav/index.tsx
    features/
      transactions/
        DataRow/index.tsx
        InvoiceButton/index.tsx
        MobileRow/index.tsx
        StatCard/index.tsx
        StatusFilter/index.tsx
        Toolbar/index.tsx
  data/
    transactions.ts                 # seed data (mock)
  lib/
    types.ts                        # all shared types
    utils.ts                        # cn(), fmtUSD()
    logger.ts                       # observability abstraction
    eng.ts                          # all user-facing copy strings
  declarations.d.ts                 # module declarations (*.css)

hooks/
  useTransactions.ts
  useRetryPayments.ts
  useDownloadInvoice.ts
```

---

## Component conventions

### File structure
Every component lives in its own folder with an `index.tsx`:
```
ComponentName/
  index.tsx
```

### Export pattern
```tsx
export const ComponentName = () => { ... };

export default ComponentName;
```
Named export first, `export default` at the bottom. Blank lines between logical sections (imports / types / variants / component / export default).

### Variants with CVA
Use `cva()` for any component that has visual variants. Derive types from cva — never define them manually:
```tsx
const button = cva('base-classes', {
  variants: { state: { ready: '...', disabled: '...' } },
  defaultVariants: { state: 'ready' },
});

type ButtonState = NonNullable<VariantProps<typeof button>['state']>;
```

### Conditional classes
Always use `cn()` from `src/lib/utils.ts` — never string concatenation or template literals for class merging:
```tsx
className={cn('base', condition && 'conditional', selected ? 'a' : 'b')}
```

### Type location
- **Component-local props** (`DataRowProps`, `ToolbarProps` etc.) → define inline in the component file
- **Shared / domain types** (`TransactionStatus`, `TransactionRow`, `InvoiceState`) → `src/lib/types.ts`

---

## TypeScript types

Always use discriminated unions. Never use loose strings for status fields.

```ts
// src/lib/types.ts
export type TransactionStatus = 'completed' | 'failed' | 'pending' | 'retrying';
export type InvoiceState = 'ready' | 'disabled' | 'generating';

export interface Transaction {
  id: string;
  date: string;
  desc: string;
  amount: number;
  method: string;
  status: TransactionStatus;
  invoice: InvoiceState;
  selected?: boolean;
}

export interface TransactionRow extends Omit<Transaction, 'selected'> {
  _sel: boolean;
}
```

For hooks — additional status types:
```ts
type RetryStatus = 'idle' | 'loading' | 'success' | 'failed';
type InvoiceStatus = 'idle' | 'generating' | 'done' | 'error';
```

---

## Tailwind conventions

### Design tokens (tailwind.config.js)
Custom tokens — always use these, never hardcode raw values:

| Token | Value | Usage |
|---|---|---|
| `ink-50` … `ink-900` | neutral scale | all text, borders, backgrounds |
| `rounded-card` | `0.625rem` | card and table container corners |
| `max-w-layout` | `1200px` | page max-width (`max-w-layout`) |
| `min-w-table` | `860px` | table minimum width (`min-w-table`) |
| `text-2xs` | `11px / 1rem` | extra-small labels |
| `spacing[4.5]` | `1.125rem` | checkbox / spinner container size |
| `font-mono` | Geist Mono via CSS var | `mono` class for transaction IDs |

### Class ordering
Follow Tailwind's recommended order: layout → box model → typography → visual → interactive.

---

## API simulation rules

All API routes are mock — no real backend.

- `GET /api/transactions` — returns mock data with 300ms delay
- `POST /api/transactions/[id]/retry` — random delay 1000–4000ms, **20% failure rate**
- `GET /api/transactions/[id]/invoice` — 2000ms delay, returns dummy PDF blob

---

## React Query rules

- Use `useQuery` for fetching transactions
- Use `useMutation` for retry and invoice download
- For concurrent retries use `Promise.allSettled` — never `Promise.all` (allSettled handles each row independently even if some fail)
- Per-row retry state stored in `Map<string, RetryStatus>` inside the hook
- Optimistic updates where applicable with rollback on error (`onMutate` / `onError`)

---

## Key behaviors

### Retry flow
1. User checks checkboxes on Failed rows
2. "Retry selected (N)" button appears in toolbar
3. On click — all selected rows fire concurrent API calls via `Promise.allSettled`
4. Each row independently shows spinner + "Retrying..." badge
5. On resolve — row updates to Completed or back to Failed (20% failure rate)
6. Checkbox disappears on success, reappears on failure

### Invoice download flow
1. User clicks "Download" on a Completed row
2. Button switches to "Generating..." with spinner (2 second simulation)
3. `toast.promise()` shows pending → success notification
4. Browser download triggers automatically
5. Button returns to "Download" state

### Checkboxes
- Only Failed rows have checkboxes
- Completed, Pending, Retrying rows have no checkbox

---

## Mock data requirements

17 transactions total:
- At least 4 with `failed` status
- Mix of: Premium Annual, Standard Monthly, Family Plan, Basic Monthly, 4K Add-on
- Payment methods: Visa •• 4242, Mastercard •• 8810, Amex •• 1004, PayPal, Apple Pay
- Realistic dates (last 60 days)
- Amounts: $9.99, $15.99, $17.99, $22.99, $49.99, $119.88, $4.99

---

## UI reference

Design reference screenshot is in the project root: `design-reference.png`
Style: clean SaaS dashboard, similar to Stripe. Flat design, no gradients, generous whitespace.

---

## Performance requirements

Target Lighthouse score 90+ on all metrics:
- Use `next/image` for any images
- Use `react-virtuoso` for the transaction list
- Use `loading.tsx` and `Suspense` boundaries
- Use skeleton loaders (not spinners) for initial page load

---

## Accessibility

Target: **WCAG 2.2 AA** — the current W3C standard (October 2023), backwards-compatible with 2.1 AA. The EAA (effective June 2025) today mandates WCAG 2.1 via EN 301 549, but targeting 2.2 keeps the codebase ahead of the next revision of that standard. Streaming and digital subscription services are explicitly in scope.

- `aria-busy` on rows in loading state
- `aria-live="polite"` region for toast notifications
- Keyboard navigation on checkboxes
- Proper `aria-label` on icon-only buttons
- Sufficient colour contrast on all text (ink scale chosen with AA ratios in mind)
- Focus-visible styles on all interactive elements

---

## CI/CD pipeline

GitHub Actions on every push and pull request:
1. `npm ci`
2. `tsc --noEmit` (type check)
3. `npm run lint`
4. `npm run build`

---

## Observability

Create `lib/logger.ts` as a thin logging abstraction — production-ready to swap for Mixpanel, CloudWatch, or Datadog.

```ts
// src/lib/logger.ts
type LogLevel = 'info' | 'warn' | 'error';

interface LogEvent {
  event: string;
  level: LogLevel;
  timestamp: string;
  data?: Record<string, unknown>;
}

const log = (level: LogLevel, event: string, data?: Record<string, unknown>) => {
  const entry: LogEvent = { event, level, timestamp: new Date().toISOString(), data };
  if (level === 'error') console.error(entry);
  else console.info(entry);
  // swap for: mixpanel.track(event, data) or CloudWatch PutLogEvents
};

export const logger = {
  info: (event: string, data?: Record<string, unknown>) => log('info', event, data),
  warn: (event: string, data?: Record<string, unknown>) => log('warn', event, data),
  error: (event: string, data?: Record<string, unknown>) => log('error', event, data),
};
```

Track these events at minimum:
- `transaction_list_loaded` — on successful fetch, include count
- `retry_payment_clicked` — include transactionIds array
- `retry_payment_success` — include transactionId
- `retry_payment_failed` — include transactionId and error
- `invoice_download_clicked` — include transactionId
- `invoice_download_success` — include transactionId
- `invoice_download_failed` — include transactionId and error

Always call logger from hooks, never from components.

---

## Code quality rules

- No `any` types — ever
- No inline API calls in components — always go through hooks
- No business logic in components — hooks only
- Named exports everywhere except `app/page.tsx` and `app/layout.tsx`
- Every component in its own folder (`ComponentName/index.tsx`)
- Keep components under 150 lines — extract if longer
- No comments unless the WHY is non-obvious

---

## Copy strings

All user-facing text lives in `src/lib/eng.ts` — never hardcode strings in components or hooks.

```ts
import { copy, fmt } from '@/lib/eng';

// static string
<h1>{copy.pageTitle}</h1>

// dynamic string (with interpolation)
ariaLabel={fmt.selectForRetry(row.id)}
```

Two exports:
- `copy` — `as const` object of static strings, keyed by semantic name
- `fmt` — object of functions for strings that require runtime values

When adding new UI text: add the key to `eng.ts` first, then use it in the component.

---

## Formatting

Prettier is configured in `.prettierrc`. Config:

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "always"
}
```

VS Code format-on-save is enabled via `.vscode/settings.json`. Requires the **Prettier - Code formatter** extension (`esbenp.prettier-vscode`).

---

## Git commit convention

Enforced by Husky (`commit-msg` hook). Every commit message must follow:

```
<type>: <Message starting with capital letter, ending with period.>
```

Allowed types: `feature` | `bug` | `docs` | `style` | `refactor` | `test` | `chore` | `perf` | `ci` | `revert`

```
feature: Add invoice download button.       ✅
bug: Fix retry count not decrementing.      ✅
refactor: Extract copy strings to eng.ts.   ✅
add something                               ❌  (no type)
feature: lowercase message.                 ❌  (capital letter required)
feature: No period at end                   ❌  (period required)
```
