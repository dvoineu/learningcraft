import type { DashboardStats } from '@/lib/types/dashboard';

interface QuizStatsProps {
  stats: DashboardStats;
  dict: any;
}

export function QuizStats({ stats, dict }: QuizStatsProps) {
  const statItems = [
    {
      label: dict.totalQuizzes,
      value: stats.total_quizzes,
    },
    {
      label: dict.completed,
      value: stats.completed_quizzes,
    },
    {
      label: dict.averageScore,
      value: `${stats.average_score}%`,
    },
    {
      label: dict.currentStreak,
      value: `${stats.current_streak} ${dict.days}`,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {statItems.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-lg border border-gray-200 p-6 text-center"
        >
          <div className="text-3xl font-bold text-gray-900 mb-1">{item.value}</div>
          <div className="text-sm text-gray-600">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
