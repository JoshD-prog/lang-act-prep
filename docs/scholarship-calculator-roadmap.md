# Scholarship Calculator Roadmap

## Current Priority

Make the calculator trustworthy before expanding the school list. The next major work should focus on live data validation, explicit scholarship semantics, and regression coverage.

## Completed In Current Pass

- Fixed below-band students being shown a future tier as their current award.
- Added `No automatic tier yet` and `$0` baseline behavior.
- Improved band handling for max GPA/ACT ranges.
- Added nearby, longer-range, and competitive upside messaging lanes.
- Added score target snapshots and a top nearby value summary.
- Added backend-derived classification badges for merit tier, competitive, application-required, GPA-based, ACT-based, GPA + ACT, modeled estimate, and renewable labels.
- Added source type, modeled estimate, last-updated, eligibility, residency, and renewal notes.
- Added visible data-change disclaimer.
- Added calculator scenario validation script.
- Added scholarship data audit script with Supabase, JSON, and CSV input modes.
- Added scholarship data export script for creating JSON audit inputs from a working Supabase environment.
- Added `--base-url`, `--strict`, and help output for scenario validation.
- Clarified filter semantics: `best` is a ranking mode, while `default` and `local` are bucket filters.
- Added scholarship data workflow documentation and a CSV import template for staged school expansion.
- Added reviewed expansion fixture for Nebraska, Oklahoma State, Arkansas State, and University of Arkansas.
- Added generated Supabase seed migration for those four schools.
- Updated scholarship logic so competitive/application-required rows do not become the current automatic award.
- Split scholarship display helpers, the empty state, the outlook summary, and the opportunity panel out of the main calculator component.
- Collapsed secondary "Higher tiers after that" content behind a see-more disclosure to keep each card focused on the main opportunity.
- Removed eligibility-note blocks from calculator cards to keep the tool focused on value/score opportunity rather than full scholarship research.
- Updated card ordering so nearby ACT-driven value opportunities rise first and non-ACT award paths fall lower in the list.
- Added Nebraska in-state score-influenced competitive scholarship rows so Nebraska residents still see UNL opportunities.

## Known Risks And Follow-Ups

1. The expansion migration is ready but has not been applied; local `bun run db:push` is blocked by a certificate error while downloading the Supabase CLI.
2. Live Supabase audit should be rerun after the migration is applied.
3. Strict scenario validation should be run against live data with `STRICT_SCHOLARSHIP_SCENARIOS=1`.
4. The top nearby opportunities summary now shows one best opportunity per school.
5. Classification badges are derived from existing fields; add explicit database fields later if derivation is not precise enough.
6. Banded-grid behavior needs verification against real scholarship rows after the expansion migration lands.
7. Scenario validation depends on a running dev or deployed server; the script now prints usage and accepts `--base-url`.
8. The main calculator component is smaller, but the school-card body can still be split further before deeper visual work.
9. If more filter modes are added, explicitly decide whether each option filters the data set or only changes ranking.

## Next Steps

1. Apply pending Supabase migrations, including `supabase/migrations/20260522000400_seed_nebraska_in_state_scholarships.sql`.
2. Export and audit live rows again with `npm run scholarships:export -- --output=tmp/scholarship-rows.json` and `npm run scholarships:audit -- --input=tmp/scholarship-rows.json`.
3. Run `npm run scholarships:validate:strict` against an environment with live scholarship rows.
4. Review the new-school cards in the browser, especially the collapsed higher-tier section, nearby-value ordering, Nebraska's competitive/range-only treatment, and Arkansas's GPA-only NRTA rows.
5. Add explicit database award-type fields if derived classification is not precise enough.
6. Continue splitting the school-card body into smaller components before deeper UX/visual work.
