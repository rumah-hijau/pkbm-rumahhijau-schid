import Link from 'next/link'
import { notFound } from 'next/navigation'
import PostForm from '@/components/PostForm'
import { createClient } from '@/lib/supabase/server'

export default async function EditPost({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string }> }) {
  const { id } = await params
  const { error } = await searchParams
  const sb = await createClient()
  const { data: post } = await sb.from('posts').select('*').eq('id', id).maybeSingle()
  if (!post) notFound()
  return <><p className="meta"><Link href="/admin">← Kembali ke daftar</Link></p><h1>Ubah berita</h1><PostForm post={post} error={error} /></>
}
