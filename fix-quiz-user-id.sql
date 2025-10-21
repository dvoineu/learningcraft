-- SQL скрипт для проверки и исправления user_id в квизах
-- Выполните этот скрипт в Supabase SQL Editor

-- 1. Проверяем текущие квизы и их user_id
SELECT 
  id,
  title,
  subject,
  user_id,
  created_at
FROM quizzes
ORDER BY created_at DESC;

-- 2. Если user_id = NULL, обновляем на текущего пользователя
-- ВАЖНО: Замените 'd1ed8423-2b23-48df-bebb-2e9de3825116' на ваш реальный user_id из логов
UPDATE quizzes
SET user_id = 'd1ed8423-2b23-48df-bebb-2e9de3825116'
WHERE user_id IS NULL;

-- 3. Проверяем результат
SELECT 
  id,
  title,
  subject,
  user_id,
  created_at
FROM quizzes
WHERE user_id = 'd1ed8423-2b23-48df-bebb-2e9de3825116'
ORDER BY created_at DESC;
