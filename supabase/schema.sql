-- Skema lengkap PKBM Rumah Hijau. Aman dijalankan berulang kali.
-- Supabase: SQL Editor > New query > tempel semua > Run.
-- GANTI email di baris paling bawah dengan email yang dipakai login admin.

create table if not exists public.admins (
  user_id uuid primary key references auth.users on delete cascade
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text not null,
  cover_url text,
  category text not null default 'Berita',
  published boolean not null default false,
  published_at timestamptz,
  author_id uuid default auth.uid() references auth.users,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.is_admin() returns boolean
language sql security definer set search_path = public stable as
$$ select exists (select 1 from public.admins where user_id = auth.uid()) $$;

alter table public.admins enable row level security;
alter table public.posts enable row level security;

drop policy if exists "admin baca barisnya sendiri" on public.admins;
create policy "admin baca barisnya sendiri" on public.admins for select using (user_id = auth.uid());

drop policy if exists "publik baca berita terbit" on public.posts;
create policy "publik baca berita terbit" on public.posts for select using (published = true);

drop policy if exists "admin kelola berita" on public.posts;
create policy "admin kelola berita" on public.posts for all using (public.is_admin()) with check (public.is_admin());

-- Bucket foto sampul: publik boleh melihat, hanya admin yang boleh mengelola
insert into storage.buckets (id, name, public) values ('post-images', 'post-images', true)
  on conflict (id) do nothing;

drop policy if exists "publik lihat gambar" on storage.objects;
create policy "publik lihat gambar" on storage.objects for select using (bucket_id = 'post-images');
drop policy if exists "admin unggah gambar" on storage.objects;
create policy "admin unggah gambar" on storage.objects for insert with check (bucket_id = 'post-images' and public.is_admin());
drop policy if exists "admin ubah gambar" on storage.objects;
create policy "admin ubah gambar" on storage.objects for update using (bucket_id = 'post-images' and public.is_admin());
drop policy if exists "admin hapus gambar" on storage.objects;
create policy "admin hapus gambar" on storage.objects for delete using (bucket_id = 'post-images' and public.is_admin());

-- Izin akses tabel untuk peran aplikasi (RLS di atas tetap membatasi siapa boleh apa)
grant usage on schema public to anon, authenticated;
grant select on public.admins to authenticated;
grant select on public.posts to anon, authenticated;
grant insert, update, delete on public.posts to authenticated;
grant execute on function public.is_admin() to anon, authenticated;

-- Jadikan akun admin (ganti emailnya)
insert into public.admins (user_id)
select id from auth.users where email = 'GANTI-DENGAN-EMAIL-LOGIN'
on conflict do nothing;

-- Pemeriksaan: kolom is_admin harus true untuk emailmu
select u.email, exists (select 1 from public.admins a where a.user_id = u.id) as is_admin
from auth.users u;
