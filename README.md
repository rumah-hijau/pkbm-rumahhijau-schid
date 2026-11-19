# Website PKBM Rumah Hijau (Next.js + Supabase)

Satu proyek berisi website utama, halaman berita publik, dan admin berita.

## Halaman
- `/` beranda: hero, program, syarat, galeri, story Instagram, kabar media sosial, berita terbaru, kontak
- `/berita` dan `/berita/[slug]` berita publik
- `/admin` kelola berita (login dulu), `/admin/login`

## Pasang
1. Buat project di supabase.com, jalankan `supabase/schema.sql` di SQL Editor.
2. Authentication > Providers > Email: **matikan "Allow new users to sign up"**.
3. Authentication > Users > Add user, lalu jalankan:
   `insert into admins (user_id) select id from auth.users where email = 'email-admin@contoh.com';`
4. Salin `.env.local.example` menjadi `.env.local` dan isi tiga variabelnya.
5. `npm install`, lalu `npm run dev`, buka http://localhost:3000
6. Deploy di Vercel dengan variabel env yang sama.

## Mengubah isi
- Kontak, alamat, jam layanan, nomor WhatsApp: `src/lib/site.ts`
- Program, syarat, galeri, story, kartu Instagram: `src/lib/content.ts`
- Foto: ganti file di `public/img/` (nama sama), atau tambah baris baru di `content.ts`
- Berita: lewat `/admin`, tampil otomatis di beranda dan `/berita` (diperbarui maksimal 1 menit)

Situs tetap jalan walau Supabase belum diisi; bagian berita hanya akan kosong.

## Membuka di HP
- **Lewat internet (paling mudah)**: deploy ke Vercel, lalu buka alamatnya di HP.
- **Saat pengembangan di komputer**: HP dan komputer harus satu Wi-Fi. Jalankan `npm run dev:hp`, cari alamat IP komputer
  (Windows: `ipconfig`, cari "IPv4 Address", misalnya 192.168.1.5), lalu buka `http://192.168.1.5:3000/admin` di HP.
  Jika halaman terbuka tapi tombol tidak jalan, isi `allowedDevOrigins` di `next.config.mjs` dengan IP komputer tersebut dan jalankan ulang.

## Format isi berita
`**tebal**`, `*miring*`, `## judul bagian`, baris berawalan `- ` untuk daftar, `[teks](https://tautan)` untuk tautan. Paragraf dipisah satu baris kosong. Tombol di editor mengisi format ini otomatis.
