'use client';

import { QUIZ_DIFFICULTIES, type QuizDifficulty } from '@/lib/constants';

interface DifficultySelectorProps {
  value: QuizDifficulty;
  onChange: (difficulty: QuizDifficulty) => void;
}

const DIFFICULTY_LABELS: Record<QuizDifficulty, string> = {
  easy: 'Легкий',
  medium: 'Средний',
  hard: 'Сложный',
};

const DIFFICULTY_DESCRIPTIONS: Record<QuizDifficulty, string> = {
  easy: 'Базовые вопросы для начинающих',
  medium: 'Стандартные вопросы среднего уровня',
  hard: 'Сложные вопросы для продвинутых',
};

export function DifficultySelector({ value, onChange }: DifficultySelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-white">
        Сложность <span className="text-red-400">*</span>
      </label>
      <div className="grid gap-3 sm:grid-cols-3">
        {QUIZ_DIFFICULTIES.map((difficulty) => (
          <button
            key={difficulty}
            type="button"
            onClick={() => onChange(difficulty)}
            className={`rounded-lg border p-4 text-left transition ${
              value === difficulty
                ? 'border-emerald-500 bg-emerald-500/10'
                : 'border-white/10 bg-white/5 hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`h-4 w-4 rounded-full border-2 ${
                  value === difficulty
                    ? 'border-emerald-500 bg-emerald-500'
                    : 'border-white/30'
                }`}
              >
                {value === difficulty && (
                  <div className="flex h-full items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white" />
                  </div>
                )}
              </div>
              <span className={`font-medium ${value === difficulty ? 'text-emerald-400' : 'text-white'}`}>
                {DIFFICULTY_LABELS[difficulty]}
              </span>
            </div>
            <p className="mt-2 text-xs text-white/60">
              {DIFFICULTY_DESCRIPTIONS[difficulty]}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
