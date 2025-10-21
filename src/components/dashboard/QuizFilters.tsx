'use client';

import { QUIZ_SUBJECTS, QUIZ_DIFFICULTIES } from '@/lib/constants';
import type { QuizFilters as Filters } from '@/lib/types/dashboard';

interface QuizFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  dict: any;
}

export function QuizFilters({ filters, onFilterChange, dict }: QuizFiltersProps) {
  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      subject: e.target.value === 'all' ? undefined : (e.target.value as any),
      page: 1,
    });
  };

  const handleDifficultyChange = (difficulty: string) => {
    onFilterChange({
      ...filters,
      difficulty: difficulty === 'all' ? undefined : (difficulty as any),
      page: 1,
    });
  };

  const handleStatusChange = (status: string) => {
    onFilterChange({
      ...filters,
      status: status as any,
      page: 1,
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      sortBy: e.target.value as any,
      page: 1,
    });
  };

  const handleReset = () => {
    onFilterChange({
      page: 1,
      limit: 12,
    });
  };

  const hasActiveFilters =
    filters.subject || filters.difficulty || (filters.status && filters.status !== 'all');

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Subject Filter */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {dict.subject}
          </label>
          <select
            value={filters.subject || 'all'}
            onChange={handleSubjectChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">{dict.allSubjects}</option>
            {QUIZ_SUBJECTS.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Filter */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {dict.difficulty}
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => handleDifficultyChange('all')}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                !filters.difficulty
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {dict.all}
            </button>
            {QUIZ_DIFFICULTIES.map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => handleDifficultyChange(difficulty)}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                  filters.difficulty === difficulty
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {dict.difficulties[difficulty]}
              </button>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {dict.status}
          </label>
          <select
            value={filters.status || 'all'}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">{dict.statuses.all}</option>
            <option value="completed">{dict.statuses.completed}</option>
            <option value="not_completed">{dict.statuses.notCompleted}</option>
            <option value="excellent">{dict.statuses.excellent}</option>
          </select>
        </div>

        {/* Sort */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {dict.sortBy}
          </label>
          <select
            value={filters.sortBy || 'date_desc'}
            onChange={handleSortChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="date_desc">{dict.sorting.dateDesc}</option>
            <option value="date_asc">{dict.sorting.dateAsc}</option>
            <option value="title">{dict.sorting.title}</option>
            <option value="score">{dict.sorting.score}</option>
            <option value="attempts">{dict.sorting.attempts}</option>
          </select>
        </div>
      </div>

      {/* Reset Button */}
      {hasActiveFilters && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 underline"
          >
            {dict.resetFilters}
          </button>
        </div>
      )}
    </div>
  );
}
