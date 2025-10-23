'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ScoreCircle, QuestionReview } from '@/modules/quiz';
import { Button } from '@/shared/ui';
import type { Quiz, Question } from '@/modules/quiz';

type QuizQuestion = Question;

export default function ResultsPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = params.locale as string;
  const quizId = params.id as string;

  const score = parseInt(searchParams.get('score') || '0');
  const total = parseInt(searchParams.get('total') || '0');
  const percentage = Math.round((score / total) * 100);

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  // Fetch quiz data
  useEffect(() => {
    async function fetchQuiz() {
      try {
        const response = await fetch(`/api/quiz/${quizId}`);
        if (!response.ok) {
          throw new Error('Квиз не найден');
        }
        const data = await response.json();
        setQuiz(data.quiz);
        setQuestions(data.questions);

        // Get answers from sessionStorage
        const savedAnswers = sessionStorage.getItem(`quiz_${quizId}_answers`);
        if (savedAnswers) {
          setAnswers(JSON.parse(savedAnswers));
        }
      } catch (err) {
        console.error('Error fetching quiz:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchQuiz();
  }, [quizId]);

  // Show confetti for high scores
  useEffect(() => {
    if (percentage >= 80) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [percentage]);

  const getPerformanceMessage = () => {
    if (percentage >= 90) return { emoji: '🎉', text: 'Отлично! Вы отлично усвоили материал', color: 'text-emerald-400' };
    if (percentage >= 70) return { emoji: '👍', text: 'Хорошо! Небольшие пробелы в знаниях', color: 'text-blue-400' };
    if (percentage >= 50) return { emoji: '📚', text: 'Удовлетворительно. Нужно еще попрактиковаться', color: 'text-amber-400' };
    return { emoji: '📖', text: 'Нужно повторить материал', color: 'text-red-400' };
  };

  const performance = getPerformanceMessage();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
          <p className="text-white/60">Загрузка результатов...</p>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="text-center">
          <p className="mb-4 text-xl text-white">Квиз не найден</p>
          <Link href={`/${locale}`}>
            <Button>Вернуться на главную</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="pointer-events-none fixed inset-0 z-50">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10%',
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <div
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: ['#34d399', '#60a5fa', '#fbbf24', '#f87171'][Math.floor(Math.random() * 4)],
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Header */}
      <header className="border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div>
            <h1 className="text-xl font-semibold">Результаты квиза</h1>
            <p className="text-sm text-white/60">{quiz.title}</p>
          </div>
          <Link href={`/${locale}`}>
            <Button variant="outline">На главную</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Score Card */}
        <div className="mb-12 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-8 text-center">
          <div className="mb-6 flex justify-center">
            <ScoreCircle score={score} total={total} />
          </div>
          
          <div className="mb-4">
            <p className={`text-3xl font-bold ${performance.color}`}>
              {performance.emoji} {performance.text}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href={`/${locale}/quiz/${quizId}`}>
              <Button variant="outline" className="w-full sm:w-auto">
                🔄 Пройти заново
              </Button>
            </Link>
            <Link href={`/${locale}/upload`}>
              <Button className="w-full sm:w-auto">
                ✨ Создать новый квиз
              </Button>
            </Link>
          </div>
        </div>

        {/* Question Reviews */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">
            Разбор вопросов
          </h2>
          
          {questions.map((question, index) => (
            <QuestionReview
              key={question.id}
              question={question}
              userAnswer={answers[question.id]}
              index={index}
            />
          ))}
        </div>
      </main>

      {/* Confetti Animation CSS */}
      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
      `}</style>
    </div>
  );
}
