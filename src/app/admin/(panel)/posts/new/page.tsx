import Link from 'next/link'
import PostForm from '@/components/PostForm'

export default async function NewPost({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams
  return <><p className="meta"><Link href="/admin">← Kembali ke daftar</Link></p><h1>Berita baru</h1><PostForm error={error} /></>
}
