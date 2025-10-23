'use client';

import { useState } from 'react';
import { useUser } from '../hooks/useAuth';
import { signOut } from '../services/auth-service';
import Link from 'next/link';

interface UserMenuProps {
  locale: string;
  dictionary: {
    profile: string;
    myQuizzes: string;
    settings: string;
    signOut: string;
    signIn: string;
  };
}

export function UserMenu({ locale, dictionary }: UserMenuProps) {
  const { user, isLoading: loading } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  if (loading) {
    return (
      <div className="h-10 w-10 animate-pulse rounded-full bg-[var(--lc-border)]" />
    );
  }

  if (!user) {
    return (
      <Link
        href={`/${locale}/auth/signin`}
        className="rounded-full border border-[var(--lc-border)] px-4 py-2 text-[var(--lc-muted)] transition hover:border-accent hover:text-[var(--lc-foreground)]"
      >
        {dictionary.signIn}
      </Link>
    );
  }

  const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture;
  const displayName = user.user_metadata?.full_name || user.user_metadata?.name || user.email;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 rounded-full border border-[var(--lc-border)] bg-[var(--lc-surface)] px-3 py-2 transition hover:bg-[var(--lc-surface-strong)]"
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={displayName || 'User'}
            className="h-8 w-8 rounded-full"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-semibold text-[var(--lc-background)]">
            {displayName?.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="hidden text-sm text-[var(--lc-foreground)] md:block">{displayName}</span>
        <svg
          className={`h-4 w-4 text-[var(--lc-muted)] transition ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 z-20 mt-2 w-56 rounded-2xl border border-[var(--lc-border)] bg-[var(--lc-surface-strong)] py-2 shadow-xl">
            <Link
              href={`/${locale}/profile`}
              className="block px-4 py-2 text-sm text-[var(--lc-muted)] transition hover:bg-[var(--lc-surface)] hover:text-[var(--lc-foreground)]"
              onClick={() => setIsOpen(false)}
            >
              {dictionary.profile}
            </Link>
            <Link
              href={`/${locale}/dashboard`}
              className="block px-4 py-2 text-sm text-[var(--lc-muted)] transition hover:bg-[var(--lc-surface)] hover:text-[var(--lc-foreground)]"
              onClick={() => setIsOpen(false)}
            >
              {dictionary.myQuizzes}
            </Link>
            <Link
              href={`/${locale}/settings`}
              className="block px-4 py-2 text-sm text-[var(--lc-muted)] transition hover:bg-[var(--lc-surface)] hover:text-[var(--lc-foreground)]"
              onClick={() => setIsOpen(false)}
            >
              {dictionary.settings}
            </Link>
            <hr className="my-2 border-[var(--lc-border)]" />
            <button
              onClick={async () => {
                setIsOpen(false);
                await signOut();
              }}
              className="block w-full px-4 py-2 text-left text-sm text-red-400 transition hover:bg-[var(--lc-surface)]"
            >
              {dictionary.signOut}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
