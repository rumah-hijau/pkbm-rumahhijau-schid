import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { logout } from '../actions'

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const sb = await createClient()
  const { data: { user } } = await sb.auth.getUser()
  if (!user) redirect('/admin/login')
  const { data: adm, error } = await sb.from('admins').select('user_id').eq('user_id', user.id).maybeSingle()
  return (
    <>
      <div className="bar"><div className="in">
        <Link className="brandrow" href="/admin">
          <span className="badge"><Image src="/img/logo.webp" alt="" width={168} height={120} priority /></span>
          <span><b>Admin</b><small>PKBM Rumah Hijau</small></span>
        </Link>
        <div className="nav">
          <Link href="/" target="_blank">Lihat situs</Link>
          <form action={logout}><button className="btn sec sm" type="submit">Keluar</button></form>
        </div>
      </div></div>
      <main className="wrap">
        {adm ? children : (
          <div className="err" role="alert">
            <p>Akun ini belum terdaftar sebagai admin.</p>
            <p>ID akun: <code>{user.id}</code>{error && <><br />Galat database: {error.message}</>}</p>
          </div>
        )}
      </main>
    </>
  )
}
