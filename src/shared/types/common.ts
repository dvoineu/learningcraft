import { QuizDifficulty, QuizSubject } from '@/core/config/constants';

/**
 * Core application types
 */

export interface Quiz {
  id: string;
  title: string;
  subject: QuizSubject;
  difficulty: QuizDifficulty;
  questions: Question[];
  createdAt: Date;
  userId?: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizConfig {
  subject: QuizSubject;
  difficulty: QuizDifficulty;
  numberOfQuestions: number;
  sourceText?: string;
  sourceFile?: File;
}

export interface QuizResult {
  quizId: string;
  userId?: string;
  answers: UserAnswer[];
  score: number;
  totalQuestions: number;
  completedAt: Date;
}

export interface UserAnswer {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent?: number;
}
