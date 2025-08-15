import { supabase, checkSupabaseConnection, type DatabaseSubscriber } from './supabase';

export interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
}

// Convert database row to our interface format
function dbRowToSubscriber(row: DatabaseSubscriber): Subscriber {
  return {
    id: row.id,
    email: row.email,
    subscribedAt: row.subscribed_at,
    status: row.status,
  };
}

// In-memory storage fallback for development (when Supabase not configured)
let subscribers: Subscriber[] = [];

export function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function emailExists(email: string): Promise<boolean> {
  // Use Supabase if configured, otherwise fall back to in-memory
  if (checkSupabaseConnection()) {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('id')
        .eq('email', email.toLowerCase())
        .eq('status', 'active')
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows found"
        console.error('Supabase error checking email:', error);
        throw new Error('Database error checking email');
      }

      return !!data;
    } catch (error) {
      console.error('Error checking email exists:', error);
      throw error;
    }
  } else {
    // Fallback to in-memory storage
    return subscribers.some(subscriber => 
      subscriber.email.toLowerCase() === email.toLowerCase() && 
      subscriber.status === 'active'
    );
  }
}

export async function addSubscriber(email: string): Promise<Subscriber> {
  if (!isValidEmail(email)) {
    throw new Error('Invalid email format');
  }

  if (await emailExists(email)) {
    throw new Error('Email already subscribed');
  }

  // Use Supabase if configured, otherwise fall back to in-memory
  if (checkSupabaseConnection()) {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email: email.toLowerCase(),
          status: 'active',
        })
        .select()
        .single();

      if (error) {
        console.error('Supabase error adding subscriber:', error);
        throw new Error('Database error adding subscriber');
      }

      return dbRowToSubscriber(data);
    } catch (error) {
      console.error('Error adding subscriber:', error);
      throw error;
    }
  } else {
    // Fallback to in-memory storage
    const subscriber: Subscriber = {
      id: generateId(),
      email: email.toLowerCase(),
      subscribedAt: new Date().toISOString(),
      status: 'active'
    };

    subscribers.push(subscriber);
    return subscriber;
  }
}

export async function getSubscribers(): Promise<Subscriber[]> {
  // Use Supabase if configured, otherwise fall back to in-memory
  if (checkSupabaseConnection()) {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error getting subscribers:', error);
        throw new Error('Database error getting subscribers');
      }

      return data.map(dbRowToSubscriber);
    } catch (error) {
      console.error('Error getting subscribers:', error);
      throw error;
    }
  } else {
    // Fallback to in-memory storage
    return subscribers.filter(sub => sub.status === 'active');
  }
}

export async function getSubscriberCount(): Promise<number> {
  // Use Supabase if configured, otherwise fall back to in-memory
  if (checkSupabaseConnection()) {
    try {
      const { count, error } = await supabase
        .from('newsletter_subscribers')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');

      if (error) {
        console.error('Supabase error getting subscriber count:', error);
        throw new Error('Database error getting subscriber count');
      }

      return count || 0;
    } catch (error) {
      console.error('Error getting subscriber count:', error);
      throw error;
    }
  } else {
    // Fallback to in-memory storage
    return subscribers.filter(sub => sub.status === 'active').length;
  }
}

// Basic rate limiting stub - allow max 10 attempts per IP per hour (more generous for development)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const key = ip || 'unknown';
  const limit = rateLimitMap.get(key);

  // More generous limits for development
  const maxAttempts = 10;
  const windowMs = 60 * 60 * 1000; // 1 hour

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (limit.count >= maxAttempts) {
    return false;
  }

  limit.count++;
  return true;
}

// Function to reset rate limits (useful for development)
export function resetRateLimits(): void {
  rateLimitMap.clear();
}