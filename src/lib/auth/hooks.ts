'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { AuthState, AuthUser } from './types';

/**
 * Hook to get current auth state
 */
export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
  });

  useEffect(() => {
    const supabase = createClient();

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState({
        user: session?.user as AuthUser | null,
        session: session as any,
        loading: false,
      });
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({
        user: session?.user as AuthUser | null,
        session: session as any,
        loading: false,
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  return state;
}

/**
 * Hook to get current user
 */
export function useUser() {
  const { user, loading } = useAuth();
  return { user, loading };
}

/**
 * Hook to check if user is authenticated
 */
export function useIsAuthenticated() {
  const { user, loading } = useAuth();
  return { isAuthenticated: !!user, loading };
}
