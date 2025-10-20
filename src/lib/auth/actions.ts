'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import type { AuthProvider } from './types';

/**
 * Sign in with OAuth provider (Google, GitHub, etc.)
 */
export async function signInWithOAuth(provider: AuthProvider, locale: string = 'ru') {
  const supabase = await createServerClient();
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/callback?locale=${locale}`,
    },
  });

  if (error) {
    console.error('OAuth sign in error:', error);
    return { error: error.message };
  }

  if (data.url) {
    redirect(data.url);
  }
}

/**
 * Sign in with email and password
 */
export async function signInWithEmail(email: string, password: string) {
  const supabase = await createServerClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  return { data };
}

/**
 * Sign up with email and password
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  fullName?: string,
  locale: string = 'ru'
) {
  const supabase = await createServerClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/callback?locale=${locale}`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { data };
}

/**
 * Sign out
 */
export async function signOut() {
  const supabase = await createServerClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

/**
 * Get current user
 */
export async function getCurrentUser() {
  const supabase = await createServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return { user: null, error: error.message };
  }

  return { user, error: null };
}

/**
 * Update user profile
 */
export async function updateProfile(data: {
  full_name?: string;
  avatar_url?: string;
}) {
  const supabase = await createServerClient();

  const { data: userData, error } = await supabase.auth.updateUser({
    data,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  return { data: userData };
}
