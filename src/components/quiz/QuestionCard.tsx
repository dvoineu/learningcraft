'use client';

import type { QuizQuestion } from '@/lib/types/quiz';

interface QuestionCardProps {
  question: QuizQuestion;
  selectedAnswer?: 'A' | 'B' | 'C' | 'D';
  onSelectAnswer: (answer: 'A' | 'B' | 'C' | 'D') => void;
}

export function QuestionCard({
  question,
  selectedAnswer,
  onSelectAnswer,
}: QuestionCardProps) {
  return (
    <div className="space-y-6">
      {/* Question Text */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold text-white">
          {question.question_text}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option.letter;

          return (
            <button
              key={option.letter}
              onClick={() => onSelectAnswer(option.letter)}
              className={`w-full rounded-xl border-2 p-4 text-left transition-all ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-500/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-semibold ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-white/10 text-white/60'
                  }`}
                >
                  {option.letter}
                </div>
                <p className="flex-1 pt-1 text-white">{option.text}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Keyboard Hint */}
      <p className="text-center text-sm text-white/40">
        Используйте клавиши 1-4 для быстрого выбора ответа
      </p>
    </div>
  );
}
