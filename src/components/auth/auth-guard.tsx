'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { useSession } from '@/lib/auth-client';

type AuthGuardProps = {
  children: React.ReactNode;
  requireAuth?: boolean;
};

export function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session, isPending } = useSession();

  const isAuthenticated = Boolean(session?.user);

  useEffect(() => {
    if (isPending) return;

    if (requireAuth && !isAuthenticated) {
      const callbackUrl = encodeURIComponent(pathname);
      router.replace(`/sign-in?callbackUrl=${callbackUrl}`);
      return;
    }

    if (!requireAuth && isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, isPending, pathname, requireAuth, router]);

  if (isPending) {
    return (
      <main className='grid min-h-screen place-items-center bg-canvas px-4'>
        <div className='flex flex-col items-center gap-3'>
          <span className='size-8 animate-spin rounded-full border-2 border-primary/20 border-t-primary' />
          <p className='text-sm text-text-secondary'>
            Checking your session...
          </p>
        </div>
      </main>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return null;
  }

  if (!requireAuth && isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
