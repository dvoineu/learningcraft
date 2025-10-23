/**
 * Quiz Generation Module Types
 */

import type { QuizDifficulty, QuizSubject } from '@/core/config/constants';

export interface QuizConfig {
  subject: QuizSubject;
  difficulty: QuizDifficulty;
  numberOfQuestions: number;
  sourceText?: string;
  sourceFile?: File;
}

export interface QuizGenerationRequest {
  file: File;
  subject: QuizSubject;
  difficulty: QuizDifficulty;
  questionCount: number;
  userId?: string;
}

export interface QuizGenerationResponse {
  success: boolean;
  quizId: string;
  questionCount: number;
}

export interface QuizGenerationError {
  message: string;
  code?: string;
}

export interface FileUploadState {
  file: File | null;
  isUploading: boolean;
  progress: number;
  error: string | null;
}

export interface PDFParseResult {
  text: string;
  pageCount: number;
  metadata?: {
    title?: string;
    author?: string;
    subject?: string;
  };
}
