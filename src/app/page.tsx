'use client';

import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (isPending) return;

    router.replace(session?.user ? '/dashboard' : '/sign-in');
  }, [isPending, router, session?.user]);

  return (
    <main className='grid min-h-screen place-items-center bg-canvas'>
      <p className='text-sm text-text-secondary'>Loading WonWallet...</p>
    </main>
  );
}
