/**
 * useTranslation Hook
 * 
 * Provides typed translation function with locale support.
 */

import { getDictionary } from '../get-dictionary';
import { useMemo } from 'react';
import { useLocale } from './useLocale';

export function useTranslation() {
  const locale = useLocale();
  
  const dictionary = useMemo(() => {
    return getDictionary(locale);
  }, [locale]);

  const t = useMemo(() => {
    return (key: string, params?: Record<string, string | number>) => {
      const keys = key.split('.');
      let value: any = dictionary;
      
      for (const k of keys) {
        value = value?.[k];
        if (value === undefined) break;
      }
      
      if (value === undefined) {
        console.warn(`Translation key "${key}" not found for locale "${locale}"`);
        return key;
      }
      
      if (typeof value === 'string' && params) {
        return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
          return params[paramKey]?.toString() || match;
        });
      }
      
      return value;
    };
  }, [dictionary, locale]);

  return {
    t,
    locale,
    dictionary,
  };
}
