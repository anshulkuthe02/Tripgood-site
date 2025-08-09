import { createClient } from '@supabase/supabase-js';

// Check if we have valid Supabase credentials
const supabaseUrl = 'https://lgddiqnuapkrowxekxxx.supabase.co'; // replace with yours
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnZGRpcW51YXBrcm93eGVreHh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyOTY2MTAsImV4cCI6MjA2Njg3MjYxMH0.zPmePQUXagXLg_xpcEHf2RS_k3gvdbhX6d93aia1FMs';

// Only create client if we have valid credentials (not placeholder values)
const isValidConfig = !supabaseUrl.includes('xxx') && !supabaseKey.includes('xxx');

export const supabase = isValidConfig ? createClient(supabaseUrl, supabaseKey) : null;

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => isValidConfig;

// Only attempt auth operations if Supabase is properly configured
if (isValidConfig) {
  try {
    await supabase.auth.getUser();
    // const phone = "+91XXXXXXXXXX"; // Must have +91 (or country code)
    // await supabase.auth.signInWithOtp({ phone });
  } catch (error) {
    console.warn('Supabase auth initialization failed:', error.message);
  }
}
