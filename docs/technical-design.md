# Technical Design

## Architecture

The prototype uses a static-first structure so it can deploy cleanly on Vercel without a build step:

- Static website pages at the project root
- Prototype serverless API handlers under `api/`
- Shared service and sample data under `lib/`
- A local `dev-server.js` that mirrors the Vercel route model for development

## Runtime Model

The website is a static frontend with light client-side fetches to local API routes for:

- latest release summary
- latest normalized change records
- live payload demo

The API handlers are intentionally thin. They:

- validate method and basic input
- call pure service functions
- return normalized JSON

## Data Model

The sample dataset is derived from the May 2026 metadata release:

- release metadata
- marketplace summary
- top product types
- normalized change records

Each change record includes:

- release month
- marketplace
- product type
- attribute
- update type
- update text
- status
- contributor type

## Design Principles

- Developer-first language
- Fast comprehension over marketing copy
- Query API and webhook paths shown equally
- Resend-inspired clarity with calmer industrial styling
- No fake dashboard clutter

## Future Extension Path

- Replace `lib/data.js` with crawled and persisted release data
- Add webhook persistence and delivery retries
- Add auth and per-team subscriptions
- Add full OpenAPI generation and SDK publishing
