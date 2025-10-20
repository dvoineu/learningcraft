'use client';

import { Button } from '@/components/ui/button';

interface ConfirmationModalProps {
  isOpen: boolean;
  answeredCount: number;
  totalQuestions: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationModal({
  isOpen,
  answeredCount,
  totalQuestions,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
            <svg
              className="h-8 w-8 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="mb-2 text-center text-xl font-semibold text-white">
          Завершить квиз?
        </h2>

        {/* Message */}
        <p className="mb-6 text-center text-white/70">
          {unansweredCount === 0 ? (
            <>
              Вы ответили на <span className="font-semibold text-emerald-400">все {totalQuestions} вопросов</span>.
              <br />
              Готовы увидеть результат?
            </>
          ) : (
            <>
              Вы ответили на <span className="font-semibold text-white">{answeredCount} из {totalQuestions}</span> вопросов.
              <br />
              {unansweredCount === 1 ? (
                <span className="text-amber-400">Остался 1 вопрос без ответа.</span>
              ) : (
                <span className="text-amber-400">Осталось {unansweredCount} вопросов без ответа.</span>
              )}
            </>
          )}
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Отмена
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1"
          >
            Завершить
          </Button>
        </div>
      </div>
    </div>
  );
}
