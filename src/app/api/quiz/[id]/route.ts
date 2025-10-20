import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createServerClient();

    // Fetch quiz
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .select('*')
      .eq('id', id)
      .single();

    if (quizError || !quiz) {
      return NextResponse.json(
        { error: 'Квиз не найден' },
        { status: 404 }
      );
    }

    // Fetch questions
    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select('*')
      .eq('quiz_id', id)
      .order('order_index', { ascending: true });

    if (questionsError) {
      return NextResponse.json(
        { error: 'Ошибка загрузки вопросов' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      quiz,
      questions: questions || [],
    });
  } catch (error) {
    console.error('[Quiz Fetch] Error:', error);
    return NextResponse.json(
      { error: 'Произошла ошибка при загрузке квиза' },
      { status: 500 }
    );
  }
}
