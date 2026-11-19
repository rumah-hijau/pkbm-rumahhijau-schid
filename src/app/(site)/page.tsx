import Hero from '@/components/Hero'
import { Programs, Requirements, Gallery, Stories, Social, Contact } from '@/components/Sections'
import LatestPosts from '@/components/LatestPosts'
import { site } from '@/lib/site'

export const revalidate = 60

const jsonLd = {
  '@context': 'https://schema.org', '@type': 'EducationalOrganization', name: site.name, url: site.url,
  telephone: `+${site.wa}`, image: `${site.url}/img/og.jpg`, sameAs: [site.instagram],
  address: { '@type': 'PostalAddress', streetAddress: 'Jl. Lintas Sumatera No. 220, Pagar Jati', addressLocality: 'Lubuk Pakam', addressRegion: 'Sumatera Utara', postalCode: '20551', addressCountry: 'ID' },
}

export default function Home() {
  return (
    <main id="utama">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <Programs />
      <Requirements />
      <Gallery />
      <Stories />
      <Social />
      <LatestPosts />
      <Contact />
    </main>
  )
}
