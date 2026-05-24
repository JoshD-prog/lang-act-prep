# Scholarship Data Workflow

Use this workflow before adding or changing scholarship rows.

## Prepare New Rows

1. Copy `tools/fixtures/scholarship-import-template.csv`.
2. Fill one row per scholarship band or path.
3. Keep `projected_total_usd = annual_award_usd * years_assumed`.
4. Use `residency_rule_type = all_students` unless the award is explicitly limited.
5. Add `eligible_states` for `in_state`, `out_of_state`, `regional`, `specific_states`, and `metro_exception` rows.
6. Add `regional_rule_note` whenever a residency rule is not obvious.
7. Add `source_url` or `scholarship_page_url` for every row.
8. Add `tier_last_updated` using `YYYY-MM-DD`.

## Audit Local Rows

```bash
npm run scholarships:audit -- --input=tools/fixtures/scholarship-import-template.csv
```

Use the same command with your prepared CSV or JSON export.

The current expansion batch can be audited with:

```bash
npm run scholarships:audit -- --input=tools/fixtures/scholarship-expansion-2026.csv
```

Regenerate the matching migration after fixture edits:

```bash
npm run scholarships:seed-sql
```

If the local sandbox blocks writing under `supabase/migrations`, the script writes the generated SQL to `tmp/scholarship-expansion.sql` instead.

## Audit Live Rows

When Supabase network access works:

```bash
npm run scholarships:export -- --output=tmp/scholarship-rows.json
npm run scholarships:audit -- --input=tmp/scholarship-rows.json
```

## Apply Expansion Migration

The reviewed expansion migration is:

```text
supabase/migrations/20260522000300_seed_scholarship_expansion.sql
```

Apply it with:

```bash
bun run db:push
```

If `bunx supabase` fails with a certificate error while downloading the Supabase CLI, install or repair the Supabase CLI locally, then rerun `bun run db:push`.

## Validate Calculator Behavior

Start the app first:

```bash
npm run dev
```

Then run:

```bash
npm run scholarships:validate -- --base-url=http://127.0.0.1:4176
```

Against an environment with live scholarship rows:

```bash
npm run scholarships:validate:strict -- --base-url=https://example.com
```

## Rules Of Thumb

- Treat `best` as a ranking mode, not a data bucket.
- Treat `local` and `default` as data buckets.
- Prefer official source rows over modeled rows.
- Mark modeled data clearly in `source_note`.
- Do not add new schools until live rows pass audit.
