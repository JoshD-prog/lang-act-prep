-- ACT Prep Classes schema snapshot/reference.
-- Reflects the current hosted Supabase public schema.

create extension if not exists pgcrypto;

create table if not exists class_offerings (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  schedule text not null,
  format text not null,
  price_cents integer not null check (price_cents > 0),
  seats_available integer not null default 0,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  stripe_price_id text,
  location text,
  "Schedule" text,
  start_date date,
  end_date date,
  act_test_date date,
  score_release_date date
);

create table if not exists schools (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  display_name text not null,
  short_name text,
  state_code text not null,
  city text,
  website_url text,
  scholarship_page_url text,
  notes_short text,
  bucket_default boolean not null default false,
  bucket_local boolean not null default false,
  bucket_best_value boolean not null default false,
  sort_priority_default integer,
  sort_priority_local integer,
  sort_priority_best_value integer,
  is_active boolean not null default true,
  last_updated date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists college_scholarship_tiers (
  id uuid primary key default gen_random_uuid(),
  college_slug text not null,
  college_name text not null,
  tier_name text not null,
  min_gpa numeric(3,2) not null,
  min_act integer not null,
  annual_award_usd integer not null,
  created_at timestamptz not null default now(),
  unique (college_slug, tier_name)
);

create table if not exists enrollment_leads (
  id uuid primary key default gen_random_uuid(),
  student_name text not null,
  parent_email text not null,
  heard_about_us text,
  class_slug text not null,
  school_slug text,
  high_school_slug text,
  high_school_name text,
  notes text,
  created_at timestamptz not null default now(),
  payment_status text,
  stripe_session_id text,
  stripe_payment_intent_id text,
  paid_at timestamptz,
  stripe_event_id text
);

create table if not exists enrollment_email_events (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references enrollment_leads (id) on delete cascade,
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

create table if not exists high_schools (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  district text,
  hero_image_url text not null,
  short_pitch text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists cms_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists cms_sections (
  id uuid primary key default gen_random_uuid(),
  page_slug text not null,
  section_key text not null,
  eyebrow text,
  heading text not null,
  body text not null,
  cta_label text,
  cta_href text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique (page_slug, section_key)
);

create table if not exists contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  student_grade text,
  student_school text,
  heard_about_us text,
  interest text,
  message text not null,
  created_at timestamptz not null default now(),
  reviewed boolean not null default false
);

create table if not exists scholarship_tiers (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools (id),
  tier_name text not null,
  tier_rank integer not null,
  min_unweighted_gpa numeric(4,2),
  max_unweighted_gpa numeric(4,2),
  min_act integer,
  max_act integer,
  annual_award_usd integer not null check (annual_award_usd >= 0),
  years_assumed integer not null default 4 check (years_assumed >= 1),
  residency_rule_type text not null check (
    residency_rule_type = any (
      array[
        'all_students'::text,
        'in_state'::text,
        'out_of_state'::text,
        'regional'::text,
        'specific_states'::text,
        'metro_exception'::text
      ]
    )
  ),
  eligible_states text[],
  regional_rule_note text,
  requires_full_time boolean not null default true,
  requires_separate_application boolean not null default false,
  application_note text,
  renewable boolean not null default true,
  renewal_note text,
  is_major_restricted boolean not null default false,
  is_competitive boolean not null default false,
  is_active boolean not null default true,
  source_url text,
  source_note text,
  last_updated date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists scholarship_tiers_import (
  school_slug text not null,
  tier_name text not null,
  tier_rank integer not null,
  min_unweighted_gpa numeric(4,2),
  max_unweighted_gpa numeric(4,2),
  min_act integer,
  max_act integer,
  annual_award_usd integer not null,
  years_assumed integer,
  residency_rule_type text not null,
  eligible_states text[],
  regional_rule_note text,
  requires_full_time boolean,
  requires_separate_application boolean,
  application_note text,
  renewable boolean,
  renewal_note text,
  is_major_restricted boolean,
  is_competitive boolean,
  is_active boolean,
  source_url text,
  source_note text,
  last_updated date
);

create index if not exists idx_scholarship_college_slug on college_scholarship_tiers (college_slug);
create index if not exists idx_class_offerings_start_date on class_offerings (start_date);
create index if not exists idx_class_offerings_act_test_date on class_offerings (act_test_date);
create index if not exists idx_class_offerings_score_release_date on class_offerings (score_release_date);
create index if not exists idx_enrollment_class_slug on enrollment_leads (class_slug);
create index if not exists idx_enrollment_school_slug on enrollment_leads (school_slug);
create index if not exists idx_enrollment_high_school_slug on enrollment_leads (high_school_slug);
create index if not exists idx_enrollment_leads_payment_status on enrollment_leads (payment_status);
create index if not exists idx_enrollment_leads_stripe_session_id on enrollment_leads (stripe_session_id);
create index if not exists idx_enrollment_email_events_scheduled_for on enrollment_email_events (scheduled_for, status);
create index if not exists idx_enrollment_email_events_lead_id on enrollment_email_events (lead_id);
create index if not exists idx_contact_inquiries_email on contact_inquiries (email);
create index if not exists idx_contact_inquiries_created_at on contact_inquiries (created_at desc);
create index if not exists idx_schools_slug on schools (slug);
create index if not exists idx_high_schools_slug on high_schools (slug);
create unique index if not exists scholarship_tiers_unique_tier
  on scholarship_tiers (school_id, tier_name, min_unweighted_gpa, max_unweighted_gpa, min_act, max_act);
create index if not exists idx_scholarship_tiers_school_id on scholarship_tiers (school_id);
create index if not exists idx_scholarship_tiers_rank on scholarship_tiers (school_id, tier_rank);
create index if not exists idx_scholarship_tiers_requirements on scholarship_tiers (school_id, min_unweighted_gpa, min_act);
create index if not exists idx_scholarship_tiers_active on scholarship_tiers (is_active);

create or replace view scholarship_tiers_with_school as
select
  st.id as scholarship_tier_id,
  st.school_id,
  s.slug as school_slug,
  s.display_name as school_name,
  s.short_name,
  s.state_code,
  s.city,
  s.bucket_default,
  s.bucket_local,
  s.bucket_best_value,
  s.sort_priority_default,
  s.sort_priority_local,
  s.sort_priority_best_value,
  s.website_url,
  s.scholarship_page_url,
  s.notes_short as school_notes_short,
  s.is_active as school_is_active,
  s.last_updated as school_last_updated,
  st.tier_name,
  st.tier_rank,
  st.min_unweighted_gpa,
  st.max_unweighted_gpa,
  st.min_act,
  st.max_act,
  st.annual_award_usd,
  st.years_assumed,
  (st.annual_award_usd * st.years_assumed) as projected_total_usd,
  st.residency_rule_type,
  st.eligible_states,
  st.regional_rule_note,
  st.requires_full_time,
  st.requires_separate_application,
  st.application_note,
  st.renewable,
  st.renewal_note,
  st.is_major_restricted,
  st.is_competitive,
  st.is_active as tier_is_active,
  st.source_url,
  st.source_note,
  st.last_updated as tier_last_updated
from scholarship_tiers st
join schools s on s.id = st.school_id;

alter table class_offerings enable row level security;
alter table cms_pages enable row level security;
alter table cms_sections enable row level security;
alter table college_scholarship_tiers enable row level security;
alter table contact_inquiries enable row level security;
alter table enrollment_leads enable row level security;
alter table enrollment_email_events enable row level security;
alter table high_schools enable row level security;
alter table scholarship_tiers disable row level security;
alter table scholarship_tiers_import disable row level security;
alter table schools disable row level security;

drop policy if exists "public read class_offerings" on class_offerings;
create policy "public read class_offerings"
on class_offerings for select
using (true);

drop policy if exists "public read cms pages" on cms_pages;
create policy "public read cms pages"
on cms_pages for select
using (true);

drop policy if exists "public read cms sections" on cms_sections;
create policy "public read cms sections"
on cms_sections for select
using (true);

drop policy if exists "public read high schools" on high_schools;
create policy "public read high schools"
on high_schools for select
using (true);

drop policy if exists "public read scholarship tiers" on college_scholarship_tiers;
create policy "public read scholarship tiers"
on college_scholarship_tiers for select
using (true);

drop policy if exists "public read schools" on schools;
