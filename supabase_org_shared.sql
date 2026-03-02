-- Run this in Supabase SQL Editor to switch songwriters table from per-user to
-- one shared organization-wide dataset.
--
-- Shared owner key used by the app:
-- 00000000-0000-0000-0000-000000000001
--
-- Allowed auth email domain:
-- insomniac.com

begin;

-- Collapse any existing per-user rows into one shared owner record per songwriter id.
create temporary table _songwriters_latest as
select distinct on (id)
  id,
  data,
  updated_at,
  created_at
from public.songwriters
order by id, updated_at desc, created_at desc;

delete from public.songwriters;

insert into public.songwriters (owner_id, id, data, updated_at, created_at)
select
  '00000000-0000-0000-0000-000000000001'::uuid as owner_id,
  id,
  data,
  updated_at,
  coalesce(created_at, now())
from _songwriters_latest;

drop table if exists _songwriters_latest;

drop policy if exists songwriters_select_own on public.songwriters;
drop policy if exists songwriters_insert_own on public.songwriters;
drop policy if exists songwriters_update_own on public.songwriters;
drop policy if exists songwriters_delete_own on public.songwriters;
drop policy if exists songwriters_select_org on public.songwriters;
drop policy if exists songwriters_insert_org on public.songwriters;
drop policy if exists songwriters_update_org on public.songwriters;
drop policy if exists songwriters_delete_org on public.songwriters;

create policy songwriters_select_org
  on public.songwriters
  for select
  to authenticated
  using (
    lower(split_part(coalesce(auth.email(), ''), '@', 2)) = 'insomniac.com'
    and owner_id = '00000000-0000-0000-0000-000000000001'::uuid
  );

create policy songwriters_insert_org
  on public.songwriters
  for insert
  to authenticated
  with check (
    lower(split_part(coalesce(auth.email(), ''), '@', 2)) = 'insomniac.com'
    and owner_id = '00000000-0000-0000-0000-000000000001'::uuid
  );

create policy songwriters_update_org
  on public.songwriters
  for update
  to authenticated
  using (
    lower(split_part(coalesce(auth.email(), ''), '@', 2)) = 'insomniac.com'
    and owner_id = '00000000-0000-0000-0000-000000000001'::uuid
  )
  with check (
    lower(split_part(coalesce(auth.email(), ''), '@', 2)) = 'insomniac.com'
    and owner_id = '00000000-0000-0000-0000-000000000001'::uuid
  );

create policy songwriters_delete_org
  on public.songwriters
  for delete
  to authenticated
  using (
    lower(split_part(coalesce(auth.email(), ''), '@', 2)) = 'insomniac.com'
    and owner_id = '00000000-0000-0000-0000-000000000001'::uuid
  );

commit;
