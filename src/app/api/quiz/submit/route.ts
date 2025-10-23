import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/shared/data-access/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { quizId, answers, score, totalQuestions } = body;

    if (!quizId || !answers || score === undefined || !totalQuestions) {
      return NextResponse.json(
        { error: 'Недостаточно данных' },
        { status: 400 }
      );
    }

    const supabase = await createServerClient();

    // Get current user (optional)
    const { data: { user } } = await supabase.auth.getUser();

    // Save quiz attempt
    const { data: attempt, error } = await supabase
      .from('quiz_attempts')
      .insert({
        quiz_id: quizId,
        user_id: user?.id || null,
        score,
        total_questions: totalQuestions,
        answers,
      })
      .select()
      .single();

    if (error) {
      console.error('[Quiz Submit] Database error:', error);
      return NextResponse.json(
        { error: 'Ошибка при сохранении результатов' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      attemptId: attempt.id,
    });
  } catch (error) {
    console.error('[Quiz Submit] Error:', error);
    return NextResponse.json(
      { error: 'Произошла ошибка при сохранении результатов' },
      { status: 500 }
    );
  }
}
