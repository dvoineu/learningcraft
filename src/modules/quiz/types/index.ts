/**
 * Quiz Module Types
 */

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  difficulty: string;
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

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId?: string;
  answers: UserAnswer[];
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: Date;
}

export interface UserAnswer {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent?: number;
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<string, number>;
  isCompleted: boolean;
  timeStarted: Date;
  timeSpent: number;
}

export interface QuizResult {
  quizId: string;
  userId?: string;
  answers: UserAnswer[];
  score: number;
  totalQuestions: number;
  completedAt: Date;
}
