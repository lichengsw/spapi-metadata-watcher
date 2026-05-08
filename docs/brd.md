# BRD

## Product

SPAPI Metadata Watcher

## Problem

Amazon SP-API developers need early awareness of product metadata changes, especially marketplace and product type updates that can affect listings, validation rules, and feed behavior. The official flow is hard to consume operationally because updates are surfaced through a documentation page and spreadsheet release notes rather than a developer-first API or push workflow.

## Target Users

- SP-API integrators
- ERP and OMS engineering teams
- Listing automation teams
- Agencies and service providers building Amazon tooling
- Internal platform teams supporting multiple marketplaces

## Jobs To Be Done

- Tell me when a new metadata release is published.
- Let me filter updates to the marketplaces and product types my team owns.
- Give me a machine-readable payload that I can ingest without scraping Amazon pages.
- Show me examples so I can wire up my webhook receiver quickly.

## Scope For This Prototype

- Tool-style website that explains the product clearly
- Query API for latest release summary and update records
- Webhook subscription request flow
- Webhook test payload preview
- Docs and demo snippets in multiple languages

## Out Of Scope

- Real persistence
- Scheduled crawling from Amazon
- Auth, billing, or multi-tenant dashboards
- Retry queues and delivery logs

## Success Criteria

- A developer can understand the product in under one minute.
- A developer can find an API example in under thirty seconds.
- A developer can preview a webhook payload without reading external docs.
- The repo is credible as an open-source starter and can be deployed to Vercel.
