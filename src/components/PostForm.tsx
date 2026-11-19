'use client'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { savePost } from '@/app/admin/actions'
import { slugify } from '@/lib/slug'
import RichText from './RichText'

type Post = { id: string; title: string; slug: string; excerpt: string | null; content: string; cover_url: string | null; category: string; published: boolean; published_at: string | null }

export default function PostForm({ post, error }: { post?: Post; error?: string }) {
  const [title, setTitle] = useState(post?.title ?? '')
  const [slug, setSlug] = useState(post?.slug ?? '')
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? '')
  const [content, setContent] = useState(post?.content ?? '')
  const [tab, setTab] = useState<'tulis' | 'lihat'>('tulis')
  const [cover, setCover] = useState<string | null>(post?.cover_url ?? null)
  const ta = useRef<HTMLTextAreaElement>(null)

  const words = content.trim() ? content.trim().split(/\s+/).length : 0
  const finalSlug = slugify(slug || title)

  function wrap(before: string, after = before, ph = 'teks') {
    const el = ta.current; if (!el) return
    const s = el.selectionStart, e = el.selectionEnd
    const sel = content.slice(s, e) || ph
    setContent(content.slice(0, s) + before + sel + after + content.slice(e))
    requestAnimationFrame(() => { el.focus(); el.setSelectionRange(s + before.length, s + before.length + sel.length) })
  }
  function linePrefix(p: string) {
    const el = ta.current; if (!el) return
    const ls = content.lastIndexOf('\n', el.selectionStart - 1) + 1
    setContent(content.slice(0, ls) + p + content.slice(ls))
    requestAnimationFrame(() => el.focus())
  }

  return (
    <form action={savePost} className="pf">
      {error && <div className="err" role="alert">{error}</div>}
      {post && <><input type="hidden" name="id" value={post.id} /><input type="hidden" name="published_at" value={post.published_at ?? ''} /></>}
      <div className="pf-grid">
        <div className="pcard">
          <label>Judul
            <input name="title" value={title} onChange={e => setTitle(e.target.value)} required maxLength={150} placeholder="Contoh: Pendaftaran Kejar Paket Gelombang Baru Dibuka" />
            <small>{title.length}/150 huruf</small>
          </label>
          <div>
            <div className="tabs" role="tablist">
              <button type="button" role="tab" aria-selected={tab === 'tulis'} className={tab === 'tulis' ? 'on' : ''} onClick={() => setTab('tulis')}>Tulis</button>
              <button type="button" role="tab" aria-selected={tab === 'lihat'} className={tab === 'lihat' ? 'on' : ''} onClick={() => setTab('lihat')}>Pratinjau</button>
            </div>
            <div style={{ display: tab === 'tulis' ? 'grid' : 'none', gap: '.6rem', marginTop: '.6rem' }}>
              <div className="tools" aria-label="Format teks">
                <button type="button" title="Tebal" onClick={() => wrap('**')}>B</button>
                <button type="button" title="Miring" onClick={() => wrap('*')} style={{ fontStyle: 'italic' }}>I</button>
                <button type="button" title="Judul bagian" onClick={() => linePrefix('## ')}>H</button>
                <button type="button" title="Daftar" onClick={() => linePrefix('- ')}>•</button>
                <button type="button" title="Tautan" onClick={() => wrap('[', '](https://)', 'teks tautan')}>🔗</button>
              </div>
              <textarea ref={ta} name="content" value={content} onChange={e => setContent(e.target.value)} required aria-label="Isi berita" placeholder={'Tulis isi berita di sini.\n\nPisahkan paragraf dengan satu baris kosong.'} />
            </div>
            {tab === 'lihat' && (
              <div className="preview rt" style={{ marginTop: '.6rem' }}>
                <h1 style={{ fontSize: '1.6rem', margin: '0 0 .6rem' }}>{title || 'Judul berita'}</h1>
                {cover && <img className="coverimg" src={cover} alt="" />}
                {content.trim() ? <RichText text={content} /> : <p style={{ opacity: .6 }}>Isi berita belum ditulis.</p>}
              </div>
            )}
            <small>{words} kata · sekitar {Math.max(1, Math.round(words / 200))} menit baca</small>
          </div>
        </div>

        <aside className="pf-side">
          <div className="pcard">
            <label>Kategori
              <select name="category" defaultValue={post?.category ?? 'Berita'}>
                {['Berita', 'Pengumuman', 'Kegiatan', 'Tips Belajar'].map(c => <option key={c}>{c}</option>)}
              </select>
            </label>
            <label>Ringkasan singkat
              <textarea name="excerpt" value={excerpt} onChange={e => setExcerpt(e.target.value)} maxLength={200} style={{ minHeight: 90 }} placeholder="Satu atau dua kalimat yang tampil di kartu berita." />
              <small>{excerpt.length}/200 huruf</small>
            </label>
          </div>
          <div className="pcard">
            <label>Foto sampul
              {cover ? <img className="coverimg" src={cover} alt="Pratinjau foto sampul" /> : <div className="coverph">Belum ada foto</div>}
              <input type="file" name="cover" accept="image/*" onChange={e => { const f = e.target.files?.[0]; if (f) setCover(URL.createObjectURL(f)) }} />
              <small>Maksimal 3 MB. Foto landscape paling pas.</small>
            </label>
            <input type="hidden" name="cover_url" value={post?.cover_url ?? ''} />
            {post?.cover_url && <label className="chk"><input type="checkbox" name="remove_cover" /> Hapus foto sampul saat ini</label>}
          </div>
          <div className="pcard">
            <label>Alamat berita (slug)
              <input name="slug" value={slug} onChange={e => setSlug(e.target.value)} placeholder="otomatis dari judul" />
              <small>/berita/{finalSlug || '…'}</small>
            </label>
          </div>
        </aside>
      </div>

      <div className="actionbar">
        <Link className="cancel" href="/admin">Batal</Link>
        <button className="btn sec" type="submit" name="intent" value="draft">{post?.published ? 'Jadikan draf' : 'Simpan draf'}</button>
        <button className="btn" type="submit" name="intent" value="publish">{post?.published ? 'Simpan perubahan' : 'Terbitkan'}</button>
      </div>
    </form>
  )
}
