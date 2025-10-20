# LearningCraft - Project Structure

## 📊 Project Status

**Структура частично реализована:**
- ✅ **Базовая инфраструктура**: Директории созданы, основные утилиты готовы
- ⚠️ **Компоненты**: Созданы примеры (Hero, Features, Button), остальные нужно реализовать
- 📁 **API Routes**: Директории созданы, но файлы route.ts отсутствуют
- 📁 **Страницы**: Структура готова, нужно создать upload, quiz, results страницы

**Что работает сейчас:**
- Landing page с интернационализацией (ru/be)
- Supabase клиенты (browser + server)
- Базовые типы и константы
- Утилиты (cn, formatDate, calculatePercentage)

**Что нужно реализовать:**
- Страницы загрузки, квиза и результатов
- API endpoints для генерации квизов
- Компоненты для upload/quiz/results
- AI интеграция для генерации вопросов

## 📁 Current File Structure

```
web-learningcraft/
├── src/
│   ├── app/
│   │   ├── [locale]/                    # Internationalized routes
│   │   │   ├── layout.tsx               # ✅ Locale-specific layout
│   │   │   ├── page.tsx                 # ✅ Landing page (localized)
│   │   │   │
│   │   │   ├── upload/                  # 📁 Created (empty - needs page.tsx)
│   │   │   │
│   │   │   ├── quiz/                    # 📁 Created (empty)
│   │   │   │   └── [id]/                # 📁 Created (needs page.tsx, results/)
│   │   │   │
│   │   │   ├── test-supabase/           # ✅ Supabase testing page
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   └── api/                     # 📁 Created (empty - needs route.ts files)
│   │   │       ├── upload/              # 📁 Created
│   │   │       └── quiz/                # 📁 Created
│   │   │           ├── generate/        # 📁 Created
│   │   │           └── [id]/            # 📁 Created
│   │   │               └── submit/      # 📁 Created
│   │   │
│   │   ├── layout.tsx                   # ✅ Root layout
│   │   ├── page.tsx                     # ✅ Root redirect
│   │   ├── globals.css                  # ✅ Global styles
│   │   └── favicon.ico                  # ✅
│   │
│   ├── components/
│   │   ├── landing/                     # Landing page components
│   │   │   ├── Hero.tsx                 # ✅ Hero section (created)
│   │   │   ├── Features.tsx             # ✅ Features showcase (created)
│   │   │   ├── Steps.tsx                # ⚠️ TODO: Extract from page.tsx
│   │   │   ├── Community.tsx            # ⚠️ TODO: Extract from page.tsx
│   │   │   └── CTA.tsx                  # ⚠️ TODO: Extract from page.tsx
│   │   │
│   │   ├── upload/                      # 📁 Created (empty)
│   │   │   ├── FileDropzone.tsx         # ⚠️ TODO: Create
│   │   │   ├── SubjectSelector.tsx      # ⚠️ TODO: Create
│   │   │   ├── DifficultySelector.tsx   # ⚠️ TODO: Create
│   │   │   └── QuestionSlider.tsx       # ⚠️ TODO: Create
│   │   │
│   │   ├── quiz/                        # 📁 Created (empty)
│   │   │   ├── QuestionDisplay.tsx      # ⚠️ TODO: Create
│   │   │   ├── OptionsGroup.tsx         # ⚠️ TODO: Create
│   │   │   ├── ProgressBar.tsx          # ⚠️ TODO: Create
│   │   │   ├── QuestionGrid.tsx         # ⚠️ TODO: Create
│   │   │   └── NavigationButtons.tsx    # ⚠️ TODO: Create
│   │   │
│   │   ├── results/                     # 📁 Created (empty)
│   │   │   ├── ScoreDisplay.tsx         # ⚠️ TODO: Create
│   │   │   ├── PerformanceMessage.tsx   # ⚠️ TODO: Create
│   │   │   ├── AnswerReview.tsx         # ⚠️ TODO: Create
│   │   │   ├── QuestionReviewCard.tsx   # ⚠️ TODO: Create
│   │   │   ├── StatsCard.tsx            # ⚠️ TODO: Create
│   │   │   └── ActionButtons.tsx        # ⚠️ TODO: Create
│   │   │
│   │   └── ui/                          # Reusable UI components
│   │       ├── button.tsx               # ✅ Button component (created)
│   │       ├── card.tsx                 # ⚠️ TODO: Create
│   │       ├── progress.tsx             # ⚠️ TODO: Create
│   │       ├── radio-group.tsx          # ⚠️ TODO: Create
│   │       ├── select.tsx               # ⚠️ TODO: Create
│   │       ├── slider.tsx               # ⚠️ TODO: Create
│   │       └── toast.tsx                # ⚠️ TODO: Create
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts                # ✅ Browser Supabase client (created)
│   │   │   └── server.ts                # ✅ Server Supabase client (created)
│   │   │
│   │   ├── ai/
│   │   │   ├── parse-pdf.ts             # ✅ PDF text extraction (placeholder)
│   │   │   ├── prompts.ts               # ✅ AI prompt templates (created)
│   │   │   └── generate-quiz.ts         # ✅ Quiz generation logic (placeholder)
│   │   │
│   │   ├── supabase.ts                  # ✅ Legacy file (still exists)
│   │   ├── utils.ts                     # ✅ Helper functions (created)
│   │   ├── constants.ts                 # ✅ App-wide constants (created)
│   │   └── types.ts                     # ✅ TypeScript type definitions (created)
│   │
│   ├── i18n/
│   │   ├── dictionaries/
│   │   │   ├── ru.ts                    # ✅ Russian translations
│   │   │   └── be.ts                    # ✅ Belarusian translations
│   │   ├── config.ts                    # ✅ i18n configuration
│   │   └── get-dictionary.ts            # ✅ Dictionary loader
│   │
│   └── middleware.ts                    # ✅ Next.js middleware (locale detection)
│
├── public/
│   ├── file.svg                         # ✅
│   ├── globe.svg                        # ✅
│   ├── next.svg                         # ✅
│   ├── vercel.svg                       # ✅
│   └── window.svg                       # ✅
│
├── .env.local                           # ✅ Environment variables (not in git)
├── .env.example                         # ✅ Example env file (created)
├── .gitignore                           # ✅
├── next.config.ts                       # ✅ Next.js configuration
├── tailwind.config.ts                   # ❌ Not found (check if exists)
├── postcss.config.mjs                   # ✅ PostCSS config
├── tsconfig.json                        # ✅ TypeScript config
├── package.json                         # ✅ Dependencies
├── package-lock.json                    # ✅
├── README.md                            # ✅ Project documentation (updated)
├── MIGRATION_GUIDE.md                   # ✅ Migration guide (created)
└── PROJECT_OVERVIEW.md                  # ✅ This file

```

