import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

// Vite (web) uses import.meta.env; React Native/Node use process.env
const supabaseUrl =
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_URL) ||
  (typeof process !== 'undefined' && process?.env?.VITE_SUPABASE_URL) ||
  (typeof process !== 'undefined' && process?.env?.EXPO_PUBLIC_SUPABASE_URL) ||
  '';
const supabaseAnonKey =
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_ANON_KEY) ||
  (typeof process !== 'undefined' && process?.env?.VITE_SUPABASE_ANON_KEY) ||
  (typeof process !== 'undefined' && process?.env?.EXPO_PUBLIC_SUPABASE_ANON_KEY) ||
  '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('BridgeCare: Missing Supabase env. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env (web) or EXPO_PUBLIC_* (RN).');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export type { Database };
