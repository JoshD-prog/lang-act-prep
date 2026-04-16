# Analytics

This app uses a direct Google Analytics 4 `gtag.js` integration.

## Environment variable

- `PUBLIC_GA_MEASUREMENT_ID`

If `PUBLIC_GA_MEASUREMENT_ID` is unset, analytics no-ops cleanly in the browser and no Google tag is loaded.

## Initialization

- GA is initialized in [Analytics.svelte](/C:/Users/Adam%20Teaching/Projects/lang-act-prep/src/lib/components/Analytics.svelte:1).
- The shared helper lives in [index.ts](/C:/Users/Adam%20Teaching/Projects/lang-act-prep/src/lib/analytics/index.ts:1).
- The root layout mounts the client-only analytics component in [+layout.svelte](/C:/Users/Adam%20Teaching/Projects/lang-act-prep/src/routes/+layout.svelte:1).

## Tracked events

- `page_view`: fired on the initial client navigation and later SvelteKit route changes.
- `enroll_click`: fired from the main enroll CTA links in:
  - [Nav.svelte](/C:/Users/Adam%20Teaching/Projects/lang-act-prep/src/lib/components/Nav.svelte:1)
  - [ScholarshipCalculator.svelte](/C:/Users/Adam%20Teaching/Projects/lang-act-prep/src/lib/components/ScholarshipCalculator.svelte:1)
  - [classes/+page.svelte](/C:/Users/Adam%20Teaching/Projects/lang-act-prep/src/routes/classes/+page.svelte:1)
  - [schools/[slug]/+page.svelte](/C:/Users/Adam%20Teaching/Projects/lang-act-prep/src/routes/schools/[slug]/+page.svelte:1)
  - [529-update/+page.svelte](/C:/Users/Adam%20Teaching/Projects/lang-act-prep/src/routes/529-update/+page.svelte:1)
- `checkout_visit`: fired on [checkout/+page.svelte](/C:/Users/Adam%20Teaching/Projects/lang-act-prep/src/routes/checkout/+page.svelte:1) when the user lands on the app's `/checkout` review page.
- `purchase_complete`: fired on [success/+page.svelte](/C:/Users/Adam%20Teaching/Projects/lang-act-prep/src/routes/success/+page.svelte:1) after Stripe returns with a paid `session_id`.

## UTM handling

- The analytics helper stores inbound UTM values in session storage.
- Enroll links append stored UTM params so attribution survives internal navigation.
- The `/enroll` and `/checkout` forms carry those UTM params through server redirects.
- Stripe `success_url` and `cancel_url` also preserve the same UTM params.

## Local testing

1. Set `PUBLIC_GA_MEASUREMENT_ID` in `.env`.
2. Run `bun run dev`.
3. Open a URL with test params like `?utm_source=facebook&utm_medium=social&utm_campaign=act_june`.
4. Navigate through an enroll CTA, the `/checkout` page, and the Stripe success return flow.

## Verification

- GA4 DebugView:
  - Enable GA debug mode with the Google Analytics Debugger extension or `gtag('set', 'debug_mode', true)` in dev tools.
  - Confirm `page_view`, `enroll_click`, `checkout_visit`, and `purchase_complete` appear in order.
- Browser network tab:
  - Filter for `collect` or `g/collect`.
  - Confirm one `page_view` on first load, another on client-side navigation, and the custom events at the expected pages.
- Refresh the success page:
  - `purchase_complete` should not fire again in the same tab session because it is deduped with the Stripe session ID in session storage.
