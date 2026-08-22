'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useSession } from '@/lib/auth-client';

type RoleGuardProps = {
  allowedRole: 'USER' | 'ADMIN';
  children: React.ReactNode;
};

export function RoleGuard({ allowedRole, children }: RoleGuardProps) {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (isPending) return;

    const role = session?.user.role;

    if (role !== allowedRole) {
      router.replace(role === 'ADMIN' ? '/dashboard/admin' : '/dashboard/user');
    }
  }, [allowedRole, isPending, router, session?.user.role]);

  if (isPending || session?.user.role !== allowedRole) {
    return (
      <div className='grid min-h-[50vh] place-items-center'>
        <p className='text-sm text-text-secondary'>Checking access...</p>
      </div>
    );
  }

  return <>{children}</>;
}
