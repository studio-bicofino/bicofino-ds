-- 0002_storage_people_photos.sql
-- Bucket público + policies pra upload/update/delete por usuário autenticado.
-- Public read porque (a) Casa Nostra é app interna gateada por magic link no front,
-- (b) photos são identificadas por UUIDs não-enumeráveis, (c) simplifica preview no <img>.

insert into storage.buckets (id, name, public)
values ('people-photos', 'people-photos', true)
on conflict (id) do update set public = excluded.public;

-- Caso o painel já tenha criado policies com esses nomes, drop antes de recriar.
drop policy if exists "people-photos: authenticated upload" on storage.objects;
drop policy if exists "people-photos: authenticated update" on storage.objects;
drop policy if exists "people-photos: authenticated delete" on storage.objects;

create policy "people-photos: authenticated upload"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'people-photos');

create policy "people-photos: authenticated update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'people-photos')
  with check (bucket_id = 'people-photos');

create policy "people-photos: authenticated delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'people-photos');
