/**
 * Quiz types for the application
 */

export interface QuizOption {
  letter: 'A' | 'B' | 'C' | 'D';
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  options: QuizOption[];
  correct_answer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  order_index: number;
}

export interface Quiz {
  id: string;
  user_id: string | null;
  title: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  created_at: string;
  updated_at: string;
  questions?: QuizQuestion[];
}

export interface UserAnswer {
  questionId: string;
  selectedOption: 'A' | 'B' | 'C' | 'D';
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<string, 'A' | 'B' | 'C' | 'D'>;
  isCompleted: boolean;
}
