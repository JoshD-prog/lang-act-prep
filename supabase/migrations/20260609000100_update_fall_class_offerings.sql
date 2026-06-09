begin;

update public.class_offerings
set featured = false,
    seats_available = 0,
    updated_at = now()
where slug = 'act-cram-june-2026';

update public.class_offerings
set featured = false,
    updated_at = now()
where slug in ('act-cram-september-2026');

insert into public.class_offerings (
  slug,
  title,
  schedule,
  location,
  format,
  price_cents,
  seats_available,
  featured,
  stripe_price_id,
  start_date,
  end_date,
  act_test_date,
  score_release_date
)
values
  (
    'act-cram-july-2026',
    'July ACT Cram Course',
    'Mon-Thu, July 6-9, 6:30-8:00 PM',
    'Harvest Ridge',
    '4 sessions - 90 minutes each',
    29900,
    30,
    true,
    null,
    '2026-07-06',
    '2026-07-09',
    '2026-07-11',
    '2026-07-21'
  ),
  (
    'act-cram-october-2026',
    'October ACT Cram Course',
    'Mon-Thu, October 12-15, 6:30-8:00 PM',
    'Harvest Ridge',
    '4 sessions - 90 minutes each',
    29900,
    30,
    false,
    'price_1TgQdORJisJe1D168XCYWiQD',
    '2026-10-12',
    '2026-10-15',
    '2026-10-17',
    '2026-10-27'
  )
on conflict (slug) do update set
  title = excluded.title,
  schedule = excluded.schedule,
  location = excluded.location,
  format = excluded.format,
  price_cents = excluded.price_cents,
  seats_available = case
    when excluded.slug = 'act-cram-october-2026' then excluded.seats_available
    else public.class_offerings.seats_available
  end,
  featured = excluded.featured,
  stripe_price_id = coalesce(excluded.stripe_price_id, public.class_offerings.stripe_price_id),
  start_date = excluded.start_date,
  end_date = excluded.end_date,
  act_test_date = excluded.act_test_date,
  score_release_date = excluded.score_release_date,
  updated_at = now();

commit;
