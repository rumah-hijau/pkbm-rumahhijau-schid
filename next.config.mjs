/** @type {import('next').NextConfig} */
const nextConfig = {
  // Batas bawaan unggahan Next.js hanya 1 MB, terlalu kecil untuk foto dari HP.
  experimental: { serverActions: { bodySizeLimit: '4mb' } },
  // Agar bisa dibuka dari HP saat npm run dev:hp. Jika diblokir, ganti dengan alamat IP komputer Anda, misalnya '192.168.1.5'.
  allowedDevOrigins: ['192.168.*.*', '10.*.*.*'],
}
export default nextConfig
