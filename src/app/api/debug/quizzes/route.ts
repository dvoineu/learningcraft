import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@/lib/supabase/server';

// Временный endpoint для отладки - удалите после исправления проблемы
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

    // Get ALL quizzes (without user_id filter)
    const { data: allQuizzes, error: allError } = await supabase
      .from('quizzes')
      .select('id, title, subject, user_id, created_at')
      .order('created_at', { ascending: false });

    // Get quizzes for current user
    const { data: userQuizzes, error: userError } = await supabase
      .from('quizzes')
      .select('id, title, subject, user_id, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    return NextResponse.json({
      currentUserId: user.id,
      currentUserEmail: user.email,
      allQuizzes: allQuizzes || [],
      userQuizzes: userQuizzes || [],
      allQuizzesError: allError,
      userQuizzesError: userError,
    });
  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
