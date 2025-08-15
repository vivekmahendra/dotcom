import { createClient } from '@supabase/supabase-js';

// Environment variables with validation
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error(
    'Missing SUPABASE_URL environment variable. ' +
    'Please add it to your .env.local file. ' +
    'Get this from your Supabase project dashboard (Settings > API).'
  );
}

if (!supabaseServiceRoleKey) {
  throw new Error(
    'Missing SUPABASE_SERVICE_ROLE_KEY environment variable. ' +
    'Please add it to your .env.local file. ' +
    'Get this from your Supabase project dashboard (Settings > API). ' +
    'Use the service_role key, NOT the anon key for server-side operations.'
  );
}

// Create Supabase client with service role key for server-side operations
export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

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
    return !!(supabaseUrl && supabaseServiceRoleKey);
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