/**
 * Application-wide constants
 */

export const APP_NAME = 'LearningCraft';
export const APP_DESCRIPTION = 'AI-powered quiz generation platform';

// Quiz Difficulties
export const QUIZ_DIFFICULTIES = ['easy', 'medium', 'hard'] as const;
export type QuizDifficulty = typeof QUIZ_DIFFICULTIES[number];

// Quiz Subjects (ЦТ subjects for Belarus)
export const QUIZ_SUBJECTS = [
  'Математика',
  'Физика',
  'Химия',
  'Биология',
  'Русский язык',
  'Беларуская мова',
  'История Беларуси',
  'Всемирная история',
  'Обществоведение',
  'География',
  'Английский язык',
] as const;
export type QuizSubject = typeof QUIZ_SUBJECTS[number];

// Question Configuration
export const MIN_QUESTIONS = 5;
export const MAX_QUESTIONS = 10;
export const DEFAULT_QUESTIONS = 10;

// File Upload Configuration
export const SUPPORTED_FILE_TYPES = ['application/pdf'] as const;
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB (10,485,760 bytes)
export const ACCEPTED_FILE_EXTENSION = '.pdf';

// Error Messages
export const ERROR_MESSAGES = {
  FILE_TYPE: 'Пожалуйста, загрузите PDF файл',
  FILE_SIZE: 'Файл слишком большой. Максимум 10 МБ',
  REQUIRED_FIELD: 'Это поле обязательно для заполнения',
} as const;
