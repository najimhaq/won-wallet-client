// src/hooks/use-auth.tsx DS
'use client';

import { createContext, useContext, type ReactNode } from 'react';

import { useData, useMutation } from './use-api';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'USER';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;

  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const {
    data: session,
    isLoading,
    mutate,
  } = useData<{ user: User } | null>('/api/auth/session');

  const { post } = useMutation();

  const user = session?.user || null;

  const login = async (email: string, password: string) => {
    await post('/api/auth/login', { email, password });
    await mutate();
  };

  const register = async (name: string, email: string, password: string) => {
    await post('/api/auth/register', { name, email, password });
    await mutate();
  };

  const logout = async () => {
    await post('/api/auth/logout', {});
    await mutate();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'ADMIN',
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
