/**
 * useLocale Hook
 * 
 * Provides current locale with type safety.
 */

import { useParams } from 'next/navigation';
import { locales, type Locale, defaultLocale } from '../config';

export function useLocale(): Locale {
  const params = useParams();
  const locale = params?.locale as string;
  
  // Type guard to ensure locale is valid
  if (!locale || !locales.includes(locale as Locale)) {
    return defaultLocale;
  }
  
  return locale as Locale;
}
