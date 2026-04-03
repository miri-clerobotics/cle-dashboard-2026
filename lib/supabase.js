import { createClient } from '@supabase/supabase-js'

// Vercel 금고에서 열쇠를 꺼내올 때, 이름이 정확해야 합니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// 만약 열쇠가 없으면 에러를 내지 말고 일단 빈 값을 넘겨서 빌드를 통과시킵니다.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder'
)
