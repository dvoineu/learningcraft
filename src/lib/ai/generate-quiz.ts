/**
 * Quiz generation using OpenRouter API
 */

import { generateQuizPrompt } from './prompts';
import type { QuizDifficulty, QuizSubject } from '../constants';

export interface QuizQuestion {
  question_text: string;
  options: Array<{
    letter: string;
    text: string;
    isCorrect: boolean;
  }>;
  correct_answer: string;
  explanation: string;
}

export interface GeneratedQuiz {
  questions: QuizQuestion[];
}

/**
 * Generate quiz using OpenRouter API
 */
export async function generateQuizWithAI(
  text: string,
  subject: QuizSubject,
  difficulty: QuizDifficulty,
  questionCount: number
): Promise<GeneratedQuiz> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY not configured');
  }

  const prompt = generateQuizPrompt(text, subject, difficulty, questionCount);

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'X-Title': 'LearningCraft',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 8000, // Increased for longer responses
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenRouter API error: ${error}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No content in API response');
    }

    console.log('[AI Generation] Raw response:', content.substring(0, 500));

    // Clean up response - remove markdown code blocks if present
    let cleanContent = content.trim();
    
    // Remove ```json and ``` markers
    if (cleanContent.startsWith('```')) {
      cleanContent = cleanContent.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    }

    console.log('[AI Generation] Cleaned response:', cleanContent.substring(0, 500));

    // Parse JSON response
    const quiz = JSON.parse(cleanContent) as GeneratedQuiz;

    // Validate quiz structure
    validateQuizStructure(quiz, questionCount);

    return quiz;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Не удалось сгенерировать квиз: ${error.message}`);
    }
    throw new Error('Не удалось сгенерировать квиз. Попробуйте еще раз');
  }
}

/**
 * Validate quiz structure
 */
function validateQuizStructure(quiz: GeneratedQuiz, expectedCount: number): void {
  if (!quiz.questions || !Array.isArray(quiz.questions)) {
    throw new Error('Invalid quiz structure: missing questions array');
  }

  if (quiz.questions.length !== expectedCount) {
    throw new Error(`Expected ${expectedCount} questions, got ${quiz.questions.length}`);
  }

  quiz.questions.forEach((q, index) => {
    // Validate question text
    if (!q.question_text || typeof q.question_text !== 'string') {
      throw new Error(`Question ${index + 1}: missing or invalid question_text`);
    }

    // Validate options
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      throw new Error(`Question ${index + 1}: must have exactly 4 options`);
    }

    // Validate each option
    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach((opt, optIndex) => {
      if (opt.letter !== letters[optIndex]) {
        throw new Error(`Question ${index + 1}, option ${optIndex + 1}: invalid letter`);
      }
      if (!opt.text || typeof opt.text !== 'string') {
        throw new Error(`Question ${index + 1}, option ${optIndex + 1}: missing text`);
      }
      if (typeof opt.isCorrect !== 'boolean') {
        throw new Error(`Question ${index + 1}, option ${optIndex + 1}: invalid isCorrect`);
      }
    });

    // Validate exactly one correct answer
    const correctCount = q.options.filter(opt => opt.isCorrect).length;
    if (correctCount !== 1) {
      throw new Error(`Question ${index + 1}: must have exactly one correct answer`);
    }

    // Validate correct_answer matches
    const correctOption = q.options.find(opt => opt.isCorrect);
    if (correctOption?.letter !== q.correct_answer) {
      throw new Error(`Question ${index + 1}: correct_answer doesn't match isCorrect flag`);
    }

    // Validate explanation
    if (!q.explanation || typeof q.explanation !== 'string') {
      throw new Error(`Question ${index + 1}: missing explanation`);
    }
  });
}
