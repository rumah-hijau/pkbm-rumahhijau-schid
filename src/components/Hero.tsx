import Image from 'next/image'
import RegistrationForm from './RegistrationForm'

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="judul">
      <div className="photo">
        <Image className="hero-img" src="/img/team.webp" alt="Tim PKBM Rumah Hijau berfoto bersama dengan seragam hijau abu-abu" width={1280} height={720} priority sizes="100vw" />
        <div className="shade" />
        <div className="wrap copy">
          <h1 id="judul">Ijazah setara SD, SMP, dan SMA. Belum terlambat untuk melanjutkan.</h1>
          <p>Daftar Kejar Paket A, B, atau C di PKBM Rumah Hijau. Jadwal fleksibel, tutor berpengalaman, dan pendampingan sampai ujian.</p>
          <ul className="facts"><li>Terakreditasi</li><li>Ijazah diakui negara</li><li>Belajar sambil bekerja</li></ul>
        </div>
      </div>
      <div className="wrap"><RegistrationForm /></div>
    </section>
  )
}
