'use client';

import type { DashboardQuiz } from '../types';

interface DeleteQuizModalProps {
  quiz: DashboardQuiz | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
  dict: any;
}

export function DeleteQuizModal({
  quiz,
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
  dict,
}: DeleteQuizModalProps) {
  if (!isOpen || !quiz) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
          <svg
            className="w-6 h-6 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
          {dict.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 text-center mb-4">
          {dict.description.replace('{title}', quiz.title)}
        </p>

        {/* Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm font-medium text-gray-900 mb-2">{dict.willBeDeleted}:</p>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>
              • {dict.allQuestions} ({quiz.questionCount})
            </li>
            <li>
              • {dict.attemptHistory} ({quiz.attemptCount})
            </li>
            {quiz.lastAttempt && <li>• {dict.uploadedFile}</li>}
          </ul>
        </div>

        <p className="text-sm text-red-600 text-center mb-6">{dict.cannotUndo}</p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {dict.cancel}
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {isDeleting ? dict.deleting : dict.deleteQuiz}
          </button>
        </div>
      </div>
    </div>
  );
}
