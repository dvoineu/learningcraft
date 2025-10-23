'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { QuizStats, QuizFilters, QuizList, DeleteQuizModal, Pagination, EmptyState } from '@/modules/dashboard';
import type { DashboardQuiz, DashboardStats, DashboardFilters as Filters } from '@/modules/dashboard';

interface DashboardPageProps {
  params: Promise<{ locale: string }>;
}

export default function DashboardPage({ params }: DashboardPageProps) {
  const [locale, setLocale] = useState<string>('ru');
  const [dict, setDict] = useState<any>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [quizzes, setQuizzes] = useState<DashboardQuiz[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState<DashboardQuiz | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    sortBy: 'date_desc',
  });

  // Load locale and dictionary
  useEffect(() => {
    params.then((p) => {
      setLocale(p.locale);
      import(`@/shared/i18n/dictionaries/${p.locale}.ts`).then((module) => {
        setDict(module.dictionary);
      });
    });
  }, [params]);

  // Fetch stats
  useEffect(() => {
    if (!dict) return;

    fetch('/api/user/stats')
      .then((res) => {
        if (res.status === 401) {
          router.push(`/${locale}/auth/signin`);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setStats(data);
      })
      .catch((err) => {
        console.error('Failed to fetch stats:', err);
      });
  }, [dict, locale, router]);

  // Fetch quizzes
  useEffect(() => {
    if (!dict) return;

    setIsLoading(true);
    setError(null);

    const params = new URLSearchParams();
    params.set('page', currentPage.toString());
    params.set('limit', '12');
    if (filters.subject) params.set('subject', filters.subject);
    if (filters.difficulty) params.set('difficulty', filters.difficulty);
    if (filters.status) params.set('status', filters.status);
    if (filters.sortBy) params.set('sortBy', filters.sortBy);

    fetch(`/api/user/quizzes?${params.toString()}`)
      .then(async (res) => {
        if (res.status === 401) {
          router.push(`/${locale}/auth/signin`);
          return null;
        }
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || 'Failed to fetch quizzes');
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          console.log('Fetched quizzes:', data);
          setQuizzes(data.quizzes || []);
          setTotalPages(data.totalPages || 1);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch quizzes:', err);
        setError(err.message || 'Failed to fetch quizzes');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [filters, currentPage, dict, locale, router]);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
    // Scroll to top on filter change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = (quizId: string) => {
    const quiz = quizzes.find((q) => q.id === quizId);
    if (quiz) {
      setQuizToDelete(quiz);
      setDeleteModalOpen(true);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!quizToDelete) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/quiz/${quizToDelete.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete quiz');

      // Remove quiz from list optimistically
      setQuizzes((prev) => prev.filter((q) => q.id !== quizToDelete.id));
      
      // Update stats
      if (stats) {
        setStats({
          ...stats,
          totalQuizzes: stats.totalQuizzes - 1,
        });
      }

      setDeleteModalOpen(false);
      setQuizToDelete(null);

      // TODO: Show success toast
    } catch (err) {
      console.error('Failed to delete quiz:', err);
      // TODO: Show error toast
    } finally {
      setIsDeleting(false);
    }
  };

  const handleResetFilters = () => {
    setFilters({
      sortBy: 'date_desc',
    });
    setCurrentPage(1);
  };

  if (!dict) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  const hasActiveFilters =
    filters.subject || filters.difficulty || (filters.status && filters.status !== 'all');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {dict.dashboard?.title || 'Мои квизы'}
          </h1>
          <p className="text-gray-600">
            {dict.dashboard?.description || 'Управляйте своими квизами и отслеживайте прогресс'}
          </p>
        </div>

        {/* Stats */}
        {stats && stats.totalQuizzes > 0 && (
          <QuizStats stats={stats} dict={dict.dashboard?.stats || {}} />
        )}

        {/* Filters */}
        {stats && stats.totalQuizzes > 0 && (
          <QuizFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            dict={dict.dashboard?.filters || {}}
          />
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Quiz List */}
        {!isLoading && quizzes.length === 0 && !hasActiveFilters && stats?.totalQuizzes === 0 && (
          <EmptyState
            type="no-quizzes"
            dict={dict.dashboard?.empty || {}}
            locale={locale}
          />
        )}

        {!isLoading && quizzes.length === 0 && (hasActiveFilters || (stats && stats.totalQuizzes > 0)) && (
          <EmptyState
            type="no-results"
            dict={dict.dashboard?.empty || {}}
            locale={locale}
            onResetFilters={handleResetFilters}
          />
        )}

        {(isLoading || quizzes.length > 0) && (
          <QuizList
            quizzes={quizzes}
            dict={dict.dashboard || {}}
            locale={locale}
            isLoading={isLoading}
            onDelete={handleDeleteClick}
          />
        )}

        {/* Pagination */}
        {!isLoading && quizzes.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            dict={dict.dashboard?.pagination || {}}
          />
        )}

        {/* Delete Modal */}
        <DeleteQuizModal
          quiz={quizToDelete}
          isOpen={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
            setQuizToDelete(null);
          }}
          onConfirm={handleDeleteConfirm}
          isDeleting={isDeleting}
          dict={dict.dashboard?.deleteModal || {}}
        />
      </div>
    </div>
  );
}
