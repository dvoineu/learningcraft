import { QuizConfig, Quiz, Question } from '../types';
import { getQuizGenerationPrompt } from './prompts';

/**
 * Generate quiz using AI
 * Note: This requires an AI API (OpenAI, Anthropic, etc.)
 */

export async function generateQuiz(config: QuizConfig): Promise<Quiz> {
  const { subject, difficulty, numberOfQuestions, sourceText } = config;

  // TODO: Implement AI API call
  // Example with OpenAI:
  // const response = await openai.chat.completions.create({
  //   model: "gpt-4",
  //   messages: [
  //     { role: "system", content: "You are a helpful quiz generator." },
  //     { role: "user", content: getQuizGenerationPrompt(subject, difficulty, numberOfQuestions, sourceText) }
  //   ],
  //   temperature: 0.7,
  // });
  
  // const questions = JSON.parse(response.choices[0].message.content);

  // For now, return a mock quiz
  const mockQuestions: Question[] = Array.from({ length: numberOfQuestions }, (_, i) => ({
    id: `q${i + 1}`,
    text: `Sample question ${i + 1} about ${subject}`,
    options: [
      'Option A',
      'Option B',
      'Option C',
      'Option D'
    ],
    correctAnswer: 0,
    explanation: 'This is a sample explanation.'
  }));

  return {
    id: `quiz_${Date.now()}`,
    title: `${subject} Quiz - ${difficulty}`,
    subject,
    difficulty,
    questions: mockQuestions,
    createdAt: new Date(),
  };
}

export async function validateQuizQuestions(questions: Question[]): Promise<boolean> {
  // Validate that all questions have:
  // - Non-empty text
  // - Exactly 4 options
  // - Valid correctAnswer index (0-3)
  
  return questions.every(q => 
    q.text.trim().length > 0 &&
    q.options.length === 4 &&
    q.options.every(opt => opt.trim().length > 0) &&
    q.correctAnswer >= 0 &&
    q.correctAnswer < 4
  );
}
