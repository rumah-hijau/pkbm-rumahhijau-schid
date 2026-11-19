import SiteHeader from '@/components/SiteHeader'
import Footer from '@/components/Footer'
import WhatsAppFab from '@/components/WhatsAppFab'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip" href="#utama">Lewati ke konten utama</a>
      <SiteHeader />
      {children}
      <Footer />
      <WhatsAppFab />
    </>
  )
}
