'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { nav } from '@/lib/content'

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', esc)
    return () => document.removeEventListener('keydown', esc)
  }, [])
  return (
    <header>
      <div className="wrap bar">
        <Link className="logo" href="/" aria-label="PKBM Rumah Hijau, ke beranda">
          <span className="badge"><Image src="/img/logo.webp" alt="" width={168} height={120} priority /></span>
          <span className="brand">PKBM<br />Rumah Hijau</span>
        </Link>
        <button className="menu-btn" type="button" aria-expanded={open} aria-controls="menu" aria-label={open ? 'Tutup menu' : 'Buka menu'} onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
        <nav id="menu" className={open ? 'open' : ''} aria-label="Menu utama" onClick={e => (e.target as HTMLElement).closest('a') && setOpen(false)}>
          {nav.map(n => <Link key={n.href} href={n.href}>{n.label}</Link>)}
          <Link className="btn nav-cta" href="/#daftar">Daftar</Link>
        </nav>
      </div>
    </header>
  )
}
