begin;

update public.class_offerings
set location = case slug
    when 'act-cram-july-2026' then 'Harvest Ridge Covenant Church'
    when 'act-cram-september-2026' then 'Lansing Community Center'
    when 'act-cram-october-2026' then 'Harvest Ridge Covenant Church'
    else location
  end,
  updated_at = now()
where slug in (
  'act-cram-july-2026',
  'act-cram-september-2026',
  'act-cram-october-2026'
);

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
    'act-cram-december-2026',
    'December ACT Cram Course',
    'Mon-Thu, December 7-10, 6:30-8:00 PM',
    'Haven Baptist Church',
    '4 sessions - 90 minutes each',
    29900,
    15,
    false,
    null,
    '2026-12-07',
    '2026-12-10',
    '2026-12-12',
    '2026-12-22'
  ),
  (
    'act-cram-february-2027',
    'February ACT Cram Course',
    'Mon-Thu, February 22-25, 6:30-8:00 PM',
    'Lansing Community Center',
    '4 sessions - 90 minutes each',
    29900,
    15,
    false,
    null,
    '2027-02-22',
    '2027-02-25',
    '2027-02-27',
    '2027-03-16'
  ),
  (
    'act-cram-april-2027',
    'April ACT Cram Course',
    'Mon-Thu, April 5-8, 6:30-8:00 PM',
    'Lansing Community Center',
    '4 sessions - 90 minutes each',
    29900,
    15,
    false,
    null,
    '2027-04-05',
    '2027-04-08',
    '2027-04-10',
    '2027-04-20'
  ),
  (
    'act-cram-june-2027',
    'June ACT Cram Course',
    'Mon-Thu, June 7-10, 6:30-8:00 PM',
    'Lansing Community Center',
    '4 sessions - 90 minutes each',
    29900,
    15,
    false,
    null,
    '2027-06-07',
    '2027-06-10',
    '2027-06-12',
    '2027-06-22'
  ),
  (
    'act-cram-july-2027',
    'July ACT Cram Course',
    'Mon-Thu, July 5-8, 6:30-8:00 PM',
    'Lansing Community Center',
    '4 sessions - 90 minutes each',
    29900,
    15,
    false,
    null,
    '2027-07-05',
    '2027-07-08',
    '2027-07-10',
    '2027-07-20'
  )
on conflict (slug) do update set
  title = excluded.title,
  schedule = excluded.schedule,
  location = excluded.location,
  format = excluded.format,
  price_cents = excluded.price_cents,
  seats_available = public.class_offerings.seats_available,
  featured = excluded.featured,
  stripe_price_id = coalesce(excluded.stripe_price_id, public.class_offerings.stripe_price_id),
  start_date = excluded.start_date,
  end_date = excluded.end_date,
  act_test_date = excluded.act_test_date,
  score_release_date = excluded.score_release_date,
  updated_at = now();

commit;
