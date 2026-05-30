begin;

alter table public.class_offerings
add column if not exists end_date date,
add column if not exists act_test_date date,
add column if not exists score_release_date date;

create table if not exists public.enrollment_email_events (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.enrollment_leads (id) on delete cascade,
  class_slug text not null,
  email_type text not null check (
    email_type = any (
      array[
        'reminder_2_weeks_before_class'::text,
        'reminder_1_week_before_class'::text,
        'reminder_1_day_before_class'::text,
        'followup_monday_after_test'::text,
        'followup_after_score_release'::text
      ]
    )
  ),
  recipient_email text not null,
  scheduled_for date not null,
  status text not null default 'pending' check (
    status = any (array['pending'::text, 'sent'::text, 'failed'::text, 'skipped'::text])
  ),
  resend_message_id text,
  error_message text,
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (lead_id, email_type)
);

create index if not exists idx_class_offerings_act_test_date on public.class_offerings (act_test_date);
create index if not exists idx_class_offerings_score_release_date on public.class_offerings (score_release_date);
create index if not exists idx_enrollment_email_events_scheduled_for
  on public.enrollment_email_events (scheduled_for, status);
create index if not exists idx_enrollment_email_events_lead_id
  on public.enrollment_email_events (lead_id);

update public.class_offerings
set start_date = coalesce(start_date, '2026-06-08'::date),
    end_date = coalesce(end_date, '2026-06-11'::date),
    act_test_date = coalesce(act_test_date, '2026-06-13'::date),
    score_release_date = coalesce(score_release_date, '2026-06-23'::date)
where slug = 'act-cram-june-2026';

update public.class_offerings
set start_date = coalesce(start_date, '2026-07-06'::date),
    end_date = coalesce(end_date, '2026-07-09'::date),
    act_test_date = coalesce(act_test_date, '2026-07-11'::date),
    score_release_date = coalesce(score_release_date, '2026-07-21'::date)
where slug = 'act-cram-july-2026';

update public.class_offerings
set start_date = coalesce(start_date, '2026-09-14'::date),
    end_date = coalesce(end_date, '2026-09-17'::date),
    act_test_date = coalesce(act_test_date, '2026-09-19'::date),
    score_release_date = coalesce(score_release_date, '2026-10-06'::date)
where slug = 'act-cram-september-2026';

alter table public.enrollment_email_events enable row level security;

revoke all on table public.enrollment_email_events from anon, authenticated;
grant select, insert, update, delete on table public.enrollment_email_events to service_role;

commit;
