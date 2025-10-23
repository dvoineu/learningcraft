import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/shared/i18n/get-dictionary';
import { isLocale, type Locale } from '@/shared/i18n/config';
import { GoogleSignInButton, SignInForm } from '@/modules/auth';

interface SignInPageProps {
  params: Promise<{ locale: string }>;
}

export default async function SignInPage({ params }: SignInPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale as Locale);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
        <div className="mb-8 text-center">
          <Link href={`/${locale}`} className="inline-flex items-center gap-2">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-2xl font-semibold text-emerald-300">
              LC
            </span>
          </Link>
          <h1 className="mt-6 text-3xl font-semibold">Вход в LearningCraft</h1>
          <p className="mt-2 text-white/60">
            Войдите, чтобы создавать и проходить квизы
          </p>
        </div>

        <div className="space-y-4">
          <GoogleSignInButton locale={locale}>
            Войти через Google
          </GoogleSignInButton>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-slate-950 px-4 text-white/60">или</span>
            </div>
          </div>

          <SignInForm locale={locale} />
        </div>

        <p className="mt-8 text-center text-sm text-white/60">
          Нет аккаунта?{' '}
          <Link
            href={`/${locale}/auth/signup`}
            className="font-medium text-emerald-400 hover:text-emerald-300"
          >
            Зарегистрироваться
          </Link>
        </p>

        <p className="mt-4 text-center text-xs text-white/40">
          Входя в систему, вы соглашаетесь с{' '}
          <Link href={`/${locale}/terms`} className="underline hover:text-white/60">
            условиями использования
          </Link>{' '}
          и{' '}
          <Link href={`/${locale}/privacy`} className="underline hover:text-white/60">
            политикой конфиденциальности
          </Link>
        </p>
      </div>
    </div>
  );
}
