'use client';

import type { Question } from '../types';

type QuizQuestion = Question;

interface QuestionReviewProps {
  question: QuizQuestion;
  userAnswer?: 'A' | 'B' | 'C' | 'D';
  index: number;
}

export function QuestionReview({ question, userAnswer, index }: QuestionReviewProps) {
  const isCorrect = userAnswer === String.fromCharCode(65 + question.correctAnswer);
  const wasAnswered = userAnswer !== undefined;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-sm font-medium text-white/60">
            {index + 1}
          </span>
          <h3 className="flex-1 text-lg font-medium text-white">
            {question.text}
          </h3>
        </div>
        
        {/* Status Icon */}
        {wasAnswered && (
          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
            isCorrect ? 'bg-emerald-500/20' : 'bg-red-500/20'
          }`}>
            {isCorrect ? (
              <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
        )}
      </div>

      {/* Options */}
      <div className="mb-4 space-y-2">
        {question.options.map((option, optionIndex) => {
          const letter = String.fromCharCode(65 + optionIndex); // A, B, C, D
          const isUserAnswer = userAnswer === letter;
          const isCorrectAnswer = optionIndex === question.correctAnswer;
          
          let bgColor = 'bg-white/5';
          let borderColor = 'border-white/10';
          let textColor = 'text-white/70';
          
          if (isCorrectAnswer) {
            bgColor = 'bg-emerald-500/10';
            borderColor = 'border-emerald-500/50';
            textColor = 'text-emerald-400';
          } else if (isUserAnswer && !isCorrect) {
            bgColor = 'bg-red-500/10';
            borderColor = 'border-red-500/50';
            textColor = 'text-red-400';
          }

          return (
            <div
              key={optionIndex}
              className={`flex items-start gap-3 rounded-lg border p-3 ${bgColor} ${borderColor}`}
            >
              <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded text-sm font-semibold ${
                isCorrectAnswer ? 'bg-emerald-500 text-slate-950' :
                isUserAnswer && !isCorrect ? 'bg-red-500 text-white' :
                'bg-white/10 text-white/60'
              }`}>
                {letter}
              </div>
              <p className={`flex-1 pt-0.5 ${textColor}`}>
                {option}
              </p>
              {isCorrectAnswer && (
                <svg className="h-5 w-5 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {isUserAnswer && !isCorrect && (
                <svg className="h-5 w-5 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
          );
        })}
      </div>

      {/* Explanation */}
      {question.explanation && (
        <div className="rounded-lg bg-blue-500/10 p-4">
          <div className="mb-2 flex items-center gap-2">
            <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-blue-400">Объяснение</span>
          </div>
          <p className="text-sm text-white/70">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
