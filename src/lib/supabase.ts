import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

// Get environment variables
const supabaseUrl = 'https://mhixotiztcsbfrhizktb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oaXhvdGl6dGNzYmZyaGl6a3RiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4NTI4MDAsImV4cCI6MjAyMjQyODgwMH0.ZopLnF1qyF_ZjkKVONqgbkX3MYz9kzYwGIGxCdY4_Ow';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});