'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from '@/lib/auth-client';

export function SignInForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);

    const { error } = await signIn.email({
      email,
      password,
      rememberMe: true,
    });

    setIsSubmitting(false);

    if (error) {
      toast.error(error.message || 'Incorrect email or password.');
      return;
    }

    toast.success('Welcome back.');
    router.replace(callbackUrl);
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label
          htmlFor='email'
          className='mb-1.5 block text-sm font-medium text-text-primary'
        >
          Email address
        </label>

        <input
          id='email'
          type='email'
          autoComplete='email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className='input-base'
          placeholder='you@example.com'
          disabled={isSubmitting}
          required
        />
      </div>

      <div>
        <div className='mb-1.5 flex items-center justify-between gap-4'>
          <label
            htmlFor='password'
            className='text-sm font-medium text-text-primary'
          >
            Password
          </label>

          <button
            type='button'
            className='text-xs font-semibold text-primary hover:text-primary-hover'
          >
            Forgot password?
          </button>
        </div>

        <div className='relative'>
          <input
            id='password'
            type={showPassword ? 'text' : 'password'}
            autoComplete='current-password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className='input-base pr-11'
            placeholder='Enter your password'
            disabled={isSubmitting}
            required
          />

          <button
            type='button'
            onClick={() => setShowPassword((currentValue) => !currentValue)}
            className='absolute inset-y-0 right-0 grid w-11 place-items-center text-text-muted hover:text-text-primary'
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className='size-4' />
            ) : (
              <Eye className='size-4' />
            )}
          </button>
        </div>
      </div>

      <button
        type='submit'
        className='btn-primary mt-2 w-full'
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <LoaderCircle className='size-4 animate-spin' />
            Signing in...
          </>
        ) : (
          'Sign in'
        )}
      </button>

      <p className='pt-2 text-center text-sm text-text-secondary'>
        New to WonWallet?{' '}
        <Link
          href='/sign-up'
          className='font-semibold text-primary hover:text-primary-hover'
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}
