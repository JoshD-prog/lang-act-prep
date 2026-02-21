# Contributing

This document is for brand new developers joining this project.
It explains exactly what to install, how to configure environment variables, how to run the app with Bun, and how to open a pull request.

## 1. Project Summary

- Project: ACT Prep Classes marketing + enrollment site
- Framework: SvelteKit + TypeScript + Tailwind CSS
- Package manager/runtime: Bun
- Database/backend: Supabase
- Payments: Stripe
- Hosting: Vercel

## 2. Install Required Tools

Install these before doing anything else.

- Git
- Bun
- A code editor (VS Code recommended)
- OpenAI Codex (desktop app or CLI, signed in)
- Supabase CLI (optional, only needed if you will create/apply migrations)

### Windows install commands (PowerShell)

```powershell
winget install --id Git.Git -e
winget install --id Oven-sh.Bun -e
winget install --id Microsoft.VisualStudioCode -e
```

Verify installs:

```powershell
git --version
bun --version
```

Optional: install Supabase CLI (only if you will work on migrations):

```powershell
winget install --id Supabase.CLI -e
# If winget package is unavailable on your machine, use bunx for each CLI command instead:
bunx supabase@latest --version
```

## 3. Clone and Install Dependencies

```powershell
git clone <repo-url>
cd act-prep
bun install
```

## 4. Environment Variables (`.env`)

1. Copy the example file:

```powershell
Copy-Item example.env .env
```

2. Fill in real secret values in `.env`.

Minimum required variables for this app:

- `PUBLIC_SITE_URL`
- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_PRICE_ID`

Optional database connection values (used by Supabase tooling and DB access workflows):

- `POSTGRES_DATABASE`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`

How to get values:

- Supabase values: Supabase Dashboard -> Project Settings -> API / Database
- Stripe values: Stripe Dashboard -> Developers -> API keys, and Product Price ID from Products

Security rules:

- Never commit `.env`
- Never paste secrets into PR descriptions, issues, or chat
- Rotate keys immediately if accidentally exposed

## 5. Database Setup with Migrations

Most developers do not need to run this section.
Only use these steps if your change includes database schema/data migration work.

This repo uses migrations in `supabase/migrations`.

First-time setup:

```powershell
bun run db:login
$env:SUPABASE_PROJECT_REF="<your-project-ref>"
bun run db:link
bun run db:push
```

If you do not have the Supabase CLI installed globally, replace `bun run db:*` with `bunx supabase@latest ...`.

Find your project ref in Supabase Dashboard URL:

- `https://app.supabase.com/project/<project-ref>/...`

Create a new migration:

```powershell
bun run db:new <descriptive_name>
```

Then edit the generated SQL file and apply:

```powershell
bun run db:push
```

## 6. Run the App Locally

Start dev server:

```powershell
bun run dev
```

Open:

- `http://localhost:5173`

Useful scripts:

```powershell
bun run check
bun run build
bun run preview
```

## 7. Branching Strategy

Do not commit directly to `main`.
Create a feature branch for every change.

Recommended branch naming:

- `codex/<short-description>`
- `feature/<short-description>`
- `fix/<short-description>`

Example:

```powershell
git checkout main
git pull origin main
git checkout -b codex/contact-form-leads
```

## 8. Commit Guidelines

Make small, focused commits.

Good commit message examples:

- `feat: add contact form and server action`
- `fix: handle missing supabase env in server client`
- `docs: add migration steps to contributing guide`

Before committing:

```powershell
bun run check
bun run build
```

Commit and push:

```powershell
git add .
git commit -m "feat: add contact form and server action"
git push -u origin <your-branch-name>
```

## 9. Pull Request Process

1. Push your branch to GitHub.
2. Open a Pull Request from your branch into `main`.
3. Use a clear PR title.
4. Include these sections in PR description:

- What changed
- Why it changed
- How to test locally
- Database migration notes (if any)
- Screenshots for UI changes

5. Confirm CI checks pass.
6. Request review.
7. Address review comments with additional commits.

## 10. PR Checklist

- `bun run check` passes
- `bun run build` passes
- New/updated env vars documented
- Migration included for DB schema changes
- No secrets committed
- UI changes tested locally

## 11. Common Setup Issues

`bun: command not found`

- Re-open terminal after install
- Confirm Bun path is in your user environment variables
- Reinstall Bun if needed

`supabase: command not found`

- Install CLI with Winget (`winget install --id Supabase.CLI -e`)
- Or use `bunx supabase@latest <command>` instead of global install

Migration push fails with policy syntax errors:

- Use `drop policy if exists ...` followed by `create policy ...`
- Avoid `create policy if not exists` for compatibility

Form writes are not saved to DB:

- Verify `SUPABASE_SERVICE_ROLE_KEY` is present in `.env`
- Ensure migration creating the target table has been applied
