/**
 * Generate Quiz API Handler
 * 
 * Handles quiz generation requests.
 */

import { NextRequest, NextResponse } from 'next/server';
import { parsePDF } from '../services/parse-pdf';
import { generateQuizWithAI } from '../services/generate-quiz';
import { createServerClient } from '@/shared/data-access/server';
import type { QuizDifficulty, QuizSubject } from '@/core/config/constants';

export const runtime = 'nodejs';
export const maxDuration = 90; // 90 seconds max

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const file = formData.get('file') as File;
    const subject = formData.get('subject') as QuizSubject;
    const difficulty = formData.get('difficulty') as QuizDifficulty;
    const questionCount = parseInt(formData.get('questionCount') as string);
    const userId = formData.get('userId') as string | null;

    // Validate inputs
    if (!file) {
      return NextResponse.json(
        { error: 'Файл не предоставлен' },
        { status: 400 }
      );
    }

    if (!subject || !difficulty || !questionCount) {
      return NextResponse.json(
        { error: 'Не все параметры заполнены' },
        { status: 400 }
      );
    }

    // Step 1: Extract text from PDF (5-10 seconds)
    console.log('[Quiz Generation] Step 1: Extracting text from PDF...');
    let extractedText: string;
    try {
      extractedText = await parsePDF(file);
    } catch (error) {
      return NextResponse.json(
        { error: 'PDF не содержит текста. Попробуйте другой файл' },
        { status: 400 }
      );
    }

    // Step 2: Generate quiz with AI (30-60 seconds)
    console.log('[Quiz Generation] Step 2: Generating quiz with AI...');
    let generatedQuiz;
    try {
      generatedQuiz = await generateQuizWithAI(
        extractedText,
        subject,
        difficulty,
        questionCount
      );
    } catch (error) {
      console.error('[Quiz Generation] AI generation error:', error);
      return NextResponse.json(
        { error: 'Не удалось сгенерировать квиз. Попробуйте еще раз' },
        { status: 500 }
      );
    }

    // Step 3: Save to database (1-2 seconds)
    console.log('[Quiz Generation] Step 3: Saving to database...');
    const supabase = await createServerClient();

    // Create quiz
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .insert({
        title: `${subject} - ${difficulty}`,
        subject,
        difficulty,
        user_id: userId,
      })
      .select()
      .single();

    if (quizError || !quiz) {
      console.error('[Quiz Generation] Database error:', quizError);
      return NextResponse.json(
        { error: 'Ошибка при сохранении квиза' },
        { status: 500 }
      );
    }

    // Create questions
    const questionsToInsert = generatedQuiz.questions.map((q, index) => ({
      quiz_id: quiz.id,
      question_text: q.question_text,
      options: q.options,
      correct_answer: q.correct_answer,
      explanation: q.explanation,
      order_index: index + 1,
    }));

    const { error: questionsError } = await supabase
      .from('questions')
      .insert(questionsToInsert);

    if (questionsError) {
      console.error('[Quiz Generation] Questions insert error:', questionsError);
      // Rollback: delete quiz
      await supabase.from('quizzes').delete().eq('id', quiz.id);
      return NextResponse.json(
        { error: 'Ошибка при сохранении вопросов' },
        { status: 500 }
      );
    }

    console.log('[Quiz Generation] Success! Quiz ID:', quiz.id);

    return NextResponse.json({
      success: true,
      quizId: quiz.id,
      questionCount: generatedQuiz.questions.length,
    });

  } catch (error) {
    console.error('[Quiz Generation] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Произошла непредвиденная ошибка' },
      { status: 500 }
    );
  }
}
