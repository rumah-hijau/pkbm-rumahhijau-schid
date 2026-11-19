'use server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/slug'

function refresh() {
  revalidatePath('/'); revalidatePath('/berita'); revalidatePath('/berita/[slug]', 'page'); revalidatePath('/sitemap.xml'); revalidatePath('/admin')
}

export async function login(fd: FormData) {
  const sb = await createClient()
  const { error } = await sb.auth.signInWithPassword({ email: String(fd.get('email')), password: String(fd.get('password')) })
  if (error) redirect('/admin/login?error=1')
  redirect('/admin')
}

export async function logout() {
  const sb = await createClient()
  await sb.auth.signOut()
  redirect('/admin/login')
}

export async function savePost(fd: FormData) {
  const sb = await createClient()
  const id = String(fd.get('id') || '')
  const title = String(fd.get('title') || '').trim()
  const slug = slugify(String(fd.get('slug') || '') || title)
  const back = id ? `/admin/posts/${id}` : '/admin/posts/new'
  const fail = (m: string) => redirect(`${back}?error=${encodeURIComponent(m)}`)
  if (!title || !slug) fail('Judul wajib diisi.')

  let cover_url: string | null = fd.get('remove_cover') === 'on' ? null : (String(fd.get('cover_url') || '') || null)
  const file = fd.get('cover') as File | null
  let uploadFailed = false
  if (file && file.size > 0) {
    if (file.size > 3 * 1024 * 1024) fail('Ukuran foto maksimal 3 MB.')
    const ext = (file.name.split('.').pop() || 'jpg').replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || 'jpg'
    const path = `${Date.now()}-${slug}.${ext}`
    const bytes = Buffer.from(await file.arrayBuffer())
    const up = await sb.storage.from('post-images').upload(path, bytes, { contentType: file.type || 'image/jpeg' })
    if (up.error) {
      // Berita tetap disimpan tanpa foto agar tulisan tidak hilang. Detail galat tampil di terminal.
      console.error('[unggah foto gagal]', up.error, (up.error as { originalError?: { cause?: unknown } }).originalError?.cause)
      uploadFailed = true
    } else {
      cover_url = sb.storage.from('post-images').getPublicUrl(path).data.publicUrl
    }
  }

  const published = fd.get('intent') === 'publish'
  const row = {
    title, slug, cover_url, published,
    excerpt: String(fd.get('excerpt') || '').trim() || null,
    category: String(fd.get('category') || 'Berita'),
    content: String(fd.get('content') || ''),
    published_at: published ? (String(fd.get('published_at') || '') || new Date().toISOString()) : null,
    updated_at: new Date().toISOString(),
  }
  const { error } = id ? await sb.from('posts').update(row).eq('id', id) : await sb.from('posts').insert(row)
  if (error) fail(error.code === '23505' ? 'Alamat (slug) sudah dipakai berita lain.' : error.message)
  refresh()
  redirect(`/admin?ok=${published ? 'terbit' : 'draf'}${uploadFailed ? '&warn=foto' : ''}`)
}

export async function deletePost(fd: FormData) {
  const sb = await createClient()
  await sb.from('posts').delete().eq('id', String(fd.get('id')))
  refresh()
  redirect('/admin?ok=hapus')
}
