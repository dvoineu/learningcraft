/**
 * Data Access Layer
 *
 * Provides abstraction over data sources (Supabase, HTTP APIs, etc.)
 * with caching, error handling, and type safety.
 */

// Re-export browser-only functions
export { createClient } from './supabase/browser';
export type { Database } from './supabase/types/database';

// export * from './api-client'; // TODO: Implement when needed
// export * from './cache'; // TODO: Implement when needed
