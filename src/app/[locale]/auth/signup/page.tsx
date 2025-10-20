import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/i18n/get-dictionary';
import { isLocale, type Locale } from '@/i18n/config';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';
import { SignUpForm } from '@/components/auth/SignUpForm';

interface SignUpPageProps {
  params: Promise<{ locale: string }>;
}

export default async function SignUpPage({ params }: SignUpPageProps) {
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
          <h1 className="mt-6 text-3xl font-semibold">Регистрация</h1>
          <p className="mt-2 text-white/60">
            Создайте аккаунт для доступа ко всем возможностям
          </p>
        </div>

        <div className="space-y-4">
          <GoogleSignInButton locale={locale}>
            Регистрация через Google
          </GoogleSignInButton>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-slate-950 px-4 text-white/60">или</span>
            </div>
          </div>

          <SignUpForm locale={locale} />
        </div>

        <p className="mt-8 text-center text-sm text-white/60">
          Уже есть аккаунт?{' '}
          <Link
            href={`/${locale}/auth/signin`}
            className="font-medium text-emerald-400 hover:text-emerald-300"
          >
            Войти
          </Link>
        </p>

        <p className="mt-4 text-center text-xs text-white/40">
          Регистрируясь, вы соглашаетесь с{' '}
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
