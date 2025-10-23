/**
 * useIsAuthenticated Hook
 * 
 * Simple hook to check authentication status.
 */

import { useAuth } from './useAuth';

export function useIsAuthenticated() {
  const { isAuthenticated, isLoading } = useAuth();
  
  return {
    isAuthenticated,
    loading: isLoading,
  };
}
