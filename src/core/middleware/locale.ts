/**
 * Locale Middleware
 * 
 * Internationalization middleware functions.
 */

export function detectLocale(request: Request): string {
  // TODO: Implement locale detection logic
  return 'ru';
}

export function validateLocale(locale: string): boolean {
  // TODO: Implement locale validation
  return ['ru', 'be'].includes(locale);
}
