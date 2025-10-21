import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@/lib/supabase/server';
import type { QuizzesResponse, DashboardQuiz } from '@/lib/types/dashboard';

export async function GET(request: NextRequest) {
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

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const subject = searchParams.get('subject');
    const difficulty = searchParams.get('difficulty');
    const status = searchParams.get('status');
    const sortBy = searchParams.get('sortBy') || 'date_desc';

    const offset = (page - 1) * limit;

    // Build base query - simplified to just get quizzes
    let query = supabase
      .from('quizzes')
      .select('id, title, subject, difficulty, created_at', { count: 'exact' })
      .eq('user_id', user.id);

    // Apply filters
    if (subject && subject !== 'all') {
      query = query.eq('subject', subject);
    }

    if (difficulty && difficulty !== 'all') {
      query = query.eq('difficulty', difficulty);
    }

    // Apply sorting
    switch (sortBy) {
      case 'date_asc':
        query = query.order('created_at', { ascending: true });
        break;
      case 'title':
        query = query.order('title', { ascending: true });
        break;
      case 'date_desc':
      default:
        query = query.order('created_at', { ascending: false });
        break;
    }

    // Execute query with pagination
    const { data: quizzes, error, count } = await query.range(offset, offset + limit - 1);

    console.log('Query result:', { quizzes, error, count, userId: user.id });

    if (error) {
      console.error('Error fetching quizzes:', error);
      return NextResponse.json({ error: 'Failed to fetch quizzes' }, { status: 500 });
    }

    // Transform data to match DashboardQuiz interface
    const transformedQuizzes: DashboardQuiz[] = await Promise.all(
      (quizzes || []).map(async (quiz: any) => {
        // Get question count
        const { count: questionCount } = await supabase
          .from('questions')
          .select('*', { count: 'exact', head: true })
          .eq('quiz_id', quiz.id);

        // Get last attempt
        const { data: lastAttempt } = await supabase
          .from('quiz_attempts')
          .select('score, total_questions, percentage, completed_at')
          .eq('quiz_id', quiz.id)
          .eq('user_id', user.id)
          .order('completed_at', { ascending: false })
          .limit(1)
          .single();

        // Get attempt count
        const { count: attemptCount } = await supabase
          .from('quiz_attempts')
          .select('*', { count: 'exact', head: true })
          .eq('quiz_id', quiz.id)
          .eq('user_id', user.id);

        return {
          id: quiz.id,
          title: quiz.title,
          subject: quiz.subject,
          difficulty: quiz.difficulty,
          created_at: quiz.created_at,
          question_count: questionCount || 0,
          last_attempt: lastAttempt
            ? {
                score: lastAttempt.score,
                total: lastAttempt.total_questions,
                percentage: lastAttempt.percentage,
                completed_at: lastAttempt.completed_at,
              }
            : null,
          attempt_count: attemptCount || 0,
        };
      })
    );

    // Apply status filter after transformation (since it depends on attempts)
    let filteredQuizzes = transformedQuizzes;
    if (status && status !== 'all') {
      filteredQuizzes = transformedQuizzes.filter((quiz) => {
        switch (status) {
          case 'completed':
            return quiz.attempt_count > 0;
          case 'not_completed':
            return quiz.attempt_count === 0;
          case 'excellent':
            return quiz.last_attempt && quiz.last_attempt.percentage >= 80;
          default:
            return true;
        }
      });
    }

    // Apply additional sorting for score and attempts
    if (sortBy === 'score') {
      filteredQuizzes.sort((a, b) => {
        const aScore = a.last_attempt?.percentage || 0;
        const bScore = b.last_attempt?.percentage || 0;
        return bScore - aScore;
      });
    } else if (sortBy === 'attempts') {
      filteredQuizzes.sort((a, b) => b.attempt_count - a.attempt_count);
    }

    const response: QuizzesResponse = {
      quizzes: filteredQuizzes,
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
