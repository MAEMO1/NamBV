import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Singleton pattern matching db.ts
const globalForSupabase = globalThis as unknown as {
  supabase: ReturnType<typeof createClient> | undefined
}

export const supabase = globalForSupabase.supabase ?? createClient(supabaseUrl, supabaseAnonKey)

if (process.env.NODE_ENV !== 'production') {
  globalForSupabase.supabase = supabase
}

/**
 * Get public URL for a file in the project-photos bucket
 */
export function getProjectPhotoUrl(path: string): string {
  const { data } = supabase.storage
    .from('project-photos')
    .getPublicUrl(path)
  return data.publicUrl
}
