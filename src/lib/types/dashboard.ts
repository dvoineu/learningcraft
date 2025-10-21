import type { QuizSubject, QuizDifficulty } from '../constants';

export interface QuizAttemptSummary {
  score: number;
  total: number;
  percentage: number;
  completed_at: string;
}

export interface DashboardQuiz {
  id: string;
  title: string;
  subject: QuizSubject;
  difficulty: QuizDifficulty;
  created_at: string;
  question_count: number;
  last_attempt: QuizAttemptSummary | null;
  attempt_count: number;
}

export interface DashboardStats {
  total_quizzes: number;
  completed_quizzes: number;
  average_score: number;
  current_streak: number;
}

export type QuizStatus = 'all' | 'completed' | 'not_completed' | 'excellent';
export type SortBy = 'date_desc' | 'date_asc' | 'title' | 'score' | 'attempts';

export interface QuizFilters {
  subject?: QuizSubject;
  difficulty?: QuizDifficulty;
  status?: QuizStatus;
  sortBy?: SortBy;
  page?: number;
  limit?: number;
}

export interface QuizzesResponse {
  quizzes: DashboardQuiz[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
