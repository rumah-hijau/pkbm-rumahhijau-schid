import Image from 'next/image'
import { login } from '../actions'

export default async function Login({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams
  return (
    <main className="loginbox">
      <div className="loginhead">
        <span className="badge"><Image src="/img/logo.webp" alt="" width={168} height={120} priority /></span>
        <h1>Masuk admin</h1>
        <p className="meta">PKBM Rumah Hijau</p>
      </div>
      <form action={login} className="pcard">
        {error && <div className="err" role="alert">Email atau kata sandi salah.</div>}
        <label>Email<input name="email" type="email" required autoComplete="email" /></label>
        <label>Kata sandi<input name="password" type="password" required autoComplete="current-password" /></label>
        <button className="btn" type="submit">Masuk</button>
      </form>
    </main>
  )
}
