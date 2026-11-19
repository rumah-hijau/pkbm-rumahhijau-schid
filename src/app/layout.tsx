import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Figtree } from 'next/font/google'
import './globals.css'
import { site } from '@/lib/site'

const head = Bricolage_Grotesque({ subsets: ['latin'], weight: ['500', '700', '800'], variable: '--font-head', display: 'swap' })
const body = Figtree({ subsets: ['latin'], variable: '--font-body', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'PKBM Rumah Hijau – Kejar Paket A, B, C di Deli Serdang', template: '%s | PKBM Rumah Hijau' },
  description: 'Daftar Kejar Paket A, B, dan C (setara SD, SMP, SMA) di PKBM Rumah Hijau, Lubuk Pakam, Deli Serdang. Jadwal fleksibel dan pendampingan sampai ujian.',
  openGraph: { type: 'website', locale: 'id_ID', siteName: 'PKBM Rumah Hijau', images: [{ url: '/img/og.jpg', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image' },
}
export const viewport: Viewport = { themeColor: '#0b3d2e', viewportFit: 'cover' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="id" className={`${head.variable} ${body.variable}`}><body>{children}</body></html>
}
