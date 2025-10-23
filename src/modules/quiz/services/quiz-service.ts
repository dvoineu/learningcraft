/**
 * Quiz Service
 * 
 * Handles quiz operations using Supabase.
 */

import { createClient } from '@/shared/data-access';
import type { Quiz, QuizAttempt, QuizResult } from '../types';

export class QuizService {
  private supabase = createClient();

  /**
   * Get quiz by ID
   */
  async getQuiz(id: string): Promise<Quiz | null> {
    const { data: quiz, error } = await this.supabase
      .from('quizzes')
      .select(`
        *,
        questions (
          id,
          question_text,
          options,
          correct_answer,
          explanation,
          order_index
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching quiz:', error);
      return null;
    }

    return this.mapQuiz(quiz);
  }

  /**
   * Submit quiz attempt
   */
  async submitQuiz(quizResult: QuizResult): Promise<QuizAttempt> {
    const { data, error } = await this.supabase
      .from('quiz_attempts')
      .insert({
        quiz_id: quizResult.quizId,
        user_id: quizResult.userId,
        answers: quizResult.answers,
        score: quizResult.score,
        total_questions: quizResult.totalQuestions,
        percentage: Math.round((quizResult.score / quizResult.totalQuestions) * 100),
        completed_at: quizResult.completedAt.toISOString(),
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to submit quiz: ${error.message}`);
    }

    return this.mapQuizAttempt(data);
  }

  /**
   * Get quiz attempts for a quiz
   */
  async getQuizAttempts(quizId: string): Promise<QuizAttempt[]> {
    const { data, error } = await this.supabase
      .from('quiz_attempts')
      .select('*')
      .eq('quiz_id', quizId)
      .order('completed_at', { ascending: false });

    if (error) {
      console.error('Error fetching quiz attempts:', error);
      return [];
    }

    return data.map(this.mapQuizAttempt);
  }

  /**
   * Map database quiz to Quiz type
   */
  private mapQuiz(data: any): Quiz {
    return {
      id: data.id,
      title: data.title,
      subject: data.subject,
      difficulty: data.difficulty,
      questions: data.questions
        .sort((a: any, b: any) => a.order_index - b.order_index)
        .map((q: any) => ({
          id: q.id,
          text: q.question_text,
          options: q.options,
          correctAnswer: q.correct_answer,
          explanation: q.explanation,
        })),
      createdAt: new Date(data.created_at),
      userId: data.user_id,
    };
  }

  /**
   * Map database quiz attempt to QuizAttempt type
   */
  private mapQuizAttempt(data: any): QuizAttempt {
    return {
      id: data.id,
      quizId: data.quiz_id,
      userId: data.user_id,
      answers: data.answers,
      score: data.score,
      totalQuestions: data.total_questions,
      percentage: data.percentage,
      completedAt: new Date(data.completed_at),
    };
  }
}

export const quizService = new QuizService();
