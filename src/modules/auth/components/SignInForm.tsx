'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmail } from '../services/auth-service';
import { Button } from '@/shared/ui';

interface SignInFormProps {
  locale: string;
}

export function SignInForm({ locale }: SignInFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmail({ email, password });
      router.push(`/${locale}`);
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Sign in failed');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white/80">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/40 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-white/80">
          Пароль
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/40 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          placeholder="••••••••"
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Вход...' : 'Войти'}
      </Button>
    </form>
  );
}
