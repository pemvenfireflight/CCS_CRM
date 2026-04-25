# CCS CRM (Next.js 16)

Hybrid CRM scaffold for Creative Capital Strategies with API modules for leads, pipeline, tasks, integrations, LMS, portal, and email.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build checks

```bash
npm run lint
npm run build
```

## API routes

Core scaffold:
- `/api/health`
- `/api/leads`
- `/api/pipeline`
- `/api/tasks`
- `/api/integrations`
- `/api/summary`
- `/api/courses`
- `/api/portal`
- `/api/email`

Google Workspace integration:
- `/api/google/status`
- `/api/google/connect`
- `/api/google/callback`
- `/api/google/gmail`
- `/api/google/calendar`
- `/api/google/drive`

## Configuration

Copy `.env.example` to `.env.local` and fill values.

Google integration setup details:
- `docs/GOOGLE_WORKSPACE_INTEGRATION.md`
