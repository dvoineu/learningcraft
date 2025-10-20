import type { User, Session } from '@supabase/supabase-js';

export interface AuthUser extends User {
  email?: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
    name?: string;
    picture?: string;
  };
}

export interface AuthSession extends Session {
  user: AuthUser;
}

export interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  loading: boolean;
}

export type AuthProvider = 'google' | 'github' | 'email';
