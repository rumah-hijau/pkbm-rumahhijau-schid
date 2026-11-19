import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPost } from '@/lib/posts'
import { tgl } from '@/lib/format'
import { site } from '@/lib/site'
import RichText from '@/components/RichText'

export const revalidate = 60
type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getPost((await params).slug)
  if (!p) return { title: 'Berita tidak ditemukan' }
  const desc = p.excerpt ?? p.content.replace(/[*#]|\[([^\]]+)\]\([^)]*\)/g, '$1').slice(0, 160)
  return { title: p.title, description: desc, openGraph: { title: p.title, description: desc, type: 'article', images: p.cover_url ? [p.cover_url] : ['/img/og.jpg'] } }
}

export default async function Detail({ params }: Props) {
  const { slug } = await params
  const p = await getPost(slug)
  if (!p) notFound()
  const share = `https://wa.me/?text=${encodeURIComponent(`${p.title} ${site.url}/berita/${p.slug}`)}`
  return (
    <main id="utama"><section><div className="wrap">
      <article className="article">
        <p className="meta"><Link href="/berita">← Semua berita</Link></p>
        <time className="meta" dateTime={p.published_at ?? undefined}>{p.category}{p.published_at && ` · ${tgl(p.published_at)}`}</time>
        <h1>{p.title}</h1>
        {p.cover_url && <img className="cover" src={p.cover_url} alt="" />}
        <div className="rt"><RichText text={p.content} /></div>
        <p><a className="btn alt" href={share} target="_blank" rel="noopener noreferrer">Bagikan lewat WhatsApp</a></p>
      </article>
    </div></section></main>
  )
}
