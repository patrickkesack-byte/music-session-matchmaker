-- Run this in Supabase SQL Editor to update the shared org-wide access policy
-- without rewriting existing songwriter rows.
--
-- Allowed auth email domain:
-- insomniac.com
--
-- Allowed individual auth emails:
-- nicksheldon@me.com

begin;

drop policy if exists songwriters_select_org on public.songwriters;
drop policy if exists songwriters_insert_org on public.songwriters;
drop policy if exists songwriters_update_org on public.songwriters;
drop policy if exists songwriters_delete_org on public.songwriters;

create policy songwriters_select_org
  on public.songwriters
  for select
  to authenticated
  using (
    (
      lower(split_part(coalesce(auth.email(), ''), '@', 2)) = 'insomniac.com'
      or lower(coalesce(auth.email(), '')) = 'nicksheldon@me.com'
    )
    and owner_id = '00000000-0000-0000-0000-000000000001'::uuid
  );

create policy songwriters_insert_org
  on public.songwriters
  for insert
  to authenticated
  with check (
    (
      lower(split_part(coalesce(auth.email(), ''), '@', 2)) = 'insomniac.com'
      or lower(coalesce(auth.email(), '')) = 'nicksheldon@me.com'
    )
    and owner_id = '00000000-0000-0000-0000-000000000001'::uuid
  );

create policy songwriters_update_org
  on public.songwriters
  for update
  to authenticated
  using (
    (
      lower(split_part(coalesce(auth.email(), ''), '@', 2)) = 'insomniac.com'
      or lower(coalesce(auth.email(), '')) = 'nicksheldon@me.com'
    )
    and owner_id = '00000000-0000-0000-0000-000000000001'::uuid
  )
  with check (
    (
      lower(split_part(coalesce(auth.email(), ''), '@', 2)) = 'insomniac.com'
      or lower(coalesce(auth.email(), '')) = 'nicksheldon@me.com'
    )
    and owner_id = '00000000-0000-0000-0000-000000000001'::uuid
  );

create policy songwriters_delete_org
  on public.songwriters
  for delete
  to authenticated
  using (
    (
      lower(split_part(coalesce(auth.email(), ''), '@', 2)) = 'insomniac.com'
      or lower(coalesce(auth.email(), '')) = 'nicksheldon@me.com'
    )
    and owner_id = '00000000-0000-0000-0000-000000000001'::uuid
  );

commit;
