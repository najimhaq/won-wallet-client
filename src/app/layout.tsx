import type { Metadata } from 'next';
import { Josefin_Sans, Ubuntu_Sans } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import './globals.css';
import { BackToTop } from '@/components/lenis/back-to-top';
import { ScrollProgress } from '@/components/lenis/scroll-progress';
import { ScrollReset } from '@/components/lenis/scroll-reset';
import { SmoothScrollProvider } from '@/components/lenis/smooth-scroll-provider';

const ubuntu = Ubuntu_Sans({
  variable: '--font-ubuntu-sans',
  subsets: ['latin'],
});

const josefin = Josefin_Sans({
  variable: '--font-josefin-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'WonWallet — Personal Expense Tracker',
    template: '%s | WonWallet',
  },
  description:
    'WonWallet helps you organize books, track reading progress, and build your personal library.',
  keywords: [
    'WonWallet',
    'personal tracker',
    'expense manager',
    'expense tracker',
    'income expense',
    'expense management',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      data-scroll-behavior='smooth'
      suppressHydrationWarning
      className={`${ubuntu.variable} ${josefin.variable} h-full antialiased`}
    >
      <body className='min-h-full bg-canvas font-sans text-text-primary'>
        <SmoothScrollProvider>
          <ScrollReset />
          <ScrollProgress />

          <main>{children}</main>

          <BackToTop />
        </SmoothScrollProvider>

        <Toaster
          position='top-right'
          toastOptions={{
            style: {
              background: '#fffcf5',
              color: '#1d2721',
              border: '1px solid #ded3c1',
              boxShadow: '0 12px 30px rgba(29, 39, 33, 0.12)',
            },
          }}
        />
      </body>
    </html>
  );
}
