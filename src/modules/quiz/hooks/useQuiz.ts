/**
 * useQuiz Hook
 * 
 * Manages quiz state and operations.
 */

import { useState, useEffect, useCallback } from 'react';
import { quizService } from '../services/quiz-service';
import type { Quiz, QuizState, QuizResult } from '../types';

interface UseQuizOptions {
  quizId: string;
  autoLoad?: boolean;
}

export function useQuiz({ quizId, autoLoad = true }: UseQuizOptions) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: {},
    isCompleted: false,
    timeStarted: new Date(),
    timeSpent: 0,
  });

  // Load quiz
  const loadQuiz = useCallback(async () => {
    if (!quizId) return;

    try {
      setIsLoading(true);
      setError(null);
      const quizData = await quizService.getQuiz(quizId);
      setQuiz(quizData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load quiz');
    } finally {
      setIsLoading(false);
    }
  }, [quizId]);

  // Auto-load quiz
  useEffect(() => {
    if (autoLoad) {
      loadQuiz();
    }
  }, [autoLoad, loadQuiz]);

  // Answer question
  const answerQuestion = useCallback((questionId: string, answerIndex: number) => {
    setQuizState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answerIndex,
      },
    }));
  }, []);

  // Navigate to question
  const goToQuestion = useCallback((index: number) => {
    if (!quiz) return;
    
    setQuizState(prev => ({
      ...prev,
      currentQuestionIndex: Math.max(0, Math.min(index, quiz.questions.length - 1)),
    }));
  }, [quiz]);

  // Next question
  const nextQuestion = useCallback(() => {
    if (!quiz) return;
    
    setQuizState(prev => ({
      ...prev,
      currentQuestionIndex: Math.min(prev.currentQuestionIndex + 1, quiz.questions.length - 1),
    }));
  }, [quiz]);

  // Previous question
  const previousQuestion = useCallback(() => {
    setQuizState(prev => ({
      ...prev,
      currentQuestionIndex: Math.max(prev.currentQuestionIndex - 1, 0),
    }));
  }, []);

  // Complete quiz
  const completeQuiz = useCallback(async (): Promise<QuizResult | null> => {
    if (!quiz) return null;

    const timeSpent = Date.now() - quizState.timeStarted.getTime();
    const answers = Object.entries(quizState.answers).map(([questionId, selectedAnswer]) => {
      const question = quiz.questions.find(q => q.id === questionId);
      return {
        questionId,
        selectedAnswer,
        isCorrect: question ? selectedAnswer === question.correctAnswer : false,
        timeSpent: timeSpent / 1000, // Convert to seconds
      };
    });

    const score = answers.filter(a => a.isCorrect).length;
    const result: QuizResult = {
      quizId: quiz.id,
      userId: quiz.userId,
      answers,
      score,
      totalQuestions: quiz.questions.length,
      completedAt: new Date(),
    };

    try {
      await quizService.submitQuiz(result);
      setQuizState(prev => ({ ...prev, isCompleted: true }));
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit quiz');
      return null;
    }
  }, [quiz, quizState.answers, quizState.timeStarted]);

  return {
    quiz,
    quizState,
    isLoading,
    error,
    loadQuiz,
    answerQuestion,
    goToQuestion,
    nextQuestion,
    previousQuestion,
    completeQuiz,
  };
}
