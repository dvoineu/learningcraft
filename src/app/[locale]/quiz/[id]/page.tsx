'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { QuizProgress } from '@/components/quiz/QuizProgress';
import { QuestionCard } from '@/components/quiz/QuestionCard';
import { QuestionGrid } from '@/components/quiz/QuestionGrid';
import { Button } from '@/components/ui/button';
import type { Quiz, QuizQuestion } from '@/lib/types/quiz';

export default function QuizPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const quizId = params.id as string;

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки квиза');
      } finally {
        setLoading(false);
      }
    }

    fetchQuiz();
  }, [quizId]);

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      // 1-4: Select option
      if (['1', '2', '3', '4'].includes(e.key)) {
        const optionIndex = parseInt(e.key) - 1;
        const option = ['A', 'B', 'C', 'D'][optionIndex] as 'A' | 'B' | 'C' | 'D';
        handleSelectAnswer(option);
      }
      // Enter: Next question
      else if (e.key === 'Enter' && currentQuestion && answers[currentQuestion.id]) {
        handleNext();
      }
      // Backspace: Previous question
      else if (e.key === 'Backspace' && currentIndex > 0) {
        e.preventDefault();
        handlePrevious();
      }
    }

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, answers]);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const answeredQuestions = new Set(
    questions
      .map((q, i) => (answers[q.id] ? i : -1))
      .filter((i) => i !== -1)
  );

  const handleSelectAnswer = (answer: 'A' | 'B' | 'C' | 'D') => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleFinish = async () => {
    // Calculate score
    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct_answer) {
        score++;
      }
    });

    // Save attempt to database
    try {
      await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizId,
          answers,
          score,
          totalQuestions: questions.length,
        }),
      });

      // Redirect to results
      router.push(`/${locale}/quiz/${quizId}/results?score=${score}&total=${questions.length}`);
    } catch (err) {
      console.error('Error submitting quiz:', err);
      alert('Ошибка при сохранении результатов');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
          <p className="text-white/60">Загрузка квиза...</p>
        </div>
      </div>
    );
  }

  if (error || !quiz || !currentQuestion) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="text-center">
          <p className="mb-4 text-xl text-white">{error || 'Квиз не найден'}</p>
          <Link href={`/${locale}`}>
            <Button>Вернуться на главную</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div>
            <h1 className="text-xl font-semibold">{quiz.title}</h1>
            <p className="text-sm text-white/60">
              {quiz.subject} • {quiz.difficulty === 'easy' ? 'Легкий' : quiz.difficulty === 'medium' ? 'Средний' : 'Сложный'}
            </p>
          </div>
          <Link href={`/${locale}`}>
            <Button variant="outline">Выйти</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr,300px]">
          {/* Left Column: Question */}
          <div className="space-y-6">
            <QuizProgress
              current={currentIndex + 1}
              total={questions.length}
            />

            <QuestionCard
              question={currentQuestion}
              selectedAnswer={answers[currentQuestion.id]}
              onSelectAnswer={handleSelectAnswer}
            />

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
              >
                ← Назад
              </Button>

              {isLastQuestion ? (
                <Button
                  onClick={handleFinish}
                  disabled={!answers[currentQuestion.id]}
                >
                  Завершить тест
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!answers[currentQuestion.id]}
                >
                  Следующий →
                </Button>
              )}
            </div>
          </div>

          {/* Right Column: Question Grid */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            <QuestionGrid
              totalQuestions={questions.length}
              currentIndex={currentIndex}
              answeredQuestions={answeredQuestions}
              onSelectQuestion={setCurrentIndex}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
