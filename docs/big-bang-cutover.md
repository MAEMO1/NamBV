# Big-Bang Cutover Release

## Vereiste env-vars

```
DATABASE_URL
DIRECT_URL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY
ADMIN_EMAIL
SENTRY_DSN
NEXT_PUBLIC_SENTRY_DSN
CRON_SECRET
```

Voor build-time Sentry release-creatie en sourcemap-upload zijn daarnaast nodig:

```
SENTRY_AUTH_TOKEN
SENTRY_ORG
SENTRY_PROJECT
```

## Voorwaarden

- Vercel CLI moet ingelogd en aan dit project gelinkt zijn.
- Preview- en production-secrets moeten vooraf in Vercel staan.
- `SUPABASE_SERVICE_ROLE_KEY` is verplicht voor asset-upload smoke.
- Zonder `SENTRY_AUTH_TOKEN` + `SENTRY_ORG` + `SENTRY_PROJECT` werkt runtime capture wel, maar geen release-creatie, geen sourcemap-upload en geen API-gebaseerde eventvalidatie.

## Preview env lokaal binnenhalen

```bash
npm run vercel:pull:preview
npm run release:check-env:preview
```

Alle preview-commando's hieronder draaien met:

```bash
set -a
source .env.vercel.preview.local
set +a
```

## Productie env lokaal binnenhalen

```bash
npm run vercel:pull:production
npm run release:check-env:production
```

Alle production-commando's hieronder draaien met:

```bash
set -a
source .env.vercel.production.local
set +a
```

## Staging / preview releasevolgorde

1. Trek preview env lokaal binnen:
   `npm run vercel:pull:preview`
2. Controleer dat alle vereiste preview env-vars aanwezig zijn:
   `npm run release:check-env:preview`
3. Controleer Prisma migratiestatus tegen de preview database:
   `npm run db:migrate:status`
4. Als `20260412143000_baseline` nog niet geregistreerd is maar de preview DB al op het huidige schema zit:
   `npm run db:migrate:baseline`
5. Voer daarna de preview migration deploy uit:
   `npm run db:migrate:deploy`
6. Valideer lokaal/buildbaar tegen preview secrets:
   `npm run lint`
   `npm run typecheck`
   `npm run test`
   `npm run build`
7. Deploy naar preview:
   `vercel deploy -y`
8. Draai direct na deploy de read-only smoke-suite tegen de preview-URL:
   `PLAYWRIGHT_BASE_URL=<preview-url> npm run test:smoke`
   Gebruik bij een protected preview ook:
   `VERCEL_SHARE_URL=<share-url>`
9. Draai verplicht daarna ook de muterende admin smoke tegen dezelfde preview-URL:
   `ADMIN_SMOKE_MUTATIONS=1 RUN_ASSET_SMOKE=1 V2_ADMIN_PASSWORD=<admin-password> PLAYWRIGHT_BASE_URL=<preview-url> VERCEL_SHARE_URL=<share-url> npm run test:smoke`
10. Stop de flow direct als Prisma drift meldt, build faalt, smoke faalt of asset-upload niet werkt.

## Productie releasevolgorde

1. Trek production env lokaal binnen:
   `npm run vercel:pull:production`
2. Controleer dat alle vereiste production env-vars aanwezig zijn:
   `npm run release:check-env:production`
3. Maak vlak voor productie een snapshot-backup:
   `npm run admin:export-snapshot`
4. Verifieer dat het snapshotbestand bestaat in `snapshots/` en buiten deploy-artifacts blijft.
5. Controleer Prisma migratiestatus tegen de production database:
   `npm run db:migrate:status`
6. Als `20260412143000_baseline` nog niet geregistreerd is maar production al op het huidige schema zit:
   `npm run db:migrate:baseline`
7. Voer daarna de production migration deploy uit:
   `npm run db:migrate:deploy`
8. Deploy naar productie:
   `vercel deploy --prod -y`
9. Draai direct daarna de production smoke-suite:
   `npm run test:smoke:prod`
10. Verifieer handmatig:
   admin login
   content laden in admin
   settings laden in admin
   publieke home, offerte, afspraak en projecten
   `GET /api/health/live`
   `GET /api/health/ready`

## Rollback

1. Redeploy de vorige build.
2. Herstel de admin-data eerst als dry-run:
   `npm run admin:import-snapshot -- --file snapshots/admin-snapshot-<timestamp>.json`
3. Voer de restore alleen daarna echt uit:
   `npm run admin:import-snapshot -- --file snapshots/admin-snapshot-<timestamp>.json --apply`

## Observability

- `GET /api/health/live` voor liveness
- `GET /api/health/ready` voor DB + env-readiness
- `GET /api/cron/lead-integrity` en `GET /api/cron/auth-anomaly` worden via `vercel.json` elke 15 minuten gepland
- Cron-calls vereisen `Authorization: Bearer ${CRON_SECRET}`
- Valideer Sentry na deploy via een gecontroleerde testfout of Sentry test-event
- Die validatie vereist een lokaal gezet `SENTRY_AUTH_TOKEN` met read scopes zoals `project:read`, `event:read` en `org:read`
- Run beide cron-endpoints handmatig na productie en controleer 200-responses plus verwachte payloads
