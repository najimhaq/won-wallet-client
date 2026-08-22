import Link from 'next/link';
import { WalletCards } from 'lucide-react';

type LogoProps = {
  href?: string;
  compact?: boolean;
};

export function Logo({ href = '/', compact = false }: LogoProps) {
  return (
    <Link
      href={href}
      className='inline-flex items-center gap-2 text-text-primary'
      aria-label='WonWallet home'
    >
      <span className='grid size-9 place-items-center rounded-xl bg-primary text-text-inverse shadow-sm'>
        <WalletCards className='size-5' />
      </span>

      {!compact && (
        <span className='font-ubuntu text-lg font-bold tracking-tight'>
          WonWallet
        </span>
      )}
    </Link>
  );
}
