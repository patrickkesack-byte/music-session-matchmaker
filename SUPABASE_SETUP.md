# Supabase Setup (Login + Shared Songwriter DB)

## 1. Create project
1. Create a Supabase project.
2. In `Authentication > Providers`, enable Email.
3. In `Project Settings > API`, copy:
   - Project URL
   - `anon` public key

## 2. Create database table + RLS
1. Open Supabase SQL Editor.
2. Run `/Users/patrick.kesack/Downloads/AI/music-session-matchmaker/supabase_schema.sql`.
3. For one shared org-wide songwriter database (all logged-in org users share the same data), run:
   - `/Users/patrick.kesack/Downloads/AI/music-session-matchmaker/supabase_org_shared.sql`

## 3. Configure app
1. Open app.
2. Go to `Calendar` tab.
3. Open `Calendar Settings`.
4. Set:
   - `Supabase URL`
   - `Supabase Anon Key`
5. Click outside the panel (values auto-save on field change).

## 4. Create/login user
1. Click `Sign In` (top right).
2. Use `Create Account` once, then `Sign In`.
3. After login, songwriter data syncs to Supabase and appears across logged-in devices using the same account.

## Notes
- If you are logged in, Supabase sync is used for songwriters.
- If you are not logged in, the app falls back to local storage (and optional shared API URL if configured).
- Access is allowed for any `@insomniac.com` account plus the explicit allowlisted email `nicksheldon@me.com`.
