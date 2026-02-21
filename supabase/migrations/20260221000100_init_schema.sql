-- ACT Prep Classes schema
-- Run in Supabase SQL editor or migration pipeline.

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
  updated_at timestamptz not null default now()
);

create table if not exists schools (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  district text,
  hero_image_url text not null,
  short_pitch text not null,
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
  class_slug text not null,
  school_slug text,
  notes text,
  created_at timestamptz not null default now()
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

create index if not exists idx_scholarship_college_slug on college_scholarship_tiers (college_slug);
create index if not exists idx_enrollment_class_slug on enrollment_leads (class_slug);
create index if not exists idx_enrollment_school_slug on enrollment_leads (school_slug);

-- seed class offerings
insert into class_offerings (slug, title, schedule, format, price_cents, seats_available, featured)
values
  ('foundations-8-week', 'ACT Foundations (8 Weeks)', 'Tuesdays + Thursdays, 6:30 PM', 'In-person', 62500, 18, true),
  ('intensive-4-week', 'ACT Intensive (4 Weeks)', 'Mondays + Wednesdays, 7:00 PM', 'Hybrid', 48500, 12, false),
  ('saturday-bootcamp', 'Saturday Strategy Bootcamp', 'Saturdays, 9:00 AM - 1:00 PM', 'Online', 21500, 24, false)
on conflict (slug) do update set
  title = excluded.title,
  schedule = excluded.schedule,
  format = excluded.format,
  price_cents = excluded.price_cents,
  seats_available = excluded.seats_available,
  featured = excluded.featured,
  updated_at = now();

-- seed schools
insert into schools (slug, name, district, hero_image_url, short_pitch)
values
  ('carmel-high-school', 'Carmel High School', 'Carmel Clay Schools', 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80', 'Custom prep timing for Carmel students balancing AP and athletics.'),
  ('zionsville-community-high-school', 'Zionsville Community High School', 'Zionsville Community Schools', 'https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?auto=format&fit=crop&w=1200&q=80', 'Score-targeted cohorts aligned with Zionsville testing timelines.'),
  ('fishers-high-school', 'Fishers High School', 'Hamilton Southeastern Schools', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80', 'High-accountability sessions and parent progress updates for Fishers families.'),
  ('purdue-polytechnic-high-school', 'Purdue Polytechnic High School', 'PPHS Network', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80', 'Project-based learners get concise ACT strategy and pacing frameworks.')
on conflict (slug) do update set
  name = excluded.name,
  district = excluded.district,
  hero_image_url = excluded.hero_image_url,
  short_pitch = excluded.short_pitch,
  updated_at = now();

-- seed scholarship tiers
insert into college_scholarship_tiers (college_slug, college_name, tier_name, min_gpa, min_act, annual_award_usd)
values
  ('ball-state', 'Ball State University', 'Cardinal Merit', 3.00, 24, 6000),
  ('ball-state', 'Ball State University', 'Presidential Merit', 3.50, 28, 10000),
  ('ball-state', 'Ball State University', 'Honors Distinction', 3.80, 31, 13000),
  ('iu-bloomington', 'Indiana University Bloomington', 'Select Scholar', 3.20, 26, 5000),
  ('iu-bloomington', 'Indiana University Bloomington', 'Dean Scholar', 3.60, 30, 9000),
  ('iu-bloomington', 'Indiana University Bloomington', 'Provost Scholar', 3.85, 33, 13000),
  ('purdue', 'Purdue University', 'Boilermaker Award', 3.50, 29, 6500),
  ('purdue', 'Purdue University', 'Trustees Scholarship', 3.75, 32, 11000),
  ('purdue', 'Purdue University', 'Presidential Scholarship', 3.95, 34, 15000),
  ('alabama', 'University of Alabama', 'Capstone Scholar', 3.50, 30, 9000),
  ('alabama', 'University of Alabama', 'Foundation in Excellence', 3.70, 32, 18000),
  ('alabama', 'University of Alabama', 'Premier Award', 3.90, 34, 28000)
on conflict (college_slug, tier_name) do update set
  college_name = excluded.college_name,
  min_gpa = excluded.min_gpa,
  min_act = excluded.min_act,
  annual_award_usd = excluded.annual_award_usd;

alter table class_offerings enable row level security;
alter table schools enable row level security;
alter table college_scholarship_tiers enable row level security;
alter table enrollment_leads enable row level security;
alter table cms_pages enable row level security;
alter table cms_sections enable row level security;

-- public read for site data
create policy if not exists "public read class_offerings"
on class_offerings for select
using (true);

create policy if not exists "public read schools"
on schools for select
using (true);

create policy if not exists "public read scholarship tiers"
on college_scholarship_tiers for select
using (true);

create policy if not exists "public read cms pages"
on cms_pages for select
using (true);

create policy if not exists "public read cms sections"
on cms_sections for select
using (true);

-- writes for enrollment leads are intended to occur from server role only.
