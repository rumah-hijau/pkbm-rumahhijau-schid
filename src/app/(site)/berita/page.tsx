import { getPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'

export const revalidate = 60
export const metadata = { title: 'Berita', description: 'Berita, pengumuman, dan tips belajar dari PKBM Rumah Hijau.' }

export default async function Berita() {
  const posts = await getPosts()
  return (
    <main id="utama"><section><div className="wrap">
      <h1 className="page-title">Berita dan informasi</h1>
      <p className="lead">Panduan pendaftaran, pengumuman, dan tips belajar dari PKBM Rumah Hijau.</p>
      {posts.length
        ? <div className="posts">{posts.map(p => <PostCard key={p.id} p={p} />)}</div>
        : <p className="note">Belum ada berita.</p>}
    </div></section></main>
  )
}
