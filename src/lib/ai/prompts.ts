import { QuizDifficulty, QuizSubject } from '../constants';

/**
 * AI prompts for quiz generation
 */

export function getQuizGenerationPrompt(
  subject: QuizSubject,
  difficulty: QuizDifficulty,
  numberOfQuestions: number,
  sourceText?: string
): string {
  const basePrompt = `Generate ${numberOfQuestions} multiple-choice questions about ${subject} at ${difficulty} difficulty level.`;
  
  const contextPrompt = sourceText 
    ? `\n\nUse the following text as the source material:\n\n${sourceText}`
    : '';

  const formatPrompt = `\n\nReturn the response as a JSON array with the following structure:
[
  {
    "text": "Question text",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "correctAnswer": 0,
    "explanation": "Brief explanation of the correct answer"
  }
]

Requirements:
- Each question must have exactly 4 options
- correctAnswer is the index (0-3) of the correct option
- Questions should be clear and unambiguous
- Options should be plausible but only one correct
- Provide a brief explanation for each answer`;

  return basePrompt + contextPrompt + formatPrompt;
}

export function getQuizRefinementPrompt(question: string): string {
  return `Improve the following quiz question to make it clearer and more educational:\n\n${question}\n\nProvide an improved version with better wording and more educational value.`;
}
