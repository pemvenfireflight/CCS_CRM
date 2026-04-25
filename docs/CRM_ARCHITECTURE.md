# CCS CRM Hybrid Architecture (Zoho + HighLevel + Odoo)

## Product vision
A unified operating layer for Creative Capital Strategies that blends:
- Zoho as relationship backbone and forms intake source
- HighLevel for nurture automations and messaging cadence
- Odoo for operations, invoicing, and fulfillment state

This web app is the control plane where your team sees one coherent pipeline.

## Core modules implemented
1. Executive command center dashboard
2. Lead table with source-aware origin tags
3. Opportunity pipeline snapshot and weighted forecast
4. Workflow task board summary
5. Integration health panel (Zoho / HighLevel / Odoo)
6. API routes for frontend and external tool consumption

## API routes
- `GET /api/health`
- `GET /api/leads`
- `GET /api/pipeline`
- `GET /api/tasks`
- `GET /api/integrations`
- `GET /api/summary`

## Suggested next implementation phases
1. Add Postgres + Prisma models for leads/opportunities/tasks/events
2. Add OAuth token refresh workers per provider
3. Build event bus (webhooks -> normalized events table)
4. Add role-based views (sales/advisor/ops/admin)
5. Add automations panel with run history + retries
6. Add client portal and document request lifecycle

## Design language
- Dark premium base with vivid cyan, indigo, emerald accents
- Data density optimized for operator workflow
- Card-driven sections built for quick scan and action
