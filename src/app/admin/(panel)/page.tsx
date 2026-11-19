import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { deletePost } from '../actions'
import ConfirmForm from '@/components/ConfirmForm'
import { tgl } from '@/lib/format'

const FLASH: Record<string, string> = { terbit: 'Berita berhasil diterbitkan.', draf: 'Berita disimpan sebagai draf.', hapus: 'Berita dihapus.' }

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ q?: string; status?: string; ok?: string; warn?: string }> }) {
  const { q = '', status = 'semua', ok, warn } = await searchParams
  const sb = await createClient()
  const { data, error } = await sb.from('posts').select('id,title,slug,category,published,cover_url,updated_at').order('updated_at', { ascending: false })
  const all = data ?? []
  const terbit = all.filter(p => p.published).length
  const posts = all.filter(p => (status === 'semua' || (status === 'terbit') === p.published) && p.title.toLowerCase().includes(q.trim().toLowerCase()))

  return (
    <>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <h1>Kelola berita</h1>
        <Link className="btn hide-sm" href="/admin/posts/new">+ Berita baru</Link>
      </div>
      {ok && FLASH[ok] && <div className="flash" role="status">{FLASH[ok]}</div>}
      {warn === 'foto' && <div className="err" role="alert">Berita sudah tersimpan, tetapi foto sampul gagal diunggah. Buka berita lalu coba unggah fotonya lagi.</div>}
      {error && <div className="err" role="alert">Gagal memuat berita: {error.message}</div>}

      <div className="stats">
        <div className="stat"><b>{all.length}</b><span>Total berita</span></div>
        <div className="stat"><b>{terbit}</b><span>Terbit</span></div>
        <div className="stat"><b>{all.length - terbit}</b><span>Draf</span></div>
      </div>

      {all.length === 0 ? (
        <div className="empty">
          <Image src="/img/logo.webp" alt="" width={168} height={120} />
          <h2>Belum ada berita</h2>
          <p>Tulis berita pertama untuk PKBM Rumah Hijau. Berita yang terbit akan tampil otomatis di website.</p>
          <Link className="btn" href="/admin/posts/new">Tulis berita pertama</Link>
        </div>
      ) : (
        <>
          <form className="filters" method="get">
            <input name="q" defaultValue={q} placeholder="Cari judul berita…" aria-label="Cari judul" />
            <select name="status" defaultValue={status} aria-label="Status">
              <option value="semua">Semua status</option><option value="terbit">Terbit</option><option value="draf">Draf</option>
            </select>
            <button className="btn sec" type="submit">Cari</button>
          </form>
          {posts.length === 0 && <p className="note">Tidak ada berita yang cocok.</p>}
          <ul className="plist">
            {posts.map(p => (
              <li className="pitem" key={p.id}>
                {p.cover_url ? <img className="thumb" src={p.cover_url} alt="" /> : <div className="thumb ph"><Image src="/img/logo.webp" alt="" width={168} height={120} /></div>}
                <div className="pinfo">
                  <strong>{p.title}</strong>
                  <span className="meta">{p.category} · diubah {tgl(p.updated_at)} <span className={`tag ${p.published ? 'on' : ''}`}>{p.published ? 'Terbit' : 'Draf'}</span></span>
                </div>
                <div className="pact">
                  <Link className="btn sm" href={`/admin/posts/${p.id}`}>Ubah</Link>
                  {p.published && <Link className="btn sec sm" href={`/berita/${p.slug}`} target="_blank">Lihat</Link>}
                  <ConfirmForm action={deletePost} message="Hapus berita ini? Tindakan ini tidak bisa dibatalkan.">
                    <input type="hidden" name="id" value={p.id} /><button className="btn del sm" type="submit">Hapus</button>
                  </ConfirmForm>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      <Link className="fab-add" href="/admin/posts/new" aria-label="Berita baru">+</Link>
    </>
  )
}
