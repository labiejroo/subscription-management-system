import { cn } from '../../../lib/utils';
import { copy } from '../../../lib/eng';

interface NavLinkProps {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}

const NavLink = ({ href, active, children }: NavLinkProps) => (
  <a
    href={href}
    className={cn(
      'rounded-md px-3 py-1.5 text-sm transition-colors',
      active ? 'bg-ink-100 font-medium text-ink-900' : 'text-ink-500 hover:bg-ink-100'
    )}
  >
    {children}
  </a>
);

export const TopNav = () => (
  <header className="border-b border-ink-200 bg-white">
    <div className="mx-auto flex max-w-layout items-center justify-between px-4 py-3 sm:px-6">
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-md bg-ink-900 text-white">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 4v16l7-4 7 4V4z" />
          </svg>
        </span>
        <span className="text-sm font-semibold tracking-tight text-ink-900">{copy.brand}</span>
        <span className="ml-3 hidden sm:inline text-xs text-ink-400">{copy.brandSubtitle}</span>
      </div>

      <nav className="hidden md:flex items-center gap-1">
        <NavLink href="#">{copy.navOverview}</NavLink>
        <NavLink href="#">{copy.navSubscribers}</NavLink>
        <NavLink href="#" active>
          {copy.navTransactions}
        </NavLink>
        <NavLink href="#">{copy.navPayouts}</NavLink>
        <NavLink href="#">{copy.navSettings}</NavLink>
      </nav>

      <div className="flex items-center gap-2">
        <div
          className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-400 to-rose-400"
          aria-hidden="true"
        />
      </div>
    </div>
  </header>
);

export default TopNav;
