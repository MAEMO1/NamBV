import { createClient } from '@supabase/supabase-js'

type SupabaseBrowserClient = ReturnType<typeof createClient>

function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL
}

function getSupabaseAnonKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
}

// Singleton pattern matching db.ts
const globalForSupabase = globalThis as unknown as {
  supabase: SupabaseBrowserClient | undefined
}

export function getSupabaseClient() {
  const existingClient = globalForSupabase.supabase
  if (existingClient) {
    return existingClient
  }

  const supabaseUrl = getSupabaseUrl()
  const supabaseAnonKey = getSupabaseAnonKey()

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase client is not configured')
  }

  const client = createClient(supabaseUrl, supabaseAnonKey) as SupabaseBrowserClient

  if (process.env.NODE_ENV !== 'production') {
    globalForSupabase.supabase = client
  }

  return client
}

/**
 * Get public URL for a file in a public bucket
 */
export function getStoragePublicUrl(bucket: string, path: string): string {
  const supabaseUrl = getSupabaseUrl()
  if (!supabaseUrl) {
    throw new Error('Supabase public storage is not configured')
  }

  return `${supabaseUrl.replace(/\/+$/, '')}/storage/v1/object/public/${bucket}/${path.replace(/^\/+/, '')}`
}

export function getProjectPhotoUrl(path: string): string {
  return getStoragePublicUrl('project-photos', path)
}
