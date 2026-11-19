'use client'
import { useEffect, useState } from 'react'
import { programs } from '@/lib/content'
import { waLink } from '@/lib/site'

export default function RegistrationForm() {
  const [paket, setPaket] = useState(programs[2].level)
  const [msg, setMsg] = useState<{ text: string; err: boolean }>({ text: '', err: false })
  useEffect(() => {
    const on = (e: Event) => setPaket((e as CustomEvent<string>).detail)
    window.addEventListener('pilih-paket', on)
    return () => window.removeEventListener('pilih-paket', on)
  }, [])

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const nama = String(fd.get('nama') || '').trim()
    const wa = String(fd.get('wa') || '').replace(/[^0-9+]/g, '')
    if (nama.length < 3) return setMsg({ text: 'Isi nama lengkap minimal 3 huruf.', err: true })
    if (wa.replace(/\D/g, '').length < 9) return setMsg({ text: 'Isi nomor WhatsApp yang valid, minimal 9 angka.', err: true })
    setMsg({ text: 'Membuka WhatsApp…', err: false })
    window.open(waLink(`Halo, saya ${nama} (WA: ${wa}) ingin mendaftar ${paket}.`), '_blank', 'noopener')
  }

  return (
    <form id="daftar" className="quick" noValidate onSubmit={submit} aria-labelledby="f-judul">
      <h2 id="f-judul">Daftar cepat</h2>
      <label>Nama lengkap<input name="nama" autoComplete="name" placeholder="Contoh: Siti Rahma" required /></label>
      <label>Nomor WhatsApp<input name="wa" type="tel" inputMode="tel" autoComplete="tel" placeholder="Contoh: 0812 3456 7890" required /></label>
      <label>Pilihan paket
        <select value={paket} onChange={e => setPaket(e.target.value)}>
          {programs.map(p => <option key={p.tag} value={p.level}>Paket {p.tag} – setara {p.level.match(/setara (\w+)/)?.[1]}</option>)}
        </select>
      </label>
      <button className="btn" type="submit">Daftar sekarang</button>
      <small>Data dikirim lewat WhatsApp ke panitia. Tim kami membalas di jam kerja.</small>
      <div id="msg" className={msg.err ? 'err' : ''} role="status" aria-live="polite">{msg.text}</div>
    </form>
  )
}
