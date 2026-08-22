'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  ChartNoAxesCombined,
  ChevronRight,
  CircleHelp,
  LayoutDashboard,
  ReceiptText,
  Settings,
  WalletCards,
} from 'lucide-react';

import { useSession } from '@/lib/auth-client';
import { Logo } from '@/components/ui/logo';

const navigationItems = [
  {
    label: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Transactions',
    href: '/dashboard/transactions',
    icon: ReceiptText,
  },
  {
    label: 'Budgets',
    href: '/dashboard/budgets',
    icon: WalletCards,
  },
  {
    label: 'Analytics',
    href: '/dashboard/analytics',
    icon: ChartNoAxesCombined,
  },
] as const;

const secondaryItems = [
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
  {
    label: 'Help & support',
    href: '/dashboard/help',
    icon: CircleHelp,
  },
] as const;

function getInitials(name?: string | null) {
  if (!name) return 'U';

  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

function capitalizeName(name?: string | null) {
  if (!name) return 'User';

  return name
    .trim()
    .split(/\s+/)
    .map(
      (part) => `${part.charAt(0).toUpperCase()}${part.slice(1).toLowerCase()}`
    )
    .join(' ');
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const user = session?.user;
  const displayName = capitalizeName(user?.name);
  const initials = getInitials(user?.name);

  function isActiveLink(href: string) {
    if (href === '/dashboard') {
      return pathname === href;
    }

    return pathname.startsWith(href);
  }

  return (
    <aside className='fixed inset-y-0 left-0 z-30 hidden w-72 flex-col border-r border-border bg-surface lg:flex'>
      <div className='flex h-16 items-center border-b border-border px-6'>
        <Logo href='/dashboard' />
      </div>

      <div className='flex flex-1 flex-col overflow-y-auto px-4 py-5'>
        <nav aria-label='Main navigation' className='space-y-1'>
          <p className='mb-2 px-3 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted'>
            Workspace
          </p>

          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveLink(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
              >
                <Icon className='size-[18px]' />
                <span>{item.label}</span>

                {isActive && <ChevronRight className='ml-auto size-4' />}
              </Link>
            );
          })}
        </nav>

        <nav
          aria-label='Secondary navigation'
          className='mt-8 border-t border-border pt-5'
        >
          <p className='mb-2 px-3 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted'>
            Account
          </p>

          <div className='space-y-1'>
            {secondaryItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveLink(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
                >
                  <Icon className='size-[18px]' />
                  <span>{item.label}</span>

                  {isActive && <ChevronRight className='ml-auto size-4' />}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className='mt-auto pt-6'>
          <Link
            href='/dashboard/settings'
            className='flex items-center gap-3 rounded-xl border border-border bg-surface-muted p-3 transition hover:border-border-strong hover:bg-surface-hover'
          >
            <span className='grid size-9 shrink-0 place-items-center rounded-full bg-primary-soft text-xs font-bold text-primary'>
              {initials}
            </span>

            <span className='min-w-0 flex-1'>
              <span className='block truncate text-sm font-semibold text-text-primary'>
                {displayName}
              </span>

              <span className='block truncate text-xs text-text-muted'>
                {user?.email || 'Loading profile...'}
              </span>
            </span>

            <BarChart3 className='size-4 shrink-0 text-text-muted' />
          </Link>
        </div>
      </div>
    </aside>
  );
}