### Legend:
- ✅ **Exists and complete**
- 📁 **Directory created but empty**
- ⚠️ **TODO: Needs to be created**
- ❌ **Missing**

## 🎯 Structure Benefits

### 1. **Separation of Concerns**
- **Components**: Organized by feature (landing, upload, quiz, results)
- **Lib**: Separated by functionality (supabase, ai, utils)
- **i18n**: Centralized internationalization

### 2. **Scalability**
- Easy to add new locales in `i18n/dictionaries/`
- New components fit naturally into feature folders
- API routes follow RESTful patterns

### 3. **Type Safety**
- Centralized types in `lib/types.ts`
- Constants in `lib/constants.ts` for consistency
- Full TypeScript support throughout

### 4. **Internationalization**
- Dynamic `[locale]` routing for all pages
- Middleware handles locale detection
- Separate dictionaries for each language

## 📝 Key Files

### Configuration
- **`next.config.ts`**: Next.js configuration
- **`tailwind.config.ts`**: Tailwind CSS customization
- **`tsconfig.json`**: TypeScript compiler options
- **`src/i18n/config.ts`**: Supported locales and defaults

### Core Application
- **`src/middleware.ts`**: Locale detection and routing
- **`src/app/[locale]/page.tsx`**: Main landing page
- **`src/lib/supabase/client.ts`**: Supabase browser client
- **`src/lib/types.ts`**: Application-wide TypeScript types

### Utilities
- **`src/lib/utils.ts`**: Helper functions (cn, formatDate, etc.)
- **`src/lib/constants.ts`**: App constants (subjects, difficulties, etc.)

## 🚀 Next Steps

### Immediate Tasks
1. **Install missing dependencies**:
   ```bash
   npm install clsx tailwind-merge
   ```

2. **Create `.env.example`**:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

3. **Implement remaining components**:
   - Upload flow components
   - Quiz components
   - Results components

### Future Enhancements
1. **AI Integration**:
   - Add OpenAI/Anthropic API for quiz generation
   - Implement PDF parsing (install `pdf-parse`)
   - Add DOCX support (install `mammoth`)

2. **Database Schema**:
   - Design Supabase tables for quizzes, questions, results
   - Set up Row Level Security (RLS) policies
   - Create database migrations

3. **Authentication**:
   - Implement Supabase Auth
   - Add user profiles
   - Track user quiz history

4. **Additional Features**:
   - Quiz sharing functionality
   - Leaderboards
   - Quiz analytics
   - Export results to PDF

## 📚 Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase
- **i18n**: Custom implementation with dynamic routes
- **UI Components**: Custom components + shadcn/ui patterns

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
