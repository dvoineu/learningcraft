/**
 * Route Handler Supabase Client
 * 
 * Client for API route handlers with proper cookie handling.
 */

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from './types/database';

export async function createRouteHandlerClient() {
  const cookieStore = await cookies();
  
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );
}
