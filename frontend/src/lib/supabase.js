import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase project details
// You can find these in Project Settings > API in your Supabase dashboard
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseKey);
