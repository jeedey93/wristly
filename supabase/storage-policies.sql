-- Run this in Supabase SQL Editor after schema.sql
-- Dashboard → SQL Editor → New query → paste → Run

create policy "Authenticated users can upload watch photos"
  on storage.objects for insert
  with check (bucket_id = 'watch-photos' and auth.role() = 'authenticated');

create policy "Watch photos are publicly readable"
  on storage.objects for select
  using (bucket_id = 'watch-photos');

create policy "Users can delete their own photos"
  on storage.objects for delete
  using (bucket_id = 'watch-photos' and auth.uid()::text = (storage.foldername(name))[1]);
