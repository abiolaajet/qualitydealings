'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50 text-gray-500 font-bold uppercase tracking-widest">Loading Admin...</div>;
  
  if (!user || user.role !== 'admin') {
    if (typeof window !== 'undefined') router.push('/');
    return null;
  }

  return <>{children}</>;
}
