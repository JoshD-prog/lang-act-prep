# AGENTS.md

## Project Overview
This repository contains the ACT Prep Classes marketing and enrollment website.
The implementation uses SvelteKit (Svelte 5 + TypeScript), Tailwind CSS, Supabase, and Stripe.

## Primary Goals
- Present clear class information and pricing.
- Support a clean enrollment funnel to Stripe checkout.
- Provide school-specific landing pages that map to the same core offering.
- Provide a scholarship calculator that shows current and next scholarship tiers.
- Keep structure compatible with future CMS integration.

## Core Architecture
- Frontend routes are under `src/routes`.
- Shared view components are in `src/lib/components`.
- Shared content descriptors and static fallbacks are in `src/lib/content`.
- Server-side data and integration helpers are in `src/lib/server`.
- Supabase schema and seed SQL is in `supabase/schema.sql`.

## Key Routes
- `/` home
- `/about`
- `/classes`
- `/sales-funnel`
- `/resources`, `/resources/for-parents`, `/resources/for-educators`
- `/529-update`
- `/scholarship-calculator`
- `/schools` and `/schools/[slug]`
- `/enroll`
- `/checkout`, `/success`, `/cancel`
- `POST /api/checkout`

## Data Model Notes
- `class_offerings`: classes and pricing.
- `schools`: school-specific page metadata.
- `college_scholarship_tiers`: thresholds used by calculator.
- `enrollment_leads`: intake form submissions.
- `cms_pages` + `cms_sections`: future CMS-oriented content structure.

## Environment Variables
- Public:
  - `PUBLIC_SITE_URL`
  - `PUBLIC_SUPABASE_URL`
  - `PUBLIC_SUPABASE_ANON_KEY`
- Private:
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `STRIPE_SECRET_KEY`
  - `STRIPE_PRICE_ID`

## Implementation Conventions
- Prefer using existing shared components (`Hero`, `PageSection`, `SchoolGrid`, `ScholarshipCalculator`) before creating new one-off blocks.
- Keep route pages section-based to preserve CMS migration path.
- Server code should fall back to mock content if Supabase is unavailable.
- Use server-side Stripe session creation only; do not expose secret keys client-side.

## Safe Change Workflow
1. Inspect existing route and shared component before adding new files.
2. Prefer minimal changes within existing structures.
3. Keep new table/field additions reflected in both SQL and TypeScript mappers.
4. Run validation with Bun before finalizing: `bun run check` or `bun run build`.
