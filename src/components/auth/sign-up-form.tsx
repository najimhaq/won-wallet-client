'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { signUp } from '@/lib/auth-client';

export function SignUpForm() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters.');
      return;
    }

    setIsSubmitting(true);

    const { error } = await signUp.email({
      name,
      email,
      password,
    });

    setIsSubmitting(false);

    if (error) {
      toast.error(error.message || 'Unable to create your account.');
      return;
    }

    toast.success('Account created successfully.');
    router.replace('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label
          htmlFor='name'
          className='mb-1.5 block text-sm font-medium text-text-primary'
        >
          Full name
        </label>

        <input
          id='name'
          type='text'
          autoComplete='name'
          value={name}
          onChange={(event) => setName(event.target.value)}
          className='input-base'
          placeholder='Your full name'
          disabled={isSubmitting}
          required
        />
      </div>

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
        <label
          htmlFor='password'
          className='mb-1.5 block text-sm font-medium text-text-primary'
        >
          Password
        </label>

        <div className='relative'>
          <input
            id='password'
            type={showPassword ? 'text' : 'password'}
            autoComplete='new-password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className='input-base pr-11'
            placeholder='Minimum 8 characters'
            disabled={isSubmitting}
            minLength={8}
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
            Creating account...
          </>
        ) : (
          'Create account'
        )}
      </button>

      <p className='pt-2 text-center text-sm text-text-secondary'>
        Already have an account?{' '}
        <Link
          href='/sign-in'
          className='font-semibold text-primary hover:text-primary-hover'
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
