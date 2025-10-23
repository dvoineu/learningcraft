/**
 * Dashboard Service
 * 
 * Handles dashboard data operations using Supabase.
 */

import { createClient } from '@/shared/data-access';
import type { DashboardQuiz, DashboardStats, DashboardFilters, PaginationState } from '../types';

export class DashboardService {
  private supabase = createClient();

  /**
   * Get user's quizzes with pagination
   */
  async getQuizzes(
    userId: string,
    filters: DashboardFilters = {},
    pagination: { page: number; pageSize: number } = { page: 1, pageSize: 10 }
  ): Promise<{ quizzes: DashboardQuiz[]; pagination: PaginationState }> {
    let query = this.supabase
      .from('quizzes')
      .select(`
        id,
        title,
        subject,
        difficulty,
        created_at,
        questions!inner(count)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    // Apply filters
    if (filters.subject) {
      query = query.eq('subject', filters.subject);
    }
    if (filters.difficulty) {
      query = query.eq('difficulty', filters.difficulty);
    }
    if (filters.dateRange) {
      query = query
        .gte('created_at', filters.dateRange.from.toISOString())
        .lte('created_at', filters.dateRange.to.toISOString());
    }

    // Get total count
    const countQuery = this.supabase
      .from('quizzes')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);
    
    if (filters.subject) {
      countQuery.eq('subject', filters.subject);
    }
    if (filters.difficulty) {
      countQuery.eq('difficulty', filters.difficulty);
    }
    if (filters.dateRange) {
      countQuery
        .gte('created_at', filters.dateRange.from.toISOString())
        .lte('created_at', filters.dateRange.to.toISOString());
    }
    
    const { count } = await countQuery;

    // Apply pagination
    const from = (pagination.page - 1) * pagination.pageSize;
    const to = from + pagination.pageSize - 1;
    
    const { data, error } = await query.range(from, to);

    if (error) {
      console.error('Error fetching quizzes:', error);
      return { quizzes: [], pagination: { page: 1, pageSize: 10, total: 0, totalPages: 0 } };
    }

    // Get quiz attempts for each quiz
    const quizzesWithStats = await Promise.all(
      (data || []).map(async (quiz) => {
        const { data: attempts } = await this.supabase
          .from('quiz_attempts')
          .select('score, percentage, completed_at')
          .eq('quiz_id', quiz.id)
          .order('completed_at', { ascending: false });

        const bestScore = attempts && attempts.length > 0 
          ? Math.max(...attempts.map(a => a.percentage))
          : undefined;

        const lastAttempt = attempts && attempts.length > 0 
          ? new Date(attempts[0].completed_at)
          : undefined;

        return {
          id: quiz.id,
          title: quiz.title,
          subject: quiz.subject,
          difficulty: quiz.difficulty,
          questionCount: quiz.questions[0]?.count || 0,
          createdAt: new Date(quiz.created_at),
          lastAttempt,
          bestScore,
          attemptCount: attempts?.length || 0,
        };
      })
    );

    const totalPages = Math.ceil((count || 0) / pagination.pageSize);

    return {
      quizzes: quizzesWithStats,
      pagination: {
        page: pagination.page,
        pageSize: pagination.pageSize,
        total: count || 0,
        totalPages,
      },
    };
  }

  /**
   * Get dashboard statistics
   */
  async getStats(userId: string): Promise<DashboardStats> {
    // Get total quizzes
    const { count: totalQuizzes } = await this.supabase
      .from('quizzes')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    // Get quiz IDs for this user
    const { data: userQuizzes } = await this.supabase
      .from('quizzes')
      .select('id')
      .eq('user_id', userId);
    
    const quizIds = userQuizzes?.map(q => q.id) || [];
    
    // Get quiz attempts
    const { data: attempts } = quizIds.length > 0
      ? await this.supabase
          .from('quiz_attempts')
          .select('score, percentage, completed_at')
          .in('quiz_id', quizIds)
          .order('completed_at', { ascending: false })
      : { data: null };

    const totalAttempts = attempts?.length || 0;
    const averageScore = attempts && attempts.length > 0
      ? Math.round(attempts.reduce((sum, a) => sum + a.percentage, 0) / attempts.length)
      : 0;
    const bestScore = attempts && attempts.length > 0
      ? Math.max(...attempts.map(a => a.percentage))
      : 0;

    // Get recent activity
    const recentActivity = await this.getRecentActivity(userId);

    return {
      totalQuizzes: totalQuizzes || 0,
      totalAttempts,
      averageScore,
      bestScore,
      recentActivity,
    };
  }

  /**
   * Get recent activity
   */
  private async getRecentActivity(userId: string) {
    // This would need to be implemented based on your activity tracking needs
    // For now, return empty array
    return [];
  }

  /**
   * Delete quiz
   */
  async deleteQuiz(quizId: string, userId: string): Promise<void> {
    const { error } = await this.supabase
      .from('quizzes')
      .delete()
      .eq('id', quizId)
      .eq('user_id', userId);

    if (error) {
      throw new Error(`Failed to delete quiz: ${error.message}`);
    }
  }
}

export const dashboardService = new DashboardService();
