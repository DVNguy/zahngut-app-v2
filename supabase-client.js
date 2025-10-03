// Supabase Client Configuration
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || window.ENV?.VITE_SUPABASE_URL || 'https://spalbxssflmjshmhqlmc.supabase.co';
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || window.ENV?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwYWxieHNzZmxtanNobWhxbG1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0NDM5MjIsImV4cCI6MjA3NTAxOTkyMn0.zW-nfsgBKOz9kNI-vW-pnpqazLqLTjdHyQi-A7XsdS4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('✅ Supabase client initialized');
