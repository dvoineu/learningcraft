/**
 * App Providers
 * 
 * Global React providers for the application.
 * Combines all necessary providers in the correct order.
 */

'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@/shared/theme';

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Main app providers component
 * 
 * Wraps the application with all necessary providers:
 * - ThemeProvider: For theme management
 * - AuthProvider: For authentication state (TODO: implement)
 * - I18nProvider: For internationalization (TODO: implement)
 * - QueryProvider: For data fetching (TODO: implement)
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      {/* TODO: Add AuthProvider when auth module is created */}
      {/* TODO: Add I18nProvider when needed */}
      {/* TODO: Add QueryProvider if using React Query */}
      {children}
    </ThemeProvider>
  );
}
