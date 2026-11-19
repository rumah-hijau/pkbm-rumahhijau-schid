import Image from 'next/image'
import { programs, requirements, gallery, stories, social } from '@/lib/content'
import { site, waLink, mapsQuery } from '@/lib/site'
import { tgl } from '@/lib/format'
import PickLink from './PickLink'

const Check = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10" /></svg>
const igDot = { background: 'linear-gradient(135deg,#f9a03f,#d6249f,#5b51d8)' }

export function Programs() {
  return (
    <section id="program" aria-labelledby="h-program"><div className="wrap">
      <h2 id="h-program">Pilih program sesuai pendidikan terakhir Anda</h2>
      <p className="lead">Ketiga paket memiliki kedudukan hukum yang sama dengan pendidikan formal dan dapat dipakai untuk melamar kerja atau melanjutkan sekolah.</p>
      <div className="progs">
        {programs.map(p => (
          <article className="prog" key={p.tag}>
            <span className="tag">{p.tag}</span><h3>{p.title}</h3><p>{p.desc}</p>
            <ul>{p.points.map(x => <li key={x}>{x}</li>)}</ul>
            <PickLink paket={p.level}>Pilih Paket {p.tag}</PickLink>
          </article>
        ))}
      </div>
    </div></section>
  )
}

export function Requirements() {
  return (
    <section id="syarat" className="req" aria-labelledby="h-syarat"><div className="wrap">
      <div><h2 id="h-syarat">Siapkan dokumen berikut</h2>
        <p className="lead">Dokumen cukup berupa fotokopi. Belum lengkap? Daftar dulu, panitia akan membantu mengurusnya.</p></div>
      <ul className="check">
        {requirements.map(r => <li key={r.title}><Check /><div><b>{r.title}</b><span>{r.desc}</span></div></li>)}
      </ul>
    </div></section>
  )
}

export function Gallery() {
  return (
    <section id="galeri" aria-labelledby="h-galeri"><div className="wrap">
      <h2 id="h-galeri">Galeri foto kegiatan</h2>
      <p className="lead">Suasana belajar, praktik keterampilan, dan kerja sama PKBM Rumah Hijau.</p>
      <div className="gal">
        {gallery.map(g => (
          <figure key={g.src}>
            <Image src={g.src} alt={g.alt} width={g.w} height={g.h} sizes="(max-width:860px) 50vw, 25vw" />
            <figcaption>{g.title}{g.date && <small>{tgl(g.date)}</small>}</figcaption>
          </figure>
        ))}
      </div>
      <p className="note">Sumber foto: <a href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram @pkbm.rumahhijau</a></p>
    </div></section>
  )
}

export function Stories() {
  return (
    <section id="story" aria-labelledby="h-story" style={{ paddingTop: 0 }}><div className="wrap">
      <h2 id="h-story">Kenali PKBM lebih dekat lewat story</h2>
      <p className="lead">Lihat kegiatan belajar dan praktik keterampilan di PKBM Rumah Hijau lewat sorotan story kami di Instagram.</p>
      <div className="story-row">
        {stories.map(s => (
          <a key={s.href} className="story" href={s.href} target="_blank" rel="noopener noreferrer">
            <span className="ring"><span><Image src="/img/logo.webp" alt="" width={168} height={120} /></span></span>
            {s.label}<small>Buka di Instagram</small>
          </a>
        ))}
      </div>
    </div></section>
  )
}

export function Social() {
  return (
    <section id="sosmed" className="soc" aria-labelledby="h-sosmed"><div className="wrap">
      <h2 id="h-sosmed">Kabar terbaru dari media sosial</h2>
      <p className="lead">Dokumentasi kegiatan dan pengumuman terbaru kami di Instagram.</p>
      <div className="chips">
        <a href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram @pkbm.rumahhijau</a>
        <a href={site.website} target="_blank" rel="noopener noreferrer">Website resmi</a>
      </div>
      <div className="soc-grid">
        {social.map(s => (
          <article className="sp" key={s.text}>
            <div className="src"><span className="dot" style={igDot}>IG</span>
              <div>Instagram{s.date && <time dateTime={s.date}>{tgl(s.date)}</time>}</div></div>
            <p>{s.text}</p>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer">Lihat di Instagram</a>
          </article>
        ))}
      </div>
    </div></section>
  )
}

export function Contact() {
  return (
    <section id="kontak" className="contact" aria-labelledby="h-kontak"><div className="wrap">
      <div>
        <h2 id="h-kontak">Datang langsung atau tanya dulu lewat WhatsApp</h2>
        <dl>
          <div><dt>Sekretariat</dt><dd>{site.address}</dd></div>
          <div><dt>Jam layanan</dt><dd>{site.hours}</dd></div>
          <div><dt>Telepon / WhatsApp</dt><dd><a href={waLink()}>{site.waDisplay}</a></dd></div>
          <div><dt>Website</dt><dd><a href={site.website} target="_blank" rel="noopener noreferrer">pkbm-rumahhijau.sch.id</a></dd></div>
        </dl>
      </div>
      <div>
        <div className="cta-box">
          <h3>Belum yakin paket mana yang cocok?</h3>
          <p>Ceritakan pendidikan terakhir dan tujuan Anda. Tutor kami akan menyarankan paket yang paling pas, tanpa biaya.</p>
          <a className="btn" href={waLink('Halo, saya ingin konsultasi gratis tentang Kejar Paket.')} target="_blank" rel="noopener noreferrer">Konsultasi gratis via WhatsApp</a>
        </div>
        <iframe className="map" title="Lokasi PKBM Rumah Hijau di Google Maps" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`} />
        <p className="note"><a href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`} target="_blank" rel="noopener noreferrer">Buka di Google Maps</a></p>
      </div>
    </div></section>
  )
}
