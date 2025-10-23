import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@/shared/data-access/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createRouteHandlerClient();
    const { id } = await params;

    // Fetch quiz details
    const { data: quiz, error } = await supabase
      .from('quizzes')
      .select('id, title, subject, difficulty, created_at')
      .eq('id', id)
      .single();

    if (error || !quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
    }

    return NextResponse.json(quiz);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createRouteHandlerClient();
    const { id } = await params;

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify quiz ownership
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .select('id, user_id, file_url')
      .eq('id', id)
      .single();

    if (quizError || !quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
    }

    if (quiz.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Delete quiz (CASCADE will delete questions and attempts)
    const { error: deleteError } = await supabase.from('quizzes').delete().eq('id', id);

    if (deleteError) {
      console.error('Error deleting quiz:', deleteError);
      return NextResponse.json({ error: 'Failed to delete quiz' }, { status: 500 });
    }

    // TODO: Delete file from storage if file_url exists
    // This would require Vercel Blob integration
    // if (quiz.file_url) {
    //   await del(quiz.file_url);
    // }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
