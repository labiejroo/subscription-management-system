const Cell = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded bg-ink-100 ${className}`} />
);

export const DesktopRowSkeleton = () => (
  <tr className="border-b border-ink-100">
    <td className="px-4 py-3">
      <Cell className="h-4 w-4 rounded" />
    </td>
    <td className="px-4 py-3">
      <Cell className="h-4 w-24" />
    </td>
    <td className="px-4 py-3">
      <Cell className="h-4 w-28" />
    </td>
    <td className="px-4 py-3">
      <Cell className="h-4 w-40" />
    </td>
    <td className="px-4 py-3 text-right">
      <Cell className="ml-auto h-4 w-14" />
    </td>
    <td className="px-4 py-3">
      <Cell className="h-5 w-20 rounded-full" />
    </td>
    <td className="px-4 py-3 text-right">
      <Cell className="ml-auto h-7 w-24 rounded-md" />
    </td>
  </tr>
);

export const MobileRowSkeleton = () => (
  <li className="space-y-2 border-b border-ink-100 p-4">
    <Cell className="h-4 w-32" />
    <Cell className="h-3 w-48" />
    <Cell className="h-5 w-16 rounded-full" />
  </li>
);
