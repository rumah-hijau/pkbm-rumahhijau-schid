// Semua data kontak ada di sini. Ubah di satu tempat, seluruh website ikut berubah.
export const site = {
  name: 'PKBM Rumah Hijau',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pkbm-rumahhijau.sch.id',
  wa: '6285167770174',
  waDisplay: '0851-6777-0174',
  address: 'Jl. Lintas Sumatera No. 220, Pagar Jati, Kec. Lubuk Pakam, Kab. Deli Serdang, Sumatera Utara 20551',
  hours: 'Senin–Sabtu, 08.00–16.00', // TODO: sesuaikan dengan jam layanan sebenarnya
  instagram: 'https://www.instagram.com/pkbm.rumahhijau/',
  website: 'https://pkbm-rumahhijau.sch.id',
}
export const waLink = (text?: string) =>
  `https://wa.me/${site.wa}${text ? `?text=${encodeURIComponent(text)}` : ''}`
export const mapsQuery = encodeURIComponent(site.address)
