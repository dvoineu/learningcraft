/**
 * Supabase Client Configuration
 * 
 * Provides configured Supabase clients for different environments
 * (browser, server, route handlers) with proper SSR support.
 */

export { createClient } from './browser';
export { createServerClient } from './server';
export { createRouteHandlerClient } from './route-handler';
