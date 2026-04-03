import { createClient } from '@supabase/supabase-js'

// 만약 주소가 없으면 빈 글자('')라도 넣어서 빌드 에러를 방지합니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
