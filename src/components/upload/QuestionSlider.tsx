'use client';

import { MIN_QUESTIONS, MAX_QUESTIONS } from '@/lib/constants';

interface QuestionSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function QuestionSlider({ value, onChange }: QuestionSliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-white">
          Количество вопросов <span className="text-red-400">*</span>
        </label>
        <span className="text-2xl font-semibold text-emerald-400">{value}</span>
      </div>

      <input
        type="range"
        min={MIN_QUESTIONS}
        max={MAX_QUESTIONS}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10"
        style={{
          background: `linear-gradient(to right, rgb(16 185 129) 0%, rgb(16 185 129) ${
            ((value - MIN_QUESTIONS) / (MAX_QUESTIONS - MIN_QUESTIONS)) * 100
          }%, rgba(255,255,255,0.1) ${
            ((value - MIN_QUESTIONS) / (MAX_QUESTIONS - MIN_QUESTIONS)) * 100
          }%, rgba(255,255,255,0.1) 100%)`,
        }}
      />

      <div className="flex justify-between text-xs text-white/60">
        <span>{MIN_QUESTIONS} вопросов</span>
        <span>{MAX_QUESTIONS} вопросов</span>
      </div>
    </div>
  );
}
