import Link from 'next/link';

interface EmptyStateProps {
  type: 'no-quizzes' | 'no-results';
  dict: any;
  locale: string;
  onResetFilters?: () => void;
}

export function EmptyState({ type, dict, locale, onResetFilters }: EmptyStateProps) {
  if (type === 'no-quizzes') {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-6xl mb-6">📚</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{dict.noQuizzes.title}</h3>
        <p className="text-gray-600 text-center mb-6 max-w-md">
          {dict.noQuizzes.description}
        </p>
        <Link
          href={`/${locale}/upload`}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          {dict.noQuizzes.action}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-6xl mb-6">🔍</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{dict.noResults.title}</h3>
      <p className="text-gray-600 text-center mb-6">{dict.noResults.description}</p>
      <button
        onClick={onResetFilters}
        className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
      >
        {dict.noResults.action}
      </button>
    </div>
  );
}
