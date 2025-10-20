import type { User, Session } from '@supabase/supabase-js';

export type AuthUser = User;

export type AuthSession = Session;

export interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  loading: boolean;
}

export type AuthProvider = 'google' | 'github';
