# Deployment

## Vercel

This repository is structured for direct Vercel deployment:

- static pages at root
- API routes in `api/`
- optional clean URL rewrite for `/docs`

## Local verification

```bash
node dev-server.js
```

Open:

- `http://localhost:3000`
- `http://localhost:3000/docs`
- `http://localhost:3000/api/v1/releases/latest`

## GitHub

Recommended repository name:

`spapi-metadata-watcher`

Recommended visibility:

Public

## After prototype stage

- add persistence for subscriptions
- store normalized release files
- connect crawler jobs
- add delivery retry logs
