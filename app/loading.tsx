import { TopNav } from '../src/components/layout/TopNav';
import {
  DesktopRowSkeleton,
  MobileRowSkeleton,
} from '../src/components/features/transactions/TableSkeleton';

interface SkeletonProps {
  className: string;
}

const Skeleton = ({ className }: SkeletonProps) => (
  <div className={`animate-pulse rounded bg-ink-100 ${className}`} />
);

const StatCardSkeleton = () => (
  <div className="rounded-card border border-ink-200 bg-white p-5">
    <div className="flex items-start justify-between">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-7 w-7 rounded-md" />
    </div>
    <Skeleton className="mt-3 h-8 w-24" />
    <Skeleton className="mt-2 h-3 w-40" />
  </div>
);

export const Loading = () => (
  <div className="min-h-screen">
    <TopNav />

    <main className="mx-auto max-w-layout px-4 py-8 sm:px-6 sm:py-10">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="mt-1 h-4 w-96" />
      </div>

      <section className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </section>

      <section className="mt-6 overflow-hidden rounded-card border border-ink-200 bg-white">
        <div className="flex items-center gap-3 border-b border-ink-200 px-4 py-3">
          <Skeleton className="h-8 w-56 rounded-md" />
          <Skeleton className="h-8 w-28 rounded-md" />
        </div>

        <div className="hidden md:block">
          <table className="w-full min-w-table table-fixed">
            <colgroup>
              <col style={{ width: '44px' }} />
              <col style={{ width: '150px' }} />
              <col style={{ width: '170px' }} />
              <col />
              <col style={{ width: '110px' }} />
              <col style={{ width: '130px' }} />
              <col style={{ width: '140px' }} />
            </colgroup>
            <tbody>
              {Array.from({ length: 8 }).map((_, i) => (
                <DesktopRowSkeleton key={i} />
              ))}
            </tbody>
          </table>
        </div>

        <ul className="md:hidden divide-y divide-ink-100">
          {Array.from({ length: 5 }).map((_, i) => (
            <MobileRowSkeleton key={i} />
          ))}
        </ul>

        <div className="flex items-center justify-between border-t border-ink-200 px-4 py-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-48 rounded-md" />
        </div>
      </section>
    </main>
  </div>
);

export default Loading;
