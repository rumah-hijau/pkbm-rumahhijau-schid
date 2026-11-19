import Link from 'next/link'

export default function NotFound() {
  return (
    <main style={{ minHeight: '70vh', display: 'grid', placeItems: 'center', textAlign: 'center', padding: '2rem' }}>
      <div>
        <h1 className="page-title">Halaman tidak ditemukan</h1>
        <p className="lead" style={{ margin: '1rem auto' }}>Alamat yang Anda buka tidak ada atau sudah dipindahkan.</p>
        <Link className="btn" href="/">Kembali ke beranda</Link>
      </div>
    </main>
  )
}
