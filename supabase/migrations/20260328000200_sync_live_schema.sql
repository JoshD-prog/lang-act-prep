-- Catch-up migration to align the repo with the current hosted Supabase schema.

alter table class_offerings
add column if not exists "Schedule" text;

update class_offerings
set "Schedule" = schedule
where "Schedule" is null;

alter table enrollment_leads
add column if not exists stripe_event_id text;

alter table enrollment_leads
alter column payment_status drop not null,
alter column payment_status drop default;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'schools'
      and column_name = 'name'
  ) and not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'schools'
      and column_name = 'display_name'
  ) then
    execute 'alter table schools rename column name to display_name';
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'schools'
      and column_name = 'short_pitch'
  ) and not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'schools'
      and column_name = 'notes_short'
  ) then
    execute 'alter table schools rename column short_pitch to notes_short';
  end if;
end $$;

alter table schools
add column if not exists display_name text,
add column if not exists short_name text,
add column if not exists state_code text,
add column if not exists city text,
add column if not exists website_url text,
add column if not exists scholarship_page_url text,
add column if not exists notes_short text,
add column if not exists bucket_default boolean default false,
add column if not exists bucket_local boolean default false,
add column if not exists bucket_best_value boolean default false,
add column if not exists sort_priority_default integer,
add column if not exists sort_priority_local integer,
add column if not exists sort_priority_best_value integer,
add column if not exists is_active boolean default true,
add column if not exists last_updated date;

update schools
set display_name = coalesce(display_name, initcap(replace(slug, '-', ' '))),
    state_code = coalesce(state_code, 'IN'),
    bucket_default = coalesce(bucket_default, false),
    bucket_local = coalesce(bucket_local, false),
    bucket_best_value = coalesce(bucket_best_value, false),
    is_active = coalesce(is_active, true);

alter table schools
alter column display_name set not null,
alter column state_code set not null,
alter column bucket_default set default false,
alter column bucket_default set not null,
alter column bucket_local set default false,
alter column bucket_local set not null,
alter column bucket_best_value set default false,
alter column bucket_best_value set not null,
alter column is_active set default true,
alter column is_active set not null;

alter table schools
drop column if exists district,
drop column if exists hero_image_url,
drop column if exists name,
drop column if exists short_pitch;

create index if not exists idx_schools_slug on schools (slug);

drop policy if exists "public read schools" on schools;
alter table schools disable row level security;

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

create unique index if not exists scholarship_tiers_unique_tier
  on scholarship_tiers (school_id, tier_name, min_unweighted_gpa, max_unweighted_gpa, min_act, max_act);
create index if not exists idx_scholarship_tiers_school_id on scholarship_tiers (school_id);
create index if not exists idx_scholarship_tiers_rank on scholarship_tiers (school_id, tier_rank);
create index if not exists idx_scholarship_tiers_requirements on scholarship_tiers (school_id, min_unweighted_gpa, min_act);
create index if not exists idx_scholarship_tiers_active on scholarship_tiers (is_active);

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

alter table scholarship_tiers disable row level security;
alter table scholarship_tiers_import disable row level security;
