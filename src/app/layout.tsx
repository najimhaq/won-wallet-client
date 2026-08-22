import type { Metadata } from 'next';
import { Josefin_Sans, Ubuntu_Sans } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import './globals.css';
import { AuthProvider } from '@/hooks/use-auth';

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
    'Track income, expenses, budgets, and financial activity in one simple personal finance dashboard.',
  keywords: [
    'WonWallet',
    'expense tracker',
    'personal finance',
    'budget tracker',
    'income tracker',
    'expense manager',
    'money management',
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
        <AuthProvider>{children}</AuthProvider>

        <Toaster
          position='top-right'
          toastOptions={{
            duration: 3500,
            style: {
              background: '#ffffff',
              color: '#0f172a',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              boxShadow: '0 12px 30px rgba(15, 23, 42, 0.12)',
            },
            success: {
              iconTheme: {
                primary: '#0f766e',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#e11d48',
                secondary: '#ffffff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
