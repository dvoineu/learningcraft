'use client';

import { QUIZ_SUBJECTS, type QuizSubject } from '@/core/config/constants';

interface SubjectSelectorProps {
  value: QuizSubject | '';
  onChange: (subject: QuizSubject) => void;
}

export function SubjectSelector({ value, onChange }: SubjectSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-white">
        Предмет <span className="text-red-400">*</span>
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as QuizSubject)}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
      >
        <option value="" disabled className="bg-slate-900">
          Выберите предмет
        </option>
        {QUIZ_SUBJECTS.map((subject) => (
          <option key={subject} value={subject} className="bg-slate-900">
            {subject}
          </option>
        ))}
      </select>
    </div>
  );
}
