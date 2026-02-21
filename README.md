# ACT Prep Classes Marketing Site

SvelteKit + TypeScript + Tailwind marketing and enrollment site for ACT prep offerings.

## Stack
- Svelte 5 + SvelteKit
- Tailwind CSS
- Supabase (content + operational data)
- Stripe Checkout (enrollment payment)
- Vercel deployment adapter

## Setup
If `bun` is not on PATH in your shell, run:
```bash
source ~/.zshrc
```

1. Install dependencies:
   ```bash
   bun install
   ```
2. Configure environment variables in `.env`:
   - `PUBLIC_SITE_URL`
   - `PUBLIC_SUPABASE_URL`
   - `PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PRICE_ID`
3. Run the app:
   ```bash
   bun run dev
   ```

## Database
Apply `supabase/schema.sql` to create tables and seed starter data for classes, schools, and scholarship tiers.

## Important Routes
- `/` home
- `/about`
- `/classes`
- `/sales-funnel`
- `/enroll`
- `/checkout`
- `/scholarship-calculator`
- `/schools`
- `/schools/[slug]`
- `/resources`
- `/529-update`

## Stripe Flow
- `POST /api/checkout` creates a Stripe checkout session.
- `/checkout` server action and page provide fallback UI if Stripe keys are missing.

## CMS Readiness
The page structures use reusable section patterns and route-level content descriptors from `src/lib/content/site.ts` and shared components.
