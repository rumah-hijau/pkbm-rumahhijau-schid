import { waLink } from '@/lib/site'

export default function WhatsAppFab() {
  return (
    <a className="fab" href={waLink('Halo, saya ingin bertanya tentang Kejar Paket di PKBM Rumah Hijau.')} target="_blank" rel="noopener noreferrer" aria-label="Tanya lewat WhatsApp">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.7-5.2A8.5 8.5 0 1 1 21 12Z" /></svg>
      <span>Tanya via WhatsApp</span>
    </a>
  )
}
