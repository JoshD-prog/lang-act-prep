-- Seed expansion schools for the scholarship calculator.
-- Source rows live in tools/fixtures/scholarship-expansion-2026.csv.

begin;

insert into schools (
  slug,
  display_name,
  short_name,
  state_code,
  city,
  website_url,
  scholarship_page_url,
  notes_short,
  bucket_default,
  bucket_local,
  bucket_best_value,
  sort_priority_default,
  sort_priority_local,
  sort_priority_best_value,
  is_active,
  last_updated
)
values
  ('oklahoma-state', 'Oklahoma State University', 'OSU', 'OK', 'Stillwater', 'https://go.okstate.edu/', 'https://go.okstate.edu/scholarships-financial-aid/types-of-aid/scholarships-and-grants/freshman-scholarships', 'Published 2026-2027 assured scholarships for incoming freshmen', true, false, true, 90, null, 90, true, '2026-05-22'),
  ('arkansas-state', 'Arkansas State University', 'A-State', 'AR', 'Jonesboro', 'https://www.astate.edu/', 'https://www.astate.edu/admissions-and-aid/financial-aid-and-scholarships/scholarships/', 'Competitive awards available above automatic academic scholarships', true, false, true, 95, null, 95, true, '2026-05-22'),
  ('university-of-arkansas', 'University of Arkansas', 'Arkansas', 'AR', 'Fayetteville', 'https://www.uark.edu/', 'https://scholarships.uark.edu/nrta/', 'Automatic nonresident tuition award for eligible surrounding-state freshmen', true, false, true, 85, null, 85, true, '2026-05-22'),
  ('nebraska', 'University of Nebraska-Lincoln', 'Nebraska', 'NE', 'Lincoln', 'https://www.unl.edu/', 'https://admissions.unl.edu/cost/scholarships/', 'Nebraska publishes scholarship ranges and holistic review rather than a fixed ACT/GPA ladder', true, false, false, 100, null, null, true, '2026-05-22')
on conflict (slug) do update
set display_name = excluded.display_name,
    short_name = excluded.short_name,
    state_code = excluded.state_code,
    city = excluded.city,
    website_url = excluded.website_url,
    scholarship_page_url = excluded.scholarship_page_url,
    notes_short = excluded.notes_short,
    bucket_default = excluded.bucket_default,
    bucket_local = excluded.bucket_local,
    bucket_best_value = excluded.bucket_best_value,
    sort_priority_default = excluded.sort_priority_default,
    sort_priority_local = excluded.sort_priority_local,
    sort_priority_best_value = excluded.sort_priority_best_value,
    is_active = excluded.is_active,
    last_updated = excluded.last_updated,
    updated_at = now();

delete from scholarship_tiers
where school_id in (
  select id
  from schools
  where slug in ('oklahoma-state', 'arkansas-state', 'university-of-arkansas', 'nebraska')
);

insert into scholarship_tiers (
  school_id,
  tier_name,
  tier_rank,
  min_unweighted_gpa,
  max_unweighted_gpa,
  min_act,
  max_act,
  annual_award_usd,
  years_assumed,
  residency_rule_type,
  eligible_states,
  regional_rule_note,
  requires_full_time,
  requires_separate_application,
  application_note,
  renewable,
  renewal_note,
  is_major_restricted,
  is_competitive,
  is_active,
  source_url,
  source_note,
  last_updated
)
select
  schools.id,
  rows.tier_name,
  rows.tier_rank,
  rows.min_unweighted_gpa,
  rows.max_unweighted_gpa,
  rows.min_act,
  rows.max_act,
  rows.annual_award_usd,
  rows.years_assumed,
  rows.residency_rule_type,
  rows.eligible_states,
  rows.regional_rule_note,
  rows.requires_full_time,
  rows.requires_separate_application,
  rows.application_note,
  rows.renewable,
  rows.renewal_note,
  rows.is_major_restricted,
  rows.is_competitive,
  rows.is_active,
  rows.source_url,
  rows.source_note,
  rows.last_updated::date
