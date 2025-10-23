/**
 * Environment Variables Validation
 * 
 * Validates and provides type-safe access to environment variables.
 */

/**
 * Environment configuration interface
 */
export interface EnvConfig {
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  
  // OpenRouter API
  OPENROUTER_API_KEY: string;
  
  // App
  NEXT_PUBLIC_APP_URL: string;
  
  // Node environment
  NODE_ENV: 'development' | 'production' | 'test';
}

/**
 * Validates required environment variables
 */
function validateEnv(): EnvConfig {
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'OPENROUTER_API_KEY',
    'NEXT_PUBLIC_APP_URL',
  ] as const;

  const missing: string[] = [];
  
  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env.local file and ensure all required variables are set.'
    );
  }

  return {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY!,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL!,
    NODE_ENV: (process.env.NODE_ENV as EnvConfig['NODE_ENV']) || 'development',
  };
}

/**
 * Validated environment configuration
 */
export const env = validateEnv();

/**
 * Feature flags
 */
export const features = {
  // Enable/disable features based on environment
  enableAnalytics: env.NODE_ENV === 'production',
  enableDebugLogs: env.NODE_ENV === 'development',
  enableHotReload: env.NODE_ENV === 'development',
  
  // AI features
  enableAIGeneration: !!env.OPENROUTER_API_KEY,
  
  // Auth features
  enableGoogleAuth: true,
  enableEmailAuth: true,
} as const;

/**
 * App configuration
 */
export const appConfig = {
  name: 'LearningCraft',
  description: 'AI-powered quiz generation platform',
  version: '1.0.0',
  url: env.NEXT_PUBLIC_APP_URL,
  environment: env.NODE_ENV,
} as const;
