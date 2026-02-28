import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Create a mock Supabase client if not configured
const createMockClient = () => ({
  from: () => ({
    select: () => ({
      eq: () => ({
        order: () => ({
          limit: () => Promise.resolve({ data: [], error: null })
        })
      })
    }),
    insert: () => Promise.resolve({ error: { message: 'Supabase not configured' } })
  })
})

// Only create real client if URL is valid
const isValidUrl = supabaseUrl.startsWith('http://') || supabaseUrl.startsWith('https://')

export const supabase = isValidUrl 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient()