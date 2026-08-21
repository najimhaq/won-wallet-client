'use client';

import { useState } from 'react';
import { signUp } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');


    const { data, error } = await signUp.email({
      name,
      email,
      password,
      role: 'user',
    });

    if (error) {
      setError(error.message || 'Signup failed');
    } else {

      console.log('User signed up:', data);
      router.push('/dashboard');
    }
  };

  return (
    <main className='flex min-h-screen items-center justify-center bg-gray-100'>
      <form
        onSubmit={handleSignUp}
        className='bg-white p-8 rounded-lg shadow-md w-96 space-y-4'
      >
        <h1 className='text-2xl font-bold text-center text-gray-800'>
          Expense Tracker Sign Up
        </h1>

        {error && <p className='text-red-500 text-sm'>{error}</p>}

        <input
          type='text'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full p-2 border rounded'
          required
        />
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full p-2 border rounded'
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full p-2 border rounded'
          required
        />

        <button
          type='submit'
          className='w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700'
        >
          Sign Up
        </button>
      </form>
    </main>
  );
}
