'use client'
export default function PickLink({ paket, children }: { paket: string; children: React.ReactNode }) {
  return <a href="#daftar" onClick={() => window.dispatchEvent(new CustomEvent('pilih-paket', { detail: paket }))}>{children}</a>
}
