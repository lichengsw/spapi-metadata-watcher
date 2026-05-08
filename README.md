# SPAPI Metadata Watcher

SPAPI Metadata Watcher is a developer-first prototype for tracking Amazon SP-API metadata updates, normalizing marketplace and product type changes, and exposing them through a simple query API and webhook-oriented workflow.

The repo includes:

- A tool-style marketing site
- Working prototype API endpoints
- Product documentation
- Sample release data based on the May 2026 SP-API metadata release notes
- A zero-dependency local development server

## Why this exists

SP-API teams care about product metadata changes, but Amazon exposes them primarily through a release page and downloadable spreadsheets. This project turns those updates into something developers can consume directly:

- Query by marketplace, product type, or status
- Preview webhook payloads
- Model a future hosted service or self-hosted watcher

## Run locally

This project intentionally avoids external dependencies.

```bash
node dev-server.js
```

Then open `http://localhost:3000`.

## Prototype endpoints

- `GET /api/v1/releases/latest`
- `GET /api/v1/updates`
- `GET /api/v1/updates/latest`
- `POST /api/v1/subscriptions`
- `POST /api/v1/subscriptions/test`

Example:

```bash
curl "http://localhost:3000/api/v1/updates?marketplace=US&productType=COFFEE"
```

## Docs

- [BRD](./docs/brd.md)
- [Technical Design](./docs/technical-design.md)
- [API Guide](./docs/api.md)
- [Deployment Notes](./docs/deployment.md)

## Deploy

The repo is Vercel-friendly:

- Static files are served directly from the project root
- `api/` contains serverless functions
- `vercel.json` adds a clean `/docs` route

Deploy by importing the repository into Vercel, or by pushing the folder to a GitHub repo and connecting it from the Vercel dashboard.
