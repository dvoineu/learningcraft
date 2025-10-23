'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useIsAuthenticated } from '../hooks';

interface AuthGuardProps {
  children: React.ReactNode;
  locale: string;
  redirectTo?: string;
}

export function AuthGuard({ children, locale, redirectTo }: AuthGuardProps) {
  const { isAuthenticated, loading } = useIsAuthenticated();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push(redirectTo || `/${locale}/auth/signin`);
    }
  }, [isAuthenticated, loading, router, locale, redirectTo]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
          <p className="text-white/70">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
