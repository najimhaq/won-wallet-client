'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useSession } from '@/lib/auth-client';

export function RoleRedirect() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (isPending) return;

    if (session?.user.role === 'ADMIN') {
      router.replace('/dashboard/admin');
      return;
    }

    router.replace('/dashboard/user');
  }, [isPending, router, session?.user.role]);

  return (
    <div className='grid min-h-[50vh] place-items-center'>
      <p className='text-sm text-text-secondary'>Opening your dashboard...</p>
    </div>
  );
}
