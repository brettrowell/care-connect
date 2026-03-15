import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? process.env.VITE_SUPABASE_ANON_KEY ?? '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('BridgeCare: Missing SUPABASE_URL or SUPABASE_ANON_KEY. Set EXPO_PUBLIC_* (RN) or VITE_* (web).');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export type { Database };
