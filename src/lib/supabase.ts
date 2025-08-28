import { createClient } from '@supabase/supabase-js';

// Mock Supabase configuration - replace with actual values when Supabase is connected
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const auth = supabase.auth;