# Authentication Setup Guide

## 🔐 Настройка аутентификации через Google и Supabase

### 1. Установка зависимостей

```bash
npm install @supabase/ssr
```

### 2. Настройка Supabase

#### 2.1 Включите Email Auth в Supabase Dashboard

1. Откройте ваш проект в [Supabase Dashboard](https://supabase.com/dashboard)
2. Перейдите в **Authentication** → **Providers**
3. Включите **Email** provider

#### 2.2 Настройте Google OAuth

1. В Supabase Dashboard перейдите в **Authentication** → **Providers**
2. Найдите **Google** и нажмите **Enable**
3. Вам понадобится создать OAuth приложение в Google Cloud Console:

**Создание Google OAuth App:**

1. Откройте [Google Cloud Console](https://console.cloud.google.com/)
2. Создайте новый проект или выберите существующий
3. Перейдите в **APIs & Services** → **Credentials**
4. Нажмите **Create Credentials** → **OAuth client ID**
5. Выберите **Web application**
6. Добавьте **Authorized redirect URIs**:
   ```
   https://<your-project-ref>.supabase.co/auth/v1/callback
   ```
7. Скопируйте **Client ID** и **Client Secret**
8. Вставьте их в Supabase Dashboard в настройках Google provider

#### 2.3 Настройте URL перенаправления

В Supabase Dashboard → **Authentication** → **URL Configuration**:

- **Site URL**: `http://localhost:3000` (для разработки)
- **Redirect URLs**: 
  - `http://localhost:3000/auth/callback`
  - `http://localhost:3000/ru/auth/callback`
  - `http://localhost:3000/be/auth/callback`

### 3. Переменные окружения

Обновите `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Создайте таблицу profiles в Supabase

Выполните этот SQL в Supabase SQL Editor:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 5. Использование в коде

#### Защита страниц (Server Component)

```typescript
import { createServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/ru/auth/signin');
  }

  return <div>Protected content</div>;
}
```

#### Защита страниц (Client Component)

```typescript
import { AuthGuard } from '@/components/auth/AuthGuard';

export default function ProtectedPage({ params }) {
  return (
    <AuthGuard locale={params.locale}>
      <div>Protected content</div>
    </AuthGuard>
  );
}
```

#### Использование хуков

```typescript
'use client';

import { useUser } from '@/lib/auth/hooks';

export function MyComponent() {
  const { user, loading } = useUser();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please sign in</div>;

  return <div>Hello, {user.email}!</div>;
}
```

#### Server Actions

```typescript
import { signInWithEmail, signOut } from '@/lib/auth/actions';

// Sign in
const result = await signInWithEmail('user@example.com', 'password');

// Sign out
await signOut();
```

### 6. Компоненты

Готовые компоненты для использования:

- `<GoogleSignInButton />` - Кнопка входа через Google
- `<UserMenu />` - Меню пользователя с аватаром
- `<AuthGuard />` - Защита страниц от неавторизованных пользователей
- `<SignInForm />` - Форма входа по email
- `<SignUpForm />` - Форма регистрации

### 7. Маршруты

Доступные страницы:

- `/[locale]/auth/signin` - Страница входа
- `/[locale]/auth/signup` - Страница регистрации
- `/[locale]/auth/callback` - Callback для OAuth

### 8. Тестирование

1. Запустите dev сервер:
   ```bash
   npm run dev
   ```

2. Откройте `http://localhost:3000/ru/auth/signin`

3. Попробуйте:
   - Вход через Google
   - Регистрацию по email
   - Вход по email

### 9. Production

Для production обновите:

1. **Supabase Dashboard** → **Authentication** → **URL Configuration**:
   - Site URL: `https://yourdomain.com`
   - Redirect URLs: `https://yourdomain.com/auth/callback`

2. **Google Cloud Console** → **Credentials**:
   - Добавьте production redirect URI

3. **.env.local** (или переменные окружения в Vercel):
   ```env
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   ```

## 🎨 Кастомизация

### Изменение стилей

Все компоненты используют Tailwind CSS и могут быть легко кастомизированы.

### Добавление других провайдеров

Чтобы добавить GitHub, Facebook и т.д.:

1. Включите провайдер в Supabase Dashboard
2. Создайте OAuth приложение у провайдера
3. Используйте `signInWithOAuth('github', locale)` в коде

### Добавление дополнительных полей в профиль

1. Добавьте колонки в таблицу `profiles`
2. Обновите типы в `src/lib/types/database.ts`
3. Используйте `updateProfile()` для обновления

## 🔒 Безопасность

- ✅ Все auth операции используют Server Actions
- ✅ Row Level Security (RLS) включен для таблицы profiles
- ✅ Middleware автоматически обновляет сессию
- ✅ Cookies используются для хранения токенов (httpOnly)

## 📚 Дополнительные ресурсы

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js Authentication](https://nextjs.org/docs/app/building-your-application/authentication)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)
