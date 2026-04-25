# Google Workspace Integration (Gmail + Calendar + Contacts + Drive)

This project includes production API routes for Google OAuth and readonly data sync from Gmail, Calendar, Contacts, and Drive.

## Implemented routes

- `GET /api/google/status`
  - Shows whether OAuth base config and runtime credentials are available.
- `GET /api/google/connect`
  - Returns a Google OAuth consent URL.
- `GET /api/google/callback?code=...`
  - Exchanges auth code for tokens and returns the refresh token (if granted).
- `GET /api/google/gmail?query=in:inbox&max=10`
  - Returns message summaries.
- `GET /api/google/calendar?max=20`
  - Returns upcoming calendar events.
- `GET /api/google/contacts?max=30`
  - Returns Google Contacts summaries from People API.
- `GET /api/google/drive?max=20&query=<q>&shared=1`
  - Returns Drive file metadata and searches across Shared Drives by default.
- `GET /api/google/drive?driveId=<shared_drive_id>&query=<q>`
  - Targets a specific shared drive directly.

Also updated:
- `GET /api/integrations` now reflects live Google configured/not-configured status for Gmail, Calendar, Contacts, and Drive.
- `GET /api/email?live=1` will read from Gmail if Google is configured; otherwise it falls back to mock data.

## Required env vars

Set these in Vercel Project Settings → Environment Variables:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REDIRECT_URI` (production callback URL)
- `GOOGLE_REFRESH_TOKEN` (from callback exchange)

Use this callback in production:
- `https://ccs-crm-two.vercel.app/api/google/callback`

## OAuth setup flow

1. Configure OAuth consent screen and Desktop/Web OAuth app in Google Cloud.
2. Add redirect URI exactly:
   - `https://ccs-crm-two.vercel.app/api/google/callback`
3. Deploy with `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI` set.
4. Open:
   - `https://ccs-crm-two.vercel.app/api/google/connect`
5. Complete consent and copy returned `refreshToken` from callback JSON.
6. Save `GOOGLE_REFRESH_TOKEN` in Vercel env.
7. Redeploy.
8. Verify:
   - `/api/google/status`
   - `/api/google/calendar`
   - `/api/google/gmail`
   - `/api/google/contacts`
   - `/api/google/drive?shared=1`

## Notes

- Scopes are readonly for safety:
  - Gmail readonly
  - Calendar readonly
  - Contacts readonly
  - Drive readonly
- If you want write actions next (send email, create events, create contacts, upload files), we can add explicit write endpoints with confirmation gates.
