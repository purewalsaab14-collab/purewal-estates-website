-- Run this entire script in Supabase Dashboard > SQL Editor > New query.
create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  location text not null,
  area text,
  price text,
  status text not null default 'Available',
  description text,
  image_url text,
  created_at timestamptz not null default now()
);

alter table public.properties enable row level security;

drop policy if exists "Anyone can view available properties" on public.properties;
drop policy if exists "Admins can view all properties" on public.properties;
create policy "Public can view available properties"
on public.properties for select
to anon
using (status = 'Available');

create policy "Admins can view all properties"
on public.properties for select
to authenticated
using (true);

drop policy if exists "Authenticated admins can add properties" on public.properties;
create policy "Authenticated admins can add properties"
on public.properties for insert
to authenticated
with check (true);

drop policy if exists "Authenticated admins can update properties" on public.properties;
create policy "Authenticated admins can update properties"
on public.properties for update
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated admins can delete properties" on public.properties;
create policy "Authenticated admins can delete properties"
on public.properties for delete
to authenticated
using (true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('property-photos','property-photos',true,8388608,array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public=true, file_size_limit=8388608, allowed_mime_types=array['image/jpeg','image/png','image/webp'];

drop policy if exists "Public can view property photos" on storage.objects;
create policy "Public can view property photos"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'property-photos');

drop policy if exists "Admins can upload property photos" on storage.objects;
create policy "Admins can upload property photos"
on storage.objects for insert
to authenticated
with check (bucket_id = 'property-photos');

drop policy if exists "Admins can update property photos" on storage.objects;
create policy "Admins can update property photos"
on storage.objects for update
to authenticated
using (bucket_id = 'property-photos')
with check (bucket_id = 'property-photos');

drop policy if exists "Admins can delete property photos" on storage.objects;
create policy "Admins can delete property photos"
on storage.objects for delete
to authenticated
using (bucket_id = 'property-photos');
