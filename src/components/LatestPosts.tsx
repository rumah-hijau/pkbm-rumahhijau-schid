import Link from 'next/link'
import { getPosts } from '@/lib/posts'
import PostCard from './PostCard'

export default async function LatestPosts() {
  const posts = await getPosts(3)
  return (
    <section id="berita" aria-labelledby="h-berita"><div className="wrap">
      <h2 id="h-berita">Berita dan informasi terbaru</h2>
      <p className="lead">Panduan pendaftaran, pengumuman, dan tips belajar dari PKBM Rumah Hijau.</p>
      {posts.length ? (
        <>
          <div className="posts">{posts.map(p => <PostCard key={p.id} p={p} />)}</div>
          <p style={{ marginTop: '1.5rem' }}><Link className="btn alt" href="/berita">Lihat semua berita</Link></p>
        </>
      ) : <p className="note">Berita akan segera hadir. Pantau terus Instagram kami.</p>}
    </div></section>
  )
}
