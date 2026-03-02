# Session Matchmaker

A lightweight MVP web app for music publishers to run session pairings and manage a tag-based songwriter roster.

## What it does

- Maintains songwriter profiles with required bio, location, and contacts
- Supports optional calendar linkage per songwriter:
  - `calendar_provider` = `google` or `icloud`
  - `calendar_id` = Google Calendar ID or iCloud ICS URL
- Supports `preferred_contact` (`email` or `text`) per songwriter
- Supports `published` status per songwriter
- Lets each pairing optionally filter to `published` writers only
- Supports schedule modes: `specific date` or `range of dates`
- Imports songwriter CSV rows into the app database
- Auto-extracts tags from session brief text
- Scores and ranks songwriter fit by tag overlap
- Stores every pairing and tracks an `Open Pairings` queue for approval workflow
- Checks availability in `Schedule` phase (after pairing approval), not during fit pairing
- Generates a downloadable pairing report with best options and songwriter bios
- Supports an approval workflow into `Schedule` where outreach can be sent via preferred email/text
- On `Mark Confirmed`, creates a Google Calendar event on the shared calendar (first Studio Calendar ID)
- Stores data in browser `localStorage`

## CSV import format

Use `/Users/patrick.kesack/Downloads/AI/music-session-matchmaker/songwriter_import_template.csv`.

Headers must be:

- `name`
- `location` (required)
- `personal_contact` (required)
- `manager_contact` (required)
- `preferred_contact` (optional, `email` default or `text`)
- `calendar_provider` (optional, `google` default or `icloud`)
- `published` (optional, accepts `true/false`, `yes/no`, `1/0`; defaults to `false`)
- `tags`
- `bio` (required)
- `notes`
- `calendar_id` (optional, Google Calendar ID or iCloud ICS URL)

Tag format:

- In CSV, tags are `|`-separated in the `tags` column
- Example: `topliner|dance pop|weeknights|major label pop`
- The app automatically appends `location` as a tag if it is not already present

## Pairing logic

- Required tags are auto-extracted from session brief + session location
- Candidate threshold: `40%` minimum fit
- Session option: include all writers or only `published` writers
- Availability is checked later in `Schedule` (`Check Availability` / `Check Availability for All`)

## Google Calendar local setup

- Create a Google OAuth Web Client in Google Cloud
- Add `http://localhost:8000` (or your chosen localhost port) to Authorized JavaScript origins
- Use scopes:
  - `https://www.googleapis.com/auth/calendar.readonly`
  - `https://www.googleapis.com/auth/calendar.events`
- Run the app from localhost (for example: `python3 -m http.server 8000`), not `file://`
- If you previously connected with read-only scope, disconnect and reconnect so event creation permission is granted

## iCloud calendar support

- Use songwriter `calendar_provider = icloud` and set `calendar_id` to a shared ICS/webcal URL
- If direct browser fetch is blocked, set `iCloud ICS Proxy URL` in the app (local proxy recommended)
