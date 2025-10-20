'use client';

interface QuestionGridProps {
  totalQuestions: number;
  currentIndex: number;
  answeredQuestions: Set<number>;
  onSelectQuestion: (index: number) => void;
}

export function QuestionGrid({
  totalQuestions,
  currentIndex,
  answeredQuestions,
  onSelectQuestion,
}: QuestionGridProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="mb-4 text-sm font-medium text-white/60">
        Навигация по вопросам
      </h3>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: totalQuestions }, (_, i) => {
          const isCurrent = i === currentIndex;
          const isAnswered = answeredQuestions.has(i);

          return (
            <button
              key={i}
              onClick={() => onSelectQuestion(i)}
              className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-all ${
                isCurrent
                  ? 'bg-emerald-500 text-slate-950'
                  : isAnswered
                    ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              {isAnswered && !isCurrent && (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
              {!isAnswered && <span>{i + 1}</span>}
              {isCurrent && <span>{i + 1}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
