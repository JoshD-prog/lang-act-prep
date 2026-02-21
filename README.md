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
Use Supabase migrations in `supabase/migrations` as the source of truth.

1. Install/login/init CLI:
   ```bash
   bun run db:login
   bun run db:init
   ```
2. Set your project ref and link:
   ```bash
   export SUPABASE_PROJECT_REF=your-project-ref
   bun run db:link
   ```
3. Apply migrations:
   ```bash
   bun run db:push
   ```

Baseline migration:
- `supabase/migrations/20260221000100_init_schema.sql`

Notes:
- `supabase/schema.sql` remains a schema snapshot/reference.
- Create new migrations with:
  ```bash
  bun run db:new <migration_name>
  ```

## Important Routes
- `/` home
- `/about`
- `/classes`
- `/how-it-works`
- `/enroll`
- `/checkout`
- `/scholarship-calculator`
- `/schools`
- `/schools/[slug]`
- `/resources`
- `/529-update`
- `/contact`

## Stripe Flow
- `POST /api/checkout` creates a Stripe checkout session.
- `/checkout` server action and page provide fallback UI if Stripe keys are missing.

## CMS Readiness
The page structures use reusable section patterns and route-level content descriptors from `src/lib/content/site.ts` and shared components.
