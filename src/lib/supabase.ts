import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

// Create a single supabase client for the entire app
// We use placeholder values if env vars are missing to prevent build-time crashes.
// The actual values will be provided by environment variables in production.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
