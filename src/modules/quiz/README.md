# Quiz Module

Quiz taking and results functionality.

## Features

- Interactive quiz taking
- Progress tracking
- Question navigation
- Score calculation
- Results display

## Components

- `QuestionCard` - Individual question display
- `QuizProgress` - Progress bar
- `QuestionGrid` - Question navigation grid
- `ConfirmationModal` - Quiz completion confirmation
- `ScoreCircle` - Circular score display
- `QuestionReview` - Answer review component

## Hooks

- `useQuiz()` - Quiz state management and operations

## Services

- `quizService` - Quiz data operations

## Usage

```tsx
import { useQuiz, QuestionCard, QuizProgress } from '@/modules/quiz';

function QuizPage({ quizId }: { quizId: string }) {
  const { quiz, quizState, answerQuestion, nextQuestion } = useQuiz({ quizId });
  
  if (!quiz) return <div>Loading...</div>;
  
  return (
    <div>
      <QuizProgress 
        current={quizState.currentQuestionIndex + 1} 
        total={quiz.questions.length} 
      />
      <QuestionCard 
        question={quiz.questions[quizState.currentQuestionIndex]}
        onAnswer={answerQuestion}
      />
    </div>
  );
}
```

## Types

- `Quiz` - Quiz data structure
- `Question` - Question data structure
- `QuizAttempt` - Quiz attempt record
- `QuizState` - Quiz taking state
- `QuizResult` - Quiz completion result
