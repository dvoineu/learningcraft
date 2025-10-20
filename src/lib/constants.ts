/**
 * Application-wide constants
 */

export const APP_NAME = 'LearningCraft';
export const APP_DESCRIPTION = 'AI-powered quiz generation platform';

export const QUIZ_DIFFICULTIES = ['easy', 'medium', 'hard'] as const;
export type QuizDifficulty = typeof QUIZ_DIFFICULTIES[number];

export const QUIZ_SUBJECTS = [
  'mathematics',
  'physics',
  'chemistry',
  'biology',
  'history',
  'geography',
  'literature',
  'programming',
  'other'
] as const;
export type QuizSubject = typeof QUIZ_SUBJECTS[number];

export const MIN_QUESTIONS = 5;
export const MAX_QUESTIONS = 50;
export const DEFAULT_QUESTIONS = 10;

export const SUPPORTED_FILE_TYPES = [
  'application/pdf',
  'text/plain',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
] as const;

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
