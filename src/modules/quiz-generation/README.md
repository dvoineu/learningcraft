# Quiz Generation Module

AI-powered quiz generation from PDF documents.

## Features

- PDF text extraction
- AI-powered question generation
- Multiple difficulty levels
- Subject-specific quizzes
- Configurable question count

## Components

- `FileDropzone` - PDF file upload with drag-and-drop
- `SubjectSelector` - Subject selection dropdown
- `DifficultySelector` - Difficulty level selection
- `QuestionSlider` - Question count configuration

## Services

- `parsePDF()` - Extract text from PDF files
- `generateQuizWithAI()` - Generate quiz using AI
- `generateQuizPrompt()` - AI prompt templates

## API

- `generateQuiz` - POST endpoint for quiz generation

## Usage

```tsx
import { FileDropzone, SubjectSelector, DifficultySelector } from '@/modules/quiz-generation';

function UploadPage() {
  return (
    <div>
      <FileDropzone onFileSelect={handleFile} />
      <SubjectSelector value={subject} onChange={setSubject} />
      <DifficultySelector value={difficulty} onChange={setDifficulty} />
    </div>
  );
}
```

## Types

- `QuizConfig` - Quiz configuration options
- `QuizGenerationRequest` - API request format
- `QuizGenerationResponse` - API response format
- `FileUploadState` - File upload state management
