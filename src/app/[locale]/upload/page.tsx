'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FileDropzone } from '@/components/upload/FileDropzone';
import { SubjectSelector } from '@/components/upload/SubjectSelector';
import { DifficultySelector } from '@/components/upload/DifficultySelector';
import { QuestionSlider } from '@/components/upload/QuestionSlider';
import { Button } from '@/components/ui/button';
import { DEFAULT_QUESTIONS, type QuizSubject, type QuizDifficulty, ERROR_MESSAGES } from '@/lib/constants';

interface UploadPageProps {
  params: Promise<{ locale: string }>;
}

export default function UploadPage({ params }: UploadPageProps) {
  const router = useRouter();
  const [locale, setLocale] = useState<string>('ru');
  
  // Form state
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [subject, setSubject] = useState<QuizSubject | ''>('');
  const [difficulty, setDifficulty] = useState<QuizDifficulty>('medium');
  const [questionCount, setQuestionCount] = useState(DEFAULT_QUESTIONS);
  const [isGenerating, setIsGenerating] = useState(false);

  // Unwrap params
  useState(() => {
    params.then((p) => setLocale(p.locale));
  });

  const handleFileSelect = (selectedFile: File | null) => {
    setFile(selectedFile);
    setFileError(null);
  };

  const isFormValid = file && subject && !fileError;

  const handleGenerate = async () => {
    if (!isFormValid) return;

    setIsGenerating(true);
    setFileError(null);

    try {
      // Prepare form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('subject', subject);
      formData.append('difficulty', difficulty);
      formData.append('questionCount', questionCount.toString());
      
      // Call API
      const response = await fetch('/api/quiz/generate', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Не удалось сгенерировать квиз');
      }

      // Redirect to quiz page
      router.push(`/${locale}/quiz/${data.quizId}`);
      
    } catch (error) {
      console.error('Error generating quiz:', error);
      if (error instanceof Error) {
        setFileError(error.message);
      } else {
        setFileError('Произошла ошибка при генерации квиза');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-2xl font-semibold text-emerald-300">
              LC
            </span>
            <div>
              <p className="text-xl font-semibold">LearningCraft</p>
              <p className="text-xs text-white/60">Создание квиза</p>
            </div>
          </Link>
          <Link
            href={`/${locale}`}
            className="text-sm text-white/70 transition hover:text-white"
          >
            ← Назад на главную
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-white">Создать квиз</h1>
          <p className="mt-2 text-white/60">
            Загрузите PDF файл и настройте параметры квиза
          </p>
        </div>

        <div className="space-y-8">
          {/* Step 1: File Upload */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-sm font-semibold text-slate-950">
                1
              </div>
              <h2 className="text-xl font-semibold">Загрузите материал</h2>
            </div>
            <FileDropzone
              onFileSelect={handleFileSelect}
              selectedFile={file}
              error={fileError}
            />
          </div>

          {/* Step 2: Quiz Configuration */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                file ? 'bg-emerald-500 text-slate-950' : 'bg-white/10 text-white/40'
              }`}>
                2
              </div>
              <h2 className={`text-xl font-semibold ${!file && 'text-white/40'}`}>
                Настройте параметры квиза
              </h2>
            </div>

            <div className={`space-y-6 ${!file && 'pointer-events-none opacity-40'}`}>
              <SubjectSelector value={subject} onChange={setSubject} />
              <DifficultySelector value={difficulty} onChange={setDifficulty} />
              <QuestionSlider value={questionCount} onChange={setQuestionCount} />
            </div>
          </div>

          {/* Loading State */}
          {isGenerating && (
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
              <div className="flex items-center gap-4">
                <svg className="h-8 w-8 animate-spin text-emerald-400" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <div className="flex-1">
                  <p className="font-medium text-emerald-400">Генерация квиза...</p>
                  <p className="mt-1 text-sm text-emerald-400/70">
                    Это может занять до 90 секунд. Пожалуйста, не закрывайте страницу.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Generate Button */}
          <div className="flex justify-end gap-4">
            <Link href={`/${locale}`}>
              <Button variant="outline" disabled={isGenerating}>
                Отмена
              </Button>
            </Link>
            <Button
              onClick={handleGenerate}
              disabled={!isFormValid || isGenerating}
            >
              {isGenerating ? (
                <>
                  <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Генерация...
                </>
              ) : (
                'Сгенерировать квиз'
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
