import { createClient } from '@supabase/supabase-js';

// Environment variables - optional for basic deployment
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Only create Supabase client if credentials are provided
export const supabase = supabaseUrl && supabaseServiceRoleKey 
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

// Log warning in development if Supabase is not configured
if (!supabase && process.env.NODE_ENV === 'development') {
  console.warn(
    'Supabase not configured. Newsletter and image features will use fallbacks. ' +
    'To enable full features, add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to your .env.local file.'
  );
}

// Database types for type safety
export interface DatabaseSubscriber {
  id: string;
  email: string;
  subscribed_at: string;
  status: 'active' | 'unsubscribed';
  created_at: string;
  updated_at: string;
}

// Type for the newsletter_subscribers table
export type Database = {
  public: {
    Tables: {
      newsletter_subscribers: {
        Row: DatabaseSubscriber;
        Insert: {
          id?: string;
          email: string;
          subscribed_at?: string;
          status?: 'active' | 'unsubscribed';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          subscribed_at?: string;
          status?: 'active' | 'unsubscribed';
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};

// Helper function to check if Supabase is properly configured
export function checkSupabaseConnection(): boolean {
  try {
    return supabase !== null;
  } catch {
    return false;
  }
}

// Helper function to get public URL for storage files
export function getStorageUrl(bucket: string, path: string): string {
  // Use environment variable directly to avoid client-side issues
  const url = typeof process !== 'undefined' ? process.env.SUPABASE_URL : null;
  
  if (!url) {
    console.warn('Supabase URL not configured, returning placeholder');
    return `https://picsum.photos/300?random=${Math.floor(Math.random() * 100)}`;
  }
  return `${url}/storage/v1/object/public/${bucket}/${path}`;
}