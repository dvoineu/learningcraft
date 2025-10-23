import { generateQuiz } from '@/modules/quiz-generation/api';

export const runtime = 'nodejs';
export const maxDuration = 90; // 90 seconds max

export { generateQuiz as POST } from '@/modules/quiz-generation/api';
