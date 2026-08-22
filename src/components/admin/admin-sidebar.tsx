'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Activity,
  ChartNoAxesCombined,
  ChevronRight,
  LayoutDashboard,
  ReceiptText,
  Settings,
  ShieldCheck,
  UsersRound,
  WalletCards,
  UserPen,
} from 'lucide-react';

import { Logo } from '@/components/ui/logo';
import { useSession } from '@/lib/auth-client';

const adminNavigationItems = [
  {
    label: 'Overview',
    href: '/dashboard/admin',
    icon: LayoutDashboard,
  },
  {
    label: 'Users',
    href: '/dashboard/admin/users',
    icon: UsersRound,
  },
  {
    label: 'Transactions',
    href: '/dashboard/admin/transactions',
    icon: ReceiptText,
  },
  {
    label: 'Analytics',
    href: '/dashboard/admin/analytics',
    icon: ChartNoAxesCombined,
  },
  {
    label: 'Audit logs',
    href: '/dashboard/admin/audit-logs',
    icon: Activity,
  },
] as const;

const adminSecondaryItems = [
  {
    label: 'Profile',
    href: '/dashboard/admin/profile',
    icon: UserPen,
  },
  {
    label: 'Admin settings',
    href: '/dashboard/admin/settings',
    icon: Settings,
  },
  {
    label: 'My wallet',
    href: '/dashboard/user',
    icon: WalletCards,
  },
] as const;

function getInitials(name?: string | null) {
  if (!name) return 'A';

  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

function formatName(name?: string | null) {
  if (!name) return 'Administrator';

  return name
    .trim()
    .split(/\s+/)
    .map(
      (part) => `${part.charAt(0).toUpperCase()}${part.slice(1).toLowerCase()}`
    )
    .join(' ');
}

export function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const user = session?.user;

  function isActiveLink(href: string) {
    if (href === '/dashboard/admin') {
      return pathname === href;
    }

    return pathname.startsWith(href);
  }

  return (
    <aside className='fixed inset-y-0 left-0 z-30 hidden w-72 flex-col border-r border-border bg-surface lg:flex'>
      <div className='flex h-16 items-center justify-between border-b border-border px-6'>
        <Logo href='/dashboard/admin' />

        <span
          title='Administrator panel'
          className='grid size-8 place-items-center rounded-lg bg-accent-soft text-accent'
        >
          <ShieldCheck className='size-4' />
        </span>
      </div>

      <div className='flex flex-1 flex-col overflow-y-auto px-4 py-5'>
        <div className='mb-5 rounded-xl border border-accent/15 bg-accent-soft p-3'>
          <div className='flex items-center gap-2'>
            <ShieldCheck className='size-4 text-accent' />

            <p className='text-xs font-bold uppercase tracking-[0.12em] text-accent'>
              Admin workspace
            </p>
          </div>
        </div>

        <nav aria-label='Admin navigation' className='space-y-1'>
          <p className='mb-2 px-3 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted'>
            Platform
          </p>

          {adminNavigationItems.map((item) => {
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
          aria-label='Admin account navigation'
          className='mt-8 border-t border-border pt-5'
        >
          <p className='mb-2 px-3 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted'>
            Account
          </p>

          <div className='space-y-1'>
            {adminSecondaryItems.map((item) => {
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

        <Link
          href='/dashboard/admin/settings'
          className='mt-auto flex items-center gap-3 rounded-xl border border-border bg-surface-muted p-3 transition hover:border-border-strong hover:bg-surface-hover'
        >
          <span className='grid size-9 shrink-0 place-items-center rounded-full bg-accent-soft text-xs font-bold text-accent'>
            {getInitials(user?.name)}
          </span>

          <span className='min-w-0 flex-1'>
            <span className='block truncate text-sm font-semibold text-text-primary'>
              {formatName(user?.name)}
            </span>

            <span className='block truncate text-xs font-medium text-accent'>
              Administrator
            </span>
          </span>
        </Link>
      </div>
    </aside>
  );
}
