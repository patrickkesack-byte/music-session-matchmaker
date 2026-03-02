-- Run this in Supabase SQL Editor

create table if not exists public.songwriters (
  owner_id uuid not null default auth.uid(),
  id text not null,
  data jsonb not null,
  updated_at bigint not null default (extract(epoch from now()) * 1000)::bigint,
  created_at timestamptz not null default now(),
  primary key (owner_id, id)
);

alter table public.songwriters enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'songwriters'
      and policyname = 'songwriters_select_own'
  ) then
    create policy songwriters_select_own
      on public.songwriters
      for select
      to authenticated
      using (owner_id = auth.uid());
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'songwriters'
      and policyname = 'songwriters_insert_own'
  ) then
    create policy songwriters_insert_own
      on public.songwriters
      for insert
      to authenticated
      with check (owner_id = auth.uid());
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'songwriters'
      and policyname = 'songwriters_update_own'
  ) then
    create policy songwriters_update_own
      on public.songwriters
      for update
      to authenticated
      using (owner_id = auth.uid())
      with check (owner_id = auth.uid());
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'songwriters'
      and policyname = 'songwriters_delete_own'
  ) then
    create policy songwriters_delete_own
      on public.songwriters
      for delete
      to authenticated
      using (owner_id = auth.uid());
  end if;
end $$;

create index if not exists songwriters_owner_updated_idx
  on public.songwriters (owner_id, updated_at desc);
