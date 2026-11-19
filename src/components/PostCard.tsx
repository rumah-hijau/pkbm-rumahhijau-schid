import Link from 'next/link'
import type { PostSummary } from '@/lib/posts'
import { tgl } from '@/lib/format'

export default function PostCard({ p }: { p: PostSummary }) {
  const href = `/berita/${p.slug}`
  return (
    <article className="post">
      {p.cover_url
        ? <img className="pimg" src={p.cover_url} alt="" loading="lazy" />
        : <div className="th" style={{ background: 'linear-gradient(90deg,#0b3d2e,#3fae78)' }} />}
      <div className="b">
        <time dateTime={p.published_at ?? undefined}>{p.category}{p.published_at && ` · ${tgl(p.published_at)}`}</time>
        <h3><Link href={href}>{p.title}</Link></h3>
        {p.excerpt && <p>{p.excerpt}</p>}
        <Link href={href}>Baca selengkapnya</Link>
      </div>
    </article>
  )
}
