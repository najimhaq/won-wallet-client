'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { LogOut, Menu, Plus, UserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { signOut, useSession } from '@/lib/auth-client';

function capitalizeName(name?: string | null) {
  if (!name) return 'User';

  return name
    .trim()
    .split(/\s+/)
    .map((part) => {
      const firstLetter = part.charAt(0).toUpperCase();
      const remainingLetters = part.slice(1).toLowerCase();

      return `${firstLetter}${remainingLetters}`;
    })
    .join(' ');
}

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

export function DashboardHeader() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);

  const user = session?.user;
  const displayName = capitalizeName(user?.name);
  const firstName = displayName.split(' ')[0];
  const initials = getInitials(user?.name);

  useEffect(() => {
    if (!isMenuOpen) return;

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;

      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
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
          <p className='text-sm font-semibold text-text-primary'>
            {isPending ? 'Loading...' : `Good afternoon, ${firstName}`}
          </p>

          <p className='hidden text-xs text-text-muted sm:block'>
            Here&apos;s your financial overview.
          </p>
        </div>
      </div>

      <div className='flex items-center gap-2 sm:gap-3'>
        <button type='button' className='btn-primary hidden sm:inline-flex'>
          <Plus className='size-4' />
          Add transaction
        </button>

        <div ref={userMenuRef} className='relative'>
          <button
            type='button'
            onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
            className='grid size-10 place-items-center overflow-hidden rounded-full bg-primary-soft text-sm font-bold text-primary ring-1 ring-transparent transition hover:ring-primary/20 focus:outline-none focus:ring-4 focus:ring-primary/15'
            aria-label='Open user menu'
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
                <p className='truncate text-sm font-semibold text-text-primary'>
                  {displayName}
                </p>

                <p className='truncate text-xs text-text-muted'>
                  {user?.email || 'Loading email...'}
                </p>
              </div>

              <button
                type='button'
                onClick={() => {
                  setIsMenuOpen(false);
                  router.push('/dashboard/settings');
                }}
                className='flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                role='menuitem'
              >
                <UserRound className='size-4' />
                Account settings
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
