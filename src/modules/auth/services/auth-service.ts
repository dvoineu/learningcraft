/**
 * Auth Service
 * 
 * Handles authentication operations using Supabase.
 */

import { createClient } from '@/shared/data-access';
import type { User, SignInCredentials, SignUpCredentials } from '../types';
import { AuthError } from '../types';

export class AuthService {
  private supabase = createClient();

  /**
   * Sign in with email and password
   */
  async signIn(credentials: SignInCredentials): Promise<User> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      throw new AuthError(error.message, error.code);
    }

    if (!data.user) {
      throw new AuthError('Authentication failed');
    }

    return this.mapUser(data.user);
  }

  /**
   * Sign up with email and password
   */
  async signUp(credentials: SignUpCredentials): Promise<User> {
    const { data, error } = await this.supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {
          name: credentials.name,
        },
      },
    });

    if (error) {
      throw new AuthError(error.message, error.code);
    }

    if (!data.user) {
      throw new AuthError('Registration failed');
    }

    return this.mapUser(data.user);
  }

  /**
   * Sign in with Google
   */
  async signInWithGoogle(): Promise<void> {
    const { error } = await this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      throw new AuthError(error.message, error.code);
    }
  }

  /**
   * Sign in with OAuth provider
   */
  async signInWithOAuth(provider: 'google' | 'github', locale: string): Promise<void> {
    const { error } = await this.supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/${locale}/auth/callback`,
      },
    });

    if (error) {
      throw new AuthError(error.message, error.code);
    }
  }

  /**
   * Sign in with email (alias for signIn)
   */
  async signInWithEmail(credentials: SignInCredentials): Promise<User> {
    return this.signIn(credentials);
  }

  /**
   * Sign up with email (alias for signUp)
   */
  async signUpWithEmail(credentials: SignUpCredentials): Promise<User> {
    return this.signUp(credentials);
  }

  /**
   * Sign out
   */
  async signOut(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();
    
    if (error) {
      throw new AuthError(error.message, error.code);
    }
  }

  /**
   * Reset password
   */
  async resetPassword(email: string): Promise<void> {
    const { error } = await this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) {
      throw new AuthError(error.message, error.code);
    }
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<User | null> {
    const { data: { user }, error } = await this.supabase.auth.getUser();
    
    if (error) {
      console.error('Error getting current user:', error);
      return null;
    }

    return user ? this.mapUser(user) : null;
  }

  /**
   * Listen to auth state changes
   */
  onAuthStateChange(callback: (user: User | null) => void) {
    return this.supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user ? this.mapUser(session.user) : null);
    });
  }

  /**
   * Map Supabase user to our User type
   */
  private mapUser(user: any): User {
    return {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.name,
      avatar_url: user.user_metadata?.avatar_url,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}

export const authService = new AuthService();

// Export individual functions for convenience
export const signInWithEmail = (credentials: SignInCredentials) => authService.signInWithEmail(credentials);
export const signUpWithEmail = (credentials: SignUpCredentials) => authService.signUpWithEmail(credentials);
export const signInWithOAuth = (provider: 'google' | 'github', locale: string) => authService.signInWithOAuth(provider, locale);
export const signOut = () => authService.signOut();
