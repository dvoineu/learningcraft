import type { DashboardQuiz } from '@/lib/types/dashboard';
import { QuizCard } from './QuizCard';

interface QuizListProps {
  quizzes: DashboardQuiz[];
  dict: any;
  locale: string;
  isLoading?: boolean;
  onDelete: (quizId: string) => void;
}

export function QuizList({ quizzes, dict, locale, isLoading, onDelete }: QuizListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse"
          >
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (quizzes.length === 0) {
    return null; // Empty state is handled by parent
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quizzes.map((quiz) => (
        <QuizCard
          key={quiz.id}
          quiz={quiz}
          dict={dict}
          locale={locale}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
