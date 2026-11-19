import Link from 'next/link'
import { nav } from '@/lib/content'
import { site } from '@/lib/site'

export default function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <div><strong>PKBM Rumah Hijau</strong><p>Pusat Kegiatan Belajar Masyarakat. Kejar Paket A, B, dan C.</p></div>
        <div><strong>Menu</strong><ul>{nav.map(n => <li key={n.href}><Link href={n.href}>{n.label}</Link></li>)}</ul></div>
        <div><strong>Hubungi kami</strong><p>{site.waDisplay}<br /><a href={site.instagram} target="_blank" rel="noopener noreferrer">@pkbm.rumahhijau</a></p></div>
      </div>
      <div className="wrap legal">© {new Date().getFullYear()} PKBM Rumah Hijau. Seluruh hak dilindungi.</div>
    </footer>
  )
}
