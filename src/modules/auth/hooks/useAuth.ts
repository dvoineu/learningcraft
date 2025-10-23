'use client';

/**
 * useAuth Hook
 * 
 * Provides authentication state and methods.
 */

import { useState, useEffect, useCallback } from 'react';
import { authService } from '../services/auth-service';
import type { User, SignInCredentials, SignUpCredentials, AuthError } from '../types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen to auth state changes
    const { data: { subscription } } = authService.onAuthStateChange((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (credentials: SignInCredentials) => {
    try {
      setIsLoading(true);
      const user = await authService.signIn(credentials);
      setUser(user);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signUp = useCallback(async (credentials: SignUpCredentials) => {
    try {
      setIsLoading(true);
      const user = await authService.signUp(credentials);
      setUser(user);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setIsLoading(true);
      await authService.signOut();
      setUser(null);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signInWithGoogle = useCallback(async () => {
    try {
      setIsLoading(true);
      await authService.signInWithGoogle();
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    try {
      await authService.resetPassword(email);
    } catch (error) {
      throw error;
    }
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    resetPassword,
  };
}

// Alias for compatibility
export const useUser = useAuth;
