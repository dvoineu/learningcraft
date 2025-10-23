# Dashboard Feature (FR-7) - Implementation Guide

## Overview
Personal dashboard with quiz history, filtering, sorting, and management capabilities.

## Features Implemented

### 1. Dashboard Page (`/[locale]/dashboard`)
- **Stats Summary**: Total quizzes, completed count, average score, current streak
- **Quiz Cards**: Display all user quizzes with metadata
- **Filtering**: By subject, difficulty, and completion status
- **Sorting**: By date, title, score, and attempt count
- **Pagination**: 12 quizzes per page
- **Empty States**: For no quizzes and no filter results

### 2. Quiz Card Features
- Subject icon and difficulty badge
- Question count and creation date
- Last attempt score and percentage
- Total attempt count
- **Actions**:
  - Start/Retake quiz
  - View results (if completed)
  - View attempt history
  - Share quiz (copy link)
  - Delete quiz

### 3. Quiz History Page (`/[locale]/quiz/[id]/history`)
- List of all attempts with scores
- Best attempt highlighted
- Average score calculation
- Link to view each attempt's results

### 4. Delete Functionality
- Confirmation modal with details
- Shows what will be deleted (questions, attempts, file)
- Optimistic UI update
- Cascading delete in database

## API Endpoints

**Note**: All API routes are located in `src/app/api/` (not in `src/app/[locale]/api/`)

### GET `/api/user/quizzes`
Fetch user's quizzes with filters and pagination.

**Query Parameters**:
- `page` (default: 1)
- `limit` (default: 12)
- `subject` (optional)
- `difficulty` (optional: easy|medium|hard)
- `status` (optional: all|completed|not_completed|excellent)
- `sortBy` (optional: date_desc|date_asc|title|score|attempts)

**Response**:
```json
{
  "quizzes": [...],
  "total": 24,
  "page": 1,
  "limit": 12,
  "totalPages": 2
}
```

### GET `/api/user/stats`
Fetch user's dashboard statistics.

**Response**:
```json
{
  "total_quizzes": 24,
  "completed_quizzes": 18,
  "average_score": 78,
  "current_streak": 5
}
```

### GET `/api/quiz/[id]`
Fetch quiz details.

**Response**:
```json
{
  "id": "uuid",
  "title": "Quiz Title",
  "subject": "Математика",
  "difficulty": "medium",
  "created_at": "2025-10-20T12:00:00Z"
}
```

### GET `/api/quiz/[id]/attempts`
Fetch all attempts for a quiz.

**Response**:
```json
[
  {
    "id": "uuid",
    "score": 8,
    "total_questions": 10,
    "percentage": 80,
    "completed_at": "2025-10-20T12:00:00Z"
  }
]
```

### DELETE `/api/quiz/[id]`
Delete a quiz (requires authentication and ownership).

**Response**:
```json
{
  "success": true
}
```

## Components

### Dashboard Components
- `QuizStats` - Statistics summary cards
- `QuizFilters` - Filter and sort controls
- `QuizList` - Grid of quiz cards
- `QuizCard` - Individual quiz card with actions
- `DeleteQuizModal` - Confirmation dialog for deletion
- `Pagination` - Page navigation
- `EmptyState` - Empty state messages

## Database Schema

All required tables already exist:
- `quizzes` - Quiz metadata
- `questions` - Quiz questions (CASCADE delete)
- `quiz_attempts` - User attempts (CASCADE delete)

## Translations

Added to both `ru.ts` and `be.ts`:
- `dashboard.title` - Page title
- `dashboard.description` - Page description
- `dashboard.stats.*` - Stats labels
- `dashboard.filters.*` - Filter labels and options
- `dashboard.card.*` - Card labels and actions
- `dashboard.pagination.*` - Pagination labels
- `dashboard.empty.*` - Empty state messages
- `dashboard.deleteModal.*` - Delete modal text

## Usage

### Accessing the Dashboard
1. User must be authenticated
2. Navigate to `/[locale]/dashboard` or click "Мои квизы" in user menu
3. If not authenticated, redirects to `/[locale]/auth/signin`

### Filtering Quizzes
1. Select subject from dropdown
2. Click difficulty buttons (easy/medium/hard)
3. Select status filter (all/completed/not_completed/excellent)
4. Choose sorting option
5. Click "Сбросить фильтры" to reset

### Deleting a Quiz
1. Click menu (⋯) on quiz card
2. Select "Удалить"
3. Confirm in modal
4. Quiz and all related data deleted

### Viewing History
1. Click menu (⋯) on quiz card
2. Select "История попыток"
3. View all attempts with scores
4. Click "Посмотреть" to view specific attempt results

## Mobile Responsiveness

- Stats: 2x2 grid on mobile, 1x4 on desktop
- Quiz cards: 1 column on mobile, 2 on tablet, 3 on desktop
- Filters: Stacked vertically on mobile
- Pagination: Compact on mobile

## Performance Considerations

- Pagination limits queries to 12 items
- Optimistic UI updates for deletions
- Debounced search (if implemented)
- Cached stats (could be added)

## Future Enhancements (Phase 3+)

- Export quiz to PDF
- Duplicate quiz
- Add to favorites
- Tags for organization
- Bulk actions
- Archive old quizzes
- Charts for attempt comparison
- Search functionality

## Testing Checklist

- [ ] Dashboard loads with correct stats
- [ ] Filters work correctly
- [ ] Sorting works correctly
- [ ] Pagination works correctly
- [ ] Quiz deletion works with confirmation
- [ ] History page shows all attempts
- [ ] Empty states display correctly
- [ ] Mobile responsive design works
- [ ] Authentication required
- [ ] Translations work for both locales

## Notes

- File deletion from Vercel Blob is marked as TODO
- Streak calculation is simplified (can be enhanced in Phase 2)
- Toast notifications are marked as TODO (can use a library like react-hot-toast)
- Search functionality is optional enhancement
