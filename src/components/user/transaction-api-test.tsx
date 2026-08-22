'use client';

import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export function TransactionApiTest() {
  async function handleCreateTestTransaction() {
    try {
      const payload = {
        amount: -50,
        type: 'EXPENSE',
        category: 'FOOD',
        description: 'Lunch test transaction',
        date: new Date().toISOString(),
      };

      console.log('Sending transaction payload:', payload);

      const response = await api.post('/transactions', payload);

      console.log('Created transaction:', response.data);

      console.log('Created transaction:', response.data);
      toast.success('Test transaction created.');
    } catch (error) {
      console.error('Transaction API error:', error);
      toast.error('Transaction API request failed. Check console.');
    }
  }

  return (
    <button
      type='button'
      className='btn-secondary'
      onClick={handleCreateTestTransaction}
    >
      Create test transaction
    </button>
  );
}
