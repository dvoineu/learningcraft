# LearningCraft - Project Structure

## 📊 Project Status

**✅ ПОЛНОСТЬЮ РЕАЛИЗОВАНО - MVP ГОТОВ!**

### Реализованные функции (FR-1 до FR-6):

#### ✅ **FR-1 & FR-2: PDF Upload & Quiz Configuration**
- Загрузка PDF файлов (drag-n-drop или клик)
- Валидация файлов (тип, размер до 10MB)
- Выбор предмета из 11 предметов ЦТ
- Выбор сложности (Легкий/Средний/Сложный)
- Слайдер количества вопросов (5-10)

#### ✅ **FR-3: AI Quiz Generation**
- Извлечение текста из PDF (pdfjs-dist)
- Генерация квизов через OpenRouter API (DeepSeek)
- Валидация структуры вопросов
- Сохранение в Supabase
- Время генерации: 30-60 секунд

#### ✅ **FR-4: Quiz Taking**
- Прохождение квиза вопрос за вопросом
- Progress bar с визуализацией
- Навигация (Next/Previous/Question Grid)
- Keyboard shortcuts (1-4, Enter, Backspace)
- Visual states для answered/current вопросов

#### ✅ **FR-5: Quiz Submission**
- Confirmation modal перед завершением
- Подсчет score и процента
- Сохранение результатов в БД
- Redirect на страницу результатов

#### ✅ **FR-6: Results Display**
- Круговая диаграмма с анимацией
- Performance categories (90%+, 70-89%, 50-69%, <50%)
- Детальный разбор каждого вопроса
- Confetti animation для высоких баллов (≥80%)
- Кнопки "Пройти заново" и "Создать новый квиз"

### Технический стек:
- ✅ Next.js 15 (App Router) + TypeScript
- ✅ Tailwind CSS v4
- ✅ Supabase (Database + Auth готов)
- ✅ OpenRouter API (AI генерация)
- ✅ pdfjs-dist (PDF parsing)
- ✅ i18n (ru/be локализация)

## 📁 Current File Structure

