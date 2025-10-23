# Dashboard Module

User dashboard with quiz management and statistics.

## Features

- Quiz list with pagination
- Quiz filtering and search
- Statistics overview
- Quiz deletion
- Performance tracking

## Components

- `QuizList` - Paginated quiz list
- `QuizCard` - Individual quiz card
- `QuizFilters` - Filtering controls
- `QuizStats` - Statistics display
- `Pagination` - Pagination controls
- `DeleteQuizModal` - Quiz deletion confirmation
- `EmptyState` - Empty state display

## Services

- `dashboardService` - Dashboard data operations

## Usage

```tsx
import { QuizList, QuizStats, QuizFilters } from '@/modules/dashboard';

function DashboardPage() {
  return (
    <div>
      <QuizStats />
      <QuizFilters />
      <QuizList />
    </div>
  );
}
```

## Types

- `DashboardQuiz` - Quiz summary for dashboard
- `DashboardStats` - User statistics
- `QuizFilters` - Filter options
- `PaginationState` - Pagination state
- `ActivityItem` - Recent activity item
