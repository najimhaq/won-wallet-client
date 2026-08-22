'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import {
  CalendarDays,
  ChevronDown,
  LogOut,
  Menu,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { signOut, useSession } from '@/lib/auth-client';

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

function getInitials(name?: string | null) {
  if (!name) return 'A';

  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

export function AdminHeader() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);

  const user = session?.user;
  const displayName = formatName(user?.name);
  const initials = getInitials(user?.name);

  useEffect(() => {
    if (!isMenuOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  async function handleSignOut() {
    setIsSigningOut(true);

    const { error } = await signOut();

    setIsSigningOut(false);

    if (error) {
      toast.error(error.message || 'Unable to sign out. Please try again.');
      return;
    }

    setIsMenuOpen(false);
    toast.success('Signed out successfully.');
    router.replace('/sign-in');
    router.refresh();
  }

  return (
    <header className='sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-surface/95 px-4 backdrop-blur sm:px-6 lg:px-8'>
      <div className='flex items-center gap-3'>
        <button
          type='button'
          className='grid size-10 place-items-center rounded-xl text-text-secondary hover:bg-surface-hover hover:text-text-primary lg:hidden'
          aria-label='Open navigation menu'
        >
          <Menu className='size-5' />
        </button>

        <div>
          <div className='flex items-center gap-2'>
            <p className='text-sm font-semibold text-text-primary'>
              Platform overview
            </p>

            <span className='hidden items-center gap-1 rounded-md bg-accent-soft px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent sm:inline-flex'>
              <ShieldCheck className='size-3' />
              Admin
            </span>
          </div>

          <p className='hidden text-xs text-text-muted sm:block'>
            Monitor platform activity and user growth.
          </p>
        </div>
      </div>

      <div className='flex items-center gap-2 sm:gap-3'>
        <button
          type='button'
          className='hidden items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-sm font-medium text-text-secondary transition hover:border-border-strong hover:bg-surface-hover md:inline-flex'
        >
          <CalendarDays className='size-4' />
          Last 30 days
          <ChevronDown className='size-4' />
        </button>

        <div ref={userMenuRef} className='relative'>
          <button
            type='button'
            onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
            className='grid size-10 overflow-hidden rounded-full bg-accent-soft text-sm font-bold text-accent ring-1 ring-transparent transition hover:ring-accent/20 focus:outline-none focus:ring-4 focus:ring-accent/15'
            aria-label='Open admin menu'
            aria-expanded={isMenuOpen}
            aria-haspopup='menu'
          >
            {user?.image ? (
              <Image
                src={user.image}
                alt={`${displayName}'s profile`}
                width={40}
                height={40}
                className='size-full object-cover'
              />
            ) : (
              initials
            )}
          </button>

          {isMenuOpen && (
            <div
              role='menu'
              className='absolute right-0 mt-2 w-64 overflow-hidden rounded-xl border border-border bg-surface p-1 shadow-lg'
            >
              <div className='border-b border-border px-3 py-2.5'>
                <div className='flex items-center gap-2'>
                  <p className='truncate text-sm font-semibold text-text-primary'>
                    {isPending ? 'Loading...' : displayName}
                  </p>

                  <ShieldCheck className='size-4 shrink-0 text-accent' />
                </div>

                <p className='truncate text-xs text-text-muted'>
                  {user?.email || 'Loading email...'}
                </p>
              </div>

              <button
                type='button'
                onClick={() => {
                  setIsMenuOpen(false);
                  router.push('/dashboard/admin/settings');
                }}
                className='flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                role='menuitem'
              >
                <UserRound className='size-4' />
                Admin settings
              </button>

              <button
                type='button'
                onClick={() => {
                  setIsMenuOpen(false);
                  router.push('/dashboard/user');
                }}
                className='flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                role='menuitem'
              >
                <ShieldCheck className='size-4' />
                Open my wallet
              </button>

              <button
                type='button'
                onClick={handleSignOut}
                disabled={isSigningOut}
                className='flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-expense hover:bg-expense-soft disabled:opacity-60'
                role='menuitem'
              >
                <LogOut className='size-4' />
                {isSigningOut ? 'Signing out...' : 'Sign out'}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
