'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { DashboardQuiz } from '../types';
import { formatRelativeTime } from '@/shared/utils';

interface QuizCardProps {
  quiz: DashboardQuiz;
  dict: any;
  locale: string;
  onDelete: (quizId: string) => void;
}

const SUBJECT_ICONS: Record<string, string> = {
  'Математика': '📐',
  'Физика': '⚛️',
  'Химия': '🧪',
  'Биология': '🧬',
  'Русский язык': '📖',
  'Беларуская мова': '📚',
  'История Беларуси': '🏛️',
  'Всемирная история': '🌍',
  'Обществоведение': '⚖️',
  'География': '🗺️',
  'Английский язык': '🇬🇧',
};

const DIFFICULTY_STYLES = {
  easy: 'bg-green-100 text-green-800 border-green-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  hard: 'bg-red-100 text-red-800 border-red-200',
};

export function QuizCard({ quiz, dict, locale, onDelete }: QuizCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const difficultyLabel = {
    easy: dict.filters?.difficulties?.easy || 'Легкий',
    medium: dict.filters?.difficulties?.medium || 'Средний',
    hard: dict.filters?.difficulties?.hard || 'Сложный',
  }[quiz.difficulty];

  const handleCopyLink = async () => {
    const url = `${window.location.origin}/${locale}/quiz/${quiz.id}`;
    await navigator.clipboard.writeText(url);
    setMenuOpen(false);
    // TODO: Show toast notification
  };

  const handleDelete = () => {
    setMenuOpen(false);
    onDelete(quiz.id);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{SUBJECT_ICONS[quiz.subject]}</span>
          <span className="text-sm font-medium text-gray-700">{quiz.subject}</span>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${
            DIFFICULTY_STYLES[quiz.difficulty as keyof typeof DIFFICULTY_STYLES]
          }`}
        >
          {difficultyLabel}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
        {quiz.title}
      </h3>

      {/* Meta Info */}
      <div className="text-sm text-gray-600 mb-4">
        {quiz.questionCount} {dict.card?.questions || 'вопросов'} • {dict.card?.created || 'Создан'}{' '}
        {formatRelativeTime(quiz.createdAt, locale)}
      </div>

      {/* Last Attempt */}
      {quiz.lastAttempt ? (
        <div className="flex items-center gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center">
              <span className="text-xl font-bold text-blue-600">
                {Math.round(quiz.bestScore || 0)}%
              </span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900">{dict.card?.lastAttempt || 'Последняя попытка'}:</div>
            <div className="text-sm text-gray-600">
              {quiz.attemptCount} {dict.card?.attempts || 'попыток'}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {formatRelativeTime(quiz.lastAttempt)}
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg text-center">
          <span className="text-sm text-gray-600">{dict.card?.notCompleted || 'Квиз еще не пройден'}</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Link
          href={`/${locale}/quiz/${quiz.id}`}
          className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors text-center"
        >
          {quiz.attemptCount > 0 ? dict.card?.retake || 'Пройти снова' : dict.card?.start || 'Начать'}
        </Link>

        {quiz.lastAttempt && (
          <Link
            href={`/${locale}/quiz/${quiz.id}/results`}
            className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors text-center"
          >
            {dict.card?.viewResults || 'Посмотреть результаты'}
          </Link>
        )}

        {/* Menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label={dict.card?.menu || 'Меню'}
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                <Link
                  href={`/${locale}/quiz/${quiz.id}/history`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  {dict.card?.history || 'История попыток'}
                </Link>
                <button
                  onClick={handleCopyLink}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {dict.card?.share || 'Поделиться'}
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  {dict.card?.delete || 'Удалить'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
