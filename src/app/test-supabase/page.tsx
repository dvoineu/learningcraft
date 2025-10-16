'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestSupabase() {
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'success' | 'error'>('testing');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [supabaseInfo, setSupabaseInfo] = useState<any>(null);

  useEffect(() => {
    async function testConnection() {
      try {
        // Test 1: Check if supabase client is initialized
        if (!supabase) {
          throw new Error('Supabase client is not initialized');
        }

        // Test 2: Try to get the current session (this doesn't require authentication)
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
        }

        // Test 3: Try to list tables (this will work if connection is good)
        const { data, error } = await supabase
          .from('_test_connection')
          .select('*')
          .limit(1);

        // Even if the table doesn't exist, if we get a proper error response, 
        // it means the connection is working
        if (error) {
          // Check if it's a "table not found" error (which is actually good - means connection works)
          if (error.message.includes('does not exist') || 
              error.message.includes('schema cache') || 
              error.code === '42P01' ||
              error.code === 'PGRST200') {
            setConnectionStatus('success');
            setSupabaseInfo({
              message: 'Соединение успешно установлено! База данных готова к работе.',
              url: 'https://kcupjktnjucxzjiwiphi.supabase.co',
              authenticated: !!sessionData?.session,
              note: 'Таблицы еще не созданы, но это нормально. Вы можете создать их в панели Supabase.',
            });
          } else {
            throw error;
          }
        } else {
          setConnectionStatus('success');
          setSupabaseInfo({
            message: 'Соединение успешно установлено!',
            url: 'https://kcupjktnjucxzjiwiphi.supabase.co',
            authenticated: !!sessionData?.session,
            tablesFound: true,
          });
        }
      } catch (error: any) {
        console.error('Connection error:', error);
        setConnectionStatus('error');
        setErrorMessage(error.message || 'Unknown error occurred');
      }
    }

    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          Supabase Connection Test
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          {connectionStatus === 'testing' && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Testing connection to Supabase...
              </p>
            </div>
          )}

          {connectionStatus === 'success' && (
            <div className="space-y-6">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-green-100 dark:bg-green-900 rounded-full p-4">
                  <svg
                    className="w-12 h-12 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-green-600 dark:text-green-400 text-center">
                Connection Successful! ✓
              </h2>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-3">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
                  Connection Details:
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Status:</span>{' '}
                    <span className="text-green-600 dark:text-green-400">Connected</span>
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">URL:</span>{' '}
                    <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-xs">
                      {supabaseInfo?.url}
                    </code>
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Authenticated:</span>{' '}
                    {supabaseInfo?.authenticated ? 'Yes' : 'No (Anonymous)'}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mt-4">
                    {supabaseInfo?.message}
                  </p>
                  {supabaseInfo?.note && (
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm italic">
                      {supabaseInfo?.note}
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <strong>Следующие шаги:</strong> Теперь вы можете создавать таблицы в панели Supabase
                  и использовать их в вашем приложении!
                </p>
                <a 
                  href="https://supabase.com/dashboard/project/kcupjktnjucxzjiwiphi" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  → Открыть панель Supabase
                </a>
              </div>
            </div>
          )}

          {connectionStatus === 'error' && (
            <div className="space-y-6">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-red-100 dark:bg-red-900 rounded-full p-4">
                  <svg
                    className="w-12 h-12 text-red-600 dark:text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-red-600 dark:text-red-400 text-center">
                Connection Failed
              </h2>

              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-6">
                <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">
                  Error Details:
                </h3>
                <p className="text-sm text-red-700 dark:text-red-300 font-mono">
                  {errorMessage}
                </p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <p className="text-sm text-yellow-800 dark:text-yellow-300">
                  <strong>Troubleshooting:</strong>
                </p>
                <ul className="list-disc list-inside text-sm text-yellow-700 dark:text-yellow-300 mt-2 space-y-1">
                  <li>Check if your .env.local file exists and contains the correct credentials</li>
                  <li>Verify that the Supabase URL and API key are correct</li>
                  <li>Make sure @supabase/supabase-js is installed (npm install @supabase/supabase-js)</li>
                  <li>Restart your development server after adding environment variables</li>
                </ul>
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <a
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