from (
  values
  ('oklahoma-state', 'Out-of-State Achievement GPA-only 3.25', 1, 3.25, 3.49, null, null, 6000, 4, 'out_of_state', array['OK']::text[], null, true, false, null, true, null, false, false, true, 'https://go.okstate.edu/scholarships-financial-aid/types-of-aid/scholarships-and-grants/freshman-scholarships/out-of-state-scholarships', '2026-2027 published out-of-state assured scholarship table', '2026-05-22'),
  ('oklahoma-state', 'Out-of-State Achievement GPA-only 3.50', 2, 3.5, 3.74, null, null, 7000, 4, 'out_of_state', array['OK']::text[], null, true, false, null, true, null, false, false, true, 'https://go.okstate.edu/scholarships-financial-aid/types-of-aid/scholarships-and-grants/freshman-scholarships/out-of-state-scholarships', '2026-2027 published out-of-state assured scholarship table', '2026-05-22'),
  ('oklahoma-state', 'Out-of-State Achievement GPA-only 3.75', 3, 3.75, null, null, null, 9000, 4, 'out_of_state', array['OK']::text[], null, true, false, null, true, null, false, false, true, 'https://go.okstate.edu/scholarships-financial-aid/types-of-aid/scholarships-and-grants/freshman-scholarships/out-of-state-scholarships', '2026-2027 published out-of-state assured scholarship table', '2026-05-22'),
  ('oklahoma-state', 'Out-of-State Achievement 24-25 ACT / 3.00 GPA', 4, 3, 3.24, 24, 25, 9500, 4, 'out_of_state', array['OK']::text[], null, true, false, null, true, null, false, false, true, 'https://go.okstate.edu/scholarships-financial-aid/types-of-aid/scholarships-and-grants/freshman-scholarships/out-of-state-scholarships', '2026-2027 published out-of-state assured scholarship table', '2026-05-22'),
  ('oklahoma-state', 'Out-of-State Achievement 24-25 ACT / 3.25 GPA', 5, 3.25, 3.49, 24, 25, 10000, 4, 'out_of_state', array['OK']::text[], null, true, false, null, true, null, false, false, true, 'https://go.okstate.edu/scholarships-financial-aid/types-of-aid/scholarships-and-grants/freshman-scholarships/out-of-state-scholarships', '2026-2027 published out-of-state assured scholarship table', '2026-05-22'),
  ('oklahoma-state', 'Out-of-State Achievement 24-25 ACT / 3.50 GPA', 6, 3.5, 3.74, 24, 25, 10500, 4, 'out_of_state', array['OK']::text[], null, true, false, null, true, null, false, false, true, 'https://go.okstate.edu/scholarships-financial-aid/types-of-aid/scholarships-and-grants/freshman-scholarships/out-of-state-scholarships', '2026-2027 published out-of-state assured scholarship table', '2026-05-22'),
  ('oklahoma-state', 'Out-of-State Achievement 24-25 ACT / 3.75 GPA', 7, 3.75, null, 24, 25, 11000, 4, 'out_of_state', array['OK']::text[], null, true, false, null, true, null, false, false, true, 'https://go.okstate.edu/scholarships-financial-aid/types-of-aid/scholarships-and-grants/freshman-scholarships/out-of-state-scholarships', '2026-2027 published out-of-state assured scholarship table', '2026-05-22'),
  ('oklahoma-state', 'Out-of-State Achievement 26-27 ACT / 3.00 GPA', 8, 3, 3.24, 26, 27, 10500, 4, 'out_of_state', array['OK']::text[], null, true, false, null, true, null, false, false, true, 'https://go.okstate.edu/scholarships-financial-aid/types-of-aid/scholarships-and-grants/freshman-scholarships/out-of-state-scholarships', '2026-2027 published out-of-state assured scholarship table', '2026-05-22'),
  ('oklahoma-state', 'Out-of-State Achievement 26-27 ACT / 3.25 GPA', 9, 3.25, 3.49, 26, 27, 11000, 4, 'out_of_state', array['OK']::text[], null, true, false, null, true, null, false, false, true, 'https://go.okstate.edu/scholarships-financial-aid/types-of-aid/scholarships-and-grants/freshman-scholarships/out-of-state-scholarships', '2026-2027 published out-of-state assured scholarship table', '2026-05-22'),
  ('oklahoma-state', 'Out-of-State Achievement 26-27 ACT / 3.50 GPA', 10, 3.5, 3.74, 26, 27, 11500, 4, 'out_of_state', array['OK']::text[], null, true, false, null, true, null, false, false, true, 'https://go.okstate.edu/scholarships-financial-aid/types-of-aid/scholarships-and-grants/freshman-scholarships/out-of-state-scholarships', '2026-2027 published out-of-state assured scholarship table', '2026-05-22'),
  ('oklahoma-state', 'Out-of-State Achievement 26-27 ACT / 3.75 GPA', 11, 3.75, null, 26, 27, 12000, 4, 'out_of_state', array['OK']::text[], null, true, false, null, true, null, false, false, true, 'https://go.okstate.edu/scholarships-financial-aid/types-of-aid/scholarships-and-grants/freshman-scholarships/out-of-state-scholarships', '2026-2027 published out-of-state assured scholarship table', '2026-05-22'),
  ('oklahoma-state', 'Out-of-State Achievement 28-29 ACT / 3.00 GPA', 12, 3, 3.24, 28, 29, 11500, 4, 'out_of_state', array['OK']::text[], null, true, false, null, true, null, false, false, true, 'https://go.okstate.edu/scholarships-financial-aid/types-of-aid/scholarships-and-grants/freshman-scholarships/out-of-state-scholarships', '2026-2027 published out-of-state assured scholarship table', '2026-05-22'),
  ('oklahoma-state', 'Out-of-State Achievement 28-29 ACT / 3.25 GPA', 13, 3.25, 3.49, 28, 29, 12000, 4, 'out_of_state', array['OK']::text[], null, true, false, null, true, null, false, false, true, 'https://go.okstate.edu/scholarships-financial-aid/types-of-aid/scholarships-and-grants/freshman-scholarships/out-of-state-scholarships', '2026-2027 published out-of-state assured scholarship table', '2026-05-22'),
  ('oklahoma-state', 'Out-of-State Achievement 28-29 ACT / 3.50 GPA', 14, 3.5, 3.74, 28, 29, 12500, 4, 'out_of_state', array['OK']::text[], null, true, false, null, true, null, false, false, true, 'https://go.okstate.edu/scholarships-financial-aid/types-of-aid/scholarships-and-grants/freshman-scholarships/out-of-state-scholarships', '2026-2027 published out-of-state assured scholarship table', '2026-05-22'),
  ('oklahoma-state', 'Out-of-State Achievement 28-29 ACT / 3.75 GPA', 15, 3.75, null, 28, 29, 13000, 4, 'out_of_state', array['OK']::text[], null, true, false, null, true, null, false, false, true, 'https://go.okstate.edu/scholarships-financial-aid/types-of-aid/scholarships-and-grants/freshman-scholarships/out-of-state-scholarships', '2026-2027 published out-of-state assured scholarship table', '2026-05-22'),
  ('oklahoma-state', 'Out-of-State Achievement 30-31 ACT / 3.00 GPA', 16, 3, 3.24, 30, 31, 12500, 4, 'out_of_state', array['OK']::text[], null, true, false, null, true, null, false, false, true, 'https://go.okstate.edu/scholarships-financial-aid/types-of-aid/scholarships-and-grants/freshman-scholarships/out-of-state-scholarships', '2026-2027 published out-of-state assured scholarship table', '2026-05-22'),
  ('oklahoma-state', 'Out-of-State Achievement 30-31 ACT / 3.25 GPA', 17, 3.25, 3.49, 30, 31, 13000, 4, 'out_of_state', array['OK']::text[], null, true, false, null, true, null, false, false, true, 'https://go.okstate.edu/scholarships-financial-aid/types-of-aid/scholarships-and-grants/freshman-scholarships/out-of-state-scholarships', '2026-2027 published out-of-state assured scholarship table', '2026-05-22'),
  ('oklahoma-state', 'Out-of-State Achievement 30-31 ACT / 3.50 GPA', 18, 3.5, 3.74, 30, 31, 13500, 4, 'out_of_state', array['OK']::text[], null, true, false, null, true, null, false, false, true, 'https://go.okstate.edu/scholarships-financial-aid/types-of-aid/scholarships-and-grants/freshman-scholarships/out-of-state-scholarships', '2026-2027 published out-of-state assured scholarship table', '2026-05-22'),
  ('oklahoma-state', 'Out-of-State Achievement 30-31 ACT / 3.75 GPA', 19, 3.75, null, 30, 31, 14000, 4, 'out_of_state', array['OK']::text[], null, true, false, null, true, null, false, false, true, 'https://go.okstate.edu/scholarships-financial-aid/types-of-aid/scholarships-and-grants/freshman-scholarships/out-of-state-scholarships', '2026-2027 published out-of-state assured scholarship table', '2026-05-22'),
  ('oklahoma-state', 'Out-of-State Achievement 32-36 ACT / 3.00 GPA', 20, 3, 3.24, 32, 36, 13500, 4, 'out_of_state', array['OK']::text[], null, true, false, null, true, null, false, false, true, 'https://go.okstate.edu/scholarships-financial-aid/types-of-aid/scholarships-and-grants/freshman-scholarships/out-of-state-scholarships', '2026-2027 published out-of-state assured scholarship table', '2026-05-22'),
  ('oklahoma-state', 'Out-of-State Achievement 32-36 ACT / 3.25 GPA', 21, 3.25, 3.49, 32, 36, 14000, 4, 'out_of_state', array['OK']::text[], null, true, false, null, true, null, false, false, true, 'https://go.okstate.edu/scholarships-financial-aid/types-of-aid/scholarships-and-grants/freshman-scholarships/out-of-state-scholarships', '2026-2027 published out-of-state assured scholarship table', '2026-05-22'),
  ('oklahoma-state', 'Out-of-State Achievement 32-36 ACT / 3.50 GPA', 22, 3.5, 3.74, 32, 36, 14500, 4, 'out_of_state', array['OK']::text[], null, true, false, null, true, null, false, false, true, 'https://go.okstate.edu/scholarships-financial-aid/types-of-aid/scholarships-and-grants/freshman-scholarships/out-of-state-scholarships', '2026-2027 published out-of-state assured scholarship table', '2026-05-22'),
  ('oklahoma-state', 'Out-of-State Achievement 32-36 ACT / 3.75 GPA', 23, 3.75, null, 32, 36, 15000, 4, 'out_of_state', array['OK']::text[], null, true, false, null, true, null, false, false, true, 'https://go.okstate.edu/scholarships-financial-aid/types-of-aid/scholarships-and-grants/freshman-scholarships/out-of-state-scholarships', '2026-2027 published out-of-state assured scholarship table', '2026-05-22'),
  ('arkansas-state', 'A-State Endeavor', 1, 3, null, 19, 20, 2000, 4, 'all_students', null, null, true, false, null, true, '15 A-State hours per semester and 3.0 cumulative GPA', false, false, true, 'https://www.astate.edu/admissions-and-aid/financial-aid-and-scholarships/scholarships/university-scholarships/', '2026-27 academic scholarships page', '2026-05-22'),
  ('arkansas-state', 'A-State Enrichment', 2, 3, null, 21, 24, 4000, 4, 'all_students', null, null, true, false, null, true, '15 A-State hours per semester and 3.0 cumulative GPA', false, false, true, 'https://www.astate.edu/admissions-and-aid/financial-aid-and-scholarships/scholarships/university-scholarships/', '2026-27 academic scholarships page', '2026-05-22'),
  ('arkansas-state', 'A-State Inspire', 3, 3.5, null, 25, null, 6000, 4, 'all_students', null, null, true, false, null, true, '15 A-State hours per semester and 3.0 cumulative GPA', false, false, true, 'https://www.astate.edu/admissions-and-aid/financial-aid-and-scholarships/scholarships/university-scholarships/', '2026-27 academic scholarships page', '2026-05-22'),
  ('arkansas-state', 'A-State Trailblazer', 4, 3.5, null, 28, null, 10000, 4, 'all_students', null, null, true, true, 'Apply by February 1; offer must be accepted by March 1', true, '15 A-State hours per semester and 3.5 cumulative GPA', false, true, true, 'https://www.astate.edu/admissions-and-aid/financial-aid-and-scholarships/scholarships/competitive-fellowships-and-scholarships.html', 'Competitive scholarship; cannot be combined with Academic Scholarships', '2026-05-22'),
  ('arkansas-state', 'A-State Scholar', 5, 3.5, null, 31, null, 18000, 4, 'all_students', null, null, true, true, 'Apply by February 1; offer must be accepted by March 1', true, '15 A-State hours per semester including one Honors course and 3.5 cumulative GPA', false, true, true, 'https://www.astate.edu/admissions-and-aid/financial-aid-and-scholarships/scholarships/competitive-fellowships-and-scholarships.html', 'Competitive scholarship; cannot be combined with Academic Scholarships', '2026-05-22'),
  ('university-of-arkansas', 'New Arkansan NRTA 70%', 1, 3.2, null, null, null, 14738, 4, 'regional', array['GA', 'IL', 'KS', 'LA', 'MS', 'MO', 'OK', 'TN', 'TX']::text[], 'Surrounding-state New Arkansan NRTA; amount is 70% of the 2025-2026 nonresident/resident tuition difference', true, false, null, true, '24 or more hours per academic year and 2.75 cumulative GPA', false, false, true, 'https://scholarships.uark.edu/nrta/', 'Derived from published 2025-2026 NRTA percentage and tuition-difference tables', '2026-05-22'),
  ('university-of-arkansas', 'New Arkansan NRTA 80%', 2, 3.6, null, null, null, 16843, 4, 'regional', array['GA', 'IL', 'KS', 'LA', 'MS', 'MO', 'OK', 'TN', 'TX']::text[], 'Surrounding-state New Arkansan NRTA; amount is 80% of the 2025-2026 nonresident/resident tuition difference', true, false, null, true, '24 or more hours per academic year and 2.75 cumulative GPA', false, false, true, 'https://scholarships.uark.edu/nrta/', 'Derived from published 2025-2026 NRTA percentage and tuition-difference tables', '2026-05-22'),
  ('university-of-arkansas', 'New Arkansan NRTA 90%', 3, 3.8, null, null, null, 18949, 4, 'regional', array['GA', 'IL', 'KS', 'LA', 'MS', 'MO', 'OK', 'TN', 'TX']::text[], 'Surrounding-state New Arkansan NRTA; amount is 90% of the 2025-2026 nonresident/resident tuition difference', true, false, null, true, '24 or more hours per academic year and 2.75 cumulative GPA', false, false, true, 'https://scholarships.uark.edu/nrta/', 'Derived from published 2025-2026 NRTA percentage and tuition-difference tables', '2026-05-22'),
  ('nebraska', 'New Nebraskan Tuition Scholarship', 1, null, null, null, null, 15000, 4, 'out_of_state', array['NE']::text[], null, true, false, null, true, null, false, true, true, 'https://admissions.unl.edu/cost/scholarships/', 'Holistic/range-based scholarship; published award range is $15000 to $20000 per year', '2026-05-22'),
  ('nebraska', 'Chancellor''s Tuition Scholarship Out-of-State', 2, null, null, null, null, 23230, 4, 'out_of_state', array['NE']::text[], null, true, false, null, true, null, false, true, true, 'https://admissions.unl.edu/cost/scholarships/', 'Holistic/range-based opportunity; value is published nonresident tuition waiver value plus $4000 per year', '2026-05-22')
) as rows (
  school_slug,
  tier_name,
  tier_rank,
  min_unweighted_gpa,
  max_unweighted_gpa,
  min_act,
  max_act,
  annual_award_usd,
  years_assumed,
  residency_rule_type,
  eligible_states,
  regional_rule_note,
  requires_full_time,
  requires_separate_application,
  application_note,
  renewable,
  renewal_note,
  is_major_restricted,
  is_competitive,
  is_active,
  source_url,
  source_note,
  last_updated
)
join schools on schools.slug = rows.school_slug;

commit;
