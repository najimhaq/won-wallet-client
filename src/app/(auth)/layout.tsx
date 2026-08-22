import type { ReactNode } from 'react';

import { AuthGuard } from '@/components/auth/auth-guard';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard requireAuth={false}>
      <main className='relative grid min-h-screen place-items-center overflow-hidden bg-canvas px-4 py-8'>
        <div className='pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary-soft to-transparent' />

        <div className='relative w-full'>{children}</div>
      </main>
    </AuthGuard>
  );
}
