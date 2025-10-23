'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { formatRelativeTime } from '@/shared/utils';

interface QuizAttempt {
  id: string;
  score: number;
  total_questions: number;
  percentage: number;
  completed_at: string;
}

interface Quiz {
  id: string;
  title: string;
  subject: string;
}

interface HistoryPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default function QuizHistoryPage({ params }: HistoryPageProps) {
  const [locale, setLocale] = useState<string>('ru');
  const [quizId, setQuizId] = useState<string>('');
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    params.then((p) => {
      setLocale(p.locale);
      setQuizId(p.id);
    });
  }, [params]);

  useEffect(() => {
    if (!quizId) return;

    // Fetch quiz details and attempts
    Promise.all([
      fetch(`/api/quiz/${quizId}`).then((res) => res.json()),
      fetch(`/api/quiz/${quizId}/attempts`).then((res) => res.json()),
    ])
      .then(([quizData, attemptsData]) => {
        setQuiz(quizData);
        setAttempts(attemptsData);
      })
      .catch((err) => {
        console.error('Failed to fetch data:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [quizId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Квиз не найден</h2>
          <Link
            href={`/${locale}/dashboard`}
            className="text-blue-600 hover:underline"
          >
            Вернуться к квизам
          </Link>
        </div>
      </div>
    );
  }

  const bestAttempt = attempts.reduce(
    (best, attempt) => (attempt.percentage > best.percentage ? attempt : best),
    attempts[0]
  );

  const averageScore =
    attempts.length > 0
      ? attempts.reduce((sum, a) => sum + a.percentage, 0) / attempts.length
      : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/${locale}/dashboard`}
            className="text-blue-600 hover:underline mb-4 inline-flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Назад к квизам
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{quiz.title}</h1>
          <p className="text-gray-600">{quiz.subject}</p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {attempts.length}
            </div>
            <div className="text-sm text-gray-600">Всего попыток</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {bestAttempt ? Math.round(bestAttempt.percentage) : 0}%
            </div>
            <div className="text-sm text-gray-600">Лучший результат</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {Math.round(averageScore)}%
            </div>
            <div className="text-sm text-gray-600">Средний балл</div>
          </div>
        </div>

        {/* Attempts List */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              История попыток
            </h2>
          </div>

          {attempts.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-600">Попыток пока нет</p>
              <Link
                href={`/${locale}/quiz/${quizId}`}
                className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Пройти квиз
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {attempts.map((attempt, index) => {
                const isBest = attempt.id === bestAttempt?.id;
                const scoreColor =
                  attempt.percentage >= 80
                    ? 'text-green-600'
                    : attempt.percentage >= 60
                    ? 'text-yellow-600'
                    : 'text-red-600';

                return (
                  <div
                    key={attempt.id}
                    className="px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-medium text-gray-900">
                            Попытка #{attempts.length - index}
                          </span>
                          {isBest && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                              🏆 Лучшая
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatRelativeTime(attempt.completed_at, locale)}
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${scoreColor}`}>
                            {Math.round(attempt.percentage)}%
                          </div>
                          <div className="text-sm text-gray-600">
                            {attempt.score}/{attempt.total_questions} правильных
                          </div>
                        </div>

                        <Link
                          href={`/${locale}/quiz/${quizId}/results?attemptId=${attempt.id}`}
                          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Посмотреть
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-4">
          <Link
            href={`/${locale}/quiz/${quizId}`}
            className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-center"
          >
            Пройти снова
          </Link>
          <Link
            href={`/${locale}/dashboard`}
            className="flex-1 px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-center"
          >
            Вернуться к квизам
          </Link>
        </div>
      </div>
    </div>
  );
}
