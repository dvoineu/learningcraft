'use client';

import { useCallback, useState } from 'react';
import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES, ERROR_MESSAGES } from '@/core/config/constants';

interface FileDropzoneProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  error: string | null;
}

export function FileDropzone({ onFileSelect, selectedFile, error }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = (file: File): string | null => {
    // Check file type
    if (!ALLOWED_FILE_TYPES.includes(file.type as any)) {
      return ERROR_MESSAGES.FILE_TYPE;
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return ERROR_MESSAGES.FILE_SIZE;
    }

    return null;
  };

  const handleFile = (file: File) => {
    const validationError = validateFile(file);
    if (!validationError) {
      onFileSelect(file);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative rounded-2xl border-2 border-dashed p-8 text-center transition ${
          isDragging
            ? 'border-emerald-400 bg-emerald-500/10'
            : error
            ? 'border-red-500/50 bg-red-500/5'
            : 'border-white/20 bg-white/5 hover:border-emerald-400/50'
        }`}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileInput}
          className="absolute inset-0 cursor-pointer opacity-0"
          id="file-upload"
        />

        <div className="pointer-events-none space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
            <svg
              className="h-8 w-8 text-emerald-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>

          <div>
            <p className="text-lg font-medium text-white">
              Перетащите PDF файл сюда
            </p>
            <p className="mt-1 text-sm text-white/60">
              или{' '}
              <label htmlFor="file-upload" className="cursor-pointer font-medium text-emerald-400 hover:text-emerald-300">
                выберите файл
              </label>
            </p>
          </div>

          <p className="text-xs text-white/40">
            Максимальный размер: 10 МБ • Формат: PDF
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {selectedFile && !error && (
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20">
              <svg
                className="h-5 w-5 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-medium text-emerald-400">{selectedFile.name}</p>
              <p className="text-xs text-emerald-400/60">
                {formatFileSize(selectedFile.size)}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFileSelect(null as any);
              }}
              className="text-emerald-400/60 hover:text-emerald-400"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
