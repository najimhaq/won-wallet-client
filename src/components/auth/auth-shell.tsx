import type { ReactNode } from 'react';
import { Logo } from '@/components/ui/logo';

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <section className='mx-auto w-full max-w-md'>
      <div className='mb-8 flex justify-center'>
        <Logo />
      </div>

      <div className='dashboard-card p-6 sm:p-8'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold tracking-tight text-text-primary'>
            {title}
          </h1>

          <p className='mt-2 text-sm leading-6 text-text-secondary'>
            {subtitle}
          </p>
        </div>

        <div className='mt-7'>{children}</div>
      </div>
    </section>
  );
}
