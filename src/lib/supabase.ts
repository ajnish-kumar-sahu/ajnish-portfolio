import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Please check your .env file.');
}

// Create a dummy client if credentials are missing to prevent app from crashing on load
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      from: () => ({
        insert: () => ({ select: () => Promise.resolve({ data: null, error: new Error('Supabase is not configured') }) }),
        select: () => ({
          eq: () => ({ maybeSingle: () => Promise.resolve({ data: null, error: new Error('Supabase is not configured') }) }),
          order: () => ({ range: () => Promise.resolve({ data: null, error: new Error('Supabase is not configured') }) })
        }),
        delete: () => ({ eq: () => Promise.resolve({ error: new Error('Supabase is not configured') }) }),
        update: () => ({ eq: () => ({ select: () => Promise.resolve({ data: null, error: new Error('Supabase is not configured') }) }) }),
      })
    } as any;
