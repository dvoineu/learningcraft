# Migration Guide

This guide helps you migrate existing code to the new project structure.

## 📦 Import Path Changes

### Supabase Client

**Before:**
```typescript
import { supabase } from '@/lib/supabase';
```

**After (Browser/Client Components):**
```typescript
import { supabase } from '@/lib/supabase/client';
```

**After (Server Components/API Routes):**
```typescript
import { createServerClient } from '@/lib/supabase/server';

const supabase = createServerClient();
```

### New Utility Functions

**Utils:**
```typescript
import { cn, formatDate, calculatePercentage } from '@/lib/utils';

// Example usage
const className = cn('base-class', condition && 'conditional-class');
const date = formatDate(new Date(), 'ru-RU');
const percent = calculatePercentage(75, 100); // 75
```

**Constants:**
```typescript
import { 
  QUIZ_DIFFICULTIES, 
  QUIZ_SUBJECTS,
  MIN_QUESTIONS,
  MAX_QUESTIONS 
} from '@/lib/constants';
```

**Types:**
```typescript
import type { Quiz, Question, QuizConfig, QuizResult } from '@/lib/types';
```

## 🎨 Component Refactoring

### Extract Landing Page Components

The landing page (`src/app/[locale]/page.tsx`) is currently monolithic. You can now extract sections into components:

**Example - Extract Hero Section:**

1. The `Hero` component already exists at `src/components/landing/Hero.tsx`
2. Update your page to use it:

```typescript
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as Locale);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header>...</header>
      
      <main className="mx-auto flex max-w-6xl flex-col gap-24 px-6 pb-24 pt-20">
        <Hero dictionary={dictionary} locale={locale} />
        <Features dictionary={dictionary} />
        {/* Other sections */}
      </main>
      
      <footer>...</footer>
    </div>
  );
}
```

### Create Remaining Components

You should create these components to match the structure:

**Landing Components:**
- `src/components/landing/Steps.tsx` - How it works section
- `src/components/landing/Community.tsx` - Testimonials section
- `src/components/landing/CTA.tsx` - Call to action section

**UI Components:**
- `src/components/ui/card.tsx` - Card component
- `src/components/ui/progress.tsx` - Progress bar
- `src/components/ui/select.tsx` - Select dropdown
- `src/components/ui/slider.tsx` - Slider input

## 🔄 Backward Compatibility

The old import path still works:
```typescript
// This still works (old file exists)
import { supabase } from '@/lib/supabase';
```

However, you should migrate to the new structure:
- Use `@/lib/supabase/client` for client-side code
- Use `@/lib/supabase/server` for server-side code

## ✅ Migration Checklist

- [ ] Install new dependencies (`clsx`, `tailwind-merge`)
- [ ] Update Supabase imports to use new paths
- [ ] Extract landing page sections into components
- [ ] Use centralized types from `@/lib/types`
- [ ] Use constants from `@/lib/constants`
- [ ] Implement API routes in `src/app/[locale]/api/`
- [ ] Create upload page components
- [ ] Create quiz components
- [ ] Create results components

## 🚀 Next Development Steps

### 1. Implement Upload Page

Create `src/app/[locale]/upload/page.tsx`:
```typescript
import { FileDropzone } from '@/components/upload/FileDropzone';
import { SubjectSelector } from '@/components/upload/SubjectSelector';
// ... other imports

export default function UploadPage() {
  return (
    <div>
      <h1>Create Quiz</h1>
      <FileDropzone />
      <SubjectSelector />
      {/* Other components */}
    </div>
  );
}
```

### 2. Implement API Routes

Create `src/app/[locale]/api/quiz/generate/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { generateQuiz } from '@/lib/ai/generate-quiz';
import { createServerClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const config = await request.json();
    const quiz = await generateQuiz(config);
    
    // Save to Supabase
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('quizzes')
      .insert(quiz)
      .select()
      .single();
    
    if (error) throw error;
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate quiz' },
      { status: 500 }
    );
  }
}
```

### 3. Set Up Supabase Tables

Create these tables in your Supabase project:

```sql
-- Quizzes table
CREATE TABLE quizzes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id)
);

-- Questions table
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer INTEGER NOT NULL,
  explanation TEXT,
  order_index INTEGER NOT NULL
);

-- Results table
CREATE TABLE quiz_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id UUID REFERENCES quizzes(id),
  user_id UUID REFERENCES auth.users(id),
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  answers JSONB NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 📖 Additional Resources

- See [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) for full structure details
- Check [README.md](./README.md) for setup instructions
- Review example components in `src/components/` for patterns
