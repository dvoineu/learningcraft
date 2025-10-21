import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@/lib/supabase/server';
import type { DashboardStats } from '@/lib/types/dashboard';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient(cookieStore);

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get total quizzes count
    const { count: totalQuizzes } = await supabase
      .from('quizzes')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    // Get completed quizzes count (quizzes with at least one attempt)
    const { data: completedQuizzesData } = await supabase
      .from('quiz_attempts')
      .select('quiz_id')
      .eq('user_id', user.id);

    const completedQuizzes = new Set(completedQuizzesData?.map((a) => a.quiz_id) || []).size;

    // Get average score
    const { data: attempts } = await supabase
      .from('quiz_attempts')
      .select('percentage')
      .eq('user_id', user.id);

    const averageScore =
      attempts && attempts.length > 0
        ? attempts.reduce((sum, a) => sum + (a.percentage || 0), 0) / attempts.length
        : 0;

    // Calculate current streak (simplified - days with activity)
    // For Phase 2, this would be more sophisticated
    const { data: recentAttempts } = await supabase
      .from('quiz_attempts')
      .select('completed_at')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false })
      .limit(30);

    let currentStreak = 0;
    if (recentAttempts && recentAttempts.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const dates = recentAttempts.map((a) => {
        const date = new Date(a.completed_at);
        date.setHours(0, 0, 0, 0);
        return date.getTime();
      });

      const uniqueDates = [...new Set(dates)].sort((a, b) => b - a);

      let expectedDate = today.getTime();
      for (const date of uniqueDates) {
        if (date === expectedDate || date === expectedDate - 86400000) {
          currentStreak++;
          expectedDate = date - 86400000;
        } else {
          break;
        }
      }
    }

    const stats: DashboardStats = {
      total_quizzes: totalQuizzes || 0,
      completed_quizzes: completedQuizzes,
      average_score: Math.round(averageScore),
      current_streak: currentStreak,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
