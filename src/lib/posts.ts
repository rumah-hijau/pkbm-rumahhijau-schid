import { createClient } from '@supabase/supabase-js'

export type PostSummary = { id: string; title: string; slug: string; excerpt: string | null; cover_url: string | null; category: string; published_at: string | null }
export type Post = PostSummary & { content: string }

// Klien tanpa cookie agar halaman publik bisa di-cache. Jika Supabase belum diisi, situs tetap jalan tanpa berita.
const db = () => createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } })

export async function getPosts(limit?: number): Promise<PostSummary[]> {
  try {
    let q = db().from('posts').select('id,title,slug,excerpt,cover_url,category,published_at').eq('published', true).order('published_at', { ascending: false })
    if (limit) q = q.limit(limit)
    const { data, error } = await q
    return error ? [] : (data ?? [])
  } catch { return [] }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const { data } = await db().from('posts').select('*').eq('slug', slug).eq('published', true).maybeSingle()
    return data
  } catch { return null }
}
