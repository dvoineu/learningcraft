/**
 * Database Types
 * 
 * TypeScript types for Supabase database schema.
 */

export interface Database {
  public: {
    Tables: {
      quizzes: {
        Row: {
          id: string;
          title: string;
          subject: string;
          difficulty: string;
          user_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          subject: string;
          difficulty: string;
          user_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          subject?: string;
          difficulty?: string;
          user_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      questions: {
        Row: {
          id: string;
          quiz_id: string;
          question_text: string;
          options: any;
          correct_answer: number;
          explanation: string | null;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          quiz_id: string;
          question_text: string;
          options: any;
          correct_answer: number;
          explanation?: string | null;
          order_index: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          quiz_id?: string;
          question_text?: string;
          options?: any;
          correct_answer?: number;
          explanation?: string | null;
          order_index?: number;
          created_at?: string;
        };
      };
      quiz_attempts: {
        Row: {
          id: string;
          quiz_id: string;
          user_id: string | null;
          answers: any;
          score: number;
          total_questions: number;
          percentage: number;
          completed_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          quiz_id: string;
          user_id?: string | null;
          answers: any;
          score: number;
          total_questions: number;
          percentage: number;
          completed_at: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          quiz_id?: string;
          user_id?: string | null;
          answers?: any;
          score?: number;
          total_questions?: number;
          percentage?: number;
          completed_at?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
