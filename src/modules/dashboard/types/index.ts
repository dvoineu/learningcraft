/**
 * Dashboard Module Types
 */

export interface DashboardQuiz {
  id: string;
  title: string;
  subject: string;
  difficulty: string;
  questionCount: number;
  createdAt: Date;
  lastAttempt?: Date;
  bestScore?: number;
  attemptCount: number;
}

export interface DashboardStats {
  totalQuizzes: number;
  totalAttempts: number;
  averageScore: number;
  bestScore: number;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'quiz_created' | 'quiz_completed';
  title: string;
  timestamp: Date;
  score?: number;
}

export interface DashboardFilters {
  subject?: string;
  difficulty?: string;
  status?: string;
  sortBy?: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface QuizzesResponse {
  quizzes: DashboardQuiz[];
  totalPages: number;
}