```
web-learningcraft/
├── src/
│   ├── app/
│   │   ├── [locale]/                    # Internationalized routes
│   │   │   ├── layout.tsx               # ✅ Locale-specific layout
│   │   │   ├── page.tsx                 # ✅ Landing page (localized)
│   │   │   │
│   │   │   ├── upload/                  # ✅ Quiz creation page
│   │   │   │   └── page.tsx             # ✅ Upload & configure quiz
│   │   │   │
│   │   │   ├── quiz/                    # ✅ Quiz taking
│   │   │   │   └── [id]/                # ✅ Dynamic quiz routes
│   │   │   │       ├── page.tsx         # ✅ Quiz taking page
│   │   │   │       └── results/         # ✅ Results display
│   │   │   │           └── page.tsx     # ✅ Results page
│   │   │   │
│   │   │   ├── test-supabase/           # ✅ Supabase testing page
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   └── auth/                    # ✅ Authentication pages
│   │   │       ├── signin/              # ✅ Sign in page
│   │   │       │   └── page.tsx
│   │   │       ├── signup/              # ✅ Sign up page
│   │   │       │   └── page.tsx
│   │   │       └── callback/            # ✅ OAuth callback
│   │   │           └── route.ts
│   │   │
│   │   ├── api/                         # ✅ API Routes
│   │   │   └── quiz/                    # ✅ Quiz API
│   │   │       ├── generate/            # ✅ Generate quiz from PDF
│   │   │       │   └── route.ts
│   │   │       ├── [id]/                # ✅ Get quiz by ID
│   │   │       │   └── route.ts
│   │   │       └── submit/              # ✅ Submit quiz results
│   │   │           └── route.ts
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
│   │   ├── upload/                      # ✅ Upload components
│   │   │   ├── FileDropzone.tsx         # ✅ Drag-n-drop file upload
│   │   │   ├── SubjectSelector.tsx      # ✅ Subject dropdown
│   │   │   ├── DifficultySelector.tsx   # ✅ Difficulty radio buttons
│   │   │   └── QuestionSlider.tsx       # ✅ Question count slider
│   │   │
│   │   ├── quiz/                        # ✅ Quiz components
│   │   │   ├── QuizProgress.tsx         # ✅ Progress bar
│   │   │   ├── QuestionCard.tsx         # ✅ Question display with options
│   │   │   ├── QuestionGrid.tsx         # ✅ Question navigation grid
│   │   │   ├── ConfirmationModal.tsx    # ✅ Finish confirmation
│   │   │   ├── ScoreCircle.tsx          # ✅ Circular score display
│   │   │   └── QuestionReview.tsx       # ✅ Answer review card
│   │   │
│   │   ├── auth/                        # ✅ Auth components
│   │   │   ├── GoogleSignInButton.tsx   # ✅ Google OAuth button
│   │   │   ├── UserMenu.tsx             # ✅ User dropdown menu
│   │   │   ├── AuthGuard.tsx            # ✅ Route protection
│   │   │   ├── SignInForm.tsx           # ✅ Email/password sign in
│   │   │   └── SignUpForm.tsx           # ✅ Email/password sign up
│   │   │
│   │   └── ui/                          # ✅ Reusable UI components
│   │       └── button.tsx               # ✅ Button component
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts                # ✅ Browser Supabase client (created)
│   │   │   └── server.ts                # ✅ Server Supabase client (created)
│   │   │
│   │   ├── ai/
│   │   │   ├── parse-pdf.ts             # ✅ PDF text extraction (pdfjs-dist)
│   │   │   ├── prompts.ts               # ✅ AI prompt templates for quiz gen
│   │   │   └── generate-quiz.ts         # ✅ OpenRouter API integration
│   │   │
│   │   ├── auth/
│   │   │   ├── types.ts                 # ✅ Auth type definitions
│   │   │   ├── actions.ts               # ✅ Server actions for auth
│   │   │   └── hooks.ts                 # ✅ React hooks for auth state
│   │   │
│   │   ├── types/
│   │   │   ├── database.ts              # ✅ Supabase database types
│   │   │   └── quiz.ts                  # ✅ Quiz-specific types
│   │   │
│   │   ├── supabase.ts                  # ✅ Legacy file (still exists)
│   │   ├── utils.ts                     # ✅ Helper functions (cn, formatDate)
│   │   ├── constants.ts                 # ✅ App constants (subjects, etc)
│   │   └── types.ts                     # ✅ General type definitions
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
├── .env.example                         # ✅ Example env file with API keys
├── .gitignore                           # ✅
├── next.config.ts                       # ✅ Next.js configuration
├── postcss.config.mjs                   # ✅ PostCSS config
├── tsconfig.json                        # ✅ TypeScript config
├── package.json                         # ✅ Dependencies (pdfjs-dist added)
├── package-lock.json                    # ✅
├── docs/                                # ✅ Project documentation
│   ├── architecture/                    # ✅ Architecture documentation
│   │   └── ARCHITECTURE.md
│   ├── features/                        # ✅ Feature documentation
│   │   └── DASHBOARD_FEATURE.md
│   ├── guides/                          # ✅ Setup and usage guides
│   │   ├── AUTH_SETUP.md
│   │   ├── GIT_FLOW.md
│   │   └── MIGRATION_GUIDE.md
│   ├── history/                         # ✅ Development history
│   │   ├── API_FIX_NOTES.md
│   │   └── FR-7_IMPLEMENTATION_SUMMARY.md
│   └── plan/                            # ✅ Project plans
│       └── PLAN-20251023.md
├── supabase/
│   ├── sql/
│   │   ├── migrations/                  # ✅ Database migrations
│   │   ├── seeds/                       # ✅ Database seeds
│   │   └── schema.sql                   # ✅ Database schema with RLS
│   └── config/                          # ✅ Supabase configuration
├── README.md                            # ✅ Project documentation
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

### Documentation
- **`docs/architecture/`**: System architecture and design decisions
- **`docs/features/`**: Feature specifications and implementation guides
- **`docs/guides/`**: Setup, configuration, and usage guides
- **`docs/history/`**: Development history and change logs
- **`docs/plan/`**: Project planning and roadmaps

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create `.env.local` file:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# OpenRouter API (for AI quiz generation)
OPENROUTER_API_KEY=your_openrouter_api_key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Setup Supabase Database
1. Go to Supabase Dashboard → SQL Editor
2. Copy content from `supabase/sql/schema.sql`
3. Run the SQL to create tables and RLS policies

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🎯 User Flow

1. **Landing Page** (`/`) → Choose language (ru/be)
2. **Upload Page** (`/upload`) → Upload PDF, configure quiz
3. **Quiz Generation** (30-60s) → AI generates questions
4. **Quiz Taking** (`/quiz/[id]`) → Answer questions with navigation
5. **Results** (`/quiz/[id]/results`) → View score and detailed breakdown

## 🔮 Future Enhancements

### Phase 2 Features:
1. **User Dashboard**:
   - Quiz history
   - Performance analytics
   - Progress tracking

2. **Social Features**:
   - Quiz sharing (public links)
   - Leaderboards
   - Study groups

3. **Advanced Quiz Options**:
   - Timed quizzes
   - Multiple attempts tracking
   - Custom question pools

4. **Content Expansion**:
   - DOCX support (install `mammoth`)
   - Image-based questions
   - Video material support

5. **Export & Reporting**:
   - Export results to PDF
   - Detailed analytics dashboard
   - Study recommendations based on performance

## 📚 Technology Stack

- **Framework**: Next.js 15 (App Router) with TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL + Auth + RLS)
- **AI**: OpenRouter API (DeepSeek R1 model)
- **PDF Processing**: pdfjs-dist (Mozilla PDF.js)
- **i18n**: Custom implementation with dynamic `[locale]` routes
- **UI Components**: Custom components with Tailwind
- **State Management**: React hooks + sessionStorage

## 📊 Database Schema

### Tables:
1. **quizzes**
   - id, user_id, title, subject, difficulty
   - created_at, updated_at

2. **questions**
   - id, quiz_id, question_text, options (JSONB)
   - correct_answer, explanation, order_index

3. **quiz_attempts**
   - id, quiz_id, user_id, score, total_questions
   - percentage (computed), answers (JSONB), completed_at

### Security:
- Row Level Security (RLS) enabled on all tables
- Users can create/view quizzes (even without auth)
- Users can only update/delete their own quizzes
- All attempts are publicly viewable

## 🔗 Useful Links

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [OpenRouter API](https://openrouter.ai/docs)
- [pdfjs-dist Documentation](https://mozilla.github.io/pdf.js/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 📈 Project Statistics

- **Total Files**: 50+ TypeScript/TSX files
- **Components**: 20+ React components
- **API Routes**: 3 endpoints
- **Pages**: 6 pages (landing, upload, quiz, results, signin, signup)
- **Lines of Code**: ~3000+ lines
- **Development Time**: 2 sessions
- **Status**: ✅ MVP Complete and functional

## 🎉 Completed Features Summary

### Core Functionality:
✅ PDF upload with drag-n-drop  
✅ AI quiz generation (30-60s)  
✅ Interactive quiz taking  
✅ Progress tracking  
✅ Keyboard shortcuts  
✅ Results with detailed breakdown  
✅ Confetti animation for high scores  
✅ Bilingual support (ru/be)  

### Technical Implementation:
✅ Full TypeScript coverage  
✅ Server-side rendering (SSR)  
✅ API routes with validation  
✅ Database with RLS policies  
✅ Responsive design  
✅ Error handling  
✅ Loading states  

**Ready for production deployment! 🚀**
